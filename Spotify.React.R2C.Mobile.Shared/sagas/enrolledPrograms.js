
import { takeLatest, put, call, select, all, take, takeEvery, cancel } from "redux-saga/effects";
import * as ActionType from "../actionTypes/enrolledPrograms"
import * as Actions from "../actions/enrolledPrograms"
import * as enrolledProgramsApi from "../api/enrolledPrograms"
import * as enrolledProgramSelectors from "../selectors/enrolledPrograms"
import * as agentProfileSelector from "../selectors/agentProfile"
import { extractListData } from "../schema/enrolledPrograms"
import * as opportunityActions from "../actions/opportunities"
import * as opportunityActionTypes from "../actionTypes/opportunities"
import * as opportunityBoardActions from "../actions/opportunityBoard"
import * as opportunitiesSelector from "../selectors/opportunities"
import * as performanceMetricsActions from "../actions/performanceMetrics"

function* getByAgent(action) {

    try {
        const props = {
            agentId: action.payload.agentId
        };
        const enrolledPrograms = yield call(enrolledProgramsApi.getByAgent, props);
        const { data } = extractListData(enrolledPrograms);
        yield put(Actions.getByAgentComplete(data));
        yield put(performanceMetricsActions.fetchAllMetrics());

    } catch (e) {
        yield put(Actions.getByAgentError(e));
    }
}

function* onCancelEnrollment(action) {

    try {
        const props = {
            agentId: action.payload.agentId,
            enrollmentId: action.payload.enrollmentId
        };

        const response = yield call(enrolledProgramsApi.cancelEnrollment, props);

        yield put({
            type: ActionType.CANCEL_ENROLLMENT_COMPLETE,
            payload: props.enrollmentId
        });



    } catch (err) {

        yield put({
            type: ActionType.CANCEL_ENROLLMENT_ERROR,
            payload: err.data || "Unknown Error"
        });
    }

}


function* onDropEnrollment(action) {

    try {
        const props = {
            agentId: action.payload.agentId,
            opportunityCrmId: action.payload.opportunityId,
            opportunityStatusReasonId: action.payload.opportunityStatusReasonId,
            agentSelfDropped: action.payload.agentSelfDropped
        };

        const response = yield call(enrolledProgramsApi.dropEnrollment, props);

        yield put({
            type: ActionType.DROP_ENROLLMENT_COMPLETE,
            payload: props.opportunityCrmId
        });

    } catch (err) {
        yield put({
            type: ActionType.DROP_ENROLLMENT_ERROR,
            payload: err.data || "Unknown Error"
        });
    }

}

function* onCancelEnrollmentRefresh(action) {

    try {
        const props = {
            agentId: action.payload.agentId,
            countryId: action.payload.countryId,
        };

        yield put(opportunityActions.fetchOpportunities(action.payload));
        yield all([take(opportunityActionTypes.FetchOpportunitiesComplete)]);

        yield put(opportunityBoardActions.calculateOpportunities());

        // check if on In Progress tab, and if we have any opportunities In Progress
        // if so default to In Progress Tab
        if (action.payload.isInProgressTab && action.payload.gotoOpportunities == false) {
            const opportunitiesInProgress = yield select(opportunitiesSelector.getInProgressDataAsArray);
            if (opportunitiesInProgress.length > 0) {
                yield put(opportunityBoardActions.setTab("In Progress"));
            }
            else {
                yield put(opportunityBoardActions.setTab("Opportunities"));
            }
        }
        else if (action.payload.gotoOpportunities == true) {
            yield put(opportunityBoardActions.setTab("Opportunities"));

        }



    } catch (err) {

        yield put({
            type: ActionType.CANCEL_ENROLLMENT_ERROR,
            payload: err
        });
    }

}


function* getDropStatusReasons() {
    try {

        let reasons = yield select(enrolledProgramSelectors.getDropStatusReasons);
       
        if (reasons.length === 0) {
            const response = yield call(enrolledProgramsApi.getDropStatusReasons);
            yield put(Actions.getDropStatusReasonsComplete(response));
        } else {
            yield put(Actions.getDropStatusReasonsComplete(reasons));
        }


    } catch (e) {
        yield put(Actions.getDropStatusReasonsError(e));
    }

}

function* onRescheduleEnrollment(action) {

    try {
        const props = {
            agentId: action.payload.agentId,
            opportunityId: action.payload.opportunityId,
            classId: action.payload.classId
        };

        const response = yield call(enrolledProgramsApi.rescheduleEnrollment, props);

        yield put({
            type: ActionType.RESCHEDULE_CLASS_COMPLETE,
            payload: props.opportunityId
        });

    } catch (err) {

        yield put({
            type: ActionType.RESCHEDULE_CLASS_ERROR,
            payload: err
        });
    }

}

function* checkEligibility(action) {

    try {
        const props = {
            agentId: action.payload.agentId,
            opportunityId: action.payload.opportunityId,
        };

        const response = yield call(enrolledProgramsApi.CheckEligibility, props);
        // const response = {"name":"Conflicting","description":"Conflicting peak seasons"};
        yield put({
            type: ActionType.ELIGIBLITY_CHECK_COMPLETE,
            payload: response
        });
        if(response.name === "Pass") {
            yield put( opportunityActions.stageOpportunityToEnroll(props.opportunityId))
        }

    } catch (err) {

        yield put({
            type: ActionType.ELIGIBLITY_CHECK_ERROR,
            payload: err
        });
    }

}



export default function* watcher() {
    yield takeLatest(ActionType.ENROLLED_PROGRAM_GET_BY_AGENT, getByAgent);
    yield takeLatest(ActionType.CANCEL_STAGED_ENROLLMENT, onCancelEnrollment);
    yield takeLatest(ActionType.CANCEL_ENROLLMENT_REFRESH, onCancelEnrollmentRefresh);
    yield takeLatest(ActionType.GET_DROPSTATUSREASON, getDropStatusReasons);
    yield takeLatest(ActionType.DROP_STAGED_ENROLLMENT, onDropEnrollment);
    yield takeLatest(ActionType.RESCHEDULE_CLASS, onRescheduleEnrollment);
    yield takeLatest(ActionType.ELIGIBLITY_CHECK, checkEligibility);

}
