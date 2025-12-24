import React, { Component } from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import styles from './ResetPasswordFormContainer.module.scss';

import ResetPasswordForm from '../resetpassword/ResetPasswordForm';
import resetPasswordSchema from './resetPasswordSchema';

import formHelpers from 'spotify-shared/helpers/formHelpers'

import { submitResetPassword, verifyCaptcha } from '../../actions/loginActions';

class ResetPasswordFormContainer extends Component {
  state = {
    passwordInputType: 'password'
  };

  handleReCaptcha = (token) => {
    this.props.verifyCaptcha({ token, form: 'resetPassword' });
  };

  handlePasswordInputTypeChange = (e) => {
    this.setState((previousState) => {
      if (previousState.passwordInputType === 'password') {
        return {
          passwordInputType: 'text'
        };
      } else {
        return {
          passwordInputType: 'password'
        };
      }
    });
  };

  handleSubmit = (values) => {
    const formData = formHelpers.constructFormData(values);
    this.props.submitResetPassword(formData);
  };

  render() {
    const { resetPassword, recaptcha } = this.props;

    return (
      <div className={styles['form-container']}>
        <p className={styles['form-container__copy']}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
          laudantium iusto quidem labore porro a exercitationem eveniet.
        </p>
        <Formik
          initialValues={resetPassword.formInfo}
          validationSchema={resetPasswordSchema}
          validateOnBlur={false}
          onSubmit={this.handleSubmit}
          render={(formikProps) => (
            <ResetPasswordForm
              resetPassword={resetPassword}
              recaptcha={recaptcha}
              handleReCaptcha={this.handleReCaptcha}
              handlePasswordInputTypeChange={this.handlePasswordInputTypeChange}
              passwordInputType={this.state.passwordInputType}
              {...formikProps}
            />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ resetPassword, recaptcha }) => {
  return {
    resetPassword,
    recaptcha
  };
};

export default connect(
  mapStateToProps,
  { submitResetPassword, verifyCaptcha }
)(ResetPasswordFormContainer);
