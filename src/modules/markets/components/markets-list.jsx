import React from 'react';
import { injectIntl } from 'react-intl';
import MarketPreview from 'modules/market/components/market-preview';
import Paginator from 'modules/common/components/paginator';
import NullStateMessage from 'modules/common/components/null-state-message';

import getValue from 'utils/get-value';

const MarketsList = (p) => {
  const nullMessage = p.intl.formatMessage({ id: 'no_markets_available', defaultMessage: 'No Markets Available' });

  return (
    <article className="markets-list">
      {p.markets.length ? p.markets.map((market) => {
        const selectedShareDenomination = getValue(p, `scalarShareDenomination.markets.${market.id}`);
        const shareDenominations = getValue(p, 'scalarShareDenomination.denominations');

        return (
          <MarketPreview
            key={market.id}
            loginAccount={p.loginAccount}
            {...market}
            selectedShareDenomination={selectedShareDenomination}
            shareDenominations={shareDenominations}
          />
        );
      }) : <NullStateMessage message={nullMessage} /> }
      {!!p.pagination && !!p.pagination.numUnpaginated &&
        <Paginator pagination={p.pagination} />
      }
    </article>
  );
};

// TODO -- Prop Validations
// MarketsList.propTypes = {
// 	markets: PropTypes.array,
// 	pagination: PropTypes.object
// };

export default injectIntl(MarketsList);
