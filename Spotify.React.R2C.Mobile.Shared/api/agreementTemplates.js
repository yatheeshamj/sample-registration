import { getWithAuthRequest, postRequestWithAuth, postRequestFormEncodedWithAuth } from './helpers/request';
import { getBaseUrl } from "./helpers/request"


export const searchTemplatesByClient = props => {
    const { agentId, clientId } = props;
    return getWithAuthRequest(`${getBaseUrl()}agreementtemplates/clients/${clientId}/agents/${agentId}`);
}

export const retrieveEnrollmentAgreements = props => {
    const { agentId, enrollmentId } = props;
    return getWithAuthRequest(`${getBaseUrl()}enrollmentagreements/agents/${agentId}/enrollment/${enrollmentId}`);
}

export const retrieveAgreementTemplateByType = props => {
    const { agentId, agreementType, enrollmentId } = props;
    return getWithAuthRequest(`${getBaseUrl()}agreementtemplates/agents/${agentId}/enrollment/${enrollmentId}/type/${agreementType}`);
}


export const saveEnrollmentAgreement = props => {
    const { agentId, agreementSigning, enrollmentId } = props;
    const data = {
        EnrolledOpportunityid: enrollmentId,
        AgreementName: agreementSigning.friendlyName,
        AgreementHTML: agreementSigning.template,
        Version: agreementSigning.version,
        AgreementVersionID: agreementSigning.agreementVersionID,
        //SignedHash
    }
    return postRequestFormEncodedWithAuth(`${getBaseUrl()}enrollmentagreements/agents/${agentId}`, data)

}


export const retrieveAgreementTemplateForJM = props => {
    const { agentId, agreementType,contactId} = props;
    return getWithAuthRequest(`${getBaseUrl()}agreementtemplates/agents/${agentId}/contactid/${contactId}/type/${agreementType}`);
}


export const saveConsentAgreement = props => {
    const { agentId, templateId,ipAddress} = props;
    let regex = /\./g;
    let ipAddressReplace = " "
    if(ipAddress && ipAddress.length > 0)
    {
        ipAddressReplace = ipAddress.replace(regex, "-");
        //to handle ipv6 address
        ipAddressReplace=ipAddressReplace.replace(/\:/g,"-");
    }
    console.log(ipAddressReplace,"sinde api call")
    
    return postRequestWithAuth(`${getBaseUrl()}agreements/agents/${agentId}/template/${templateId}/ipaddress/${ipAddressReplace}`)

}


export const getSignUrl=(props)=>{
        
    const {muleSoftDocTransactionId,agentId}=props
console.log(props,"api")
    return getWithAuthRequest(`${getBaseUrl()}agreementtemplates/agents/${agentId}/mulesofttransactionid/${muleSoftDocTransactionId}`)
}
