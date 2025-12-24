import * as actionTypes from "../actionTypes/selfassessments"

const initalState = {
	"isFetching": false,
	"isSaving": false,
	"isComplete": false,
	"error": null,
	"data": [],
};

export default (state = initalState, action) => {

	switch (action.type) {
		case actionTypes.fetchSelfAssessments:
			{
				state = {
					...state,
					error: null,
					isFetching: true
				}
				break;
			}
		case actionTypes.fetchSelfAssessmentsComplete: {
			state = {
				...state,
				error: null,
				isFetching: false,
				data: action.payload
			}
			break;
		}
		case actionTypes.fetchSelfAssessmentsError: {
			state = {
				...state,
				isFetching: false,
				error: action.payload
			}
			break;
		}

		case actionTypes.saveSelfAssessments: {
			state = {
				...state,
				error: null,
				isSaving: true,
				isComplete: false
			}
			break;
		}
		case actionTypes.saveSelfAssessmentsComplete: {
			state = {
				...state,
				error: null,
				isSaving: false,
				isComplete: true
			}
			break;
		}
		case actionTypes.fetchSelfAssessmentsError: {
			state = {
				...state,
				isComplete: false,
				isSaving: false,
				error: action.payload
			}
			break;
		}

		default:
			return state;

	}

	return state;
}
