import { takeLatest, takeEvery, put, call, select, fork } from "redux-saga/effects";
import * as ActionType from "../actionTypes/performanceMetrics"
import * as Actions from "../actions/performanceMetrics"
import * as Api from "../api/performanceMetrics"
import * as agentProfileSelector from "../selectors/agentProfile"
import { getData } from "../schema/performanceMetrics"
import * as enrolledProgramsSelector from "../selectors/enrolledPrograms"


function* onFetchMetricsForProgram(action) {

    try {
        const programCrmId = action.payload;
        const agentProfile = yield select(agentProfileSelector.get);
        const results = yield call(Api.metricsForProgram, { agentId: agentProfile.agentId, programCrmId });

        const data = getData(results, programCrmId)
    
        yield put(Actions.fetchMetricsComplete(data));

    } catch (e) {
        yield put(Actions.fetchMetricsError(e));
    }

}


function* onFetchMetrics() {
    const myPrograms = yield select(enrolledProgramsSelector.getMyPrograms);
    for (let opp of myPrograms) {
        if (opp.isCSPContracted)
            yield put(Actions.fetchMetricsForProgram(opp.crmId));


    }


}



export default function* watcher() {
    yield takeEvery(ActionType.FETCH_METRICS_FOR_PROGRAM, onFetchMetricsForProgram);
    yield takeLatest(ActionType.FETCH_METRICS, onFetchMetrics);
}
