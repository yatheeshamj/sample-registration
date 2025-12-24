import {
  SELECT_BUSINESS_PATH,
  SELECT_BUSINESS_PATH_COMPLETED,
  SELECT_BUSINESS_PATH_FAILED,
  REGISTER_INDIVIDUAL,
  REGISTER_INDIVIDUAL_COMPLETED,
  REGISTER_INDIVIDUAL_FAILED,
  FINALIZE_REGISTER_INDIVIDUAL,
  FINALIZE_REGISTER_INDIVIDUAL_COMPLETED,
  FINALIZE_REGISTER_INDIVIDUAL_FAILED,
  REGISTER_BUSINESS,
  SPRING_VERIFY_GST,
  REGISTER_BUSINESS_COMPLETED,
  REGISTER_BUSINESS_FAILED,
  VALIDATE_GSTHST_INIT,
  VALIDATE_GSTHST_COMPLETED,
  VALIDATE_GSTHST_FAILED,
  FINALIZE_REGISTER_BUSINESS,
  FINALIZE_REGISTER_BUSINESS_COMPLETED,
  FINALIZE_REGISTER_BUSINESS_FAILED,
  VERIFY_SSN_AND_NAME,
  VERIFY_SSN_AND_NAME_COUNTRY,
  VERIFY_SSN_AND_NAME_COMPLETED,
  VERIFY_SSN_AND_NAME_FAILED,
  GET_BUSINESS_BY_FEIN,
  GET_BUSINESS_BY_FEIN_COMPLETED,
  GET_BUSINESS_BY_FEIN_FAILED,
  GET_BUSINESS_BY_ID,
  GET_BUSINESS_BY_ID_COMPLETED,
  GET_BUSINESS_BY_ID_FAILED,
  GET_BUSINESSES_TO_JOIN,
  GET_BUSINESSES_TO_JOIN_COMPLETED,
  JOIN_BUSINESS,
  SELECT_BUSINESS_TO_JOIN,
  SHOW_AGREEMENTS,
  HIDE_AGREEMENTS,
  SHOW_AGREEMENT_CONTENT,
  HIDE_AGREEMENT_CONTENT,
  REMOVE_JOIN_BUSINESS,
  REMOVE_JOIN_BUSINESS_COMPLETED,
  REMOVE_REGISTER_BUSINESS_COMPLETED,
  REMOVE_REGISTER_INDIVIDUAL_COMPLETED,
  GET_JOIN_BUSINESS_STATUS,
  GET_JOIN_BUSINESS_STATUS_FAILED,
  GET_JOIN_BUSINESS_STATUS_COMPLETED,
  GET_GST_HST_COMPLETED,
  REMOVE_REGISTER_INDIVIDUAL,
  REMOVE_REGISTER_BUSINESS,
  REMOVE_REGISTER_BUSINESS_FORM,
  GET_MEDIA,
  GET_MEDIA_COMPLETED,
  GET_MEDIA_FAILED,
  JOIN_BUSINESS_COMPLETED,
  JOIN_BUSINESS_FAILED,
  SPRING_VERIFY_GST_COMPLETED,
  SPRING_VERIFY_GST_FAILED,
  SPRING_VERIFY_GST_API_FAILED,
  TOGGLE_IS_FETCHING_FLAG_FOR_GST,
  CLEAR_REGISTER_BUSINESS_ERROR,
  SEC_VERIFY,
  SEC_VERIFY_COMPLETED,
  SEC_VERIFY_FAILED,
  SEC_VERIFY_API_FAILED,
  TOGGLE_IS_FETCHING_FLAG_FOR_SEC,
  TIN_VERIFY,
  TIN_VERIFY_COMPLETED,
  TIN_VERIFY_FAILED,
  TIN_VERIFY_API_FAILED,
  TOGGLE_IS_FETCHING_FLAG_FOR_TIN,
  GET_TypeOfIncorporation_COMPLETED
} from "../types/agentTypeTypes";


import { LOGOUT_USER_COMPLETED } from "../types/loginTypes";

import {
  GET_ADMISSION_STEP_INSTANCES,
  GET_ADMISSION_STEP_INSTANCES_COMPLETED,
} from "../types/admissionStepTypes";
import { errorMessages } from "../constants";

