import React, { Component } from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import styles from './UpdateEmailFormContainer.module.scss';
import { Translate } from 'spotify-shared-web/localize'
import UpdateEmailForm from './UpdateEmailForm';
import updateEmailSchema from './updateEmailSchema';

import formHelpers from 'spotify-shared/helpers/formHelpers'

import {
    updateEmail,
    cancelEmail
} from '../../../../actions/validateAccountActions';

const EMAIL_VALIDATION_CODE_TYPE = 506920000;

class UpdateEmailFormContainer extends Component {
    handleSubmit = (values) => {
        const formData = formHelpers.constructFormData(values);

        this.props.updateEmail(
            Object.assign(formData, {
                validationCodeType: EMAIL_VALIDATION_CODE_TYPE,
                agentId: this.props.agentProfile.agentId,
                userId: this.props.agentProfile.userId
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
                <Formik
                    initialValues={validateAccount.updateEmail.formInfo}
                    validationSchema={updateEmailSchema}
                    validateOnBlur={false}
                    onSubmit={this.handleSubmit}
                    render={(formikProps) => (
                        <UpdateEmailForm
                            validateAccount={validateAccount}
                            onHandleUpdateEmailCancel={this.props.cancelEmail}
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
    { updateEmail, cancelEmail }
)(UpdateEmailFormContainer);
