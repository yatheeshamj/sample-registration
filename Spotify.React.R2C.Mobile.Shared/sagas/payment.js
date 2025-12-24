
import { takeLatest, put, call, select, all, take, takeEvery, cancel } from "redux-saga/effects";
import * as ActionType from "../actionTypes/payment"
import * as Actions from "../actions/payment"
import * as paymentShippingApi from "../api/payment"
import * as agentProfileSelector from "../selectors/agentProfile"

export function* onGetFormatAddress(action) {
	try {

		const agentProfile = yield select(agentProfileSelector.get);

		const props = {
			agentId: agentProfile.agentId,
			moniker: action.payload.moniker
		};

		const response = yield call(paymentShippingApi.getFormatAddress, props);

		if (response) {

			yield put({
				type: ActionType.getFormatAddressComplete,
				payload: response
			});
		}
		else {
			yield put({
				type: ActionType.getFormatAddressError,
				payload: response === null ? "There was an error" : response
			});
		}


	} catch (err) {

		yield put(Actions.getFormatAddressError(err));
	}
}


export function* onValidateShippingAddress(action) {
	try {

		const agentProfile = yield select(agentProfileSelector.get);

		const props = {
			agentId: agentProfile.agentId,
			street1: action.payload.street1,
			street2: action.payload.street2,
			city: action.payload.city,
			stateProvince: action.payload.state,
			zipPostalCode: action.payload.zip,
			addressString: action.payload.addressString
		};

		const response = yield call(paymentShippingApi.validateShippingAddress, props);

		if (response) {

			yield put({
				type: ActionType.validateShippingAddressComplete,
				payload: response
			});
		}
		else {
			yield put({
				type: ActionType.validateShippingAddressError,
				payload: response === null ? "There was an error" : response
			});
		}


	} catch (err) {

		yield put(Actions.validateShippingAddressError(err));
	}
}

export function* onRetrieveShippingAddress(action) {
	try {

		const agentProfile = yield select(agentProfileSelector.get);

		const props = {
			agentId: agentProfile.agentId,
			opportunityId: action.payload.opportunityId,
		};

		const response = yield call(paymentShippingApi.retrieveShippingAddress, props);

		if (response) {

			yield put({
				type: ActionType.retrieveShippingAddressComplete,
				payload: response
			});
		}
		else {
			yield put({
				type: ActionType.retrieveShippingAddressError,
				payload: response === null ? "There was an error" : response
			});
		}


	} catch (err) {

		yield put(Actions.retrieveShippingAddressError(err));
	}
}

export function* onGetPaymentInfo(action) {
	try {

		const agentProfile = yield select(agentProfileSelector.get);

		const props = {
			agentId: agentProfile.agentId,
			enrollmentId: action.payload.enrollmentId,
		};

		const response = yield call(paymentShippingApi.getPaymentInfo, props);
		if (response) {
			yield put({
				type: ActionType.getPaymentInfoComplete,
				payload: response
			});
		}
		else {
			yield put({
				type: ActionType.getPaymentInfoError,
				payload: response === null ? "There was an error" : response
			});
		}

	} catch (err) {

		yield put(Actions.getPaymentInfoError(err));
	}
}

export function* clearPaymentInfo(action) {

	try {

		const payload = null;
		yield put(ActionType.clearPaymentInfo(payload));

	}
	catch (err) { }
}

export function* onGetStates(action) {
	try {

		const response = yield call(paymentShippingApi.getStates, null);
		if (response) {
			yield put({
				type: ActionType.getStatesComplete,
				payload: response
			});
		}
		else {
			yield put({
				type: ActionType.getStatesError,
				payload: response === null ? "There was an error" : response
			});
		}

	} catch (err) {

		yield put(Actions.getStatesError(err));
	}
}

export function* onPaymentComplete(action) {
	try {

		const agentProfile = yield select(agentProfileSelector.get);

		const props = {
			agentId: agentProfile.agentId,
			itemCost: action.payload.itemCost,
			vouchersUsed: action.payload.vouchersUsed,
			isOppCapturedCostBigger: action.payload.isOppCapturedCostBigger,
			enrollmentCrmId: action.payload.enrollmentCrmId,
			opportunityCrmId: action.payload.opportunityCrmId,
			voucherType: action.payload.voucherType,
		};

		const response = yield call(paymentShippingApi.paymentComplete, props);
		if (response) {
			yield put({
				type: ActionType.paymentCompleteComplete,
				payload: response
			});
		}
		else {
			yield put({
				type: ActionType.paymentCompleteError,
				payload: response === null ? "There was an error" : response
			});
		}

	} catch (err) {

		yield put(Actions.paymentCompleteError(err));
	}
}

export default function* watcher() {
	yield takeLatest(ActionType.getFormatAddress, onGetFormatAddress);
	yield takeLatest(ActionType.validateShippingAddress, onValidateShippingAddress);
	yield takeLatest(ActionType.retrieveShippingAddress, onRetrieveShippingAddress);
	yield takeLatest(ActionType.getPaymentInfo, onGetPaymentInfo);
	yield takeLatest(ActionType.clearPaymentInfo, clearPaymentInfo);
	yield takeLatest(ActionType.getStates, onGetStates);
	yield takeLatest(ActionType.paymentComplete, onPaymentComplete);
}
