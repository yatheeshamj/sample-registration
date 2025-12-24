
import * as actionTypes from "../actionTypes/auth"

export const setToken = (payload) => ({
    type: actionTypes.SET_TOKEN,
    payload
});

export const getToken = payload => ({
    type: actionTypes.GET_TOKEN,
    payload
})


export const setTokenMissing = (payload) => ({
    type: actionTypes.SET_TOKEN_MISSING,
    payload
});

export const unauthorizedResponseReceived = payload => ({
    type: actionTypes.UnauthorizedResponseReceived,
    payload
})
