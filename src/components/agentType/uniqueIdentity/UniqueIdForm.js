import React, { useEffect, useState } from "react";
import { Field, Form, ErrorMessage } from "formik";
import styles from "./UniqueIdForm.module.scss";
import { Translate } from "spotify-shared-web/localize";
import Button from "spotify-shared-web/components/common/Button";
import formHelpers from "spotify-shared/helpers/formHelpers";
import TextField from "@material-ui/core/TextField";
import Grid from '@material-ui/core/Grid';
import { useInputStyles } from "../../../styles";
import OverlaySpinner from "spotify-shared-web/components/common/OverlaySpinner";
import {
  asyncValidateSsn,
  asyncValidateUniqueId,
  asyncValidateSecondaryUniqueId,
  // asyncValidateIndiviualTaxId,
  validateConfirmSsn,
  validateSecondaryConfirmSsn,
  persistError,
  // validateIndividualTaxIdConfirmSsn
} from "./customValidation";
import { CollectionsBookmark } from "@material-ui/icons";
import commonStyle from "../../../../src/components/shared/CommonStyle.module.scss";
import SCREEN_CONFIG from "../../../screensConfig";
import NumberFormat from "react-number-format";
import spotifyButton from "spotify-shared-web/components/common/Button";
import verified from "../../../assets/images/language/verified.png";
import { HTTP_STATUS } from "../../../constants";
import { Modal } from 'antd'

const CURRENT_SCREEN = SCREEN_CONFIG.uniqueIdentification;


