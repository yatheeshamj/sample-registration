import React, { Component } from "react";
import { ErrorMessage, Formik } from "formik";
import { connect } from "react-redux";
import styles from "./UniqueIdFormContainer.module.scss";
import { Translate } from "spotify-shared-web/localize";
import UniqueIdForm from './UniqueIdForm';
import ssnSchema from "../ssn/ssnSchema";
import uniqueIdSchema from './uniqueIdSchema';
import TextField from "@material-ui/core/TextField";
import { useStyles } from "../../../styles";
import { withStyles } from "@material-ui/core/styles";

import formHelpers from "spotify-shared/helpers/formHelpers";

import {
  verifySsnAndName,
  updateName,
} from "../../../actions/agentTypeActions";

import { updateReferralUserData } from "../../../actions/registrationActions";
import {
  verifyPrimaryUniqueIdentity,
  getAadhaarRedirectionURL,
  checkSecondaryUniqueIdentityVerified,
  checkPrimaryUniqueIdVerified,
  clearUniqueIdenityVerificationErrorMessage,
  clearSecondaryUniqueIdenityVerificationErrorMessage,
  verifySecondaryUniqueIdentity,
  toggleIsFetchingFlagForIdentity,
  toggleIsFetchingFlagForSecondaryIdentity,
  makeindividualTaxIdChecked,
} from '../../../actions/uniqueIdentityActions'
import Button from "spotify-shared-web/components/common/Button";
import commonStyle from "../../../../src/components/shared/CommonStyle.module.scss";
import { agentStatusId } from "../../../constants";
import SCREEN_CONFIG from "../../../screensConfig";
import { logoutRedirect } from "../../../actions/loginActions";

const CURRENT_SCREEN = SCREEN_CONFIG.uniqueIdentification;

class UniqueIdFormContainer extends Component {
  state = {
    isSaving: false,
    fn: this.props.agentProfile && this.props.agentProfile.firstName,
    mn: this.props.agentProfile && this.props.agentProfile.middleInitial,
    ln: this.props.agentProfile && this.props.agentProfile.lastName,
    recent: "",
    editing: false,
    fnError: undefined,
    mnError: undefined,
    lnError: undefined,
  };

  fnRef = React.createRef();
  mnRef = React.createRef();
  lnRef = React.createRef();

  componentDidUpdate(prevProps, prevState) {
    //#region  Bug 93103:If duplicate SSN is entered, then valid SSN also fails without refreshing the page
    const { uniqueIdentity, secondaryUniqueIdentity } = this.props.agentType;
    const { referUser } = this.props;
    const prevUniqueIdentity = prevProps.agentType && prevProps.agentType.uniqueIdentity;
    const prevSecondaryUniqueIdentity = prevProps.agentType && prevProps.agentType.secondaryUniqueIdentity;
    if (secondaryUniqueIdentity.isSubmitting == false && prevSecondaryUniqueIdentity.isSubmitting == true) {
      this.setState({
        isSaving: false,
      });
    }
    if (uniqueIdentity.isSubmitting == false && prevUniqueIdentity.isSubmitting == true) {
      this.setState({
        isSaving: false,
      });
    }
    //#endregion
  }

  // handleSubmit = (values) => {
  //   if (this.state.isSaving) return;
  //   this.setState({
  //     isSaving: true,
  //   });

  //   const formData = formHelpers.constructFormData(values);
  //     Object.assign(formData, {
  //   this.props.verifyPrimaryUniqueIdentity(
  //       agentId: this.props.agentProfile.agentId,
  //       countryId: this.props.agentProfile.countryId
  //     })
  //   );
  //   this.props.referUser.agentStatusId = agentStatusId.VerifyIdentity;
  //   const { referUser } = this.props;
  //   const { userId } = this.props.agentProfile;
  //   const userData = {};
  //   userData.referUser = referUser;
  //   userData.userId = userId;
  //   this.props.updateReferralUserData(userData);
  // };



