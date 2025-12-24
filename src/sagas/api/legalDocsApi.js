import {
    getWithAuthRequest,
    postRequestFormEncodedWithAuth,
    postRequestURLEncoded,
    getRequest,
    postRequestWithTextType,
    postRequestWithAuth,
    putWithAuthRequest
} from 'spotify-shared/api/helpers/request';

import { BASE_API_URL} from '../../config';

export default {
    getAgreementTemplates(action) {
        const { agentId, path } = action.payload;
        
        return getWithAuthRequest(
            `${BASE_API_URL}agreementtemplates/agents/${agentId}/paths/${path}/`
        );
    },
    

    getAgreementTemplateContent(action) {
        const { templateId, agreementSecondSignatureId, agentId } = action.payload;

        const agreementIdentifyingId = agreementSecondSignatureId
            ? agreementSecondSignatureId
            : templateId;
        return getWithAuthRequest(
            `${BASE_API_URL}agreementtemplates/${agreementIdentifyingId}/agents/${agentId}`
        );
    },

    signAgreement(action) {
        const {
            templateId,
            agreementBody,
            agentId,
            agreementSecondSignatureId,
            ArgumentData
        } = action.payload;

        return postRequestURLEncoded(
            `${BASE_API_URL}agreements/agents/${agentId}`,
            {
                "TemplateId": templateId,
                "AgreementBody": agreementBody,
                "AgentId": agentId,
                "TemplateName": null,
                "AgreementSecondSignatureId": agreementSecondSignatureId,
                "AgreementData": ArgumentData
            }
        );
    },
    publicURL(action) {
        return fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
            .then(function (response) {
                return response.json();
            })
        //return getRequest("https://api.coindesk.com/v1/bpi/currentprice.json",{"Access-Control-Allow-Origin":"*",mode:"no-cors"})
    },
    getAgreementTemplatesFromMulesoft(action) {
        const { contactId } = action.payload

        
        //    let response = await fetch("http://spotify-sfonespanconga-poc-api.us-e1.cloudhub.io/getsignurl", { 
        //      method: "GET",
        //      headers:headers,
             
        //    });
        //    console.log(response)
        //    let data = await response.json()
        //    return data

        return postRequestWithTextType("http://spotify-sfonespanconga-poc-api.us-e1.cloudhub.io/getsignurl")
    },
    //same endpoint will be used to get the signurl and get the status 
    getSignUrl(action){
        
        const {muleSoftDocTransactionId,agentId}=action.payload

        return getWithAuthRequest(`${BASE_API_URL}agreementtemplates/agents/${agentId}/mulesofttransactionid/${muleSoftDocTransactionId}`)
    },
    postSignUrl(action){
        
        const {muleSoftDocTransactionId,agentId}=action.payload

        return postRequestWithAuth(`${BASE_API_URL}agreementtemplates/agents/${agentId}/mulesofttransactionid/${muleSoftDocTransactionId}`)
    },
    putTransactionId(action){
        const {agentId}=action.payload;

        return putWithAuthRequest(`${BASE_API_URL}agreementtemplates/cleartransaction/agents/${agentId}`)
    }

};