const UniqueIdForm = ({
  agentId,
  errors,
  touched,
  values,
  handleChange,
  setFieldTouched,
  uniqueIdentity,
  secondaryUniqueIdentity,
  handleRestartClick,
  restartText,
  agentTypeSteps,
  btnNextId,
  recent,
  setRecent,
  setFieldError,
  setEdit,
  formFields,
  uniqueIdentityVerificationFailedError,
  secondaryUniqueIdentityVerificationFailedError,
  uniqueIdSubmitting,
  remainingSecondaryIdAttempts,
  clearUniqueIdenityVerificationErrorMessage,
  clearSecondaryUniqueIdenityVerificationErrorMessage,
  setSaving,
  changeTypeBtnId = "btnSSNChangeContractorType",
  getAadhaarRedirectionURL,
  uniqueIdentityData,
  checkPrimaryUniqueIdVerified,
  checkSecondaryUniqueIdentityVerified,
  isSecondaryIDVerified,
  logoutRedirect,
  isFetchingID,
  isFetchingSecondaryID,
  individualTaxIdChecked,
  toggleIsFetchingFlagForIdentity,
  toggleIsFetchingFlagForSecondaryIdentity,
  makeindividualTaxIdChecked
}) => {



  const classes = useInputStyles();



  const [showStatus, setShowStatus] = useState(false);
  const [showSecondaryStatus, setShowSecondaryStatus] = useState(false);
  const [showPrimaryIDVerifyButton, setShowPrimaryIDVerifyButton] = useState(false);
  const [verifySecondaryUniqueIdentityLink, setVerifySecondaryUniqueIdentityLink] = useState(false);
  const [refreshUniqueIdentityLink, setRefereshVerifyUniqueIdentityLink] = useState(false);
  const [loading, setLoading] = useState(false);
  const [secondaryUniqueIdentityLoading, setSecondaryUniqueIdentityLoading] = useState(false);
  // const [verifyIndividualTaxId, setVerifyIndividualTaxId] = useState(false);

  const [uniqueIdentityChanged, setUniqueIdentityChanged] = useState(false);
  const [secondaryUniqueIdentityChanged, setSecondaryUniqueIdentityChanged] = useState(false);

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [showIndiviualTaxModalIsOpen, setShowIndiviualTaxModalIsOpen] = useState(false);
  // const [individualTaxIdChanged, setIndividualTaxIdChanged] = useState(false);

  // const isIndividualTaxIDVerified = false;






  useEffect(() => {
    // Checking conditions for uniqueIdentity
    if (
      formFields.uniqueNumber.uniqueIdVerification === "SpringVerify" &&
      values.uniqueIdentity &&
      values.uniqueIdentityConfirm &&
      !errors.uniqueIdentity &&
      !errors.uniqueIdentityConfirm &&
      !uniqueIdentityVerificationFailedError
    ) {
      // Calling function for uniqueIdentity

      if (values.uniqueIdentity.length === values.uniqueIdentityConfirm.length && !uniqueIdentityData.isPrimaryUniqueIdValid) {
        setShowPrimaryIDVerifyButton(true);
        toggleIsFetchingFlagForIdentity(true);
        getAadhaarRedirectionURL(agentId, values.firstName, values.middleInitial, values.lastName, values.uniqueIdentity);
      }
    }

    // Checking conditions for secondaryUniqueIdentity
    if (
      formFields.uniqueNumber.uniqueIdVerification === "SpringVerify" &&
      values.secondaryUniqueIdentity &&
      values.secondaryUniqueIdentityConfirm &&
      !errors.secondaryUniqueIdentity &&
      !errors.secondaryUniqueIdentityConfirm &&
      !secondaryUniqueIdentityVerificationFailedError
    ) {
      // Calling function for secondaryUniqueIdentity
      //if (values.secondaryUniqueIdentity.length === values.secondaryUniqueIdentityConfirm.length && !isSecondaryIDVerified) {
      if (values.secondaryUniqueIdentity.length === values.secondaryUniqueIdentityConfirm.length) {
        setVerifySecondaryUniqueIdentityLink(true);
      }
      else {
        setVerifySecondaryUniqueIdentityLink(false);
      }


    }

    // if (
    //   formFields.uniqueNumber.uniqueIdVerification===="SpringVerify" &&
    //   values.individualTaxIdentity &&
    //   values.individualTaxIdentityConfirm &&
    //   !errors.individualTaxIdentity &&
    //   !errors.individualTaxIdentityConfirm

    // ) {

    //   if (values.individualTaxIdentity.length === values.individualTaxIdentityConfirm.length && !isIndividualTaxIDVerified) {

    //     setVerifyIndividualTaxId(true);
    //   }
    //   else {
    //     setVerifyIndividualTaxId(false);
    //   }


    // }



  }, [
    values.uniqueIdentity,
    values.uniqueIdentityConfirm,
    errors.uniqueIdentity,
    errors.uniqueIdentityConfirm,
    uniqueIdentityVerificationFailedError,
    values.secondaryUniqueIdentity,
    values.secondaryUniqueIdentityConfirm,
    errors.secondaryUniqueIdentity,
    errors.secondaryUniqueIdentityConfirm,
    secondaryUniqueIdentityVerificationFailedError,
    // values.individualTaxIdentity,
    // values.individualTaxIdentityConfirm,
    // errors.individualTaxIdentity,
    // errors.individualTaxIdentityConfirm,

  ]);


  const PrimaryUniqueIdVerified = (agentId, personId, requestId, uniqueIdentity, firstName, lastName) => {
    toggleIsFetchingFlagForIdentity(true);
    setShowStatus(true);
    checkPrimaryUniqueIdVerified(agentId, personId, requestId, uniqueIdentity, firstName, lastName);
    // Call Loader and Redirect URL/Update Status
  }

  const validatePrimaryUniqueIdentifier = (primaryUniqueIdUrl) => {
    setShowPrimaryIDVerifyButton(false);
    window.open(`${primaryUniqueIdUrl}`, "_blank");
    setRefereshVerifyUniqueIdentityLink(true);
  };

  const secondaryUniqueIdValid = () => {
    toggleIsFetchingFlagForSecondaryIdentity(true);
    setShowSecondaryStatus(true);
    checkSecondaryUniqueIdentityVerified(agentId, values.firstName, values.middleInitial, values.lastName, values.secondaryUniqueIdentity);

  };

  const handlePaste = (event) => {
    event.preventDefault();
  };

  const handleTimeout = () => {
    setTimeout(() => {
      logoutRedirect();
    }, 4000)
  }

  const clearFormField = (formField) => {
    values[formField] = "";
  }

  const handleCheckboxChange = ({ open, ticked }) => {
    setShowIndiviualTaxModalIsOpen(open ? true : false)
    setIsCheckboxChecked(ticked)
    makeindividualTaxIdChecked(ticked)

  };



  const handleModalChange = () => {
    setShowIndiviualTaxModalIsOpen(false)
  };

  function validateText(text, isRequired) {
    let error;
    if (isRequired && !text) return "Required";
    return error;
  }

  const errorStyle = {
    marginBottom: "10px",
    fontSize: "12px",
    color: "red"
  }

  const isVerifyIdentityAvailable = (uniqueId) => {
    const step = agentTypeSteps.find((step) => step.uniqueId === uniqueId);
    if (step) {
      const verifyIdentityStep = step.childSteps.find(
        (childStep) => childStep.name === 'Verify Identity-RI'
      );
      return verifyIdentityStep ? verifyIdentityStep.available : false;
    }
    return false;
  };

  // Check if "Verify Identity" is available for Sole Proprietor unique ID is 5

  const displayIndiviualTaxId = agentTypeSteps ? isVerifyIdentityAvailable(5) : false;


  return (
    <Translate>
      {({ translate }) => (
        <>
          <div className={`${commonStyle["lastComponent"]}`}>
            <Form>
              {formFields.nameFields.firstName.display && <div
                className={`${styles["firstname-inputs-wrapper"]} ${commonStyle["formColStyle"]}`}
              >
                <Field
                  id="firstName"
                  name="firstName"
                  type="string"
                  label={translate(`${CURRENT_SCREEN}.firstName`)}
                  autoComplete="off"
                  validate={(text) => validateText(text, formFields.nameFields.firstName.required)}
                  onChange={(e) => {
                    setRecent(e.nativeEvent.srcElement.id);
                    handleChange(e);
                  }}
                  disabled
                  onBlur={(e) => {
                    setRecent(e.nativeEvent.srcElement.id);
                    if (!touched["firstName"]) {
                      setFieldTouched(e.nativeEvent.srcElement.id, true, true);
                    } else {
                      setRecent("");
                    }
                  }}
                  error={
                    errors["firstName"] && touched["firstName"] ? true : false
                  }
                  fullWidth
                  value={values.firstName}
                  //label={`${translate("First Name")} *`}
                  variant="outlined"
                  helperText={
                    errors["firstName"] && touched["firstName"]
                      ? errors["firstName"]
                      : ""
                  }
                  classes={{ root: !errors["firstName"] && classes.root }}
                  component={TextField}
                  className={`${commonStyle["formMargin"]}`}
                  style={{ width: '70%' }}
                  size="small"
                />
              </div>}

              {formFields.nameFields.middleInitial.display && <div className={`${styles["lastname-inputs-wrapper"]}`}>
                <Field
                  id="middleInitial"
                  name="middleInitial"
                  type="string"
                  label={translate(`${CURRENT_SCREEN}.middleInitial`)}
                  autoComplete="off"
                  validate={(text) => validateText(text, formFields.nameFields.middleInitial.required)}
                  onChange={(e) => {
                    setRecent(e.nativeEvent.srcElement.id);
                    handleChange(e);
                  }}
                  disabled
                  onBlur={(e) => {
                    setRecent(e.nativeEvent.srcElement.id);
                    if (!touched["middleInitial"]) {
                      setFieldTouched(e.nativeEvent.srcElement.id, true, true);
                    } else {
                      setRecent("");
                    }
                  }}

                  error={
                    errors["middleInitial"] && touched["middleInitial"] ? true : false
                  }
                  fullWidth
                  value={values.middleInitial}
                  variant="outlined"
                  helperText={
                    errors["middleInitial"] && touched["middleInitial"]
                      ? errors["middleInitial"]
                      : ""
                  }
                  classes={{ root: !errors["middleInitial"] && classes.root }}
                  component={TextField}
                  size="small"
                  style={{ width: '70%' }}

                />
              </div>}

              {formFields.nameFields.lastName.display && <div className={`${styles["lastname-inputs-wrapper"]}`}>
                <Field
                  id="lastName"
                  name="lastName"
                  label={translate(`${CURRENT_SCREEN}.lastName`)}
                  type="string"
                  autoComplete="off"
                  validate={(text) => validateText(text, formFields.nameFields.lastName.required)}
                  onChange={(e) => {
                    setRecent(e.nativeEvent.srcElement.id);
                    handleChange(e);
                  }}
                  disabled
                  onBlur={(e) => {
                    setRecent(e.nativeEvent.srcElement.id);
                    if (!touched["lastName"]) {
                      setFieldTouched(e.nativeEvent.srcElement.id, true, true);
                    } else {
                      setRecent("");
                    }
                  }}

                  error={
                    errors["lastName"] && touched["lastName"] ? true : false
                  }
                  fullWidth
                  value={values.lastName}
                  variant="outlined"
                  helperText={
                    errors["lastName"] && touched["lastName"]
                      ? errors["lastName"]
                      : ""
                  }
                  classes={{ root: !errors["lastName"] && classes.root }}
                  component={TextField}
                  size="small"
                  style={{ width: '70%' }}

                />
              </div>}
              {(
                <>
                  {/* Enter Unique Number  */}
                  <OverlaySpinner
                    loading={isFetchingID}
                    spinnerStyle='overlay-spinner'
                    content=
                    {formFields.uniqueNumber.display && <div className={styles["uniqueIdentityDiv"]}>
                      <h2>{translate(`${CURRENT_SCREEN}.uniqueNumber`)}</h2>
                      {(uniqueIdentityVerificationFailedError === 'SSN format is invalid' ||
                        uniqueIdentityVerificationFailedError === 'Invalid TRN') && (
                        <div className={`${styles["uniqueIdentityVerificationFailedError"]} ${styles["width-70"]}`}>
                          {translate(`${CURRENT_SCREEN}.uniqueNumberFormatInvalid`)}
                        </div>
                      )}
                      {(uniqueIdentityVerificationFailedError === 'SSN already exist' || 
                        uniqueIdentityVerificationFailedError === 'TRN already exist') && (
                        <div className={`${styles["uniqueIdentityVerificationFailedError"]} ${styles["width-70"]}`}>
                          {translate(`${CURRENT_SCREEN}.uniqueNumberAlreadyExists`)}
                        </div>
                      )}
                      {uniqueIdentityVerificationFailedError === 'Unique Identity number already exist' && (
                        <div className={`${styles["uniqueIdentityVerificationFailedError"]} ${styles["width-70"]}`}>
                          {translate(`${CURRENT_SCREEN}.uniqueNumberAlreadyExists`)}
                        </div>
                      )}
                      {(uniqueIdentityVerificationFailedError === HTTP_STATUS.BAD_REQUEST || uniqueIdentityVerificationFailedError === HTTP_STATUS.FORBIDDEN) && (
                        <div className={`${styles["uniqueIdentityVerificationFailedError"]} ${styles["width-70"]}`}>
                          {translate(`${CURRENT_SCREEN}.apiFailure`)}
                          {clearFormField("uniqueIdentity")}
                          {clearFormField("uniqueIdentityConfirm")}
                        </div>
                      )}
                      {uniqueIdentityVerificationFailedError === ' Aadhaar Failed. Profile was Inactivated' && (
                        <div className={`${styles["uniqueIdentityVerificationFailedError"]} ${styles["width-70"]}`}>
                          {translate(`${CURRENT_SCREEN}.uniqueIdProfileInactivation`)}
                          {handleTimeout()}
                        </div>
                      )}
                      {uniqueIdentityVerificationFailedError === 'AADHAR Number not matched with Digiloker' && (
                        <div className={`${styles["uniqueIdentityVerificationFailedError"]} ${styles["width-70"]}`}>
                          {translate(`${CURRENT_SCREEN}.uniqueNumberValidationDoesNotMatch`)}
                          {uniqueIdentityData.remainingAttempts + `${translate(`${CURRENT_SCREEN}.attemptsRemaining`)}`}
                          {/* Clear the values if the verification fails */}
                          {clearFormField("uniqueIdentity")}
                          {clearFormField("uniqueIdentityConfirm")}
                        </div>)}
                      {uniqueIdentityVerificationFailedError === 'AADAHR Number Validation Failed' && (
                        <div className={`${styles["uniqueIdentityVerificationFailedError"]} ${styles["width-70"]}`}>
                          {translate(`${CURRENT_SCREEN}.uniqueNumberValidationFailed`)}
                          {uniqueIdentityData.remainingAttempts + `${translate(`${CURRENT_SCREEN}.attemptsRemaining`)}`}
                          {/* Clear the values if the verification fails */}
                          {clearFormField("uniqueIdentity")}
                          {clearFormField("uniqueIdentityConfirm")}
                        </div>
                      )}
                      <div className={`${styles["unique-number-inputs-wrapper"]} ${uniqueIdentityData.isPrimaryUniqueIdValid && styles["disabled-input-field"]} `}>
                        <Field
                          id="uniqueIdentity"
                          name="uniqueIdentity"
                          //format={formFields.uniqueNumber.validation.pattern}
                          type="password"
                          onPaste={handlePaste}
                          autoComplete="off"
                          disabled={uniqueIdentityData.isPrimaryUniqueIdValid}
                          validate={(value) =>

                            touched["uniqueIdentity"] && uniqueIdentityChanged
                              ? value !== undefined && value.length == formFields.uniqueNumber.length && asyncValidateUniqueId(value, formFields.uniqueNumber.validation.pattern, translate, agentId, formFields.uniqueNumber.verification.duplicateAPI)
                              : persistError(errors["uniqueIdentity"])


                          }
                          onChange={(e) => {
                            clearUniqueIdenityVerificationErrorMessage()
                            setSaving(false)
                            setUniqueIdentityChanged(true);
                            if (
                              formHelpers.isUniqueIdValid(e.target.value, formFields.uniqueNumber.validation.patternType, formFields.uniqueNumber.length)
                            ) {
                              setRecent(e.nativeEvent.srcElement.id);
                              handleChange(e);
                              if (!touched["uniqueIdentity"]) {
                                setFieldTouched(
                                  e.nativeEvent.srcElement.id,
                                  true,
                                  true
                                );
                              } else {
                                setRecent("");
                              }
                            }
                          }}
                          onBlur={(e) => {
                            setRecent(e.nativeEvent.srcElementid);
                            if (!touched["uniqueIdentity"]) {
                              setFieldTouched(
                                e.nativeEvent.srcElement.id,
                                true,
                                true
                              );
                            } else {
                              setRecent("");
                            }
                          }}
                          error={errors["uniqueIdentity"] && touched["uniqueIdentity"] ? true : false}
                          fullWidth
                          value={values.uniqueIdentity}
                          label={
                            formFields.uniqueNumber.required
                              ? translate(`${CURRENT_SCREEN}.uniqueNumber`) + translate(`${CURRENT_SCREEN}.requiredMessage`)
                              : translate(`${CURRENT_SCREEN}.uniqueNumber`)
                          }
                          variant="outlined"
                          classes={{
                            root:
                              !(errors["uniqueIdentity"] && touched["uniqueIdentity"]) &&
                              classes.root
                          }}
                          component={TextField}
                          size="small"

                        />
                        {errors['uniqueIdentity'] && touched['uniqueIdentity'] && <div style={errorStyle}> <ErrorMessage name="uniqueIdentity" /></div>}
                      </div>


                      {/* Confirm Unique Number */}
                      <div className={`${styles['secondary-Unique-number-confirm-inputs-wrapper']} ${uniqueIdentityData.isPrimaryUniqueIdValid && styles["disabled-confirm-input-field"]} ${styles['verified-status']} `}>
                        <Field
                          id="uniqueIdentityConfirm"
                          name="uniqueIdentityConfirm"
                          type="password"
                          onPaste={handlePaste}
                          disabled={uniqueIdentityData.isPrimaryUniqueIdValid}
                          autoComplete="off"
                          onChange={(e) => {
                            if (
                              formHelpers.isUniqueIdValid(e.target.value, formFields.uniqueNumber.validation.patternType, formFields.uniqueNumber.length)
                            ) {
                              handleChange(e);
                              setUniqueIdentityChanged(false);
                              if (!touched["uniqueIdentityConfirm"]) {
                                setFieldTouched(
                                  e.nativeEvent.srcElement.id,
                                  true,
                                  true
                                );
                              }
                            }

                          }}
                          validate={(value) =>
                            validateConfirmSsn(value, values.uniqueIdentity, translate)
                          }

                          onBlur={(e) => {
                            setRecent(e.nativeEvent.srcElementid);
                            validateConfirmSsn(e.target.value, values.uniqueIdentity, translate,)
                            if (!touched["uniqueIdentityConfirm"]) {
                              setFieldTouched(
                                e.nativeEvent.srcElement.id,
                                true,
                                true
                              );
                            } else {
                              setRecent("");
                            }
                          }}

                          error={
                            errors["uniqueIdentityConfirm"] && touched['uniqueIdentityConfirm']
                              ? true
                              : false
                          }
                          fullWidth
                          value={values.uniqueIdentityConfirm}
                          label={
                            formFields.confirmUniqueNumber.required
                              ? translate(`${CURRENT_SCREEN}.confirmUniqueNumber`) + translate(`${CURRENT_SCREEN}.requiredMessage`)
                              : translate(`${CURRENT_SCREEN}.confirmUniqueNumber`)
                          }
                          variant="outlined"
                          // helperText={errors['uniqueIdentityConfirm'] && touched['uniqueIdentityConfirm'] ? errors['uniqueIdentityConfirm'] : ''}
                          classes={{
                            root:
                              !(errors["uniqueIdentityConfirm"] && touched["uniqueIdentityConfirm"]) &&
                              classes.root
                          }}
                          component={TextField}
                          style={uniqueIdentityData.isPrimaryUniqueIdValid ? { background: '#f8f9fa', width: '70%' } : { width: '70%' }}
                          size="small"
                        />
                        {uniqueIdentityData.isPrimaryUniqueIdValid && <div className={`left-spacing`} ><img src={verified} className={styles["verified-icon"]} /><span> {translate(`${CURRENT_SCREEN}.verified`)}</span></div>}
                      </div>

                      {errors['uniqueIdentityConfirm'] && touched['uniqueIdentityConfirm'] && <div style={errorStyle}> <ErrorMessage name="uniqueIdentityConfirm" /></div>}
                      {formFields.uniqueNumber.uniqueIdVerification === "SpringVerify" && !!uniqueIdentityData.redirection_url && !uniqueIdentityData.isPrimaryUniqueIdValid && showPrimaryIDVerifyButton &&
                        < div className="vertical-spacing-1">
                          <spotifyButton
                            color="primary"
                            size="medium-2"
                            onClick={() => validatePrimaryUniqueIdentifier(uniqueIdentityData.redirection_url)}
                            disabled={!values.uniqueIdentity ||
                              !values.uniqueIdentityConfirm ||
                              errors.uniqueIdentity ||
                              errors.uniqueIdentityConfirm || !uniqueIdentityData.redirection_url}
                          >
                            {/* <a className={`${styles["verifyButton"]}`} onClick={() => secondaryUniqueIdValid()}>Verify</a> */}

                            {" "}
                            {translate(`${CURRENT_SCREEN}.verifyButton`)}
                          </spotifyButton></div>

                      }

                      {formFields.uniqueNumber.uniqueIdVerification === "SpringVerify" && values.uniqueIdentity &&
                        values.uniqueIdentityConfirm &&
                        !errors.uniqueIdentity &&
                        !errors.uniqueIdentityConfirm &&
                        uniqueIdentityData.redirection_url && !showPrimaryIDVerifyButton &&
                        <div className="vertical-spacing-1">
                          <div className={`${styles["status-message"]}`}>{translate(`${CURRENT_SCREEN}.statusCheck`)}</div>
                          <spotifyButton
                            color="primary"
                            size="medium-2"
                            onClick={() => PrimaryUniqueIdVerified(agentId, uniqueIdentityData.personId, uniqueIdentityData.requestId, values.uniqueIdentity, values.firstName, values.lastName)}
                            disabled={!values.uniqueIdentity ||
                              !values.uniqueIdentityConfirm ||
                              errors.uniqueIdentity ||
                              errors.uniqueIdentityConfirm}
                          >
                            {/* <a className={`${styles["verifyButton"]}`} onClick={() => secondaryUniqueIdValid()}>Verify</a> */}

                            {" "}
                            {translate(`${CURRENT_SCREEN}.refreshButton`)}
                          </spotifyButton>
                        </div>

                      }
                    </div>}
                  />

                  {/* Enter  Secondary Unique Number  */}

                  {/* <h2>{translate(formFields.secondaryUniqueNumber.display)}</h2> */}
                  <OverlaySpinner
                    loading={isFetchingSecondaryID}
                    spinnerStyle='overlay-spinner'
                    content={formFields.secondaryUniqueNumber.display && <div className={`${styles["uniqueIdentityDiv"]}`}>
                      <h2 className={formFields.uniqueNumber.uniqueIdVerification === "SpringVerify" && (isSecondaryIDVerified || !uniqueIdentityData.isPrimaryUniqueIdValid) && styles["disable-header"]}>{translate(`${CURRENT_SCREEN}.secondaryUniqueNumber`)}</h2>
                      {secondaryUniqueIdentityVerificationFailedError === 'Secondary Unique Identity number already exist' && (
                        <div className={`${styles["secondaryUniqueIdentityVerificationFailedError"]} ${styles["width-70"]}`}>
                          {translate(`${CURRENT_SCREEN}.secondaryUniqueNumberAlreadyExists`)}
                        </div>
                      )}
                      {(secondaryUniqueIdentityVerificationFailedError === HTTP_STATUS.BAD_REQUEST || secondaryUniqueIdentityVerificationFailedError === HTTP_STATUS.FORBIDDEN) && (
                        <div className={`${styles["secondaryUniqueIdentityVerificationFailedError"]} ${styles["width-70"]}`}>
                          {translate(`${CURRENT_SCREEN}.apiFailure`)}
                          {clearFormField("secondaryUniqueIdentity")}
                          {clearFormField("secondaryUniqueIdentityConfirm")}
                        </div>
                      )}
                      {secondaryUniqueIdentityVerificationFailedError === 'PAN Validation Failed. Profile was Inactivated' && (
                        <div className={`${styles["secondaryUniqueIdentityVerificationFailedError"]} ${styles["width-70"]}`}>
                          {translate(`${CURRENT_SCREEN}.scondaryUniqueIdProfileInactivation`)}
                          {handleTimeout()}
                        </div>
                      )}
                      {(secondaryUniqueIdentityVerificationFailedError === 'PAN Validation Failed' || secondaryUniqueIdentityVerificationFailedError === 'Record Not Found ( Combination of Pan Number, Name & DOB ) ') && (
                        <div className={`${styles["secondaryUniqueIdentityVerificationFailedError"]} ${styles["width-70"]}`}>
                          {translate(`${CURRENT_SCREEN}.secondaryUniqueNumberValidationFailed`)}
                          {remainingSecondaryIdAttempts + `${translate(`${CURRENT_SCREEN}.attemptsRemaining`)}`}
                          {/* Clear the values if the verification fails */}
                          {clearFormField("secondaryUniqueIdentity")}
                          {clearFormField("secondaryUniqueIdentityConfirm")}
                        </div>
                      )}
                      <div className={`${styles["unique-number-inputs-wrapper"]} ${isSecondaryIDVerified && styles["disabled-input-field"]} `}>
                        <Field
                          id="secondaryUniqueIdentity"
                          name="secondaryUniqueIdentity"
                          type="password"
                          onPaste={handlePaste}
                          autoComplete="off"
                          disabled={formFields.uniqueNumber.uniqueIdVerification === "SpringVerify" && (isSecondaryIDVerified || !uniqueIdentityData.isPrimaryUniqueIdValid)}

                          validate={(value) =>
                            touched["secondaryUniqueIdentity"] && secondaryUniqueIdentityChanged
                              ? value !== undefined && value.length == formFields.secondaryUniqueNumber.length && asyncValidateSecondaryUniqueId(value, formFields.secondaryUniqueNumber.validation.pattern, translate, agentId)
                              : null

                          }
                          onChange={(e) => {
                            clearSecondaryUniqueIdenityVerificationErrorMessage()
                            setUniqueIdentityChanged(false);
                            setSecondaryUniqueIdentityChanged(true);
                            setSaving(false)
                            if (
                              formHelpers.isUniqueIdValid(e.target.value, formFields.secondaryUniqueNumber.validation.patternType, formFields.secondaryUniqueNumber.length)
                            ) {
                              setRecent(e.nativeEvent.srcElement.id);
                              handleChange(e);
                              if (!touched["secondaryUniqueIdentity"]) {
                                setFieldTouched(
                                  e.nativeEvent.srcElement.id,
                                  true,
                                  true
                                );
                              } else {
                                setRecent("");
                              }
                            }
                          }}
                          onBlur={(e) => {
                            setRecent(e.nativeEvent.srcElementid);
                            if (!touched["secondaryUniqueIdentity"]) {
                              setFieldTouched(
                                e.nativeEvent.srcElement.id,
                                true,
                                true
                              );
                            } else {
                              setRecent("");
                            }
                          }}
                          error={errors["secondaryUniqueIdentity"] && touched["secondaryUniqueIdentity"] ? true : false}
                          fullWidth
                          value={values.secondaryUniqueIdentity}
                          label={
                            formFields.secondaryUniqueNumber.required
                              ? translate(`${CURRENT_SCREEN}.secondaryUniqueNumber`) + translate(`${CURRENT_SCREEN}.requiredMessage`)
                              : translate(`${CURRENT_SCREEN}.secondaryUniqueNumber`)
                          }
                          variant="outlined"
                          classes={{
                            root:
                              !(errors["secondaryUniqueIdentity"] && touched["secondaryUniqueIdentity"]) &&
                              classes.root
                          }}
                          component={TextField}
                          size="small"
                        />
                        {errors['secondaryUniqueIdentity'] && touched['secondaryUniqueIdentity'] && <div style={errorStyle}> <ErrorMessage name="secondaryUniqueIdentity" /></div>}
                      </div>



                      {/* Confirm Secondary Unique Number */}
                      <div className={`${styles['secondary-Unique-number-confirm-inputs-wrapper']} ${isSecondaryIDVerified && styles["disabled-confirm-input-field"]} ${styles['verified-status']} `}>
                        <Field
                          id="secondaryUniqueIdentityConfirm"
                          name="secondaryUniqueIdentityConfirm"
                          type="password"
                          onPaste={handlePaste}
                          disabled={formFields.uniqueNumber.uniqueIdVerification === "SpringVerify" && (isSecondaryIDVerified || !uniqueIdentityData.isPrimaryUniqueIdValid)}
                          autoComplete="off"
                          onChange={(e) => {
                            setUniqueIdentityChanged(false)
                            setSecondaryUniqueIdentityChanged(false);
                            if (
                              formHelpers.isUniqueIdValid(e.target.value, formFields.secondaryUniqueNumber.validation.patternType, formFields.secondaryUniqueNumber.length)
                            ) {
                              handleChange(e);
                              if (!touched["secondaryUniqueIdentityConfirm"]) {
                                setFieldTouched(
                                  e.nativeEvent.srcElement.id,
                                  true,
                                  true
                                );
                              }
                            }
                          }}
                          validate={(value) =>
                            validateSecondaryConfirmSsn(value, values.secondaryUniqueIdentity, translate)
                          }
                          onBlur={(e) => {
                            setRecent(e.nativeEvent.srcElementid);
                            validateSecondaryConfirmSsn(e.target.value, values.secondaryUniqueIdentity, translate)
                            if (!touched["secondaryUniqueIdentityConfirm"]) {
                              setFieldTouched(
                                e.nativeEvent.srcElement.id,
                                true,
                                true
                              );
                            } else {
                              setRecent("");
                            }
                          }}
                          error={
                            errors["secondaryUniqueIdentityConfirm"] && touched["secondaryUniqueIdentityConfirm"]
                              ? true
                              : false
                          }
                          fullWidth
                          value={values.secondaryUniqueIdentityConfirm}
                          label={
                            formFields.confirmSecondaryUniqueNumber.required
                              ? translate(`${CURRENT_SCREEN}.confirmSecondaryUniqueNumber`) + translate(`${CURRENT_SCREEN}.requiredMessage`)
                              : translate(`${CURRENT_SCREEN}.confirmSecondaryUniqueNumber`)
                          }
                          variant="outlined"
                          //helperText={errors['secondaryUniqueIdentityConfirm'] && touched['secondaryUniqueIdentityConfirm'] ? errors['secondaryUniqueIdentityConfirm'] : ''}
                          classes={{
                            root:
                              !(errors["secondaryUniqueIdentityConfirm"] && touched["secondaryUniqueIdentityConfirm"]) &&
                              classes.root
                          }}
                          component={TextField}
                          style={isSecondaryIDVerified ? { background: '#f8f9fa', width: '70%' } : { width: '70%' }}
                          size="small"
                        />
                        {isSecondaryIDVerified && <div className={`left-spacing`} ><img src={verified} className={styles["verified-icon"]} /><span>{translate(`${CURRENT_SCREEN}.verified`)}</span></div>}

                      </div>
                      {errors['secondaryUniqueIdentityConfirm'] && touched['secondaryUniqueIdentityConfirm'] && <div style={errorStyle}> <ErrorMessage name="secondaryUniqueIdentityConfirm" /></div>}
                      {formFields.uniqueNumber.uniqueIdVerification === "SpringVerify" && !isSecondaryIDVerified && verifySecondaryUniqueIdentityLink &&
                        < div className="vertical-spacing-1">
                          <spotifyButton
                            color="primary"
                            size="medium-2"
                            onClick={secondaryUniqueIdValid}
                            disabled={!values.secondaryUniqueIdentity ||
                              !values.secondaryUniqueIdentityConfirm ||
                              errors.secondaryUniqueIdentity ||
                              errors.secondaryUniqueIdentityConfirm}
                          >
                            {/* <a className={`${styles["verifyButton"]}`} onClick={() => secondaryUniqueIdValid()}>Verify</a> */}

                            {" "}
                            {translate(`${CURRENT_SCREEN}.verifyButton`)}
                          </spotifyButton></div>

                      }
                    </div>} />

                  {/* {Checkbox for GST} */}
                  {formFields.individualTaxIdConsentCheckBox.display && displayIndiviualTaxId && <div className={` ${styles['tos-inputs-wrapper']} ${commonStyle['common_ValidationPageWidth']} ${commonStyle['lastComponent']}`}>
                    <input
                      id="indiviualTaxIdCheckBox"
                      name='indiviualTaxIdCheckBox'
                      type='checkbox'
                      className={styles['checkbox-input']}
                      checked={isCheckboxChecked}
                      onChange={() => { handleCheckboxChange({ open: !isCheckboxChecked && true, ticked: !isCheckboxChecked ? true : false }) }}
                      error={errors["indiviualTaxIdCheckBox"] && touched["indiviualTaxIdCheckBox"] ? true : false}
                    />

                    <span style={{ color: '#00827E ', fontSize: '13px' }} className={`${commonStyle['lightFont']} ${commonStyle['largeCaptions']}`}>
                      <strong>{translate(`${CURRENT_SCREEN}.indiviualTaxIdCheckBox`)}</strong>
                      {!isCheckboxChecked && (touched['indiviualTaxIdCheckBox'] && <div style={errorStyle}> <ErrorMessage name="indiviualTaxIdCheckBox" />{translate(`${CURRENT_SCREEN}.fieldRequired`)}</div>)}
                    </span>

                  </div>}

                  {/* Edit Name & Next Button */}
                  <div
                    className={`row float-right mr-1 ${commonStyle["lastComponent5"]} ${styles["left-35"]}`}

                  >
                    <div className={` ${styles["alignright"]}`}>
                      <button
                        className={`ml-3 btn btn-outline-primary ${styles["edit-button"]}`}
                        type="button"
                        onClick={() => setEdit(true)}
                        disabled={isSecondaryIDVerified || uniqueIdentityData.isPrimaryUniqueIdValid}
                      >
                        {translate(`${CURRENT_SCREEN}.editNameButton`)}
                      </button>
                    </div>
                    <div className={`ml-3 `}>
                      <Button
                        size="medium"
                        color="orange"
                        type="submit"
                        isSubmitting={uniqueIdSubmitting}

                        id={btnNextId}
                      >
                        {translate(`${CURRENT_SCREEN}.nextButton`)}
                      </Button>
                    </div>
                  </div>

                </>
              )}
              <br />
            </Form>
          </div>
          <Modal
            width={800}
            open={showIndiviualTaxModalIsOpen}
            onCancel={handleModalChange}
            footer={null}
          >
            <h2>{translate(`${CURRENT_SCREEN}.indiviualTaxIdCheckBoxModalHeding`)}</h2>
            {translate(`${CURRENT_SCREEN}.indiviualTaxIdCheckBoxModalDescription`)}
            {translate(`${CURRENT_SCREEN}.indiviualTaxIdCheckBoxModalContent`)}
            <br />
            <div className={`${styles["agreeButtonGroup"]}`}>
              <Button onClick={() => handleCheckboxChange({ open: false, ticked: true })}>{translate(`${CURRENT_SCREEN}.agreeButton`)}</Button>
              <Button onClick={() => handleCheckboxChange({ open: false, ticked: false })} style={{ background: '#fb5151', borderColor: "#fb5151" }}>{translate(`${CURRENT_SCREEN}.declineButton`)}</Button>
            </div>

          </Modal>
        </>
      )
      }
    </Translate >
  );
};

