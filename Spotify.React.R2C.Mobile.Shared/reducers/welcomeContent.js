import * as actionTypes from "../actionTypes/welcomeContent"

const initalState = {
    "isFetching": false,
    "error": null,
    "data": {}
};

//state must be Immutable 
export default (state = initalState, action) => {

    switch (action.type) {
        case actionTypes.FetchWelcomeContent:
            {
                state = {
                    ...state,
                    error: null,
                    isFetching: true
                }
                break;
            }
        case actionTypes.FetchWelcomeContentComplete: {
            state = {
                ...state,
                error: null,
                isFetching: false,
                data: action.payload
            }
            break;
        }
        case actionTypes.FetchWelcomeContentError: {
            state = {
                ...state,
                isFetching: false,
                error: action.payload
            }
            break;
        }
        default:
            return state;

    }

    return state;
}
