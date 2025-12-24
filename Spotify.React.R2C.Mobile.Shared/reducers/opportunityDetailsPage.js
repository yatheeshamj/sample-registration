import * as actionTypes from "../actionTypes/opportunityDetailsPage"

const initalState = {
    "isFetching": false,
    "error": null,
    "opportunityId": null,
    "userdataPrograms": {
        data: null,
        isloading: false
    }
};

//state must be Immutable 
export default (state = initalState, action) => {

    switch (action.type) {
        case actionTypes.InitializeOpportunityDetailsPage: {
            state = {
                ...state,
                isFetching: true,
                opportunityId: action.payload.opportunityId
            }
            break;
        }
        case actionTypes.InitializeOpportunityDetailsPageComplete: {
            state = {
                ...state,
                isFetching: false
            }
            break;
        }
        case actionTypes.FetchUserDataProgram: {
            state = {
                ...state,
                userdataPrograms: {
                    ...state.userdataPrograms,
                    isloading: true
                }

            }
            break;
        }
        case actionTypes.FetchUserDataProgramComplete: {
            state = {
                ...state,
                userdataPrograms: {
                    isloading: false,
                    data: action.payload
                }
            }
            break;
        }

        default:
            return state;

    }

    return state;
}
