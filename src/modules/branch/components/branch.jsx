import React, { PropTypes } from 'react';
import ReactTooltip from 'react-tooltip';
import { FormattedMessage } from 'react-intl';
import { Line } from 'rc-progress';

import Bullet from 'modules/common/components/bullet';

const Branch = p => (
  <article className="branch-info">
    <Line
      percent={p.currentPeriodProgress}
      strokeWidth="1"
      strokeColor="#5c2634"
    />
    <span className="reporting-cycle-info">
      <FormattedMessage
        id="reporting_cycle_period"
        defaultMessage="Reporting Cycle {reportPeriod}"
        values={{ reportPeriod: p.reportPeriod }}
      />
      <Bullet /> {Math.round(p.currentPeriodProgress)}% complete <Bullet /> {p.phaseLabel} phase ends {p.phaseTimeRemaining}
    </span>
    <span
      data-tip
      data-for="branch-id-tooltip"
      data-event="click focus"
      className="branch-description pointer"
    >
      {p.description} <Bullet /> {p.periodLength / 3600} hours per cycle
    </span>
    <ReactTooltip
      id="branch-id-tooltip"
      type="light"
      effect="float"
      place="top"
      globalEventOff="click"
    >
      <span className="tooltip-text">
        Branch ID: {p.id}
      </span>
    </ReactTooltip>
  </article>
);

Branch.propTypes = {
  className: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.string,
  periodLength: PropTypes.number,
  phaseLabel: PropTypes.string,
  phaseTimeRemaining: PropTypes.string,
  currentPeriodProgress: PropTypes.number
};

export default Branch;
