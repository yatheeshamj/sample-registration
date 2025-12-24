import React from "react";
import { Field, Form, ErrorMessage } from "formik";
import styles from "./SsnForm.module.scss";
import { Translate } from "spotify-shared-web/localize";
import Button from "spotify-shared-web/components/common/Button";
import formHelpers from "spotify-shared/helpers/formHelpers";
import TextField from "@material-ui/core/TextField";
import { useInputStyles } from "../../../styles";

import { asyncValidateSsn, validateConfirmSsn } from "./customValidation";
import { CollectionsBookmark } from "@material-ui/icons";
import commonStyle from "../../../../src/components/shared/CommonStyle.module.scss";
import SCREEN_CONFIG from "../../../screensConfig";

const CURRENT_SCREEN = SCREEN_CONFIG.uniqueIdentification;

const SsnForm = ({
  errors,
  touched,
  values,
  handleChange,
  setFieldTouched,
  uniqueIdentity,
  handleRestartClick,
  restartText,
  btnNextId,
  recent,
  setRecent,
  setEdit,
  hideSSNFields = false,
  changeTypeBtnId = "btnSSNChangeContractorType",
}) => {
  const classes = useInputStyles();

  function validateText(text) {
    let error;
    if (!text) return "Required";
    return error;
  }

  const errorStyle = {
    marginBottom: "10px",
    fontSize: "12px",
    color: "red"
  }


  return (
    <Translate>
      {({ translate }) => (
        <>
          <div className={`${commonStyle["lastComponent"]}`}>
            <Form>
              {uniqueIdentity.error ? (
                <div className={styles["server-error"]}>{uniqueIdentity.error}</div>
              ) : null}

              <div
                className={`${styles["firstname-inputs-wrapper"]} ${commonStyle["formColStyle"]}`}
              >
                <Field
                  id="firstName"
                  name="firstName"
                  type="string"
                  autoComplete="off"
                  validate={validateText}
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
                  size="small"
                />
              </div>
              <div className={`${styles["lastname-inputs-wrapper"]}`}>
                <Field
                  id="lastName"
                  name="lastName"
                  type="string"
                  autoComplete="off"
                  validate={validateText}
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
                  //label={`${translate("Last Name")} *`}
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
                />
              </div>
              {hideSSNFields !== true && (
                <>
                  <div className={styles["ssn-inputs-wrapper"]}>
                    <Field
                      id="uniqueIdentity"
                      name="uniqueIdentity"
                      type="password"
                      autoComplete="off"
                      validate={
                        recent === "uniqueIdentity" && touched["uniqueIdentity"]
                          ? asyncValidateSsn
                          : () => { }
                      }
                      onChange={(e) => {
                        if (
                          formHelpers.isValueNumber(e.target.value) &&
                          e.target.value.length <= 9
                        ) {
                          setRecent(e.nativeEvent.srcElement.id);
                          handleChange(e);
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
                      label={translate(`${CURRENT_SCREEN}.uniqueNumber`)}
                      variant="outlined"
                      //helperText={errors['uniqueIdentity'] && touched['uniqueIdentity'] ? errors['uniqueIdentity'] : ''}
                      classes={{ root: !errors["uniqueIdentity"] && classes.root }}
                      component={TextField}
                      size="small"
                    />
                  </div>
                  <div className={styles["ssn-confirm-inputs-wrapper"]}>
                    <Field
                      id="uniqueIdentityConfirm"
                      name="uniqueIdentityConfirm"
                      type="password"
                      autoComplete="off"
                      onChange={(e) => {
                        if (
                          formHelpers.isValueNumber(e.target.value) &&
                          e.target.value.length <= 9
                        ) {
                          setRecent(e.nativeEvent.srcElement.id);
                          handleChange(e);
                        }
                      }}
                      validate={(value) =>
                        validateConfirmSsn(value, values.uniqueIdentity, translate)
                      }
                      error={
                        errors["uniqueIdentityConfirm"] && touched["uniqueIdentityConfirm"]
                          ? true
                          : false
                      }
                      fullWidth
                      value={values.uniqueIdentityConfirm}
                      label={translate(`${CURRENT_SCREEN}.confirmUniqueNumber`)}
                      variant="outlined"
                      //helperText={errors['uniqueIdentityConfirm'] && touched['uniqueIdentityConfirm'] ? errors['uniqueIdentityConfirm'] : ''}
                      classes={{
                        root:
                          !(errors["uniqueIdentityConfirm"] && touched["uniqueIdentityConfirm"]) &&
                          classes.root
                      }}
                      component={TextField}
                      size="small"
                    />
                    {errors['uniqueIdentityConfirm'] && touched['uniqueIdentityConfirm'] && <div style={errorStyle}> <ErrorMessage name="uniqueIdentityConfirm" /></div>}
                  </div>

                  <div
                    className={`row float-right mr-1 ${commonStyle["lastComponent5"]}`}
                  >
                    <div className={` ${styles["alignright"]}`}>
                      <button
                        className={`ml-3 btn btn-outline-primary ${styles["edit-button"]}`}
                        type="button"
                        onClick={() => setEdit(true)}
                      >
                        {translate(`${CURRENT_SCREEN}.editNameButton`)}
                      </button>
                    </div>
                    <div className={`ml-3 `}>
                      <Button
                        size="medium"
                        color="orange"
                        type="submit"
                        disabled={uniqueIdentity.isSubmitting}
                        isSubmitting={uniqueIdentity.isSubmitting}
                        id={btnNextId}
                      >
                        {translate(`${CURRENT_SCREEN}.nextButton`)}
                      </Button>
                    </div>
                  </div>
                </>
              )}
              <br />
              {/*<div className={styles['footer__restart']}>
                        <p>
                            {translate(`${restartText}, or want to look at the other options more closely?`)}{' '}
                            <button
                                id={changeTypeBtnId}
                                type='button'
                                className={styles['restart-button']}
                                onClick={handleRestartClick}
                            >
                                {translate("Change Your Contactor Type")}
                            </button>
                        </p>
                            </div>*/}
            </Form>
          </div>
        </>
      )}
    </Translate>
  );
};

export default SsnForm;
