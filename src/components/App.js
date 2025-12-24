import React, { Component } from "react";
import { connect } from "react-redux";
import LoadingComponent from "spotify-shared-web/components/common/LoadingComponent";
import Cookies from "universal-cookie";
import qs from "qs";
import { Redirect } from "react-router-dom";
import { AuthConsumer } from "../providers/authProvider";
import AuthService from "../services/authService";
import PortalRedirect from "./pickClient/PortalRedirect";
import { REACT_APP_PORTAL_BASE_URL } from "../config";
import { AdmissionStep, AgentPath, errorMessages } from "../constants";
import { ADMISSION_STEP_ROUTES } from "../config";
import { registerRedirect } from "../actions/registrationActions";
import { initializeConfigurations } from "../actions/appActions"
import { joinBusiness, selectBusinessPath } from "../actions/agentTypeActions";
import moment from "moment";
import "moment-timezone";
import {
  getAgentProfile,
  getCountries,
  getStates,
  getProvinces,
  getReferralUser,
  updateReferralUserData,
} from "../actions/registrationActions";
import { getUserCountry } from "spotify-shared/actions/country";
import { setToken, getToken, loginRedirect } from "../actions/loginActions";

import { getAdmissionStepInstances } from "../actions/admissionStepActions";

import withAppInsights from "../appInsights";
import ErrorMessage from "spotify-shared-web/components/common/ErrorMessage";
import { AgentStatus } from "spotify-shared/constants";
import Button from "spotify-shared-web/components/common/Button";

require("dotenv").config();

class App extends Component {
  static contextType = AuthConsumer;

  constructor(props) {
    super(props);
    this.authService = new AuthService();
    this.registerRedirect = false;
  }

  state = {
    isTokenUpdated: false,
    hasLoadedConfiguration: false,
    displayWelcome: true,
  };

