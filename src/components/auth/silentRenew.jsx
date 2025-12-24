import React from "react";

import { AuthConsumer } from "../../providers/authProvider";
import LoadingComponent from 'spotify-shared-web/components/common/LoadingComponent';

export const SilentRenew = () => (
    <AuthConsumer>
        {({ signinSilentCallback }) => {
            signinSilentCallback();
            return <LoadingComponent />
        }}
    </AuthConsumer>
);
