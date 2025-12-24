import { takeLatest, put, call, select, all, take, takeEvery, cancel } from "redux-saga/effects";
import * as ActionType from "../actionTypes/globalParameters"
import * as Actions from "../actions/globalParameters"
import * as _globalParametersApi from "../api/globalParameters"
import { GlobalParameterTypes } from "../constants"
import * as _3rdPartyLinksActions from "../actions/3rdPartyLinks"


function* onRetrieveGlobalParameter(action) {
    try {

        const data = yield call(_globalParametersApi.retrieveGlobalParameters, action.payload);
        yield put(Actions.retrieveGlobalParameterComplete([action.payload, data]));

    } catch (e) {
        
        yield put(globalActions.retrieveGlobalParameterError(e));
    }
}


export default function* watcher() {
    yield takeEvery(ActionType.RETRIEVEGLOBALPARAMETER, onRetrieveGlobalParameter);
}
