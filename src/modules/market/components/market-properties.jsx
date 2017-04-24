import React from 'react';
import ReactTooltip from 'react-tooltip';

import ValueDate from 'modules/common/components/value-date';
import ValueDenomination from 'modules/common/components/value-denomination';

import getValue from 'utils/get-value';
import setShareDenomination from 'utils/set-share-denomination';
import shareDenominationLabel from 'utils/share-denomination-label';

import { FormattedMessage } from 'react-intl';

const MarketProperties = (p) => {
  const shareVolumeRounded = setShareDenomination(getValue(p, 'volume.rounded'), p.selectedShareDenomination);
  const shareVolumeFormatted = getValue(p, 'volume.formatted');
  const shareDenomination = shareDenominationLabel(p.selectedShareDenomination, p.shareDenominations);

  return (
    <ul className="market-properties">
      {p.endDate &&
        <li className="property end-date">
          <a
            data-tip
            data-for={`${p.id}-end-date-tooltip`}
            data-event="click focus"
          >
            <span className="property-label">{(p.isOpen && !p.isPendingReport ? (p.endDateLabel || 'End Date') : 'Ended')}:</span>
            <ValueDate className="property-value" {...p.endDate} />
          </a>
          <ReactTooltip
            id={`${p.id}-end-date-tooltip`}
            type="light"
            effect="solid"
            place="top"
            globalEventOff="click"
          >
            <span className="tooltip-text">
              <FormattedMessage
                id="outcome_date"
                defaultMessage={`The outcome of this event will be known on or before {date}.`}
                values={{ date: <span>{ p.endDate.full }</span> }}
              />
            </span>
          </ReactTooltip>
        </li>
      }
      <li className="property fee">
        <a
          data-tip
          data-for={`${p.id}-maker-fee-tooltip`}
          data-event="click focus"
        >
          <span className="property-label">
            <FormattedMessage
              id="maker_fee"
              defaultMessage="Maker Fee:"
            />
          </span>
          <ValueDenomination className="property-value" {...p.makerFeePercent} />
        </a>
        <ReactTooltip
          id={`${p.id}-maker-fee-tooltip`}
          type="light"
          effect="solid"
          place="top"
          globalEventOff="click"
        >
          <span className="tooltip-text">
            {p.makerFeePercent.full} discounted fee for placing bids or asks on the books
          </span>
        </ReactTooltip>
      </li>
      <li className="property fee">
        <a
          data-tip
          data-for={`${p.id}-taker-fee-tooltip`}
          data-event="click focus"
        >
          <span className="property-label">
            <FormattedMessage
              id="taker_fee"
              defaultMessage="Taker Fee:"
            />
          </span>
          <ValueDenomination className="property-value" {...p.takerFeePercent} />
        </a>
        <ReactTooltip
          id={`${p.id}-taker-fee-tooltip`}
          type="light"
          effect="solid"
          place="top"
          globalEventOff="click"
        >
          <span className="tooltip-text">
            {p.takerFeePercent.full} fee for taking bids or asks from the books
          </span>
        </ReactTooltip>
      </li>
      {shareVolumeRounded &&
        <li className="property volume">
          <a
            data-tip
            data-for={`${p.id}-volume-tooltip`}
            data-event="click focus"
          >
            <span className="property-label">
              <FormattedMessage
                id="volume"
                defaultMessage="Volume:"
              />
            </span>
            <ValueDenomination className="property-value" formatted={shareVolumeRounded} denomination={shareDenomination} />
          </a>
          <ReactTooltip
            id={`${p.id}-volume-tooltip`}
            type="light"
            effect="solid"
            place="top"
            globalEventOff="click"
          >
            <span className="tooltip-text">
              <FormattedMessage
                id="share_total_traded"
                defaultMessage="{shareVolumeFormatted} total {denomination} traded"
                values={{ shareVolumeFormatted, denomination: p.volume.denomination }}
              />
            </span>
          </ReactTooltip>
        </li>
      }
      {p.numPendingReports && p.isPendingReport &&
        <li className="property pending-reports">
          <a
            data-tip
            data-for={`${p.id}-pending-reports-tooltip`}
            data-event="click focus"
          >
            <span className="property-label">
              <FormattedMessage
                id="pending_reports"
                defaultMessage="Pending Reports:"
              />
            </span>
            <span> <strong>{p.numPendingReports}</strong></span>
          </a>
          <ReactTooltip
            id={`${p.id}-pending-reports-tooltip`}
            type="light"
            effect="solid"
            place="top"
            globalEventOff="click"
          >
            <span className="tooltip-text">
              <FormattedMessage
                id="pending_reports_thus_far"
                defaultMessage="{ numPendingReports } reports submitted on this market thus far"
                values={{ numPendingReports: p.numPendingReports }}
              />
            </span>
          </ReactTooltip>
        </li>
      }
    </ul>
  );
};

export default MarketProperties;
