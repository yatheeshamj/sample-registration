

import { takeLatest, put, call, select, all, take, takeEvery, cancel } from "redux-saga/effects";
import * as ActionType from "../actionTypes/enrollmentAssessments"
import * as Actions from "../actions/enrollmentAssessments"
import * as opportunitiesApi from "../api/opportunities"
import * as agentProfileSelector from "../selectors/agentProfile"



function* onFetch(action) {

    try {
        const opportunityId = action.payload;
        const agentProfile = yield select(agentProfileSelector.get);
        const enrollmentassessments = yield call(opportunitiesApi.enrollmentAssessments, { agentId: agentProfile.agentId, opportunityId: opportunityId });
        yield put(Actions.getEnrollmentAssessmentsForOpportunitySucess({
            [opportunityId]: enrollmentassessments
        }));

    } catch (e) {

        yield put(Actions.getEnrollmentAssessmentsForOpportunityError(e));

    }
}

export default function* watcher() {
    yield takeLatest(ActionType.GET_Enrollment_Assessments_For_Opportunity, onFetch);


}
