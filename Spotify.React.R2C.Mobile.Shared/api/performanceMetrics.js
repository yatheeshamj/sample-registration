import { getWithAuthRequest, postRequestWithAuth } from './helpers/request';
import { getBaseUrl } from "./helpers/request"




export const metricsForProgram = props => {
    const { programCrmId, agentId } = props;
    return getWithAuthRequest(`${getBaseUrl()}cspcontracts/agents/${agentId}/application/${programCrmId}`);
}
