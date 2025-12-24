import React, { Component } from 'react';

import AuthLayout from '../layouts/AuthLayout';
import ForgotPasswordFormContainer from './ForgotPasswordFormContainer';

class ForgotPassword extends Component {
  render() {
    return (
      <AuthLayout
        headerTitle='Forgot Your Password?'
        headerSubtitle=''
        navTitle='Need to continue registration?'
        navLinkPath='/login'
        navLinkName='Login'
      >
        <ForgotPasswordFormContainer />
      </AuthLayout>
    );
  }
}

export default ForgotPassword;
