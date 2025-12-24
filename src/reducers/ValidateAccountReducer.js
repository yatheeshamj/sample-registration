import {
  VALIDATE_PHONE,
  VALIDATE_PHONE_COMPLETED,
  VALIDATE_PHONE_FAILED,
  UPDATE_MOBILE_PHONE,
  UPDATE_MOBILE_PHONE_COMPLETED,
  UPDATE_MOBILE_PHONE_FAILED,
  RESEND_PHONE_VALIDATION_CODE,
  RESEND_PHONE_VALIDATION_CODE_COMPLETED,
  RESEND_PHONE_VALIDATION_CODE_FAILED,
  EDIT_MOBILE_PHONE,
  CANCEL_MOBILE_PHONE,
  VALIDATE_EMAIL,
  VALIDATE_EMAIL_COMPLETED,
  VALIDATE_EMAIL_FAILED,
  UPDATE_EMAIL,
  UPDATE_EMAIL_COMPLETED,
  UPDATE_EMAIL_FAILED,
  RESEND_EMAIL_VALIDATION_CODE,
  RESEND_EMAIL_VALIDATION_CODE_COMPLETED,
  RESEND_EMAIL_VALIDATION_CODE_FAILED,
  EDIT_EMAIL,
  CANCEL_EMAIL
} from '../types/validateAccountTypes';

import { LOGOUT_USER_COMPLETED } from '../types/loginTypes';

import { GET_ADMISSION_STEP_INSTANCES_COMPLETED } from '../types/admissionStepTypes';

const initialState = {
  validatePhone: {
    formInfo: {
      validationCode: ''
    },
    isSubmitting: false,
    error: '',
    success: ''
  },
  updatePhone: {
    formInfo: {
      mobilePhone: ''
    },
    isSubmitting: false,
    isEditingPhone: false,
    error: ''
  },
  validateEmail: {
    formInfo: {
      validationCode: ''
    },
    isSubmitting: false,
    error: '',
    success: ''
  },
  updateEmail: {
    formInfo: {
      email: ''
    },
    isSubmitting: false,
    isEditingEmail: false,
    error: ''
  },
};

export default (state = initialState, action) => {

  switch (action.type) {
    case VALIDATE_PHONE:
      state = {
        ...state, validatePhone: { ...state.validatePhone, isSubmitting: true, error: '', success: '' }
      };
      break;

    case VALIDATE_PHONE_COMPLETED:
      state = {
        ...state,
        validatePhone: {
          ...state.validatePhone
        }
      };
      break;

    case VALIDATE_PHONE_FAILED:
      state = {
        ...state,
        validatePhone: {
          ...state.validatePhone,
          isSubmitting: false,
          error: action.errorCode
        }
      };
      break;

    case UPDATE_MOBILE_PHONE:
      state = {
        ...state,
        updatePhone: {
          ...state.updatePhone,
          isSubmitting: true
        },
        validatePhone: {
          ...state.validatePhone,
          error: '',
          success: ''
        }
      };
      break;

    case UPDATE_MOBILE_PHONE_COMPLETED:
      state = {
        ...state,
        updatePhone: {
          ...state.updatePhone,
          isSubmitting: false,
          isEditingPhone: false
        },
        validatePhone: {
          ...state.validatePhone,
          error: '',
          success: 'Mobile number updated and validation code sent'
        }
      };
      break;

    case UPDATE_MOBILE_PHONE_FAILED:
      state = {
        ...state,
        updatePhone: {
          ...state.updatePhone,
          isSubmitting: false,
          error: action.errorCode
        }
      };
      break;

    case RESEND_PHONE_VALIDATION_CODE:
      state = {
        ...state,
        validatePhone: {
          ...state.validatePhone,
          error: '',
          success: ''
        }
      };
      break;

    case RESEND_PHONE_VALIDATION_CODE_COMPLETED:
      state = {
        ...state,
        validatePhone: {
          ...state.validatePhone,
          error: '',
          success: 'Mobile validation code sent'
        }
      };
      break;

    case RESEND_PHONE_VALIDATION_CODE_FAILED:
      state = {
        ...state,
        validatePhone: {
          ...state.validatePhone,
          error: 'Validation code could not be sent',
          success: ''
        }
      };
      break;

    case EDIT_MOBILE_PHONE:
      state = {
        ...state,
        updatePhone: {
          ...state.updatePhone,
          isEditingPhone: true,
          error: ''
        },
        validatePhone: {
          ...state.validatePhone,
          error: '',
          success: ''
        }
      };
      break;

    case CANCEL_MOBILE_PHONE:
      state = {
        ...state,
        updatePhone: {
          ...state.updatePhone,
          isEditingPhone: false,
          error: ''
        },
        validatePhone: {
          ...state.validatePhone,
          error: '',
          success: ''
        }
      };
      break;

    case VALIDATE_EMAIL:
      state = {
        ...state,
        validateEmail: {
          ...state.validateEmail,
          isSubmitting: true,
          error: ''
        }
      };
      break;

    case VALIDATE_EMAIL_COMPLETED:
      state = {
        ...state,
        validateEmail: {
          ...state.validateEmail
        }
      };
      break;

    case VALIDATE_EMAIL_FAILED:
      state = {
        ...state,
        validateEmail: {
          ...state.validateEmail,
          isSubmitting: false,
          error: action.error.data
        }
      };
      break;

    case UPDATE_EMAIL:
      state = {
        ...state,
        updateEmail: {
          ...state.updateEmail,
          isSubmitting: true
        }
      };
      break;

    case UPDATE_EMAIL_COMPLETED:
      state = {
        ...state,
        updateEmail: {
          ...state.updateEmail,
          isSubmitting: false,
          isEditingEmail: false
        }
      };
      break;

    case UPDATE_EMAIL_FAILED:
      state = {
        ...state,
        updateEmail: {
          ...state.updateEmail,
          isSubmitting: false,
          error: 'Unable to update email'
        }
      };
      break;

    case RESEND_EMAIL_VALIDATION_CODE:
      state = {
        ...state,
        validateEmail: {
          ...state.validateEmail,
          error: '',
          success: ''
        }
      };
      break;

    case RESEND_EMAIL_VALIDATION_CODE_COMPLETED:
      state = {
        ...state,
        validateEmail: {
          ...state.validateEmail,
          error: '',
          success: 'Email validation code sent'
        }
      };
      break;

    case RESEND_EMAIL_VALIDATION_CODE_FAILED:
      state = {
        ...state,
        validateEmail: {
          ...state.validateEmail,
          error: 'Validation code could not be sent',
          success: ''
        }
      };
      break;

    case EDIT_EMAIL:
      state = {
        ...state,
        updateEmail: {
          ...state.updateEmail,
          isEditingEmail: true,
          error: ''
        },
        validateEmail: {
          ...state.validateEmail,
          error: '',
          success: ''
        }
      };
      break;

    case CANCEL_EMAIL:
      state = {
        ...state,
        updateEmail: {
          ...state.updateEmail,
          isEditingEmail: false,
          error: ''
        },
        validateEmail: {
          ...state.validateEmail,
          error: '',
          success: ''
        }
      };
      break;

    case GET_ADMISSION_STEP_INSTANCES_COMPLETED:
      state = {
        ...state,
        validatePhone: {
          ...state.validatePhone,
          isSubmitting: false
        }
      };
      break;

    case LOGOUT_USER_COMPLETED:
      state = initialState;
      break;

    default:
      return state;
  }
  return state;
};
