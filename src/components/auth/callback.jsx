import * as React from "react";

import { AuthConsumer } from "../../providers/authProvider";
import LoadingComponent from 'spotify-shared-web/components/common/LoadingComponent';

export const Callback = () => (
    <AuthConsumer>
        {({ signinRedirectCallback }) => {
            signinRedirectCallback();
            return <LoadingComponent />
        }}
    </AuthConsumer>
);
