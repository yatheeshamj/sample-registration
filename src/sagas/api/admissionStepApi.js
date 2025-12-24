import { getWithAuthRequest } from 'spotify-shared/api/helpers/request';
import { BASE_API_URL } from '../../config';

export default {
    getAdmissionStepInstances(action) {
        const agentId = action.payload;
        return getWithAuthRequest(`${BASE_API_URL}admissionstepinstances/agents/${agentId}`);
    }
};
