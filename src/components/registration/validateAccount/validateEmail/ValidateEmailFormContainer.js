import React, { Component } from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import styles from './ValidateEmailFormContainer.module.scss';
import { Translate } from 'spotify-shared-web/localize'
import ValidateEmailForm from './ValidateEmailForm';
import validateEmailSchema from './validateEmailSchema';
import Cookies from 'universal-cookie';

import formHelpers from 'spotify-shared/helpers/formHelpers'

import {
    submitValidateEmail,
    resendEmailValidationCode,
    editEmail
} from '../../../../actions/validateAccountActions';

const EMAIL_VALIDATION_CODE_TYPE = 506920000;

class ValidateEmailFormContainer extends Component {
    handleResendCode = () => {
        this.props.resendEmailValidationCode({
            validationCodeType: EMAIL_VALIDATION_CODE_TYPE,
            userId: this.props.agentProfile.userId
        });
    };

    handleSubmit = (values) => {
        const formData = formHelpers.constructFormData(values);

        const cookies = new Cookies();
        let showWelcomeCookie = cookies.get('showWelcome');
        let showPreferenceModal = cookies.get('showPreferenceModal');

        if(showWelcomeCookie != null || showPreferenceModal != null){
            cookies.remove('showWelcome');
            cookies.remove('showPreferenceModal')
        }

        this.props.submitValidateEmail(
            Object.assign(formData, {
                validationCodeType: EMAIL_VALIDATION_CODE_TYPE,
                agentId: this.props.agentProfile.agentId,
                stepName: this.props.stepName,
                steps: this.props.steps
            })
        );
    };

    render() {
        const { validateAccount } = this.props;

        return (<Translate>
            {({ translate }) => <>
                <div className={styles['form-container']}>
                    {/* <p className={styles['form-container__copy']}>
                        {translate("validationEmailCodeConfirmMessage")}
                    </p> */}
                    <div className={styles['form-container__phone']}>
                        <p>{translate("We sent a validation code to")}: {this.props.agentProfile.email}</p>
                        <button onClick={this.props.editEmail}>Edit</button>
                    </div>
                    <Formik
                        initialValues={validateAccount.validateEmail.formInfo}
                        validationSchema={validateEmailSchema}
                        validateOnBlur={false}
                        onSubmit={this.handleSubmit}
                        render={(formikProps) => (
                            <ValidateEmailForm
                                validateAccount={validateAccount}
                                onHandleResendCode={this.handleResendCode}
                                {...formikProps}
                            />
                        )}
                    />
                </div>
            </>}
        </Translate>);
    }
}

const mapStateToProps = ({ validateAccount }) => {
    return {
        validateAccount
    };
};

export default connect(
    mapStateToProps,
    { submitValidateEmail, resendEmailValidationCode, editEmail }
)(ValidateEmailFormContainer);
