import React, { Component } from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import styles from './ForgotUsernameFormContainer.module.scss';

import ForgotUsernameForm from './ForgotUsernameForm';
import forgotUsernameSchema from './forgotUsernameSchema';

import formHelpers from 'spotify-shared/helpers/formHelpers'

import {
  submitForgotUsername,
  verifyCaptcha
} from '../../actions/loginActions';

class ForgotUsernameFormContainer extends Component {
  handleReCaptcha = (token) => {
    this.props.verifyCaptcha({ token, form: 'forgotUsername' });
  };

  handleSubmit = (values) => {
    const formData = formHelpers.constructFormData(values);
    this.props.submitForgotUsername(formData);
    this.setState({
      hasSubmitted: true
    });
  };

  render() {
    const { forgotUsername, recaptcha } = this.props;

    return (
      <div className={styles['form-container']}>
        <p className={styles['form-container__copy']}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
          laudantium iusto quidem labore porro a exercitationem eveniet.
        </p>
        <Formik
          initialValues={forgotUsername.formInfo}
          validationSchema={forgotUsernameSchema}
          validateOnBlur={false}
          onSubmit={this.handleSubmit}
          render={(formikProps) => (
            <ForgotUsernameForm
              forgotUsername={forgotUsername}
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

const mapStateToProps = ({ forgotUsername, recaptcha }) => {
  return {
    forgotUsername,
    recaptcha
  };
};

export default connect(
  mapStateToProps,
  { submitForgotUsername, verifyCaptcha }
)(ForgotUsernameFormContainer);
