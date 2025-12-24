import {
    GET_AGREEMENT_TEMPLATES,
    GET_AGREEMENT_TEMPLATE_CONTENT,
    SIGN_AGREEMENT,
    IS_NEXT_CLICKED,
    CheckSignStatus,
    GET_SIGN_URL,
    CLEAR_TRANSACTION_ID
} from '../types/legalDocsTypes';

export const getAgreementTemplates = (agentId, path) => ({
    type: GET_AGREEMENT_TEMPLATES,
    payload: { agentId, path }
});

export const getAgreementTemplateContent = (
    templateId,
    agreementSecondSignatureId,
    agentId
) => ({
    type: GET_AGREEMENT_TEMPLATE_CONTENT,
    payload: { templateId, agreementSecondSignatureId, agentId }
});

export const signAgreement = (
    templateId,
    agreementBody,
    agentId,
    agreementSecondSignatureId,
    ArgumentData
) => ({
    type: SIGN_AGREEMENT,
    payload: { templateId, agreementBody, agentId, agreementSecondSignatureId, ArgumentData }
});

export const isNextClicked=(newValue)=>({
    type:IS_NEXT_CLICKED,
    payload:{value:newValue}
})


export const checkSignStatus=(data)=>({
    type:CheckSignStatus,
    payload:data
})
export const getSignUrl=(data)=>({
    type:GET_SIGN_URL,
    payload:data
})


export const  clearTransactionId=(agentId, path)=>({
    type:CLEAR_TRANSACTION_ID,
    payload:{agentId, path}
})