const initialState = {
  isFetchInProgress: true,
  isJoinBuisnessError: false,
  isSigningAgreements: false,
  isViewingAgreements: false,
  isSelectingPath: false,
  media: {},
  redirectMessage: "",
  uniqueIdentity: {
    formInfo: {
      uniqueIdentity: "",
      uniqueIdentityConfirm: "",
    },
    isSubmitting: false,
    error: "",
  },
  secondaryUniqueIdentity: {
    formInfo: {
      secondaryUniqueIdentity: "",
      secondaryUniqueIdentityConfirm: "",
    },
    isSubmitting: false,
    error: "",
  },
  registerIndividual: {
    formInfo: {},
    isSubmitting: false,
    isSubmittingFinalize: false,
    error: "",
  },
  registerBusiness: {
    US: {
      formInfo: {
        name: "",
        businessId: "",
        fein: "",
        stateId: "",
        title: "",
        primaryPhone: "",
        email: "",
        address: "",
        address2: "",
        city: "",
        zipCode: "",
        stateOfIncorporationId: "",
        countryId: "",
      },
    },
    CA: {
      formInfo: {
        name: "",
        title: "",
        fein: "",
        companyType: "",
        taxProgram: "",
        transactionDate: "",
        gsthst: "",
        primaryPhone: "",
        email: "",
        provinceOfIncorporationId: "",
        address: "",
        address2: "",
        city: "",
        provinceId: "",
        zipCode: "",
        registrationStatus: "",
      },
      formOptions: {
        gsthst: [],
      },
    },
    PH: {
      formInfo: {
        name: "",
        title: "",
        feinPH: "",
        vatidPH: "",
        primaryPurpose: "",
        email: "",
        primaryPhone: "",
        address: "",
        address2: "",
        city: "",
        zipCode: "",
      },
      formOptions: {
        typeOfIncorporation: [],
      },
    },
    UK: {
      formInfo: {
        name: "",
        title: "",
        fein: "",
        vatid: "",
        email: "",
        primaryPhone: "",
        address: "",
        address2: "",
        city: "",
        zipCode: "",
      },
    },
    IN: {
      formInfo: {
        fein: "",
        countryId: "",
      },
    },
    REGISTERCOUNTRY: {
      formInfo: {
        name: "",
        companyType: "",
        // transactionDate: "",
        taxProgram: "",
        fein: "",
        //The vatid field should be uncommented if you are making (VAT ID for GB mandatory or GST for IN mandatory) or else there might be no error on click of next button with empty fields 
        //vatid: "",
        stateId: "",
        provinceId: "",
        title: "",
        primaryPhone: "",
        email: "",
        address: "",
        address2: "",
        city: "",
        zipCode: "",
        stateOfIncorporationId: "",
        provinceOfIncorporationId: "",
        countryId: "",
        registrationStatus: "",
      },
    },
    isSubmitting: false,
    isSubmittingFinalize: false,
    springVerifyGSTvalid: false,
    secVerifyvalid: false,
    tinVerifyvalid: false,
    error: "",
    isGstHstValidating: false,
    isFetchingGST: false,
    isFetchingSEC: false,
    isFetchingTIN: false,
    remainingAttempts: null,
    gstHstValid: false,
    businessIdValidated: false,
  },
  removeAgentTypeInProgress: false,
  joinBusiness: {
    formInfo: {
      fein: "",
      businessId: "",
    },
    fein: {
      error: "",
      isSubmitting: false,
    },
    businessId: {
      error: "",
      isSubmitting: false,
    },
    statusId: 0,
    businessSelected: {},
    businessRequestedName: "",
    businessesToJoin: [],
    isSubmitting: false,
    isSubmittingAgreements: false,
    isBusinessToJoinLoading: false,
    error: "",
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT_BUSINESS_PATH:
      state = {
        ...state,
        isSelectingPath: true,
      };
      break;

    case SELECT_BUSINESS_PATH_COMPLETED:
      state = {
        ...state,
        isSelectingPath: false,
      };
      break;

    case SELECT_BUSINESS_PATH_FAILED:
      state = {
        ...state,
        isSelectingPath: false,
      };
      break;

    case REGISTER_INDIVIDUAL:
      console.log("REGISTER INDIVIUAL ACTION CALLED")
      state = {
        ...state,
        registerIndividual: {
          ...state.registerIndividual,
          isSubmitting: true,
          error: "",
        },
      };
      break;

    case REGISTER_INDIVIDUAL_COMPLETED:
      state = {
        ...state,
        registerIndividual: {
          ...state.registerIndividual,
          isSubmitting: false,
        },
      };
      break;

    case REGISTER_INDIVIDUAL_FAILED:
      state = {
        ...state,
        registerIndividual: {
          ...state.registerIndividual,
          isSubmitting: false,
          error: action.error.message,
        },
      };
      break;

    case FINALIZE_REGISTER_INDIVIDUAL:
      state = {
        ...state,
        registerIndividual: {
          ...state.registerIndividual,
          isSubmittingFinalize: true,
        },
      };
      break;

    case FINALIZE_REGISTER_INDIVIDUAL_COMPLETED:
      state = {
        ...state,
        registerIndividual: {
          ...state.registerIndividual,
          isSubmittingFinalize: false,
        },
      };
      break;

    case FINALIZE_REGISTER_INDIVIDUAL_FAILED:
      state = {
        ...state,
        registerIndividual: {
          ...state.registerIndividual,
          isSubmittingFinalize: false
        }
      };
      break;
    case VERIFY_SSN_AND_NAME:
    case VERIFY_SSN_AND_NAME_COUNTRY:
      state = {
        ...state,
        uniqueIdentity: {
          ...state.uniqueIdentity,
          isSubmitting: true,
          error: ''
        }
      };
      break;

    case VERIFY_SSN_AND_NAME_COMPLETED:
      state = {
        ...state,
        uniqueIdentity: {
          ...state.uniqueIdentity,
          // isSubmitting: false,
          error: "",
        },
      };
      break;

    case VERIFY_SSN_AND_NAME_FAILED:
      state = {
        ...state,
        uniqueIdentity: {
          ...state.uniqueIdentity,
          isSubmitting: false,
          error:
            action.error.data.message || { data: { message: errorMessages.SSNError } },
        },
      };
      break;

    case SPRING_VERIFY_GST:

      state = {
        ...state,
        registerBusiness: {
          ...state.registerBusiness,
          REGISTERCOUNTRY: {
            ...state.registerBusiness.REGISTERCOUNTRY,
            vatid: action.payload.vatid,
            name: action.payload.name
          }
        },
      };
      break;

    case SPRING_VERIFY_GST_COMPLETED:

      state = {
        ...state,
        registerBusiness: {
          ...state.registerBusiness,
          springVerifyGSTvalid: action.payload.data.isGstValid,
        },

      };
      break;

    case SPRING_VERIFY_GST_FAILED:
      state = {
        ...state,
        registerBusiness: {
          ...state.registerBusiness,
          isSubmitting: false,
          error: action.payload.data.validationMessage || "INVALID GST NUMBER",
          springVerifyGSTvalid: false,
          remainingtaxIdAttempts: action.payload.data.maxAttempts - action.payload.data.failAttempts + 1
        },
      };
      break;

    case SPRING_VERIFY_GST_API_FAILED:
      state = {
        ...state,
        registerBusiness: {
          ...state.registerBusiness,
          isSubmitting: false,
          springVerifyGSTvalid: false,
          error: action.errorCode,
        },
      };
      break;

    case TOGGLE_IS_FETCHING_FLAG_FOR_GST:
      state = {
        ...state,
        registerBusiness: {
          ...state.registerBusiness,
          isFetchingGST: action.payload
        },
      }
      break;

    case SEC_VERIFY:

      state = {
        ...state,
        registerBusiness: {
          ...state.registerBusiness,
          REGISTERCOUNTRY: {
            ...state.registerBusiness.REGISTERCOUNTRY,
            vatid: action.payload.vatid,
            name: action.payload.name
          }
        },
      };
      break;

    case SEC_VERIFY_COMPLETED:

      state = {
        ...state,
        registerBusiness: {
          ...state.registerBusiness,
          secVerifyvalid: action.payload.data.isValid,
        },

      };
      break;

    case SEC_VERIFY_FAILED:
      state = {
        ...state,
        registerBusiness: {
          ...state.registerBusiness,
          isSubmitting: false,
          error: "INVALID SEC NUMBER",
          secVerifyvalid: false,
          remainingtaxIdAttempts: action.payload.data.maxAttempts - action.payload.data.failAttempts + 1
        },
      };
      break;

    case SEC_VERIFY_API_FAILED:
      state = {
        ...state,
        registerBusiness: {
          ...state.registerBusiness,
          isSubmitting: false,
          secVerifyvalid: false,
          error: action.errorCode,
        },
      };
      break;

    case TOGGLE_IS_FETCHING_FLAG_FOR_SEC:
      state = {
        ...state,
        registerBusiness: {
          ...state.registerBusiness,
          isFetchingSEC: action.payload
        },
      }
      break;

    case TIN_VERIFY:

      state = {
        ...state,
        registerBusiness: {
          ...state.registerBusiness,
          REGISTERCOUNTRY: {
            ...state.registerBusiness.REGISTERCOUNTRY,
            vatid: action.payload.vatid,
            name: action.payload.name
          }
        },
      };
      break;

    case TIN_VERIFY_COMPLETED:

      state = {
        ...state,
        registerBusiness: {
          ...state.registerBusiness,
          tinVerifyvalid: action.payload.data.isValid,
        },

      };
      break;

    case TIN_VERIFY_FAILED:
      state = {
        ...state,
        registerBusiness: {
          ...state.registerBusiness,
          isSubmitting: false,
          error: "INVALID TIN NUMBER",
          tinVerifyvalid: false

        },
      };
      break;

    case TIN_VERIFY_API_FAILED:
      state = {
        ...state,
        registerBusiness: {
          ...state.registerBusiness,
          isSubmitting: false,
          tinVerifyvalid: false,
          error: action.errorCode,
        },
      };
      break;

    case TOGGLE_IS_FETCHING_FLAG_FOR_TIN:
      state = {
        ...state,
        registerBusiness: {
          ...state.registerBusiness,
          isFetchingTIN: action.payload
        },
      }
      break;

    case CLEAR_REGISTER_BUSINESS_ERROR:
      state = {
        ...state,
        registerBusiness: {
          ...state.registerBusiness,
          error: ''
        },
      }
      break;

    case REGISTER_BUSINESS:
      state = {
        ...state,
        registerBusiness: {
          ...state.registerBusiness,
          isSubmitting: true,
          error: "",
        },
      };
      break;

    case REGISTER_BUSINESS_COMPLETED:
      state = {
        ...state,
        registerBusiness: {
          ...state.registerBusiness,
          isSubmitting: false,
        },
      };
      break;

    case REGISTER_BUSINESS_FAILED:
      state = {
        ...state,
        registerBusiness: {
          ...state.registerBusiness,
          isSubmitting: false,
          error: action.error.data.message || "Business Registration Failed",
        },
      };
      break;

    case VALIDATE_GSTHST_INIT:
      state = {
        ...state,
        registerBusiness: {
          ...state.registerBusiness,
          isGstHstValidating: true,
          error: "",
        },
      };
      break;

    case VALIDATE_GSTHST_COMPLETED:
      state = {
        ...state,
        registerBusiness: {
          ...state.registerBusiness,
          isGstHstValidating: false,
          error: action.payload.data.validationCode,
          gstHstValid: action.payload.data.validationCode === 'GST_VALID',
          businessIdValidated: action.payload.data.validationCode === 'GST_VALID',
          remainingAttempts: action.payload.data.maxAttempts - action.payload.data.failedAttempts
        },
      };
      break;

    case VALIDATE_GSTHST_FAILED:
      state = {
        ...state,
        registerBusiness: {
          ...state.registerBusiness,
          isGstHstValidating: false,
          error: 'VALIDATION_ISSUE',
        },
      };
      break;

    case FINALIZE_REGISTER_BUSINESS:
      state = {
        ...state,
        registerBusiness: {
          ...state.registerBusiness,
          isSubmittingFinalize: true,
        },
      };
      break;

    case FINALIZE_REGISTER_BUSINESS_COMPLETED:
      state = {
        ...state,
        registerBusiness: {
          ...state.registerBusiness,
          isSubmittingFinalize: false,
        },
      };
      break;

    case FINALIZE_REGISTER_BUSINESS_FAILED:
      state = {
        ...state,
        registerBusiness: {
          ...state.registerBusiness,
          isSubmittingFinalize: false,
        },
      };
      break;
    case JOIN_BUSINESS:
      state = {
        ...state,
        joinBusiness: {
          ...state.joinBusiness,
          isSubmitting: true,
        },
      };
      break;

    case JOIN_BUSINESS_COMPLETED:
      state = {
        ...state,
        joinBusiness: {
          ...state.joinBusiness,
          isSubmitting: false,
        },
      };
      break;

    case JOIN_BUSINESS_FAILED:
      state = {
        ...state,
        joinBusiness: {
          ...state.joinBusiness,
          isSubmitting: false,
        },
      };
      break;

    case GET_BUSINESS_BY_FEIN:
      state = {
        ...state,
        joinBusiness: {
          ...state.joinBusiness,
          fein: {
            error: "",
            isSubmitting: true,
          },
          businessId: {
            error: "",
            isSubmitting: false,
          },
          businessSelected: {},
          businessIdOverride: "",
        },
      };
      break;

    case GET_BUSINESS_BY_FEIN_COMPLETED:
      state = {
        ...state,
        joinBusiness: {
          ...state.joinBusiness,
          fein: {
            error: "",
            isSubmitting: false,
          },
          businessId: {
            error: "",
            isSubmitting: false,
          },
          businessSelected: action.payload.data,
        },
      };
      break;

    case GET_BUSINESS_BY_FEIN_FAILED:
      state = {
        ...state,
        joinBusiness: {
          ...state.joinBusiness,
          fein: {
            error: "Could not find matching FEIN",
            isSubmitting: false,
          },
          businessId: {
            error: "",
            isSubmitting: false,
          },
          businessSelected: {},
        },
      };
      break;

    case GET_BUSINESS_BY_ID:
      state = {
        ...state,
        joinBusiness: {
          ...state.joinBusiness,
          fein: {
            error: "",
            isSubmitting: false,
          },
          businessId: {
            error: "",
            isSubmitting: true,
          },
          businessSelected: {},
        },
      };
      break;

    case GET_BUSINESS_BY_ID_COMPLETED:
      state = {
        ...state,
        joinBusiness: {
          ...state.joinBusiness,
          fein: {
            error: "",
            isSubmitting: false,
          },
          businessId: {
            error: "",
            isSubmitting: false,
          },
          businessSelected: action.payload.data,
        },
      };
      break;

    case GET_BUSINESS_BY_ID_FAILED:
      state = {
        ...state,
        joinBusiness: {
          ...state.joinBusiness,
          fein: {
            error: "",
            isSubmitting: false,
          },
          businessId: {
            error: "Could not find matching Service Partner ID",
            isSubmitting: false,
          },
          businessSelected: {},
        },
      };
      break;

    case GET_BUSINESSES_TO_JOIN:
      state = {
        ...state,
        joinBusiness: {
          ...state.joinBusiness,
          isBusinessToJoinLoading: true,
          businessesToJoin: [],
        },
      };
      break;

    case GET_BUSINESSES_TO_JOIN_COMPLETED:
      state = {
        ...state,
        joinBusiness: {
          ...state.joinBusiness,
          businessesToJoin: action.payload.data,
          isBusinessToJoinLoading: false,
        },
      };
      break;

    case SELECT_BUSINESS_TO_JOIN:
      state = {
        ...state,
        joinBusiness: {
          ...state.joinBusiness,
          fein: {
            error: "",
            isSubmitting: false,
          },
          businessId: {
            error: "",
            isSubmitting: false,
          },
          businessSelected: action.payload,
        },
      };
      break;

    case SHOW_AGREEMENTS:
      state = {
        ...state,
        isViewingAgreements: true,
      };
      break;

    case HIDE_AGREEMENTS:
      state = {
        ...state,
        isViewingAgreements: false,
      };
      break;

    case SHOW_AGREEMENT_CONTENT:
      state = {
        ...state,
        isSigningAgreement: true,
      };
      break;

    case HIDE_AGREEMENT_CONTENT:
      state = {
        ...state,
        isSigningAgreement: false,
      };
      break;

    case REMOVE_JOIN_BUSINESS:
      state = {
        ...state,
        removeAgentTypeInProgress: true,
      };
      break;

    case REMOVE_JOIN_BUSINESS_COMPLETED:
      state = {
        ...state,
        isSigningAgreements: false,
        isViewingAgreements: false,
        removeAgentTypeInProgress: false,
        redirectMessage: action.payload.message,
        joinBusiness: {
          ...state.joinBusiness,
          businessSelected: {},
          businessRequestedName: "",
        },
      };
      break;

    case REMOVE_REGISTER_BUSINESS:
      state = {
        ...state,
        removeAgentTypeInProgress: true,
      };
      break;

    case REMOVE_REGISTER_BUSINESS_FORM:
      console.log("I am called REMOVE_REGISTER_BUSINESS_FORM")
      state = {
        ...state,
        registerBusiness: initialState.registerBusiness
      };
      break;

    case REMOVE_REGISTER_BUSINESS_COMPLETED:
      state = {
        ...state,
        isSigningAgreements: false,
        isViewingAgreements: false,
        removeAgentTypeInProgress: false,
        redirectMessage: action.payload.message,
      };
      break;

    case REMOVE_REGISTER_INDIVIDUAL:
      state = {
        ...state,
        removeAgentTypeInProgress: true,
      };
      break;

    case REMOVE_REGISTER_INDIVIDUAL_COMPLETED:
      state = {
        ...state,
        isSigningAgreements: false,
        isViewingAgreements: false,
        removeAgentTypeInProgress: false,
        redirectMessage: action.payload.message,
      };
      break;

    case GET_GST_HST_COMPLETED:
      state = {
        ...state,
        registerBusiness: {
          ...state.registerBusiness,
          CA: {
            ...state.registerBusiness.CA,
            formOptions: {
              ...state.registerBusiness.CA.formOptions,
              gsthst: action.payload.data,
            },
          },
        },
      };
      break;

    case GET_TypeOfIncorporation_COMPLETED:
      state = {
        ...state,
        registerBusiness: {
          ...state.registerBusiness,
          PH: {
            ...state.registerBusiness.PH,
            formOptions: {
              ...state.registerBusiness.PH.formOptions,
              typeOfIncorporation: action.payload.data,
            },
          },
        },
      };
      break;

    case GET_JOIN_BUSINESS_STATUS:
      state = {
        ...state,
        isFetchInProgress: true,
        joinBusiness: {
          ...state.joinBusiness,
        },
      };

      break;

    case GET_JOIN_BUSINESS_STATUS_FAILED:
      state = {
        ...state,
        isFetchInProgress: false,
        isJoinBuisnessError: true,
        joinBusiness: {
          ...state.joinBusiness,
          businessRequestedName: "",
          statusId: 0,
          getStatusProcessing: false,
        },
      };

      break;

    case GET_JOIN_BUSINESS_STATUS_COMPLETED:
      state = {
        ...state,
        isFetchInProgress: false,
        joinBusiness: {
          ...state.joinBusiness,
          businessRequestedName: action.payload.data.businessName,
          statusId: action.payload.data.statusId,
          getStatusProcessing: false,
          businessEmail: action.payload.data.businessEmail,
          businessPhone: action.payload.data.businessPhone,
        },
      };

      break;

    case GET_ADMISSION_STEP_INSTANCES:
      state = {
        ...state,
        joinBusiness: {
          ...state.joinBusiness,
          isSubmittingAgreements: true,
          getStatusProcessing: false,
        },
      };
      break;

    case GET_ADMISSION_STEP_INSTANCES_COMPLETED:
      state = {
        ...state,
        joinBusiness: {
          ...state.joinBusiness,
          isSubmittingAgreements: false,
          isSubmitting: false,
          getStatusProcessing: false,
        },
      };
      break;
    case GET_MEDIA:
      break;
    case GET_MEDIA_COMPLETED:
      state = {
        ...state,
        media: action.payload.data,
      };
      break;
    case GET_MEDIA_FAILED:
      break;
    case LOGOUT_USER_COMPLETED:
      state = initialState;
      break;

    default:
      return state;
  }
  return state;
};
