import React, { Component } from "react";
import styles from "./AgentTypeList.module.scss";
import { Translate } from "spotify-shared-web/localize";
import AgentTypeItem from "./AgentTypeItem";
import { AdmissionStep, COUNTRY_IDS } from "../../constants";
import JoinBusinessIcon from "../../assets/images/agentType/working-for-call-center.svg";
import { agentImageStringMapping } from "./agentData";

class AgentTypeList extends Component {
  render() {
    const {
      majorType,
      agentTypeSteps,
      isTermsChecked,
      agentId,
      handleBackLink,
      agentProfile,
    } = this.props;
    const filteredAgentTypes = agentTypeSteps.filter((type) =>
      majorType.childTypes.includes(type.uniqueId)
    ).reverse();

    const registerBusiness =
      majorType.childTypes &&
      majorType.childTypes.includes(AdmissionStep.NEW_CALL_CENTER);
    const isUKUser = agentProfile.countryId === COUNTRY_IDS.UK;
    const isUSUser = agentProfile.countryId === COUNTRY_IDS.US;
    const headerText = registerBusiness
      ? isUSUser
        ? "BE YOUR OWN BOSS"
        : "BE YOUR OWN BOSS"
      : isUKUser
      ? "WORK FOR SOMEONE ELSE"
      : "WORK FOR SOMEONE ELSE";

    return (
      <Translate>
        {({ translate }) => (
          <>
            <br />
            <br />
            <h1>{translate(headerText)}</h1>
            {registerBusiness && isUSUser && (
              <p className={`${styles["new-container"]}`}>
                {translate("beYourOwnBossCopy")}
              </p>
            )}
            {registerBusiness && agentTypeSteps && agentTypeSteps.length !== 2 && (
              <>
                <h3 className={styles["text-bold"]}>
                  {translate("There are two ways to register a business")}
                </h3>
              </>
            )}
            <div className={`row`}>
              {filteredAgentTypes.map((agentTypeStep) => (
                <AgentTypeItem
                  agentTypeStep={agentTypeStep}
                  agentId={agentId}
                  agentImageStringMapping={agentImageStringMapping}
                  isTermsChecked={isTermsChecked}
                  key={agentTypeStep.admissionStepId}
                />
              ))}

              <div className={` col-md-6 col-sm-12 pt-sm-3 pt-lg-0`}>
                <div
                  className={`h-100   text-center ${styles["Change-Your-Contactor-Type-Card"]}`}
                >
                  <div className={`text-center`}>
                    <img src={JoinBusinessIcon} alt="" />
                  </div>
                  <div>
                    <p className={`${styles["card-text"]}`}>{majorType.backText}</p>
                  </div>
                  <div className={styles["back-link"]}>
                    <button
                      id={"btnAgentTypeChangeContractorType_" + majorType.id}
                      type="button"
                      onClick={handleBackLink}
                    >
                      {translate("Change Your Contactor Type")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Translate>
    );
  }
}

export default AgentTypeList;
