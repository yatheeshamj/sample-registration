import { takeLatest, put, call, select, all, take, takeEvery, cancel,delay } from "redux-saga/effects";
import * as Actions from "../actions/agreementTemplates"
import * as ActionType from "../actionTypes/agreementTemplates"
import * as agreementTemplatesApi from "../api/agreementTemplates"
import * as agentProfileSelector from "../selectors/agentProfile"
import * as opportunitiesSelector from "../selectors/opportunities"
import * as enrollmentStepsActions from "../actions/enrollmentSteps"
import * as identityVerificationActions from "../actions/identityVerification"
import * as photoVerificationActions from "../actions/photoId"
import { getIpAddress } from "../api/3rdPartyLinks";



function* onSearchTemplatesByClient(action) {

    try {

        const templateAgreements = yield call(agreementTemplatesApi.searchTemplatesByClient, action.payload);
        const signedEnrollmentAgreements = yield call(agreementTemplatesApi.retrieveEnrollmentAgreements, action.payload);

        let data = templateAgreements.map(x => ({
            ...x,
            isSigned: signedEnrollmentAgreements.find(y => y.name === x.friendlyName) != null
        }))
        yield put(Actions.SearchTemplatesByClientComplete(data));

    } catch (e) {

        yield put(Actions.SearchTemplatesByClientError(e));

    }
}

function* onRetrieveAgreementTemplateByType(action) {
    const agentProfile = yield select(agentProfileSelector.get);
    const aTypeProps = {
        agentId: agentProfile.agentId,
        enrollmentId: action.payload.enrollmentId,
        agreementType: action.payload.aggrement.agreementType
    };
    try {
       
        const data = yield call(agreementTemplatesApi.retrieveAgreementTemplateByType, aTypeProps);
        console.log(data)
        yield put(Actions.RetrieveAgreementTemplateByTypeComplete(data));

        if(data && data.muleSoftDocTransactionId!=null && data.muleSoftDocTransactionId!=""){
            yield put({
                type:ActionType.PollEnrollmentSignUrl,
                payload:{...aTypeProps,...data}
            })
        }    

       
    } catch (e) {

        yield put(Actions.RetrieveAgreementTemplateByTypeError(e));

    }
}

function* onSaveEnrollmentAgreement(action) {

    try {
        const agentProfile = yield select(agentProfileSelector.get);
        const props = {
            agentId: agentProfile.agentId,
            ...action.payload
        };
        const data = yield call(agreementTemplatesApi.saveEnrollmentAgreement, props);
        yield put(Actions.SaveEnrollmentAgreementComplete(data));

        // re-fetch list 
        let opportunity = yield select(opportunitiesSelector.getById, action.payload.opportunityId)
        const agreementTemplatePayload = {
            agentId: agentProfile.agentId,
            clientId: opportunity.clientCrmId,
            enrollmentId: action.payload.enrollmentId,
            opportunityId: action.payload.opportunityId
        }
        yield put(Actions.SearchTemplatesByClient(agreementTemplatePayload))

        
        // re query 
        let enrollmentProps = { agentId: agentProfile.agentId, enrollmentId: action.payload.enrollmentId };
        yield put(enrollmentStepsActions.fetchEnrollmentSteps(enrollmentProps));

        const IdentityStatusProps = {
            agentId: agentProfile.agentId,
            acpCrmId: agentProfile.contactId,
            enrollmentId: action.payload.enrollmentId
        };

		yield put(identityVerificationActions.checkIdentityStatus(IdentityStatusProps));
		/******************* SAT working ***************************/
		yield put(photoVerificationActions.photoIdStatus(IdentityStatusProps));
		/******************* SAT working ***************************/

    } catch (e) {

        yield put(Actions.SaveEnrollmentAgreementError(e));

    }
}

function* onRetrieveAgreementTemplateForJM(action) {
    const agentProfile = yield select(agentProfileSelector.get);
    const aTypeProps = {
        agentId: agentProfile.agentId,
        agreementType: 100000013,
        contactId:agentProfile.contactId
    };
    try {
        const data = yield call(agreementTemplatesApi.retrieveAgreementTemplateForJM, aTypeProps);
        yield put(Actions.RetrieveAgreementTemplateByTypeComplete(data));
    } catch (e) {

        yield put(Actions.RetrieveAgreementTemplateByTypeError(e));

    }
}

function * onSaveConsentAgreement(action){
    try {
        const agentProfile = yield select(agentProfileSelector.get);
        const ipAddress=yield call(getIpAddress,{})
        console.log(ipAddress,"inside saga")
        const props = {
            agentId: agentProfile.agentId,
            ...action.payload,
            ipAddress:ipAddress.ip
        };
        const data = yield call(agreementTemplatesApi.saveConsentAgreement, props);
        yield put({type:ActionType.SaveConsentAgreementComplete,payload:{}})
       

    } catch (e) {

        yield put(Actions.SaveEnrollmentAgreementError(e));

    }
}

function* onPollSignUrl(action){
    try {
        yield delay(5000)
        const agentProfile = yield select(agentProfileSelector.get);
        action.payload = {
            agentId: agentProfile.agentId,
            ...action.payload
        };
        // alert("making sagas")
        const data=yield call(agreementTemplatesApi.getSignUrl,action.payload)
        console.log(data,"agreementtemplate saga")
        yield put({
            type:ActionType.PollEnrollmentSignUrlSuccess,
            payload:data
        })

        if(data && data.muleSoftDocSignURL!=null && data.muleSoftDocSignURL!=''){
            return;
        }
        yield put({
            type:ActionType.PollEnrollmentSignUrl,
            payload:action.payload
        })
        
    } catch (err) {
        yield put({
            type:ActionType.PollEnrollmentSignUrlFail,
            payload:{error:err}
        })
    }
}

export default function* watcher() {
    yield takeLatest(ActionType.SearchTemplatesByClient, onSearchTemplatesByClient);
    yield takeLatest(ActionType.RetrieveAgreementTemplateByType, onRetrieveAgreementTemplateByType);
    yield takeLatest(ActionType.SaveEnrollmentAgreement, onSaveEnrollmentAgreement);
    yield takeLatest(ActionType.PollEnrollmentSignUrl,onPollSignUrl)

    yield takeLatest(ActionType.SaveConsentAgreement, onSaveConsentAgreement);
    yield takeLatest(ActionType.RetrieveAgrrementTemplateForJM, onRetrieveAgreementTemplateForJM);
}
