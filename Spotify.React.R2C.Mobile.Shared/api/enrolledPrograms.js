import { getWithAuthRequest, postRequestWithAuth, postRequestFormEncodedWithAuth } from './helpers/request';
import { getBaseUrl } from "./helpers/request"


export const getByAgent = props => {
    const { agentId } = props;
    return getWithAuthRequest(`${getBaseUrl()}enrolledprograms/agents/${agentId}`);
}

export const getByIdForAgent = props => {
	const { agentId, enrollmentId } = props;
	return getWithAuthRequest(`${getBaseUrl()}enrolledprograms/agents/${agentId}/application/${enrollmentId}`);
}

export const cancelEnrollment = props => {
	const { agentId, enrollmentId } = props;
	return postRequestWithAuth(`${getBaseUrl()}enrollmentopportunities/agents/${agentId}/enrollments/${enrollmentId}`);
}

export const dropEnrollment = props => {
	const { agentId, opportunityCrmId, opportunityStatusReasonId, agentSelfDropped } = props;
	const uri = `${getBaseUrl()}enrollment/agents/${agentId}`;
	return postRequestFormEncodedWithAuth(uri,
		{
			opportunityCrmId,
			opportunityStatusReasonId,
			agentSelfDropped
		});

}

export const getDropStatusReasons = props => {
	return getWithAuthRequest(`${getBaseUrl()}EnrollmentOpportunities/status/45B35F12-93BC-E111-9E34-0EE1388CCC3A/global/OpportunityStatusReasonsEligibleToDisplay`);
}

export const rescheduleEnrollment = props => {
	const { agentId, opportunityId, classId } = props;
	return postRequestWithAuth(`${getBaseUrl()}enrollmentopportunities/agents/${agentId}/opportunity/${opportunityId}/class/${classId}`);
}

export const CheckEligibility = props => {
	const {agentId, opportunityId } = props;
	return postRequestWithAuth(`${getBaseUrl()}enrollmentopportunities/agents/${agentId}/opportunity/${opportunityId}`);
} 
