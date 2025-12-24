import React, { Fragment, useEffect } from "react";
import "./index.scss";
import { Translate } from "react-localize-redux";
import LoadingComponent from "spotify-shared-web/components/common/LoadingComponent";
import ButtonLoading from "spotify-shared-web/components/common/ButtonLoading";
import SCREEN_CONFIG from "../../../../../screensConfig";

const CURRENT_SCREEN = SCREEN_CONFIG.registrationPcScan;

export const RunPcScan = ({
  agentProfile,
  fetchPCScanRequirements,
  requirements,
  onRunPCScan,
  pcScanResults,
  isFetching,
  rulesetId
}) => {
  useEffect(() => {
    fetchPCScanRequirements({ agentId: agentProfile.agentId , rulesetId : rulesetId});
  }, [rulesetId]);

  return (
    <Translate>
      {({ translate }) => (
        <Fragment>
          <div className="pc-scan-container">
            <div className="title">
              {translate(`${CURRENT_SCREEN}.heading`)}
            </div>

            <div className="important-info">
              <p>
                {translate(`${CURRENT_SCREEN}.Important`)}{" "}
                {translate(`${CURRENT_SCREEN}.instruction`)}
              </p>
            </div>

            <section className="pc-check-info">
              <div>
                {translate(
                  `${CURRENT_SCREEN}.What is the PC check and how do I run it?`
                )}
              </div>
              {translate(`${CURRENT_SCREEN}.description`)}
              <div>
                <span className="bold-title">
                  {translate(`${CURRENT_SCREEN}.NOTE`)}
                </span>{" "}
                {translate(`${CURRENT_SCREEN}.descriptionNote`)}
              </div>
            </section>

            <section className="failed-tests">
              <div>
                {translate(
                  `${CURRENT_SCREEN}.What if my computer fails any of the tests?`
                )}
              </div>
              {translate(`${CURRENT_SCREEN}.testDescription`)}
            </section>

            <section className="support-info">
              <div>
                {translate(
                  `${CURRENT_SCREEN}.Is there a support specialist available to check my computer?`
                )}
              </div>
              <p>{translate(`${CURRENT_SCREEN}.supportSpecialist`)}</p>
            </section>

            <section className="requirements">
              <div className="bold-title">
                {translate(`${CURRENT_SCREEN}.specificationHeading`)}
              </div>
              <table className="requirements-table">
                <thead>
                  <tr>
                    <th className="bold-title">
                      {translate(`${CURRENT_SCREEN}.Specification Name`)}
                    </th>
                    <th className="bold-title">
                      {translate(`${CURRENT_SCREEN}.Requirement`)}
                    </th>
                  </tr>
                </thead>
                {isFetching ? (
                  <div className="loader-container-div">
                    <LoadingComponent />{" "}
                  </div>
                ) : (
                  <tbody>
                    {requirements.map((row, index) => (
                      <tr key={index}>
                        <td>{row.component}</td>
                        <td>{row.requirements[0]}</td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </section>

            <div className="button-container">
              <button className="run-scan-button" onClick={onRunPCScan} disabled={isFetching}>
                {isFetching ? (
                  <ButtonLoading />
                ) : pcScanResults &&
                  pcScanResults.globalResult === "UNKNOWN" ? (
                  translate(`${CURRENT_SCREEN}.Retake PC Scan`)
                ) : (
                  translate(`${CURRENT_SCREEN}.Run PC Scan`)
                )}
              </button>
            </div>
          </div>
        </Fragment>
      )}
    </Translate>
  );
};
