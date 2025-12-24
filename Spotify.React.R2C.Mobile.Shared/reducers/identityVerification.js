import * as actionTypes from "../actionTypes/identityVerification"

const initalState = {
	"isFetching": false,
	"isSaving": false,
	"isComplete": false,
	"isSuccessful": false,
	"questionData": {
		"hasQuestions": false,
		"intialQuestions": false,
		"data": null,
	},
	"error": null,
	"data": null
};

export default (state = initalState, action) => {

	switch (action.type) {
		case actionTypes.checkIdentityStatus:
			{
				state = {
					...state,
					error: null,
					isFetching: true
				}
				break;
			}
		case actionTypes.checkIdentityStatusComplete: {
			state = {
				...state,
				error: null,
				isFetching: false,
				data: action.payload
			}
			break;
		}
		case actionTypes.checkIdentityStatusError: {
			state = {
				...state,
				isFetching: false,
				error: action.payload
			}
			break;
		}

		case actionTypes.checkInitialExperianVerification: {
			state = {
				...state,
				error: null,
				isFetching: false,
				isSaving: true,
				isComplete: false,
				questionData: {
					hasQuestions: false,
					intialQuestions: false,
					data: null
				}
			}
			break;
		}
		case actionTypes.checkInitialExperianVerificationComplete: {
			state = {
				...state,
				error: action.payload != null && action.payload.status != null && action.payload.status == "FAIL" ? 'Failed to verify your identity.' : '',
				isSaving: false,
				isComplete: true,
				isSuccessful: action.payload != null && action.payload.status != null && action.payload.status == "FAIL" ? false : true,
				questionData: {
					hasQuestions: action.payload != null && action.payload.questionAndAnswer != null && action.payload.questionAndAnswer.length > 0  ? true : false,
					intialQuestions: action.payload != null && action.payload.status != null && action.payload.status == "FAIL" ? false : true,
					data: action.payload
				},
			}
			break;
		}
		case actionTypes.checkInitialExperianVerificationError: {
			state = {
				...state,
				isComplete: false,
				isSaving: false,
				error: action.payload != null && action.payload.resultCodeDescription != null ? action.payload.resultCodeDescription : "Error getting ID Verification Questions",
				questionData: {
					hasQuestions: false,
					intialQuestions: false,
					data: action.payload != null && action.payload.data != null ? action.payload.data : null,
				},
			}
			break;
		}
		case actionTypes.clearIdentityVerificationAssessment: {
			state = {
				...state,
				isComplete: false,
				isSaving: false,
				isSuccessful: false,
				questionData: {
					hasQuestions: false,
					intialQuestions: false,
					data: null
				},
				error: null,
				data: null
			}
			break;
		}
		case actionTypes.saveIdentityVerificationQuestions: {
			state = {
				...state,
				error: null,
				isFetching: false,
				isSaving: true,
				isComplete: false,
				questionData: {
					hasQuestions: false,
					intialQuestions: false,
					data: null
				}
			}
			break;
		}
		case actionTypes.saveIdentityVerificationQuestionsComplete: {
			state = {
				...state,
				error: action.payload != null && action.payload.status != null && action.payload.status == "FAIL" ? 'Failed to verify your identity.' : '',
				isSaving: false,
				isComplete: true,
				isSuccessful: action.payload != null && action.payload.status != null && action.payload.status == "FAIL" ? false : true,
				questionData: {
					hasQuestions: action.payload != null && action.payload.questionAndAnswer != null  && action.payload.questionAndAnswer.length > 0 ? true : false,
					intialQuestions: false,
					data: action.payload
				},
			}
			break;
		}
		case actionTypes.saveIdentityVerificationQuestionsError: {
			state = {
				...state,
				isComplete: false,
				isSaving: false,
				error: action.payload != null && action.payload.resultCodeDescription != null ? action.payload.resultCodeDescription : "Error getting ID Verification Questions",
				questionData: {
					hasQuestions: false,
					intialQuestions: false,
					data: action.payload != null && action.payload.data != null ? action.payload.data : null,
				},
			}
			break;
		}

		default:
			return state;

	}

	return state;
}
