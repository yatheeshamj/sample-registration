
import { takeLatest, put, call, select, all, take, takeEvery, cancel } from "redux-saga/effects";
import * as ActionType from "../actionTypes/identityVerification"
import * as Actions from "../actions/identityVerification"
import * as identityApi from "../api/identityVerification"
import * as agentProfileSelector from "../selectors/agentProfile"

import * as enrollmentStepsActions from "../actions/enrollmentSteps"
import * as enrollmentStepsApi from "../api/enrollmentSteps"
import * as opportunityApi from "../api/opportunities"
import * as enrollmentPrerequisitesPageActions from "../actions/enrollmentPrerequisitesPage"


export function* onCheckIdentityStatus(action) {
    try {

        const agentProfile = yield select(agentProfileSelector.get);

        const props = {
            agentId: agentProfile.agentId,
            acpCrmId: agentProfile.contactId,
            enrollmentId: action.payload.enrollmentId
        };

        const response = yield call(identityApi.checkIdentityStatus, props);

        if (response) {

            yield put({
                type: ActionType.checkIdentityStatusComplete,
                payload: response
            });
        }
        else {
            yield put({
                type: ActionType.checkIdentityStatusError,
                payload: response === null ? "There was an error" : response
            });
        }


    } catch (err) {

        yield put(Actions.checkIdentityStatusError(err));
    }
}


export function* onCheckInitialExperianVerification(action) {
    try {

        const agentProfile = yield select(agentProfileSelector.get);

        const props = {
            agentId: agentProfile.agentId,
            acpCrmId: agentProfile.contactId,
            enrollmentId: action.payload.enrollmentId
        };

        const response = yield call(identityApi.checkExperianIDVerfication, props);

        if (response) {

            yield put({
                type: ActionType.checkInitialExperianVerificationComplete,
                payload: response
            });
        }
        else {
            yield put({
                type: ActionType.checkInitialExperianVerificationError,
                payload: response === null ? "There was an error" : response
            });
        }


    } catch (err) {

        yield put(Actions.checkInitialExperianVerificationError(err));
    }
}

export function* onSaveIdentityVerificationQuestions(action) {
    try {

        const agentProfile = yield select(agentProfileSelector.get);

        const props = {
            agentId: agentProfile.agentId,
            acpCrmId: agentProfile.contactId,
            enrollmentId: action.payload.enrollmentId,
            sessionID: action.payload.sessionID,
            referenceNumber: action.payload.referenceNumber,
            questionAnswers: action.payload.questionAnswers
        };

        const response = yield call(identityApi.saveIdentityVerificationQuestions, props);

        if (response) {

            yield put({
                type: ActionType.saveIdentityVerificationQuestionsComplete,
                payload: response
            });

            if (action.payload.opportunityId) {
                yield put(enrollmentPrerequisitesPageActions.initializeEnrollmentPrerequisitesPage({
                    opportunityId: action.payload.opportunityId,
                    enrollmentId: action.payload.enrollmentId,
                    agentId: agentProfile.agentId,
                }));
                let StatusProps = {
                    agentId: agentProfile.agentId,
                    acpCrmId: agentProfile.contactId,
                    enrollmentId: action.payload.enrollmentId
                };

                yield put({
                    type: ActionType.checkIdentityStatus,
                    payload: StatusProps
                });
                
            }

        }
        else {
            yield put({
                type: ActionType.saveIdentityVerificationQuestionsError,
                payload: response === null ? "There was an error" : response
            });
        }


    } catch (err) {

        yield put(Actions.saveIdentityVerificationQuestionsError(err));
    }
}

export function* clearIdentityVerificationAssessment(action) {

    try {
        const agentProfile = yield select(agentProfileSelector.get);

        var props = {
            agentId: agentProfile.agentId,
            acpCrmId: agentProfile.contactId,
            enrollmentId: action.payload.enrollmentId
        };

        const response = yield call(identityApi.checkIdentityStatus, props);
        yield put(ActionType.checkIdentityStatusComplete(response));

    }
    catch (err) { }
}

export default function* watcher() {
    yield takeLatest(ActionType.checkIdentityStatus, onCheckIdentityStatus);
    yield takeLatest(ActionType.checkInitialExperianVerification, onCheckInitialExperianVerification);
    yield takeLatest(ActionType.clearIdentityVerificationAssessment, clearIdentityVerificationAssessment);
    yield takeLatest(ActionType.saveIdentityVerificationQuestions, onSaveIdentityVerificationQuestions);
}
