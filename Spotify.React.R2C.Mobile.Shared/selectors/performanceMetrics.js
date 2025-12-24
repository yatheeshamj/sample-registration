
export const getData = (state) => state.performanceMetrics.data;

export const getDataAsArray = (state) => {
    return Object.values(state.performanceMetrics.data);
}
export const getById = (state, id) => {
    return state.performanceMetrics.data[id];
}


export const getCurrentOrNextSlotDateTimeProgram = (state, programIdGuid) => {
    let performanceMetrics = getById(state, programIdGuid)
    return performanceMetrics && performanceMetrics.currentOrNextSlotDateTime 
}

export const getCommitmentAdherencePercentage = (state, programIdGuid) => {

    let performanceMetrics = getById(state, programIdGuid)
    return performanceMetrics && performanceMetrics.commitmentAdherencePercentage 
}

export const getMetricForProgram = (state, programIdGuid) => {
    let data = getById(state, programIdGuid);
    let value = (data != null && data.performanceMetrics != null) ? data.performanceMetrics.overallStarRating : 0;
    return value
    
}
