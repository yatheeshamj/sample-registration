import React from "react";
import { AuthConsumer } from "../../providers/authProvider";
import LogOut from '../logout/LogOut';

export const LogoutCallback = () => (
    <AuthConsumer>
        {({ signoutRedirectCallback }) => {
            signoutRedirectCallback();
            return <LogOut />;
        }}
    </AuthConsumer>
);
