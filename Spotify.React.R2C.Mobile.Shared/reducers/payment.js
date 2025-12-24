import * as actionTypes from "../actionTypes/payment"

const initalState = {
	"isFetching": false,
	"isSaving": false,
	"isComplete": false,
	"error": null,
	"data": null,
	"paymentInfoData": null,
	"verifiedData": null,
	"states": null,
	"paymentComplete": {
		"isSaving": false,
		"error": null,
		"isSuccessful": null,

	},
};

export default (state = initalState, action) => {

	switch (action.type) {
		case actionTypes.getFormatAddress: {
			state = {
				...state,
				error: null,
				isFetching: true,
				isComplete: false,
			}
			break;
		}
		case actionTypes.getFormatAddressComplete: {
			state = {
				...state,
				error: null,
				isFetching: false,
				isComplete: true,
				data: action.payload
			}
			break;
		}
		case actionTypes.getFormatAddressError: {
			state = {
				...state,
				isFetching: false,
				isComplete: true,
				error: action.payload
			}
			break;
		}

		case actionTypes.retrieveShippingAddress: {
			state = {
				...state,
				error: null,
				isFetching: true,
				isComplete: false,
			}
			break;
		}
		case actionTypes.retrieveShippingAddressComplete: {
			state = {
				...state,
				isFetching: false,
				isComplete: true,
				data: action.payload
			}
			break;
		}
		case actionTypes.retrieveShippingAddressError: {
			state = {
				...state,
				isFetching: false,
				isComplete: true,
				error: action.payload,
				data: null
			}
			break;
		}
		case actionTypes.validateShippingAddress: {
			state = {
				...state,
				isSaving: true,
				isComplete: false,
				error: null,
				verifiedData: null
			}
			break;
		}
		case actionTypes.validateShippingAddressComplete: {
			state = {
				...state,
				isSaving: false,
				isComplete: true,
				error: null,
				verifiedData: action.payload
			}
			break;
		}
		case actionTypes.validateShippingAddressError: {
			state = {
				...state,
				isSaving: false,
				isComplete: true,
				error: action.payload,
				verifiedData: null
			}
			break;
		}
		case actionTypes.getPaymentInfo: {
			state = {
				...state,
				isFetching: true,
				error: null,
				paymentInfoData: null
			}
			break;
		}
		case actionTypes.getPaymentInfoComplete: {
			state = {
				...state,
				isFetching: false,
				error: null,
				paymentInfoData: action.payload
			}
			break;
		}
		case actionTypes.getPaymentInfoError: {
			state = {
				...state,
				isFetching: false,
				error: action.payload,
				paymentInfoData: null
			}
			break;
		}
		case actionTypes.clearPaymentInfo: {
			state = {
				...state,
				isFetching: false,
				isSaving: false,
				isComplete: true,
				verifiedData: null,
				paymentInfoData: null
			}
			break;
		}
		case actionTypes.getStates: {
			state = {
				...state,
				isFetching: true,
				error: null,
				states: null
			}
			break;
		}
		case actionTypes.getStatesComplete: {
			state = {
				...state,
				isFetching: false,
				error: null,
				states: action.payload
			}
			break;
		}
		case actionTypes.getStatesError: {
			state = {
				...state,
				isFetching: false,
				error: action.payload,
				states: null
			}
			break;
		}

		case actionTypes.paymentComplete: {
			state = {
				...state,
				paymentComplete: {
					isSaving: true,
					error: null,
					isSuccessful: null
				}
			}
			break;
		}
		case actionTypes.paymentCompleteComplete: {
			state = {
				...state,
				paymentComplete: {
					isSaving: false,
					error: null,
					isSuccessful: true,
				}
			}
			break;
		}
		case actionTypes.paymentCompleteError: {
			state = {
				...state,
				paymentComplete: {
					isSaving: false,
					error: action.payload,
					isSuccessful: false,
				}
			}
			break;
		}


		default:
			return state;

	}

	return state;
}
