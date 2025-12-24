import * as React from "react";
import { AuthConsumer } from "../../providers/authProvider";
import LoadingComponent from 'spotify-shared-web/components/common/LoadingComponent';
import Cookies from 'universal-cookie';

export const Logout = () => (
    <AuthConsumer>
        {({ logout }) => {
            const cookies = new Cookies;
            cookies.set('showPreferenceModal',false);
            logout();
            return <LoadingComponent />
        }}
    </AuthConsumer>
);
