import {
    GET_USER_COUNTRY_COMPLETED,
    GET_USER_COUNTRY_FAILED,
} from '../actionTypes/country';

const initialState = {

};

export default (state = initialState, action) => {
    switch (action.type) {

        case GET_USER_COUNTRY_COMPLETED:
            state = {
                ...state,
                ...action.payload.data
            };
            break;

        case GET_USER_COUNTRY_FAILED:
            state = {
                ...state,
               
            };
            break;



        default:
            return state;
    }
    return state;
};
