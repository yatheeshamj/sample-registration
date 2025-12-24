

export const isFetching = (state) => state.pcCheckAssessment.isFetching;
export const isComplete = (state) => state.pcCheckAssessment.isComplete;
export const isSaving = (state) => state.pcCheckAssessment.isSaving;
export const isSuccessful = (state) => state.pcCheckAssessment.isSuccessful;


export const getResults = (state) => state.pcCheckAssessment.data;
export const getError = (state) => state.pcCheckAssessment.error;
