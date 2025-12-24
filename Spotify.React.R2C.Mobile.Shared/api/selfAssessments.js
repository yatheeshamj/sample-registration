import { getWithAuthRequest, postRequestWithAuth, postRequestFormEncodedWithAuth, p } from './helpers/request';
import { getBaseUrl } from "./helpers/request"


export const getSelfAssessments = props => {
    const { agentId, opportunityId } = props;
	return getWithAuthRequest(`${getBaseUrl()}assessments/agents/${agentId}/opportunities/${opportunityId}`);
}


export const saveSelfAssessments = props => {
	const { agentId, enrollmentId, questions} = props;
	const uri = `${getBaseUrl()}assessments/agents/${agentId}`;
	return postRequestFormEncodedWithAuth(uri,
		{
			enrollmentId,
			questions
		});

}
