import React from 'react';
import { Field, Form } from 'formik';
import styles from './ValidateEmailForm.module.scss';
import { Translate } from 'spotify-shared-web/localize'
import Button from 'spotify-shared-web/components/common/Button';
import TextField from '@material-ui/core/TextField';
import { useInputStyles } from '../../../../styles'

const ValidateEmailForm = ({
  errors,
  touched,
  validateAccount,
  onHandleResendCode,
  values,
  handleChange
}) => {

  const classes = useInputStyles();

  return (
    <Translate>
      {({ translate }) => <>
        <div>
          <Form>
            {validateAccount.validateEmail.error ? (
              <div className={styles['server-error']}>
                {validateAccount.validateEmail.error}
              </div>
            ) : null}
            {validateAccount.validateEmail.success ? (
              <div className={styles['redirect-message']}>
                {validateAccount.validateEmail.success}
              </div>
            ) : null}
            <div className={styles['code-inputs-wrapper']}>
              <Field
                error={errors['validationCode'] && touched['validationCode'] ? true : false}
                classes={{ root: !errors['validationCode'] && classes.root }}
                fullWidth
                id="validationCode"
                value={values.validationCode}
                onChange={(e) => handleChange(e)}
                name='validationCode'
                label="Email Validation Code*"
                variant="outlined"
                helperText={errors['validationCode'] && touched['validationCode'] ? errors['validationCode'] : ''}
                component={TextField}
                size="small"
              />
            </div>
            <div className={styles['submit-wrapper']}>
              <button
                className={styles['resend-button']}
                type='button'
                onClick={onHandleResendCode}
              >
                {translate("Resend Code")}
              </button>
              <Button
                size="medium"
                color="orange"
                type='submit'
                isSubmitting={validateAccount.validateEmail.isSubmitting}
              >
                {translate("Next")}
              </Button>
            </div>
          </Form>
        </div>
      </>}
    </Translate>);
};

export default ValidateEmailForm;
