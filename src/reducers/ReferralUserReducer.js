import {
  GET_REFERRAL_USER,
  GET_REFERRAL_USER_SUCCESS,
  GET_REFERRAL_USER_FAILURE,
  PUT_REFERRAL_USER,
} from "../types/registrationTypes";

import {
  GET_ADMISSION_STEP_INSTANCES,
  GET_ADMISSION_STEP_INSTANCES_COMPLETED,
} from "../types/admissionStepTypes";

const initialState = {
  spBusinessID: null,
  spName: "",
  isLoading: true,
  // isfetchingSteps: false,
  isUpdating: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_REFERRAL_USER_SUCCESS:
      {
        state = { ...state, ...action.payload.data };
        state.isLoading = false;
      }
      break;
    case GET_REFERRAL_USER_FAILURE:
      state = {
        ...state,
        isLoading: false,
      };
      
      break;
    // case GET_ADMISSION_STEP_INSTANCES:
    //   // state = {
    //   //   ...state,
    //   //   isfetchingSteps: true,
    //   // };
    //   break;

    // // case GET_ADMISSION_STEP_INSTANCES_COMPLETED:
    // //   state = {
    // //     ...state,
    // //     isfetchingSteps: false,
    // //   };
    // //   break;
    case PUT_REFERRAL_USER:
      state = {
        ...state,
        isUpdating: true,
      };
      break;
    case  GET_REFERRAL_USER:
      state = {
        ...state,
        isLoading: true,
      };
      break;
    default:
      return state;
  }
  return state;
};
