import "./index.scss";
import React, { Fragment, Component } from "react";

import { Nav, Tabs, Tab, Row, Col, TabPane } from "react-bootstrap";
import { Translate } from "spotify-shared-web/localize";
import spotifyButton from "spotify-shared-web/components/common/Button";
import SuccessMessage from "spotify-shared-web/components/common/SuccessMessage";
import { withRouter } from "react-router-dom";

import { ADMISSION_STEP_ROUTES } from "../../config";
import { connect } from "react-redux";
import {
  isGenerateScreenAssessmentURLFailed,
  screenAssesmentServiceError,
} from "spotify-shared/selectors/3rdPartyLinks";
import { setToInitial } from "spotify-shared/actions/3rdPartyLinks";
import logo1 from "../../assets/images/c_images/image 1.svg";
import logo2 from "../../assets/images/c_images/image 2.svg";
import logo3 from "../../assets/images/c_images/image 3.svg";
import logo4 from "../../assets/images/c_images/image 4.svg";
import logo5 from "../../assets/images/c_images/image 5.svg";
import logo6 from "../../assets/images/c_images/image 6.svg";
import logo7 from "../../assets/images/c_images/intervalInternational.png";
import logo8 from "../../assets/images/c_images/intuit quickbooks.png";
import logo9 from "../../assets/images/c_images/Nespresso.png";
import logo10 from "../../assets/images/c_images/Reliance.png";
import { AdmissionStep, agentStatusId, AgentPath } from "../../constants";
import {
  selectBusinessPath,
  joinBusiness,
} from "../../actions/agentTypeActions";
import { getAdmissionStepInstances } from "../../actions/admissionStepActions";
// import logo11 from "../../assets/images/c_images/image 6.svg";
import SCREEN_CONFIG from "../../screensConfig";

import { COUNTRY_IDS } from "../../constants";
import {
  getReferralUser,
  updateReferralUserData,
} from "../../actions/registrationActions";
import { Redirect } from "react-router-dom";

const CURRENT_SCREEN = SCREEN_CONFIG.registrationPending;

class OutstandingTaskAlert extends Component {
  constructor(props) {
    super(props);
    this.onCompleteProfileClick = this.onCompleteProfileClick.bind(this);
    this.show = this.show.bind(this);
    this.hasPendingTasks = this.hasPendingTasks.bind(this);
    this.showCompletedAgentTypeAlert =
      this.showCompletedAgentTypeAlert.bind(this);
    this.onDismissAgentTypeSuccessAlert =
      this.onDismissAgentTypeSuccessAlert.bind(this);
    this.showRefresh = this.showRefresh.bind(this);
    this.state = { clicked: false };
    this.dateOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
  }

  showRefresh() {
    const { onGenerateScreeningAssessmentLink } = this.props;
    this.setState({ clicked: true });
    onGenerateScreeningAssessmentLink();
  }

  onCompleteProfileClick = () => {
    // const {agentProfile} = this.props;
    // const isPHUser = agentProfile.countryId === COUNTRY_IDS.PH;
    // const { agentId } = agentProfile;
          
    // if(isPHUser){
    //   if(agentProfile.department=="en-PH/English"){
    //     this.props.selectBusinessPath(agentId, AgentPath.NEW_CALL_CENTER);
    //     this.props.getAdmissionStepInstances(agentProfile.userId);
    //     // this.props.getAdmissionStepInstances();
    //     <Redirect to={ADMISSION_STEP_ROUTES.registerBusiness} />
    //   }else if(agentProfile.department=="en-PH/English/Agent"){
    //     this.props.selectBusinessPath(agentId, AgentPath.JOIN_BUSINESS);
    //     this.props.getAdmissionStepInstances(agentProfile.userId);
    //     // this.props.getAdmissionStepInstances();
    //     <Redirect to={ADMISSION_STEP_ROUTES.joinBusiness} />
    //   }
    // }else{
    //   this.props.history.push(ADMISSION_STEP_ROUTES.contractorType);
    // }
    this.props.history.push(ADMISSION_STEP_ROUTES.contractorType);
  };

  show() {
    if (this.props.isScreeningAssessmentRequired) {
      return (
        this.showCompletedAgentTypeAlert() ||
        this.hasPendingTasks() ||
        this.props.isScreeningAssessmentRequired
      );
    }

    return this.showCompletedAgentTypeAlert() || this.hasPendingTasks();
  }

  hasPendingTasks() {
    //  return false
    const { isLegacyUser, hasPendingTasks } = this.props;

    return isLegacyUser === false && hasPendingTasks;
  }

  showCompletedAgentTypeAlert() {
    //  return true
    const { showCompletedAgentTypeAlert } = this.props;
    return showCompletedAgentTypeAlert;
  }

