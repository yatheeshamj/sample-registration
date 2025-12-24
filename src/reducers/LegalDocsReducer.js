import {
    GET_AGREEMENT_TEMPLATES,
    GET_AGREEMENT_TEMPLATES_COMPLETED,
    GET_AGREEMENT_TEMPLATES_FAILED,
    GET_AGREEMENT_TEMPLATE_CONTENT,
    GET_AGREEMENT_TEMPLATE_CONTENT_COMPLETED,
    GET_AGREEMENT_TEMPLATE_CONTENT_FAILED,
    SIGN_AGREEMENT,
    SIGN_AGREEMENT_COMPLETED,
    SIGN_AGREEMENT_FAILED,
    IS_NEXT_CLICKED,
    GET_SIGN_URL,
    GET_SIGN_URL_SUCCESS,
    GET_SIGN_URL_FAIL,
    CheckSignStatus,
    CheckSignStatusComplete,
    CLEAR_TRANSACTION_ID
} from '../types/legalDocsTypes';

const initialState = {
    agreements: [],
    isFetchAgreementTemplatesComplete: false,
    isFetchAgreementConentComplete: false,
    isSigningAgreement: false,
    currentViewedAgreement: null,
    isAgreementSigned: false,
    isNextClicked:null,
    transactionId:null,
    error:"",
    cntOfAgreementTriggers:0,
    path:""
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_AGREEMENT_TEMPLATES:
            state = {
                ...state,
                isFetchAgreementTemplatesComplete: false,
                
            };
            break;

        case GET_AGREEMENT_TEMPLATES_COMPLETED:
            state = {
                ...state,
                ...action.payload.data,
                isFetchAgreementTemplatesComplete: true,
                cntOfAgreementTriggers:state.cntOfAgreementTriggers+1,
            };
            break;

        case GET_AGREEMENT_TEMPLATES_FAILED:
            state = {
                ...state,
                isFetchAgreementTemplatesComplete: true,
                error: action.error
            };
            break;

        case GET_AGREEMENT_TEMPLATE_CONTENT:
            state = {
                ...state,
                isFetchAgreementConentComplete: false
            };
            break;

        case GET_AGREEMENT_TEMPLATE_CONTENT_COMPLETED:
            state = {
                ...state,
                currentViewedAgreement: action.payload.data,
                isFetchAgreementConentComplete: true
            };
            break;

        case GET_AGREEMENT_TEMPLATE_CONTENT_FAILED:
            state = {
                ...state,
                isFetchAgreementConentComplete: true
                // TODO, handle error
            };
            break;

        case SIGN_AGREEMENT:
            state = {
                ...state,
                isSigningAgreement: true,
                isAgreementSigned: false
            };
            break;

        case SIGN_AGREEMENT_COMPLETED:
            state = {
                ...state,
                isSigningAgreement: false,
                isAgreementSigned: true
            };
            break;

        case SIGN_AGREEMENT_FAILED:
            state = {
                ...state,
                isSigningAgreement: false,
                isAgreementSigned: false
            };
            break;
        case IS_NEXT_CLICKED:

            state = {
                ...state,
                isNextClicked: action.payload.value
            }
            console.log(state)
            break;
        case CheckSignStatus:
        case GET_SIGN_URL:
            state = {
                ...state,
                isFetchAgreementTemplatesComplete: false
            }
            break;
        case CheckSignStatusComplete:
        case GET_SIGN_URL_SUCCESS:
            state = {
                ...state,
                isFetchAgreementTemplatesComplete: true,
                agreements: [
                    ...action.payload
                ]

            }
            break;
        case GET_SIGN_URL_FAIL:
            state = {
                ...state,
                isFetchAgreementTemplatesComplete: true,
                error: action.error
            }
            break;
        case CLEAR_TRANSACTION_ID:
            state={
                ...state,
                error:"",
                isFetchAgreementTemplatesComplete:false
            }
            break;
        default:
            return state;
    }
    return state;
};