  componentDidUpdate() {
    const { registration, admissionSteps, agentProfile, referUser } =
      this.props;

    const queryString = this.props.location.search.substring(1);

    const queryObj = qs.parse(queryString, { ignoreQueryPrefix: true });

    const countryCode = registration
      ? registration.profile
        ? registration.profile.formInfo
          ? registration.profile.formInfo.countryObj
            ? registration.profile.formInfo.countryObj.code
            : undefined
          : undefined
        : undefined
      : undefined;
    
    if (
      this.registerRedirect &&
      admissionSteps.steps.length == 0 &&
      countryCode
    ) {
      // this.props.loginRedirect();
      this.props.registerRedirect(
        queryObj.utm_campaign,
        countryCode,
        queryObj.referral
      );
      this.registerRedirect = false;
    }
    if (referUser.spBusinessID != null && admissionSteps.steps.length != 0) {
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
      if (countryCode == "US") {
        const childStep = admissionSteps.steps
          .find((step) => step.uniqueId == AdmissionStep.AGENT_TYPE)
          .childSteps.find(
            (childStep) => childStep.uniqueId == AdmissionStep.SOLE_PROPRIETOR
          );
        if (childStep.available || childStep.inProgress) {
          const { agentId } = agentProfile;
          this.props.selectBusinessPath(agentId, AgentPath.JOIN_BUSINESS);
        }
      }
      if (countryCode == "UK" || countryCode == "CA") {
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

    if (this.props.agentProfile !== null) {
      
      window.agentId = this.props.agentProfile.agentId;
      window.countryCode = this.props.agentProfile.countryCode;

    }

    if (
      agentProfile &&
      agentProfile.contractorTypeCompleted === false &&
      agentProfile.registrationType == "506920000"
    ) {
      window.location.href = `${REACT_APP_PORTAL_BASE_URL}home`;
    }
  }

  async componentDidMount() {


    const cookies = new Cookies();
    this.authService.getUser().then(async (user) => {
      const queryString = this.props.location.search;
      const referralURL = cookies.get("referral_url")
        ? cookies.get("referral_url")
        : document.referrer;

      const queryObj = qs.parse(queryString, { ignoreQueryPrefix: true });

      cookies.set("referral_url", referralURL);

      if (Object.keys(queryObj).length !== 0)
        cookies.set("marketing_params", queryObj);

      if (queryObj.utm_campaign) {
        cookies.set("campaign_code", queryObj.utm_campaign);
      }

      if (user) {
        this.state.displayWelcome = false;
        this.props.setToken(user.access_token);
        await this.props.getAgentProfile(user.profile.sub);
        this.props.getReferralUser(user.profile.sub);
        // this.props.getCountries();
        this.props.getUserCountry({ considerIp: true });
        //this.props.updateReferralUserData(this.props.referUser);
        // this.props.getStates();
        // this.props.getProvinces();
      } else {
        this.registerRedirect = true;
        this.props.getUserCountry({ considerIp: true });
        this.state.isLoading = false;
      }
      // if (
      //   this.props.referUser.spBusinessID != null &&
      //   admissionSteps.steps.length != 0
      // ) {
      //   const childStep = admissionSteps.steps
      //     .find((step) => step.uniqueId == AdmissionStep.AGENT_TYPE)
      //     .childSteps.find(
      //       (childStep) => childStep.uniqueId == AdmissionStep.SOLE_PROPRIETOR
      //     );
      //   if (childStep.available || childStep.inProgress) {
      //     const { agentId } = agentProfile;
      //     this.props.selectBusinessPath(agentId, AgentPath.JOIN_BUSINESS);
      //   }
      // }
    });
  }

  initializeCountryConfigurations = async () => {
    this.props.agentProfile.countryCode && await import('../resources/config/' + this.props.agentProfile.countryCode + '-config.json')
      .then(configurations => {
        this.props.initializeConfigurations(this.props.agentProfile.countryCode, configurations)
      });
    this.setState({ hasLoadedConfiguration: true })
  }

  renderRegistrationStep() {
    const { agentId } = this.props.agentProfile;
    const { admissionSteps, agentType, agentProfile } = this.props;

    //Check if user is active and Mobile responsive flow
    if( agentProfile && agentProfile.status==AgentStatus.Active){
      return <Redirect to={"/opportunities"} />;
    }
    
    if( agentProfile && agentProfile.status!=AgentStatus.Active && admissionSteps.error!=null){
      return <div className="custom-error">
        <h2>{errorMessages.ASIerror}</h2> 
          <Button
          label="Retry"
          size="medium"
          isSubmitting={!admissionSteps.isFetchComplete}
          onClick={()=>this.props.getAdmissionStepInstances(agentProfile.userId)}
          />
      </div>
    }

    if (admissionSteps.steps.length && agentId ) {
      this.state.isLoading = false;

      const currentStep = admissionSteps.steps.find((step) => {
        return (
          step.completed === false &&
          (step.available === true || step.inProgress === true)
        );
      });

      const redirectPath = localStorage.getItem("redirect_path");

      if (redirectPath && redirectPath.includes("lmsauthentication")) {
        localStorage.removeItem("redirect_path");
        return <Redirect to={redirectPath || "/opportunities"} />;
      }

      if (redirectPath && redirectPath.includes("opportunity")) {
        localStorage.removeItem("redirect_path");
        return <Redirect to={redirectPath} />;
      }

      if (!currentStep) {
        return <Redirect to={redirectPath || "/opportunities"} />;
      }

      if (
        agentProfile &&
        agentProfile.contractorTypeCompleted === true &&
        agentProfile.registrationType == "506920000"
      ) {
        return <Redirect to={"/opportunities"} />;
      }

      if (
        currentStep.uniqueId === AdmissionStep.Opportunity_Board &&
        localStorage.getItem("FromContracterType")
      ) {
        localStorage.removeItem("FromContracterType");
        return <Redirect to={ADMISSION_STEP_ROUTES.contractorType} />;
      }

      switch (currentStep.uniqueId) {
        case AdmissionStep.Opportunity_Board:
          return <Redirect to={"/opportunities"} />;
        case AdmissionStep.VALIDATE_ACCOUNT:
          return <Redirect to={ADMISSION_STEP_ROUTES.validateAccount} />;
        case AdmissionStep.AGENT_TYPE:
          return <Redirect to={ADMISSION_STEP_ROUTES.contractorType} />;
        case AdmissionStep.PICK_CLIENT:
          return <Redirect to={"/opportunities"} />;
        //return (
        //    <PortalRedirect
        //        agentProfile={this.props.agentProfile}
        //    />
        //);
        default:
          return <Redirect to={"/error"} />;
      }
    } else {
      return <LoadingComponent />;
    }
  }

  render() {
    const { registrationType, agentId } = this.props.agentProfile;

    agentId !== null && !this.state.hasLoadedConfiguration && this.initializeCountryConfigurations()



    return <div>{
      true ?
        this.renderRegistrationStep(registrationType)
        :
        <h1>Something went wrong</h1>
    }
    </div>;
  }
}

const mapStateToProps = ({
  agentProfile,
  agentType,
  auth,
  registration,
  admissionSteps,
  referUser,
  app
}) => {
  return {
    agentProfile,
    agentType,
    auth,
    registration,
    admissionSteps,
    referUser,
    app
  };
};

export default withAppInsights(
  connect(mapStateToProps, {
    getAdmissionStepInstances,
    getAgentProfile,
    getUserCountry,
    getCountries,
    getStates,
    getProvinces,
    setToken,
    getToken,
    registerRedirect,
    loginRedirect,
    getReferralUser,
    selectBusinessPath,
    joinBusiness,
    updateReferralUserData,
    initializeConfigurations
  })(App)
);
