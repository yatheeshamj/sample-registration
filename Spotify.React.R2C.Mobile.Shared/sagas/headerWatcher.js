import { put, takeLatest, call, select } from 'redux-saga/effects';
import {
    SET_HEADER_VISIBLE,
    SET_HEADER_VISIBLE_COMPLETE,
    SET_HEADER_INVISIBLE,
    SET_HEADER_INVISIBLE_COMPLETE
} from '../actionTypes/headerActionTypes';


export function* setHeaderVisible(action) {
    
    try {
        yield put({
            type: SET_HEADER_VISIBLE_COMPLETE,
            payload: { data: true }
        });

    } catch (err) {
        console.log(err);
    }
}



export function* setHeaderInvisible(action) {
    
    try {
        yield put({
            type: SET_HEADER_INVISIBLE_COMPLETE,
            payload: { data: false }
        });

    } catch (err) {
        console.log(err);
    }
}




export default function* headerWatcher() {

    yield takeLatest(SET_HEADER_VISIBLE, setHeaderVisible);
    yield takeLatest(SET_HEADER_INVISIBLE, setHeaderInvisible);

}
