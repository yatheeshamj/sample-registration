import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import styles from "./JoinBusiness.module.scss";
import MainLayout from "../../layouts/MainLayout";
import Ssn from "../ssn/Ssn";
import RestartNextFooter from "../../shared/RestartNextFooter";
import JoinBusinessFormContainer from "./JoinBusinessFormContainer";
import Modal from "../../common/Modal";
import LoadingComponent from "spotify-shared-web/components/common/LoadingComponent";
import ConfirmRestartAgentModal from "../ConfirmRestartAgentModal";
import PendingRequest from "./PendingRequest";
import AdmissionSteps from "../../shared/admissionSteps/AdmissionSteps";
import joinBusinessIcon from "../../../assets/images/agentType/working-for-call-center.svg";
import { AdmissionStep, JoinCallCenter, COUNTRY_IDS } from "../../../constants";
import { ADMISSION_STEP_ROUTES } from "../../../config";
import {
  getBusinessesToJoin,
  selectBusinessToJoin,
  removeJoinBusiness,
  showAgreements,
  getJoinBusinessStatus,
  joinBusiness,
} from "../../../actions/agentTypeActions";
import {
  getReferralUser,
  updateReferralUserData,
} from "../../../actions/registrationActions";
import businessLogicHelper from "../../../helpers/businessLogicHelper";
import { logoutRedirect } from "../../../actions/loginActions";
import { Redirect } from "react-router-dom";
import SignAgreement from "../agreements/SignAgreement";
import AgreementsContainer from "../AgreementsContainer";
import { getAgentStepFromURL } from "../../../helpers/uiHelpers";
import FindCallCenter from "./FindCallCenter";
import MainLayoutFullNavAuthenticated from "../../layouts/MainLayoutFullNavAuthenticated";
import * as admissionStepSelectors from "spotify-shared/selectors/admissionSteps";
import { getCountries } from "../../../actions/registrationActions";
import { withRouter } from "react-router-dom";
import { USER_ID } from "../../../constants";
import { Translate } from "spotify-shared-web/localize";
import Button from "spotify-shared-web/components/common/Button";
import commonStyle from "../../../../src/components/shared/CommonStyle.module.scss";
import { Card } from "react-bootstrap";
import { common } from "@material-ui/core/colors";
import classNames from "classnames";
import { agentStatusId } from "../../../constants";

const subStepMap = {
  [AdmissionStep.JB_VERIFY_IDENTITY]: "ssn",
  [AdmissionStep.JB_SEND_REQUEST]: "sendrequest",
  [AdmissionStep.JB_SIGN_AGREEMENTS]: "agreements",
  [AdmissionStep.JB_PENDING_FINALIZATION]: "pendingfinalization",
};

class JoinBusiness_UK_CA extends Component {
  state = {
    isModalOpen: false,
    isRestartModalOpen: false,
    getStatusProcessing: false,
  };