  handleSubmit = (values) => {
    const { formFields } = this.props;

    const soleProprietor = this.props.agentTypeSteps ? this.isAgentSoleProprietor(5) : false;


    if ((formFields.uniqueNumber.uniqueIdVerification === "SpringVerify" && this.props.uniqueIdentityData.isPrimaryUniqueIdValid && this.props.isSecondaryIDVerified) ||
      (formFields.uniqueNumber.uniqueIdVerification === "OFF" || formFields.uniqueNumber.uniqueIdVerification === "TIN")) {

      if (this.state.isSaving) return;
      this.setState({
        isSaving: true,
      });



      const formData = formHelpers.constructFormData(values);



      if (!formFields.secondaryUniqueNumber.display) {
        this.props.verifyPrimaryUniqueIdentity(
          Object.assign(formData, {
            agentId: this.props.agentProfile.agentId,
            countryId: this.props.agentProfile.countryId,
            submitApi: this.props.formFields.uniqueNumber.verification.submitAPI
          })
        );
      }
      else {
        this.props.verifySecondaryUniqueIdentity(
          Object.assign(formData, {
            agentId: this.props.agentProfile.agentId,
            countryId: this.props.agentProfile.countryId,
            submitApi: this.props.formFields.uniqueNumber.verification.submitAPI
          })
        );
      }

      this.props.referUser.agentStatusId = agentStatusId.VerifyIdentity;
      const { referUser } = this.props;
      const { userId } = this.props.agentProfile;
      const userData = {};
      userData.referUser = referUser;
      userData.userId = userId;
      this.props.updateReferralUserData(userData);
    };

  }

  setRecent = (name) => {
    this.setState({
      recent: name,
    });
  };

  setEdit = (flag) => {
    this.setState({
      editing: flag,
      fnError: undefined,
      mnError: undefined,
      lnError: undefined,
    });
  };

  setSaving = (flag) => {
    this.setState({
      isSaving: flag
    });
  };

  isAgentSoleProprietor = (uniqueId) => {

    const step = this.props.agentTypeSteps.find((step) => step.uniqueId === uniqueId);
    if (step) {
      const verifyIdentityStep = step.childSteps.find(
        (childStep) => childStep.name === 'Verify Identity-RI'
      );

      return verifyIdentityStep ? verifyIdentityStep.available : false;
    }
    return false;
  }

  handleEditSubmit = () => {
    const { nameFields } = this.props.formFields
    // if (this.state.isSaving) return;
    this.setState({
      isSaving: true,
    });

    const formValues = {
      firstName: this.state.fn,
      middleInitial: this.state.mn,
      lastName: this.state.ln
    }

    const isValid = Object.keys(nameFields).every(eachFormItem => {
      const formItem = nameFields[eachFormItem];
      return !formItem.required || (formValues[formItem.key] && formValues[formItem.key].trim() !== '');
    });

    if (isValid) {
      this.props.updateName(formValues);
      this.setEdit(false);
      this.setState({
        isSaving: false,
      });
    }
  };

  renderEditForm = () => {
    const { agentProfile, classes, formFields } = this.props;
    const { nameFields } = formFields
    // const isSaveButtonDisabled =
    //   this.state.fnError || this.state.mnError || this.state.lnError;
    return (
      <Translate>
        {({ translate }) => (
          <>
            {nameFields.firstName.display && <div className={`${styles["ssn-inputs-wrapper"]} ${styles["width-70"]}`}>
              <TextField
                ref={this.fnRef}
                classes={{ root: !this.state.fnError && classes.root }}
                type="text"
                value={this.state.fn}
                label={
                  nameFields.firstName.required
                    ? translate(`${CURRENT_SCREEN}.firstName`) + translate(`${CURRENT_SCREEN}.requiredMessage`)
                    : translate(`${CURRENT_SCREEN}.firstName`)
                }
                required={nameFields.firstName.required}
                onChange={(e) => {
                  this.setState({ fn: e.target.value });
                  if (!e.target.value && nameFields.firstName.required) this.setState({ fnError: translate(`${CURRENT_SCREEN}.requiredMessage`) });
                  else if (this.state.fnError)
                    this.setState({ fnError: undefined });
                }}
                fullWidth
                helperText={this.state.fnError}
                error={this.state.fnError ? true : false}
                size="small"
                variant="outlined"
                inputProps={{ maxLength: 20 }}
              />
            </div>}
            {nameFields.middleInitial.display && <div className={`${styles["ssn-inputs-wrapper"]} ${styles["width-70"]}`}>
              <TextField
                ref={this.mnRef}
                classes={{ root: !this.state.fnError && classes.root }}
                type="text"
                value={this.state.mn}
                label={
                  nameFields.middleInitial.required
                    ? translate(`${CURRENT_SCREEN}.middleInitial`) + translate(`${CURRENT_SCREEN}.requiredMessage`)
                    : translate(`${CURRENT_SCREEN}.middleInitial`)
                }
                required={nameFields.middleInitial.required}
                onChange={(e) => {
                  this.setState({ mn: e.target.value });
                  if (!e.target.value && nameFields.middleInitial.required) this.setState({ mnError: translate(`${CURRENT_SCREEN}.requiredMessage`) });
                  else if (this.state.mnError)
                    this.setState({ mnError: undefined });
                }}
                fullWidth
                helperText={this.state.mnError}
                error={this.state.mnError ? true : false}
                size="small"
                variant="outlined"
                inputProps={{ maxLength: 20 }}
              />
            </div>}
            {nameFields.lastName.display && <div className={`${styles["ssn-inputs-wrapper"]} ${styles["width-70"]}`}>
              <TextField
                ref={this.lnRef}
                classes={{ root: !this.state.lnError && classes.root }}
                type="text"
                value={this.state.ln}
                label={
                  nameFields.lastName.required
                    ? translate(`${CURRENT_SCREEN}.lastName`) + translate(`${CURRENT_SCREEN}.requiredMessage`)
                    : translate(`${CURRENT_SCREEN}.lastName`)
                }
                required={nameFields.lastName.required}
                onChange={(e) => {
                  this.setState({ ln: e.target.value });
                  if (!e.target.value && nameFields.lastName.required) this.setState({ lnError: translate(`${CURRENT_SCREEN}.requiredMessage`) });
                  else if (this.state.lnError)
                    this.setState({ lnError: undefined });
                }}
                fullWidth
                helperText={this.state.lnError}
                error={this.state.lnError ? true : false}
                size="small"
                variant="outlined"
                inputProps={{ maxLength: 25 }}
              />
            </div>}
            <div className={styles["submit-wrapper"]}>
              <button
                onClick={() => this.setEdit(false)}
                type="button"
                className={styles["cancel-button"]}
              >
                {translate(`${CURRENT_SCREEN}.cancelButton`)}
              </button>
              <Button size="medium" onClick={this.handleEditSubmit} >
                {translate(`${CURRENT_SCREEN}.saveButton`)}
              </Button>
            </div>
          </>
        )}
      </Translate>
    );
  };

