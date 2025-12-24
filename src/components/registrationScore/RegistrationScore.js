import React, { Fragment } from "react";
import "./index.scss";
import { Translate } from "react-localize-redux";
import MainLayoutFullNavAuthenticated from "../layouts/MainLayoutFullNavAuthenticated";
import { connect } from "react-redux";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import infoIcon from "../../assets/images/info-icon-green.png";
import SCREEN_CONFIG from "../../screensConfig";

const CURRENT_SCREEN = SCREEN_CONFIG.waitlistScreen;

const RegistrationScore = ({
  agentProfile,
}) => {
  return (
    <Translate>
      {({ translate }) => (
        <Fragment>
          <div className="registration-container">
            <h1 className="registration-header">
              {translate(`${CURRENT_SCREEN}.Congratulations`)}
            </h1>
            <p className="registration-info">
              {translate(`${CURRENT_SCREEN}.registrationScoreDesc`)}
            </p>

            <div className="user-info">
              <p>
                {translate(`${CURRENT_SCREEN}.ID`)}: {agentProfile.agentId}
              </p>
              <p>
                {translate(`${CURRENT_SCREEN}.Username`)}:{" "}
                {agentProfile.firstName} {agentProfile.lastName}
              </p>
              <p>
                {translate(`${CURRENT_SCREEN}.Tier`)}:{" "}
                <strong>
                  {" "}
                  {agentProfile.registrationEnrollmentScore.tier__c}{" "}
                </strong>
                <OverlayTrigger
                  placement={"right"}
                  overlay={
                    <Tooltip className="tooltip" id={`tooltip-top`}>
                      <span>
                        {
                          agentProfile.waitListToolTipDetails
                            .tier_Description__c
                        }
                      </span>
                    </Tooltip>
                  }
                >
                  <span>
                    <img src={infoIcon} alt="" className={"tooltip-icon"} />
                  </span>
                </OverlayTrigger>
              </p>
              <p>
                {translate(`${CURRENT_SCREEN}.Score`)}:{" "}
                <strong>
                  {" "}
                  {agentProfile.registrationEnrollmentScore
                    .enrollment_Score__c &&
                  agentProfile.registrationEnrollmentScore
                    .enrollment_Score__c !== "0.0"
                    ? agentProfile.registrationEnrollmentScore
                        .enrollment_Score__c
                    : agentProfile.registrationEnrollmentScore
                        .registration_Score__c}{" "}
                </strong>
                <OverlayTrigger
                  placement={"right"}
                  overlay={
                    <Tooltip className="tooltip" id={`tooltip-top`}>
                      <span>
                        {agentProfile.registrationEnrollmentScore
                          .enrollment_Score__c &&
                        agentProfile.registrationEnrollmentScore
                          .enrollment_Score__c !== "0.0"
                          ? agentProfile.waitListToolTipDetails
                              .enrollment_Score_Description__c
                          : agentProfile.waitListToolTipDetails
                              .registration_Score_Description__c}
                      </span>
                    </Tooltip>
                  }
                >
                  <span>
                    <img src={infoIcon} alt="" className={"tooltip-icon"} />
                  </span>
                </OverlayTrigger>
              </p>
            </div>

            <p>{translate(`${CURRENT_SCREEN}.registrationDesc1`)}</p>

            <h2 className="score-header">
              {translate(`${CURRENT_SCREEN}.scoreHeader`)}
            </h2>
            {!(agentProfile.registrationEnrollmentScore.enrollment_Score__c &&
            agentProfile.registrationEnrollmentScore.enrollment_Score__c !==
              "0.0") ? (
              <div className="score-breakdown">
                <p>
                  {translate(`${CURRENT_SCREEN}.HarverScore`)}:{" "}
                  <strong>
                    {" "}
                    {
                      agentProfile.registrationEnrollmentScore.harver_Score__c
                    }{" "}
                  </strong>
                  <OverlayTrigger
                    placement={"right"}
                    overlay={
                      <Tooltip className="tooltip" id={`tooltip-top`}>
                        <span>
                          {
                            agentProfile.waitListToolTipDetails
                              .harver_Score_Description__c
                          }
                        </span>
                      </Tooltip>
                    }
                  >
                    <span>
                      <img src={infoIcon} alt="" className={"tooltip-icon"} />
                    </span>
                  </OverlayTrigger>
                </p>
                <p>
                  {translate(`${CURRENT_SCREEN}.PC Scan`)}:{" "}
                  <strong>
                    {" "}
                    {agentProfile.registrationEnrollmentScore
                      .pC_Scan_Score_Component__c === "true"
                      ? "PASS"
                      : "FAIL"}{" "}
                  </strong>
                  <OverlayTrigger
                    placement={"right"}
                    overlay={
                      <Tooltip className="tooltip" id={`tooltip-top`}>
                        <span>
                          {
                            agentProfile.waitListToolTipDetails
                              .pC_Scan_Result_Description__c
                          }
                        </span>
                      </Tooltip>
                    }
                  >
                    <span>
                      <img src={infoIcon} alt="" className={"tooltip-icon"} />
                    </span>
                  </OverlayTrigger>
                </p>
                <p>
                  {translate(`${CURRENT_SCREEN}.spotify® Platform 101`)}:{" "}
                  <strong>
                    {" "}
                    {agentProfile.registrationEnrollmentScore
                      .educational_Module__c === "true"
                      ? "Complete"
                      : "Incomplete"}{" "}
                  </strong>
                  <OverlayTrigger
                    placement={"right"}
                    overlay={
                      <Tooltip className="tooltip" id={`tooltip-top`}>
                        <span>
                          {
                            agentProfile.waitListToolTipDetails
                              .educational_Module_Result_Description__c
                          }
                        </span>
                      </Tooltip>
                    }
                  >
                    <span>
                      <img src={infoIcon} alt="" className={"tooltip-icon"} />
                    </span>
                  </OverlayTrigger>
                </p>
                <p>
                  {translate(`${CURRENT_SCREEN}.top20SP`)}:{" "}
                  <strong>
                    {" "}
                    {agentProfile.registrationEnrollmentScore
                      .top_Service_Partner_Flag__c === "true"
                      ? "Yes"
                      : "No"}{" "}
                  </strong>
                  <OverlayTrigger
                    placement={"right"}
                    overlay={
                      <Tooltip className="tooltip">
                        <span>
                          {
                            agentProfile.waitListToolTipDetails
                              .top_20_Service_Partner_Flag_Description__c
                          }
                        </span>
                      </Tooltip>
                    }
                  >
                    <span>
                      <img src={infoIcon} alt="" className={"tooltip-icon"} />
                    </span>
                  </OverlayTrigger>
                </p>
                <p>
                  {translate(`${CURRENT_SCREEN}.Email Engagement`)}:{" "}
                  <strong>
                    {" "}
                    {agentProfile.registrationEnrollmentScore
                      .email_Engagement__c === "true"
                      ? "Engaged"
                      : "Not Engaged"}{" "}
                  </strong>
                  <OverlayTrigger
                    placement={"right"}
                    overlay={
                      <Tooltip className="tooltip" id={`tooltip-top`}>
                        <span>
                          {
                            agentProfile.waitListToolTipDetails
                              .email_Engagement_Description__c
                          }
                        </span>
                      </Tooltip>
                    }
                  >
                    <span>
                      <img src={infoIcon} alt="" className={"tooltip-icon"} />
                    </span>
                  </OverlayTrigger>
                </p>
                <p>
                  {translate(`${CURRENT_SCREEN}.On-Demand/Live Info Session`)}:{" "}
                  <strong>
                    {" "}
                    {agentProfile.registrationEnrollmentScore
                      .live_Session_Attendance__c === "true"
                      ? "Attended"
                      : "Missed"}{" "}
                  </strong>
                  <OverlayTrigger
                    placement={"right"}
                    overlay={
                      <Tooltip className="tooltip" id={`tooltip-top`}>
                        <span>
                          {
                            agentProfile.waitListToolTipDetails
                              .live_Session_Attendance_Description__c
                          }
                        </span>
                      </Tooltip>
                    }
                  >
                    <span>
                      <img src={infoIcon} alt="" className={"tooltip-icon"} />
                    </span>
                  </OverlayTrigger>
                </p>
                {/* <p>
                  {translate(`${CURRENT_SCREEN}.Failed Enrollment`)}:{" "}
                  <strong>
                    {" "}
                    {agentProfile.registrationEnrollmentScore
                      .failed_Enrolment_Flag__c === "true"
                      ? "Yes"
                      : "No"}{" "}
                  </strong>
                  <OverlayTrigger
                    placement={"right"}
                    overlay={
                      <Tooltip className="tooltip" id={`tooltip-top`}>
                        <span>
                          {
                            agentProfile.waitListToolTipDetails
                              .enrollment_Score_Description__c
                          }
                        </span>
                      </Tooltip>
                    }
                  >
                    <span>
                      <img src={infoIcon} alt="" className={"tooltip-icon"} />
                    </span>
                  </OverlayTrigger>
                </p>{" "} */}
              </div>
            ) : (
              <div className="score-breakdown">
                <p>
                  {translate(`${CURRENT_SCREEN}.Historical Certification Rate`)}
                  :{" "}
                  <strong>
                    {" "}
                    {
                      agentProfile.registrationEnrollmentScore
                        .certification_Rate__c
                    }{" "}
                  </strong>
                  <OverlayTrigger
                    placement={"right"}
                    overlay={
                      <Tooltip className="tooltip" id={`tooltip-top`}>
                        <span>
                          {
                            agentProfile.waitListToolTipDetails
                              .certification_Rate_Description__c
                          }
                        </span>
                      </Tooltip>
                    }
                  >
                    <span>
                      <img src={infoIcon} alt="" className={"tooltip-icon"} />
                    </span>
                  </OverlayTrigger>
                </p>
                <p>
                  {translate(`${CURRENT_SCREEN}.All Time Hours Serviced`)}:{" "}
                  <strong>
                    {" "}
                    {
                      agentProfile.registrationEnrollmentScore
                        .all_Time_Hours_Serviced__c
                    }{" "}
                  </strong>
                  <OverlayTrigger
                    placement={"right"}
                    overlay={
                      <Tooltip className="tooltip" id={`tooltip-top`}>
                        <span>
                          {
                            agentProfile.waitListToolTipDetails
                              .all_time_Hours_Serviced_Description__c
                          }
                        </span>
                      </Tooltip>
                    }
                  >
                    <span>
                      <img src={infoIcon} alt="" className={"tooltip-icon"} />
                    </span>
                  </OverlayTrigger>
                </p>
                <p>
                  {translate(`${CURRENT_SCREEN}.All-Time Commitment Adherence`)}
                  :{" "}
                  <strong>
                    {" "}
                    {
                      agentProfile.registrationEnrollmentScore
                        .commitment_Adherence__c
                    }{" "}
                  </strong>
                  <OverlayTrigger
                    placement={"right"}
                    overlay={
                      <Tooltip className="tooltip" id={`tooltip-top`}>
                        <span>
                          {
                            agentProfile.waitListToolTipDetails
                              .committment_Adherence_Description__c
                          }
                        </span>
                      </Tooltip>
                    }
                  >
                    <span>
                      <img src={infoIcon} alt="" className={"tooltip-icon"} />
                    </span>
                  </OverlayTrigger>
                </p>
                <p>
                  {translate(`${CURRENT_SCREEN}.top20SP`)}:{" "}
                  <strong>
                    {" "}
                    {agentProfile.registrationEnrollmentScore
                      .top_Service_Partner_Flag__c === "true"
                      ? "Yes"
                      : "No"}{" "}
                  </strong>
                  <OverlayTrigger
                    placement={"right"}
                    overlay={
                      <Tooltip className="tooltip">
                        <span>
                          {
                            agentProfile.waitListToolTipDetails
                              .top_20_Service_Partner_Flag_Description__c
                          }
                        </span>
                      </Tooltip>
                    }
                  >
                    <span>
                      <img src={infoIcon} alt="" className={"tooltip-icon"} />
                    </span>
                  </OverlayTrigger>
                </p>
                <p>
                  {translate(`${CURRENT_SCREEN}.Total Time Contracted`)}:{" "}
                  <strong>
                    {" "}
                    {
                      agentProfile.registrationEnrollmentScore
                        .total_Time_Contracted__c
                    }{" "}
                  </strong>
                  <OverlayTrigger
                    placement={"right"}
                    overlay={
                      <Tooltip className="tooltip" id={`tooltip-top`}>
                        <span>
                          {
                            agentProfile.waitListToolTipDetails
                              .total_Time_Contracted_Description__c
                          }
                        </span>
                      </Tooltip>
                    }
                  >
                    <span>
                      <img src={infoIcon} alt="" className={"tooltip-icon"} />
                    </span>
                  </OverlayTrigger>
                </p>
                <p>
                  {translate(`${CURRENT_SCREEN}.90-Day Drop Penalty`)}:{" "}
                  <strong>
                    {" "}
                    {agentProfile.registrationEnrollmentScore
                      .drop_Penalty_Flag__c === "true"
                      ? "Yes"
                      : "No"}{" "}
                  </strong>
                  <OverlayTrigger
                    placement={"right"}
                    overlay={
                      <Tooltip className="tooltip" id={`tooltip-top`}>
                        <span>
                          {
                            agentProfile.waitListToolTipDetails
                              .drop_Penalty_Flag_Description__c
                          }
                        </span>
                      </Tooltip>
                    }
                  >
                    <span>
                      <img src={infoIcon} alt="" className={"tooltip-icon"} />
                    </span>
                  </OverlayTrigger>
                </p>
              </div>
            )}

            <p className="footer-message">
              {translate(`${CURRENT_SCREEN}.thankNote`)}
            </p>
          </div>
        </Fragment>
      )}
    </Translate>
  );
};

function mapStateToProps({ agentProfile }) {
  return {
    agentProfile,
  };
}
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationScore);
