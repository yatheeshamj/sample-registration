import React from 'react';
import styles from './AadharForm.module.scss';
import { Field, Form ,ErrorMessage} from 'formik';
import { Translate } from 'spotify-shared-web/localize';
import commonStyle from '../../../../src/components/shared/CommonStyle.module.scss';
import { useInputStyles } from '../../../styles'
import { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import formHelpers from 'spotify-shared/helpers/formHelpers';
//import {validateConfirmAadhar} from './customValidation';
import {validateConfirmAadhar} from './customValidation/aadharValidation';
import Button from 'spotify-shared-web/components/common/Button';


function AadharForm(props) {
  const {ssn, setRecent, handleChange, errors, values,touched, setFieldTouched, btnNextId, setEdit} = props;
  const classes = useInputStyles();

  function validateText(text) {
    let error;
    if (!text) return "Required";
    return error;
  }

  // const errorStyle={
  //   marginBottom:"25px",
  //   fontSize:"12px",
  //   color:"red"
  // }

  return (
    <Translate>
      {
        ({translate}) => <Fragment>
          <div className={`${commonStyle['lastComponent']}`}>
            <Form>

            {ssn.error ? (
                        <div className={styles['server-error']}>{ssn.error}</div>
                    ) : null}

             {/* first name */}
            <div className={`${styles['firstname-inputs-wrapper']} ${commonStyle['formColStyle']}`}>
             <Field
              id="firstName"
              name='firstName'
              type='string'
              autoComplete='off'
              fullWidth
              variant="outlined"
              component={TextField}
              className={`${commonStyle['formMargin']}`}
              size="small"
              disabled
              validate={validateText}
              onChange={(e) => {
                setRecent(e.nativeEvent.srcElement.id);
                handleChange(e);
              }}
              //disabled
              error={errors['firstName'] && touched['firstName'] ? true : false}
              value={values.firstName}
              helperText={errors['firstName'] && touched['firstName'] ? errors['firstName'] : ''}
              classes={{ root: !errors['firstName'] && classes.root }}>
             </Field>
            </div>
            {/* last name */}
            <div className={`${styles['lastname-inputs-wrapper']}`}>
              <Field
                id="lastName"
                name='lastName'
                type='string'
                autoComplete='off'
                fullWidth
                variant="outlined"
                component={TextField}
                className={`${commonStyle['formMargin']}`}
                size="small"
                validate={validateText}
                disabled
                onChange={(e) => {
                  setRecent(e.nativeEvent.srcElement.id);
                  handleChange(e);
                }}
                //disabled
                error={errors['lastName'] && touched['lastName'] ? true : false}
                value={values.lastName}
                helperText={errors['lastName'] && touched['lastName'] ? errors['lastName'] : ''}
                classes={{ root: !errors['lastName'] && classes.root }}>
              </Field>
            </div>
            {/* aadhar number */}
            <div className={styles['aadhar-inputs-wrapper']}>
              <Field id="ssn"
                  name='ssn'
                  type='password'
                  autoComplete='off'
                  // validate=
                  // {
                  //     recent === 'ssn' && touched['ssn']
                  //         ? asyncValidateTrn
                  //         : () => { }
                  // }
                  onChange={(e) => { 
                      //if (formHelpers.isValueNumber(e.target.value) && e.target.value.length <= 12) {
                        if (e.target.value.length <= 14) {
                          setRecent(e.nativeEvent.srcElement.id);
                          handleChange(e);
                      }
                  }}
                  onBlur={(e) => {
                      //alert('on blur');
                      setRecent(e.nativeEvent.srcElementid);
                      if (!touched['ssn']) {
                          setFieldTouched(e.nativeEvent.srcElement.id, true, true);
                      } else {
                          setRecent('');
                      }
                  }}
                  error={errors['ssn'] && touched['ssn'] ? true : false}
                  fullWidth
                  value={values.ssn}
                  label={`${translate("Aadhar Number")} (required)`}
                  variant="outlined"
                  //helperText={errors['ssn'] && touched['ssn'] ? errors['ssn'] : ''}
                  classes={{ root: !errors['ssn'] && classes.root }}
                  component={TextField}
                  size="small">
                </Field>
                
            </div>
            {errors['ssn'] && touched['ssn'] && <div className={styles['errorStyle']}> <ErrorMessage name="ssn" /></div>}
                       
            {/* conform ssn/aadhar */}
            <div className={styles['ssn-confirm-inputs-wrapper']}>
            <Field
                id='ssnConfirm'
                name='ssnConfirm'
                type='password'
                autoComplete='off'
                onChange={(e) => {
                    //if (formHelpers.isValueNumber(e.target.value) && e.target.value.length <= 12) {
                      if (e.target.value.length <= 14) {
                        setRecent(e.nativeEvent.srcElement.id);
                        handleChange(e);
                    }
                }}
                  validate={(value) =>
                   validateConfirmAadhar(value, values.ssn)
                }
                error={errors['ssnConfirm'] && touched['ssnConfirm'] ? true : false}
                fullWidth
                value={values.ssnConfirm}
                label={`${translate("Confirm Aadhar Number")} (required)`}
                variant="outlined"
                //helperText={errors['ssnConfirm'] && touched['ssnConfirm'] ? errors['ssnConfirm'] : ''}
                classes={{ root: !(errors['ssnConfirm'] && touched['ssnConfirm']) && classes.root }}
                component={TextField}
                size="small"
            />
           </div>
           {errors['ssnConfirm'] && touched['ssnConfirm'] && <div className={styles['errorStyle']}> <ErrorMessage name="ssnConfirm" /></div>}

            {/*button section */}
            <div className={`row float-right mr-1 ${commonStyle['cardTopMarginSR']}`}>
              <div className={` ${styles['alignright']}`}>
                  <button
                      className={`ml-3 btn btn-outline-primary ${styles['edit-button']}`}
                      type='button'
                      onClick={() => setEdit(true)}
                  >
                      {translate("Edit")}
                  </button>
              </div>
              <div className={`ml-3 `}>
                  <Button size="medium" color="orange" type='submit' disabled={ssn.isSubmitting} isSubmitting={ssn.isSubmitting} id={btnNextId}>
                      {translate("Next")}
                  </Button>
              </div>
            </div>

            </Form>
          </div>
        </Fragment>
      }
    </Translate>
  )
}

export default AadharForm
