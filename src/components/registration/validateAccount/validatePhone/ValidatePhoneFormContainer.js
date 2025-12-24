import React, { Component } from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import styles from "./ValidatePhoneFormContainer.module.scss";
import { Translate } from "spotify-shared-web/localize";
import ValidatePhoneForm from "./ValidatePhoneForm";
import validatePhoneSchema from "./validatePhoneSchema";

import formHelpers from "spotify-shared/helpers/formHelpers";
import uiHelpers from "../../../../helpers/uiHelpers";

import { validateAccountApi } from "../../../../sagas/api";

import { COUNTRY_IDS, agentStatusId } from "../../../../constants";

import {
  submitValidatePhone,
  resendPhoneValidationCode,
  editMobilePhone,
} from "../../../../actions/validateAccountActions";
import { updateReferralUserData } from "../../../../actions/registrationActions";
import commonStyle from "../../../shared/CommonStyle.module.scss";
import SCREEN_CONFIG from "../../../../screensConfig";

const MOBILE_VALIDATION_CODE_TYPE = 506920001;
const CURRENT_SCREEN = SCREEN_CONFIG.contactValidation;

class ValidatePhoneFormContainer extends Component {
  state = {
    isCheckboxChecked: false,
  };

  handleCheckboxChange = () => {
    this.setState({
      isCheckboxChecked: !this.state.isCheckboxChecked,
    });
  };

  handleResendCode = () => {
    this.props.resendPhoneValidationCode({
      validationCodeType: MOBILE_VALIDATION_CODE_TYPE,
      userId: this.props.agentProfile.userId,
    });
  };

  handleSubmit = (values) => {
    const cookies = new Cookies();
    const formData = formHelpers.constructFormData(values);
    const { agentProfile, stepName, steps, referUser } = this.props;
    const { isCheckboxChecked } = this.state;
    const referralURL = cookies.get("referral_url");

    this.props.submitValidatePhone(
      Object.assign(formData, {
        validationCodeType: MOBILE_VALIDATION_CODE_TYPE,
        agentId: agentProfile.agentId,
        stepName: stepName,
        steps: steps,
      })
    );

    validateAccountApi.submitPhoneUsageConsent(
      agentProfile.agentId,
      isCheckboxChecked,
      referralURL
    );
    // if (referUser.spBusinessID != null) {
    //   this.props.referUser.agentStatusId = agentStatusId.ValidatePhone;
    //   const { userId } = this.props.agentProfile;
    //   const userData = {};
    //   userData.referUser = referUser;
    //   userData.userId = userId;
    //   this.props.updateReferralUserData(userData);
    // }
  };

  render() {
    const { validateAccount, referUser } = this.props;
    const { isCheckboxChecked } = this.state;
    const { mobilePhone } = this.props.agentProfile


    const { pattern, format } = this.props.app.countryConfigurations.config.phonenumberValidationScreen.phoneNumberFormat.validation
    return (
      <Translate>
        {({ translate }) => (
          <>
            <div className={`${styles["form-container"]} `}>
              {/* <p className={styles['form-container__copy']}>
                        {translate("validationPhoneCodeConfirmMessage")}
                    </p> */}

              <div
                className={`row p-md-0 ${styles["form-container__phone"]} ${commonStyle["withinComponentMargin2"]}`}
              >
                <p
                  className={`col-lg-7 p-0 mt-0 mb-0 ${styles["singleCap"]} ${commonStyle["mediumFont"]} ${commonStyle["paragraph_3"]}`}
                >
                  {translate(`${CURRENT_SCREEN}.phoneNumber.codeSentToPhoneMessage`)}:{" "}
                  {/* {this.props.agentProfile.countryId === COUNTRY_IDS.UK
                    ? uiHelpers.formatUKMobileNumber(
                        this.props.agentProfile.mobilePhone
                      )                      
                    :this.props.agentProfile.countryId===COUNTRY_IDS.IN ? uiHelpers.formatInMobileNumber(this.props.agentProfile.mobilePhone): uiHelpers.formatMobileNumber(
                        this.props.agentProfile.mobilePhone
                      )} */}

                  {uiHelpers.formatMobileNumber(mobilePhone, pattern, format)}
                </p>

                <div
                  className={`col-sm-12 col-md-12 col-xl-4 col-xxl-3 col-lg-5 p-0 btnstyle d-flex ${commonStyle["reverseDirection"]} ${commonStyle["paragraph_3"]}`}
                  style={{ justifyContent: "space-between" }}
                >
                  <button
                    className={` ${styles["resend-button"]}`}
                    type="button"
                    onClick={this.handleResendCode}
                  >
                    {translate(`${CURRENT_SCREEN}.phoneNumber.resendCodeButton`)}
                  </button>
                  <button
                    className={` ${styles["edit-button"]}`}
                    onClick={this.props.editMobilePhone}
                  >
                    {translate(`${CURRENT_SCREEN}.phoneNumber.editNumberButton`)}
                  </button>
                </div>
              </div>

              <Formik
                initialValues={validateAccount.validatePhone.formInfo}
                validationSchema={validatePhoneSchema}
                validateOnBlur={false}
                onSubmit={this.handleSubmit}
                render={(formikProps) => (
                  <ValidatePhoneForm
                    validateAccount={validateAccount}
                    onHandleResendCode={this.handleResendCode}
                    isCheckboxChecked={isCheckboxChecked}
                    handleCheckboxChange={this.handleCheckboxChange}
                    {...formikProps}
                  />
                )}
              />
            </div>
          </>
        )}
      </Translate>
    );
  }
}

const mapStateToProps = ({ validateAccount, referUser, app }) => {
  return {
    validateAccount,
    referUser,
    app
  };
};

export default connect(mapStateToProps, {
  submitValidatePhone,
  resendPhoneValidationCode,
  editMobilePhone,
  updateReferralUserData,
})(ValidatePhoneFormContainer);
