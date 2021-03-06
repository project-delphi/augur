import { createSelector } from 'reselect';
import store from 'src/store';
import { selectTransactionsDataState } from 'src/select-state';
import { formatShares, formatEther, formatRep } from '../../../utils/format-number';
import { selectMarketLink } from '../../link/selectors/links';

export default function () {
  return selectTransactions(store.getState());
}

export const selectTransactions = createSelector(
  selectTransactionsDataState,
  transactionsData => Object.keys(transactionsData || {})
    .sort((a, b) => {
      const timestampA = transactionsData[a].timestamp;
      const timestampB = transactionsData[b].timestamp;
      if (timestampA && timestampA.timestamp && timestampB && timestampB.timestamp) {
        return timestampB.timestamp - timestampA.timestamp;
      } else if (timestampA && timestampA.timestamp) {
        return 1;
      } else if (timestampB && timestampB.timestamp) {
        return -1;
      }
      return 0;
    })
    .map((id) => {
      let marketLink = (transactionsData[id].data && transactionsData[id].data.marketLink) ? transactionsData[id].data.marketLink : null;
      if (marketLink === null && transactionsData[id].data && (transactionsData[id].data.id || transactionsData[id].data.marketID) && (transactionsData[id].data.description || transactionsData[id].description)) {
        marketLink = selectMarketLink({
          id: transactionsData[id].data.id || transactionsData[id].data.marketID,
          description: transactionsData[id].description
        }, store.dispatch);
      }
      return {
        ...transactionsData[id],
        data: {
          ...transactionsData[id].data,
          marketLink
        },
        gas: transactionsData[id].gas && formatEther(transactionsData[id].gas),
        ether: transactionsData[id].etherWithoutGas && formatEther(transactionsData[id].etherWithoutGas),
        shares: transactionsData[id].sharesChange && formatShares(transactionsData[id].sharesChange),
        rep: transactionsData[id].repChange && formatRep(transactionsData[id].repChange)
      };
    })
);
