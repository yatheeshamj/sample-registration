import { getWithAuthRequest } from './helpers/request';
import { getBaseUrl } from "./helpers/request"

export const welcomeContent = props => {
	const { agentId } = props;
	return getWithAuthRequest(`${getBaseUrl()}welcomecontents/agents/${agentId}`);
}
