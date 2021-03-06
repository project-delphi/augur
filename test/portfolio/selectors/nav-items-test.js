import { describe, it, before } from 'mocha';
import { assert } from 'chai';

import sinon from 'sinon';
import proxyquire from 'proxyquire';

import { MY_POSITIONS, MY_MARKETS, MY_REPORTS } from 'modules/app/constants/views';

import { formatNumber, formatEther, formatRep } from 'utils/format-number';

describe('modules/portfolio/selectors/nav-items', () => {
  proxyquire.noPreserveCache().noCallThru();

  let actual;

  const stubbedSelectors = {
    links: {
      myPositionsLink: {
        label: 'test',
        link: {
          href: 'test',
          onClick: 'fake function'
        },
        page: 'test'
      },
      myMarketsLink: {
        label: 'test',
        link: {
          href: 'test',
          onClick: 'fake function'
        },
        page: 'test'
      },
      myReportsLink: {
        label: 'test',
        link: {
          href: 'test',
          onClick: 'fake function'
        },
        page: 'test'
      }
    }
  };

  const selectors = {
    selectMyPositionsSummary: () => {},
    selectMyMarketsSummary: () => {},
    selectMyReportsSummary: () => {},
    selectLinks: () => {}
  };

  const stubbedMyPositionsSummary = sinon.stub(selectors, 'selectMyPositionsSummary', () => (
    {
      numPositions: formatNumber(10, { denomination: 'positions' }),
      totalNet: formatEther(2)
    }
  ));
  const stubbedMyMarketsSummary = sinon.stub(selectors, 'selectMyMarketsSummary', () => (
    {
      numMarkets: 30,
      totalValue: 10
    }
  ));

  const stubbedMyReportsSummary = sinon.stub(selectors, 'selectMyReportsSummary', () => (
    {
      numReports: 10,
      netRep: 5
    }
  ));

  const stubbedLinks = sinon.stub(selectors, 'selectLinks', () => stubbedSelectors.links);

  const proxiedSelector = proxyquire('../../../src/modules/portfolio/selectors/portfolio-nav-items', {
    '../../my-positions/selectors/my-positions-summary': stubbedMyPositionsSummary,
    '../../my-markets/selectors/my-markets-summary': stubbedMyMarketsSummary,
    '../../my-reports/selectors/my-reports-summary': stubbedMyReportsSummary,
    '../../link/selectors/links': stubbedLinks,
    '../../../selectors': stubbedSelectors
  });

  const expected = [
    {
      label: 'Positions',
      link: {
        label: 'test',
        link: {
          href: 'test',
          onClick: 'fake function'
        },
        page: 'test'
      },
      page: MY_POSITIONS,
      leadingTitle: 'Total Number of Positions',
      leadingValue: formatNumber(10, { denomination: 'positions' }),
      leadingValueNull: 'No Positions',
      trailingTitle: 'Total Profit/Loss',
      trailingValue: formatEther(2),
      trailingValueNull: 'No Profit/Loss'
    },
    {
      label: 'Markets',
      link: {
        label: 'test',
        link: {
          href: 'test',
          onClick: 'fake function'
        },
        page: 'test'
      },
      page: MY_MARKETS,
      leadingTitle: 'Total Markets',
      leadingValue: formatNumber(30, { denomination: 'Markets' }),
      leadingValueNull: 'No Markets',
      trailingTitle: 'Total Gain/Loss',
      trailingValue: formatEther(10, { denomination: ' ETH' }),
      trailingValueNull: 'No Gain/Loss'
    },
    {
      label: 'Reports',
      link: {
        label: 'test',
        link: {
          href: 'test',
          onClick: 'fake function'
        },
        page: 'test'
      },
      page: MY_REPORTS,
      leadingTitle: 'Total Reports',
      leadingValue: formatNumber(10, { denomination: 'Reports' }),
      leadingValueNull: 'No Reports',
      trailingTitle: 'Total Gain/Loss',
      trailingValue: formatRep(5, { denomination: ' REP' }),
      trailingValueNull: 'No Gain/Loss'
    }
  ];

  before(() => {
    actual = proxiedSelector.default();
  });

  it(`should call 'selectMyPositionsSummary' once`, () => {
    assert(stubbedMyPositionsSummary.calledOnce, `Didn't call 'selectMyPositionsSummary' once as expected`);
  });

  it(`should call 'selectMyMarketsSummary' once`, () => {
    assert(stubbedMyMarketsSummary.calledOnce, `Didn't call 'selectMyMarketsSummary' once as expected`);
  });

  it(`should call 'selectMyReportsSummary' once`, () => {
    assert(stubbedMyReportsSummary.calledOnce, `Didn't call 'selectMyReportsSummary' once as expected`);
  });

  it('should return the expected array', () => {
    assert.deepEqual(expected, actual, `Didn't return the expected array`);
  });
});
