import {
    SET_TOKEN,
    SET_TOKEN_MISSING,
    UnauthorizedResponseReceived
} from '../actionTypes/auth';



const initialState = {
    tokenMissing: false,
    authToken: '',
    tokenExpired: false   
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_TOKEN:
            state = { authToken: action.payload };
            break;

        case SET_TOKEN_MISSING:
            state = {
                ...state,
                tokenMissing: true
            };
            break;
        case UnauthorizedResponseReceived:
            state = {
                ...state,
                tokenExpired: true
            };
            break;

        default:
            return state;
    }
    return state;
};
