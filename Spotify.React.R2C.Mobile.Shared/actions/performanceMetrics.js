import * as ActionTypes from "../actionTypes/performanceMetrics"


export const fetchMetricsForProgram = payload => ({
    type: ActionTypes.FETCH_METRICS_FOR_PROGRAM,
    payload
});

export const fetchMetricsComplete = payload => ({
    type: ActionTypes.FETCH_METRICS_COMPLETE,
    payload
});

export const fetchMetricsError = payload => ({
    type: ActionTypes.FETCH_METRICS_ERROR,
    payload
});


export const fetchAllMetrics = payload => ({
    type: ActionTypes.FETCH_METRICS,
    payload
});
