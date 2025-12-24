import * as actions from "../actionTypes/selfassessments"

//
export const fetchSelfAssessments = (payload) => ({
    type: actions.fetchSelfAssessments,
    payload
});

export const fetchSelfAssessmentsComplete = (payload) => ({
    type: actions.fetchSelfAssessmentsComplete,
    payload
});

export const fetchSelfAssessmentsError = (payload) => ({
    type: actions.fetchSelfAssessmentsError,
    payload
});


//
export const saveSelfAssessments = (agentId, enrollmentId, questions) => ({
	type: actions.saveSelfAssessments,
	payload: { agentId, enrollmentId, questions }
});

export const saveSelfAssessmentsComplete = (payload) => ({
	type: actions.saveSelfAssessmentsComplete,
	payload
});

export const saveSelfAssessmentsError = (payload) => ({
	type: actions.saveSelfAssessmentsError,
	payload
});
