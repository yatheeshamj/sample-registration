import * as actionTypes from "../actionTypes/enrollmentSteps"

const initalState = {
    "isFetching": false,
    "error": null,
    "data": []
};

export default (state = initalState, action) => {

    switch (action.type) {
        case actionTypes.FetchEnrollmentSteps:
            {
                state = {
                    ...state,
                    error: null,
                    isFetching: true
                }
                break;
            }
        case actionTypes.FetchEnrollmentStepsComplete: {
            state = {
                ...state,
                error: null,
                isFetching: false,
                data: action.payload
            }
            break;
        }
        case actionTypes.FetchEnrollmentStepsError: {
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
