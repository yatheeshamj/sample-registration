
import * as actionTypes from "../actionTypes/enrollmentAssessments"

const initalState = {
    "isFetching": false,
    "error": null,
    "data": {
    }
};

//state must be Immutable 
export default (state = initalState, action) => {

    switch (action.type) {
        case actionTypes.GET_Enrollment_Assessments_For_Opportunity:
            {
                state = {
                    ...state,
                    error: null,
                    isFetching: true
                }
                break;
            }
        case actionTypes.GET_Enrollment_Assessments_For_Opportunity_SUCCESS: {
            state = {
                ...state,
                error: null,
                isFetching: false,
                data: {
                    ...state.data,
                    ...action.payload
                }
            }
            break;
        }
        case actionTypes.GET_Enrollment_Assessments_For_Opportunity_ERROR: {
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
