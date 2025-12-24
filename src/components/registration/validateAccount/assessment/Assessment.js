import React, { Fragment } from "react";
import "./index.scss";
import { Translate } from "react-localize-redux";
import Button from "spotify-shared-web/components/common/Button";
import LoadingComponent from "spotify-shared-web/components/common/LoadingComponent";
import SCREEN_CONFIG from "../../../../screensConfig";

const CURRENT_SCREEN = SCREEN_CONFIG.registrationAssesment;

export const Assessment = ({
  onBeginAssesment,
  isScreeeningUrlGenerated,
  agentProfile,
  isLoading,
  isRefreshed,
  outStandingTask,
}) => {
  if (!agentProfile.isScreeningAssessmentRequired) return <LoadingComponent />;
  return (
    <Translate>
      {({ translate }) => (
        <Fragment>
          <div className="assessment-container">
            <h1 className="harv-assessment-title">
              {" "}
              {translate(
                `${CURRENT_SCREEN}.COMPLETE YOUR spotify® PLATFORM ASSESSMENT`
              )}
            </h1>

            <p className="assessment-info">
              {agentProfile.isScreeningAssessmentRequired &&
              agentProfile.isScreeningAssessmentRequired.assessmentFailed
                ? translate(`${CURRENT_SCREEN}.assesmentError`)
                : translate(`${CURRENT_SCREEN}.assesmentInfo`)}
            </p>

            {(!agentProfile.isScreeningAssessmentRequired ||
              agentProfile.isScreeningAssessmentRequired.assessmentRequired ||
              outStandingTask) &&
              !agentProfile.isScreeningAssessmentRequired.assessmentFailed && (
                <Button
                  isSubmitting={(isLoading && !isScreeeningUrlGenerated )|| isRefreshed}
                  style={{
                    height: "42px",
                    fontSize: "larger",
                    borderRadius: "2px",
                    minWidth : "95px"
                  }}
                  onClick={onBeginAssesment}
                >
                  {translate(
                    `${CURRENT_SCREEN}.${
                      isScreeeningUrlGenerated ? "refresh" : "beginAssesment"
                    }`
                  )}
                </Button>
              )}

            <p className="assessment-note">
              {agentProfile.isScreeningAssessmentRequired &&
              agentProfile.isScreeningAssessmentRequired.assessmentFailed
                ? translate(`${CURRENT_SCREEN}.retakeNote`) +
                  " " +
                  Math.ceil(
                    Math.abs((new Date(
                      agentProfile.isScreeningAssessmentRequired.nextAvailableDate
                    ) -
                      new Date())) /
                      (1000 * 60 * 60 * 24)
                  ) +
                  " " +
                  translate(`${CURRENT_SCREEN}.days`) +
                  "."
                : translate(`${CURRENT_SCREEN}.assesmentNote`)}
            </p>

            {!isScreeeningUrlGenerated &&
              !(
                agentProfile.isScreeningAssessmentRequired &&
                agentProfile.isScreeningAssessmentRequired.assessmentFailed
              ) && (
                <p className="assessment-good-luck">
                  {translate(
                    `${CURRENT_SCREEN}.Good luck with your assessment`
                  )}
                </p>
              )}
          </div>
        </Fragment>
      )}
    </Translate>
  );
};
