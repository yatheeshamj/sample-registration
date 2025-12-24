import { put, takeLatest, call, select } from 'redux-saga/effects';
import * as preferencesApi from '../api/PreferencesApi';

import * as agentProfileSelector from "../selectors/agentProfile"

import {
    GET_PREFERENCES,
    GET_PREFERENCES_COMPLETED,
    GET_PREFERENCES_FAILED,
    UPDATE_PREFERENCES,
    UPDATE_PREFERENCES_COMPLETED,
    UPDATE_PREFERENCES_FAILED
} from '../actionTypes/preferencesTypes';



export function* getPreferencesRequest(action) {


    const agentProfile = yield select(agentProfileSelector.get);
    const agentId = agentProfile.agentId;
    action.payload = agentId;

    try {
        const response = yield call(preferencesApi.getPreferencesQuestions, action);
        yield put({
            type: GET_PREFERENCES_COMPLETED,
            payload: { data: response }
        });
    } catch (err) {
        yield put({
            type: GET_PREFERENCES_FAILED,
            error: err
        });
    }
}

export function* updatePreferencesRequest(action) {


    const agentProfile = yield select(agentProfileSelector.get);
    const agentId = agentProfile.agentId;
    const preferences = action.payload.preferences;


    action.payload = { agentId, preferences };


    try {
        const response = yield call(preferencesApi.updatePreferences, action);
        yield put({
            type: UPDATE_PREFERENCES_COMPLETED,
            payload: { data: response }
        });

    } catch (err) {

        yield put({
            type: UPDATE_PREFERENCES_FAILED,
            error: err
        });
    }
}




export default function* preferencesWatcher() {
    yield takeLatest(GET_PREFERENCES, getPreferencesRequest);
    yield takeLatest(UPDATE_PREFERENCES, updatePreferencesRequest);

}