export default UniqueIdForm;




// {displayTaxIdNumber && <OverlaySpinner
//   loading={false}
//   spinnerStyle='overlay-spinner'
//   content={formFields.individualTaxIdNumber.display && <div className={`${styles["uniqueIdentityDiv"]}`}>
//     <h2 className={formFields.uniqueNumber.uniqueIdVerification==="SpringVerify" && (isIndividualTaxIDVerified || !isSecondaryIDVerified) && styles["disable-header"]}>{translate(`${CURRENT_SCREEN}.individualTaxIdNumber`)}</h2>
//     {/* {secondaryUniqueIdentityVerificationFailedError === 'Secondary Unique Identity number already exist' && (
//       <div className={`${styles["secondaryUniqueIdentityVerificationFailedError"]} ${styles["width-70"]}`}>
//         {translate(`${CURRENT_SCREEN}.secondaryUniqueNumberAlreadyExists`)}
//       </div>
//     )} */}
//     {/* {(secondaryUniqueIdentityVerificationFailedError === HTTP_STATUS.BAD_REQUEST || secondaryUniqueIdentityVerificationFailedError === HTTP_STATUS.FORBIDDEN) && (
//       <div className={`${styles["secondaryUniqueIdentityVerificationFailedError"]} ${styles["width-70"]}`}>
//         {translate(`${CURRENT_SCREEN}.apiFailure`)}
//         {clearFormField("secondaryUniqueIdentity")}
//         {clearFormField("secondaryUniqueIdentityConfirm")}
//       </div>
//     )} */}
//     {/* {secondaryUniqueIdentityVerificationFailedError === 'PAN Validation Failed. Profile was Inactivated' && (
//       <div className={`${styles["secondaryUniqueIdentityVerificationFailedError"]} ${styles["width-70"]}`}>
//         {translate(`${CURRENT_SCREEN}.scondaryUniqueIdProfileInactivation`)}
//         {handleTimeout()}
//       </div>
//     )} */}
//     {//(secondaryUniqueIdentityVerificationFailedError === 'PAN Validation Failed' || secondaryUniqueIdentityVerificationFailedError === 'Record Not Found ( Pan Number ) ') && (
//       // <div className={`${styles["secondaryUniqueIdentityVerificationFailedError"]} ${styles["width-70"]}`}>
//       //   {translate(`${CURRENT_SCREEN}.secondaryUniqueNumberValidationFailed`)}
//       //   {remainingSecondaryIdAttempts + `${translate(`${CURRENT_SCREEN}.attemptsRemaining`)}`}
//       //   {/* Clear the values if the verification fails */}
//       //   {clearFormField("secondaryUniqueIdentity")}
//       //   {clearFormField("secondaryUniqueIdentityConfirm")}
//       // </div>
//       //)}
//     }
// <div className={`${styles["unique-number-inputs-wrapper"]} ${isIndividualTaxIDVerified && styles["disabled-input-field"]} `}>
//   <Field
//     id="individualTaxIdentity"
//     name="individualTaxIdentity"
//     type="password"
//     onPaste={handlePaste}
//     autoComplete="off"
//     disabled={formFields.uniqueNumber.uniqueIdVerification==="SpringVerify" && (isIndividualTaxIDVerified || !isSecondaryIDVerified)}

