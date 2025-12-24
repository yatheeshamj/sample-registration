import * as actionTypes from "../actionTypes/enrollmentPrerequisitesPage"

const initalState = {
    "isFetching": false,
    "error": null,
    "opportunityId": null,
    "enrollmentId": null
};


export default (state = initalState, action) => {

    
    switch (action.type) {
        case actionTypes.InitializeEnrollmentPrerequisitesPage: {
            state = {
                ...state,
                isFetching: true,
                opportunityId: action.payload.opportunityId,
                enrollmentId: action.payload.enrollmentId
            }
            break;
        }
        case actionTypes.InitializeEnrollmentPrerequisitesPageComplete: {
            state = {
                ...state,
                isFetching: false
            }
            break;
        }
        case actionTypes.InitializeEnrollmentPrerequisitesPageError: {
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
