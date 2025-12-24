import * as actions from "../actionTypes/enrollmentSteps"

//
export const fetchEnrollmentSteps = (payload) => ({
    type: actions.FetchEnrollmentSteps,
    payload
});

export const fetchEnrollmentStepsComplete = (payload) => ({
    type: actions.FetchEnrollmentStepsComplete,
    payload
});

export const fetchEnrollmentStepsError = (payload) => ({
    type: actions.FetchEnrollmentStepsError,
    payload
});
