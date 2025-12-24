import React from 'react';
import { Field, Form, ErrorMessage } from 'formik';
import styles from './ValidatePhoneForm.module.scss';
import { Translate } from 'spotify-shared-web/localize'
import Button from 'spotify-shared-web/components/common/Button';
import TextField from '@material-ui/core/TextField';
import { useInputStyles } from '../../../../styles';
import commonStyle from '../../../shared/CommonStyle.module.scss';
import SCREEN_CONFIG from "../../../../screensConfig";
import { HTTP_STATUS } from "../../../../constants";

const CURRENT_SCREEN = SCREEN_CONFIG.contactValidation;

const ValidatePhoneForm = ({
    form,
    field,
    errors,
    touched,
    values,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldTouched,
    validateAccount,
    onHandleResendCode,
    isCheckboxChecked,
    handleCheckboxChange
}) => {

    const classes = useInputStyles();
    // const styles1={
    //     marginBottom:"1rem",

    // }

    return (<Translate>
        {({ translate }) => <>
            <div className={`row`}>
                <Form>
                    {validateAccount.validatePhone.error === HTTP_STATUS.CONFLICT ? (
                        <div className={styles['server-error']}>
                            {translate(`${CURRENT_SCREEN}.phoneNumber.invalidCodeErrorMessage`)}
                            {/* {validateAccount.validatePhone.error} */}
                        </div>
                    ) : null}
                    {validateAccount.validatePhone.success === 'Mobile validation code sent' ? (
                        <div className={styles['redirect-message']}>
                            {translate(`${CURRENT_SCREEN}.phoneNumber.mobileValidationCodeSent`)}
                        </div>
                    ) : null}
                    <div className={` ${styles['code-inputs-wrapper']} ${commonStyle['withinComponentMargin']}`} style={{ "height": "2.563rem" }}>
                        <Field
                            error={errors['validationCode'] && touched['validationCode'] ? true : false}
                            classes={{ root: !errors['validationCode'] && classes.root }}
                            FieldInputProps={`${styles['mobile__Validation__InsidePadding']}`}
                            fullWidth
                            id="validationCode"
                            name='validationCode'
                            value={values.validationCode}
                            label={translate(`${CURRENT_SCREEN}.phoneNumber.placeholder`)}
                            variant="outlined"
                            // helperText={errors['validationCode'] && touched['validationCode'] ? errors['validationCode'] : ''}
                            component={TextField}
                            size="small"
                            onChange={(e) => {
                                handleChange(e);
                            }}
                        />
                    </div>
                    {errors['validationCode'] && touched['validationCode'] && <div className={`${styles['error-message']}`}><ErrorMessage name="validationCode" /></div>}
                    <div className={` ${styles['tos-inputs-wrapper']} ${commonStyle['common_ValidationPageWidth']} ${commonStyle['lastComponent']}`}>
                        <input
                            name='age'
                            type='checkbox'
                            className={styles['checkbox-input']}
                            checked={isCheckboxChecked}
                            onChange={handleCheckboxChange}
                        />
                        <p className={`${commonStyle['lightFont']} ${commonStyle['largeCaptions']} ${commonStyle['blackColor']}`}>
                            {translate(`${CURRENT_SCREEN}.phoneNumber.consentCheckBox`)}<span className={`${commonStyle['lightFont']} ${commonStyle['blackColor']} ${styles['short']}`}>{translate(`${CURRENT_SCREEN}.phoneNumber.privacyDisclaimer`)}</span>
                        </p>
                    </div>
                    <div className={` ${styles['align-right']} ${styles['submit-wrapper']}`}>
                        <Button
                            size="medium"
                            color="orange"
                            type='submit'
                            className={`${commonStyle['lastComponent']}`}
                            style={{ "fontSize": "14px", "fontWeight": "600", "fontStyle": "normal", "lineHeight": "14px" }}
                            isSubmitting={validateAccount.validatePhone.isSubmitting}

                        >
                            {translate(`${CURRENT_SCREEN}.nextButton`)}
                        </Button>
                    </div>
                </Form>
            </div>
        </>}
    </Translate>);
};

export default ValidatePhoneForm;
