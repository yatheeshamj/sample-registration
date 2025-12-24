import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./AgentType.module.scss";
import classNames from "classnames";
import MainLayout from "../layouts/MainLayout";
import LoadingComponent from "spotify-shared-web/components/common/LoadingComponent";
import AgentTypeList from "./AgentTypeList";
import AgentTypeHelp from "./AgentTypeHelp";
import {ADMISSION_STEP_ROUTES} from "../../config"
import RegisterIndividualIcon from "../../assets/images/agentType/sole-proprietor.svg";
import JoinBusinessIcon from "../../assets/images/agentType/working-for-call-center.svg";
import { Translate } from "spotify-shared-web/localize";
import { logoutRedirect } from "../../actions/loginActions";
import { getMedia } from "../../actions/agentTypeActions";
import { AdmissionStep, COUNTRY_IDS } from "../../constants";
import { Fragment } from "react";
import Button from "spotify-shared-web/components/common/Button";
import { history } from "../../store";


class AgentType extends Component {
  state = {
    isTermsChecked: false,
    isAgeChecked: false,
    majorType: undefined,
  };

  handleTermsCheckboxChange = () => {
    this.setState({
      isTermsChecked: !this.state.isTermsChecked,
    });
  };

  handleAgeCheckboxChange = () => {
    this.setState({
      isAgeChecked: !this.state.isAgeChecked,
    });
  };

  handleBackLink = () =>
    this.setState({
      majorType: undefined,
    });

  componentDidMount() {
    const { agentProfile } = this.props;
    this.props.getMedia(agentProfile.countryId);
    const isCheckboxChecked = localStorage.getItem("isCheckboxChecked");
    isCheckboxChecked &&
      this.setState({
        isTermsChecked: true,
        isAgeChecked: true,
      });
    localStorage.removeItem("isCheckboxChecked");
  }

