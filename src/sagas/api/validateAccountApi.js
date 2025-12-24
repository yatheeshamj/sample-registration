import {
    getWithAuthRequest,
    putWithAuthRequest,
    postRequestFormEncodedWithAuth
} from 'spotify-shared/api/helpers/request';

import { BASE_API_URL } from '../../config';

export default {
    validateAccount(action) {
        const { agentId, validationCodeType, validationCode } = action.payload;
        const uri = `${BASE_API_URL}validationcodes/agents/${agentId}/codetypes/${validationCodeType}/codes/${validationCode}`;
        return getWithAuthRequest(uri);
    },

    resendValidationCode(action) {
        const { userId, validationCodeType } = action.payload;        
        const uri = `${BASE_API_URL}validationcodes/users/${userId}/codetypes/${validationCodeType}`;       
        return postRequestFormEncodedWithAuth(uri, null);
    },

    updateMobilePhone(action) {
        const { agentId, mobilePhone } = action.payload;
        const uri = `${BASE_API_URL}agentmobilenumbers/agents/${agentId}/mobilenumbers/${mobilePhone}`;
        return putWithAuthRequest(uri, null);
    },

    updateEmail(action) {
        const { agentId, email } = action.payload;
        var uri = `${BASE_API_URL}agentprofiles/agents/${agentId}/emails?emailAddress=${email}`;
        return putWithAuthRequest(uri, null);
    },

    submitPhoneUsageConsent(agentId, consent, referralURL) {
        const requestData = {Consent: consent, ReferralUrl: referralURL}
        const uri = `${BASE_API_URL}agentprofiles/agents/${agentId}/phoneconsents`;
       
        return fetch('https://jsonip.com', { mode: 'cors' })
        .then((resp) => resp.json())
        .then((response) => {putWithAuthRequest(uri,{...requestData, IpAddress: response.ip})});
    }
};
