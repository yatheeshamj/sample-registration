
import * as actionTypes from "../actionTypes/agreementTemplates"

const initalState = {
    "isFetching": false,
    "error": null,
    "data": [
    ],
    signing: {
        "isFetching": false,
        "error": null,
        "data": null
    }
};


export default (state = initalState, action) => {

    switch (action.type) {
        case actionTypes.SearchTemplatesByClient:
            {
                state = {
                    ...state,
                    error: null,
                    isFetching: true
                }
                break;
            }
        case actionTypes.SearchTemplatesByClientComplete: {
            state = {
                ...state,
                error: null,
                isFetching: false,
                data: action.payload
            }
            break;
        }
        case actionTypes.SearchTemplatesByClientError:
            {
                state = {
                    ...state,
                    error: action.payload,
                    isFetching: false
                }
                break;
            }
        case actionTypes.RetrieveAgrrementTemplateForJM:
        case actionTypes.RetrieveAgreementTemplateByType: {
            state = {
                ...state,
                signing: {
                    ...state.signing,
                    isFetching: true
                }
            }
            break;
        }
        case actionTypes.RetrieveAgreementTemplateByTypeComplete: {
            state = {
                ...state,
                signing: {
                    ...state.signing,
                    isFetching: false,
                    data: action.payload
                }
            }
            break;
        }
        case actionTypes.RetrieveAgreementTemplateByTypeError: {
            state = {
                ...state,
                signing: {
                    ...state.signing,
                    error: action.payload,
                    isFetching: false
                }
            }
            break;
        }
        case actionTypes.CancelAgreementSigning: {
            state = {
                ...state,
                signing: {
                    data: null,
                    error: null,
                    isFetching: false
                }
            }
            break;
        }
        case actionTypes.SaveConsentAgreement:
        case actionTypes.SaveEnrollmentAgreement: {
            state = {
                ...state,
                signing: {
                    ...state.signing,
                    isFetching: true,
                    error: null
                }
            }
            break;
        }
        case actionTypes.SaveEnrollmentAgreementError: {
            state = {
                ...state,
                signing: {
                    ...state.signing,
                    isFetching: false,
                    error: action.payload
                }
            }
            break;
        }
        case actionTypes.SaveConsentAgreementComplete:
        case actionTypes.SaveEnrollmentAgreementComplete: {
            state = {
                ...state,
                signing: {
                    data: null,
                    isFetching: false,
                    error: null
                }
            }
            break;
        }
        case actionTypes.PollEnrollmentSignUrl: {
            state = {
                ...state,
                signing: {
                    ...state.signing,
                    isFetching: true
                }
            }
            break;
        }
        case actionTypes.PollEnrollmentSignUrlSuccess: {
            state = {
                ...state,
                signing: {
                    ...state.signing,
                    isFetching: false,
                    data: action.payload
                }
            }
            break;
        }
        case actionTypes.PollEnrollmentSignUrlFail: {
            state = {
                ...state,
                signing: {
                    ...state.signing,
                    error: action.payload,
                    isFetching: false
                }
            }
            break;
        }

        case actionTypes.ClearAgrementTemplates:
            return initalState
            

        default:
            return state;

    }

    return state;
}
