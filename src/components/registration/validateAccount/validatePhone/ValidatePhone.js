import React, { Component } from 'react';
import { connect } from 'react-redux';

import ValidatePhoneFormContainer from './ValidatePhoneFormContainer';
import UpdatePhoneFormContainer from './UpdatePhoneFormContainer';

import { logoutRedirect } from '../../../../actions/loginActions';

class ValidatePhone extends Component {
    render() {
        const { agentProfile } = this.props;

        return (
            <>
                {this.props.updatePhone.isEditingPhone ? (
                    <UpdatePhoneFormContainer agentProfile={agentProfile} />
                ) : (
                        <ValidatePhoneFormContainer agentProfile={agentProfile} />
                    )}
            </>
        );
    }
}

function mapStateToProps({ validateAccount }) {
    return { updatePhone: validateAccount.updatePhone };
}

export default connect(
    mapStateToProps,
    { logoutRedirect }
)(ValidatePhone);
