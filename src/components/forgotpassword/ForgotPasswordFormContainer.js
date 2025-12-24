import React, { Component } from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import styles from './ForgotPasswordFormContainer.module.scss';

import ForgotPasswordForm from '../forgotpassword/ForgotPasswordForm';
import forgotPasswordSchema from './forgotPasswordSchema';

import formHelpers from 'spotify-shared/helpers/formHelpers'

import {
  submitForgotPassword,
  verifyCaptcha
} from '../../actions/loginActions';

class ForgotPasswordFormContainer extends Component {
  handleReCaptcha = (token) => {
    this.props.verifyCaptcha({ token, form: 'forgotPassword' });
  };

  handleSubmit = (values) => {
    const formData = formHelpers.constructFormData(values);
    this.props.submitForgotPassword(formData);
    this.setState({
      hasSubmitted: true
    });
  };

  render() {
    const { forgotPassword, recaptcha } = this.props;

    return (
      <div className={styles['form-container']}>
        <p className={styles['form-container__copy']}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
          laudantium iusto quidem labore porro a exercitationem eveniet.
        </p>
        <Formik
          initialValues={forgotPassword.formInfo}
          validationSchema={forgotPasswordSchema}
          validateOnBlur={false}
          onSubmit={this.handleSubmit}
          render={(formikProps) => (
            <ForgotPasswordForm
              forgotPassword={forgotPassword}
              recaptcha={recaptcha}
              handleReCaptcha={this.handleReCaptcha}
              {...formikProps}
            />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ forgotPassword, recaptcha }) => {
  return {
    forgotPassword,
    recaptcha
  };
};

export default connect(
  mapStateToProps,
  { submitForgotPassword, verifyCaptcha }
)(ForgotPasswordFormContainer);
