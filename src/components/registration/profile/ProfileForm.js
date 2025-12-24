import React from 'react';
import { Field, Form } from 'formik';
import 'react-responsive-ui/style.css';
import styles from './ProfileForm.module.scss';

import {
    validateTOS,
    asyncValidateUsername,
    asyncValidateEmail,
    persistError
} from './customValidation';

import { validatePassword } from '../../../helpers/formValidation';

import Button from '../../common/Button';
import RadioButton from './customFieldComponents/RadioButton';
import CountrySelectField from './customFieldComponents/CountrySelectField';
import PhoneField from './customFieldComponents/PhoneField';
import PhoneFieldUK from './customFieldComponents/PhoneFieldUK';
import StateSelectField from './customFieldComponents/StateSelectField';
import TermsOfServiceField from './customFieldComponents/TermsOfServiceField';

import privacyOffIcon from '../../../assets/images/privacy-off-icon.svg';
import privacyOnIcon from '../../../assets/images/privacy-on-icon.svg';

import { COUNTRY_IDS } from '../../../constants';

const ProfileForm = ({
    errors,
    touched,
    values,
    handleChange,
    setFieldValue,
    setFieldTouched,
    handlePasswordInputTypeChange,
    handleSelectCountryManually,
    passwordInputType,
    selectCountryManually,
    getCountryIcon,
    setRecent,
    recent,
    profile
}) => {
    function showError(name) {
        if (errors[name] && touched[name]) {
            return 'input-error';
        }
        return '';
    }

    return (
        <Form>
            {profile.isCountryFoundByIP && !selectCountryManually ? (
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
                            className={`${styles['form-input']} ${
                                styles[showError('firstName')]
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
                        className={`${styles['form-input']} ${
                            styles[showError('lastName')]
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
            <div className={styles['email-inputs-wrapper']}>
                <Field
                    name='email'
                    className={`${styles['form-input']} ${styles[showError('email')]}`}
                    placeholder='Email *'
                    onChange={(e) => {
                        setRecent(e.nativeEvent.srcElement.name);
                        handleChange(e);
                    }}
                    validate={
                        recent === 'email' && touched['email']
                            ? asyncValidateEmail
                            : () => persistError(errors['email'])
                    }
                    onBlur={(e) => {
                        setRecent(e.nativeEvent.srcElement.name);
                        if (!touched['email']) {
                            setFieldTouched(e.nativeEvent.srcElement.name, true, true);
                        } else {
                            setRecent('');
                        }
                    }}
                />
                {errors['email'] && touched['email'] ? (
                    <div className={styles['message-error']}>{errors['email']}</div>
                ) : null}
            </div>
            <div className={styles['mobile-phone-wrapper']}>
                {values.countryId === COUNTRY_IDS.UK ? (
                    <PhoneFieldUK
                        name='mobilePhone'
                        value={values.mobilePhone}
                        placeholder='Mobile Number *'
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        setRecent={setRecent}
                        error={errors.mobilePhone}
                        errorClassName={styles['message-error']}
                        touched={touched.mobilePhone}
                        className={`${styles['form-input']} ${
                            styles[showError('mobilePhone')]
                            }`}
                    />
                ) : (
                        <PhoneField
                            name='mobilePhone'
                            value={values.mobilePhone}
                            placeholder='Mobile Number *'
                            onChange={setFieldValue}
                            onBlur={setFieldTouched}
                            setRecent={setRecent}
                            error={errors.mobilePhone}
                            errorClassName={styles['message-error']}
                            touched={touched.mobilePhone}
                            className={`${styles['form-input']} ${
                                styles[showError('mobilePhone')]
                                }`}
                        />
                    )}
                {errors['mobilePhone'] && touched['mobilePhone'] ? (
                    <div className={styles['message-error']}>{errors['mobilePhone']}</div>
                ) : null}
            </div>
            <div className={styles['username-inputs-wrapper']}>
                <Field
                    name='username'
                    className={`${styles['form-input']} ${styles[showError('username')]}`}
                    placeholder='Username *'
                    onChange={(e) => {
                        setRecent(e.nativeEvent.srcElement.name);
                        handleChange(e);
                    }}
                    validate={
                        recent === 'username' && touched['username']
                            ? asyncValidateUsername
                            : () => persistError(errors['username'])
                    }
                    onBlur={(e) => {
                        setRecent(e.nativeEvent.srcElement.name);
                        if (!touched['username']) {
                            setFieldTouched(e.nativeEvent.srcElement.name, true, true);
                        } else {
                            setRecent('');
                        }
                    }}
                />
                {errors['username'] && touched['username'] ? (
                    <div className={styles['message-error']}>{errors['username']}</div>
                ) : null}
                <div className={styles['input-requirements']}>
                    <span>Requirement:</span>start with a letter | consist of only letter
                    and numbers
        </div>
            </div>
            <div className={styles['password-inputs-wrapper']}>
                <Field
                    name='password'
                    placeholder='Password *'
                    className={`${styles['form-input']} ${styles[showError('password')]}`}
                    type={passwordInputType}
                    onBlur={() => { }}
                    onChange={(e) => {
                        setRecent(e.nativeEvent.srcElement.name);
                        handleChange(e);
                    }}
                    validate={(value) =>
                        validatePassword(
                            value,
                            values.firstName,
                            values.lastName,
                            values.username
                        )
                    }
                />
                {errors['password'] && touched['password'] ? (
                    <div className={styles['message-error']}>{errors['password']}</div>
                ) : null}
                <div className={styles['input-requirements']}>
                    <span>Requires at least 3 of:</span>a-z (lowercase) | A-Z (uppercase)
                    | 0-9 (numbers) | special characters (@, # , $)
        </div>
                <div className={styles['input-requirements']}>
                    <span>Plus:</span>8 characters or more | can’t contain first or last
                    name | can’t contain username
        </div>
                <button type='button' onClick={handlePasswordInputTypeChange}>
                    <img
                        src={
                            passwordInputType === 'password' ? privacyOnIcon : privacyOffIcon
                        }
                        alt=''
                    />
                </button>
            </div>
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
                        <a href='https://www.spotifyworkfromhome.com/terms-of-use/' target='_blank'>
                            Terms of Service
            </a>
                        ,{' '}
                        <a href='https://www.spotifyworkfromhome.com/privacy-policy-2/' target='_blank'>
                            Privacy Policy
            </a>
                        , including Cookie Use. We'll text your verification code, Standard
                        SMS fees may apply.
          </p>
                </div>
                <div className={styles['submit-wrapper']}>
                    <Button
                        type='submit'
                        isSubmitting={profile.isSubmitting}
                        disabled={!values.terms}
                    >
                        Register
          </Button>
                </div>
            </div>
        </Form>
    );
};

export default ProfileForm;
