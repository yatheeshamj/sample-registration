import * as actions from "../actionTypes/pcScan"

//


export const fetchPCScanRequirements = (payload) => ({
	type: actions.fetchPCScanRequirements,
    payload
});

export const fetchPCScanRequirementsComplete = (payload) => ({
	type: actions.fetchPCScanRequirementsComplete,
    payload
});

export const fetchPCScanRequirementsError = (payload) => ({
	type: actions.fetchPCScanRequirementsError,
    payload
});

//

export const createPCScanAssessment = (payload) => ({
	type: actions.createPCScanAssessment,
	payload
});

export const createPCScanAssessmentComplete = (payload) => ({
	type: actions.createPCScanAssessmentComplete,
	payload
});

export const createPCScanAssessmentsError = (payload) => ({
	type: actions.createPCScanAssessmentsError,
	payload
});

export const clearPCScanAssessment = (payload) => ({
	type: actions.clearPCScanAssessment,
	payload
});

