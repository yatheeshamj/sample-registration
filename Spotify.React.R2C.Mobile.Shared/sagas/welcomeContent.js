import { takeLatest, put, call, select } from "redux-saga/effects";
import * as ActionType from "../actionTypes/welcomeContent"
import * as Actions from "../actions/welcomeContent"
import * as welcomeApi from "../api/welcomeContent"
import * as opportunitiesSelector from "../selectors/welcomeContent"
import * as agentProfileSelector from "../selectors/agentProfile"



function* fetchWelcomeContent(action) {

    try {
        const agentProfile = yield select(agentProfileSelector.get);
        const welcomeContents = yield call(welcomeApi.welcomeContent, { agentId: agentProfile.agentId });
        yield put(Actions.fetchWelcomeContentComplete(welcomeContents));

    } catch (e) {
        yield put(Actions.fetchWelcomeContentError(e));
    }

}

function* fetchWelcomeContentComplete(action) {


}


function* fetchWelcomeContentError(action) {



}


export default function* watcher() {
    yield takeLatest(ActionType.FetchWelcomeContent, fetchWelcomeContent);
    yield takeLatest(ActionType.FetchWelcomeContentComplete, fetchWelcomeContentComplete);
    yield takeLatest(ActionType.FetchWelcomeContentError, fetchWelcomeContentError);
}
