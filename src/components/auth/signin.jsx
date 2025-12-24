import * as React from "react";

import { AuthConsumer } from "../../providers/authProvider";
import LoadingComponent from 'spotify-shared-web/components/common/LoadingComponent';



export const SignIn = () => (
    <AuthConsumer>
        {({ signinRedirect }) => {
            signinRedirect();
            return <LoadingComponent />
        }}
    </AuthConsumer>
);
