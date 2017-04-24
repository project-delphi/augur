import React from 'react';
import { FormattedMessage } from 'react-intl';
import Link from 'modules/link/components/link';

const MarketsPagination = p => (
  <div className="markets-pagination">
    <div className="markets-pagination-group-1">
      {!!p.pagination && !!p.pagination.previousPageNum &&
        <Link
          {...p.pagination.previousPageLink}
          className="button"
        >
          <i className="fa fa-angle-left" />
        </Link>
      }
    </div>

    <div className="markets-pagination-group-2">
      <span className="pagination-count">
        <FormattedMessage
          id="x_to_x_of_x"
          defaultMessage="{currentNums} of {numUnpaginated}"
          values={{ currentNums: `${p.pagination.startItemNum} - ${p.pagination.endItemNum}`, numUnpaginated: p.pagination.numUnpaginated }}
        />
      </span>
    </div>

    <div className="markets-pagination-group-3">
      {!!p.pagination && !!p.pagination.nextPageNum &&
        <Link
          {...p.pagination.nextPageLink}
          className="button"
        >
          <i className="fa fa-angle-right" />
        </Link>
      }
    </div>
  </div>
);

export default MarketsPagination;
