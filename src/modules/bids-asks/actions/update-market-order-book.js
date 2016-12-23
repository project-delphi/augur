import BigNumber from 'bignumber.js';
import { abi, augur, constants } from '../../../services/augurjs';

export const UPDATE_MARKET_ORDER_BOOK = 'UPDATE_MARKET_ORDER_BOOK';
export const CLEAR_MARKET_ORDER_BOOK = 'CLEAR_MARKET_ORDER_BOOK';

export function updateMarketOrderBook(marketId, marketOrderBook) {
	return { type: UPDATE_MARKET_ORDER_BOOK, marketId, marketOrderBook };
}

export function clearMarketOrderBook(marketId) {
	return { type: CLEAR_MARKET_ORDER_BOOK, marketId };
}

export function addOrder(log) {
	return (dispatch, getState) => {
		const orderBook = { ...getState().orderBooks[log.market] };
		if (orderBook) {
			const orderBookSide = orderBook[log.type];
			if (orderBookSide) {
				const outcomeOrders = orderBookSide[log.outcome];
				if (outcomeOrders) {
					outcomeOrders[log.tradeid] = convertAddTxLogToOrder(log, getState().marketsData[log.market]);
					console.log('adding to order book:', outcomeOrders[log.tradeid]);
					dispatch(updateMarketOrderBook(log.market, orderBook));
				}
			}
		}
	};
}

export function removeOrder(log) {
	return (dispatch, getState) => {
		const orderBook = { ...getState().orderBooks[log.market] };
		if (orderBook) {
			const orderBookSide = orderBook[log.type];
			if (orderBookSide) {
				const outcomeOrders = orderBookSide[log.outcome];
				if (outcomeOrders) {
					if (outcomeOrders[log.tradeid]) {
						console.log('removing order:', outcomeOrders[log.tradeid]);
						delete outcomeOrders[log.tradeid];
						dispatch(updateMarketOrderBook(log.market, orderBook));
					}
				}
			}
		}
	};
}

export function fillOrder(log) {
	return (dispatch, getState) => {
		const orderBook = { ...getState().orderBooks[log.market] };
		if (orderBook) {
			const orderBookSide = orderBook[log.type];
			if (orderBookSide) {
				const outcomeOrders = orderBookSide[log.outcome];
				if (outcomeOrders) {
					const order = outcomeOrders[log.tradeid];
					if (order) {
						const updatedAmount = abi.bignum(order.fullPrecisionAmount).minus(abi.bignum(log.amount));
						if (updatedAmount.lte(constants.PRECISION.zero)) {
							console.log('deleting', log.tradeid, 'from order book');
							delete outcomeOrders[log.tradeid];
						} else {
							order.fullPrecisionAount = updatedAmount.toFixed();
							order.amount = augur.roundToPrecision(updatedAmount, constants.MINIMUM_TRADE_SIZE);
							console.log('updated order:', order);
						}
						dispatch(updateMarketOrderBook(log.market, orderBook));
					}
				}
			}
		}
	};
}

function convertAddTxLogToOrder(log, market) {
	let round;
	let roundingMode;
	if (log.type === 'buy') {
		round = 'floor';
		roundingMode = BigNumber.ROUND_DOWN;
	} else {
		round = 'ceil';
		roundingMode = BigNumber.ROUND_UP;
	}
	const adjustedLog = market.type === 'scalar' ? augur.adjustScalarOrder({ ...log }, market.minValue) : { ...log };
	return {
		id: adjustedLog.tradeid,
		type: adjustedLog.type,
		market: adjustedLog.market,
		amount: augur.roundToPrecision(adjustedLog.amount, constants.MINIMUM_TRADE_SIZE),
		fullPrecisionAmount: adjustedLog.amount,
		price: augur.roundToPrecision(adjustedLog.price, constants.PRECISION.zero, round, roundingMode),
		fullPrecisionPrice: adjustedLog.price,
		owner: adjustedLog.maker,
		block: adjustedLog.blockNumber,
		outcome: adjustedLog.outcome
	};
}
