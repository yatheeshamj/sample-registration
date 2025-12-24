
import * as actions from "../actionTypes/applicationInsights"

export const trackError = (payload) => ({
    type: actions.APPLICATION_INSIGHTS_TRACK_ERROR,
    payload
});

export const trackEvent = (payload) => ({
    type: actions.APPLICATION_INSIGHTS_TRACK_EVENT,
    payload
});

export const trackTrace = (payload) => ({
    type: actions.APPLICATION_INSIGHTS_TRACK_TRACE,
    payload
});
