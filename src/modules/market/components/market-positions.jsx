import React from 'react';
import { injectIntl } from 'react-intl';

import MarketPositionsRow from 'modules/market/components/market-positions-row';
import NullStateMessage from 'modules/common/components/null-state-message';

import { SCALAR } from 'modules/markets/constants/market-types';

import getValue from 'utils/get-value';

const MarketPositions = (p) => {
  const outcomePositions = getValue(p, 'market.myPositionOutcomes');
  const nullMessage = p.intl.formatMessage({ id: 'no_current_positions', defaultMessage: 'No Current Positions'});

  return (
    <article className="market-positions">
      {!outcomePositions || !outcomePositions.length ?
        <NullStateMessage message={nullMessage} /> :
        <div>
          <div className="market-positions-header">
            <span>{!p.marketType === SCALAR ? 'Outcomes' : 'Outcome'}</span>
            <span>Shares</span>
            <span>Avg Price</span>
            <span>Last Price</span>
            <span>Realized P/L</span>
            <span>Unrealized P/L</span>
            <span>Total P/L</span>
            <span>Action</span>
          </div>
          <div className="market-content-scrollable" >
            {(outcomePositions || []).map(outcome =>
              <MarketPositionsRow
                key={outcome.id}
                marketType={p.marketType}
                outcome={outcome}
                selectedShareDenomination={p.selectedShareDenomination}
                closePositionStatus={p.closePositionStatus}
                isTradeCommitLocked={p.isTradeCommitLocked}
              />
            )}
          </div>
        </div>
      }
    </article>
  );
};

export default injectIntl(MarketPositions);
