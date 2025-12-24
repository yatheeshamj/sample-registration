import React, { Component } from 'react';

import AuthLayout from '../layouts/AuthLayout';
import ForgotUsernameFormContainer from './ForgotUsernameFormContainer';

class ForgotUsername extends Component {
  render() {
    return (
      <AuthLayout
        headerTitle='Forgot Username?'
        headerSubtitle=''
        navTitle='Need to continue registration?'
        navLinkPath='/login'
        navLinkName='Login'
      >
        <ForgotUsernameFormContainer />
      </AuthLayout>
    );
  }
}

export default ForgotUsername;
