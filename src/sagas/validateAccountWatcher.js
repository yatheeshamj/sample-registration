import { put, takeLatest, call } from 'redux-saga/effects';
import { validateAccountApi } from './api';
import store from '../store';

import {
    EMAIL_VALIDATION_CODE_TYPE,
    MOBILE_VALIDATION_CODE_TYPE
} from '../constants';

import {
    VALIDATE_PHONE,
    VALIDATE_PHONE_COMPLETED,
    VALIDATE_PHONE_FAILED,
    RESEND_PHONE_VALIDATION_CODE,
    RESEND_PHONE_VALIDATION_CODE_COMPLETED,
    RESEND_PHONE_VALIDATION_CODE_FAILED,
    UPDATE_MOBILE_PHONE,
    UPDATE_MOBILE_PHONE_COMPLETED,
    UPDATE_MOBILE_PHONE_FAILED,
    VALIDATE_EMAIL,
    VALIDATE_EMAIL_COMPLETED,
    VALIDATE_EMAIL_FAILED,
    RESEND_EMAIL_VALIDATION_CODE,
    RESEND_EMAIL_VALIDATION_CODE_COMPLETED,
    RESEND_EMAIL_VALIDATION_CODE_FAILED,
    UPDATE_EMAIL,
    UPDATE_EMAIL_COMPLETED,
    UPDATE_EMAIL_FAILED,
} from '../types/validateAccountTypes';

import { GET_ADMISSION_STEP_INSTANCES } from '../types/admissionStepTypes';

export function* validatePhoneRequest(action) {
    try {

        const response = yield call(validateAccountApi.validateAccount, action);
        yield put({
            type: VALIDATE_PHONE_COMPLETED,
            payload: { response }
        });
        const validationPayload = {
            userId: store.getState().agentProfile.userId,
            validationCodeType: EMAIL_VALIDATION_CODE_TYPE
        };
        yield put({
            type: RESEND_EMAIL_VALIDATION_CODE,
            payload: validationPayload
        });
        yield put({
            type: GET_ADMISSION_STEP_INSTANCES,
            payload: {}
        });
    } catch (err) {
        yield put({
            type: VALIDATE_PHONE_FAILED,
            errorCode: err.status
        });
    }
}

export function* resendPhoneValidationCodeRequest(action) {
    try {

        yield call(validateAccountApi.resendValidationCode, action);
        yield put({
            type: RESEND_PHONE_VALIDATION_CODE_COMPLETED,
            payload: {}
        });
    } catch (err) {
        yield put({
            type: RESEND_PHONE_VALIDATION_CODE_FAILED,
            payload: {}
        });
    }
}

export function* resendEmailValidationCodeRequest(action) {
    try {

        yield call(validateAccountApi.resendValidationCode, action);
        yield put({
            type: RESEND_EMAIL_VALIDATION_CODE_COMPLETED,
            payload: {}
        });
    } catch (err) {
        yield put({
            type: RESEND_EMAIL_VALIDATION_CODE_FAILED,
            payload: {}
        });
    }
}

export function* updateMobilePhoneRequest(action) {
    try {

        yield call(validateAccountApi.updateMobilePhone, action);
        yield put({
            type: UPDATE_MOBILE_PHONE_COMPLETED,
            payload: { data: action.payload.mobilePhone }
        });
        const validationPayload = {
            userId: store.getState().agentProfile.userId,
            validationCodeType: MOBILE_VALIDATION_CODE_TYPE
        };
        yield put({
            type: RESEND_PHONE_VALIDATION_CODE,
            payload: validationPayload
        });
    } catch (err) {
        yield put({
            type: UPDATE_MOBILE_PHONE_FAILED,
            errorCode: err.status
        });
    }
}

export function* validateEmailRequest(action) {

    try {

        const response = yield call(validateAccountApi.validateAccount, action);
        yield put({
            type: VALIDATE_EMAIL_COMPLETED,
            payload: { response }
        });
        yield put({
            type: GET_ADMISSION_STEP_INSTANCES,
            payload: {}
        });
    } catch (err) {
        yield put({
            type: VALIDATE_EMAIL_FAILED,
            error: err
        });
    }
}



export function* updateEmailRequest(action) {
    try {

        yield call(validateAccountApi.updateEmail, action);
        yield put({
            type: UPDATE_EMAIL_COMPLETED,
            payload: { data: action.payload.email }
        });
        yield put({
            type: RESEND_EMAIL_VALIDATION_CODE,
            payload: action.payload
        });
    } catch (err) {
        yield put({
            type: UPDATE_EMAIL_FAILED,
            error: err
        });
    }
}

export function* validateAccountWatcher() {
    yield takeLatest(VALIDATE_PHONE, validatePhoneRequest);
    yield takeLatest(
        RESEND_PHONE_VALIDATION_CODE,
        resendPhoneValidationCodeRequest
    );
    yield takeLatest(UPDATE_MOBILE_PHONE, updateMobilePhoneRequest);
    yield takeLatest(VALIDATE_EMAIL, validateEmailRequest);
    yield takeLatest(
        RESEND_EMAIL_VALIDATION_CODE,
        resendEmailValidationCodeRequest
    );
    yield takeLatest(UPDATE_EMAIL, updateEmailRequest);
}
