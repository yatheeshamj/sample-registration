

export const isFetching = (state) => state.pcScanAssessment.isFetching;
export const isComplete = (state) => state.pcScanAssessment.isComplete;
export const isSaving = (state) => state.pcScanAssessment.isSaving;
export const isSuccessful = (state) => state.pcScanAssessment.isSuccessful;


export const getResults = (state) => state.pcScanAssessment.data;
export const getError = (state) => state.pcScanAssessment.error;
