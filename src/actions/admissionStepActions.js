import { GET_ADMISSION_STEP_INSTANCES, GET_ADMISSION_STEP_INSTANCES_COMPLETED, SET_SHOW_AGENT_TYPE_COMPLETE } from '../types/admissionStepTypes';

export const getAdmissionStepInstances = (userId) => ({
    type: GET_ADMISSION_STEP_INSTANCES,
    payload: userId
});

export const updateAdmissionStepInstances = (data) => ({
    type: GET_ADMISSION_STEP_INSTANCES_COMPLETED,
    payload: { data }
});


export const setShowAgentTypeComplete = payload => ({
    type: SET_SHOW_AGENT_TYPE_COMPLETE,
    payload
});
