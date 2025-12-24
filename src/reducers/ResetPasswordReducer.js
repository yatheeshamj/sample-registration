import {
  RESET_PASSWORD,
  RESET_PASSWORD_COMPLETED,
  RESET_PASSWORD_FAILED,
  FORGOT_PASSWORD_COMPLETED,
  LOGOUT_USER_COMPLETED
} from '../types/loginTypes';

const initialState = {
  formInfo: {
    username: '',
    validationCode: '',
    password: ''
  },
  isSubmitting: false,
  error: '',
  redirectMessage: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RESET_PASSWORD:
      state = {
        ...state,
        error: '',
        redirectMessage: '',
        isSubmitting: true
      };
      break;

    case RESET_PASSWORD_COMPLETED:
      state = {
        ...state,
        isSubmitting: false
      };
      break;

    case RESET_PASSWORD_FAILED:
      state = {
        ...state,
        isSubmitting: false,
        error: 'Incorrect username or code'
      };
      break;

    case FORGOT_PASSWORD_COMPLETED:
      state = {
        ...state,
        redirectMessage: 'Please check your email for a validation code'
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