  render() {
    const { uniqueIdentity, secondaryUniqueIdentity } = this.props.agentType;
    const { agentProfile, referUser, formFields } = this.props;

    const { nameFields } = formFields


    return (
      <Translate>
        {({ translate }) => (
          <>
            <div
              className={`${styles["form-container"]} ${commonStyle["widthChange"]}`}
            >
              <p
                className={`${styles["form-container__header"]} ${commonStyle["paragraph_1"]} ${commonStyle["semiBoldWeight"]} ${commonStyle["sub-headingMargin"]} ${commonStyle["componentsMargin"]} ${commonStyle["mediumFont"]}`}
              >
                {translate(`${CURRENT_SCREEN}.title`)}
              </p>
              <p
                className={`${styles["form-container__copy"]} ${commonStyle["paragraph_3"]} ${commonStyle["regularFont"]} ${commonStyle["blackColor"]} ${commonStyle["withinComponentMargin"]}`}
                style={{ width: '70%' }}

              >
                {translate(`${CURRENT_SCREEN}.brief`)}
              </p>
              {this.state.editing ? (
                this.renderEditForm()
              ) : (
                <div>
                  <Formik
                    initialValues={Object.assign(uniqueIdentity.formInfo, secondaryUniqueIdentity.formInfo, {
                      firstName: agentProfile.firstName == null ? "" : agentProfile.firstName,
                      middleInitial: agentProfile.middleInitial == null ? "" : agentProfile.middleInitial,
                      lastName: agentProfile.lastName == null ? "" : agentProfile.lastName,
                      uniqueIdentity: this.props.uniqueIdentityData.isPrimaryUniqueIdValid ? this.props.uniqueIdentityData.primaryUniqueId : "",
                      uniqueIdentityConfirm: this.props.uniqueIdentityData.isPrimaryUniqueIdValid ? this.props.uniqueIdentityData.primaryUniqueId : "",
                      secondaryUniqueIdentity: this.props.isSecondaryIDVerified ? this.props.secondaryuid : "",
                      secondaryUniqueIdentityConfirm: this.props.isSecondaryIDVerified ? this.props.secondaryuid : "",
                      indiviualTaxIdCheckBox: false
                      // individualTaxIdentity: "",
                      // individualTaxIdentityConfirm: ""
                    })}
                    validationSchema={uniqueIdSchema(formFields)}
                    validateOnBlur={true}
                    onSubmit={this.handleSubmit}
                    render={(formikProps) => (
                      <UniqueIdForm
                        agentId={this.props.agentProfile.agentId}
                        clearUniqueIdenityVerificationErrorMessage={this.props.clearUniqueIdenityVerificationErrorMessage}
                        clearSecondaryUniqueIdenityVerificationErrorMessage={this.props.clearSecondaryUniqueIdenityVerificationErrorMessage}
                        changeTypeBtnId={this.props.changeTypeBtnId}
                        uniqueIdentity={uniqueIdentity}
                        secondaryUniqueIdentity={secondaryUniqueIdentity}
                        hideSSNFields={this.props.hideSSNFields}
                        verifySsnUnique={this.handleSsnVerification}
                        restartText={this.props.restartText}
                        agentTypeSteps={this.props.agentTypeSteps}
                        btnNextId={this.props.btnNextId}
                        handleRestartClick={this.props.handleRestartClick}
                        setRecent={this.setRecent}
                        setFieldError={this.setFieldError}
                        setEdit={this.setEdit}
                        formFields={formFields}
                        recent={this.state.recent}
                        setSaving={this.setSaving}
                        secondaryuid={this.props.secondaryuid}
                        isSecondaryIDVerified={this.props.isSecondaryIDVerified}
                        verifyPrimaryUniqueIdentity={this.props.verifyPrimaryUniqueIdentity}
                        getAadhaarRedirectionURL={this.props.getAadhaarRedirectionURL}
                        checkPrimaryUniqueIdVerified={this.props.checkPrimaryUniqueIdVerified}
                        checkSecondaryUniqueIdentityVerified={this.props.checkSecondaryUniqueIdentityVerified}
                        uniqueIdentityVerificationFailedError={this.props.uniqueIdentityVerificationFailedError}
                        secondaryUniqueIdentityVerificationFailedError={this.props.secondaryUniqueIdentityVerificationFailedError}
                        uniqueIdSubmitting={this.props.uniqueIdSubmitting}
                        remainingSecondaryIdAttempts={this.props.remainingSecondaryIdAttempts}
                        uniqueIdentityData={this.props.uniqueIdentityData}
                        logoutRedirect={this.props.logoutRedirect}

                        // For handling Loading
                        toggleIsFetchingFlagForIdentity={this.props.toggleIsFetchingFlagForIdentity}
                        toggleIsFetchingFlagForSecondaryIdentity={this.props.toggleIsFetchingFlagForSecondaryIdentity}
                        makeindividualTaxIdChecked={this.props.makeindividualTaxIdChecked}
                        isFetchingID={this.props.isFetchingID}
                        isFetchingSecondaryID={this.props.isFetchingSecondaryID}
                        individualTaxIdChecked={this.props.individualTaxIdChecked}
                        {...formikProps}
                      />

                    )}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </Translate>
    );
  }
}

// function mapStateToProps({ agentType, referUser }) {
//   return { agentType, referUser };
// }


const mapStateToProps = (state, props) => {

  const { agentType, referUser, app, uniqueIdentity } = state;
  const uniqueIdentityVerificationFailedError = uniqueIdentity.uniqueIdentity.error;
  const uniqueIdSubmitting = uniqueIdentity.uniqueIdentity.isSubmitting;
  const secondaryUniqueIdentityVerificationFailedError = uniqueIdentity.secondaryUniqueIdentity.error;
  const remainingSecondaryIdAttempts = uniqueIdentity.secondaryUniqueIdentity.remainingSecondaryAttempts;
  const isSecondaryIDVerified = uniqueIdentity.secondaryUniqueIdentity.isSecondaryIdVerified;
  const secondaryuid = uniqueIdentity.secondaryUniqueIdentity.secondaryUniqueId;
  const isFetchingID = uniqueIdentity.isFetchingID;
  const isFetchingSecondaryID = uniqueIdentity.isFetchingSecondaryID;
  const uniqueIdentityData = uniqueIdentity.uniqueIdentity;
  const individualTaxIdChecked = uniqueIdentity.indiviualTaxIdCheck;
  const formFields = app.countryConfigurations.config.roleRegistrationScreen.soleProprietorScreen.verifyIdentity.fields;

  return {
    agentType,
    isSecondaryIDVerified,
    isFetchingID,
    isFetchingSecondaryID,
    secondaryuid,
    referUser, formFields,
    uniqueIdentityVerificationFailedError,
    secondaryUniqueIdentityVerificationFailedError,
    uniqueIdSubmitting,
    remainingSecondaryIdAttempts,
    uniqueIdentityData,
    individualTaxIdChecked
  };
}

export default withStyles(useStyles)(
  connect(mapStateToProps, {
    verifySsnAndName,
    updateName,
    verifyPrimaryUniqueIdentity,
    getAadhaarRedirectionURL,
    checkPrimaryUniqueIdVerified,
    toggleIsFetchingFlagForIdentity,
    toggleIsFetchingFlagForSecondaryIdentity,
    makeindividualTaxIdChecked,
    checkSecondaryUniqueIdentityVerified,
    verifySecondaryUniqueIdentity,
    updateReferralUserData,
    clearUniqueIdenityVerificationErrorMessage,
    clearSecondaryUniqueIdenityVerificationErrorMessage,
    logoutRedirect
  })(UniqueIdFormContainer)
);
