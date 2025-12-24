import { getWithAuthRequest, postRequestWithAuth, postRequestFormEncodedWithAuth, p } from './helpers/request';
import { getBaseUrl } from "./helpers/request"


export const fetchPCScanRequirements = props => {
	const { agentId, rulesetId } = props;
	console.log(rulesetId)
	return getWithAuthRequest(`${getBaseUrl()}admissionpccheck/agents/${agentId}/requirements/${rulesetId}`);
}



export const createPCScanAssessment = props => {
	const { agentId, opportunityId, PcId, IpAddress, OsType } = props;
	
	const cspId = agentId;
	const returnFailedOnly = false;
	const uri = `${getBaseUrl()}admissionpccheck/agents/${agentId}`;
	return postRequestFormEncodedWithAuth(uri,
		{
			PcId,
			IpAddress,
			OsType,
			cspId,
			returnFailedOnly
		});

}

