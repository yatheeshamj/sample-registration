import * as actions from "../actionTypes/welcomeContent"

//
export const fetchWelcomeContent = (payload) => ({
	type: actions.FetchWelcomeContent,
    payload
});

export const fetchWelcomeContentComplete = (payload) => ({
    type: actions.FetchWelcomeContentComplete,
    payload
});

export const fetchWelcomeContentError = (payload) => ({
    type: actions.FetchWelcomeContentError,
    payload
});
