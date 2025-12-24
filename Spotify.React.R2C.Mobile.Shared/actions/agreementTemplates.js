import * as ActionType from "../actionTypes/agreementTemplates"

///
export const SearchTemplatesByClient = payload => ({
    type: ActionType.SearchTemplatesByClient,
    payload
});
export const SearchTemplatesByClientComplete = payload => ({
    type: ActionType.SearchTemplatesByClientComplete,
    payload
});
export const SearchTemplatesByClientError = payload => ({
    type: ActionType.SearchTemplatesByClientError,
    payload
});

///
export const RetrieveAgreementTemplateByType = payload => ({
    type: ActionType.RetrieveAgreementTemplateByType,
    payload
});
export const RetrieveAgreementTemplateByTypeComplete = payload => ({
    type: ActionType.RetrieveAgreementTemplateByTypeComplete,
    payload
});
export const RetrieveAgreementTemplateByTypeError = payload => ({
    type: ActionType.RetrieveAgreementTemplateByTypeError,
    payload
});

///
export const SaveEnrollmentAgreement = payload => ({
    type: ActionType.SaveEnrollmentAgreement,
    payload
});
export const SaveEnrollmentAgreementComplete = payload => ({
    type: ActionType.SaveEnrollmentAgreementComplete,
    payload
});
export const SaveEnrollmentAgreementError = payload => ({
    type: ActionType.SaveEnrollmentAgreementError,
    payload
});
export const CancelAgreementSigning = payload => ({
    type: ActionType.CancelAgreementSigning,
    payload
});


export const RetrieveAgrrementTemplateForJM=payload=>({
    type:ActionType.RetrieveAgrrementTemplateForJM,
    payload
})


export const SaveConsentAgreement=payload=>({
    type:ActionType.SaveConsentAgreement,
    payload
})


export const pollSignUrl=payload=>({
    type:ActionType.PollEnrollmentSignUrl,
    payload
})

export const clearAgreementTemplates=()=>({
    type:ActionType.ClearAgrementTemplates,
    payload:{}
})