  renderAgentMajorTypes = () => {
    const { isAgeChecked, isTermsChecked } = this.state;
    const { agentProfile } = this.props;
    const isDisabled = !isTermsChecked || !isAgeChecked;
    const isCAUser = agentProfile.countryId === COUNTRY_IDS.CA;
    const isUKUser = agentProfile.countryId === COUNTRY_IDS.UK;
    const isUSUser = agentProfile.countryId === COUNTRY_IDS.US;

    const agentMajorTypes = [
      
      {
        childTypes: [AdmissionStep.JOIN_BUSINESS],
        greyText: "I want to",
        blueText: "WORK FOR SOMEONE ELSE",
        backText:
          "Want to explore alternatives?",
        icon: JoinBusinessIcon,
        id: "btnJoinBusiness",
      },
      {
        childTypes: [
          AdmissionStep.SOLE_PROPRIETOR,
          AdmissionStep.NEW_CALL_CENTER,
        ],
        greyText: "I want to",
        blueText: "BE MY OWN BOSS",
        backText: isUSUser
          ? "Want to explore alternatives? "
          : "Want to explore alternatives?",
        icon: RegisterIndividualIcon,
        id: "btnBeOwnBoss",
      }
    ];

    return (
      <Translate>
        {({ translate }) => (
          <>
            <div className={`h-100 row `}>
              {agentMajorTypes.map((type, index) => (
                <div key={index} className={`col-lg-6 col-md-6 col-sm-12 pt-sm-3 pt-lg-0 p-md-0`}>
                  <div className={`h-100 row`}>
                    <div className={`col-12 p-lg-3`}>
                      <div className={`${styles["AgentMajorType-card"]} `}>
                        <div className={`text-center`}>
                          <img
                            // className={`img-fluid`}
                            src={type.icon}
                            alt=""
                          />
                        </div>
                        <div className="">
                          <h4 className={`${styles["text-bold1"]}`}>{translate(type.greyText)}</h4>
                          <Button
                            color="primary"
                            size="block"
                            onClick={() => {
                              if (!isDisabled){
                               history.push({
                                 path:'/contractortype',
                                 search:'?type='+`${translate(type.blueText)}`
                               })
                                this.setState({ majorType: type });
                                
                              }
                                
                            }}
                            disabled={isDisabled}
                            id={type.id}
                          >
                            {translate(type.blueText)}
                          </Button>
                         
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </Translate>
    );
  };

  render() {
    const {
      agentProfile,
      agentType,
      agentTypeSteps,
      logoutRedirect,
      admissionSteps,
    } = this.props;
    const { isAgeChecked, isTermsChecked } = this.state;
    const isCAUser = agentProfile.countryId === COUNTRY_IDS.CA;
    const isUKUser = agentProfile.countryId === COUNTRY_IDS.UK;

    return (
      <Translate>
        {({ translate }) => (
          <>
            <Fragment>
              {agentType.isSelectingPath || admissionSteps.isFetchInProgress ? (
                <LoadingComponent />
              ) : (
                <Fragment>
                  <div className="row">
                    <div className="col-xxl-6 col-xl-7 col-lg-9 col-md-10 offset-md-1 offset-lg-0 col-sm-12">
                      {agentType.redirectMessage && (
                        <div className={styles["server-error"]}>
                          {agentType.redirectMessage}
                        </div>
                      )}
                      {!this.state.majorType && (
                        <Fragment>
                          <br />
                          <h1>{translate("HOW WILL YOU USE THE PLATFORM?")}</h1>
                          {isUKUser &&<p>
                            
                              {translate(
                                "You can use the platform to run a home-based business or as an agent working for a Service Partner in the network."
                              )}
                          </p>}
                          {isCAUser && <p>
                            
                              {translate(
                                "You can use the platform to run a home-based business or as an agent working for a Service Partner in the network."
                              )}
                          </p>}
                          <br />
                          <h2 className={styles["text-bold"]}>
                            {translate("Please confirm the following…")}
                          </h2>
                          <div className={styles["tos-inputs-wrapper"]}>
                            <input
                              name="age"
                              type="checkbox"
                              className={styles["checkbox-input"]}
                              checked={isAgeChecked}
                              onChange={this.handleAgeCheckboxChange}
                            />
                            <p>{translate("I'm over 18.")}</p>
                          </div>
                          <div className={styles["tos-inputs-wrapper"]}>
                            <input
                              name="terms"
                              type="checkbox"
                              className={styles["checkbox-input"]}
                              checked={isTermsChecked}
                              onChange={this.handleTermsCheckboxChange}
                            />
                            <p>
                              {translate("contractortypeCheckbox")}
                            </p>
                          </div>
                          <br />
                          {/* <button onClick={this.props.history}>Next</button> */}
                          <h2 className={styles["text-bold"]}>
                            {agentProfile.countryId === COUNTRY_IDS.UK
                              ? translate("Now explore your options!")
                              : translate("Now make your choice!")}
                          </h2>
                        </Fragment>
                      )}
                    </div>
                  </div>

                  <div className="row col-skip">
                    <div
                      className={classNames({
                        "col-lg-6 col-md-12 ": !this.state.majorType,
                        "col-lg-12": this.state.majorType,
                      })}
                    >
                      {this.state.majorType ? (
                        <AgentTypeList
                          agentTypeSteps={agentTypeSteps}
                          agentProfile={agentProfile}
                          agentId={agentProfile.agentId}
                          isTermsChecked={isAgeChecked && isTermsChecked}
                          majorType={this.state.majorType}
                          handleBackLink={this.handleBackLink}
                        />
                      ) : (
                        this.renderAgentMajorTypes()
                      )}
                    </div>
                    <div className="col-lg-6 col-md-12 pt-sm-4 p-lg-3 pr-lg-0">
                      {!this.state.majorType && (
                        <AgentTypeHelp media={agentType.media} />
                      )}
                    </div>
                  </div>
                </Fragment>
              )}
            </Fragment>
          </>
        )}
      </Translate>
    );
  }
}
const mapStateToProps = ({
  agentProfile,
  agentType,
  auth,
  registration,
  admissionSteps,
}) => {
  return { agentProfile, agentType, auth, registration, admissionSteps };
};
export default connect(mapStateToProps, { logoutRedirect, getMedia })(
  AgentType
);
