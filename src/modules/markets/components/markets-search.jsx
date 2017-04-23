import React, { PropTypes } from 'react';
import Input from 'modules/common/components/input';
import { injectIntl, intlShape } from 'react-intl';

const MarketsSearch = (p) => {
  const placeholder = p.intl.formatMessage({ id: 'search_markets', defaultMessage: 'Search Markets' });
  return (
    <article className={`search-input ${p.className}`} >
      <Input
        isSearch
        isClearable
        placeholder={placeholder}
        value={p.keywords}
        onChange={p.onChangeKeywords}
      />
    </article>
  );
};

MarketsSearch.propTypes = {
  className: PropTypes.string,
  keywords: PropTypes.string,
  onChangeKeywords: PropTypes.func,
  intl: intlShape.isRequired
};

export default injectIntl(MarketsSearch);
