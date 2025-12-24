import { put, takeLatest, call, select } from "redux-saga/effects";
import { agentTypeApi, admissionStepApi, registrationApi, uniqueIdentityApi } from "./api";
import * as agentProfileSelector from "spotify-shared/selectors/agentProfile";

import { errorMessages } from "../constants";


import {
    SUBMIT_PRIMARY_UNIQUE_IDENTITY,
    GET_AADHAAR_REDIRECTION_URL,
    SUBMIT_SECONDARY_UNIQUE_IDENTITY,
    CHECK_PRIMARY_UNIQUE_IDENTITY_VERIFIED,
    SUBMIT_PRIMARY_UNIQUE_IDENTITY_SUCCESS,
    SUBMIT_SECONDARY_UNIQUE_IDENTITY_SUCCESS,
    GET_AADHAAR_REDIRECTION_URL_SUCCESS,
    CHECK_PRIMARY_UNIQUE_IDENTITY_VERIFIED_SUCCESS,
    SUBMIT_PRIMARY_UNIQUE_IDENTITY_FAILED,
    SUBMIT_SECONDARY_UNIQUE_IDENTITY_FAILED,
    GET_AADHAAR_REDIRECTION_URL_FAILED,
    CHECK_PRIMARY_UNIQUE_IDENTITY_VERIFIED_FAILED,
    CHECK_PRIMARY_UNIQUE_IDENTITY_VERIFICATION_API_FAILED,
    CHECK_SECONDARY_UNIQUE_IDENTITY_VERIFIED,
    CHECK_SECONDARY_UNIQUE_IDENTITY_VERIFIED_SUCCESS,
    CHECK_SECONDARY_UNIQUE_IDENTITY_VERIFIED_FAILED,
    CHECK_SECONDARY_UNIQUE_IDENTITY_VERIFICATION_API_FAILED,
    TOGGLE_IS_FETCHING_FLAG_FOR_IDENTITY,
    TOGGLE_IS_FETCHING_FLAG_FOR_SECONDARY_IDENTITY

} from '../types/uniqueIdentityTypes';

import { GET_ADMISSION_STEP_INSTANCES } from "../types/admissionStepTypes";
import { verifyPrimaryUniqueIdentity, verifySecondaryUniqueIdentity } from "../actions/uniqueIdentityActions";

export function* verifyPrimaryUniqueIdentityWatcher(action) {

    try {
        const response = yield call(uniqueIdentityApi.verifyPrimaryUniqueIdentityAPI, action);



        yield put({
            type: SUBMIT_PRIMARY_UNIQUE_IDENTITY_SUCCESS,
            payload: { data: response }

        });
        yield put({
            type: GET_ADMISSION_STEP_INSTANCES,
            payload: {}
        });
    } catch (err) {

        yield put({
            type: SUBMIT_PRIMARY_UNIQUE_IDENTITY_FAILED,
            error: err.data.message ? err : { data: { message: "UNIQUE ID ERROR" } }
        });
    }
}

export function* verifySecondaryUniqueIdentityWatcher(action) {

    try {
        const secondaryresponse = yield call(uniqueIdentityApi.verifySecondaryUniqueIdentity, action);


        // Check if secondaryresponse succeeds


        // Check if primaryresponse also succeeds
        try {
            const primaryresponse = yield call(uniqueIdentityApi.verifyPrimaryUniqueIdentityAPI, action);
            yield put({
                type: SUBMIT_PRIMARY_UNIQUE_IDENTITY_SUCCESS,
                payload: { data: primaryresponse }
            });

            yield put({
                type: SUBMIT_SECONDARY_UNIQUE_IDENTITY_SUCCESS,
                payload: { data: secondaryresponse }
            });

            yield put({
                type: GET_ADMISSION_STEP_INSTANCES,
                payload: {}
            });
        } catch (err) {
            // Handle the case where primaryresponse fails
            yield put({
                type: SUBMIT_PRIMARY_UNIQUE_IDENTITY_FAILED,
                error: err.data.message ? err : { data: { message: "UNIQUE ID ERROR" } }
            });
        }

    } catch (err) {
        console.log("err ", err);


        yield put({
            type: SUBMIT_SECONDARY_UNIQUE_IDENTITY_FAILED,
            error: err.data.message ? err : { data: { message: "SECONDARY UNIQUE ID ERROR" } },
        });
    }
}

export function* getAadhaarRedirectionURLWatcher(action) {

    try {
        const response = yield call(uniqueIdentityApi.getAadhaarRedirectionURLAPI, action);

        yield put({
            type: GET_AADHAAR_REDIRECTION_URL_SUCCESS,
            payload: { data: response }

        });

    } catch (err) {

        yield put({
            type: GET_AADHAAR_REDIRECTION_URL_FAILED,
            errorCode: err.status
        });
    }

    yield put({
        type: TOGGLE_IS_FETCHING_FLAG_FOR_IDENTITY,
        payload: false

    });
}

export function* checkPrimaryUniqueIdentityVerifiedWatcher(action) {

    try {
        const response = yield call(uniqueIdentityApi.checkPrimaryUniqueIdentityVerifiedAPI, action);
        yield put({
            type: response.isAadharValid
                ? CHECK_PRIMARY_UNIQUE_IDENTITY_VERIFIED_SUCCESS
                : CHECK_PRIMARY_UNIQUE_IDENTITY_VERIFIED_FAILED,
            payload: { data: response }
        })

    } catch (err) {

        yield put({
            type: CHECK_PRIMARY_UNIQUE_IDENTITY_VERIFICATION_API_FAILED,
            errorCode: err.status
        });
    }
    yield put({
        type: TOGGLE_IS_FETCHING_FLAG_FOR_IDENTITY,
        payload: false

    });
}
export function* checkSecondaryUniqueIdentityVerifiedWatcher(action) {

    try {
        const response = yield call(uniqueIdentityApi.checkSecondaryUniqueIdentityVerifiedAPI, action);

        yield put({
            type: response.isPanValid
                ? CHECK_SECONDARY_UNIQUE_IDENTITY_VERIFIED_SUCCESS : CHECK_SECONDARY_UNIQUE_IDENTITY_VERIFIED_FAILED,
            payload: { data: response }

        });

    } catch (err) {

        yield put({
            type: CHECK_SECONDARY_UNIQUE_IDENTITY_VERIFICATION_API_FAILED,
            errorCode: err.status
        });
    }
    yield put({
        type: TOGGLE_IS_FETCHING_FLAG_FOR_SECONDARY_IDENTITY,
        payload: false

    });
}

export function* uniqueIdentityWatcher() {


    yield takeLatest(SUBMIT_PRIMARY_UNIQUE_IDENTITY, verifyPrimaryUniqueIdentityWatcher);
    yield takeLatest(SUBMIT_SECONDARY_UNIQUE_IDENTITY, verifySecondaryUniqueIdentityWatcher);
    yield takeLatest(GET_AADHAAR_REDIRECTION_URL, getAadhaarRedirectionURLWatcher);
    yield takeLatest(CHECK_PRIMARY_UNIQUE_IDENTITY_VERIFIED, checkPrimaryUniqueIdentityVerifiedWatcher);
    yield takeLatest(CHECK_SECONDARY_UNIQUE_IDENTITY_VERIFIED, checkSecondaryUniqueIdentityVerifiedWatcher);
}
