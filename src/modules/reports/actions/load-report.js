import { augur } from '../../../services/augurjs';
import { decryptReport } from '../../reports/actions/report-encryption';
import { updateReport } from '../../reports/actions/update-reports';

export function loadReport(branchID, period, eventID, marketID, callback) {
  return (dispatch, getState) => {
    const { loginAccount, marketsData } = getState();
    const market = marketsData[marketID];
    if (!market) {
      console.error('loadReport failed:', branchID, marketID, market);
      return callback(null);
    }
    augur.getReport(branchID, period, eventID, loginAccount.address, market.minValue, market.maxValue, market.type, (report) => {
      console.log('got report:', report);
      if (!report || !report.report || report.error) {
        return callback(report || 'getReport failed');
      }
      const reportedOutcomeID = report.report;
      if (reportedOutcomeID && reportedOutcomeID !== '0' && !reportedOutcomeID.error) {
        dispatch(updateReport(branchID, eventID, {
          period,
          marketID,
          reportedOutcomeID,
          isIndeterminate: report.isIndeterminate,
          reportHash: null,
          salt: null,
          isUnethical: false,
          isRevealed: true,
          isCommitted: true
        }));
        return callback(null);
      }
      augur.getReportHash(branchID, period, loginAccount.address, eventID, (reportHash) => {
        if (!reportHash || reportHash.error || !parseInt(reportHash, 16)) {
          console.log('reportHash:', reportHash);
          dispatch(updateReport(branchID, eventID, {
            period,
            marketID,
            reportedOutcomeID: null,
            salt: null,
            isUnethical: false,
            reportHash: null,
            isRevealed: false,
            isCommitted: false
          }));
          return callback(null);
        }
        decryptReport(branchID, period, eventID, (err, decryptedReport) => {
          if (err) return callback(err);
          console.log('decryptedReport:', decryptedReport);
          if (decryptedReport.reportedOutcomeID) {
            const { report, isIndeterminate } = augur.unfixReport(
              decryptedReport.reportedOutcomeID,
              market.minValue,
              market.maxValue,
              market.type
            );
            decryptedReport.reportedOutcomeID = report;
            decryptedReport.isIndeterminate = isIndeterminate;
          }
          dispatch(updateReport(branchID, eventID, {
            period,
            marketID,
            ...decryptedReport,
            reportHash,
            isUnethical: false,
            isRevealed: false,
            isCommitted: true
          }));
          callback(null);
        });
      });
    });
  };
}
