import React, { Fragment } from "react";
import "./index.scss";
import { Translate } from "react-localize-redux";
import SCREEN_CONFIG from "../../../../../screensConfig";

const CURRENT_SCREEN = SCREEN_CONFIG.registrationPcScan;

export const ScanResults = ({ pcScanResults, handleSubmit, outstandingTask }) => {
  return (
    <Translate>
      {({ translate }) => (
        <Fragment>
          <div className="scan-results-container">
            <h1 className="title">
              {translate(`${CURRENT_SCREEN}.Scan Complete`)}
            </h1>
            <p className="overall-result">
              <strong>{translate(`${CURRENT_SCREEN}.Overall Result`)}:</strong>{" "}
              <span
                className={`result-${pcScanResults.globalResult.toLowerCase()}`}
              >
                {translate(`${CURRENT_SCREEN}.${pcScanResults.globalResult}`)}
              </span>
            </p>

            <table className="results-table">
              <thead>
                <tr>
                  <th className="bold-title">{translate(`${CURRENT_SCREEN}.Specification Name`)}</th>
                  <th className="bold-title">{translate(`${CURRENT_SCREEN}.Your Results`)}</th>
                  <th className="bold-title">{translate(`${CURRENT_SCREEN}.Requirement`)}</th>
                  <th className="bold-title">{translate(`${CURRENT_SCREEN}.Result`)}</th>
                </tr>
              </thead>
              <tbody>
                {pcScanResults.results.map((row, index) => (
                  <tr key={index}>
                    <td>{row.specName}</td>
                    <td>{row.specValue}</td>
                    <td>{row.requirement}</td>
                    <td className={`result-${row.grade.toLowerCase()}`}>
                    {translate(`${CURRENT_SCREEN}.${row.grade}`)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="next-button-container">
              <button className="next-button" onClick={handleSubmit}>
                {pcScanResults.globalResult === "PASS"
                  ? outstandingTask ? translate("Finish") :  translate("Next")
                  : translate(`${CURRENT_SCREEN}.Retake PC Scan`)}
              </button>
            </div>
          </div>
        </Fragment>
      )}
    </Translate>
  );
};
