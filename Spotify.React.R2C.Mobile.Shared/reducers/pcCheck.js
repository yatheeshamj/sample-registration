import * as actionTypes from "../actionTypes/pcCheck"

const initalState = {
	"isFetching": false,
	"isSaving": false,
	"isComplete": false,
	"isSuccessful": false,
	"error": null,
	"data": null,
};

export default (state = initalState, action) => {

	switch (action.type) {
		case actionTypes.fetchPCCheckRequirements:
			{
				state = {
					...state,
					error: null,
					isFetching: true
				}
				break;
			}
		case actionTypes.fetchPCCheckRequirementsComplete: {
			state = {
				...state,
				error: null,
				isFetching: false,
				data: action.payload
			}
			break;
		}
		case actionTypes.fetchPCCheckRequirementsError: {
			state = {
				...state,
				isFetching: false,
				error: action.payload
			}
			break;
		}

		case actionTypes.createPCCheckAssessment: {
			state = {
				...state,
				error: null,
				isSaving: true,
				isComplete: false,
			}
			break;
		}
		case actionTypes.createPCCheckAssessmentComplete: {
			state = {
				...state,
				error: null,
				isSaving: false,
				isComplete: true,
				isSuccessful: action.payload != null && action.payload.globalResult != null && action.payload.globalResult == "PASS" ? true : false,
				data: action.payload
			}
			break;
		}
		case actionTypes.createPCCheckAssessmentsError: {
			state = {
				...state,
				isComplete: false,
				isSaving: false,
				error: action.payload != null && action.payload.data != null && action.payload.data.message != null ? action.payload.data.message : null,
				data: action.payload != null && action.payload.data != null ? action.payload.data : null
			}
			break;
		}
		case actionTypes.clearPCCheckAssessment: {
			state = {
				...state,
				isComplete: false,
				isSaving: false,
				error: null,
				data: null
			}
			break;
		}

		default:
			return state;

	}

	return state;
}
