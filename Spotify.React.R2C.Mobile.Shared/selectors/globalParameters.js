import { GlobalParameterTypes } from "../constants"



export const getRescheduleCutoffTime = (state) => {
		return state.globalParameters.data[GlobalParameterTypes.ENROLLMENT_RESCHEDULE_CUTOFFTIME];
}

export const getGlobalParameterByString = (state, value) => {
	return state.globalParameters.data[value];
}

export const getHarverAssessmentRequired = (state) => {
	
	if(!state.globalParameters.data['HarverAssessmentRequired'])
		return true;
	else if(state.globalParameters.data['HarverAssessmentRequired'] == 'true')
		return true;
	else 
		return false;
}





