import React, { Component } from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import styles from './UpdatePhoneFormContainer.module.scss';
import { Translate } from 'spotify-shared-web/localize'
import UpdatePhoneForm from './UpdatePhoneForm';
import { UpdatePhoneSchema, UpdateUKPhoneSchema, UpdateJMPhoneSchema } from './updatePhoneSchema';

import formHelpers from 'spotify-shared/helpers/formHelpers'

import {
    updateMobilePhone,
    cancelMobilePhone
} from '../../../../actions/validateAccountActions';
import { COUNTRY_IDS } from '../../../../constants';
import SCREEN_CONFIG from "../../../../screensConfig";

const CURRENT_SCREEN = SCREEN_CONFIG.contactValidation;

const MOBILE_VALIDATION_CODE_TYPE = 506920001;

class UpdatePhoneFormContainer extends Component {
    handleSubmit = (values) => {
        const formData = formHelpers.constructFormData(values);

        this.props.updateMobilePhone(
            Object.assign(formData, {
                validationCodeType: MOBILE_VALIDATION_CODE_TYPE,
                agentId: this.props.agentProfile.agentId,
                userId: this.props.agentProfile.userId
            })
        );
    };

    render() {
        const { validateAccount, phoneValidations } = this.props;
        return (<Translate>
            {({ translate }) => <>
                <div className={styles['form-container']}>
                    {/* <p className={styles['form-container__copy']}>
                        {translate("validationPhoneCodeConfirmMessage")}
                    </p> */}
                    <Formik
                        initialValues={validateAccount.updatePhone.formInfo}
                        // validationSchema={this.props.agentProfile.countryId === COUNTRY_IDS.UK ? UpdateUKPhoneSchema :
                        //     this.props.agentProfile.countryId === COUNTRY_IDS.JM ? UpdateJMPhoneSchema : UpdatePhoneSchema}
                        validationSchema={UpdatePhoneSchema(phoneValidations)}
                        validate={values => {
                            const errors = {};
                            if (!values.mobilePhone) {
                                errors.mobilePhone = translate(`${CURRENT_SCREEN}.phoneNumber.updatePhoneNumberRequired`);
                            } else if (phoneValidations.length && (values.mobilePhone.length !== phoneValidations.length)) {
                                errors.mobilePhone = translate(`${CURRENT_SCREEN}.phoneNumber.lengthError`);
                            }
                            return errors;
                        }}
                        validateOnBlur={false}
                        onSubmit={this.handleSubmit}
                        render={(formikProps) => (
                            <UpdatePhoneForm
                                phoneValidations={this.props.phoneValidations}
                                countryId={this.props.agentProfile.countryId}
                                validateAccount={validateAccount}
                                onHandleUpdatePhoneCancel={this.props.cancelMobilePhone}
                                {...formikProps}
                            />
                        )}
                    />
                </div>
            </>}
        </Translate>);
    }
}

const mapStateToProps = ({ validateAccount, app }) => {
    return {
        validateAccount,
        phoneValidations: app.countryConfigurations.config.phonenumberValidationScreen.phoneNumberFormat.validation
    };
};

export default connect(
    mapStateToProps,
    { updateMobilePhone, cancelMobilePhone }
)(UpdatePhoneFormContainer);
