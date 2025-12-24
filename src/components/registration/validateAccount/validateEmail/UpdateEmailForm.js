import React from 'react';
import { Form, Field } from 'formik';
import styles from './UpdateEmailForm.module.scss';
import { Translate } from 'spotify-shared-web/localize'
import Button from 'spotify-shared-web/components/common/Button';
import TextField from '@material-ui/core/TextField';
import { useInputStyles } from '../../../../styles'


const UpdateEmailForm = ({
  values,
  errors,
  touched,
  validateAccount,
  onHandleUpdateEmailCancel,
  handleChange
}) => {

  const classes = useInputStyles();

  return (<Translate>
    {({ translate }) => <>
      <div>
        <Form>
          {validateAccount.updateEmail.error ? (
            <div className={styles['server-error']}>
              {validateAccount.updateEmail.error}
            </div>
          ) : null}
          <div className={styles['email-wrapper']}>
            <Field
              error={errors['email'] && touched['email'] ? true : false}
              classes={{ root: !errors['email'] && classes.root }}
              fullWidth
              id="email"
              value={values.email}
              name='email'
              label="Email*"
              variant="outlined"
              helperText={errors['email'] && touched['email'] ? errors['email'] : ''}
              component={TextField}
              size="small"
              onChange={(e) => handleChange(e)}

            />
          </div>
          <div className={styles['submit-wrapper']}>
            <button
              onClick={onHandleUpdateEmailCancel}
              type='button'
              className={styles['cancel-button']}
            >
              Cancel
          </button>
            <Button
              size="medium"
              type='submit'
              isSubmitting={validateAccount.updateEmail.isSubmitting}
            >
              {translate("Save & Send")}
            </Button>
          </div>
        </Form>
      </div>
    </>}
  </Translate>);
};

export default UpdateEmailForm;
