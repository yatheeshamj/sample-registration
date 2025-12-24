import React, { Component } from "react";
import styles from "./PendingRequest.module.scss";
import styles2 from '../AgentType.module.scss';
import { connect } from "react-redux";
import Button from "spotify-shared-web/components/common/Button";
import { getJoinBusinessStatus } from "../../../actions/agentTypeActions";
import { JoinCallCenter, COUNTRY_IDS } from "../../../constants";
import commonStyle from "../../../../src/components/shared/CommonStyle.module.scss";
import SCREEN_CONFIG from "../../../screensConfig";
import { Translate } from "spotify-shared-web/localize";

const CURRENT_SCREEN = SCREEN_CONFIG.registerAsServicePartner;

class DeclinedRequest extends Component {
    render() {
        const {
            onRequestRestart,
            statusId,
            isSubmitting,
            handleCheckStatusClick,
            changeContractorTypeBtnId,
        } = this.props;

        const { agentType, agentProfile, referUser } = this.props;

        const isPHUser = agentProfile.countryId === COUNTRY_IDS.PH;
        console.log("statusid-->", statusId);
        return (
            <Translate>
                {({ translate }) => (
                    <>
                        <div
                            className={`${styles["confirm-modal"]}  ${commonStyle["widthChange"]} ${styles["pendingFinalization"]}`}
                        >

                            <div className={`${styles["business-change"]}`}>
                                <h2
                                    className={`${commonStyle["subHeading3"]} 
                                    ${commonStyle["activeColor"]} ${commonStyle["regularWeight"]} 
                                    ${commonStyle["textNormalCase"]}`}
                                >
                                    <div className={styles2['server-error']}>
                                        {translate(`${CURRENT_SCREEN}.requestDeclined.pendingFinalization`)}
                                    </div>
                                </h2>
                                {/* <p
                                    className={`${styles["business-change__header"]} ${commonStyle["subHeading2"]} ${commonStyle["componentsMargin"]} ${commonStyle["lightFont"]}`}
                                >
                                    <span className={`${commonStyle["semiBoldWeight"]}`}>
                                        {translate(`${CURRENT_SCREEN}.requestDeclined.servicePartnerName`)}
                                    </span>{" "}
                                    : {agentType.joinBusiness.businessRequestedName}
                                </p> */}
                                <p
                                    className={`${commonStyle["paragraph3"]} ${commonStyle["lightFont"]} ${styles["pendingMargin"]}`}
                                >
                                    {translate(`${CURRENT_SCREEN}.requestDeclined.description`)}
                                </p>
                            </div>
                        </div>
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
})(DeclinedRequest);
