import React from 'react';
import { Field, Form } from 'formik';
import ReCAPTCHA from 'react-google-recaptcha';
import styles from './ResetPasswordForm.module.scss';

import Button from 'spotify-shared-web/components/common/Button';

import { GOOGLE_RECAPTCHA_CLIENT_KEY } from '../../config';

import privacyOffIcon from '../../assets/images/privacy-off-icon.svg';
import privacyOnIcon from '../../assets/images/privacy-on-icon.svg';

const ResetPasswordForm = ({
  form,
  field,
  errors,
  touched,
  values,
  handleChange,
  handleBlur,
  setFieldValue,
  setFieldTouched,
  resetPassword,
  handlePasswordInputTypeChange,
  passwordInputType,
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
        {resetPassword.error ? (
          <div className={styles['server-error']}>{resetPassword.error}</div>
        ) : null}
        {resetPassword.redirectMessage ? (
          <div className={styles['redirect-message']}>
            {resetPassword.redirectMessage}
          </div>
        ) : null}
        <div className={styles['username-inputs-wrapper']}>
          <Field
            name='username'
            className={`${styles['form-input']} ${styles[showError('username')]
              }`}
            onBlur={() => { }}
            placeholder='Username'
          />
          {errors['username'] && touched['username'] ? (
            <div className={styles['message-error']}>{errors['username']}</div>
          ) : null}
        </div>
        <div className={styles['code-inputs-wrapper']}>
          <Field
            name='validationCode'
            className={`${styles['form-input']} ${styles[showError('validationCode')]
              }`}
            onBlur={() => { }}
            placeholder='Validation Code'
          />
          {errors['validationCode'] && touched['validationCode'] ? (
            <div className={styles['message-error']}>
              {errors['validationCode']}
            </div>
          ) : null}
        </div>
        <div className={styles['password-inputs-wrapper']}>
          <Field
            name='password'
            placeholder='Password'
            className={`${styles['form-input']} ${styles[showError('password')]
              }`}
            type={passwordInputType}
            onBlur={() => { }}
          />
          {errors['password'] && touched['password'] ? (
            <div className={styles['message-error']}>{errors['password']}</div>
          ) : null}
          <div className={styles['input-requirements']}>
            <span>Requires at least 3 of:</span>a-z (lowercase) | A-Z
            (uppercase) | 0-9 (numbers) | special characters (@, # , $)
          </div>
          <div className={styles['input-requirements']}>
            <span>Plus:</span>8 characters or more | can’t contain first or last
            name | can’t contain username
          </div>
          <button type='button' onClick={handlePasswordInputTypeChange}>
            <img
              src={
                passwordInputType === 'password'
                  ? privacyOnIcon
                  : privacyOffIcon
              }
              alt=''
            />
          </button>
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
            isSubmitting={resetPassword.isSubmitting}
            disabled={!recaptcha.resetPassword.isRecaptchaVerified}
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;
