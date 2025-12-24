import { getWithAuthRequest, postRequestWithAuth, postRequestFormEncodedWithAuth, p } from './helpers/request';
import { getBaseUrl } from "./helpers/request"


export const checkIdentityStatus = props => {
	const { agentId, acpCrmId, enrollmentId } = props;
	return postRequestWithAuth(`${getBaseUrl()}identityverification/agents/${agentId}/acpcrmid/${acpCrmId}/enrollment/${enrollmentId}`);
	
}

export const checkExperianIDVerfication = props => {
	const { agentId, acpCrmId, enrollmentId } = props;
	const uri = `${getBaseUrl()}identityverification/agents/${agentId}`;
	return postRequestFormEncodedWithAuth(uri,
		{
			acpCrmId,
			enrollmentId
		});

}

export const saveIdentityVerificationQuestions = props => {
	const { agentId, acpCrmId, enrollmentId, sessionID, referenceNumber, questionAnswers } = props;
	const uri = `${getBaseUrl()}idverificationqa/agents/${agentId}/acpcrmid/${acpCrmId}/enrollment/${enrollmentId}`;
	return postRequestWithAuth(uri,
		{
			sessionID,
			referenceNumber,
			QuestionAndAnswer: questionAnswers
		});

}
