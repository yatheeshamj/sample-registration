import { getWithAuthRequest, postRequestWithAuth } from './helpers/request';
import { getBaseUrl } from "./helpers/request"


export const getPreferencesQuestions = (action) => {
	const agentId = action.payload;
	const onlyRequired = action.onlyRequired;
	const params = { onlyRequired }
	return getWithAuthRequest(`${getBaseUrl()}preferencesquestions/agents/${agentId}`, null, params);
}


export const updatePreferences = (action) => {
	const { agentId, preferences } = action.payload;
	console.log(preferences);
	const uri = `${getBaseUrl()}AgentAnsweredQuestions/agents/${agentId}`;
	return postRequestWithAuth(uri, preferences);
}
