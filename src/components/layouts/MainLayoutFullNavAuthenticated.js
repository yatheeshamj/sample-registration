import "./MainLayoutFullNavAuthenticated.scss";
import React, { Fragment } from "react";
import Header from "./Header";
import Footer from "./Footer";
import WindowResize from "./WindowResize";
import Loading from "spotify-shared-web/components/common/LoadingComponent";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import { ensureIsAuthenticatedWithAgentProfile } from "../../actions/authActions";
import classNames from "classnames";
import { boostrapBreakpoints } from "../../const/helpers";
import { fetchWelcomeContent } from "spotify-shared/actions/welcomeContent";
import * as welcomeContentSelector from "spotify-shared/selectors/welcomeContent";
import StateModal from "../zerostate/stateModal";
import PreferenceModal from "../../components/preferencePage/Modal";
import {
  isLegacyUser,
  isRegistrationComplete,
} from "spotify-shared/selectors/agentProfile";
import Cookies from "universal-cookie";
import { showCompletedAgentTypeAlert } from "spotify-shared/selectors/admissionSteps";
import { setShowAgentTypeComplete } from "../../actions/admissionStepActions";
import * as agentProfileSelector from "spotify-shared/selectors/agentProfile";
import OutstandingTaskAlert from "../outstandingTaskAlert";
import withAppInsights from "../../appInsights";
import commonStyle from "../shared/CommonStyle.module.scss";
import JamaicaNameDOBModal from "../opportunityBoard/models/JamaicaNameDOBModal";
import { Country, COUNTRY_IDS } from "../../constants";
import { GlobalParameterTypes, AgentStatus, OpportunityStatus} from "spotify-shared/constants";
import * as globalParametersSelector from "spotify-shared/selectors/globalParameters";
import * as agreementTemplatesSelector from "spotify-shared/selectors/agreementTemplates";
import { history } from "../../store";
import { REACT_APP_PORTAL_BASE_URL } from "../../config";
import ParishUpdateModal from "../opportunityBoard/models/ParishUpdateModal";
import JamaicaConsentModal from "../opportunityBoard/models/JamaicaConsentModal";

import { getParishes, checkifJMConsentSigned, declineJmConsent } from "../../actions/registrationActions";
//import JamaicaConsentModal from "../opportunityBoard/models/JamaicaConsentModal";
import { agentProfile } from "spotify-shared/selectors";
import { RetrieveAgrrementTemplateForJM, SaveConsentAgreement } from "spotify-shared/actions/agreementTemplates";
import AdditionalFormsModal from "../enrollmentPrerequisites/additionalFormsModal";
import DeclineJamaicaConsentModal from "../opportunityBoard/models/DeclineJamaicaConsentModal";
import { logoutRedirect } from "../../actions/loginActions";

import * as opportunityBoardSelector from "spotify-shared/selectors/opportunityBoard"
import * as enrolledProgramsSelector from "spotify-shared/selectors/enrolledPrograms"
import * as opportunitiesSelector from "spotify-shared/selectors/opportunities"

// AdditionalFormsModal



