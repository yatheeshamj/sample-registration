import {
    GET_AUTH_TOKEN_COMPLETED,
    GET_AUTH_TOKEN_FAILED,
    GET_TOKEN,
    SET_TOKEN
} from '../types/authTypes';

import {
    LOGIN_USER_COMPLETED,
    LOGIN_USER_FAILED,
    LOGOUT_USER_COMPLETED
} from '../types/loginTypes';

const initialState = {
    authToken: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_AUTH_TOKEN_COMPLETED:
            state = {
                authToken: action.payload.data
            };
            break;

        case GET_AUTH_TOKEN_FAILED:
            state = {
                authToken: ''
            };
            break;

        case SET_TOKEN:
            state = { authToken: action.payload };
           // debugger;
            break;

        case GET_TOKEN:
            state = { ...state };
           // debugger;
            break;

        case LOGIN_USER_COMPLETED:
            state = {
                authToken: action.payload.data
            };
            break;

        case LOGIN_USER_FAILED:
            state = {
                authToken: ''
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
