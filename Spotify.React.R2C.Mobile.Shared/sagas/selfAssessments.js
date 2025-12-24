
import { takeLatest, put, call, select, all, take, takeEvery, cancel } from "redux-saga/effects";
import * as ActionType from "../actionTypes/selfassessments"
import * as Actions from "../actions/selfassessments"
import * as selfAssessmentsApi from "../api/selfAssessments"

import * as enrollmentStepsActions from "../actions/enrollmentSteps"
import * as enrollmentStepsApi from "../api/enrollmentSteps"
import * as opportunityApi from "../api/opportunities"
import * as opportunityActions from "../actions/opportunities"



function* onFetchSelfAssessments(action) {

    try {
		const props = {
			agentId: action.payload.agentId,
			opportunityId: action.payload.opportunityId,
		};

		const data = yield call(selfAssessmentsApi.getSelfAssessments, props);
        yield put(Actions.fetchSelfAssessmentsComplete(data));

    } catch (e) {

        yield put(Actions.fetchSelfAssessmentsError(e));

    }
}

export function* saveSelfAssessments(action) {
	try {
		const props = {
			agentId: action.payload.agentId,
			enrollmentId: action.payload.enrollmentId,
			questions: action.payload.questions
		};

		const response = yield call(selfAssessmentsApi.saveSelfAssessments, props);

		//Reload enrollment steps
		var enrollmentStepsData = {
			agentId: action.payload.agentId,
			enrollmentId: action.payload.enrollmentId,
		}

		var opportunityData = {
			agentId: action.payload.agentId,
			opportunityId: action.payload.opportunityId
		}

		if (response) {
			const data = yield call(enrollmentStepsApi.getByIdForAgent, enrollmentStepsData);
			yield put(enrollmentStepsActions.fetchEnrollmentStepsComplete(data));

			const oppData = yield call(opportunityApi.byIdForAgent, opportunityData);
			yield put(opportunityActions.fetchOpportunitiesComplete(oppData));


			yield put({
				type: ActionType.saveSelfAssessmentsComplete,
				payload: { data: response }
			});
		}
		else {
			yield put({
				type: ActionType.saveSelfAssessmentsError,
				payload: { data: response }
			});
		}


	} catch (err) {

		yield put(Actions.saveSelfAssessmentsError(err));
	}
}

export default function* watcher() {
	yield takeLatest(ActionType.fetchSelfAssessments, onFetchSelfAssessments);
	yield takeLatest(ActionType.saveSelfAssessments, saveSelfAssessments);


}
