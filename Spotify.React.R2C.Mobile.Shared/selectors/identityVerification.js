

export const isFetching = (state) => state.identityVerification.isFetching;
export const isComplete = (state) => state.identityVerification.isComplete;
export const isSaving = (state) => state.identityVerification.isSaving;
export const isSuccessful = (state) => state.identityVerification.isSuccessful;
export const questionData = (state) => state.identityVerification.questionData;


export const getResults = (state) => state.identityVerification.data;
export const getError = (state) => state.identityVerification.error;
