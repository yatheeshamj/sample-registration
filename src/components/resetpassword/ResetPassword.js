import React, { Component } from 'react';

import AuthLayout from '../layouts/AuthLayout';
import ResetPasswordFormContainer from './ResetPasswordFormContainer';

class ResetPassword extends Component {
  render() {
    return (
      <AuthLayout
        headerTitle='Reset Your Password'
        headerSubtitle=''
        navTitle='Need to continue registration?'
        navLinkPath='/login'
        navLinkName='Login'
      >
        <ResetPasswordFormContainer />
      </AuthLayout>
    );
  }
}

export default ResetPassword;
