
import { takeLatest, put, call, select, all, take, takeEvery, cancel, delay } from "redux-saga/effects";
import * as ActionType from "../actionTypes/photoId"
import * as Actions from "../actions/photoId"
import * as Selectors from "../selectors/photoId"
import * as photoIdApi from "../api/photoId"
import * as AgentSelectors from "../selectors/agentProfile"
import { GlobalParameterTypes, PhotoIdStatus } from "../constants"
import * as enrollmentStepsApi from "../api/enrollmentSteps"
import * as enrollmentStepsActions from "../actions/enrollmentSteps"
import { globalParameters } from "../actions";

let firstfewTimes=6
function* onInitialisePhotoIdQRCode(action) {

    try {

        let agentProfile = yield select(AgentSelectors.get);
        let acpcrmid = agentProfile.contactId;
        let agentId = agentProfile.agentId;
        let payload = {
            ...action.payload
            , agentId
            , acpcrmid
            , countryId: agentProfile.countryId
        }

        const mediaData = yield call(photoIdApi.getMedia, payload);
		yield put(Actions.PhotoIdMediaComplete(mediaData));

		const data = yield call(photoIdApi.initialisePhotoIdQRCode, payload);

		yield put(Actions.initialisePhotoIdQRCodeComplete(data));


        yield put(Actions.photoIdStatus(action.payload));

    } catch (e) {

        yield put(Actions.initialisePhotoIdQRCodeError(e));

    }
}

function* onPhotoIdStatus(action) {
    try {

        let MAX_PULL_COUNT = 10000;
        let DELAY_IN_SEC = 15000;
        let FIRST_6_INTERVAL=5000;
        /*
          let statusPullCount = yield select(Selectors.statusPullCount);
          if (statusPullCount == MAX_PULL_COUNT) {
            return yield put(Actions.photoIdStatusComplete(data));
        }
        */
        let agentProfile = yield select(AgentSelectors.get);
        let photoIdHasclicked = yield select(Selectors.getHasClickedUrl);
        let acpcrmid = agentProfile.contactId;
        let agentId = agentProfile.agentId;
        let payload = {
            ...action.payload
            , agentId
            , acpcrmid
        }
        if (firstfewTimes>0){
            yield delay(FIRST_6_INTERVAL)
        }
        else{
            yield delay(DELAY_IN_SEC)
        }
        ; // wait and kick off new request
        
        if(photoIdHasclicked){
            firstfewTimes=firstfewTimes-1
            const data = yield call(photoIdApi.photoIdStatus, payload);
            yield put(Actions.photoIdStatusComplete(data));

            if (data.overallStatus == PhotoIdStatus.Pass || data.overallStatus == PhotoIdStatus.Fail || (!data.inProgress)) {

                return;
            }
        }

		/*if (data.overallStatus == PhotoIdStatus.Fail) {
			const data = yield call(enrollmentStepsApi.getByIdForAgent, action.payload);
			yield put(enrollmentStepsActions.fetchEnrollmentStepsComplete(data));
			return;
		}*/




        let continuePulling = yield select(Selectors.continuePulling);
        if (continuePulling == false) {
            return;
        } else {

            yield put(Actions.photoIdStatus(action.payload));
        }


    } catch (e) {

        yield put(Actions.photoIdStatusError(e));

    }
}

function* OnPhotoIdStatusSingle(action) {
    try {


        let agentProfile = yield select(AgentSelectors.get);
        let acpcrmid = agentProfile.contactId;
        let agentId = agentProfile.agentId;
        let payload = {
            ...action.payload
            , agentId
            , acpcrmid
        }

        const data = yield call(photoIdApi.photoIdStatus, payload);
        yield put(Actions.photoIdStatusComplete(data));


        if ((data.pending === true || data.inProgress === true) && data.overallStatus == PhotoIdStatus.Incomplete) {
            yield put(Actions.photoIdStatus(action.payload));
        }

    } catch (e) {

        yield put(Actions.photoIdStatusError(e));

    }
}

function* OnphotoIdResponse(action) {

    try {

        const data = yield call(photoIdApi.photoIdResponse, action.payload);
        yield put(Actions.photoIdResponseComplete(data));


    } catch (e) {

        yield put(Actions.photoIdResponseError(e));

    }

}

export default function* watcher() {
    yield takeLatest(ActionType.Initialise_PhotoId_QRCode, onInitialisePhotoIdQRCode);
    yield takeLatest(ActionType.PhotoId_QRCode_Status, onPhotoIdStatus);
    yield takeLatest(ActionType.PhotoId_QRCode_Status_Single, OnPhotoIdStatusSingle);
    yield takeLatest(ActionType.PhotoId_Callback_Response, OnphotoIdResponse);


}
