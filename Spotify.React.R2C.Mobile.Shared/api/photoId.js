

import { getWithAuthRequest, postRequestWithAuth, postRequest } from './helpers/request';
import { getBaseUrl } from "./helpers/request"


export const initialisePhotoIdQRCode = props => {
    const { agentId, enrollmentId, acpcrmid } = props;
    return postRequestWithAuth(`${getBaseUrl()}photoid/agents/${agentId}/acpcrmid/${acpcrmid}/enrollment/${enrollmentId}`);
}



export const photoIdStatus = props => {
    const { agentId, enrollmentId, acpcrmid } = props;
    return getWithAuthRequest(`${getBaseUrl()}photoid/agents/${agentId}/acpcrmid/${acpcrmid}/enrollment/${enrollmentId}`);
}

export const photoIdResponse = props => {

    const { transactionReference, customerInternalReference, transactionStatus, errorCode } = props;
    return postRequest(`${getBaseUrl()}photoidresponse/transactionid/${transactionReference}/internalref/${customerInternalReference}/status/${transactionStatus}/errorcode/${errorCode}`);
}

export const getMedia = (payload) => {
    const { countryId } = payload;
    return getWithAuthRequest(
        `${getBaseUrl()}medias/countries/${countryId}/items/1000002`
    );
}
