import * as actions from "../actionTypes/educationModule"

//


export const fetchQuestions = (payload) => ({
	type: actions.fetchQuestions,
    payload
});

export const fetchQuestionsComplete = (payload) => ({
	type: actions.fetchQuestionsComplete,
    payload
});

export const fetchQuestionsError = (payload) => ({
	type: actions.fetchQuestionsError,
    payload
});

//

export const SubmitAnswers = (payload) => ({
	type: actions.submitAnswers,
	payload
});

export const SubmitAnswersComplete = (payload) => ({
	type: actions.submitAnswersComplete,
	payload
});

export const SubmitAnswerssError = (payload) => ({
	type: actions.submitAnswerssError,
	payload
});

export const clearAnswers = (payload) => ({
	type: actions.clearAnswers,
	payload
});


export const skipModule = (payload) => ({
	type: actions.skipModule,
	payload
});

export const skipModuleComplete = (payload) => ({
	type: actions.skipModuleComplete,
	payload
});

export const skipModuleError = (payload) => ({
	type: actions.skipModuleError,
	payload
});
