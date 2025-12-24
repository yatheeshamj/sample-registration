import "./index.scss";
//framework & 3rd parties
//framework & 3rd parties
import React, { Fragment, Component } from "react";

import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import { Translate } from "spotify-shared-web/localize";
import ErrorMessage from "spotify-shared-web/components/common/ErrorMessage";
import SuccessMessage from "spotify-shared-web/components/common/SuccessMessage";
import ModalWithFormWrapper from "spotify-shared-web/components/common/ModalWithForm";
import LoadingComponent from "spotify-shared-web/components/common/LoadingComponent";
import { Hidden } from "@material-ui/core";
import RadioButton from "spotify-shared-web/components/common/form/RadioButton";
import NumberFormat from "react-number-format";
import TextInput from "spotify-shared-web/components/common/form/TextInput";
import SelectInput from "spotify-shared-web/components/common/form/SelectInput";
import { FooterLinks } from "../../../constants";
import Checkbox from "spotify-shared-web/components/common/form/CheckboxInput";
import { dropStagedEnrollment } from "spotify-shared/actions/enrolledPrograms";
import { connect } from "react-redux";
import { history } from "../../../store";
import formHelpers from "spotify-shared/helpers/formHelpers";
import { getTimeZoneForCountryByCurrency } from "spotify-shared/helpers/country";






