import {
    GET_ADMISSION_STEP_INSTANCES,
    GET_ADMISSION_STEP_INSTANCES_COMPLETED,
    GET_ADMISSION_STEP_INSTANCES_FAILED,
    SET_SHOW_AGENT_TYPE_COMPLETE
} from '../types/admissionStepTypes';

import {CHANGE_BUSINESS_PATH} from '../types/agentTypeTypes'

import { LOGOUT_USER_COMPLETED } from '../types/loginTypes';

const initialState = {
    showCompletedAgentTypeAlert: false,
    isFetchComplete: false,
    isFetchInProgress: true,
    steps: [],
    error:null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ADMISSION_STEP_INSTANCES:
        case CHANGE_BUSINESS_PATH:
            state = {
                ...state,
                isFetchComplete: false,
                isFetchInProgress: true,
                error:null
            };
            break;
        case GET_ADMISSION_STEP_INSTANCES_COMPLETED:
            state = {
                ...state,
                isFetchComplete: true,
                isFetchInProgress: false,
                steps: action.payload.data,
                
            };
            break;

        case GET_ADMISSION_STEP_INSTANCES_FAILED:
            state = {
                ...state,
                isFetchComplete: true,
                error:action.error
            };
            break;

        case LOGOUT_USER_COMPLETED:
            state = initialState;
            break;
        case SET_SHOW_AGENT_TYPE_COMPLETE: {
            state = {
                ...state,
                showCompletedAgentTypeAlert: action.payload
            }
        }
        default:
            return state;
    }
    return state;
};
