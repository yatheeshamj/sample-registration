import React, { Fragment, Component, useState, useEffect } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { Translate } from "spotify-shared-web/localize";
import classNames from "classnames";
import Buttonspotify from "spotify-shared-web/components/common/Button";
import { EnrollmentModuleNames, PhotoIdStatus } from "spotify-shared/constants";
import formHelpers from "spotify-shared/helpers/formHelpers";
import warningIcon from "../../assets/images/warning-red.svg";
import NumberFormat from "react-number-format";
import LoadingComponent from "spotify-shared-web/components/common/LoadingComponent";
import { CongaAgreementStatus } from "../../constants";




const BackgroundAssesmentResult = {
  Pass: "Pass",
  Fail: "Fail",
  InComplete: "InComplete",
  Review: "Review",
  Cancelled: "Cancelled",
  RetainInPlace: "RetainInPlace",
};

const EnrollmentStep = ({
  enrollmentStep,
  onSelfAssessmentStartClick,
  onAssessmentStartClick,
  onPCCheckStartClick,
  onIdVerificationStartClick,
  agreementsToSign,
  onViewSignAgreementClick,
  isMobileDevice,
  idVerificationnResults,
  onBackgroundCheckStartClick,
  onResumeBackgroundCheckClick,
  isBackgroundCheckFetching,
  backgroundCheckData,
  isAgentFromUK,
  onPaymentStartClick,
  photoIdStatusData,
  photoIdIsStatusLoading,
  OnResumePhotoIdClick,
  OnRefreshPhotoIdClick,
  enrollmentCrmId,
  isAgentFromJM,
  NoShowDepositClick,
  classNoShowFees,
  currencyCode,
  NoShowWindow,
  NoShowAutoDrop,
  NoShowReinstate,
  incodeApiNotWorking,
  agreementData,
  showIframe,
  showTrnValidationForm,
  trnData,
  isTRNDataFetching,
  OpenOnPortal,
  goliveDate,
  xDayLimit,
  isAgentFromUSA,
  EnrollmentStatusDate
}) => {
  const openNewTab = (url) => {
    window.open(url, "_blank");
  }


  if (!enrollmentStep) return <Fragment></Fragment>;

  const notSigned = (item) => item.isSigned === false;

  return (
    <Translate>
      {({ translate }) => (
        <Fragment>
          <div
            className={classNames({
              assessment: true,
              active: enrollmentStep.available,
              complete: enrollmentStep.completed,
            })}
          >
            <div className="assessment-top">
              <span className="assessment-title">
                {enrollmentStep.displayName}
              </span>
              <OverlayTrigger
                trigger={["hover", "focus"]}
                key={`popover-${enrollmentStep.crmId}`}
                placement={`bottom`}
                overlay={
                  <Popover id={`popover-${enrollmentStep.crmId}`}>
                    <Popover.Title as="h3">{`${enrollmentStep.displayName}`}</Popover.Title>
                    <Popover.Content>
                      <Fragment>
                        <p>{enrollmentStep.overviewMessage}</p>
                        {enrollmentStep.completed && (
                          <div className="row">
                            <div
                              className="col-auto"
                              style={{ color: "white" }}
                            >
                              <a
                                href="#"
                                className="btn btn-primary disabled"
                                value="Done"
                              >
                                {translate(`Done`)}
                              </a>
                            </div>
                            <div className="col">
                              {translate(`You completed this assessment on`)}{" "}
                              {formHelpers.formatDateTime(
                                enrollmentStep.completedOn
                              )}
                            </div>
                          </div>
                        )}
                      </Fragment>
                    </Popover.Content>
                  </Popover>
                }
              >
                <a className="assessment-popover"></a>
              </OverlayTrigger>
            </div>
            <div
              className={classNames({
                "assessment-bottom": true,
                "d-none":
                  enrollmentStep.availableAfterComplete === false &&
                  enrollmentStep.available === false,
              })}
            >
              {enrollmentStep.inProgress === false && enrollmentStep.failed == false &&
                enrollmentStep.moduleName != EnrollmentModuleNames.PC_CHECK &&
                enrollmentStep.moduleName != EnrollmentModuleNames.PHOTO_ID &&
                enrollmentStep.moduleName != EnrollmentModuleNames.DEPOSIT &&
                <Fragment>
                  <div dangerouslySetInnerHTML={{ __html: enrollmentStep.overviewMessage }}></div>
                </Fragment>
              }

              {
                enrollmentStep.moduleName === EnrollmentModuleNames.PHOTO_ID &&
                photoIdStatusData != null && !photoIdStatusData.incodeApiDown &&
                !photoIdStatusData.reachedMaxAttempts && (photoIdStatusData.canRetry || (photoIdStatusData.isIDVCompleted && !photoIdStatusData.isWorkAuthCompleted)) &&
                !photoIdStatusData.inProgress && !photoIdStatusData.pending && photoIdStatusData.holdMinutesTime == 0 && photoIdStatusData.numberOfAttempts == 0 &&
                <Fragment>
                  <div dangerouslySetInnerHTML={{ __html: enrollmentStep.overviewMessage }}></div>
                </Fragment>
              }
              {
                enrollmentStep.moduleName === EnrollmentModuleNames.PHOTO_ID &&
                photoIdStatusData != null && !photoIdStatusData.incodeApiDown &&
                (!photoIdStatusData.reachedMaxAttempts || photoIdStatusData.canRetry) && !photoIdStatusData.inProgress && !photoIdStatusData.pending && photoIdStatusData.holdMinutesTime == 0 && photoIdStatusData.numberOfAttempts > 0 &&
                <Fragment>

                  <div ><p>{photoIdStatusData.actionContent}</p>	</div>
                </Fragment>
              }
              {
                enrollmentStep.moduleName === EnrollmentModuleNames.PHOTO_ID &&
                photoIdStatusData != null && !photoIdStatusData.incodeApiDown &&
                !photoIdStatusData.reachedMaxAttempts && photoIdStatusData.canRetry && (photoIdStatusData.inProgress || photoIdStatusData.pending) &&
                <Fragment>
                  <div dangerouslySetInnerHTML={{ __html: photoIdStatusData.actionContent }}></div>
                </Fragment>
              }

              {enrollmentStep.completed === false &&
                enrollmentStep.moduleName === EnrollmentModuleNames.PHOTO_ID &&
                photoIdStatusData != null && !photoIdStatusData.incodeApiDown &&
                (photoIdStatusData.reachedMaxAttempts && !photoIdStatusData.canRetry) &&
                <Fragment>
                  <div dangerouslySetInnerHTML={{ __html: photoIdStatusData.actionContent }}></div>

                </Fragment>
              }

              {
                enrollmentStep.moduleName === EnrollmentModuleNames.PHOTO_ID &&
                photoIdStatusData != null && photoIdStatusData.incodeApiDown &&
                <Fragment>
                  <div dangerouslySetInnerHTML={{ __html: photoIdStatusData.actionContent }}></div>
                </Fragment>
              }

              {/*Generic In Progress Message*/}
              {enrollmentStep.inProgress === true &&
                enrollmentStep.failed === false &&
                enrollmentStep.completed === false &&
                enrollmentStep.moduleName !==
                EnrollmentModuleNames.SELF_ASSESSMENT &&
                enrollmentStep.moduleName !== EnrollmentModuleNames.PC_CHECK &&
                enrollmentStep.moduleName !==
                EnrollmentModuleNames.ADDITIONAL_FORMS &&
                enrollmentStep.moduleName !==
                EnrollmentModuleNames.IDENTITY_VERIFICATION &&
                enrollmentStep.moduleName !==
                EnrollmentModuleNames.BACKGROUND_CHECK &&
                enrollmentStep.moduleName !== EnrollmentModuleNames.PHOTO_ID &&
                enrollmentStep.moduleName !== EnrollmentModuleNames.FINGERPRINT &&
                enrollmentStep.moduleName !==
                EnrollmentModuleNames.FORMS_FOR_CLIENT && enrollmentStep.moduleName !==
                EnrollmentModuleNames.DEPOSIT && (
                  <Fragment>
                    <p>{enrollmentStep.inProgressMessage}</p>
                    <div className="row align-items-center">
                      <div className="col-auto">
                        <Buttonspotify
                          disabled={isMobileDevice}
                          onClick={() => onAssessmentStartClick(enrollmentStep)}
                        >
                          {translate("Resume")}
                        </Buttonspotify>
                      </div>
                      <div className="col has-info">
                        {translate(
                          `You already started this prerequisite. Click the button to complete it`
                        )}
                      </div>
                    </div>
                  </Fragment>
                )}

              {/* ADDITIONAL_FORMS Specific  inProgress */}
              {(enrollmentStep.inProgress === true ||
                enrollmentStep.available) &&
                enrollmentStep.failed === false &&
                enrollmentStep.moduleName ===
                EnrollmentModuleNames.ADDITIONAL_FORMS && (
                  <Fragment>
                    <p>{enrollmentStep.inProgressMessage}</p>

                    <div>
                      {agreementsToSign.map((aggrement, key) => (
                        <div
                          key={key}
                          className="mt-4 mb-4 row align-items-center"
                        >
                          <div className="col">{aggrement.templateName}</div>
                          <div className="col-auto">
                            {aggrement.isSigned === false && (
                              <Buttonspotify
                                disabled={aggrement.isSigned || isMobileDevice}
                                onClick={() =>
                                  onViewSignAgreementClick(aggrement)
                                }
                              >
                                {translate("View & Sign")}
                              </Buttonspotify>
                            )}
                            {aggrement.isSigned && (
                              <div className={"signed"}>Signed</div>
                            )}
                          </div>
                          <div className="mt-4 col-12">
                            <div className="separator"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Fragment>
                )}

              {/*Generic Faild Message*/}
              {enrollmentStep.failed === true &&
                enrollmentStep.moduleName !==
                EnrollmentModuleNames.VOICE_ASSESSMENT &&
                enrollmentStep.moduleName !==
                EnrollmentModuleNames.PROGRAM_ASSESSMENT &&
                enrollmentStep.moduleName !==
                EnrollmentModuleNames.INTERVIEW_IQ &&
                enrollmentStep.moduleName !== EnrollmentModuleNames.PC_CHECK &&
                enrollmentStep.moduleName !=
                EnrollmentModuleNames.IDENTITY_VERIFICATION &&
                enrollmentStep.moduleName !=
                EnrollmentModuleNames.BACKGROUND_CHECK &&
                enrollmentStep.moduleName != EnrollmentModuleNames.FINGERPRINT &&
                enrollmentStep.moduleName != EnrollmentModuleNames.PHOTO_ID && enrollmentStep.moduleName != EnrollmentModuleNames.VERIFY_TRN && (
                  <Fragment>
                    {enrollmentStep.inProgress === true && (
                      <>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: enrollmentStep.overviewMessage,
                          }}
                        ></div>
                        <br />
                      </>
                    )}
                    <div className="row align-items-center">
                      <div className="col-auto">
                        <button
                          className="btn btn-secondary "
                          disabled={isMobileDevice}
                          onClick={() => onAssessmentStartClick(enrollmentStep)}
                          style={{ color: "white" }}
                        >
                          {translate(`Try Again`)}
                        </button>
                      </div>
                      <div className="col not-eligible">
                        {enrollmentStep.failedPendingMessage}
                      </div>
                    </div>
                  </Fragment>
                )}

              {/* VOICE_ASSESSMENT, PROGRAM_ASSESSMENT, AND IDENTITY_VERIFICATION Specific Failed */}
              {((enrollmentStep.failed === true &&
                (enrollmentStep.moduleName ===
                  EnrollmentModuleNames.VOICE_ASSESSMENT ||
                  enrollmentStep.moduleName ===
                  EnrollmentModuleNames.PROGRAM_ASSESSMENT ||
                  enrollmentStep.moduleName ===
                  EnrollmentModuleNames.IDENTITY_VERIFICATION ||
                  enrollmentStep.moduleName ===
                  EnrollmentModuleNames.INTERVIEW_IQ)) ||
                (idVerificationnResults &&
                  idVerificationnResults.reachedMaxAttempts === true)) && (
                  <Fragment>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: enrollmentStep.overviewMessage,
                      }}
                    ></div>
                    <br />

                    <div className="row align-items-center">
                      <div className="col">
                        <img
                          className=""
                          style={{
                            height: "25px",
                            marginRight: "10px",
                          }}
                          src={warningIcon}
                          alt=""
                        />
                        {translate("You have failed this Prerequisite.")}{" "}
                        {enrollmentStep.failedPendingMessage}
                      </div>
                    </div>
                  </Fragment>
                )}

              {/*IDENTITY_VERIFICATION Check if the Agent is Allowed to Take the Assessment */}
              {enrollmentStep.moduleName ===
                EnrollmentModuleNames.IDENTITY_VERIFICATION &&
                enrollmentStep.failed === false &&
                idVerificationnResults &&
                idVerificationnResults.allowedToTake === false && (
                  <Fragment>
                    <br />
                    <div className="row align-items-center">
                      <div className="col">
                        <img
                          className=""
                          style={{
                            height: "25px",
                            marginRight: "10px",
                          }}
                          src={warningIcon}
                          alt=""
                        />
                        {translate("Agent Not Allowed to Take Assessment")}
                      </div>
                    </div>
                  </Fragment>
                )}

              {/* BACKGROUND_CHECK Specific Failed */}
              {enrollmentStep.failed === true &&
                enrollmentStep.moduleName ===
                EnrollmentModuleNames.BACKGROUND_CHECK && (
                  <Fragment>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: enrollmentStep.overviewMessage,
                      }}
                    ></div>
                    <br />

                    <div className="row align-items-center">
                      <div className="col ">
                        <img
                          className=""
                          style={{
                            height: "25px",
                            marginRight: "10px",
                          }}
                          src={warningIcon}
                          alt=""
                        />
                        {enrollmentStep.failedPendingMessage}
                      </div>
                    </div>
                  </Fragment>
                )}

              {/*Start Action Button*/}
              <>
                {/* Generic Start */}
                {enrollmentStep.inProgress === false &&
                  enrollmentStep.failed === false &&
                  enrollmentStep.completed === false &&
                  enrollmentStep.available &&
                  enrollmentStep.moduleName !==
                  EnrollmentModuleNames.SELF_ASSESSMENT &&
                  enrollmentStep.moduleName !==
                  EnrollmentModuleNames.PC_CHECK &&
                  enrollmentStep.moduleName !==
                  EnrollmentModuleNames.ADDITIONAL_FORMS &&
                  enrollmentStep.moduleName !==
                  EnrollmentModuleNames.IDENTITY_VERIFICATION &&
                  enrollmentStep.moduleName !==
                  EnrollmentModuleNames.BACKGROUND_CHECK &&
                  enrollmentStep.moduleName !==
                  EnrollmentModuleNames.PHOTO_ID &&
                  enrollmentStep.moduleName !== EnrollmentModuleNames.PAY &&
                  enrollmentStep.moduleName !==
                  EnrollmentModuleNames.FORMS_FOR_CLIENT && enrollmentStep.moduleName !==
                  EnrollmentModuleNames.DEPOSIT &&
                  enrollmentStep.moduleName !== EnrollmentModuleNames.VERIFY_TRN && (
                    <div className="mt-3">
                      <Buttonspotify
                        disabled={isMobileDevice}
                        onClick={() => onAssessmentStartClick(enrollmentStep)}
                      >
                        {" "}
                        {translate("Start")}
                      </Buttonspotify>
                    </div>
                  )}

                {/* PAY Start */}
                {(enrollmentStep.inProgress || enrollmentStep.available) &&
                  (enrollmentStep.moduleName === EnrollmentModuleNames.PAY) && (
                    <Fragment>
                      {enrollmentStep.categoryImportantNote != null && (
                        <div className="mt-3">
                          <h4>Important Notice</h4>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: enrollmentStep.categoryImportantNote,
                            }}
                          ></div>
                        </div>
                      )}
                      {enrollmentStep.bgcProcessingFee != null &&
                        enrollmentStep.bgcProcessingFee > 0 && (
                          <div className="mt-3">
                            <div>
                              <span class="processingFee">
                                Non-Refundable Amount:{" "}
                              </span>
                              <NumberFormat
                                value={enrollmentStep.bgcProcessingFee}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={enrollmentStep.currencyCode}
                              />
                              <span>
                                {" "}
                                **Not refunded when you fail a background check
                              </span>
                            </div>
                          </div>
                        )}
                      {enrollmentStep.bgcInfoDetails != null && (
                        <div className="mt-3">
                          <h4>Background Check</h4>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: enrollmentStep.bgcInfoDetails,
                            }}
                          ></div>
                        </div>
                      )}
                      <div className="mt-3">
                        <Buttonspotify
                          disabled={isMobileDevice}
                          onClick={() => onPaymentStartClick(enrollmentStep)}
                        >
                          {" "}
                          {translate("Start")}
                        </Buttonspotify>
                      </div>
                    </Fragment>
                  )}

                {/* IDENTITY_VERIFICATION Start */}
                {(enrollmentStep.inProgress || enrollmentStep.available) &&
                  enrollmentStep.failed === false &&
                  enrollmentStep.moduleName ==
                  EnrollmentModuleNames.IDENTITY_VERIFICATION &&
                  idVerificationnResults &&
                  idVerificationnResults.reachedMaxAttempts === false &&
                  idVerificationnResults.allowedToTake === true && (
                    <Fragment>
                      <div>
                        {idVerificationnResults != null &&
                          idVerificationnResults.agreements.map(
                            (aggrement, key) => (
                              <div
                                key={key}
                                className="mt-4 mb-4 row align-items-center"
                              >
                                <div className="col">
                                  {aggrement.templateName}
                                </div>
                                <div className="col-auto">
                                  {(agreementData.data == null || agreementData.data.muleSoftDocSignURL == "") && aggrement.isSigned === false && (
                                    <Buttonspotify
                                      disabled={
                                        aggrement.isSigned || isMobileDevice
                                      }
                                      isSubmitting={agreementData.isFetching}
                                      onClick={() =>
                                        onViewSignAgreementClick(aggrement)
                                      }
                                    >
                                      {translate("Start")}
                                    </Buttonspotify>
                                  )}
                                  {agreementData.data != null && agreementData.data.muleSoftDocSignURL && agreementData.data.muleSoftDocStatus !== CongaAgreementStatus.Completed && aggrement.isSigned === false && (
                                    <Buttonspotify
                                      disabled={
                                        aggrement.isSigned || isMobileDevice
                                      }
                                      onClick={() => showIframe()
                                      }
                                      isSubmitting={agreementData.isFetching}
                                    >
                                      {translate("View & Sign")}
                                    </Buttonspotify>
                                  )}
                                  {(aggrement.isSigned || (agreementData.data && agreementData.data.muleSoftDocStatus == CongaAgreementStatus.Completed)) && (
                                    <div className={"signed"}>Signed</div>
                                  )}
                                </div>
                                <div className="mt-4 col-12">
                                  <div className="separator"></div>
                                </div>
                              </div>
                            )
                          )}
                        <div className="mt-4 mb-4 row align-items-center">
                          <div className="col">
                            {translate("Verify Identity")}
                          </div>
                          <div className="col-auto">
                            {idVerificationnResults &&
                              idVerificationnResults.reachedMaxAttempts ===
                              false &&
                              idVerificationnResults.numberOfVerificationAttempts ===
                              1
                              ? translate(
                                "You have attempted this prerequisite."
                              )
                              : ""}
                          </div>
                          <div className="col-auto">
                            <Buttonspotify
                              disabled={
                                ((idVerificationnResults.agreements.some(
                                  notSigned
                                ) && (enrollmentStep.statusNotes == null) && ((agreementData.data && agreementData.data.muleSoftDocStatus !== CongaAgreementStatus.Completed)))
                                  ? true
                                  : (!idVerificationnResults.agreements.some(notSigned) || (agreementData.data && agreementData.data.muleSoftDocStatus == CongaAgreementStatus.Completed)) ? false : true) || (isMobileDevice)
                              }
                              onClick={() =>
                                onIdVerificationStartClick(enrollmentStep)
                              }
                            >
                              {" "}
                              {idVerificationnResults &&
                                idVerificationnResults.reachedMaxAttempts ===
                                false &&
                                idVerificationnResults.numberOfVerificationAttempts ==
                                0
                                ? translate("Start")
                                : translate("Try Again")}
                            </Buttonspotify>
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  )}

                {/* SELF_ASSESSMENT Start */}
                {(enrollmentStep.inProgress || enrollmentStep.available) &&
                  enrollmentStep.moduleName ===
                  EnrollmentModuleNames.SELF_ASSESSMENT && (
                    <div className="mt-3">
                      <Buttonspotify
                        disabled={isMobileDevice}
                        onClick={onSelfAssessmentStartClick}
                      >
                        {" "}
                        {translate("Start")}
                      </Buttonspotify>
                    </div>
                  )}

                {/* PC_CHECK Start */}
                {(enrollmentStep.inProgress ||
                  enrollmentStep.available ||
                  enrollmentStep.failed) &&
                  enrollmentStep.moduleName ===
                  EnrollmentModuleNames.PC_CHECK && (
                    <Fragment>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: enrollmentStep.overviewMessage,
                        }}
                      ></div>{" "}
                      <br />
                      <div className="row align-items-center">
                        <div className="col-auto">
                          <Buttonspotify
                            disabled={isMobileDevice}
                            onClick={() => onPCCheckStartClick(enrollmentStep)}
                          >
                            {" "}
                            {enrollmentStep.failed === true
                              ? translate("Try Again")
                              : translate("Start")}
                          </Buttonspotify>
                        </div>
                        {isMobileDevice && (
                          <div className="col ">
                            {translate("prerequisitesMobileMsg")}
                          </div>
                        )}
                        {enrollmentStep.failed === true && (
                          <div className="col not-eligible">
                            {enrollmentStep.failedPendingMessage}
                          </div>
                        )}
                      </div>
                    </Fragment>
                  )}

                {/* BACKGROUND_CHECK Start, Resume */}
                {(enrollmentStep.inProgress || enrollmentStep.available) &&
                  enrollmentStep.failed === false &&
                  enrollmentStep.moduleName ===
                  EnrollmentModuleNames.BACKGROUND_CHECK && (
                    <div className="mt-3">
                      {enrollmentStep.inProgress === true && (
                        <Fragment>
                          <p>{enrollmentStep.inProgressMessage}</p>
                          <div className="row align-items-center">
                            <div className="col-auto">
                              {backgroundCheckData &&
                                backgroundCheckData.result &&
                                backgroundCheckData.result.toLowerCase() ===
                                BackgroundAssesmentResult.InComplete.toLowerCase() && (
                                  <>
                                    {isAgentFromJM && <><div
                                      dangerouslySetInnerHTML={{
                                        __html: enrollmentStep.overviewMessage,
                                      }}
                                    ></div></>}
                                    <Buttonspotify
                                      disabled={
                                        isMobileDevice ||
                                        (isAgentFromJM &&
                                          BackgroundAssesmentResult.InComplete &&
                                          backgroundCheckData.orderStatus ==
                                          100000002)
                                      }
                                      isSubmitting={isBackgroundCheckFetching}
                                      onClick={() =>
                                        onResumeBackgroundCheckClick(
                                          enrollmentStep
                                        )
                                      }
                                    >
                                      {translate("Resume")}
                                    </Buttonspotify>
                                  </>
                                )}
                              {((backgroundCheckData &&
                                backgroundCheckData.result &&
                                backgroundCheckData.result.toLowerCase() ===
                                BackgroundAssesmentResult.Review.toLowerCase()) ||
                                (backgroundCheckData &&
                                  backgroundCheckData.result &&
                                  backgroundCheckData.result.toLowerCase() ===
                                  BackgroundAssesmentResult.RetainInPlace.toLowerCase())) && (
                                  <>
                                    <Buttonspotify disabled={true}>
                                      {translate("In Progress")}
                                    </Buttonspotify>
                                  </>
                                )}
                              {backgroundCheckData &&
                                backgroundCheckData.result &&
                                backgroundCheckData.result.toLowerCase() ===
                                BackgroundAssesmentResult.Cancelled.toLowerCase() && (
                                  <>
                                    <></>
                                  </>
                                )}
                            </div>
                            <div className="col has-info">
                              {backgroundCheckData &&
                                backgroundCheckData.result &&
                                backgroundCheckData.result.toLowerCase() ===
                                BackgroundAssesmentResult.InComplete && (
                                  <>
                                    {translate(
                                      `You already started this prerequisite. Click the button to complete it`
                                    )}
                                  </>
                                )}
                              {backgroundCheckData &&
                                backgroundCheckData.result &&
                                backgroundCheckData.result.toLowerCase() ===
                                BackgroundAssesmentResult.Review.toLowerCase() && (
                                  <>
                                    {translate(
                                      `You started this assessment. Check your browser for another tab. After you finish your asessement, return to this page and refresh it to continue`
                                    )}
                                  </>
                                )}
                              {backgroundCheckData &&
                                backgroundCheckData.result &&
                                backgroundCheckData.result.toLowerCase() ===
                                BackgroundAssesmentResult.RetainInPlace.toLowerCase() && (
                                  <></>
                                )}
                              {backgroundCheckData &&
                                backgroundCheckData.result &&
                                backgroundCheckData.result.toLowerCase() ===
                                BackgroundAssesmentResult.Cancelled.toLowerCase() && (
                                  <>
                                    {translate(
                                      "Your background check order has been cancelled.  Certain of the information you provided in your profile was unable to be validated by First Advantage, our background check provider.  Please contact Partner Support via AVA, the spotify Virtual Assistant, to review and correct the data in your registration profile."
                                    )}
                                  </>
                                )}
                            </div>
                          </div>
                        </Fragment>
                      )}

                      {enrollmentStep.isClassAccessDisabled === true && (
                        <Fragment>
                          <div className="mt-3">
                            <h4>Important Notice</h4>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: enrollmentStep.alertMessage,
                              }}
                            ></div>{" "}
                            <br />
                          </div>
                        </Fragment>
                      )}

                      {enrollmentStep.inProgress === false && (
                        <Buttonspotify
                          disabled={isMobileDevice}
                          isSubmitting={isBackgroundCheckFetching}
                          onClick={() =>
                            onBackgroundCheckStartClick(enrollmentStep)
                          }
                        >
                          {translate("Start")}
                        </Buttonspotify>
                      )}
                    </div>
                  )}

                {/* PHOTO_ID inprogress */}
                {(enrollmentStep.inProgress || enrollmentStep.available) &&
                  enrollmentStep.moduleName === EnrollmentModuleNames.PHOTO_ID &&
                  <Fragment>

                    <div className="mt-3">
                      <p></p>
                    </div>
                    <div>
                      {/************** SAT working **************************/}
                      {photoIdStatusData != null && photoIdStatusData.agreements != null && !photoIdStatusData.incodeApiDown &&
                        photoIdStatusData.agreements.map((aggrement, key) => <div key={key} className="mt-4 mb-4 row align-items-center">
                          <div className="mt-4 col-12">
                            <div className="separator"></div>
                          </div>
                        </div>)}
                      {/******************* SAT working ***************************/}

                      <div className="mt-4 mb-4 row align-items-center">
                        {photoIdIsStatusLoading == true && (
                          <LoadingComponent />
                        )}
                        {photoIdIsStatusLoading == false &&
                          photoIdStatusData && (
                            <Fragment>
                              <div className="col-auto">
                                {photoIdStatusData &&
                                  !photoIdStatusData.overallStatus !== PhotoIdStatus.Manual &&
                                  photoIdStatusData.inProgress ===
                                  true /*|| photoIdStatusData.failed === true*/ && (
                                    <>
                                      <Buttonspotify
                                        onClick={() =>
                                          OnResumePhotoIdClick(
                                            enrollmentStep,
                                            photoIdStatusData
                                          )
                                        }
                                      >
                                        {translate("Resume")}
                                      </Buttonspotify>
                                    </>
                                  )}

                                {photoIdStatusData &&
                                  photoIdStatusData.overallStatus === PhotoIdStatus.Manual &&
                                  (
                                    <>
                                      <Buttonspotify
                                        onClick={() =>
                                          OnRefreshPhotoIdClick(
                                            enrollmentStep
                                          )
                                        }
                                      >
                                        {translate("Refresh")}
                                      </Buttonspotify>
                                    </>
                                  )}

                                {photoIdStatusData && (!photoIdStatusData.reachedMaxAttempts || photoIdStatusData.canRetry) &&

                                  !photoIdStatusData.incodeApiDown && !photoIdStatusData.inProgress && !photoIdStatusData.pending &&
                                  <>
                                    {/* <Buttonspotify disabled={((photoIdStatusData != null && photoIdStatusData.agreements != null && photoIdStatusData.agreements[0].isSigned == false))} onClick={() => onAssessmentStartClick(enrollmentStep,)}> */}
                                    {photoIdStatusData.holdMinutesTime == 0 && <Buttonspotify disabled={((photoIdStatusData == null))} onClick={() => onAssessmentStartClick(enrollmentStep,)}>
                                      {(photoIdStatusData.numberOfAttempts >= 1 || (photoIdStatusData.reachedMaxAttempts && photoIdStatusData.canRetry)) ? <> {translate('Try Again')}</> : <> {translate('Start')}</>}
                                    </Buttonspotify>}
                                    {
                                      photoIdStatusData.holdMinutesTime > 0 && <p>{photoIdStatusData.actionContent}</p>
                                    }

                                  </>
                                }


                              </div>

                              {photoIdStatusData &&
                                !photoIdStatusData.reachedMaxAttempts &&
                                photoIdStatusData.overallStatus ==
                                PhotoIdStatus.Incomplete &&
                                (photoIdStatusData.inProgress === true ||
                                  photoIdStatusData.pending === true) &&
                                photoIdStatusData.failed === false && (
                                  <>
                                    <div className="col has-info">
                                      {photoIdStatusData.actionContent}
                                    </div>
                                  </>
                                )}

                              {photoIdStatusData &&
                                photoIdStatusData.canRetry &&
                                photoIdStatusData.numberOfAttempts >= 1 &&
                                photoIdStatusData.inProgress === false && (
                                  <>
                                    <div className="col not-eligible">
                                      <img
                                        className=""
                                        style={{
                                          height: "25px",
                                          marginRight: "10px",
                                        }}
                                        src={warningIcon}
                                        alt=""
                                      />
                                      <span className="mr-2">
                                        <small>
                                          {" "}
                                          You have{" "}
                                          {photoIdStatusData.maxAttempts > photoIdStatusData.numberOfAttempts ? photoIdStatusData.maxAttempts - photoIdStatusData.numberOfAttempts : photoIdStatusData.canRetry ? 1 : 0}{" "}
                                          tries left
                                        </small>
                                      </span>
                                    </div>
                                  </>
                                )}
                            </Fragment>
                          )}
                      </div>
                    </div>
                  </Fragment>
                }




                {/*FINGERPRINT Check if the Agent is Already Started Assessment */}
                {(enrollmentStep.inProgress && enrollmentStep.available) &&
                  enrollmentStep.failed === false &&
                  enrollmentStep.moduleName ===
                  EnrollmentModuleNames.FINGERPRINT &&
                  <Fragment>
                    <div className="row align-items-center">
                      <div className="mt-4 col-12">
                        {enrollmentStep.inProgressMessage}
                      </div>
                    </div>
                  </Fragment>
                }
                {/* NO SHOW DEPOSIT STEP
                  {
                    (enrollmentStep.available && enrollmentStep.moduleName===EnrollmentModuleNames.DEPOSIT &&
                      <Fragment>
                        
                        {NoShowAutoDrop && NoShowReinstate && NoShowWindow && <div className="mt-3">
                          {classNoShowFees!=null &&<><p>To reserve your place in class, you will need to pay a deposit of {currencyCode}{classNoShowFees}.
This deposit will need to be paid {NoShowWindow} days before the class start date and will be refunded after you attend the entire first day of class.</p>
</> }

                          <Buttonspotify
                            disabled={isMobileDevice}
                            onClick={() => NoShowDepositClick(enrollmentStep)}
                          >
                            {" "}
                            {translate("Continue")}
                          </Buttonspotify>
                        </div>}
                        {(!(NoShowAutoDrop && NoShowReinstate && NoShowWindow)) && <LoadingComponent/>}

                      </Fragment>
                      )
                  }    */}


                {/* NO SHOW DEPOSIT STEP if OpenOnPortal <= golive*/}
                {/* This is to show message for old CCD Flow . ie: 7 days before class start*/}
                {
                  (
                    ((enrollmentStep.available && enrollmentStep.moduleName === EnrollmentModuleNames.DEPOSIT && isAgentFromUSA && new Date(OpenOnPortal).toISOString().slice(0, 10) <= new Date(goliveDate).toISOString().slice(0, 10) && OpenOnPortal != "0001-01-01T00:00:00")
                      || (enrollmentStep.available && enrollmentStep.moduleName === EnrollmentModuleNames.DEPOSIT && !isAgentFromUSA)) &&
                    <Fragment>

                      {NoShowAutoDrop && NoShowReinstate && NoShowWindow && <div className="mt-3">
                        {classNoShowFees != null && <><p>To reserve your place in class, you will need to pay a deposit of {currencyCode}{classNoShowFees}.
                          This deposit will need to be paid {NoShowWindow} days before the class start date and will be refunded after you attend the entire first day of class.</p>
                        </>}

                        <Buttonspotify
                          disabled={isMobileDevice}
                          onClick={() => NoShowDepositClick(true, enrollmentStep)}
                        >
                          {" "}
                          {translate("Continue")}
                        </Buttonspotify>
                      </div>}
                      {(!(NoShowAutoDrop && NoShowReinstate && NoShowWindow)) && <LoadingComponent />}

                    </Fragment>
                  )
                }
                {/* NO SHOW DEPOSIT STEP if OpenOnPortal > golive*/}
                {/* This is to show message for new CCD Flow . ie: X days after Fully Enrolled */}

                {
                  (enrollmentStep.available && enrollmentStep.moduleName === EnrollmentModuleNames.DEPOSIT && isAgentFromUSA && (new Date(OpenOnPortal).toISOString().slice(0, 10) > new Date(goliveDate).toISOString().slice(0, 10) || OpenOnPortal === "0001-01-01T00:00:00")) &&
                  <Fragment>
                    {NoShowAutoDrop && NoShowReinstate && NoShowWindow && (
                      <div className="mt-3">
                        {classNoShowFees != null && enrollmentStep.availableOn && (() => {
                          const today = new Date();
                          const availableOnDate = new Date(enrollmentStep.availableOn);
                          const millisInDay = 1000 * 60 * 60 * 24;
                          const numericDayLimit = Number(xDayLimit);

                          let availableOnDateTimestamp = new Date(enrollmentStep.availableOn).toISOString().slice(0, 10);

                          const enrollmentStatusDate = new Date(EnrollmentStatusDate);
                          let enrollmentStatusDateTimestamp = new Date(EnrollmentStatusDate).toISOString().slice(0, 10);

                          // Calculate the deadline date
                          let deadlineDate;
                          if (enrollmentStatusDateTimestamp > availableOnDateTimestamp) {

                            deadlineDate = new Date(enrollmentStatusDate.getTime() + numericDayLimit * millisInDay);

                          } else {
                            // Calculate the deadline date
                            deadlineDate = new Date(availableOnDate.getTime() + numericDayLimit * millisInDay);
                          }

                          const formattedDeadline = deadlineDate.toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          });

                          return (
                            <p>
                              To reserve your place in class, you will need to pay a deposit of {currencyCode}{classNoShowFees}.
                              This deposit must be paid <strong> on or before {formattedDeadline}</strong>.
                              The deposit will be refunded after you attend the entire first day of class.
                            </p>
                          );
                        })()}

                        <Buttonspotify
                          disabled={isMobileDevice}
                          onClick={() => NoShowDepositClick(false, enrollmentStep)}
                        >
                          {" "}
                          {translate("PayCCD")}
                        </Buttonspotify>
                      </div>
                    )}

                    {!(NoShowAutoDrop && NoShowReinstate && NoShowWindow) && <LoadingComponent />}
                  </Fragment>

                }

                {/* Jamaica TRN  Validation*/}
                {
                  ((enrollmentStep.available || enrollmentStep.inProgress) && enrollmentStep.moduleName === EnrollmentModuleNames.VERIFY_TRN &&
                    <Fragment>

                      {!isTRNDataFetching && trnData && !trnData.isValidated && ((trnData.attempts < trnData.maxAttempts) || trnData.retry) && <Buttonspotify
                        disabled={isMobileDevice}
                        onClick={() => showTrnValidationForm(enrollmentStep)}
                      >

                        {trnData.attempts > 0 ? translate("Retry") : translate("Start")}
                      </Buttonspotify>
                      }
                      {trnData && (trnData.attempts > 0 && !trnData.isValidated && (trnData.attempts < trnData.maxAttempts || trnData.retry)) && <div >
                        <img
                          className=""
                          style={{
                            height: "25px",
                            marginRight: "10px",
                          }}
                          src={warningIcon}
                          alt=""
                        />
                        <span className="mr-2">
                          {trnData.maxAttempts > trnData.attempts && !trnData.retry &&
                            <small>
                              Your TRN is invalid. Please re-enter your correct TRN. You have {trnData.maxAttempts - trnData.attempts} more attempt.
                            </small>}
                          {trnData.retry &&
                            <small>
                              Your TRN is invalid. Please re-enter your correct TRN. You have 1 more attempt.
                            </small>}
                        </span>
                      </div>
                      }

                      {trnData && !trnData.isValidated && (trnData.attempts >= trnData.maxAttempts && !trnData.retry) && <div >
                        <img
                          className=""
                          style={{
                            height: "25px",
                            marginRight: "10px",
                          }}
                          src={warningIcon}
                          alt=""
                        />
                        <span className="mr-2">
                          <small>
                            You cannot continue with this enrollment as there is a problem with your Tax Registration Number. Please reach out to AVA
                          </small>
                        </span>
                      </div>
                      }
                      {trnData && trnData.isValidated && <p>You have completed this step. Please reach out to AVA to proceed further</p>}

                    </Fragment>
                  )
                }
              </>

            </div>

            <span
              className={classNames({
                "assessment-addon": true,
                active:
                  (enrollmentStep.inProgress || enrollmentStep.available) &&
                  enrollmentStep.completed === false,
                complete: enrollmentStep.completed,
              })}
            ></span>
          </div>
        </Fragment>
      )}
    </Translate>
  );
};
//}

export default EnrollmentStep;
