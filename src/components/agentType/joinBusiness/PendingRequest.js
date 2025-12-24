import React, { Component } from "react";
import styles from "./PendingRequest.module.scss";
import { connect } from "react-redux";
import Button from "spotify-shared-web/components/common/Button";
import { getJoinBusinessStatus } from "../../../actions/agentTypeActions";
import { JoinCallCenter, COUNTRY_IDS } from "../../../constants";
import commonStyle from "../../../../src/components/shared/CommonStyle.module.scss";
import SCREEN_CONFIG from "../../../screensConfig";
import { Translate } from "spotify-shared-web/localize";

const CURRENT_SCREEN = SCREEN_CONFIG.registerAsServicePartner;

class PendingRequest extends Component {
  render() {
    const {
      onRequestRestart,
      statusId,
      isSubmitting,
      handleCheckStatusClick,
      changeContractorTypeBtnId,
    } = this.props;

    const { agentType, agentProfile, referUser } = this.props;
    const refVerify = referUser.spBusinessID ? true : false;
    const isUSUser = agentProfile.countryId === COUNTRY_IDS.US;
    const isUKUser = agentProfile.countryId === COUNTRY_IDS.UK;

    return (
      <Translate>
        {({ translate }) => (
          <>
            {isUSUser && (
              <div
                className={`${styles["confirm-modal"]}  ${commonStyle["widthChange"]}`}
              >
                <div className={`${styles["business-change"]}`}>
                  {/* {alert(isUSUser)}; */}
                  {isUSUser ? (
                    statusId === JoinCallCenter.PENDING_ACCEPTANCE ? (
                      <h2
                        className={`${commonStyle["subHeading1"]} 
                        ${commonStyle["blackColor"]} ${commonStyle["semiBoldWeight"]} 
                        ${commonStyle["textNormalCase"]}`}
                      >
                        {translate(`${CURRENT_SCREEN}.requestPending.title`)}
                      </h2>
                    ) : (
                      <h2
                        className={`${commonStyle["subHeading1"]} 
                        ${commonStyle["blackColor"]} ${commonStyle["semiBoldWeight"]} 
                        ${commonStyle["textNormalCase"]}`}
                      >
                        {translate(`${CURRENT_SCREEN}.requestPending.pendingFinalization`)}
                      </h2>
                    )
                  ) : statusId === JoinCallCenter.PENDING_ACCEPTANCE ? (
                    <h2
                      className={`${commonStyle["subHeading3"]} 
                        ${commonStyle["activeColor"]} ${commonStyle["regularWeight"]} 
                        ${commonStyle["textNormalCase"]}`}
                    >
                      {translate(`${CURRENT_SCREEN}.requestPending.title`)}
                    </h2>
                  ) : (
                    <h2
                      className={`${commonStyle["subHeading3"]} 
                        ${commonStyle["activeColor"]} ${commonStyle["regularWeight"]} 
                        ${commonStyle["textNormalCase"]}`}
                    >
                      {translate(`${CURRENT_SCREEN}.requestPending.pendingFinalization`)}
                    </h2>
                  )}

                  {/* <p className={styles['business-change__header']}>
                        <b>Service Partner Email</b> : {agentType.joinBusiness.businessEmail ?agentType.joinBusiness.businessEmail: "-" }
                    </p>
                    <p className={styles['business-change__header']}>
                        <b>Service Partner Phone Number</b> : {agentType.joinBusiness.businessPhone}
                    </p> */}

                  <p
                    className={`${styles["business-change__header"]} ${commonStyle["subHeading2"]} ${commonStyle["componentsMargin"]} ${commonStyle["lightFont"]}`}
                  >
                    <span className={`${commonStyle["semiBoldWeight"]}`}>
                      {translate(`${CURRENT_SCREEN}.requestPending.servicePartnerName`)}
                    </span>{" "}
                    : {agentType.joinBusiness.businessRequestedName}
                  </p>

                  <p
                    className={`${commonStyle["paragraph3"]} ${commonStyle["lightFont"]} ${styles["pendingMargin"]}`}
                  >
                    {translate(`${CURRENT_SCREEN}.requestPending.description`)}
                  </p>
                </div>

                {/*<div className={styles['confirm-modal__button-wrapper']}>
                    <a className="link pointer" id={changeContractorTypeBtnId}
                        onClick={onRequestRestart}
                    >
                        Change Your Contractor Type
                            </a>
                    <Button
                        size="medium"
                        type='button'
                        variant='primary'
                        isSubmitting={isSubmitting}
                        onClick={handleCheckStatusClick}
                    >
                        Check Status
                            </Button>
                </div>*/}
              </div>
            )}
            {!isUSUser && statusId === JoinCallCenter.PENDING_ACCEPTANCE && (
              <div
                className={`${styles["confirm-modal"]}  ${commonStyle["widthChange"]}`}
              >
                <div className={`${styles["business-change"]}`}>
                  <h2
                    className={`${commonStyle["subHeading3"]} 
                        ${commonStyle["activeColor"]} ${commonStyle["regularWeight"]} 
                        ${commonStyle["textNormalCase"]}`}
                  >
                    {translate(`${CURRENT_SCREEN}.requestPending.title`)}
                  </h2>
                  <p
                    className={`${styles["business-change__header"]} ${commonStyle["subHeading2"]} ${commonStyle["componentsMargin"]} ${commonStyle["lightFont"]}`}
                  >
                    <span className={`${commonStyle["semiBoldWeight"]}`}>
                      {translate(`${CURRENT_SCREEN}.requestPending.servicePartnerName`)}
                    </span>{" "}
                    : {agentType.joinBusiness.businessRequestedName}
                  </p>
                  <p
                    className={`${commonStyle["paragraph3"]} ${commonStyle["lightFont"]} ${styles["pendingMargin"]}`}
                  >
                    {translate(`${CURRENT_SCREEN}.requestPending.description`)}
                  </p>
                </div>
              </div>
            )}
            {!isUSUser && statusId !== JoinCallCenter.PENDING_ACCEPTANCE && (
              <div
                className={`${styles["confirm-modal"]}  ${commonStyle["widthChange"]} ${styles["pendingFinalization"]}`}
              >
                <div className={`${styles["business-change"]}`}>
                  <h2
                    className={`${commonStyle["subHeading3"]} 
                        ${commonStyle["activeColor"]} ${commonStyle["regularWeight"]} 
                        ${commonStyle["textNormalCase"]}`}
                  >
                    {translate(`${CURRENT_SCREEN}.requestPending.pendingFinalization`)}
                  </h2>
                  <p
                    className={`${styles["business-change__header"]} ${commonStyle["subHeading2"]} ${commonStyle["componentsMargin"]} ${commonStyle["lightFont"]}`}
                  >
                    <span className={`${commonStyle["semiBoldWeight"]}`}>
                      {translate(`${CURRENT_SCREEN}.requestPending.servicePartnerName`)}
                    </span>{" "}
                    : {agentType.joinBusiness.businessRequestedName}
                  </p>
                  <p
                    className={`${commonStyle["paragraph3"]} ${commonStyle["lightFont"]} ${styles["pendingMargin"]}`}
                  >
                    {translate(`${CURRENT_SCREEN}.requestPending.description`)}
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </Translate>
    );
  }
}

function mapStateToProps({
  agentType,
  agentProfile,
  admissionSteps,
  referUser,
}) {
  // const { agentProfile } = state;
  return { agentType, agentProfile, admissionSteps, referUser };
}

export default connect(mapStateToProps, {
  getJoinBusinessStatus,
})(PendingRequest);
