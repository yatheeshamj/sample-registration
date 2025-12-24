import jwtDecode from 'jwt-decode';
import { put, takeLatest, call } from 'redux-saga/effects';

import { loginApi } from './api';
import Cookies from 'universal-cookie';

import history from '../history';

import {
    LOGOUT_REDIRECT,
    LOGIN_REDIRECT,
    LOGIN_USER,
    LOGIN_USER_COMPLETED,
    LOGIN_USER_FAILED,
    LOGOUT_USER,
    LOGOUT_USER_COMPLETED,
    FORGOT_PASSWORD,
    FORGOT_PASSWORD_COMPLETED,
    FORGOT_PASSWORD_FAILED,
    RESET_PASSWORD,
    RESET_PASSWORD_COMPLETED,
    RESET_PASSWORD_FAILED,
    FORGOT_USERNAME,
    FORGOT_USERNAME_COMPLETED,
    FORGOT_USERNAME_FAILED,
    VERIFY_CAPTCHA,
    VERIFY_CAPTCHA_COMPLETED,
    VERIFY_CAPTCHA_FAILED
} from '../types/loginTypes';

import { GET_AGENT_PROFILE } from '../types/registrationTypes';

export function* loginUserRequest(action) {
    try {
        const response = yield call(loginApi.loginUser, action);
        //alert(response);
        const cookies = new Cookies();
        cookies.set('auth_token', response.access_token);

        yield put({
            type: LOGIN_USER_COMPLETED,
            payload: { data: response.access_token }
        });
        var decoded = jwtDecode(response.access_token);
        yield put({ type: GET_AGENT_PROFILE, payload: decoded.sub });
    } catch (err) {
        yield put({ type: LOGIN_USER_FAILED, error: err });
    }
}

export function* loginRedirect() {
    const response = yield call(loginApi.loginRedirect);
}


export function* logoutRedirect() {
    const cookies = new Cookies();
    cookies.remove('bc.visitorToken');
    const response = yield call(loginApi.logoutRedirect);
}

export function* logoutUserRequest(action) {
    const cookies = new Cookies();
    cookies.remove('auth_token');
    yield put({
        type: LOGOUT_USER_COMPLETED,
        payload: {}
    });
    history.push('/login');
}

export function* forgotPasswordRequest(action) {
    try {
        const response = yield call(loginApi.forgotPassword, action);
        yield put({ type: FORGOT_PASSWORD_COMPLETED, payload: { data: response } });
        history.push('/resetpassword');
    } catch (err) {
        yield put({ type: FORGOT_PASSWORD_FAILED, error: err });
    }
}

export function* resetPasswordRequest(action) {
    try {
        const response = yield call(loginApi.resetPassword, action);
        yield put({ type: RESET_PASSWORD_COMPLETED, payload: { data: response } });
        history.push('/login');
    } catch (err) {
        yield put({ type: RESET_PASSWORD_FAILED, error: err });
    }
}

export function* forgotUsernameRequest(action) {
    try {
        const response = yield call(loginApi.forgotUsername, action);
        yield put({ type: FORGOT_USERNAME_COMPLETED, payload: { data: response } });
        history.push('/login');
    } catch (err) {
        yield put({ type: FORGOT_USERNAME_FAILED, error: err });
    }
}

export function* verifyReCaptchaRequest(action) {
    try {
        yield call(loginApi.verifyReCaptcha, action);
        yield put({
            type: VERIFY_CAPTCHA_COMPLETED,
            payload: { data: action.payload.form }
        });
    } catch (err) {
        yield put({ type: VERIFY_CAPTCHA_FAILED, error: err });
    }
}

export function* loginWatcher() {
    yield takeLatest(LOGOUT_REDIRECT, logoutRedirect);
    yield takeLatest(LOGIN_REDIRECT, loginRedirect);
    yield takeLatest(LOGIN_USER, loginUserRequest);
    yield takeLatest(LOGOUT_USER, logoutUserRequest);
    yield takeLatest(FORGOT_PASSWORD, forgotPasswordRequest);
    yield takeLatest(RESET_PASSWORD, resetPasswordRequest);
    yield takeLatest(FORGOT_USERNAME, forgotUsernameRequest);
    yield takeLatest(VERIFY_CAPTCHA, verifyReCaptchaRequest);
}