const MainLayoutFullNavAuthenticated = (Comp) => {
  const Wrapper = (props) =>
    class extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          ZeroStateModal: false,
          isPreferenceModalOpen: false,
          showNameAndDOBModal: false,
          parishUpdateModal: false,
          jmConsentModal: false,
          AdditionalFormsModal: false,
          consentDeclineModal: false
        };
        this.isUserAuthenticated = this.isUserAuthenticated.bind(this);
        this.onHideZeroStateModal = this.onHideZeroStateModal.bind(this);
        this.onZeroStateClick = this.onZeroStateClick.bind(this);
        this.onDismissAgentTypeSuccessAlert =
          this.onDismissAgentTypeSuccessAlert.bind(this);
        this.onHideNameandDOBModal = this.onHideNameandDOBModal.bind(this);
        this.onShowNameandDOBModal = this.onShowNameandDOBModal.bind(this);
        this.onHideParishUpdateModal = this.onHideParishUpdateModal.bind(this)
        this.onShowParishUpdateModal = this.onShowParishUpdateModal.bind(this)
        this.onHidejmConsentModal = this.onHidejmConsentModal.bind(this)
        this.onShowjmConsentModal = this.onShowjmConsentModal.bind(this)
        this.showAdditionalFormModal = this.showAdditionalFormModal.bind(this);
        this.onConfirmSignAgreementClick = this.onConfirmSignAgreementClick.bind(this);
        this.showDeclineModal = this.showDeclineModal.bind(this);
        this.hideDeclineModal = this.hideDeclineModal.bind(this);
        this.onDeclineConsent = this.onDeclineConsent.bind(this)
      }

      componentDidMount() {
        if (this.isUserAuthenticated() === false)
          this.props.ensureIsAuthenticatedWithAgentProfile();
        else {
          if (this.isWelcomeContentLoaded() === false) {
            this.props.fetchWelcomeContent();
          }
          this.shouldParishModalDisplay()
          if (this.props.jamaicaFixDate && this.isJamaicaUser()) {
            this.onShowNameandDOBModal();
          }

          this.checkifJMConsentRequired()
          if (this.props.agentProfile.agentId && this.checkIfInactiveJMUser()) {

            this.props.logoutRedirect()
          }
        }
      }

      componentDidUpdate(prevProps) {
        if (
          this.isUserAuthenticated() &&
          this.isWelcomeContentLoaded() === false &&
          this.props.isWelcomeContentFetching === false
        ) {
          // wait for  agentProfile.agentId !== null, this ensures we have the auth token available
          this.shouldParishModalDisplay()
          this.props.fetchWelcomeContent();
        }

        if ((!prevProps.agentProfile.agentId) && this.isUserAuthenticated()) {
          this.checkifJMConsentRequired()
        }

        //check for fetching the agrrements
        if (this.props.agentProfile.agentId) {
          const { signPending } = this.props.registrationProfile
          //const {signPending}=prev.props.agentProfile
          if (signPending.isrequired && (!prevProps.registrationProfile.signPending.isrequired)) {
            this.props.RetrieveAgrrementTemplateForJM()
            this.onShowjmConsentModal()
          }

        }

        if ((!prevProps.agentProfile.agentId) || (!prevProps.jamaicaFixDate)) {
          if (this.isUserAuthenticated() && this.props.jamaicaFixDate) {
            if (this.isJamaicaUser()) {
              this.onShowNameandDOBModal();
            }
            // else{
            //   this.onHideNameandDOBModal()
            // }


          }
        }
        if (prevProps.agentProfile && (prevProps.agentProfile.jamaicaFixFlag == false) && (this.props.agentProfile.jamaicaFixFlag == true) && (this.props.agentProfile.countryCode == Country.JM)) {
          if (this.props.agentProfile.jamaicaFixFlag) {

            this.onHideNameandDOBModal()


          }
        }

        if (prevProps.agentProfile.agentId && prevProps.agentProfile.provinceId == "00000000-0000-0000-0000-000000000000" && this.props.agentProfile.provinceId != "00000000-0000-0000-0000-000000000000") {
          this.onHideParishUpdateModal()
        }
        if (this.props.agentProfile.agentId && this.checkIfInactiveJMUser()) {
          this.props.logoutRedirect()
        }
      }

      isUserAuthenticated() {
        return this.props.agentProfile.agentId !== null;
      }

      isWelcomeContentLoaded() {
        return Object.keys(this.props.zeroStateContent).length > 0;
      }

      onHideZeroStateModal() {
        this.setState({ ZeroStateModal: false });
      }
      onZeroStateClick() {
        this.isWelcomeContentLoaded() &&
          this.setState({ ZeroStateModal: true });
      }

      onHidePreferenceModal = () => {
        this.setState({ isPreferenceModalOpen: false, ZeroStateModal: true });
      };

      onDismissAgentTypeSuccessAlert() {
        this.props.setShowAgentTypeComplete(false);
      }
      onHideNameandDOBModal() {

        this.setState({
          showNameAndDOBModal: false,
        });
        return window.location.href = `${REACT_APP_PORTAL_BASE_URL}tasks`;

      }
      onShowNameandDOBModal() {
        this.setState({
          showNameAndDOBModal: true,
        });
      }
      isJamaicaUser() {
        const { createdOn, countryCode, jamaicaFixFlag, status } = this.props.agentProfile;
        const { jamaicaFixDate } = this.props
        const d1 = new Date(jamaicaFixDate).getTime()
        const d2 = new Date(createdOn).getTime()


        if (countryCode == Country.JM && status == AgentStatus.Active && (!jamaicaFixFlag) && (d2 <= d1)) {
          return true
        }
        return false;
      }

      onShowParishUpdateModal() {
        this.setState({
          parishUpdateModal: true
        })
      }

      onHideParishUpdateModal() {
        this.setState({
          parishUpdateModal: false
        })
      }

      shouldParishModalDisplay() {
        const { countryCode, provinceId, status } = this.props.agentProfile

        if (countryCode == Country.JM && status == AgentStatus.Active && provinceId == "00000000-0000-0000-0000-000000000000") {
          this.props.getParishes()
          this.onShowParishUpdateModal()
        }
      }


      onShowjmConsentModal() {
        this.setState({ jmConsentModal: true })
      }
      onHidejmConsentModal() {
        this.setState({ jmConsentModal: false })
      }

      checkifJMConsentRequired() {
        const { status, countryCode } = this.props.agentProfile
        if (countryCode == Country.JM && status == AgentStatus.Inprogress) {
          this.props.checkifJMConsentSigned()

        }
      }

      showAdditionalFormModal() {

        this.setState({ AdditionalFormsModal: true, jmConsentModal: false })
      }

      onConfirmSignAgreementClick(data) {
        // alert("todo-save the agreement")
        this.props.SaveConsentAgreement(data)
      }

      showDeclineModal() {
        this.setState({ consentDeclineModal: true, AdditionalFormsModal: false })
      }
      hideDeclineModal() {
        this.setState({ consentDeclineModal: false, jmConsentModal: true })
      }

      onDeclineConsent() {
        // alert("some error")
        this.props.declineJmConsent()
      }

      checkIfInactiveJMUser() {
        const { status, countryCode } = this.props.agentProfile
        if (status == AgentStatus.Inactive && countryCode == Country.JM) {
          return true
        }
        return false
      }

      shouldShowWaitList(){
        return this.props.screenConfig.waitlistScreen.display &&
        !this.props.isEnrolledProgramsFetching &&
          !this.props.isOpportunitiesFetching &&
              this.props.inProgress.length === 0 &&
              this.props.myPrograms.length === 0 &&
              this.props.opportunities.every(opp => opp.enrollmentStatus === OpportunityStatus.Passed) &&
              !(
                (this.props.isLegacyUser === false && this.props.hasPendingTasks) ||
                (this.props.getScreeningAssessmentRequired &&
                  (this.props.getScreeningAssessmentRequired.assessmentRequired === true ||
                    this.props.getScreeningAssessmentRequired.assessmentFailed === true))
              ) 
      }


      render() {
        const { showCompletedAgentTypeAlert, isLegacyUser, agreementSigning, agreementsToSign, screenConfig } = this.props;

        if (this.isUserAuthenticated() === false || !screenConfig) return <Loading />;

        const cookies = new Cookies();
        let showWelcomeCookie = cookies.get("showWelcome");
        let showPreferenceModal = cookies.get("showPreferenceModal");

        const showModels = localStorage.getItem("showModels");

        if (showModels && showModels === "false") {
          showWelcomeCookie = "false";
          showPreferenceModal = "false";
        }

        if (
          this.isWelcomeContentLoaded() &&
          showPreferenceModal == null &&
          this.state.isPreferenceModalOpen == false
        ) {
          this.setState({ isPreferenceModalOpen: true });
        }

        if (
          this.isWelcomeContentLoaded() &&
          showWelcomeCookie == null &&
          this.props.isLegacyUser &&
          showPreferenceModal == "false"
        ) {
          this.setState({ ZeroStateModal: true });
          cookies.set("showWelcome", false);
        }

        if (
          this.isWelcomeContentLoaded() &&
          showWelcomeCookie == null &&
          this.props.isLegacyUser == false &&
          this.props.isRegistrationComplete &&
          showPreferenceModal == "false"
        ) {
          this.setState({ ZeroStateModal: true });
          cookies.set("showWelcome", false);
        }

        return (
          <Fragment>
            <div className={`${commonStyle["stickyWrap"]}`}>
              <WindowResize />
              <Header onZeroStateClick={this.onZeroStateClick} shouldShowWaitList = {this.shouldShowWaitList()}/>
              <StateModal
                isVisible={this.state.ZeroStateModal}
                onHide={this.onHideZeroStateModal}
              />

              <JamaicaNameDOBModal
                isVisible={this.state.showNameAndDOBModal}
                // onHide={this.onHideNameandDOBModal}
                agentProfile={this.props.agentProfile}
                jamaicaFixDate={this.props.jamaicaFixDate}

              />

              <ParishUpdateModal
                isVisible={this.state.parishUpdateModal}
                onHide={this.onHideParishUpdateModalModal}
                agentProfile={this.props.agentProfile}
              />

              <JamaicaConsentModal
                isModalVisible={this.state.jmConsentModal}
                onSubmitSave={this.onHidejmConsentModal}
                onHide={this.onHidejmConsentModal}
                onViewSignAgreementClick={this.showAdditionalFormModal}
                agreementSigning={agreementSigning ? agreementSigning : null}
              />

              <AdditionalFormsModal
                onHideModal={this.onHideAdditionalFormsModal}
                agreementSigning={agreementSigning ? agreementSigning : null}
                onConfirmSignAgreementClick={this.onConfirmSignAgreementClick}
                isModalVisible={this.state.AdditionalFormsModal && (agreementSigning.data != null)}
                closeButton={false}
                keyboard={false}
                backdrop="static"
                showDecline={true}
                onDecline={this.showDeclineModal}
              />

              <DeclineJamaicaConsentModal
                isModalVisible={this.state.consentDeclineModal}
                onSubmitSave={this.props.declineJmConsent}
                onHide={this.hideDeclineModal}
              />
              {showPreferenceModal == null && (
                <PreferenceModal
                  isOpen={this.state.isPreferenceModalOpen}
                  onHide={this.onHidePreferenceModal}
                />
              )}

              <div
                className={classNames({
                  container: this.props.width >= boostrapBreakpoints.md,
                  "container-fluid": this.props.width < boostrapBreakpoints.md,
                  appContainer: true,
                  wrapSticker: true,
                })}
              >
                <OutstandingTaskAlert
                  showCompletedAgentTypeAlert={showCompletedAgentTypeAlert}
                  onDismissAgentTypeSuccessAlert={
                    this.onDismissAgentTypeSuccessAlert
                  }
                  isLegacyUser={isLegacyUser}
                  hasPendingTasks={false /*hasPendingTasks*/}
                />
                <Comp />
              </div>
              {/* <br /> */}
              <Footer
                width={this.props.width}
                footerConfig={this.props.screenConfig.footer} />
            </div>
          </Fragment>
        );
      }
    };

  return withAppInsights(
    withRouter(connect(mapStateToProps, mapDispatchToProps)(Wrapper()))
  );
};

