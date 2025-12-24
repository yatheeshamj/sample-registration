import {
    LOGOUT_REDIRECT,
    LOGIN_REDIRECT,
    LOGIN_USER,
    LOGIN_USER_COMPLETED,
    LOGIN_USER_FAILED,
    RESET_PASSWORD_COMPLETED,
    FORGOT_USERNAME_COMPLETED,
    LOGOUT_USER_COMPLETED
} from '../types/loginTypes';

const initialState = {
    formInfo: {
        username: '',
        password: ''
    },
    isSubmitting: false,
    error: '',
    redirectMessage: ''
};

export default (state = initialState, action) => {
   
    switch (action.type) {
        case LOGIN_REDIRECT:         
            break;

        case LOGOUT_REDIRECT:
            break;

        case LOGIN_USER:
            state = {
                ...state,
                error: '',
                redirectMessage: '',
                isSubmitting: true
            };
            break;

        case LOGIN_USER_COMPLETED:
            state = {
                ...state,
                isSubmitting: false
            };
            break;

        case LOGIN_USER_FAILED:
            state = {
                ...state,
                isSubmitting: false,
                error: 'Incorrect username or password'
            };
            break;
        case RESET_PASSWORD_COMPLETED:
            state = {
                ...state,
                redirectMessage: 'Password reset. Please log back in'
            };
            break;
        case FORGOT_USERNAME_COMPLETED:
            state = {
                ...state,
                redirectMessage:
                    'Please check your email for your username and log back in'
            };
            break;

        case LOGOUT_USER_COMPLETED:
            state = initialState;
            break;

        default:
            return state;
    }
    return state;
};
