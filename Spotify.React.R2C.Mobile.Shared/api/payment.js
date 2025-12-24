import { getWithAuthRequest, getRequest, postRequestFormEncodedWithAuth, p } from './helpers/request';
import { getBaseUrl } from "./helpers/request"


export const retrieveShippingAddress = props => {
	const { agentId, opportunityId } = props;
	return getWithAuthRequest(`${getBaseUrl()}shipping/agentid/${agentId}/opportunity/${opportunityId}`);
	
}

export const validateShippingAddress = props => {
	const { agentId, street1, street2, city, stateProvince, zipPostalCode, addressString} = props;
	const uri = `${getBaseUrl()}shipping/agentid/${agentId}`;
	return postRequestFormEncodedWithAuth(uri,
		{
			street1,
			street2,
			city,
			stateProvince,
			zipPostalCode,
			addressString
		});

}

export const getFormatAddress = props => {
	const { agentId, moniker } = props;
	return getWithAuthRequest(`${getBaseUrl()}shipping/agentid/${agentId}/monikers/${moniker}`);

}

export const getPaymentInfo = props => {
	const { agentId, enrollmentId } = props;
	return getWithAuthRequest(`${getBaseUrl()}paymentinfo/agentId/${agentId}/enrollmentId/${enrollmentId}`);

}

export const getStates = props => {
	return getRequest(`${getBaseUrl()}states`);

}

export const paymentComplete = props => {
	const { agentId, itemCost, vouchersUsed, isOppCapturedCostBigger, enrollmentCrmId, opportunityCrmId, voucherType} = props;
	const uri = `${getBaseUrl()}paymentcomplete/agentid/${agentId}`;
	return postRequestFormEncodedWithAuth(uri,
		{
			itemCost,
			vouchersUsed,
			isOppCapturedCostBigger,
			enrollmentCrmId,
			opportunityCrmId,
			voucherType
		});
}