function mapStateToProps(state) {
  const hasPendingTasks = agentProfileSelector.hasPendingTasks(state);
  const agreementsToSign = agreementTemplatesSelector.getData(state);
  const agreementSigning = agreementTemplatesSelector.getSigning(state);
  const screenConfig = state.app.countryConfigurations.config;
  const opportunities = opportunityBoardSelector.opportunitiesAsArray(state);
  const inProgress = opportunityBoardSelector.inProgress(state);
  const getScreeningAssessmentRequired = agentProfileSelector.isScreeningAssessmentRequired(state);
  const myPrograms = enrolledProgramsSelector.getMyPrograms(state);
  const enrolledPrograms = enrolledProgramsSelector.getData(state);
  const isOpportunitiesFetching = opportunitiesSelector.isFetching(state);
  const isEnrolledProgramsFetching = enrolledProgramsSelector.isFetching(state);
  return {
    screenConfig,
    agentProfile: state.agentProfile,
    width: state.window.width,
    zeroStateContent: welcomeContentSelector.getWelcomeContent(state),
    isWelcomeContentFetching: welcomeContentSelector.isFetching(state),
    isLegacyUser: isLegacyUser(state),
    isRegistrationComplete: isRegistrationComplete(state),
    showCompletedAgentTypeAlert: showCompletedAgentTypeAlert(state),
    hasPendingTasks,
    jamaicaFixDate: globalParametersSelector.getGlobalParameterByString(
      state,
      GlobalParameterTypes.JAMAICA_FIX_DATE),
    registrationProfile: state.registration.profile,
    agreementSigning,
    agreementsToSign,
    opportunities,
    inProgress,
    getScreeningAssessmentRequired,
    myPrograms,
    enrolledPrograms,
    isEnrolledProgramsFetching,
    isOpportunitiesFetching

  };
}

const mapDispatchToProps = {
  ensureIsAuthenticatedWithAgentProfile,
  fetchWelcomeContent,
  setShowAgentTypeComplete,
  getParishes,
  checkifJMConsentSigned,
  RetrieveAgrrementTemplateForJM,
  SaveConsentAgreement,
  declineJmConsent,
  logoutRedirect
};

export default MainLayoutFullNavAuthenticated;
