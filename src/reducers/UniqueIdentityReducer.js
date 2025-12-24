import {
    CLEAR_UNIQUE_ID_ERROR,
    CLEAR_SECONDARY_UNIQUE_ID_ERROR,

    // Get Aadhar Redirection URL Types
    GET_AADHAAR_REDIRECTION_URL,
    GET_AADHAAR_REDIRECTION_URL_SUCCESS,
    GET_AADHAAR_REDIRECTION_URL_FAILED,

    // Primary Verification Call
    CHECK_PRIMARY_UNIQUE_IDENTITY_VERIFIED,
    CHECK_PRIMARY_UNIQUE_IDENTITY_VERIFIED_SUCCESS,
    CHECK_PRIMARY_UNIQUE_IDENTITY_VERIFIED_FAILED,
    CHECK_PRIMARY_UNIQUE_IDENTITY_VERIFICATION_API_FAILED,

    // Secondary Verification Call
    CHECK_SECONDARY_UNIQUE_IDENTITY_VERIFIED,
    CHECK_SECONDARY_UNIQUE_IDENTITY_VERIFIED_SUCCESS,
    CHECK_SECONDARY_UNIQUE_IDENTITY_VERIFIED_FAILED,
    CHECK_SECONDARY_UNIQUE_IDENTITY_VERIFICATION_API_FAILED,

    // Post Primary ID Call

    SUBMIT_PRIMARY_UNIQUE_IDENTITY,
    SUBMIT_PRIMARY_UNIQUE_IDENTITY_SUCCESS,
    SUBMIT_PRIMARY_UNIQUE_IDENTITY_FAILED,

    // Post Secondary ID Call
    SUBMIT_SECONDARY_UNIQUE_IDENTITY,
    SUBMIT_SECONDARY_UNIQUE_IDENTITY_SUCCESS,
    SUBMIT_SECONDARY_UNIQUE_IDENTITY_FAILED,
    TOGGLE_IS_FETCHING_FLAG_FOR_SECONDARY_IDENTITY,
    TOGGLE_IS_FETCHING_FLAG_FOR_IDENTITY,
    INDIVIUAL_TAX_ID_CHECKED
} from "../types/uniqueIdentityTypes";

