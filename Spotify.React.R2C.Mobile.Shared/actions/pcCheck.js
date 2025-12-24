import * as actions from "../actionTypes/pcCheck"

//
export const fetchPCCheckRequirements = (payload) => ({
	type: actions.fetchPCCheckRequirements,
    payload
});

export const fetchPCCheckRequirementsComplete = (payload) => ({
	type: actions.fetchPCCheckRequirementsComplete,
    payload
});

export const fetchPCCheckRequirementsError = (payload) => ({
	type: actions.fetchPCCheckRequirementsError,
    payload
});


//
export const createPCCheckAssessment = (payload) => ({
	type: actions.createPCCheckAssessment,
	payload
});

export const createPCCheckAssessmentComplete = (payload) => ({
	type: actions.createPCCheckAssessmentComplete,
	payload
});

export const createPCCheckAssessmentsError = (payload) => ({
	type: actions.createPCCheckAssessmentsError,
	payload
});

export const clearPCCheckAssessment = (payload) => ({
	type: actions.clearPCCheckAssessment,
	payload
});

