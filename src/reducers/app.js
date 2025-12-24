import {
    SET_USER_DEVICE,
    SET_COUNTRY_CONFIGURATIONS
} from '../types/appTypes';



const initialState = {
    device: null,
    countryConfigurations: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DEVICE:
            state = {
                ...state,
                device: action.payload
            };
            break;
        case SET_COUNTRY_CONFIGURATIONS:

            state = {
                ...state,
                countryConfigurations: {
                    countryCode: action.payload[0],
                    config: action.payload[1]
                }
            };
            break;
        default:
            return state;
    }
    return state;
};
