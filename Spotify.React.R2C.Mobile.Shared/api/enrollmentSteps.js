

import { getWithAuthRequest } from './helpers/request';
import { getBaseUrl } from "./helpers/request"


export const getByIdForAgent = props => {
    const { agentId, enrollmentId } = props;
    return getWithAuthRequest(`${getBaseUrl()}enrollmentsteps/agents/${agentId}/enrollments/${enrollmentId}`);
}
