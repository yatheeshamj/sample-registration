import {
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_COMPLETED,
  FORGOT_PASSWORD_FAILED,
  LOGOUT_USER_COMPLETED
} from '../types/loginTypes';

const initialState = {
  formInfo: {
    email: '',
    username: ''
  },
  isSubmitting: false,
  error: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD:
      state = {
        ...state,
        error: '',
        isSubmitting: true
      };
      break;

    case FORGOT_PASSWORD_COMPLETED:
      state = {
        ...state,
        isSubmitting: false
      };
      break;

    case FORGOT_PASSWORD_FAILED:
      state = {
        ...state,
        isSubmitting: false,
        error: action.error.data
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
