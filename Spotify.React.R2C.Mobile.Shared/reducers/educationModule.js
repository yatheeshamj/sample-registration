import * as actionTypes from "../actionTypes/educationModule"

const initalState = {
	"isFetching": false,
	"isSkiping" : false,
	"isSaving": false,
	"isComplete": false,
	"isSuccessful": false,
	"error": null,
	"data": null,
	"questions" : [],
	"videoUrl" : "",
	"completionCriteria" : "",
};

export default (state = initalState, action) => {

	switch (action.type) {
		case actionTypes.fetchQuestions:
			{
				state = {
					...state,
					error: null,
					isFetching: true
				}
				break;
			}
		case actionTypes.fetchQuestionsComplete: {
			state = {
				...state,
				error: null,
				isFetching: false,
				questions: action.payload.questions,  //q,
				videoUrl : action.payload.videoUrl, //"https://www.youtube.com/playlist?list=PLWgzSrReOBh7EMPUI84fbpmB8i7SLikUE",
				completionCriteria : action.payload.completionCriteria, // "1.0"
			}
			break;
		}
		case actionTypes.fetchQuestionsError: {
			state = {
				...state,
				isFetching: false,
				error: action.payload
			}
			break;
		}

		case actionTypes.submitAnswers: {
			state = {
				...state,
				error: null,
				isSaving: true,
				isComplete: false,
			}
			break;
		}
		case actionTypes.submitAnswersComplete: {
			state = {
				...state,
				error: null,
				isSaving: false,
				isComplete: true,
				isSuccessful: true,
			}
			break;
		}
		case actionTypes.submitAnswerssError: {
			state = {
				...state,
				isComplete: false,
				isSaving: false,
				error: action.payload != null && action.payload.data != null && action.payload.data.message != null ? action.payload.data.message : null,
				data: action.payload != null && action.payload.data != null ? action.payload.data : null
			}
			break;
		}
		case actionTypes.skipModule: {
			state = {
				...state,
				error: null,
				isSkiping: true,
				isComplete: false,
			}
			break;
		}
		case actionTypes.skipModuleComplete: {
			state = {
				...state,
				error: null,
				isSkiping: false,
				isComplete: true,
				isSuccessful: true,
			}
			break;
		}
		case actionTypes.skipModuleError: {
			state = {
				...state,
				isComplete: false,
				isSkiping: false,
				error: action.payload != null && action.payload.data != null && action.payload.data.message != null ? action.payload.data.message : null,
				data: action.payload != null && action.payload.data != null ? action.payload.data : null
			}
			break;
		}
		case actionTypes.clearAnswers: {
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
