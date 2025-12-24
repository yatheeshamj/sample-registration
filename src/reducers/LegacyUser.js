import {
    GET_LEGACY_ID_COMPLETE
} from '../types/registrationTypes';



const initialState = {

};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_LEGACY_ID_COMPLETE:
            state = action.payload.data;
            break;
        default:
            return state;
    }
    return state;
};
