
import { takeLatest, put, call, select, all, take, takeEvery, cancel } from "redux-saga/effects";
import * as ActionType from "../actionTypes/pcCheck"
import * as Actions from "../actions/pcCheck"
import * as pcCheckApi from "../api/pcCheck"
import * as agentProfileSelector from "../selectors/agentProfile"

import * as enrollmentStepsActions from "../actions/enrollmentSteps"
import * as enrollmentStepsApi from "../api/enrollmentSteps"
import * as opportunityApi from "../api/opportunities"
import * as opportunityActions from "../actions/opportunities"
import { generateVirtualClassroom } from "../actions/3rdPartyLinks";


function* onFetchPCCheckRequirements(action) {

	try {
		const props = {
			agentId: action.payload.agentId,
			opportunityId: action.payload.opportunityId,
			ostype: action.payload.ostype
		};

		const data = yield call(pcCheckApi.fetchPCCheckRequirements, props);
		yield put(Actions.fetchPCCheckRequirements(data));

	} catch (e) {

		yield put(Actions.fetchPCCheckRequirements(e));

	}
}

export function* createPCCheckAssessment(action) {
	try {

		const agentProfile = yield select(agentProfileSelector.get);

		const props = {
			agentId: agentProfile.agentId,
			opportunityId: action.payload.opportunityId,
			pcId: action.payload.pcId,
			ipAddress: action.payload.ipAddress,
			osType: action.payload.osType,
			isFirstClass: action.payload.isFirstClass,
		};

		const response = yield call(pcCheckApi.createPCCheckAssessment, props);

		if (response) {
			if (action.payload.isFirstClass && response.globalResult === "PASS") {
				yield put(
					generateVirtualClassroom({
						primaryClassSchedule: action.payload.primaryClassSchedule,
						enrollmentId: action.payload.enrollmentId,
					})
				);
			}
			yield put({
				type: ActionType.createPCCheckAssessmentComplete,
				payload: response
			});
		}
		else {
			yield put({
				type: ActionType.createPCCheckAssessmentsError,
				payload: response === null ? "There was an error" : response
			});
		}


	} catch (err) {

		yield put(Actions.createPCCheckAssessmentsError(err));
	}
}

export function* clearPCCheckAssessment(action) {

	try {
		const agentProfile = yield select(agentProfileSelector.get);

		//Reload enrollment steps
		var enrollmentStepsData = {
			agentId: agentProfile.agentId,
			enrollmentId: action.payload.enrollmentId,
		}

		var opportunityData = {
			agentId: agentProfile.agentId,
			opportunityId: action.payload.opportunityId
		}

		const data = yield call(enrollmentStepsApi.getByIdForAgent, enrollmentStepsData);
		yield put(enrollmentStepsActions.fetchEnrollmentStepsComplete(data));

		const oppData = yield call(opportunityApi.byIdForAgent, opportunityData);
		yield put(opportunityActions.fetchOpportunitiesComplete(oppData));

		put({
			type: ActionType.clearPCCheckAssessment,
			payload: null
		});
	}
	catch (err) { }
}

export default function* watcher() {
	yield takeLatest(ActionType.fetchPCCheckRequirements, onFetchPCCheckRequirements);
	yield takeLatest(ActionType.createPCCheckAssessment, createPCCheckAssessment);
	yield takeLatest(ActionType.clearPCCheckAssessment, clearPCCheckAssessment);


}