const FormBody = ({
  assessment,
  paymentResults,
  hasErrors,
  isSubmittingPayment,
  isCompletePayment,
  paymentErrors,
  paymentInfoData,
  verifiedData,
  statesData,
  onSubmit,
  paymentCompleteData,
  onHideRefundPolicyClick,
  onViewRefundPolicyClick,
  showRefundPolicy,
  WindowCloseDate,
  formProps, // this is why we need to have a form body
  sevenDaysCCDFlow
}) => {
  {
    ((verifiedData != null && verifiedData.verified == true) ||
      (paymentCompleteData != null &&
        paymentCompleteData.isSaving == false &&
        paymentCompleteData.isSuccessful != null &&
        paymentCompleteData.isSuccessful == true)) &&
      onSubmit(null);
  }
  const tag = `<a class="link pointer" target="_blank" href="https://www.spotifyworkfromhome.com/spotify-platform-policy-class-confirmation-deposit/" >Class Confirmation Deposit policy</a>`;
  const choices = ["true"];
  const timezone = getTimeZoneForCountryByCurrency(paymentInfoData.currencySymbol)


  return (
    <Translate>
      {({ translate }) => (
        <Fragment>
          {(isSubmittingPayment === true && hasErrors === false) ||
            (paymentCompleteData != null && paymentCompleteData.isSaving && (
              <Fragment>
                <LoadingComponent />
              </Fragment>
            ))}

          {verifiedData != null &&
            verifiedData.verified == false &&
            (verifiedData.verificationLevelType == "PremisesPartial" ||
              verifiedData.verificationLevelType == "StreetPartial") && (
              <Fragment>
                <ErrorMessage
                  title="Failed to verify your address"
                  message={
                    verifiedData.verificationLevelType == "PremisesPartial"
                      ? "Please Confirm your Apt/Ste/Unit Number."
                      : verifiedData.prompt
                  }
                />
              </Fragment>
            )}
          {verifiedData != null &&
            verifiedData.verified == false &&
            (verifiedData.verificationLevelType == "None" ||
              verifiedData.verificationLevelType == "Multiple") && (
              <Fragment>
                <ErrorMessage
                  title="Failed to verify your address"
                  message={verifiedData.prompt}
                />
              </Fragment>
            )}

          {verifiedData != null && verifiedData.verified == true && (
            <Fragment>
              <SuccessMessage
                title="Address was verified "
                message={verifiedData.prompt}
              />
              <div className="address">
                {verifiedData.returnedAddresses != null &&
                  verifiedData.returnedAddresses.map((address, key) => {
                    address.addressLine.map((addressLineOut, key2) => (
                      <div id="key">{addressLineOut}</div>
                    ));
                  })}
              </div>
            </Fragment>
          )}

          {paymentInfoData &&
            isSubmittingPayment === false &&
            hasErrors === false &&
            paymentCompleteData != null &&
            paymentCompleteData.isSaving == false && (
              <Fragment>
                <p>To reserve your place in class, you are required to pay a deposit of {paymentInfoData.currencySymbol}{paymentInfoData.classNoShowFees}.
                  This deposit will be refunded after you attend the entire first day of class. For more details, see the <a
                    className="pointer"
                    href={FooterLinks.CLASS_CONFIRMATION_POLICY}
                    target="_blank"
                  >
                    Class Confirmation Deposit policy
                  </a>.

                </p>
                <p>Important: The window to pay the deposit will close on: {formHelpers.formatDateTime(WindowCloseDate)} <span>{translate(timezone)}</span> </p>


                {paymentInfoData.classNoShowFees >= 0 && (
                  <Field
                    required
                    value={formProps.values.ConsentClassNoShow}
                    name="ConsentClassNoShow"
                    label={`I have read and understood the terms of the ${tag}.`}
                    hint={null}
                    options={choices.map((key) => {
                      return { value: true, label: "ConsentClassNoShow" };
                    })}
                    id="ConsentClassNoShow"
                    component={Checkbox}
                  />
                )}

              </Fragment>
            )}

          {showRefundPolicy === false &&
            verifiedData != null &&
            verifiedData.verified == false &&
            verifiedData.verificationLevelType == "Multiple" && (
              <Fragment>
                <div className="addresses">
                  <Field
                    values={formProps.values}
                    setFieldValue={formProps.setFieldValue}
                    onChange={formProps.handleChange}
                    name={"multipleaddress"}
                    label={verifiedData.prompt}
                    options={verifiedData.returnedAddresses.map(
                      (address, key) => {
                        return { value: key, label: address.addressLine };
                      }
                    )}
                    id={"address"}
                    component={RadioButton}
                  />
                </div>
              </Fragment>
            )}

          {showRefundPolicy === false &&
            hasErrors === false &&
            paymentInfoData != null &&
            paymentInfoData.countryCode == "US" &&
            isSubmittingPayment === false &&
            paymentResults != null &&
            paymentResults.required == true &&
            (verifiedData == null ||
              (verifiedData != null &&
                verifiedData.verified == false &&
                verifiedData.verificationLevelType != "Multiple")) && (
              <Fragment>
                <div>
                  <b>Shipping Information</b>

                  <p>
                    Under this opportunity, spotify may ship items relating to
                    your company's use of the platform or service on the
                    program, or both. Please enter your current residential
                    address. P.O. Boxes are not accepted.
                  </p>
                </div>
                <Field
                  values={formProps.values}
                  setFieldValue={formProps.setFieldValue}
                  onChange={formProps.handleChange}
                  name={"address"}
                  label="Ship To"
                  options={
                    paymentResults.addresses != null
                      ? paymentResults.addresses.map((address, key) => {
                        return {
                          value: address.addressType,
                          label:
                            address.addressType +
                            " \n" +
                            (address.addressString != null
                              ? address.addressString
                              : ""),
                        };
                      })
                      : [{ value: "", label: "New Address " }]
                  }
                  /*options={
                [{ value: "contactProfile", label: "Profile Address \n" + paymentResults.contactProfileAddress.addressString },
                { value: "cspAddress", label: "Saved Address \n" + paymentResults.cspAddress.addressString },
                { value: "newAddress", label: "New Address " }
                ]
              }*/
                  id={"address"}
                  component={RadioButton}
                />
                {formProps.values.address == "New Address" && (
                  <div id="newAddressFields">
                    <Field
                      onChange={formProps.handleChange}
                      name={"addressLine1"}
                      value={formProps.values.addressLine1}
                      label={"Street Address"}
                      id={"addressLine1"}
                      component={TextInput}
                      size="small"
                    />
                    <Field
                      onChange={formProps.handleChange}
                      name={"addressLine2"}
                      value={formProps.values.addressLine2}
                      label={"Apt/Suite"}
                      id={"addressLine2"}
                      component={TextInput}
                      size="small"
                    />
                    <Field
                      onChange={formProps.handleChange}
                      name={"city"}
                      value={formProps.values.city}
                      label={"City"}
                      id={"city"}
                      component={TextInput}
                      size="small"
                    />
                    <Field
                      onChange={formProps.handleChange}
                      name={"state"}
                      value={formProps.values.state}
                      label={"State"}
                      id={"state"}
                      options={statesData.map((state, key) => {
                        return { value: state.code, label: state.name };
                      })}
                      component={SelectInput}
                      size="small"
                    />
                    <Field
                      onChange={formProps.handleChange}
                      name={"zip"}
                      value={formProps.values.zip}
                      label={"Zip/Postal Code"}
                      id={"zip"}
                      component={TextInput}
                      size="small"
                    />
                  </div>
                )}
              </Fragment>
            )}
        </Fragment>
      )}
    </Translate>
  );
};

class NoShowDepositModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRefundPolicy: false,
      shouldShowCancelModal: false,
    };

    this.onSubmitSave = this.onSubmitSave.bind(this);
    this.onViewRefundPolicyClick = this.onViewRefundPolicyClick.bind(this);
    this.onHideRefundPolicyClick = this.onHideRefundPolicyClick.bind(this);
    this.showCancelModal = this.showCancelModal.bind(this);
    this.onCancelEnrollment = this.onCancelEnrollment.bind(this);
    this.onhideCancelModal = this.onhideCancelModal.bind(this);
  }

  onViewRefundPolicyClick() {
    this.setState({
      showRefundPolicy: true,
    });
  }

  onHideRefundPolicyClick() {
    this.setState({
      showRefundPolicy: false,
    });
  }

  closeLabel() {
    return "Cancel Enrollment";
  }

  hideCancelBtn() {
    if (
      (this.props.verifiedData != null &&
        this.props.verifiedData.verified == true) ||
      (this.props.paymentCompleteData != null &&
        this.props.paymentCompleteData.isSaving == false &&
        this.props.paymentCompleteData.isSuccessful != null &&
        this.props.paymentCompleteData.isSuccessful == true)
    )
      return true;
    return false;
  }

  submitLabel() {
    return "Continue";
  }

  onSubmitSave(values) {

    this.props.onSubmit(values);
  }

  hasResults() {
    if (
      this.props.idVerificationnResults != null &&
      (this.props.idVerificationnResults.errors != null ||
        this.props.idVerificationnResults.results != null)
    )
      return true;
    return false;
  }

  hideSaveBtn() {
    return false;
  }

  hasErrors() {
    if (this.props.paymentErrors != null && this.props.paymentErrors != "")
      return true;
    return false;
  }

  Verified() {
    if (
      this.props.paymentResults != null &&
      this.props.paymentResults.verified != null &&
      this.props.paymentResults.verified == true
    )
      return true;
    return false;
  }

  validationSchema() {
    let schemaObj = {};

    if (
      (this.props.paymentInfoData != null &&
        this.props.paymentInfoData.countryCode != "US") ||
      (this.props.paymentInfoData != null &&
        this.props.paymentInfoData.countryCode == "US" &&
        this.props.paymentResults != null &&
        this.props.paymentResults.required == false) || (
        this.props.paymentInfoData != null &&
        this.props.paymentInfoData.countryCode == "GB"
      ) || (
        this.props.paymentInfoData != null &&
        this.props.paymentInfoData.countryCode == "CA"
      )
    ) {

      schemaObj["ConsentClassNoShow"] = Yup.boolean().required().oneOf([true], "you must accept the terms");

      return Yup.object(schemaObj);
    }

    schemaObj["address"] = Yup.string().required("Address Line 1 is required");

    schemaObj["addressLine1"] = Yup.string().when("address", {
      is: "New Address",
      then: Yup.string().required("Address Line 1 is required"),
    });
    schemaObj["city"] = Yup.string().when("address", {
      is: "New Address",
      then: Yup.string().required("City is required"),
    });
    schemaObj["state"] = Yup.string().when("address", {
      is: "New Address",
      then: Yup.string().required("State is required"),
    });
    schemaObj["zip"] = Yup.string().when("address", {
      is: "New Address",
      then: Yup.string().required("Zip/Postal Code is required"),
    });

    schemaObj["ConsentClassNoShow"] = Yup.boolean().required().oneOf([true], "you must accept the terms");

    return Yup.object(schemaObj);
  }

  onCancelEnrollment() {
    //test
    this.setState({ shouldShowCancelModal: false });
    this.props.showDropReasonModal()
    //open drop enrollment modal
  }

  //to display cancel modal
  showCancelModal() {
    this.setState({ shouldShowCancelModal: true });
  }
  onhideCancelModal() {
    this.setState({ shouldShowCancelModal: false });
  }
  returnToOppurtunity() {

    history.push("/opportunities")

  }

  render() {
    const {
      assessment,
      isModalVisible,
      onSubmit,
      onHideModal,
      paymentResults,
      isSubmittingPayment,
      isCompletePayment,
      paymentErrors,
      paymentInfoData,
      verifiedData,
      statesData,
      paymentCompleteData,
      isPaymentWindowAvaliable,
      WindowCloseDate,
      NoShowWindow,
      sevenDaysCCDFlow
    } = this.props;
    const { shouldShowCancelModal } = this.state;

    return (
      <>
        {isModalVisible && (
          <Translate>
            {({ translate }) => (
              <Fragment>
                {isPaymentWindowAvaliable != null && isPaymentWindowAvaliable && !shouldShowCancelModal && (
                  <ModalWithFormWrapper
                    overrideIsSubmitting={isCompletePayment}
                    id={"NoShowDepositWithCloseButton"}
                    title={"Class Confirmation Deposit"}
                    isVisible={isModalVisible}
                    onHide={onHideModal}
                    onSubmit={this.onSubmitSave}
                    onCancel={this.showCancelModal}
                    hideApply={this.hideSaveBtn()}
                    hideCancel={isSubmittingPayment || this.hideCancelBtn()}
                    closeButton={true}
                    centered={true}
                    showClearAndHide={false}
                    applyLbl={translate("Pay Deposit")}
                    cancelLbl={translate(this.closeLabel())}
                    isInitialValid={
                      (paymentInfoData != null &&
                        paymentInfoData.countryCode != "US") ||
                        (paymentInfoData != null &&
                          paymentInfoData.countryCode == "US" &&
                          paymentResults != null &&
                          paymentResults.required == false)
                        ? (paymentInfoData.classNoShowFees >= 0 ? false : true)
                        : false
                    }
                    validationSchema={this.validationSchema()}
                    initialFormValues={{
                      address: "",
                      addressLine1: "",
                      addressLine2: "",
                      city: "",
                      state: "",
                      zip: "",
                      multipleaddress: "",
                      ConsentClassNoShow: "",
                    }}
                  >
                    {paymentInfoData && <FormBody
                      assessment={assessment}
                      paymentResults={paymentResults}
                      hasErrors={this.hasErrors()}
                      isSubmittingPayment={isSubmittingPayment}
                      isCompletePayment={isCompletePayment}
                      paymentErrors={paymentErrors}
                      paymentInfoData={paymentInfoData}
                      verifiedData={verifiedData}
                      statesData={statesData}
                      onSubmit={this.props.onSubmit}
                      paymentCompleteData={paymentCompleteData}
                      showRefundPolicy={this.state.showRefundPolicy}
                      onViewRefundPolicyClick={this.onViewRefundPolicyClick}
                      onHideRefundPolicyClick={this.onHideRefundPolicyClick}
                      WindowCloseDate={WindowCloseDate}
                      sevenDaysCCDFlow={sevenDaysCCDFlow}
                    />}
                  </ModalWithFormWrapper>
                )}

                {isPaymentWindowAvaliable != null && isPaymentWindowAvaliable && shouldShowCancelModal && (
                  <ModalWithFormWrapper
                    overrideIsSubmitting={isCompletePayment}
                    id={"NoShowDeposit"}
                    title={"Cancel Enrollment"}
                    isVisible={isModalVisible}
                    onHide={this.onHideModal}
                    onSubmit={this.onCancelEnrollment}
                    onCancel={this.onhideCancelModal}
                    hideApply={this.hideSaveBtn()}
                    hideCancel={isSubmittingPayment || this.hideCancelBtn()}
                    closeButton={false}
                    centered={true}
                    showClearAndHide={false}
                    applyLbl={translate("Continue")}
                    cancelLbl={translate("Return to enrollment")}
                    isInitialValid={true}
                  >
                    <p>
                      Are you sure you want to cancel your enrollment in this class?
                    </p>
                  </ModalWithFormWrapper>
                )}

                {isPaymentWindowAvaliable != null && !isPaymentWindowAvaliable && (
                  <ModalWithFormWrapper
                    overrideIsSubmitting={isCompletePayment}
                    id={"ClosedWindow"}
                    title={"Class Confirmation Deposit"}
                    isVisible={isModalVisible}
                    onHide={onHideModal}
                    onSubmit={this.returnToOppurtunity}
                    hideApply={false}
                    hideCancel={true}
                    closeButton={false}
                    backdrop="static"
                    centered={true}
                    showClearAndHide={false}
                    applyLbl={translate("Return To Main Screen")}
                    isInitialValid={true}
                  >
                    {(paymentInfoData != null) ?
                      <div>
                        {sevenDaysCCDFlow &&
                          <p>To reserve your place in class, you will need to pay a deposit of {paymentInfoData.currencySymbol}{paymentInfoData.classNoShowFees} -{NoShowWindow} days prior to the start of the class. This deposit will be refunded after you attend the entire first day of class.
                            For more details, see the <a className="pointer" href={FooterLinks.CLASS_CONFIRMATION_POLICY} target="_blank">Class Confirmation Deposit policy</a>.<br /> Your window to pay the Class Confirmation Deposit will open on: {formHelpers.formatDateTime(WindowCloseDate)} <span>{translate(getTimeZoneForCountryByCurrency(paymentInfoData.currencySymbol))}</span> . Please come back to the Client Opportunities section of the portal on this date to pay the deposit and confirm your place in class.
                          </p>
                        }
                      </div> : <LoadingComponent />}
                  </ModalWithFormWrapper>
                )}
              </Fragment>
            )}
          </Translate>
        )}

      </>
    );
  }
}


export default NoShowDepositModal

