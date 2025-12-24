import React from 'react';
import { Field, Form, ErrorMessage } from 'formik';
import styles from './TrnForm.module.scss';
import { Translate } from 'spotify-shared-web/localize'
import Button from 'spotify-shared-web/components/common/Button';
import formHelpers from 'spotify-shared/helpers/formHelpers';
import TextField from '@material-ui/core/TextField';
import { useInputStyles } from '../../../styles'

import {
    asyncValidateTrn,
    validateConfirmTrn
} from './customValidation';
import { CollectionsBookmark } from '@material-ui/icons';
import commonStyle from '../../../../src/components/shared/CommonStyle.module.scss'

const TrnForm = ({
    errors,
    touched,
    values,
    handleChange,
    setFieldTouched,
    ssn,
    handleRestartClick,
    restartText,
    btnNextId,
    recent,
    setRecent,
    setEdit,
    hideSSNFields = false,
    changeTypeBtnId = "btnSSNChangeContractorType"
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
            {
                ({ translate }) => <>
                    <div className={`${commonStyle['lastComponent']}`}>
                        <Form>
                            {ssn.error ? (
                                <div className={styles['server-error']}>{ssn.error}</div>
                            ) : null}

                            <div className={`${styles['firstname-inputs-wrapper']} ${commonStyle['formColStyle']}`}>
                                <Field
                                    id="firstName"
                                    name='firstName'
                                    type='string'
                                    autoComplete='off'
                                    validate={validateText}
                                    onChange={(e) => {
                                        setRecent(e.nativeEvent.srcElement.id);
                                        handleChange(e);
                                    }}
                                    disabled
                                    onBlur={(e) => {
                                        setRecent(e.nativeEvent.srcElement.id);
                                        if (!touched['firstName']) {
                                            setFieldTouched(e.nativeEvent.srcElement.id, true, true);
                                        } else {
                                            setRecent('');
                                        }
                                    }}
                                    error={errors['firstName'] && touched['firstName'] ? true : false}
                                    fullWidth
                                    value={values.firstName}
                                    //label={`${translate("First Name")} *`}
                                    variant="outlined"
                                    helperText={errors['firstName'] && touched['firstName'] ? errors['firstName'] : ''}
                                    classes={{ root: !errors['firstName'] && classes.root }}
                                    component={TextField}
                                    className={`${commonStyle['formMargin']}`}
                                    size="small"
                                />
                            </div>
                            <div className={`${styles['lastname-inputs-wrapper']}`}>
                                <Field
                                    id="lastName"
                                    name='lastName'
                                    type='string'
                                    autoComplete='off'
                                    validate={validateText}
                                    onChange={(e) => {
                                        setRecent(e.nativeEvent.srcElement.id);
                                        handleChange(e);
                                    }}
                                    disabled
                                    onBlur={(e) => {
                                        setRecent(e.nativeEvent.srcElement.id);
                                        if (!touched['lastName']) {
                                            setFieldTouched(e.nativeEvent.srcElement.id, true, true);
                                        } else {
                                            setRecent('');
                                        }
                                    }}
                                    //label={`${translate("Last Name")} *`}
                                    error={errors['lastName'] && touched['lastName'] ? true : false}
                                    fullWidth
                                    value={values.lastName}
                                    variant="outlined"
                                    helperText={errors['lastName'] && touched['lastName'] ? errors['lastName'] : ''}
                                    classes={{ root: !errors['lastName'] && classes.root }}
                                    component={TextField}
                                    size="small"
                                />
                            </div>
                            {
                                hideSSNFields !== true && <>
                                    <div className={styles['ssn-inputs-wrapper']}>
                                        <Field id="ssn"
                                            name='ssn'
                                            type='password'
                                            autoComplete='off'
                                            validate={
                                                recent === 'ssn' && touched['ssn']
                                                    ? asyncValidateTrn
                                                    : () => { }
                                            }

                                            onChange={(e) => {
                                                if (formHelpers.isValueNumber(e.target.value) && e.target.value.length <= 9) {
                                                    //alert(e.nativeEvent.srcElement.id);
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
                                            label={`${translate("Tax Registration Number")} (required)`}
                                            variant="outlined"
                                            //helperText={errors['ssn'] && touched['ssn'] ? errors['ssn'] : ''}
                                            classes={{ root: !errors['ssn'] && classes.root }}
                                            component={TextField}
                                            size="small"
                                        ></Field>
                                    </div>

                                    <div className={styles['ssn-confirm-inputs-wrapper']}>
                                        <Field
                                            id='ssnConfirm'
                                            name='ssnConfirm'
                                            type='password'
                                            autoComplete='off'
                                            onChange={(e) => {
                                                if (formHelpers.isValueNumber(e.target.value) && e.target.value.length <= 9) {
                                                    setRecent(e.nativeEvent.srcElement.id);
                                                    handleChange(e);
                                                }
                                            }}
                                            validate={(value) =>
                                                validateConfirmTrn(value, values.ssn)
                                            }
                                            error={errors['ssnConfirm'] && touched['ssnConfirm'] ? true : false}
                                            fullWidth
                                            value={values.ssnConfirm}
                                            label={`${translate("Confirm Tax Registration Number")} (required)`}
                                            variant="outlined"
                                            //helperText={errors['ssnConfirm'] && touched['ssnConfirm'] ? errors['ssnConfirm'] : ''}
                                            classes={{ root: !(errors['ssnConfirm'] && touched['ssnConfirm']) && classes.root }}
                                            component={TextField}
                                            size="small"
                                        />
                                        {errors['ssnConfirm'] && touched['ssnConfirm'] && <div style={errorStyle}> <ErrorMessage name="ssnConfirm" /></div>}
                                    </div>


                                    <div className={`row float-right mr-1 ${commonStyle['lastComponent5']}`}>
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

                                </>
                            }
                        </Form>
                    </div>
                </>
            }
        </Translate>
    );

}

export default TrnForm;
