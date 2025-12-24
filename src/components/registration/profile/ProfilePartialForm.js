import React from 'react';
import { Field, Form } from 'formik';
import { connect } from 'react-redux';
import 'react-responsive-ui/style.css';
import styles from './ProfileForm.module.scss';

import { validateTOS } from './customValidation';

import Button from '../../common/Button';
import RadioButton from './customFieldComponents/RadioButton';
import CountrySelectField from './customFieldComponents/CountrySelectField';

import StateSelectField from './customFieldComponents/StateSelectField';
import TermsOfServiceField from './customFieldComponents/TermsOfServiceField';
import { COUNTRY_IDS } from '../../../constants';

import { registerRedirect } from '../../../actions/registrationActions';


const ProfilePartialForm = ({
    errors,
    touched,
    values,
    handleChange,
    setFieldValue,
    setFieldTouched,
    handleSelectCountryManually,
    selectCountryManually,
    getCountryIcon,
    setRecent,
    profile,
    registerRedirect
}) => {


    function showError(name) {
        if (errors[name] && touched[name]) {
            return 'input-error';
        }
        return '';
    }

    function registerRedirectWrap() {
        registerRedirect(values);
    }

    function formIncomplete() {
        if (!values.terms || !values.firstName || !values.lastName || !values.countryId || !values.stateId) {
            return true;
        }
        else {
            return false;
        }
    }

    return (

        <Form>
            {
                profile.isCountryFoundByIP && !selectCountryManually ? (
                    <div className={styles['country-ip']}>
                        <div className={styles['country-ip__image']}>
                            <img src={getCountryIcon(values.countryId)} alt='' />
                        </div>
                        <div className={styles['country-ip__copy']}>
                            <p>
                                Looks like you are in {profile.formInfo.countryObj.name}. If you
                                will be working from another country{' '}
                                <button type='button' onClick={handleSelectCountryManually}>
                                    click here
                                </button>
                                .
                            </p>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className={styles['country-ip-manual']}>
                            <div className={styles['country-ip-manual__image']}>
                                <img src={getCountryIcon(values.countryId)} alt='' />
                            </div>
                            <div className={styles['country-ip-manual__copy']}>
                                <p>Select the country you will be working out of:</p>
                            </div>
                        </div>
                        <CountrySelectField
                            id='radioGroup'
                            name='countryId'
                            value={values.countryId}
                            error={errors.countryId}
                            touched={touched.countryId}
                            className={styles['radio-inputs-wrapper']}
                        >
                            {profile.formOptions.countries.map((country) => {
                                return (
                                    <Field
                                        key={country.id}
                                        component={RadioButton}
                                        name='countryId'
                                        className={styles['radio-input']}
                                        id={country.id}
                                        onChange={(e) => {
                                            setRecent(e.nativeEvent.srcElement.name);
                                            handleChange(e);
                                            values['stateId'] = '';
                                        }}
                                        label={country.name}
                                    />
                                );
                            })}
                        </CountrySelectField>
                    </div>
                )}
            <div className={styles['name-inputs-wrapper']}>
                <div className={styles['firstmid-wrapper']}>
                    <div className={styles['firstname-input']}>
                        <input
                            name='firstName'
                            placeholder='First Name *'
                            maxLength='20'
                            className={`${styles['form-input']} ${styles[showError('firstName')]
                                }`}
                            value={values.firstName}
                            onChange={(e) => {
                                setRecent(e.nativeEvent.srcElement.name);
                                handleChange(e);
                            }}
                        />
                        {errors['firstName'] && touched['firstName'] ? (
                            <div className={styles['message-error']}>
                                {errors['firstName']}
                            </div>
                        ) : null}
                    </div>
                    <div className={styles['middleinitial-input']}>
                        <input
                            name='middleInitial'
                            placeholder='MI'
                            maxLength='2'
                            className={styles['form-input']}
                            value={values.middleInitial}
                            onChange={(e) => {
                                setRecent(e.nativeEvent.srcElement.name);
                                handleChange(e);
                            }}
                        />
                    </div>
                </div>
                <div className={styles['lastname-input']}>
                    <input
                        name='lastName'
                        placeholder='Last Name *'
                        maxLength='25'
                        className={`${styles['form-input']} ${styles[showError('lastName')]
                            }`}
                        value={values.lastName}
                        onChange={(e) => {
                            setRecent(e.nativeEvent.srcElement.name);
                            handleChange(e);
                        }}
                    />
                    {errors['lastName'] && touched['lastName'] ? (
                        <div className={styles['message-error']}>{errors['lastName']}</div>
                    ) : null}
                </div>
            </div>
            {values.countryId === COUNTRY_IDS.US && (
                <div className={styles['state-inputs-wrapper']}>
                    <StateSelectField
                        name='stateId'
                        value={values.stateId}
                        placeholder={'State *'}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        setRecent={setRecent}
                        error={errors.stateId}
                        errorClassName={styles['message-error']}
                        touched={touched.stateId}
                        options={profile.formOptions.states.map((state) => {
                            return (state = { value: state.id, label: state.name });
                        })}
                    />
                </div>
            )}
            {values.countryId === COUNTRY_IDS.UK && (
                <div className={styles['uk-inputs-wrapper']} />
            )}
            {values.countryId === COUNTRY_IDS.CA && (
                <div className={styles['province-inputs-wrapper']}>
                    <StateSelectField
                        name='provinceId'
                        value={values.provinceId}
                        placeholder={'Province *'}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        setRecent={setRecent}
                        error={errors.provinceId}
                        errorClassName={styles['message-error']}
                        touched={touched.provinceId}
                        options={profile.formOptions.provinces.map((province) => {
                            return (province = { value: province.id, label: province.name });
                        })}
                    />
                </div>
            )}


            {profile.error ? (
                <div className={styles['server-error']}>{profile.error}</div>
            ) : null}
            <div className={styles['form-footer']}>
                <div className={styles['tos-inputs-wrapper']}>
                    <div>
                        <Field
                            name='terms'
                            type='checkbox'
                            className={styles['checkbox-input']}
                            onChange={(e) => {
                                setRecent(e.nativeEvent.srcElement.name);
                                handleChange(e);
                            }}
                            validate={validateTOS}
                            component={TermsOfServiceField}
                        />
                    </div>
                    <p>
                        By signing up, you agree to the{' '}
                        <a href='https://www.spotify.com/terms-of-use' target='_blank'>
                            Terms of Service
                        </a>
                        ,{' '}
                        <a href='https://www.spotify.com/privacy-policy' target='_blank'>
                            Privacy Policy
                        </a>
                        , including Cookie Use. We'll text your verification code, Standard
                        SMS fees may apply.
                    </p>
                </div>
                <div className={styles['submit-wrapper']}>
                    <Button
                        onClick={registerRedirectWrap}
                        isSubmitting={profile.isSubmitting}
                        disabled={formIncomplete()}>
                        Continue
                    </Button>
                </div>
            </div>
        </Form>
    );
};

const mapStateToProps = registration => registration
const mapDispatchToProps = { registerRedirect };

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePartialForm);