//     validate={(value) =>
//       touched["individualTaxIdentity"] && individualTaxIdChanged
//         ? value !== undefined && value.length == formFields.individualTaxIdNumber.length && asyncValidateIndiviualTaxId(value, formFields.individualTaxIdNumber.validation.pattern, translate, agentId)
//         : null

//     }
//     onChange={(e) => {
//       clearSecondaryUniqueIdenityVerificationErrorMessage()
//       setUniqueIdentityChanged(false);
//       setSecondaryUniqueIdentityChanged(false);
//       setIndividualTaxIdChanged(true)
//       setSaving(false)
//       if (
//         formHelpers.isUniqueIdValid(e.target.value, formFields.individualTaxIdNumber.validation.patternType, formFields.individualTaxIdNumber.length)
//       ) {
//         setRecent(e.nativeEvent.srcElement.id);
//         handleChange(e);
//         if (!touched["individualTaxIdentity"]) {
//           setFieldTouched(
//             e.nativeEvent.srcElement.id,
//             true,
//             true
//           );
//         } else {
//           setRecent("");
//         }
//       }
//     }}
//     onBlur={(e) => {
//       setRecent(e.nativeEvent.srcElementid);
//       if (!touched["individualTaxIdentity"]) {
//         setFieldTouched(
//           e.nativeEvent.srcElement.id,
//           true,
//           true
//         );
//       } else {
//         setRecent("");
//       }
//     }}
//     error={errors["individualTaxIdentity"] && touched["individualTaxIdentity"] ? true : false}
//     fullWidth
//     value={values.individualTaxIdentity}
//     label={
//       formFields.individualTaxIdNumber.required
//         ? translate(`${CURRENT_SCREEN}.individualTaxIdNumber`) + translate(`${CURRENT_SCREEN}.requiredMessage`)
//         : translate(`${CURRENT_SCREEN}.individualTaxIdNumber`)
//     }
//     variant="outlined"
//     classes={{
//       root:
//         !(errors["individualTaxIdentity"] && touched["individualTaxIdentity"]) &&
//         classes.root
//     }}
//     component={TextField}
//     size="small"
//   />
//     {errors['individualTaxIdentity'] && touched['individualTaxIdentity'] && <div style={errorStyle}> <ErrorMessage name="individualTaxIdentity" /></div>}
//   </div>



