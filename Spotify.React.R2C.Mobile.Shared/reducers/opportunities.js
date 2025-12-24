import * as actionTypes from "../actionTypes/opportunities"

const initalState = {
	"isFetching": false,
	"error": null,
	"enrolling": {
		"id": null,
		"isSubmitting": false,
		"error": null,
		"isComplete": false,
		"data": {}
	},
	"data": {},
	"isAgentChangeProgramRedirect": false,
	"conflictCheck":{
		"isFetching":false,
		"conflictcheckData":{}
	}
};

//state must be Immutable 
export default (state = initalState, action) => {

	switch (action.type) {
		case actionTypes.FetchOpportunities:
		case actionTypes.FetchOpportunity:
			{
				state = {
					...state,
					error: null,
					isFetching: true
				}
				break;
			}
		case actionTypes.FetchOpportunitiesComplete: {
			state = {
				...state,
				error: null,
				isFetching: false,
				data: action.payload
			}
			break;
		}
		case actionTypes.FetchOpportunitiesError: {
			state = {
				...state,
				isFetching: false,
				error: action.payload
			}
			break;
		}
		case actionTypes.FetchOpportunityComplete: {
			state = {
				...state,
				error: null,
				isFetching: false,
				data: {
					...state.data,
					[action.payload.crmId]: action.payload
				}
			}
			break;
		}
		case actionTypes.FetchOpportunityError: {
			state = {
				...state,
				isFetching: false,
				error: action.payload
			}
			break;
		}
		case actionTypes.StageOpportunityEnrollment:
			{
				state = {
					...state,
					error: null,
					isFetching: false,
					enrolling: {
						id: action.payload,
						isSubmitting: false,
						isComplete: false,
						error: null
					}
				}
				break;
			}
		case actionTypes.ExpressInterestInOpportunity:
			state = {
				...state,
				error: '',
				enrolling: {
					...state.enrolling,
					isSubmitting: true,
					isComplete: false
				}
			};
			break;

		case actionTypes.ExpressInterestInOpportunityError:
			state = {
				...state,
				error: 'Error in submit. Please submit again.',
				enrolling: {
					...state.enrolling,
					isSubmitting: false,
					isComplete: false,
					error: (action.payload ==null ? "Error enrolling in class." : action.payload)
				}
			};

			break;

		case actionTypes.ExpressInterestInOpportunityComplete:
			state = {
				...state,
				enrolling: {
					...state.enrolling,
					isSubmitting: false,
					isComplete: true,
					data: action.payload
				}
			};

			break;

			case actionTypes.FetchOpportunitiesSecondInstance:
			case actionTypes.FetchOpportunitiesFirstInstance:
		    case actionTypes.AgentSwitchingProgram:
			{
				state = {
					...state,
					error: null,
					isFetching: true
				}
				break;
			}

			case actionTypes.AgentSwitchingProgramCompleted:
			{
				state = {
					...state,
					error: null,
					isFetching: false,
					isAgentChangeProgramRedirect: true
				}
				break;
			}

			case actionTypes.AgentSwitchingProgramReSet:
			{
				state = {
					...state,
					error: null,
					isFetching: false,
					isAgentChangeProgramRedirect: false
				}
				break;
			}
			case actionTypes.SET_SBAC_OVERIDE_REQUIRED:
				{
					const crmId=action.payload.crmId
					const sbac_Required=action.payload.sbac_Required
					state={
						...state,
						data:{
							...state.data,
							[crmId]:{
								...state.data[crmId],
								hasactivesbacoverride:sbac_Required
							}
						}
					}
				}
				break;
			case actionTypes.CheckForClassConflict:
				{
					state={
						...state,
						conflictCheck:{
							...state.conflictCheck,
							isFetching:true
						}
					}
				}
				break;
			case actionTypes.CheckForClassConflictComplete:
				{
					state={
						...state,
						conflictCheck:{
							...state.conflictCheck,
							isFetching:false,
							conflictcheckData:{
								...state.conflictCheck.conflictcheckData,
								[action.payload.classId]:action.payload.val
							}

						}
					}
				}

		default:
			return state;

	}

	return state;
}
