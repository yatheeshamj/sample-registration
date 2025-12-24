import { getWithAuthRequest, getRequest, postRequestFormEncodedWithAuth, p, postRequestWithAuth } from './helpers/request';
import { getBaseUrl } from "./helpers/request"


export const retrieveTrnDetails = props => {
	const { agentId } = props;
	return getWithAuthRequest(`${getBaseUrl()}verifytrn/agentId/${agentId}`);
	
}

export const validateTrnDetails = props => {
	console.log(props,"inside api")
	const { agentId, enrollmentId,firstName,lastName,ssn} = props;
	return postRequestWithAuth(`${getBaseUrl()}verifytrn/agentId/${agentId}/actTRN/${ssn}/FirstName/${firstName}/LastName/${lastName}/enrollments/${enrollmentId}`);
	
}




