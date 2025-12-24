import React from 'react';
import { Form } from 'formik';
import styles from './UpdatePhoneForm.module.scss';
import { Translate } from 'spotify-shared-web/localize'
import Button from 'spotify-shared-web/components/common/Button';
import PhoneField from '../../profile/customFieldComponents/PhoneField';
import PhoneFieldUK from '../../profile/customFieldComponents/PhoneFieldUK';
import { COUNTRY_IDS } from '../../../../constants';
import SCREEN_CONFIG from "../../../../screensConfig";
import { HTTP_STATUS } from "../../../../constants";


const CURRENT_SCREEN = SCREEN_CONFIG.contactValidation;


const UpdatePhoneForm = ({
    errors,
    touched,
    values,
    setFieldValue,
    setFieldTouched,
    validateAccount,
    onHandleUpdatePhoneCancel,
    countryId,
    phoneValidations
}) => {
    function showError(name) {
        if (errors[name] && touched[name]) {
            return 'input-error';
        }
        return '';
    }

    return (<Translate>
        {({ translate }) => <>
            <div>
                <Form>
                    {validateAccount.updatePhone.error === HTTP_STATUS.BAD_REQUEST ? (
                        <div className={styles['server-error']}>
                            {translate(`${CURRENT_SCREEN}.phoneNumber.duplicateErrorMessage`)}
                            {/* {validateAccount.updatePhone.error} */}
                        </div>
                    ) : null}
                    <div className={styles['mobile-phone-wrapper']}>

                        <PhoneField
                            name='mobilePhone'
                            value={values.mobilePhone}
                            placeholder={translate(`${CURRENT_SCREEN}.phoneNumber.updatePhonePlaceholder`)}
                            onChange={setFieldValue}
                            onBlur={setFieldTouched}
                            error={errors.mobilePhone}
                            errorClassName={styles['message-error']}
                            touched={touched.mobilePhone}
                            setRecent={() => { }}
                            phoneValidations={phoneValidations}
                            className={`${styles['form-input']} ${styles[showError('mobilePhone')]
                                }`}
                        />
                        {errors['mobilePhone'] && touched['mobilePhone'] ? (
                            <div>{errors['mobilePhone']}</div>
                        ) : null}

                    </div>
                    <div className={styles['submit-wrapper']}>
                        <button
                            onClick={onHandleUpdatePhoneCancel}
                            type='button'
                            className={styles['cancel-button']}
                        >
                            {translate(`${CURRENT_SCREEN}.cancelButton`)}
                        </button>
                        <Button
                            size="wide"
                            type='submit'
                            isSubmitting={validateAccount.updatePhone.isSubmitting}
                        >
                            {translate(`${CURRENT_SCREEN}.saveButton`)}
                        </Button>
                    </div>
                </Form>
            </div>
        </>}
    </Translate>);
};

export default UpdatePhoneForm;
