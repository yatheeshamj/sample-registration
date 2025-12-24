import * as actions from "../actionTypes/globalParameters"

//
export const retrieveGlobalParameter = (payload) => ({
	type: actions.RETRIEVEGLOBALPARAMETER,
	payload: payload
});

export const retrieveGlobalParameterError = (payload) => ({
	type: actions.RETRIEVEGLOBALPARAMETERERROR,
	payload
});

export const retrieveGlobalParameterComplete = (payload) => ({
	type: actions.RETRIEVEGLOBALPARAMETERCOMPLETE,
	payload
});
