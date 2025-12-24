import {
  VERIFY_CAPTCHA,
  VERIFY_CAPTCHA_COMPLETED,
  LOGOUT_USER_COMPLETED
} from '../types/loginTypes';

const initialState = {
  forgotUsername: {
    isRecaptchaVerified: false
  },
  forgotPassword: {
    isRecaptchaVerified: false
  },
  resetPassword: {
    isRecaptchaVerified: false
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case VERIFY_CAPTCHA:
      state = {
        ...state,
        [action.payload.data]: {
          ...[action.payload.data],
          isRecaptchaVerified: false
        }
      };
      break;
    case VERIFY_CAPTCHA_COMPLETED:
      state = {
        ...state,
        [action.payload.data]: {
          ...[action.payload.data],
          isRecaptchaVerified: true
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
