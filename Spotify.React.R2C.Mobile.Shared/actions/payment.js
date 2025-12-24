import * as actions from "../actionTypes/payment"

//
export const getFormatAddress = (payload) => ({
	type: actions.getFormatAddress,
    payload
});

export const getFormatAddressComplete = (payload) => ({
	type: actions.getFormatAddressComplete,
    payload
});

export const getFormatAddressError = (payload) => ({
	type: actions.getFormatAddressError,
    payload
});


export const retrieveShippingAddress = (payload) => ({
	type: actions.retrieveShippingAddress,
	payload
});

export const retrieveShippingAddressComplete = (payload) => ({
	type: actions.retrieveShippingAddressComplete,
	payload
});

export const retrieveShippingAddressError = (payload) => ({
	type: actions.retrieveShippingAddressError,
	payload
});

export const validateShippingAddress = (payload) => ({
	type: actions.validateShippingAddress,
	payload
});

export const validateShippingAddressComplete = (payload) => ({
	type: actions.validateShippingAddressComplete,
	payload
});

export const validateShippingAddressError = (payload) => ({
	type: actions.validateShippingAddressError,
	payload
});

export const getPaymentInfo = (payload) => ({
	type: actions.getPaymentInfo,
	payload
});

export const getPaymentInfoComplete = (payload) => ({
	type: actions.getPaymentInfoComplete,
	payload
});

export const getPaymentInfoError = (payload) => ({
	type: actions.getPaymentInfoError,
	payload
});

export const clearPaymentInfo = (payload) => ({
	type: actions.clearPaymentInfo,
	payload
});

export const getStates = (payload) => ({
	type: actions.getStates,
	payload
});
export const getStatesComplete = (payload) => ({
	type: actions.getStatesComplete,
	payload
});

export const getStatesError = (payload) => ({
	type: actions.getStatesError,
	payload
});

export const paymentComplete = (payload) => ({
	type: actions.paymentComplete,
	payload
});
export const paymentCompleteComplete = (payload) => ({
	type: actions.paymentCompleteComplete,
	payload
});

export const paymentCompleteError = (payload) => ({
	type: actions.paymentCompleteError,
	payload
});


