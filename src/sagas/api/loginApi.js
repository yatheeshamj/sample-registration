import {
    getRequest,
    putRequestFormEncoded,
    postRequestFormEncoded
} from 'spotify-shared/api/helpers/request';

import AuthService from "../../services/authService";
import { LOGIN_BASE_URL } from '../../config';

export default {    

    loginRedirect() { 
        var authService = new AuthService();
        authService.signinRedirect();  
    },

    logoutRedirect() {
        var authService = new AuthService();
        authService.logout();
    },   

    forgotPassword(action) {
        const { username, email } = action.payload;

        return getRequest(
            `${LOGIN_BASE_URL}forgotpassword/usernames/${username}/emails?emailAddress=${email}`
        );
    },

    resetPassword(action) {
        return putRequestFormEncoded(
            `${LOGIN_BASE_URL}userpasswords`,
            action.payload
        );
    },

    forgotUsername(action) {
        const { email } = action.payload;

        return getRequest(
            `${LOGIN_BASE_URL}forgotusername/emails?emailAddress=${email}`
        );
    },

    verifyReCaptcha(action) {
        return postRequestFormEncoded(
            `${LOGIN_BASE_URL}recaptcha`,
            action.payload
        );
    }
};
