import {
  CREATE_AGENT_PROFILE_COMPLETED,
  CREATE_AGENT_PROFILE_FAILED,
  GET_AGENT_PROFILE_COMPLETED,
  GET_AGENT_PROFILE_FAILED,
} from "../types/registrationTypes";

import {
  UPDATE_MOBILE_PHONE_COMPLETED,
  UPDATE_EMAIL_COMPLETED,
} from "../types/validateAccountTypes";

import { LOGOUT_USER_COMPLETED } from "../types/loginTypes";
import {
  UPDATE_NAME,
  SET_SCREENINGASSESSMENT_REQUIRED,
} from "../types/agentTypeTypes";

const initialState = {
  userId: null,
  agentId: null,
  firstName: "",
  lastName: "",
  middleInitial: "",
  email: "",
  mobilePhone: "",
  stateId: "",
  countryId: "",
  userName: null,
  password: null,
  countryCode: "",
  registrationType: null,
  campaignCode: "",
  isPrincipalOwner: false,
  isScreeningAssessmentRequired: null,
  opportuntiyBoardType: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_AGENT_PROFILE_COMPLETED:
      state = action.payload.data;
      break;

    case CREATE_AGENT_PROFILE_FAILED:
      break;

    case GET_AGENT_PROFILE_COMPLETED:


      state = { ...state, ...action.payload.data };
      break;

    case GET_AGENT_PROFILE_FAILED:
      break;

    case UPDATE_MOBILE_PHONE_COMPLETED:
      state = {
        ...state,
        mobilePhone: action.payload.data,
      };
      break;
    case UPDATE_EMAIL_COMPLETED:
      state = {
        ...state,
        email: action.payload.data,
      };
      break;
    case LOGOUT_USER_COMPLETED:
      state = initialState;
      break;
    case UPDATE_NAME:
      state = {
        ...state,
        ...action.payload,
      };
      break;
    case SET_SCREENINGASSESSMENT_REQUIRED:
      state = {
        ...state,
        isScreeningAssessmentRequired:
          action.payload.isScreeningAssessmentRequired,
      };
      break;
    default:
      return state;
  }
  return state;
};
