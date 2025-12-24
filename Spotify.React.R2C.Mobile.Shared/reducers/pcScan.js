import * as actionTypes from "../actionTypes/pcScan"

const initalState = {
	"isFetching": false,
	"isSaving": false,
	"isComplete": false,
	"isSuccessful": false,
	"error": null,
	"data": null,
	"requirements" : [],
};

export default (state = initalState, action) => {

	switch (action.type) {
		case actionTypes.fetchPCScanRequirements:
			{
				state = {
					...state,
					error: null,
					isFetching: true
				}
				break;
			}
		case actionTypes.fetchPCScanRequirementsComplete: {
			state = {
				...state,
				error: null,
				isFetching: false,
				requirements: action.payload
			}
			break;
		}
		case actionTypes.fetchPCScanRequirementsError: {
			state = {
				...state,
				isFetching: false,
				error: action.payload
			}
			break;
		}

		case actionTypes.createPCScanAssessment: {
			state = {
				...state,
				error: null,
				isSaving: true,
				isComplete: false,
			}
			break;
		}
		case actionTypes.createPCScanAssessmentComplete: {
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
		case actionTypes.createPCScanAssessmentsError: {
			state = {
				...state,
				isComplete: false,
				isSaving: false,
				error: action.payload != null && action.payload.data != null && action.payload.data.message != null ? action.payload.data.message : null,
				data: action.payload != null && action.payload.data != null ? action.payload.data : null
			}
			break;
		}
		case actionTypes.clearPCScanAssessment: {
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
