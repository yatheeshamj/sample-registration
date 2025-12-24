import {
    GET_PREFERENCES,
    GET_PREFERENCES_COMPLETED,
    GET_PREFERENCES_FAILED,
    UPDATE_PREFERENCES,
    UPDATE_PREFERENCES_COMPLETED,
    UPDATE_PREFERENCES_FAILED
} from '../actionTypes/preferencesTypes';



const initialState = {
    isFetchComplete: false,
    isFetchInProgress: true,
    isSubmitting: false,
    data: [],
    error: undefined
};

export default (state = initialState, action) => {
    switch (action.type) {

        case UPDATE_PREFERENCES:
            state = {
                ...state,
                error: '',
                isSubmitting: true
            };
            break;

        case UPDATE_PREFERENCES_FAILED:
            state = {
                ...state,
                isSubmitting: false,
                error: 'Error in submit. Please submit again.'
            };

            break;

        case UPDATE_PREFERENCES_COMPLETED:
            state = {
                ...state,
                isSubmitting: false
            };

            break;


        case GET_PREFERENCES:
            state = {
                ...state,
                isFetchComplete: false,
                isFetchInProgress: true
            };
            break;

        case GET_PREFERENCES_COMPLETED:
            state = {
                ...state,
                isFetchComplete: true,
                isFetchInProgress: false,
                data: action.payload.data
            };
            break;

        case GET_PREFERENCES_FAILED:
            state = {
                ...state,
                isFetchComplete: true,
                error: 'Could not retrieve preferences'
            };
            break;


        default:
            return state;
    }
    return state;
};
