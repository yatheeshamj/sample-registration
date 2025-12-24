import {
  FORGOT_USERNAME,
  FORGOT_USERNAME_COMPLETED,
  FORGOT_USERNAME_FAILED,
  LOGOUT_USER_COMPLETED
} from '../types/loginTypes';

const initialState = {
  formInfo: {
    email: ''
  },
  isSubmitting: false,
  error: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FORGOT_USERNAME:
      state = {
        ...state,
        isSubmitting: true,
        error: ''
      };
      break;

    case FORGOT_USERNAME_COMPLETED:
      state = {
        ...state,
        isSubmitting: false
      };
      break;

    case FORGOT_USERNAME_FAILED:
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
