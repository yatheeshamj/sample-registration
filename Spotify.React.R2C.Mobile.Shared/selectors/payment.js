

export const isFetching = (state) => state.payment.isFetching;
export const isSaving = (state) => state.payment.isSaving;
export const isComplete = (state) => state.payment.isComplete;

export const getResults = (state) => state.payment.data;
export const getError = (state) => state.payment.error;
export const getPaymentInfoData = (state) => state.payment.paymentInfoData;
export const getVerifiedData = (state) => state.payment.verifiedData
export const getStates = (state) => state.payment.states

export const getPaymentComplete = (state) => state.payment.paymentComplete;
