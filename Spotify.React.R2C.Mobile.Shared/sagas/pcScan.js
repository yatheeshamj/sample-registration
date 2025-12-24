
import { takeLatest, put, call, select, all, take, takeEvery, cancel } from "redux-saga/effects";
import * as ActionType from "../actionTypes/pcScan"
import * as Actions from "../actions/pcScan"
import * as pcScanApi from "../api/pcScan"
import * as agentProfileSelector from "../selectors/agentProfile"




function* onFetchScanRequirements(action) {
	console.log(action)
	try {
		const props = {
			agentId: action.payload.agentId,
			rulesetId: action.payload.rulesetId
		};

		const data = yield call(pcScanApi.fetchPCScanRequirements, props);
		yield put(Actions.fetchPCScanRequirementsComplete(data));

	} catch (e) {

		yield put(Actions.fetchPCScanRequirementsError(e));

	}
}

export function* createPCScanAssessment(action) {
	try {

		const agentProfile = yield select(agentProfileSelector.get);

		const props = {
			agentId: agentProfile.agentId,
			PcId: action.payload.pcId,
			IpAddress: action.payload.ipAddress,
			OsType: action.payload.osType
		};

		const response = yield call(pcScanApi.createPCScanAssessment, props);

		if (response) {

			yield put({
				type: ActionType.createPCScanAssessmentComplete,
				payload: response
			});
		}
		else {
			yield put({
				type: ActionType.createPCScanAssessmentsError,
				payload: response === null ? "There was an error" : response
			});
		}


	} catch (err) {

		yield put(Actions.createPCScanAssessmentsError(err));
	}
}

export function* clearPCScanAssessment(action) {

	try {
		const agentProfile = yield select(agentProfileSelector.get);
		console.log(action)

		//Reload enrollment steps
		var enrollmentStepsData = {
			agentId: agentProfile.agentId,
			enrollmentId: action.payload.enrollmentId,
		}

		var opportunityData = {
			agentId: agentProfile.agentId,
			opportunityId: action.payload.opportunityId
		}

		// const data = yield call(enrollmentStepsApi.getByIdForAgent, enrollmentStepsData);
		// yield put(enrollmentStepsActions.fetchEnrollmentStepsComplete(data));

		// const oppData = yield call(opportunityApi.byIdForAgent, opportunityData);
		// yield put(opportunityActions.fetchOpportunitiesComplete(oppData));

		put({
			type: ActionType.clearPCScanAssessment,
			payload: null
		});
	}
	catch (err) { }
}

export default function* watcher() {
	yield takeLatest(ActionType.fetchPCScanRequirements, onFetchScanRequirements);
	yield takeLatest(ActionType.createPCScanAssessment, createPCScanAssessment);
	yield takeLatest(ActionType.clearPCScanAssessment, clearPCScanAssessment);


}
