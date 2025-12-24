import { put, takeLatest, call, select, delay } from 'redux-saga/effects';
import { legalDocsApi } from './api';

import {
    GET_ADMISSION_STEP_INSTANCES,
    GET_ADMISSION_STEP_INSTANCES_COMPLETED,
    GET_ADMISSION_STEP_INSTANCES_FAILED
} from '../types/admissionStepTypes';

import {
    CheckSignStatus,
    CheckSignStatusComplete,
    CheckSignStatusError,
    GET_AGREEMENT_TEMPLATES,
    GET_AGREEMENT_TEMPLATES_COMPLETED,
    GET_AGREEMENT_TEMPLATES_FAILED,
    GET_AGREEMENT_TEMPLATE_CONTENT,
    GET_AGREEMENT_TEMPLATE_CONTENT_COMPLETED,
    GET_AGREEMENT_TEMPLATE_CONTENT_FAILED,
    GET_SIGN_URL,
    GET_SIGN_URL_FAIL,
    GET_SIGN_URL_SUCCESS,
    SIGN_AGREEMENT,
    SIGN_AGREEMENT_COMPLETED,
    SIGN_AGREEMENT_FAILED,
    CLEAR_TRANSACTION_ID
} from '../types/legalDocsTypes';

import {
    // SHOW_AGREEMENT_CONTENT,
    HIDE_AGREEMENT_CONTENT
} from '../types/agentTypeTypes';
import * as agentProfileSelector from "spotify-shared/selectors/agentProfile"
import { CongaAgreementStatus, errorMessages } from '../constants';



export function* getAgreementTemplatesRequest(action) {
    try {
        //alert("Get Agreement"+action.payload.path);

        const agentProfile = yield select(agentProfileSelector.get, {})
        action.payload = {
            ...action.payload,
            contactId: agentProfile.contactId
        }


        const response = yield call(legalDocsApi.getAgreementTemplates, action);
        // const response={
        //     muleSoftDocTransactionId:"a1mWK0000009ogjYAA",
        //     muleSoftDocSignURL:"",
        //     muleSoftDocStatus:"Pending"
        // }

        yield put({
            type: GET_AGREEMENT_TEMPLATES_COMPLETED,
            payload: { data: response }
        });
        //testing
        //response.muleSoftDocTransactionId=null;
        if (response && response.muleSoftDocTransactionId != "" && response.muleSoftDocTransactionId != null) {
            yield put({
                type: GET_SIGN_URL,
                payload: { ...response }
            })
        }
        else {
            yield put({
                type:GET_AGREEMENT_TEMPLATES_FAILED,
                error: errorMessages.IntiateTransactionError
            })


            // //show message in UI
            // yield delay(5000)

            // //trigger to clear errored transaction
            // yield 

        }


    } catch (err) {
        //alert("Failed");
        yield put({
            type: GET_AGREEMENT_TEMPLATES_FAILED,
            error: err
        });
    }
}

export function* getAgreementTemplateContentRequest(action) {
    try {
        const response = yield call(
            legalDocsApi.getAgreementTemplateContent,
            action
        );
        // yield put({
        //   type: SHOW_AGREEMENT_CONTENT,
        //   payload: {}
        // });
        yield put({
            type: GET_AGREEMENT_TEMPLATE_CONTENT_COMPLETED,
            payload: { data: response }
        });
    } catch (err) {
        yield put({
            type: GET_AGREEMENT_TEMPLATE_CONTENT_FAILED,
            error: err
        });
    }
}

export function* signAgreementRequest(action) {
    try {
        const response = yield call(legalDocsApi.signAgreement, action);
        yield put({
            type: SIGN_AGREEMENT_COMPLETED,
            payload: { data: response }
        });
        yield put({
            type: HIDE_AGREEMENT_CONTENT,
            payload: {}
        });
        yield put({
            type: GET_ADMISSION_STEP_INSTANCES,
            payload: {}
        });
    } catch (err) {
        yield put({
            type: SIGN_AGREEMENT_FAILED,
            error: err
        });
    }
}

