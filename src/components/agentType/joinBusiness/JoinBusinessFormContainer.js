import React, { Component } from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import styles from "./JoinBusinessFormContainer.module.scss";
import { Translate } from "spotify-shared-web/localize";
import JoinBusinessForm from "./JoinBusinessForm";
import joinBusinessSchema from "./joinBusinessSchema";
import Button from "spotify-shared-web/components/common/Button";
import {
  joinBusiness,
  getBusinessByFein,
  getBusinessById,
  getJoinBusinessStatus,
} from "../../../actions/agentTypeActions";
import FindCallCenter from "./FindCallCenter";
import commonStyle from "../../../../src/components/shared/CommonStyle.module.scss";
import { Fragment } from "react";
import classNames from "classnames";
import { COUNTRY_IDS } from "../../../constants";
import { getReferralUser } from "../../../actions/registrationActions";
import SCREEN_CONFIG from "../../../screensConfig";

const CURRENT_SCREEN = SCREEN_CONFIG.registerAsServicePartner;

class JoinBusinessFormContainer extends Component {
  handleSubmit = (values) => {
    const { businessId } = this.props.agentType.joinBusiness.businessSelected;

    const { agentId } = this.props.agentProfile;

    this.props.joinBusiness({ businessId, agentId });
  };

  componentDidMount = () => {
    //this.props.getReferralUser(this.props.agentProfile.userId);
  };

  render() {
    const { handleModalOpen, agentProfile, referUser } = this.props;
    const { joinBusiness } = this.props.agentType;
    const isUKUser = agentProfile.countryId === COUNTRY_IDS.UK;
    const showForm =
      referUser.spBusinessID !== undefined &&
      referUser.isLoading === false &&
      referUser.spBusinessID === null;
    return (
      <Translate>
        {({ translate }) => (
          <>
            {showForm && (
              <div className={styles["form-container"]}>
                <h3
                  className={` ${commonStyle["semiBoldWeight"]} ${commonStyle["blackColor"]} ${commonStyle["subHeading1"]} ${commonStyle["withinComponentMargin"]} ${commonStyle["componentsMargin"]}`}
                >
                  {translate(`${CURRENT_SCREEN}.searchIitle`)}
                </h3>
                <Formik
                  initialValues={joinBusiness.formInfo}
                  validationSchema={joinBusinessSchema}
                  validateOnBlur={false}
                  onSubmit={this.handleSubmit}
                  render={(formikProps) => (
                    <JoinBusinessForm
                      joinBusinessScreenConfig={this.props.joinBusinessScreenConfig}
                      joinBusiness={joinBusiness}
                      handleRestartClick={this.props.handleRestartClick}
                      agentProfile={this.props.agentProfile}
                      getBusinessByFein={this.props.getBusinessByFein}
                      getBusinessById={this.props.getBusinessById}
                      handleModalOpen={this.props.handleModalOpen}
                      {...formikProps}
                    />
                  )}
                />
              </div>
            )}
          </>
        )}
      </Translate>
    );
  }
}

function mapStateToProps({ agentType, agentProfile, registration, referUser, app }) {
  return { agentType, agentProfile, profile: registration.profile, referUser, joinBusinessScreenConfig: app.countryConfigurations.config.roleRegistrationScreen.servicePartnerScreen };
}

export default connect(mapStateToProps, {
  joinBusiness,
  getBusinessByFein,
  getBusinessById,
  getJoinBusinessStatus,
  getReferralUser,
})(JoinBusinessFormContainer);
