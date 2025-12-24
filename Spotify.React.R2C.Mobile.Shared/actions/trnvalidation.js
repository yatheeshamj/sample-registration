import * as actionTypes from "./../actionTypes/trnvalidation"


export const getAgentTrnDetails=payload=>({
    type:actionTypes.GET_AGENT_TRN_DETAILS,
    payload
})


export const validateTrnDetails=payload=>({
    type:actionTypes.VALIDATE_TRN_DETAILS,
    payload
})
