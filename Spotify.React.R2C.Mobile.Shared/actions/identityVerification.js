import * as actions from "../actionTypes/identityVerification"

//
export const checkIdentityStatus = (payload) => ({
	type: actions.checkIdentityStatus,
    payload
});

export const checkIdentityStatusComplete = (payload) => ({
	type: actions.checkIdentityStatusComplete,
    payload
});

export const checkIdentityStatusError = (payload) => ({
	type: actions.checkIdentityStatusError,
    payload
});


export const checkInitialExperianVerification = (payload) => ({
	type: actions.checkInitialExperianVerification,
	payload
});

export const checkInitialExperianVerificationComplete = (payload) => ({
	type: actions.checkInitialExperianVerificationComplete,
	payload
});

export const checkInitialExperianVerificationError = (payload) => ({
	type: actions.checkInitialExperianVerificationError,
	payload
});

export const clearIdentityVerificationAssessment = (payload) => ({
	type: actions.clearIdentityVerificationAssessment,
	payload
});


export const saveIdentityVerificationQuestions = (payload) => ({
	type: actions.saveIdentityVerificationQuestions,
	payload
});

export const saveIdentityVerificationQuestionsComplete = (payload) => ({
	type: actions.saveIdentityVerificationQuestionsComplete,
	payload
});

export const saveIdentityVerificationQuestionsError = (payload) => ({
	type: actions.saveIdentityVerificationQuestionsError,
	payload
});
