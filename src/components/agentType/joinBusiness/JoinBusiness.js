import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import styles from "./JoinBusiness.module.scss";
import MainLayout from "../../layouts/MainLayout";
import UniqueIdFormContainer from '../uniqueIdentity/UniqueIdFormContainer';
import RestartNextFooter from "../../shared/RestartNextFooter";
import JoinBusinessFormContainer from "./JoinBusinessFormContainer";
import Modal from "../../common/Modal";
import LoadingComponent from "spotify-shared-web/components/common/LoadingComponent";
import ConfirmRestartAgentModal from "../ConfirmRestartAgentModal";
import PendingRequest from "./PendingRequest";
import DeclinedRequest from "./DeclinedRequest";
import AdmissionSteps from "../../shared/admissionSteps/AdmissionSteps";
import joinBusinessIcon from "../../../assets/images/agentType/working-for-call-center.svg";
import { AdmissionStep, JoinCallCenter, COUNTRY_IDS } from "../../../constants";
import { ADMISSION_STEP_ROUTES } from "../../../config";
import JoinBusinessIcon from "../../../assets/images/agentType/service-agent.svg";
import {
  getBusinessesToJoin,
  selectBusinessToJoin,
  removeJoinBusiness,
  showAgreements,
  getJoinBusinessStatus,
  getMedia,
  joinBusiness,
  changePatch,
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
import AgentTypeItem from "../AgentTypeItem-US";
import { agentImageStringMapping } from "../agentData";
import commonStyle from "../../../../src/components/shared/CommonStyle.module.scss";
import { Card } from "react-bootstrap";
import { common } from "@material-ui/core/colors";
import classNames from "classnames";
import AgentTypeHelp from "../AgentTypeHelp";
import { agentStatusId } from "../../../constants";
import SCREEN_CONFIG from "../../../screensConfig";

const CURRENT_SCREEN = SCREEN_CONFIG.registerAsServicePartner;


const subStepMap = {
  [AdmissionStep.JB_VERIFY_IDENTITY]: "verifyIdentity",
  [AdmissionStep.JB_SEND_REQUEST]: "sendrequest",
  [AdmissionStep.JB_SIGN_AGREEMENTS]: "agreements",
  [AdmissionStep.JB_PENDING_FINALIZATION]: "pendingfinalization",
};

const subStepIndexMap = {
  verifyIdentity: "verifyIdentity",
  sendRequest: "sendrequest",
  agreements: "agreements",
  pendingFinalization: "pendingfinalization"
}


class JoinBusiness extends Component {
  state = {
    isModalOpen: false,
    isRestartModalOpen: false,
    getStatusProcessing: false,
    showDeclinedRequest: false // initially false → show Loading first
  };


  componentDidMount = () => {
    this.props.getCountries();

    this.initHelper();
    this.props.getMedia(this.props.agentProfile.countryId);
    this.props.getReferralUser(this.props.agentProfile.userId);
  };

  componentDidUpdate(prevProps, prevState) {

    if (prevProps.selectPathSteps !== this.props.selectPathSteps) {
      // this.initHelper();
      const currentStep = getAgentStepFromURL(this.props.location.search);
      this.redirectBusinessDecline(currentStep);      

      if (this.props.selectPathSteps.childSteps) {
        const agentTypeSteps = this.props.selectPathSteps.childSteps;
        const substeps = this.getSubSteps(agentTypeSteps);
        const businessDeclineMessage = <Translate id="registerAsServicePartner.businessDecline" />;


        if (this.isAgentDeclined(substeps)) {
          this.props.removeJoinBusiness(
            this.props.agentProfile.agentId,
            businessDeclineMessage
          );
        }
      }

      const { admissionSteps, agentType, referUser, agentProfile } = this.props;
      const isUSUser = agentProfile.countryId === COUNTRY_IDS.US;     

      if (
        this.props.referUser.spBusinessID != null &&
        admissionSteps.steps.length != 0
      ) {
        const childStep = admissionSteps.steps
          .find((step) => step.uniqueId == AdmissionStep.AGENT_TYPE)
          .childSteps.find(
            (childStep) => childStep.uniqueId == AdmissionStep.JOIN_BUSINESS
          );
        this.setReferralStatus(currentStep, childStep);
        if (
          agentType.joinBusiness.statusId == 0 &&
          childStep.childSteps.some(
            (x) => (x.uniqueId == AdmissionStep.JB_VERIFY_IDENTITY && x.completed) || !isUSUser
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

  redirectBusinessDecline(currentStep) {
    const { agentType, agentProfile ,referUser } = this.props;
    const referVerify = referUser.spBusinessID !== null ? true : false;

    if (agentProfile.countryId === COUNTRY_IDS.PH && currentStep == subStepIndexMap.agreements && agentType.isJoinBuisnessError) {

      this.props.removeJoinBusiness(
        this.props.agentProfile.agentId,
        "Business has declined your request"
      );

      <Redirect to={"/opportunities"} />;

    }
  }

  setReferralStatus = (currentStep, childStep) => {
    const { referUser } = this.props;
    if (currentStep == subStepIndexMap.verifyIdentity) {
      this.props.referUser.agentStatusId = agentStatusId.VerifyIdentity;
    } else if (currentStep == subStepIndexMap.pendingFinalization) {
      this.props.referUser.agentStatusId = agentStatusId.PendingFinalization;
    } else if (currentStep == subStepIndexMap.agreements) {
      if (
        childStep.childSteps.some(
          (x) => x.uniqueId == AdmissionStep.JB_SIGN_AGREEMENTS && x.completed
        )
      ) {
        this.props.referUser.agentStatusId = agentStatusId.PendingFinalization;
      } else {
        this.props.referUser.agentStatusId = agentStatusId.SignAgreements;
      }
    } else if (currentStep == subStepIndexMap.sendRequest) {
      this.props.referUser.agentStatusId = agentStatusId.SendRequest;
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
      // debugger;
      // if (this.isAgentDeclined(substeps)) {
      //   this.props.removeJoinBusiness(
      //     agentProfile.agentId,
      //     "Business has declined your request"
      //   );
      // }
    }
  }

  getSubSteps = (agentTypeSteps) => {
    const currentStep = agentTypeSteps.find((agentTypeStep) => {
      return agentTypeStep.uniqueId === AdmissionStep.JOIN_BUSINESS;
    });
    return currentStep ? currentStep.childSteps : undefined;
  };

  isAgentDeclined = (substeps) => {
    // debugger

    return substeps.find((substep) => {
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

  startPHUserTimer = () => {
    // If already showing DeclinedRequest, skip
    if (this.state.showDeclinedRequest) return;
    
    setTimeout(() => {
      this.setState({ showDeclinedRequest: true });
    }, 5000); // wait 5 seconds
  };

  renderViewByAdmissionStep = () => {
    const { agentType, agentProfile ,referUser } = this.props;
    const referVerify = referUser.spBusinessID !== null ? true : false;
    const isPHUser = agentProfile.countryId === COUNTRY_IDS.PH;

    switch (this.currentSubstep) {
      case subStepIndexMap.verifyIdentity:
        return (
          <UniqueIdFormContainer
            agentProfile={this.props.agentProfile}
            handleRestartClick={this.handleRestartModalOpen}
            restartText="Not sure you want to work for someone else"
            btnNextId="btnJoinBusinessSSNNext"
            changeTypeBtnId="btnJoinBusinessSSNChangeType"
            agentTypeSteps={this.props.selectPathSteps.childSteps}
          />
        );
      // case subStepIndexMap.sendRequest:
      //   return (
      //     <JoinBusinessFormContainer
      //       agentProfile={this.props.agentProfile}
      //       handleRestartClick={this.handleRestartModalOpen}
      //       handleModalOpen={this.handleModalOpen}
      //     />
      //   );
      case subStepIndexMap.sendRequest:
        if (isPHUser) {
          this.startPHUserTimer();

          return this.state.showDeclinedRequest && agentType.isJoinBuisnessError && !referVerify ? (
            <DeclinedRequest statusId={agentType.joinBusiness.statusId} />
          ) : (
            <LoadingComponent />
          );
        }
        //  Default: normal flow for other country users
        return (
          <JoinBusinessFormContainer
            agentProfile={this.props.agentProfile}
            handleRestartClick={this.handleRestartModalOpen}
            handleModalOpen={this.handleModalOpen}
          />
        );

      case subStepIndexMap.agreements:

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

  renderHeaderSubTitle = (substeps, translate) => {
    const { agentType, agentProfile, referUser } = this.props;
    const referVerify = referUser.spBusinessID !== null ? true : false;
    const isUKUser = agentProfile.countryId === COUNTRY_IDS.UK;
    const isPHUser = agentProfile.countryId === COUNTRY_IDS.PH;
    const currentStep = businessLogicHelper.getCurrentSubstep(substeps);
    //const headerSubTitle1 = "If you don't want the extra work and responsibilities of managing a business, you can register as an agent working for a Service Partner already on the platform.";
    const headerSubTitle1 = !referVerify
      ? translate(`${CURRENT_SCREEN}.helperText1`)
      : translate(`${CURRENT_SCREEN}.helperText2`)
    //const headerSubTitle2 =isUKUser ? "Please enter the Service partner ID of the Service Partner you are working for." : "Please enter the FEIN(Federal Employment Identification Number) or Service Partner ID (IB ID) of the Service Partner you are working for.";
    const headerSubTitle2 = translate(`${CURRENT_SCREEN}.description`)
    const headerSubTitle3 = ""; //"Your request to register for the platform as an agent has been submitted to the Service Partner you will be working for. They must approve you in order to finalize registration. If your approval is delayed please contact them directly. You can restart by clicking the Change Your Contractor Type link below."
    const headerSubTitle4 = translate(`${CURRENT_SCREEN}.agreementsSigned`);

    if (agentType.joinBusiness.statusId == JoinCallCenter.PENDING_ACCEPTANCE || isPHUser)
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

    if (
      agentType.isFetchInProgress ||
      admissionSteps.isFetchInProgress ||
      referUser.isLoading
    ) {
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
      referUser
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
    const referVerify = referUser.spBusinessID !== null ? true : false;

    return (
      <Translate>
        {({ translate }) => (
          <>
            {/*<div className={`col-lg-2`}></div>*/}
            <div
              className={classNames({
                "col-lg-4 offset-md-1 offset-lg-0 col-md-10": (this.currentSubstep === "agreements" || this.currentSubstep === "verifyIdentity"),
                "col-lg-4 offset-lg-2 col-md-10 offset-md-1 offset-lg-0 col-xs-12": (!referVerify && (this.currentSubstep === "sendrequest" || this.currentSubstep === "pendingfinalization")),
                "mt-sm-0": true && (this.currentSubstep !== "agreements"),
                "mt-lg-5": true && (this.currentSubstep !== "agreements"),
              })}
            >
              {/*<img className="img-fluid" src={joinBusinessIcon} alt='' />*/}
              <div
                className={classNames({
                  "d-none d-lg-block": true,
                  // "mb-sm-4": this.currentSubstep === "agreements",
                })}
              >
                <AdmissionSteps
                  headerCopy={translate(`${CURRENT_SCREEN}.numberOfAdmissionSteps`)}
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

  renderSelectPathChangeContainer = () => {
    const { selectPathSteps, agentProfile, agentType, roleRegistrationScreen, referUser } = this.props;
    const { isTermsChecked } = this.state;

    const prmSteps = selectPathSteps.childSteps;

    const getDisplayedSteps = () => {
      const displayedSteps = Object.keys(roleRegistrationScreen)
        .filter(stepName => roleRegistrationScreen[stepName].display)
        .map(stepName => {
          const step = roleRegistrationScreen[stepName];
          const correspondingStep = prmSteps.find(prmStep => prmStep.uniqueId === step.admissionStepId);
          return correspondingStep;
        });


      return displayedSteps.filter(step => step !== undefined).reverse();
    };

    const filteredSteps = getDisplayedSteps();
    const referVerify = referUser.spBusinessID !== null ? true : false;

    if (selectPathSteps) {
      const agentTypeSteps = selectPathSteps
        ? selectPathSteps.childSteps
        : undefined;

      if (agentTypeSteps && agentProfile) {
        const filterdAgentTypeSteps = filteredSteps.filter(
          (item) => item.uniqueId !== AdmissionStep.JOIN_BUSINESS
        );
        const currentStep = agentTypeSteps.find((agentTypeStep) => {
          return agentTypeStep.uniqueId === AdmissionStep.JOIN_BUSINESS;
        });
        return (
          <Translate>
            {({ translate }) => (
              <>
                <div
                  className={classNames({
                    "col-lg-4": true,
                    "offset-lg-0": this.currentSubstep == subStepIndexMap.agreements,
                    "offset-lg-0": this.currentSubstep == subStepIndexMap.verifyIdentity,
                    "offset-lg-2": !referVerify && (
                      this.currentSubstep == "businessinfo" ||
                      this.currentSubstep == subStepIndexMap.pendingFinalization ||
                      this.currentSubstep == subStepIndexMap.sendRequest),
                    "col-md-10 offset-md-1 offset-lg-0 col-xs-12": true,
                  })}
                >
                  {/* <br />
                                <br /> */}
                  {/* {this.currentSubstep == subStepIndexMap.verifyIdentity &&
                    this.currentSubstep !== subStepIndexMap.sendRequest && (
                      <h1
                        className={`${commonStyle["heading_1"]} 
                                ${commonStyle["regularFont"]} ${commonStyle["heading_1_topUS"]} 
                                ${commonStyle["componentsBottomMargin"]} `}
                        style={{ textTransform: "uppercase" }}
                      >
                        {translate(`${CURRENT_SCREEN}.sideHeader`)}
                      </h1>
                    )} */}

                  {/* {this.currentSubstep == subStepIndexMap.verifyIdentity &&
                    this.currentSubstep === subStepIndexMap.sendRequest && (
                      <h1
                        className={`${commonStyle["heading_1"]} 
                                ${commonStyle["regularFont"]} ${commonStyle["heading_1_topUSView"]} 
                                ${commonStyle["componentsBottomMargin"]} `}
                        style={{ textTransform: "uppercase" }}
                      >
                        {translate(`${CURRENT_SCREEN}.sideHeader`)}
                      </h1>
                    )} */}

                  {(this.currentSubstep != subStepIndexMap.verifyIdentity || this.currentSubstep == subStepIndexMap.verifyIdentity) && (
                    <Fragment>
                      {this.currentSubstep === subStepIndexMap.sendRequest && (
                        <p
                          className={`${commonStyle["heading_1_topUSView"]}
                                      ${commonStyle["componentsBottomMargin"]}`}
                          style={{ fontWeight: 600 }}
                        >
                          {translate(`${CURRENT_SCREEN}.sideHeader`)}
                        </p>
                      )}

                      {this.currentSubstep != subStepIndexMap.sendRequest && (
                        <p
                          className={`${commonStyle["heading_1_topUS"]}
                                      ${commonStyle["componentsBottomMargin"]}`}
                          style={{ fontWeight: 600 }}
                        >
                          {translate(`${CURRENT_SCREEN}.sideHeader`)}
                        </p>
                      )}

                      {/* <br />

                                    <br /> */}
                    </Fragment>
                  )}
                  {filterdAgentTypeSteps &&
                    filterdAgentTypeSteps.map((type, index) => (
                      <>
                        <AgentTypeItem
                          agentTypeStep={type}
                          agentId={agentProfile.agentId}
                          agentImageStringMapping={agentImageStringMapping}
                          isTermsChecked={isTermsChecked}
                          key={type.admissionStepId}
                          currentStep={currentStep}
                        />
                      </>
                    ))}
                  <AgentTypeHelp media={agentType.media} />
                </div>
              </>
            )}
          </Translate>
        );
        //const substeps = this.getSubSteps(agentTypeSteps);
      }
    }
    return (
      <Translate>
        {({ translate }) => (
          <>
            {!referVerify && (
              <div
                className={`d-none d-lg-block col-lg-4`}
                style={{ textAlign: "center", padding: "0 30px" }}
              ></div>
            )}
          </>
        )}
      </Translate>
    );
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
    // const headerCopy =
    //   agentProfile.countryId === COUNTRY_IDS.US
    //     ? "Four steps to finish!"
    //     : "Three steps to finish!";
    const referVerify = referUser.spBusinessID !== null ? true : false;
    const servicePartner = referUser.spName;

    // TODO To be read from Localisation file
    const isUKUser = agentProfile.countryId === COUNTRY_IDS.UK;
    const isUSUser = agentProfile.countryId === COUNTRY_IDS.US;
    const isPHUser = agentProfile.countryId === COUNTRY_IDS.PH;

    if (Object.keys(selectPathSteps).length === 0 || countries.length === 0)
      return <LoadingComponent />;
    if (selectPathSteps && !selectPathSteps.completed) {
      const agentTypeSteps = selectPathSteps.childSteps;
      const substeps = this.getSubSteps(agentTypeSteps);
      const region = businessLogicHelper.getAgentRegion(
        agentCountryId,
        countries
      );
      // debugger;
      if (this.isAgentDeclined(substeps)) {
        const failedstep = substeps.find((step) => { return step.failed == true })
        return <>
          <p style={{ "margin": "auto" }}>{failedstep.statusNotes}</p>
          <LoadingComponent />
        </>
      }
      const subStep = businessLogicHelper.getCurrentSubstep(substeps);
      if (!subStep) return <Redirect to="/" />;
      const incomingSubStep = subStepMap[subStep.uniqueId];
      this.currentSubstep = getAgentStepFromURL(this.props.location.search);
      const isAgreementsStep =
        subStep.uniqueId === AdmissionStep.JB_SIGN_AGREEMENTS;

      // TODO To be read from Localisation file
      const headerJoinServiceTitle =
        "REGISTER AS AN AGENT WORKING FOR " +
        servicePartner +
        " ON THE spotify® PLATFORM";

      return incomingSubStep !== this.currentSubstep ? (
        <Redirect
          to={{
            pathname: ADMISSION_STEP_ROUTES.joinBusiness,
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
                <div className={`row`}>
                  <div
                    className={classNames({
                      "col-lg-8":
                        (this.currentSubstep === subStepIndexMap.verifyIdentity && !referVerify || this.currentSubstep == subStepIndexMap.agreements && !referVerify),
                      "col-lg-6":
                        (!referVerify && (this.currentSubstep === subStepIndexMap.sendRequest || this.currentSubstep === subStepIndexMap.pendingFinalization)),
                      "col-lg-7":
                        this.currentSubstep == subStepIndexMap.agreements && !referVerify,
                      "col-lg-5 col-md-10 offset-md-1 offset-lg-0 col-xs-12": (referVerify && (this.currentSubstep === subStepIndexMap.sendRequest || this.currentSubstep === subStepIndexMap.pendingFinalization)),
                      "col-md-10 offset-md-1 offset-lg-0 col-xs-12":
                        true && !referVerify,
                      "col-lg-7":
                        this.currentSubstep !== subStepIndexMap.agreements && referVerify,
                      "col-lg-7":
                        this.currentSubstep == subStepIndexMap.agreements && referVerify,
                      // "col-md-8 offset-md-1 offset-lg-2 col-xs-12":
                      //   true && referVerify,

                    })}
                  >
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
                        className={`${commonStyle["heading_1"]} ${commonStyle["regularFont"]} ${commonStyle["heading_1_top"]} ${commonStyle["active_color"]} ${commonStyle["widthChange4"]}  ${styles["lineHeight"]}`}
                      >
                        {translate(`${CURRENT_SCREEN}.headerTitle`)}
                        {/*<sup>&reg;</sup>{translate("platform")}*/}
                      </h1>
                    )}
                    <p
                      className={` ${commonStyle["componentsMargin"]} ${commonStyle["lightFont"]} ${commonStyle["paragraph_3"]} ${commonStyle["widthChange"]} ${commonStyle["blackColor"]}`}
                    >
                      {!isAgreementsStep &&
                        (this.renderHeaderSubTitle(substeps, translate))}
                    </p>
                    {this.currentSubstep == subStepIndexMap.agreements && (
                      <h3
                        className={`${styles["text-bold"]} ${commonStyle["paragraph_1"]} ${commonStyle["blackColor"]} ${commonStyle["componentsMargin"]} `}
                      >
                        {translate(
                          `${CURRENT_SCREEN}.signDocuments.header`
                        )}
                      </h3>
                    )}
                    {!isUKUser && this.currentSubstep == subStepIndexMap.agreements && (
                      <p
                        className={`agreementcopy col-xl-11 col-md-12 pl-0 ${commonStyle["lightFont"]} ${commonStyle["paragraph_3"]} ${commonStyle["blackColor"]} ${commonStyle["agreementcopy1"]}`}
                      >
                        {translate(`${CURRENT_SCREEN}.signDocuments.description`)}
                      </p>
                    )}
                    {/* <div className={`d-none d-lg-none`}>
                      <AdmissionSteps
                        headerCopy={translate(headerCopy)}
                        substeps={substeps}
                        business={"join-business"}
                        region={region}
                      />
                    </div> */}
                    {!isPHUser && !this.checkIfPendingJoinRequest() &&
                      this.renderViewByAdmissionStep(substeps)
                    }

                    {!isPHUser && this.checkIfPendingOrFinalizationStep(subStep) && (
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


                    {isPHUser &&
                      agentType.isFetchInProgress ? (
                      <LoadingComponent />
                    ) : (
                      <>
                        {isPHUser && this.checkIfPendingOrFinalizationStep(subStep) && (
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
                        
                        {isPHUser && !this.checkIfPendingJoinRequest() && this.renderViewByAdmissionStep(substeps)}
                      </>

                    )
                    }

                    {!isPHUser && !this.checkIfPendingJoinRequest() &&
                      this.currentSubstep === subStepIndexMap.sendRequest && (
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
                      )
                    }

                  </div>

                  {isPHUser &&
                    <img className={`mb-md-5 mb-xxl-3 mb-xl-3 mb-sm-4 ${styles['admissionStepTopmargin']}  ${styles['img-us']}`}
                      src={JoinBusinessIcon}
                      alt=''
                      style={{ marginLeft: 'auto', display: 'block', marginBottom: 'auto' }}
                    />
                  }

                  {!isUSUser && !isPHUser && !referVerify && this.renderStepsContainer()}
                  {isUSUser && !isPHUser && !referVerify && this.renderSelectPathChangeContainer()}
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
                        {translate(`${CURRENT_SCREEN}.selectServicePartner`)}
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
                                    {translate(`${CURRENT_SCREEN}.selectButton`)}
                                  </Button>
                                </li>
                              );
                            }
                          )}
                        </ul>
                      ) : (
                        <div className={styles["businesses-modal__content"]}>
                          {translate(`${CURRENT_SCREEN}.noServicePartner`)}
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
  const { agentType, agentProfile, registration, admissionSteps, app } = state;
  const selectPathSteps = admissionStepSelectors.getAgentTypeSteps(state);
  const agentCountryId = agentProfile.countryId;
  const countries = registration.profile.formOptions.countries;
  const referUser = state.referUser;
  const joinBusinessScreenConfig = app.countryConfigurations.config.roleRegistrationScreen.servicePartnerScreen;
  const roleRegistrationScreen = app.countryConfigurations.config.roleRegistrationScreen;

  return {
    selectPathSteps,
    agentType,
    agentCountryId,
    countries,
    admissionSteps,
    agentProfile,
    referUser,
    joinBusinessScreenConfig,
    roleRegistrationScreen
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
      getMedia,
      joinBusiness,
      getReferralUser,
      updateReferralUserData,

    })(JoinBusiness)
  )
);