  componentDidMount = () => {
    this.props.getReferralUser(this.props.agentProfile.userId);
    this.props.getCountries();
    this.initHelper();
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selectPathSteps !== this.props.selectPathSteps) {
      // this.initHelper();
      const { admissionSteps, agentType, referUser, agentProfile } = this.props;
      const isUSUser = agentProfile.countryId === COUNTRY_IDS.US;
      const currentStep = getAgentStepFromURL(this.props.location.search);
      if (
        this.props.referUser.spBusinessID != null &&
        admissionSteps.steps.length != 0
      ) {
        // if (
        //   admissionSteps.steps.find(
        //     (step) => step.uniqueId == AdmissionStep.PICK_CLIENT
        //   ).available
        // ) {
        //   const userData = {};
        //   userData.referUser = referUser;
        //   userData.userId = agentProfile.userId;
        //   this.props.updateReferralUserData(userData);
        // }
        const childStep = admissionSteps.steps
          .find((step) => step.uniqueId == AdmissionStep.AGENT_TYPE)
          .childSteps.find(
            (childStep) => childStep.uniqueId == AdmissionStep.JOIN_BUSINESS
          );
        this.setReferralStatus(currentStep, childStep);
        if (
          agentType.joinBusiness.statusId == 0 &&
          childStep.childSteps.some(
            (x) =>
              (x.uniqueId == AdmissionStep.JB_VERIFY_IDENTITY && x.completed) ||
              !isUSUser
          ) &&
          childStep.childSteps.some(
            (x) =>
              x.uniqueId == AdmissionStep.JB_SEND_REQUEST &&
              (x.available || x.inProgress)
          )
        ) {
          const { agentId, userId } = this.props.agentProfile;
          const { referUser } = this.props;
          const businessId = referUser.spBusinessID;
          if (
            !agentType.joinBusiness.isSubmitting &&
            !agentType.isFetchInProgress &&
            !admissionSteps.isFetchInProgress
          ) {
            referUser.agentStatusId = agentStatusId.SendRequest;
            this.props.joinBusiness({ businessId, agentId, userId, referUser });

          }
        }
      }
    }
  }

  setReferralStatus = (currentStep, childStep) => {
    const { referUser } = this.props;
    if (currentStep == "ssn") {
      this.props.referUser.agentStatusId = agentStatusId.VerifyIdentity;
    } else if (currentStep == "pendingfinalization") {
      this.props.referUser.agentStatusId = agentStatusId.PendingFinalization;
    } else if (currentStep == "agreements") {
      if (
        childStep.childSteps.some(
          (x) => x.uniqueId == AdmissionStep.JB_SIGN_AGREEMENTS && x.completed
        )
      ) {
        this.props.referUser.agentStatusId = agentStatusId.PendingFinalization;
      } else {
        this.props.referUser.agentStatusId = agentStatusId.SignAgreements;
      }
    }
    const { userId } = this.props.agentProfile;
    const userData = {};
    userData.referUser = referUser;
    userData.userId = userId;
    this.props.updateReferralUserData(userData);
  };
  initHelper() {
    const { selectPathSteps, agentProfile, agentType, admissionSteps } =
      this.props;
    if (!agentType.isSigningAgreements) {
      this.props.getJoinBusinessStatus(agentProfile.agentId);
    }
    if (
      Object.keys(selectPathSteps).length > 0 &&
      selectPathSteps &&
      !selectPathSteps.completed
    ) {
      // if (!agentType.isSigningAgreements) {
      //     this.props.getJoinBusinessStatus(agentProfile.agentId);
      // }
      const agentTypeSteps = selectPathSteps.childSteps;
      const substeps = this.getSubSteps(agentTypeSteps);

      if (this.isAgentDeclined(substeps)) {
        this.props.removeJoinBusiness(
          agentProfile.agentId,
          "Business has declined your request"
        );
      }
    }
  }

  getSubSteps = (agentTypeSteps) => {
    const currentStep = agentTypeSteps.find((agentTypeStep) => {
      return agentTypeStep.uniqueId === AdmissionStep.JOIN_BUSINESS;
    });
    return currentStep ? currentStep.childSteps : undefined;
  };

  isAgentDeclined = (substeps) => {
    return !!substeps.find((substep) => {
      return substep.failed === true;
    });
  };

  handleModalOpen = (countryId, agentId) => {
    this.props.getBusinessesToJoin(countryId, agentId);
    this.setState({
      isModalOpen: true,
    });
  };

  handleModalClose = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  handleBusinessSelect = (business) => {
    this.props.selectBusinessToJoin(business.businessId, business.name);
    this.handleModalClose();
  };

  handleRestartModalOpen = () => {
    this.setState({
      isRestartModalOpen: true,
    });
  };

  handleRestartModalClose = () => {
    this.setState({
      isRestartModalOpen: false,
    });
  };

  handleRestartModalConfirm = () => {
    this.props.removeJoinBusiness(this.props.agentProfile.agentId);
  };

  getHandleNextClickAction = (substeps) => {
    const currentStep = substeps.find((substep) => {
      return substep.available === true || substep.inProgress === true;
    });

    switch (currentStep.uniqueId) {
      case AdmissionStep.JB_SEND_REQUEST:
        return () => { };
      case AdmissionStep.JB_SIGN_AGREEMENTS:
        return this.props.showAgreements;
      default:
        return () => { };
    }
  };

  getHandleNextCTA = (substeps) => { };

  getNextDisabled = (substeps) => {
    const currentStep = substeps.find((substep) => {
      return substep.available === true || substep.inProgress === true;
    });
    return (
      currentStep.uniqueId === AdmissionStep.JB_SEND_REQUEST ||
      currentStep.uniqueId === AdmissionStep.JB_PENDING_FINALIZATION
    );
  };

  renderViewByAdmissionStep = () => {
    switch (this.currentSubstep) {
      case "ssn":
        return (
          <Ssn
            agentProfile={this.props.agentProfile}
            handleRestartClick={this.handleRestartModalOpen}
            restartText="Not sure you want to work for someone else"
            btnNextId="btnJoinBusinessSSNNext"
            changeTypeBtnId="btnJoinBusinessSSNChangeType"
          />
        );
      case "sendrequest":
        return (
          <JoinBusinessFormContainer
            agentProfile={this.props.agentProfile}
            handleRestartClick={this.handleRestartModalOpen}
            handleModalOpen={this.handleModalOpen}
          />
        );
      case "agreements":
        return (
          <AgreementsContainer
            btnAgreementsNextId="btnJoinBusinessAgreementsNext"
            agentProfile={this.props.agentProfile}
          />
        );
      default:
        return <div></div>;
    }
  };

  renderRestartFooter = (substeps) => {
    const currentStep = businessLogicHelper.getCurrentSubstep(substeps);

    if (
      currentStep.uniqueId === AdmissionStep.JB_VERIFY_IDENTITY ||
      currentStep.uniqueId === AdmissionStep.JB_SEND_REQUEST ||
      currentStep.uniqueId === AdmissionStep.JB_PENDING_FINALIZATION
    ) {
      return false;
    }
    return true;
  };

  renderHeaderSubTitle = (substeps) => {
    const { agentType, agentProfile, referUser } = this.props;
    const referVerify = referUser.spBusinessID !== null ? true : false;
    const isUKUser = agentProfile.countryId === COUNTRY_IDS.UK;
    const currentStep = businessLogicHelper.getCurrentSubstep(substeps);
    //const headerSubTitle1 = "If you don't want the extra work and responsibilities of managing a business, you can register as an agent working for a Service Partner already on the platform.";
    const headerSubTitle1 = !referVerify
      ? "Join a team of agents and work for a Service Partner already on the platform."
      : "We must validate your Social Security Number in order to register you on the spotify® Platform.";
    //const headerSubTitle2 =isUKUser ? "Please enter the Service partner ID of the Service Partner you are working for." : "Please enter the FEIN(Federal Employment Identification Number) or Service Partner ID (IB ID) of the Service Partner you are working for.";
    const headerSubTitle2 = isUKUser
      ? "Please enter the Service partner ID of the Service Partner you are working for."
      : "Please enter the FEIN(Federal Employment Identification Number) or Service Partner ID (IB ID) of the Service Partner you are working for.";
    const headerSubTitle3 = ""; //"Your request to register for the platform as an agent has been submitted to the Service Partner you will be working for. They must approve you in order to finalize registration. If your approval is delayed please contact them directly. You can restart by clicking the Change Your Contractor Type link below."
    const headerSubTitle4 =
      "Now that you’ve signed the paperwork, the Service Partner you’re working for just needs to approve and you’re ready to pick your first Client Opportunity! Please contact your Service Partner if you experience a delay in moving forward.";

    if (
      agentType.joinBusiness.statusId == JoinCallCenter.PENDING_ACCEPTANCE ||
      referUser.isLoading == true ||
      referUser.spBusinessID != null
    )
      return headerSubTitle3;
    switch (currentStep.uniqueId) {
      case AdmissionStep.JB_VERIFY_IDENTITY:
        return headerSubTitle1;
      case AdmissionStep.JB_SEND_REQUEST:
        return headerSubTitle2;
      case AdmissionStep.JB_PENDING_FINALIZATION:
        return headerSubTitle4;
      default:
        return headerSubTitle2;
    }
  };

  processingStatusRequest = () => {
    const { admissionSteps, agentType, referUser } = this.props;

    if (agentType.isFetchInProgress || admissionSteps.isFetchInProgress) {
      return true;
    } else {
      return false;
    }
  };

  checkIfPendingJoinRequest = () => {
    const { agentType } = this.props;
    if (
      agentType.joinBusiness.statusId !== JoinCallCenter.PENDING_ACCEPTANCE &&
      agentType.joinBusiness.statusId !== JoinCallCenter.PENDING_FINALIZATION
    )
      return false;

    if (
      agentType.joinBusiness.businessRequestedName === "" ||
      agentType.joinBusiness.businessRequestedName === undefined
    )
      return false;

    return (
      agentType.joinBusiness.statusId === JoinCallCenter.PENDING_ACCEPTANCE ||
      agentType.joinBusiness.statusId === JoinCallCenter.PENDING_FINALIZATION
    );
  };

  checkRequestStatus = () => {
    const { agentProfile } = this.props;

    this.props.getJoinBusinessStatus(agentProfile.agentId);
  };

  renderStepsContainer = () => {
    const {
      selectPathSteps,
      agentCountryId,
      countries,
      admissionSteps,
      agentProfile,
    } = this.props;
    const headerCopy =
      agentProfile.countryId === COUNTRY_IDS.US
        ? "Four steps to finish!"
        : "Three steps to finish!";
    // headerCopy= agentProfile.countryId === COUNTRY_IDS.UK && 'Three steps to finish!';
    // headerCopy= agentProfile.countryId === COUNTRY_IDS.CA && 'Two steps to finish!';
    const region = businessLogicHelper.getAgentRegion(
      agentCountryId,
      countries
    );
    const agentTypeSteps = selectPathSteps.childSteps;
    const substeps = this.getSubSteps(agentTypeSteps);
    return (
      <Translate>
        {({ translate }) => (
          <>
            {/*<div className={`col-lg-2`}></div>*/}
            <div
              className={classNames({
                "col-lg-4 offset-md-1 offset-lg-0 col-md-10": true,
                "mt-sm-0": true,
                "mt-lg-5": true,
                "mt-sm-0": this.currentSubstep === "pendingfinalization",
              })}
            >
              {/*<img className="img-fluid" src={joinBusinessIcon} alt='' />*/}
              <div
                className={classNames({
                  "d-none d-lg-block": true,
                  "mb-sm-4": this.currentSubstep === "agreements",
                })}
              >
                <AdmissionSteps
                  headerCopy={translate(headerCopy)}
                  substeps={substeps}
                  business={"join-business"}
                  region={region}
                />
              </div>

              {this.currentSubstep != "sendrequest" && (
                <Card
                  className={`float-right col-12 ${commonStyle["cardTopMargin"]} mb-xxl-3 ${commonStyle["cardPadding"]} customCard ${styles["align-center"]} ${commonStyle["lastComponent"]} ${commonStyle["inCard"]} w-100 ${commonStyle["cardStyle__specific"]}`}
                >
                  <Card.Body className="p-0">
                    <Card.Text
                      className={` ${commonStyle["paragraph_5"]} ${commonStyle["blackColor"]} ${commonStyle["mediumFont"]} p-0 mt-0 ${commonStyle["cardInBetween"]}`}
                    >
                      {this.props.agentProfile.countryId === COUNTRY_IDS.UK
                        ? translate(
                          "Don’t want to register a company, or want to look at the other options more closely?"
                        )
                        : translate(
                          "Don’t want to register a company, or want to look at the other options more closely?"
                        )}{" "}
                    </Card.Text>
                    <button
                      id={
                        "btnJoinBusinessChangeContratorType_" +
                        this.currentSubstep
                      }
                      type="button"
                      className={`btn btn-primary ${styles["restart-button"]} ${styles["align-right"]} ${styles["block"]}`}
                      onClick={this.handleRestartModalOpen}
                    >
                      {translate("Change Your Contactor Type")}
                    </button>
                  </Card.Body>
                </Card>
              )}
              {this.currentSubstep === "sendrequest" && (
                <Card
                  className={`float-right col-12 ${commonStyle["cardTopMarginSR"]} mb-xxl-3 ${commonStyle["cardPadding"]} customCard ${styles["align-center"]} ${commonStyle["lastComponent"]} ${commonStyle["inCard"]} w-100 ${commonStyle["cardStyle__specific"]}`}
                >
                  <Card.Body className="p-0">
                    <Card.Text
                      className={` ${commonStyle["paragraph_5"]} ${commonStyle["blackColor"]} ${commonStyle["mediumFont"]} p-0 mt-0 ${commonStyle["cardInBetween"]}`}
                    >
                      {this.props.agentProfile.countryId === COUNTRY_IDS.UK
                        ? translate(
                          "Don’t want to register a company, or want to look at the other options more closely?"
                        )
                        : translate(
                          "Don’t want to register a company, or want to look at the other options more closely?"
                        )}{" "}
                    </Card.Text>
                    <button
                      id={
                        "btnJoinBusinessChangeContratorType_" +
                        this.currentSubstep
                      }
                      type="button"
                      className={`btn btn-primary ${styles["restart-button"]} ${styles["align-right"]} ${styles["block"]}`}
                      onClick={this.handleRestartModalOpen}
                    >
                      {translate("Change Your Contactor Type")}
                    </button>
                  </Card.Body>
                </Card>
              )}
            </div>
          </>
        )}
      </Translate>
    );
  };
  checkIfPendingOrFinalizationStep = (subStep) => {
    if (
      this.props.agentType.joinBusiness.statusId ===
      JoinCallCenter.PENDING_ACCEPTANCE ||
      subStep.uniqueId === AdmissionStep.JB_PENDING_FINALIZATION
    ) {
      // this.props.getJoinBusinessStatus(this.props.agentProfile.agentId);
      return true;
    } else {
      return false;
    }
  };

  render() {
    const {
      selectPathSteps,
      agentProfile,
      agentType,
      logoutRedirect,
      agentCountryId,
      countries,
      admissionSteps,
      referUser,
    } = this.props;
    const headerCopy =
      agentProfile.countryId === COUNTRY_IDS.US
        ? "Four steps to finish!"
        : "Three steps to finish!";
    const referVerify = referUser.spBusinessID !== null ? true : false;
    const servicePartner = referUser.spName;

    const isUKUser = agentProfile.countryId === COUNTRY_IDS.UK;
    if (Object.keys(selectPathSteps).length === 0 || countries.length === 0)
      return <LoadingComponent />;
    if (selectPathSteps && !selectPathSteps.completed) {
      const agentTypeSteps = selectPathSteps.childSteps;
      const substeps = this.getSubSteps(agentTypeSteps);
      const region = businessLogicHelper.getAgentRegion(
        agentCountryId,
        countries
      );

      const subStep = businessLogicHelper.getCurrentSubstep(substeps);
      if (!subStep) return <Redirect to="/" />;
      const incomingSubStep = subStepMap[subStep.uniqueId];
      this.currentSubstep = getAgentStepFromURL(this.props.location.search);
      const isAgreementsStep =
        subStep.uniqueId === AdmissionStep.JB_SIGN_AGREEMENTS;

      const headerTitle =
        "REGISTER AS AN AGENT WORKING FOR A SERVICE PARTNER ON THE spotify";
      const headerJoinServiceTitle =
        "REGISTER AS AN AGENT WORKING FOR " +
        servicePartner +
        " ON THE spotify® PLATFORM";
      return incomingSubStep !== this.currentSubstep ? (
        <Redirect
          to={{
            pathname: ADMISSION_STEP_ROUTES.joinServicePartner,
            search: `?step=${incomingSubStep}`,
          }}
        />
      ) : substeps ? (
        isAgreementsStep && agentType.isSigningAgreement ? (
          <SignAgreement logoutUser={logoutRedirect} />
        ) : (
          <Translate>
            {({ translate }) => (
              <Fragment>
                <div className={`row justify-content-between`}>
                  <div
                    className={classNames({
                      "col-lg-5": this.currentSubstep !== "agreements",
                      "col-lg-7": this.currentSubstep == "agreements",
                      "col-md-10 offset-md-1 offset-lg-0 col-xs-12": true,
                    })}
                  >
                    {/* <div className={`row ${commonStyle['centralize__Row']}`}>
                                        <div className={`col-lg-8`}> */}
                    {/* <br /> */}
                    {referVerify && (
                      <h1
                        className={`${commonStyle["heading_1"]} ${commonStyle["regularFont"]} ${commonStyle["heading_1_top"]} ${commonStyle["active_color"]} ${commonStyle["widthChange4"]}  ${styles["lineHeight"]}`}
                      >
                        {headerJoinServiceTitle}
                        {/*<sup>&reg;</sup>{translate("platform")}*/}
                      </h1>
                    )}
                    {!referVerify && (
                      <h1
                        className={`${commonStyle["heading_1"]} ${commonStyle["regularFont"]} ${commonStyle["heading_1_top"]} ${commonStyle["active_color"]} ${commonStyle["widthChange4"]}  ${styles["lineHeight"]} ${commonStyle["componentsMargin"]}`}
                      >
                        {translate(headerTitle)}
                        {/*<sup>&reg;</sup>{translate("platform")}*/}
                      </h1>
                    )}
                    <p
                      className={` ${commonStyle["componentsMargin"]} ${commonStyle["lightFont"]} ${commonStyle["paragraph_3"]} ${commonStyle["widthChange"]} ${commonStyle["blackColor"]}`}
                    >
                      {!isAgreementsStep &&
                        translate(this.renderHeaderSubTitle(substeps))}
                    </p>
                    {this.currentSubstep == "agreements" && (
                      <h3
                        className={`${styles["text-bold"]} ${commonStyle["paragraph_1"]} ${commonStyle["blackColor"]} ${commonStyle["componentsMargin"]} `}
                      >
                        {translate(
                          "Just one step to go. Let’s make it official!"
                        )}
                      </h3>
                    )}
                    {this.currentSubstep == "agreements" && (
                      <p
                        className={`agreementcopy col-xl-11 col-md-12 pl-0 ${commonStyle["lightFont"]} ${commonStyle["paragraph_3"]} ${commonStyle["blackColor"]} ${commonStyle["agreementcopy1"]}`}
                      >
                        {translate("agreementCopy")}
                      </p>
                    )}
                    <div className={`d-block d-lg-none`}>
                      {/* <AdmissionSteps
                        headerCopy={translate(headerCopy)}
                        substeps={substeps}
                        business={"join-business"}
                        region={region}
                      /> */}
                    </div>
                    {!this.checkIfPendingJoinRequest() &&
                      this.renderViewByAdmissionStep(substeps)}
                    {this.checkIfPendingOrFinalizationStep(subStep) && (
                      <PendingRequest
                        changeContractorTypeBtnId={
                          "btnJoinBusinessPendingChangeContractorType_" +
                          this.currentSubstep
                        }
                        statusId={agentType.joinBusiness.statusId}
                        onRequestRestart={this.handleRestartModalOpen}
                        isSubmitting={this.processingStatusRequest()}
                        handleCheckStatusClick={this.checkRequestStatus}
                      />
                    )}
                    {!isUKUser &&
                      !this.checkIfPendingJoinRequest() &&
                      this.currentSubstep === "sendrequest" && (
                        <>
                          <div
                            className={` ${commonStyle["componentsMargin"]}`}
                          >
                            <FindCallCenter
                              handleModalOpen={this.handleModalOpen}
                              agentProfile={agentProfile}
                            />
                          </div>
                        </>
                      )}
                    {isUKUser &&
                      !this.checkIfPendingJoinRequest() &&
                      this.currentSubstep === "sendrequest" && (
                        <>
                          <div
                            className={` ${styles["margin__FindCallCenter"]}`}
                          >
                            <FindCallCenter
                              handleModalOpen={this.handleModalOpen}
                              agentProfile={agentProfile}
                            />
                          </div>
                        </>
                      )}
                  </div>
                  {!referVerify && this.renderStepsContainer()}
                </div>
                {this.renderRestartFooter(substeps) ? (
                  <div className="row">
                    <div className="col-lg-12">
                      <RestartNextFooter
                        handleRestartClick={this.handleRestartModalOpen}
                        handleNextClick={this.getHandleNextClickAction(
                          substeps
                        )}
                        handleNextCTA={this.getHandleNextCTA(substeps)}
                        isNextDisabled={this.getNextDisabled(substeps)}
                        hideNext={isAgreementsStep}
                        changeContratorTypeBtnId={
                          "btnJoinBusinessChangeContratorType_" +
                          this.currentSubstep
                        }
                        restartText="Not sure you want to work for someone else"
                      />
                    </div>
                  </div>
                ) : null}
                <Modal
                  isOpen={this.state.isModalOpen}
                  onRequestClose={this.handleModalClose}
                >
                  <div className={styles["businesses-modal"]}>
                    <div className={styles["businesses-modal__header"]}>
                      <h5>
                        {translate("Select A Service Partner To Continue")}
                      </h5>
                    </div>
                    {!this.props.agentType.joinBusiness
                      .isBusinessToJoinLoading ? (
                      this.props.agentType.joinBusiness.businessesToJoin
                        .length ? (
                        <ul className={styles["businesses-modal__list"]}>
                          {this.props.agentType.joinBusiness.businessesToJoin.map(
                            (business) => {
                              return (
                                <li
                                  key={business.businessId}
                                  className={styles["businesses-modal__item"]}
                                >
                                  <p
                                    className={
                                      styles["businesses-modal__item--copy"]
                                    }
                                  >
                                    {business.businessId} - {business.name}
                                  </p>
                                  <Button
                                    id={"btnJoinBusiness" + business.businessId}
                                    type="button"
                                    onClick={() =>
                                      this.handleBusinessSelect(business)
                                    }
                                    size="small"
                                    variant="primary"
                                  // id="btnBusiness"
                                  >
                                    {translate("Select")}
                                  </Button>
                                </li>
                              );
                            }
                          )}
                        </ul>
                      ) : (
                        <div className={styles["businesses-modal__content"]}>
                          {translate("No Service Partners Found")}
                        </div>
                      )
                    ) : (
                      <LoadingComponent />
                    )}
                  </div>
                </Modal>

                <ConfirmRestartAgentModal
                  isOpen={this.state.isRestartModalOpen}
                  onRequestClose={this.handleRestartModalClose}
                  handleCancelClick={this.handleRestartModalClose}
                  handleConfirmClick={this.handleRestartModalConfirm}
                />
              </Fragment>
            )}
          </Translate>
        )
      ) : (
        <Redirect to="/" />
      );
    } else return <Redirect to="/" />;
  }
}

function mapStateToProps(state, props) {
  const { agentType, agentProfile, registration, admissionSteps } = state;
  const selectPathSteps = admissionStepSelectors.getAgentTypeSteps(state);
  const agentCountryId = agentProfile.countryId;
  const countries = registration.profile.formOptions.countries;
  const referUser = state.referUser;
  return {
    selectPathSteps,
    agentType,
    agentCountryId,
    countries,
    admissionSteps,
    agentProfile,
    referUser,
  };
}

export default MainLayoutFullNavAuthenticated(
  withRouter(
    connect(mapStateToProps, {
      getBusinessesToJoin,
      selectBusinessToJoin,
      removeJoinBusiness,
      showAgreements,
      getJoinBusinessStatus,
      logoutRedirect,
      getCountries,
      joinBusiness,
      getReferralUser,
      updateReferralUserData,
    })(JoinBusiness_UK_CA)
  )
);
