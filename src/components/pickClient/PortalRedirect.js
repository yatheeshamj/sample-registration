import React, { Component } from 'react';
import { connect } from 'react-redux';
import MainLayout from '../layouts/MainLayout';
import { logoutRedirect } from '../../actions/loginActions';

import { PORTAL_REDIRECT_URL } from '../../config';
import { USER_ID } from '../../constants'


class PortalRedirect extends Component {

    render() {
        const { agentProfile, logoutRedirect } = this.props;
        var uri = `${PORTAL_REDIRECT_URL}`;
        return (
            <>
                <MainLayout
                    headerTitle='Pick a Client'
                    headerSubtitle='Congratulations! You completed registration and now you can Pick a Client'
                    navTitle={`${USER_ID}: ${agentProfile.agentId}`}
                    buttonName='Logout'
                    handleClick={logoutRedirect}
                    showProgress={false} >
                    <div>
                        <a href={uri}>Click here</a>
                    </div>
                </MainLayout>
                <MainLayoutFooter />
            </>
        );
    }
}

export default connect(
    null,
    { logoutRedirect }
)(PortalRedirect);