export function* onGetSignUrl(action) {
    const agentProfile = yield select(agentProfileSelector.get, {})
    try {
        yield delay(5000) //wait for 5s before starting another api call
        action.payload = { ...action.payload, agentId: agentProfile.agentId }
        const response = yield call(legalDocsApi.postSignUrl, action)

        console.log("Polling started")
        //check if the agreement with least sort order is ready to be signed
        let atleastOneAgreementIsReady = false
        let oneavailable = false
        let isAllAgreementSigned = true
        let checkifError = false
        //sort it by sortOrder
        response.sort((a, b) => a.sortOrder - b.sortOrder)
        for (let i = 0; i < response.length; i++) {
            if (response[i].transactionStatus == CongaAgreementStatus.SignaturePending && (!oneavailable) && (!checkifError)) {
                // atleastOneAgreementIsReady=true;
                if (response[i].signUrl && response[i].signUrl != "") {
                    response[i].isAvailable = true
                    oneavailable = true
                }
                else {
                    response[i].isAvailable = false
                    checkifError = true
                }

            }
            else {
                //agreement with sort order is not yet ready so need to poll again
                response[i].isAvailable = false

            }
        }

        for (let i = 0; i < response.length; i++) {
            if (response[i].transactionStatus == CongaAgreementStatus.SignaturePending) {
                atleastOneAgreementIsReady = true;
                break;
            }
            else if (response[i].transactionStatus == CongaAgreementStatus.New) {
                //agreement with sort order is not yet ready so need to poll again
                isAllAgreementSigned = false
                break;
            }
            else if (response[i].transactionStatus == CongaAgreementStatus.MergeError || response[i].transactionStatus == CongaAgreementStatus.SignatureError) {
                checkifError = true;
                break;
            }
        }
        yield put({
            type: GET_SIGN_URL_SUCCESS,
            payload: response
        })
        console.log("after polling", atleastOneAgreementIsReady, response, checkifError)
        if (checkifError) {
            yield put({
                type: GET_SIGN_URL_FAIL,
                error: errorMessages.CongaAgreementError
            })
            return
        }
        let checkIfAllisSigned = response.every((e) => e.transactionStatus == CongaAgreementStatus.Completed)
        if (!atleastOneAgreementIsReady && !checkIfAllisSigned) {

            yield put({
                type: GET_SIGN_URL,
                payload: action.payload
            })
            return
        }

        if (checkIfAllisSigned) {
            yield put({
                type: GET_ADMISSION_STEP_INSTANCES,
                payload: {}
            });
        }

    } catch (err) {
        yield put({
            type: GET_SIGN_URL_FAIL,
            error: err
        })
    }
}


export function* onCheckStatus(action) {
    const agentProfile = yield select(agentProfileSelector.get, {})
    try {
        //yield delay(5000)
        action.payload = { ...action.payload, agentId: agentProfile.agentId }
        const response = yield call(legalDocsApi.getSignUrl, action)

        yield put({
            type: CheckSignStatusComplete,
            payload: response
        })
        if (response && response.muleSoftDocStatus != null && (response.muleSoftDocStatus == CongaAgreementStatus.Completed || response.muleSoftDocStatus == CongaAgreementStatus.SignaturePending)) {
            yield put({
                type: GET_ADMISSION_STEP_INSTANCES,
                payload: {}
            });
            return;
        }


        // yield put({
        //     type:CheckSignStatus,
        //     payload:action.payload
        // })
    } catch (error) {

    }
}

export function* onClearTransactionId(action){
    try {
        const agentProfile = yield select(agentProfileSelector.get, {})
        action.payload={
            ...action.payload,
            agentId:agentProfile.agentId
        }

        const isCleared=yield call(legalDocsApi.putTransactionId,action)

        if(isCleared){
            //intiate new group transaction
            yield put({
                type:GET_AGREEMENT_TEMPLATES,
                payload:{...action.payload}
            })
            return;
        }
        yield put({
            type: GET_SIGN_URL_FAIL,
            error: errorMessages.ClearTransactionIdError
        })
        
    } catch (error) {
        yield put({
            type: GET_SIGN_URL_FAIL,
            error: errorMessages.ClearTransactionIdError
        })
    }
}
export function* legalDocsWatcher() {
    yield takeLatest(GET_AGREEMENT_TEMPLATES, getAgreementTemplatesRequest);
    yield takeLatest(
        GET_AGREEMENT_TEMPLATE_CONTENT,
        getAgreementTemplateContentRequest
    );
    yield takeLatest(SIGN_AGREEMENT, signAgreementRequest);
    yield takeLatest(GET_SIGN_URL, onGetSignUrl)
    yield takeLatest(CheckSignStatus, onCheckStatus)
    yield takeLatest(CLEAR_TRANSACTION_ID,onClearTransactionId)

}
