import React from 'react';
import { Field, Form } from 'formik';
import ReCAPTCHA from 'react-google-recaptcha';
import styles from './ForgotPasswordForm.module.scss';

import Button from 'spotify-shared-web/components/common/Button';

import { GOOGLE_RECAPTCHA_CLIENT_KEY } from '../../config';

const ForgotPasswordForm = ({
    form,
    field,
    errors,
    touched,
    values,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldTouched,
    forgotPassword,
    recaptcha,
    handleReCaptcha
}) => {
    function showError(name) {
        if (errors[name] && touched[name]) {
            return 'input-error';
        }
        return '';
    }

    return (
        <div>
            <Form>
                {forgotPassword.error ? (
                    <div className={styles['server-error']}>{forgotPassword.error}</div>
                ) : null}
                <div className={styles['email-inputs-wrapper']}>
                    <Field
                        name='email'
                        className={`${styles['form-input']} ${styles[showError('email')]}`}
                        placeholder='Email'
                    />
                    {errors['email'] && touched['email'] ? (
                        <div className={styles['message-error']}>{errors['email']}</div>
                    ) : null}
                </div>
                <div className={styles['username-inputs-wrapper']}>
                    <Field
                        name='username'
                        className={`${styles['form-input']} ${
                            styles[showError('username')]
                            }`}
                        placeholder='Username'
                    />
                    {errors['username'] && touched['username'] ? (
                        <div className={styles['message-error']}>{errors['username']}</div>
                    ) : null}
                </div>
                <div className={styles['recaptcha-wrapper']}>
                    <ReCAPTCHA
                        sitekey={GOOGLE_RECAPTCHA_CLIENT_KEY}
                        size='normal'
                        onChange={handleReCaptcha}
                    />
                </div>
                <div className={styles['submit-wrapper']}>
                    <Button
                        type='submit'
                        isSubmitting={forgotPassword.isSubmitting}
                        disabled={!recaptcha.forgotPassword.isRecaptchaVerified}
                    >
                        Submit
          </Button>
                </div>
            </Form>
        </div>
    );
};

export default ForgotPasswordForm;