const initialState = {
    uniqueIdentity: {
        formInfo: {
            uniqueIdentity: "",
            uniqueIdentityConfirm: "",
        },
        isSubmitting: false,
        error: "",
        redirection_url: "",
        personId: "",
        requestId: "",
        isPrimaryUniqueIdValid: false
    },
    secondaryUniqueIdentity: {
        formInfo: {
            secondaryUniqueIdentity: "",
            secondaryUniqueIdentityConfirm: "",
        },
        isSubmitting: false,
        error: "",
        isSecondaryIdVerified: false
    },
    indiviualTaxIdCheck: false,
    // individualTaxIdentity: {
    //     formInfo: {
    //         individualTaxIdentity: "",
    //         individualTaxIdentityConfirm: "",
    //     },
    //     isSubmitting: false,
    //     error: "",
    //     isIndividualTaxIdVerified: false
    // },
    isFetchingID: false,
    isFetchingSecondaryID: false,
    // isFetchingIndividualTaxID: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SUBMIT_PRIMARY_UNIQUE_IDENTITY:


            state = {
                ...state,
                uniqueIdentity: {
                    ...state.uniqueIdentity,
                    isSubmitting: true,
                    error: ''
                }
            };
            break;
        case SUBMIT_SECONDARY_UNIQUE_IDENTITY:

            state = {
                ...state,
                uniqueIdentity: {
                    ...state.uniqueIdentity,
                    isSubmitting: true,
                    error: ''
                },
                secondaryUniqueIdentity: {
                    ...state.secondaryUniqueIdentity,
                    isSubmitting: true,
                    error: ''
                }
            };

            break;
        case SUBMIT_PRIMARY_UNIQUE_IDENTITY_FAILED:
            state = {
                ...state,
                uniqueIdentity: {
                    ...state.uniqueIdentity,
                    isSubmitting: false,
                    error:
                        action.error.data.message || { data: { message: "UNIQUE ID ERROR" } },

                },
            };
            break;
        case SUBMIT_PRIMARY_UNIQUE_IDENTITY_SUCCESS:
            state = {
                ...state,
                uniqueIdentity: {
                    ...state.uniqueIdentity,
                    isSubmitting: false,
                    error: "",
                },
            };
            break;
        case SUBMIT_SECONDARY_UNIQUE_IDENTITY_SUCCESS:
            state = {
                ...state,
                uniqueIdentity: {
                    ...state.uniqueIdentity,
                    isSubmitting: false,
                    error: "",
                },
                secondaryUniqueIdentity: {
                    ...state.secondaryUniqueIdentity,
                    isSubmitting: false,
                    error: "",
                },
            };
            break;
        case SUBMIT_SECONDARY_UNIQUE_IDENTITY_FAILED:
            state = {
                ...state,
                uniqueIdentity: {
                    ...state.uniqueIdentity,
                    isSubmitting: false,
                    error:
                        action.error.data.message || { data: { message: "UNIQUE ID ERROR" } },
                },
                secondaryUniqueIdentity: {
                    ...state.secondaryUniqueIdentity,
                    isSubmitting: false,
                    error:
                        action.error.data.message || { data: { message: "UNIQUE ID 2 ERROR" } },
                },
            };
            break;
        // -------------------------- GET Aadhaar URL--------------------------
        case GET_AADHAAR_REDIRECTION_URL:
            state = {
                ...state,
                uniqueIdentity: {
                    ...state.uniqueIdentity,
                    isSubmitting: false,
                    error: ''
                },
            };
            break;

        case GET_AADHAAR_REDIRECTION_URL_SUCCESS:

            state = {
                ...state,
                uniqueIdentity: {
                    ...state.uniqueIdentity,
                    redirection_url: action.payload.data.redirection_url,
                    personId: action.payload.data.personId,
                    requestId: action.payload.data.requestId,
                    // isSubmitting: false,
                    error: "",
                },
            };
            break;

        case GET_AADHAAR_REDIRECTION_URL_FAILED:
            state = {
                ...state,
                uniqueIdentity: {
                    ...state.uniqueIdentity,
                    isSubmitting: false,
                    error: action.errorCode
                    ,
                },
            };
            break;

        // -------------------------- Check Primary Verfication--------------------------
        case CHECK_PRIMARY_UNIQUE_IDENTITY_VERIFIED:
            state = {
                ...state,
                uniqueIdentity: {
                    ...state.uniqueIdentity,
                    isSubmitting: false,
                    primaryUniqueId: action.payload.uniqueIdentity,
                    error: ''
                },
            };
            break;

        case CHECK_PRIMARY_UNIQUE_IDENTITY_VERIFIED_SUCCESS:
            state = {
                ...state,
                uniqueIdentity: {
                    ...state.uniqueIdentity,
                    isPrimaryUniqueIdValid: action.payload.data.isAadharValid,
                    redirection_url: "",
                    error: "",
                },
            };
            break;

        case CHECK_PRIMARY_UNIQUE_IDENTITY_VERIFIED_FAILED:
            state = {
                ...state,
                uniqueIdentity: {
                    ...state.uniqueIdentity,
                    redirection_url: undefined,
                    isPrimaryUniqueIdValid: false,
                    isSubmitting: false,
                    error:
                        action.payload.data.validationMessage,
                    remainingAttempts: action.payload.data.maxAttempts - action.payload.data.failAttempts + 1
                },
            };
            break;

        case CHECK_PRIMARY_UNIQUE_IDENTITY_VERIFICATION_API_FAILED:
            state = {
                ...state,
                uniqueIdentity: {
                    ...state.uniqueIdentity,
                    isSubmitting: false,
                    redirection_url: undefined,
                    isPrimaryUniqueIdValid: false,
                    error: action.errorCode
                },
            };
            break;



        // -------------------------- Check Secondary Verfication--------------------------

        case CHECK_SECONDARY_UNIQUE_IDENTITY_VERIFIED:


            state = {
                ...state,
                secondaryUniqueIdentity: {
                    ...state.secondaryUniqueIdentity,
                    secondaryUniqueId: action.payload.secondaryUniqueIdentity,
                    error: "",
                    // isSubmitting: false,
                },

            };
            break;

        case CHECK_SECONDARY_UNIQUE_IDENTITY_VERIFIED_SUCCESS:
            state = {
                ...state,
                secondaryUniqueIdentity: {
                    ...state.secondaryUniqueIdentity,
                    // isSubmitting: false,
                    error: "",
                    isSecondaryIdVerified: action.payload.data.isPanValid
                },
            };
            break;


        case CHECK_SECONDARY_UNIQUE_IDENTITY_VERIFIED_FAILED:
            state = {
                ...state,
                secondaryUniqueIdentity: {
                    ...state.secondaryUniqueIdentity,
                    isSubmitting: false,
                    error: action.payload.data.validationMessage || { data: { message: "PAN ERROR" } },
                    isSecondaryIdVerified: false,
                    remainingSecondaryAttempts: action.payload.data.maxAttempts - action.payload.data.failAttempts + 1
                },
            };
            break;

        case CHECK_SECONDARY_UNIQUE_IDENTITY_VERIFICATION_API_FAILED:
            state = {
                ...state,
                secondaryUniqueIdentity: {
                    ...state.secondaryUniqueIdentity,
                    isSubmitting: false,
                    isSecondaryIdVerified: false,
                    error: action.errorCode
                },
            };
            break;

        // Clear Reducers

        case CLEAR_UNIQUE_ID_ERROR:


            state = {
                ...state,
                uniqueIdentity: {
                    ...state.uniqueIdentity,
                    error: "",
                },
            };
            break;

        case CLEAR_SECONDARY_UNIQUE_ID_ERROR:


            state = {
                ...state,
                secondaryUniqueIdentity: {
                    ...state.secondaryUniqueIdentity,
                    error: "",
                },
            };
            break;

        case TOGGLE_IS_FETCHING_FLAG_FOR_IDENTITY:

            state = {
                ...state,
                isFetchingID: action.payload
            }
            break;

        case TOGGLE_IS_FETCHING_FLAG_FOR_SECONDARY_IDENTITY:

            state = {
                ...state,
                isFetchingSecondaryID: action.payload
            }
            break;

        case INDIVIUAL_TAX_ID_CHECKED:

            state = {
                ...state,
                indiviualTaxIdCheck: action.payload
            }
            break;

        default:
            return state;
    }
    return state;

};