  onDismissAgentTypeSuccessAlert() {
    this.props.onDismissAgentTypeSuccessAlert();
  }

  componentDidMount() {
    const { referUser, admissionSteps, agentProfile, agentType } = this.props;
    if (referUser.spBusinessID == null) {
      this.props.getReferralUser(agentProfile.userId);
    }
    const isUSUser = agentProfile.countryId === COUNTRY_IDS.US;
    const isUKCAUser =
      agentProfile.countryId === COUNTRY_IDS.CA ||
      agentProfile.countryId === COUNTRY_IDS.UK;

    if (referUser.spBusinessID != null && admissionSteps.steps.length != 0) {
      if (isUSUser) {
        const childStepSP = admissionSteps.steps
          .find((step) => step.uniqueId == AdmissionStep.AGENT_TYPE)
          .childSteps.find(
            (childStep) => childStep.uniqueId == AdmissionStep.SOLE_PROPRIETOR
          );
        if (childStepSP.available || childStepSP.inProgress) {
          const { agentId } = agentProfile;
          this.props.selectBusinessPath(agentId, AgentPath.JOIN_BUSINESS);
        }
      }
      if (isUKCAUser) {
        const childStep = admissionSteps.steps
          .find((step) => step.uniqueId == AdmissionStep.AGENT_TYPE)
          .childSteps.find(
            (childStep) => childStep.uniqueId == AdmissionStep.JOIN_BUSINESS
          );
        if (!childStep.inProgress) {
          const { agentId } = agentProfile;
          this.props.selectBusinessPath(agentId, AgentPath.JOIN_BUSINESS);
        }
      }
    }

    if (agentProfile.countryId === COUNTRY_IDS.IN && admissionSteps.isFetchComplete && admissionSteps.length != 0) {
      //this.props.history.push(ADMISSION_STEP_ROUTES.contractorType);
      const agentTypeStep = admissionSteps.steps.find((step) => step.uniqueId == AdmissionStep.AGENT_TYPE)
      const solePropStep = agentTypeStep.childSteps.find((childStep) => childStep.uniqueId == AdmissionStep.SOLE_PROPRIETOR)
      const SignAgreementStep = solePropStep.childSteps.find((childStep) => childStep.uniqueId == AdmissionStep.SP_SIGN_AGREEMENTS)

      if (SignAgreementStep.available) {
        this.props.history.push(ADMISSION_STEP_ROUTES.soleProprietor);
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { referUser, admissionSteps, agentProfile } = this.props;
    if (referUser.spBusinessID != null && admissionSteps.steps.length != 0) {
      const pickStep = admissionSteps.steps.find(
        (step) => step.uniqueId == AdmissionStep.PICK_CLIENT
      );
      if (pickStep && pickStep.available && !admissionSteps.isFetching && !referUser.isUpdating) {
        this.props.referUser.agentStatusId = agentStatusId.ProfileComplete;
        const userData = {};
        userData.referUser = referUser;
        userData.userId = agentProfile.userId;
        this.props.updateReferralUserData(userData);
      }
    }
    // if(agentProfile.countryId===COUNTRY_IDS.IN && (!prevProps.admissionSteps.isFetchComplete) && admissionSteps.isFetchComplete && admissionSteps.length!=0){
    //   //this.props.history.push(ADMISSION_STEP_ROUTES.contractorType);
    //   const agentTypeStep=admissionSteps.steps.find((step) => step.uniqueId == AdmissionStep.AGENT_TYPE)
    //   const solePropStep =agentTypeStep.childSteps.find((childStep)=>childStep.uniqueId==AdmissionStep.SOLE_PROPRIETOR)
    //   const SignAgreementStep=solePropStep.childSteps.find((childStep)=>childStep.uniqueId==AdmissionStep.SP_SIGN_AGREEMENTS)

    //   if(SignAgreementStep.available){
    //     alert("redirecting to agreements screen")
    //     this.props.history.push(ADMISSION_STEP_ROUTES.contractorType);
    //   }
    // }
  }

  render() {
    const { isUrlGenerated, errorMessage, agentProfile } = this.props;
    const isCAUser = agentProfile.countryId === COUNTRY_IDS.CA;
    const isUKUser = agentProfile.countryId === COUNTRY_IDS.UK;
    const isUSUser = agentProfile.countryId === COUNTRY_IDS.US;
    const isINUser = agentProfile.countryId === COUNTRY_IDS.IN;

    if (this.state.clicked && isUrlGenerated === false) {
      window.alert(errorMessage.error.data.message);
      this.setState({ clicked: false });
      this.props.setToInitial();
    }

    return (
      this.show() && (
        <Translate>
          {({ translate }) => (
            <Fragment>
              <Row className="AgentTypePendingAlert m-sm-0">
                <Col className="d-flex flex-column px-sm-0 mt-5 ">
                  <div className="m-auto m-auto text-center mb-sm-2">
                    {!isINUser && <h1>{translate(`${CURRENT_SCREEN}.heading`)}</h1>
                    }
                    {isINUser && <h1>{translate(`${CURRENT_SCREEN}.heading`)}</h1>}
                  </div>
                  {this.hasPendingTasks() && (
                    <Fragment>

                      <p className=" p-2 pl-sm-0 alertMessage smallContainer ">
                        {translate(`${CURRENT_SCREEN}.description`)}
                      </p>
                      <span className="styleButton">
                        <spotifyButton
                          color="primary"
                          size="newLarge"
                          onClick={this.onCompleteProfileClick}
                        >
                          {" "}
                          {translate(`${CURRENT_SCREEN}.finishRegistrationButton`)}{" "}
                        </spotifyButton>
                      </span>
                    </Fragment>
                  )}

                  {/* condition for harver assesment */}
                  {!this.hasPendingTasks() &&
                    this.props.isScreeningAssessmentRequired &&
                    this.props.isScreeningAssessmentRequired
                      .assessmentRequired == true &&
                    this.props.isScreeningAssessmentRequired.assessmentFailed ==
                    false && (
                      <Fragment>
                        <p className="p-2 smallContainer">
                          {translate(`${CURRENT_SCREEN}.finishAssessment`)}
                        </p>
                        {isUrlGenerated && (
                          <span className="m-auto m-auto styleButton ">
                            <spotifyButton
                              color="primary"
                              size="newLarge"
                              onClick={() => location.reload()}
                            >
                              {translate(`${CURRENT_SCREEN}.refreshButton`)}
                            </spotifyButton>
                          </span>
                        )}
                        {!isUrlGenerated && (
                          <span className="m-auto m-auto styleButton  ">
                            <spotifyButton
                              color="primary"
                              size="newLarge"
                              disabled={
                                this.state.clicked && isUrlGenerated === null
                              }
                              isSubmitting={
                                this.state.clicked && isUrlGenerated === null
                              }
                              onClick={this.showRefresh}
                            >
                              {" "}
                              {translate(`${CURRENT_SCREEN}.completeAssessmentButton`)}{" "}
                            </spotifyButton>
                          </span>
                        )}
                      </Fragment>
                    )}

                  {this.props.isScreeningAssessmentRequired &&
                    this.props.isScreeningAssessmentRequired
                      .assessmentRequired == false &&
                    this.props.isScreeningAssessmentRequired.assessmentFailed ==
                    true && (
                      <Fragment>
                        <h3 className="text-center">
                          {translate(
                            `${CURRENT_SCREEN}.notMetTheRequirement`
                          ).replace(
                            "{0}",
                            new Date(
                              this.props.isScreeningAssessmentRequired.nextAvailableDate
                            ).toLocaleDateString(undefined, this.dateOptions)
                          )}
                        </h3>
                      </Fragment>
                    )}

                  {isUSUser && (
                    <div className="smallContainer newContainer flex-row">
                      <img src={logo1}></img>
                      <img src={logo2}></img>
                      <img src={logo3}></img>
                      <img src={logo4}></img>
                      <img src={logo5}></img>
                      <img src={logo6}></img>
                    </div>
                  )}
                  {isCAUser && (
                    <div className="smallContainer newContainer flex-row">
                      <img src={logo7}></img>
                      <img src={logo8}></img>
                      <img src={logo10}></img>
                    </div>
                  )}
                  {isUKUser && (
                    <div className="smallContainer newContainer flex-row">
                      <img src={logo7}></img>

                      <img src={logo9}></img>
                    </div>
                  )}
                </Col>
              </Row>
            </Fragment>
          )}
        </Translate>
      )
    );
  }
}

function mapStateToProps(state, props) {
  const isUrlGenerated = isGenerateScreenAssessmentURLFailed(state);
  const errorMessage = screenAssesmentServiceError(state);
  const agentProfile = state.agentProfile;
  const referUser = state.referUser;
  const admissionSteps = state.admissionSteps;
  const agentType = state.agentType;

  return {
    isUrlGenerated,
    errorMessage,
    agentProfile,
    referUser,
    admissionSteps,
    agentType
  };
}

const mapDispatchToProps = {
  setToInitial,
  selectBusinessPath,
  getAdmissionStepInstances,
  joinBusiness,
  getReferralUser,
  updateReferralUserData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(OutstandingTaskAlert));
