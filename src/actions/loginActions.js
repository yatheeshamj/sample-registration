import {
    LOGOUT_REDIRECT,
    LOGIN_REDIRECT,
    LOGIN_USER,
    LOGOUT_USER,
    FORGOT_PASSWORD,
    FORGOT_USERNAME,
    RESET_PASSWORD,
    VERIFY_CAPTCHA
} from '../types/loginTypes';

import {
    SET_TOKEN,
    GET_AUTH_TOKEN,
    GET_TOKEN
} from '../types/authTypes';


export const loginRedirect = () => ({
    type: LOGIN_REDIRECT
});

export const logoutRedirect = () => ({
    type: LOGOUT_REDIRECT
});

export const loginUser = (formData) => ({
    type: LOGIN_USER,
    payload: formData
});

export const logoutUser = () => ({
    type: LOGOUT_USER,
    payload: {}
});

export const submitForgotPassword = (formData) => ({
    type: FORGOT_PASSWORD,
    payload: formData
});

export const submitForgotUsername = (formData) => ({
    type: FORGOT_USERNAME,
    payload: formData
});

export const submitResetPassword = (formData) => ({
    type: RESET_PASSWORD,
    payload: formData
});

export const verifyCaptcha = (data) => ({
    type: VERIFY_CAPTCHA,
    payload: data
});

export const setToken = (data) => ({
    type: SET_TOKEN,
    payload: data
});

export const getToken = () => ({
    type: GET_TOKEN,
    payload: {}
});





