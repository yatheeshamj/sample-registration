
import { takeLatest, put, call, select, all, take, takeEvery, cancel } from "redux-saga/effects";
import * as ActionType from "../actionTypes/enrollmentSteps"
import * as Actions from "../actions/enrollmentSteps"
import * as enrollmentStepsApi from "../api/enrollmentSteps"
import * as agentProfileSelector from "../selectors/agentProfile"



function* onFetchEnrollmentSteps(action) {

    try {
        const data = yield call(enrollmentStepsApi.getByIdForAgent, action.payload);
        yield put(Actions.fetchEnrollmentStepsComplete(data));

    } catch (e) {

        yield put(Actions.fetchEnrollmentStepsError(e));

    }
}

export default function* watcher() {
    yield takeLatest(ActionType.FetchEnrollmentSteps, onFetchEnrollmentSteps);


}
