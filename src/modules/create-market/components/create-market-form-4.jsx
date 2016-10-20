import React from 'react';
import classNames from 'classnames';

import FormButtons from 'modules/create-market/components/create-market-form-buttons';
import Input from 'modules/common/components/input';
import Checkbox from 'modules/common/components/checkbox';

import getValue from 'utils/get-value';

const CreateMarketForm4 = p => (
	<div className="step-4">
		<div className="fee">
			<h4>{`Set the taker's fee`}</h4>
			<p>
				{`The taker fee is a percentage fee charged to the 'Taker' against the value of any trade made in the market.`}
			</p>
			<Input
				type="text"
				value={p.takerFee}
				onChange={value => p.onValuesUpdated({ takerFee: value })}
			/>
			<span className="denomination">%</span>
			{p.errors.takerFee &&
				<span className="error-message">{p.errors.takerFee}</span>
			}
		</div>
		<div className="fee">
			<h4>{`Set the maker's fee`}</h4>
			<p>
				{`The maker fee is a percentage fee charged to the 'Maker' against the value of any trade made in the market.`}
			</p>
			<Input
				type="text"
				value={p.makerFee}
				onChange={value => p.onValuesUpdated({ makerFee: value })}
			/>
			<span className="denomination">%</span>
			{p.errors.makerFee &&
				<span className="error-message">{p.errors.makerFee}</span>
			}
		</div>
		<div className="initial-order-book displayNone">
			<h4>Set the initial order book</h4>
			<p>
				{`Allows you to place an initial set of orders in this market's order book, which will allow traders to begin buying and selling immediately.`}
			</p>
			<Checkbox
				text="Include initial order book"
				isChecked={p.isCreatingOrderBook}
				onClick={() => p.onValuesUpdated({ isCreatingOrderBook: !p.isCreatingOrderBook })}
			/>
		</div>

		<div className={classNames('order-book-creation', { displayNone: !p.isCreatingOrderBook })} >
			<h6 className="horizontal-divider" > Order Book Creation </h6>
			<div>
				<div className="liquidity">
					<h4>Set the amount of initial liquidity</h4>
					<p>
						{`Initial liquidity is the amount of ether you're putting into the market to get trading started.
						The Market Maker will use these funds to buy shares - which are then sold back to those
						wanting to trade your market when the market opens. Any initial liquidity remaining when
						the market is expired will be returned to you (along with any profit generated by the Market
						Maker from selling shares).`}
					</p>
					<Input
						type="text"
						value={p.initialLiquidity}
						onChange={value => p.onValuesUpdated({ initialLiquidity: value })}
					/>
					<span className="denomination">ETH</span>
					{p.errors.initialLiquidity &&
						<span className="error-message">{p.errors.initialLiquidity}</span>
					}
				</div>
				<div>
					<h4>Initial Fair Price</h4>
					<p>
						This establishes the initial price for each respective outcome.
					</p>
					{p.initialFairPrices.values.map((cV, i) =>
						(<div key={`initialFairPrice${i}`} >
							<Input
								type="text"
								value={p.initialFairPrices.values[i].value}
								onChange={
									(onChangeValue) => {
										const prices = p.initialFairPrices.values;
										const	raw = p.initialFairPrices.raw;

										prices[i].value = onChangeValue;
										raw[i] = onChangeValue;

										p.onValuesUpdated({
											initialFairPrices: {
												...p.initialFairPrices,
												values: prices,
												raw
											}
										});
									}
								}
							/>
							<span className="denomination">ETH | {cV.label}</span>
							{!!getValue(p, `errors.initialFairPrice.${i}`) &&
								<span className="error-message">
									{p.errors.initialFairPrice[`${i}`]}
								</span>
							}
						</div>)
					)}
				</div>
				<div>
					<h4>Best Bid/Ask Quantity</h4>
					<p>
						This defines the number of shares applied to the best bid and ask orders.
					</p>
					<Input
						type="text"
						value={p.bestStartingQuantity}
						onChange={value => p.onValuesUpdated({ bestStartingQuantity: value })}
					/>
					<span className="denomination">Shares</span>
					{p.errors.bestStartingQuantity &&
						<span className="error-message">
							{p.errors.bestStartingQuantity}
						</span>
					}
				</div>
				<div>
					<h4>Starting Quantity</h4>
					<p>
						This is the number of shares in each order.
					</p>
					<Input
						type="text"
						value={p.startingQuantity}
						onChange={value => p.onValuesUpdated({ startingQuantity: value })}
					/>
					<span className="denomination">Shares</span>
					{p.errors.startingQuantity &&
						<span className="error-message">
							{p.errors.startingQuantity}
						</span>
					}
				</div>
				<div>
					<h4>Price Width</h4>
					<p>
						This defines the spread between the initial best bid and ask orders.
					</p>
					<Input
						type="text"
						value={p.priceWidth}
						onChange={value => p.onValuesUpdated({ priceWidth: value })}
					/>
					<span className="denomination">ETH</span>
					{p.errors.priceWidth &&
						<span className="error-message">{p.errors.priceWidth}</span>
					}
				</div>
			</div>
		</div>
		<FormButtons
			disabled={!p.isValid}
			nextLabel="review"
			onNext={() => p.onValuesUpdated({ step: p.step + 1 })}
			onPrev={() => p.onValuesUpdated({ step: p.step - 1 })}
		/>
	</div>
);

// TOOD -- Prop Validations
// CreateMarketForm4.propTypes = {
// 	onValuesUpdated: PropTypes.func,
// 	errors: PropTypes.object,
// 	isValid: PropTypes.bool,
// 	takerFee: PropTypes.number,
// 	makerFee: PropTypes.number,
// 	initialLiquidity: PropTypes.any,
// 	showAdvancedMarketParams: PropTypes.bool,
// 	initialFairPrices: PropTypes.object,
// 	bestStartingQuantity: PropTypes.any,
// 	startingQuantity: PropTypes.any,
// 	priceWidth: PropTypes.any,
// 	priceDepth: PropTypes.any
// };

export default CreateMarketForm4;