//   {/* Confirm Tax Id  Unique Number */}
//   <div className={`${styles['secondary-Unique-number-confirm-inputs-wrapper']} ${isIndividualTaxIDVerified && styles["disabled-confirm-input-field"]} ${styles['verified-status']} `}>
//     <Field
//       id="individualTaxIdentityConfirm"
//       name="individualTaxIdentityConfirm"
//       type="password"
//       onPaste={handlePaste}
//       disabled={formFields.uniqueNumber.uniqueIdVerification ==="SpringVerify" && (isIndividualTaxIDVerified || !isSecondaryIDVerified)}
//       autoComplete="off"
//       onChange={(e) => {
//         setUniqueIdentityChanged(false)
//         setSecondaryUniqueIdentityChanged(false);
//         setIndividualTaxIdChanged(false);
//         if (
//           formHelpers.isUniqueIdValid(e.target.value, formFields.individualTaxIdNumber.validation.patternType, formFields.individualTaxIdNumber.length)
//         ) {
//           handleChange(e);
//           if (!touched["individualTaxIdentityConfirm"]) {
//             setFieldTouched(
//               e.nativeEvent.srcElement.id,
//               true,
//               true
//             );
//           }
//         }
//       }}
//       validate={(value) =>
//         validateIndividualTaxIdConfirmSsn(value, values.individualTaxIdentity, translate)
//       }
//       onBlur={(e) => {
//         setRecent(e.nativeEvent.srcElementid);
//         validateIndividualTaxIdConfirmSsn(e.target.value, values.individualTaxIdentity, translate)
//         if (!touched["individualTaxIdentityConfirm"]) {
//           setFieldTouched(
//             e.nativeEvent.srcElement.id,
//             true,
//             true
//           );
//         } else {
//           setRecent("");
//         }
//       }}
//       error={
//         errors["individualTaxIdentityConfirm"] && touched["individualTaxIdentityConfirm"]
//           ? true
//           : false
//       }
//       fullWidth
//       value={values.individualTaxIdentityConfirm}
//       label={
//         formFields.confirmSecondaryUniqueNumber.required
//           ? translate(`${CURRENT_SCREEN}.confirmIndividualTaxIdNumber`) + translate(`${CURRENT_SCREEN}.requiredMessage`)
//           : translate(`${CURRENT_SCREEN}.confirmIndividualTaxIdNumber`)
//       }
//       variant="outlined"
//       //helperText={errors['individualTaxIdentityConfirm'] && touched['individualTaxIdentityConfirm'] ? errors['individualTaxIdentityConfirm'] : ''}
//       classes={{
//         root:
//           !(errors["individualTaxIdentityConfirm"] && touched["individualTaxIdentityConfirm"]) &&
//           classes.root
//       }}
//       component={TextField}
//       style={isIndividualTaxIDVerified ? { background: '#f8f9fa', width: '70%' } : { width: '70%' }}
//       size="small"
//     />
//     {isIndividualTaxIDVerified && <div className={`left-spacing`} ><img src={verified} className={styles["verified-icon"]} /><span>{translate(`${CURRENT_SCREEN}.verified`)}</span></div>}

//   </div>
//   {errors['individualTaxIdentityConfirm'] && touched['individualTaxIdentityConfirm'] && <div style={errorStyle}> <ErrorMessage name="individualTaxIdentityConfirm" /></div>}
//   {formFields.uniqueNumber.uniqueIdVerification ==="SpringVerify" && !isIndividualTaxIDVerified && verifyIndividualTaxId &&
//     < div className="vertical-spacing-1">
//       <spotifyButton
//         color="primary"
//         size="medium-2"
//         onClick={secondaryUniqueIdValid}
//         disabled={!values.individualTaxIdentity ||
//           !values.individualTaxIdentityConfirm ||
//           errors.individualTaxIdentity ||
//           errors.individualTaxIdentityConfirm}
//       >
//         {/* <a className={`${styles["verifyButton"]}`} onClick={() => secondaryUniqueIdValid()}>Verify</a> */}

//         {" "}
//         {translate(`${CURRENT_SCREEN}.verifyButton`)}
//       </spotifyButton></div>

//   }
// </div>} />}


