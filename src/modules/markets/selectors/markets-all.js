import { createSelector } from 'reselect';
import store from 'src/store';
import { selectMarketsDataState, selectFavoritesState, selectReportsState, selectOutcomesDataState, selectNetEffectiveTradesState, selectAccountTradesState, selectTradesInProgressState, selectBranchState, selectSelectedFilterSortState, selectPriceHistoryState, selectOrderBooksState, selectOrderCancellationState, selectSmallestPositionsState, selectLoginAccountState } from 'src/select-state';
import selectAccountPositions from 'modules/user-open-orders/selectors/positions-plus-asks';
import { isMarketDataOpen, isMarketDataExpired } from '../../../utils/is-market-data-open';
import { assembleMarket, selectMarketReport } from '../../market/selectors/market';

export default function () {
  return selectMarkets(store.getState());
}

export const selectMarkets = createSelector(
  selectMarketsDataState,
  selectFavoritesState,
  selectReportsState,
  selectOutcomesDataState,
  selectAccountPositions,
  selectNetEffectiveTradesState,
  selectAccountTradesState,
  selectTradesInProgressState,
  selectBranchState,
  selectSelectedFilterSortState,
  selectPriceHistoryState,
  selectOrderBooksState,
  selectOrderCancellationState,
  selectSmallestPositionsState,
  selectLoginAccountState,
  (marketsData, favorites, reports, outcomesData, accountPositions, netEffectiveTrades, accountTrades, tradesInProgress, branch, selectedFilterSort, priceHistory, orderBooks, orderCancellation, smallestPositions, loginAccount) => {
    if (!marketsData) return [];
    return Object.keys(marketsData).map((marketID) => {
      if (!marketID || !marketsData[marketID]) return {};
      const endDate = new Date((marketsData[marketID].endDate * 1000) || 0);
      return assembleMarket(
        marketID,
        marketsData[marketID],
        priceHistory[marketID],
        isMarketDataOpen(marketsData[marketID]),
        isMarketDataExpired(marketsData[marketID], new Date().getTime()),

        !!favorites[marketID],
        outcomesData[marketID],

        selectMarketReport(marketID, reports[marketsData[marketID].branchID]),
        (accountPositions || {})[marketID],
        (netEffectiveTrades || {})[marketID],
        (accountTrades || {})[marketID],
        tradesInProgress[marketID],

        // the reason we pass in the date parts broken up like this, is because date objects are never equal, thereby always triggering re-assembly, never hitting the memoization cache
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate(),
        branch && branch.isReportRevealPhase,
        branch && branch.reportPeriod,
        orderBooks[marketID],
        orderCancellation,
        (smallestPositions || {})[marketID],
        loginAccount,
        store.dispatch
      );
    }).sort((a, b) => {
      const aVal = cleanSortVal(a[selectedFilterSort.sort]);
      const bVal = cleanSortVal(b[selectedFilterSort.sort]);

      if (bVal < aVal) {
        return selectedFilterSort.isDesc ? -1 : 1;
      } else if (bVal > aVal) {
        return selectedFilterSort.isDesc ? 1 : -1;
      }
      return a.id < b.id ? -1 : 1;
    });
  }
);

function cleanSortVal(val) {
  // if a falsy simple value return it to sort as-is
  if (!val) {
    return val;
  }

  // if this is a formatted number object, with a `value` prop, use that for sorting
  if (val.value || val.value === 0) {
    return val.value;
  }

  // if the val is a string, lowercase it
  if (val.toLowerCase) {
    return val.toLowerCase();
  }

  // otherwise the val is probably a number, either way return it as-is
  return val;
}
