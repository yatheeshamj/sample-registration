import { country } from '../reducers';
import { getWithAuthRequest, postRequestWithAuth, postRequestFormEncodedWithAuth } from './helpers/request';
import { getBaseUrl } from "./helpers/request"


export const generateUSLink = props => {
    const { agentId, opportunityId } = props;
    return postRequestWithAuth(`${getBaseUrl()}backgroundcheck/agents/${agentId}/opportunity/${opportunityId}`);
}

export const getStatus = props => {
    const { agentId, enrollmentId } = props;
    return getWithAuthRequest(`${getBaseUrl()}backgroundcheck/agents/${agentId}/enrollment/${enrollmentId}`);
}

export const getBGCOrderId = props => {
    const { agentId } = props;

    return postRequestWithAuth(`${getBaseUrl()}IndiaBGC/AgentId/${agentId}`);
}


export const submitUK = props => {
    const { agentId, opportunityId, orderNumber } = props;
    return postRequestWithAuth(`${getBaseUrl()}backgroundcheck/agents/${agentId}/opportunity/${opportunityId}/orders/${orderNumber}`);
}


export const submitCountry = props => {
    const { agentId, opportunityId, orderNumber, countryId } = props;
    return postRequestWithAuth(`${getBaseUrl()}backgroundcheck/agents/${agentId}/opportunity/${opportunityId}/country/${countryId}`);
}
