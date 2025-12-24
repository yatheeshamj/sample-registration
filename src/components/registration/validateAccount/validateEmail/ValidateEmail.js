import React, { Component } from 'react';
import { connect } from 'react-redux';

import ValidateEmailFormContainer from './ValidateEmailFormContainer';
import UpdateEmailFormContainer from './UpdateEmailFormContainer';

import { logoutRedirect } from '../../../../actions/loginActions';

class ValidateEmail extends Component {
  render() {
    const { agentProfile } = this.props;

    return (
      <>
        {this.props.updateEmail.isEditingEmail ? (
          <UpdateEmailFormContainer agentProfile={agentProfile} />
        ) : (
            <ValidateEmailFormContainer agentProfile={agentProfile} />
          )}
      </>
    );
  }
}

function mapStateToProps({ validateAccount }) {
  return { updateEmail: validateAccount.updateEmail };
}

export default connect(
  mapStateToProps,
  { logoutRedirect }
)(ValidateEmail);
