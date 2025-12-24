import { put, takeLatest, call } from 'redux-saga/effects';
import {
    getRequest,
    postRequest

} from 'spotify-shared/api/helpers/request';
import {
    SET_TOKEN, GET_TOKEN
} from '../actionTypes/auth';
import {
    setToken,
} from '../actions/auth';
import { setAuthorizationHeader } from "spotify-shared/api/helpers/request"



function* onSetToken(action) {
    setAuthorizationHeader(action.payload);
}


function* onGetToken() {

    function token() {
        return postRequest(`/account/refreshtoken`);
    };

    try {
        var token = yield call(token, {});
   
        yield put(setToken(token))
    } catch (err) {
        console.log(err)
    }
}

export default function* authWatcher() {
    yield takeLatest(SET_TOKEN, onSetToken);
    yield takeLatest(GET_TOKEN, onGetToken);

}
