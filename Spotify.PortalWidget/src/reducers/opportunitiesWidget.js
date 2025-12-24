import * as actionTypes from "../actionTypes/opportunitiesWidget"

const initalState = {
    "isSubmitting": false,
    "error": null,
    "activeTab": 'Opportunities',
    "opportunitiesTab": {
        "data": []
    },
    "inProgressTab": {
        "data": []
    }
};

//state must be Immutable 
export default (state = initalState, action) => {

    switch (action.type) {
        case actionTypes.Opportunity_Widget_SET_TAB: {
            state = {
                ...state,
                activeTab: action.payload
            }
            break;
        }

        case actionTypes.Opportunity_Widget_Set_Opportunities_Data: {
            state = {
                ...state,
                error: null,
                opportunitiesTab: {
                    ...state.opportunitiesTab,
                    data: action.payload
                }
            }
            break;
        }

        case actionTypes.Opportunity_Widget_Set_In_Progress_Data: {
            state = {
                ...state,
                error: null,
                inProgressTab: {
                    ...state.opportunitiesTab,
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
