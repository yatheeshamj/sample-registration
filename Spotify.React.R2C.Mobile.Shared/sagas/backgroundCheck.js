import { takeLatest, put, call, select, all, take, takeEvery, cancel } from "redux-saga/effects";
import * as Actions from "../actions/backgroundCheck"
import * as ActionType from "../actionTypes/backgroundCheck"
import * as agentProfileSelector from "../selectors/agentProfile"
import * as opportunitiesSelector from "../selectors/opportunities"
import * as enrollmentStepsActions from "../actions/enrollmentSteps"
import * as backgroundCheckApi from "../api/backgroundCheck"
import * as _3rdPartyLinksActions from "../actions/3rdPartyLinks"
import { SpringVerifyBGCOrderStatus } from '../../src/constants';

function* onSubmitUKOrderNumber(action) {
    try {
        const agentProfile = yield select(agentProfileSelector.get);
        const props = {
            agentId: agentProfile.agentId,
            opportunityId: action.payload.opportunityId,
            orderNumber: action.payload.orderNumber
        };
        const data = yield call(backgroundCheckApi.submitUK, props);
        yield put(Actions.submitUKOrderNumberComplete(data))

        // re query 
        let enrollmentProps = { agentId: agentProfile.agentId, enrollmentId: action.payload.enrollmentId };
        yield put(enrollmentStepsActions.fetchEnrollmentSteps(enrollmentProps));

    } catch (e) {
        if (e.data && e.data.message)
            alert(e.data.message)
        window.console.log(e)
        yield put(Actions.submitUKOrderNumberError(e))

    }
}

function* onSubmitJMOrderNumber(action) {
    try {
        const agentProfile = yield select(agentProfileSelector.get);
        const props = {
            agentId: agentProfile.agentId,
            opportunityId: action.payload.opportunityId,
            orderNumber: action.payload.orderNumber,
            countryId: agentProfile.countryId
        };

        const data = yield call(backgroundCheckApi.submitCountry, props);
        if (data && data.orderLink) {
            window.open(data.orderLink, '_blank').focus()
        }
        yield put(Actions.submitCountryOrderNumberComplete(data))

        // re query 
        let enrollmentProps = { agentId: agentProfile.agentId, enrollmentId: action.payload.enrollmentId };
        yield put(enrollmentStepsActions.fetchEnrollmentSteps(enrollmentProps));

    } catch (e) {
        if (e.data && e.data.message)
            alert(e.data.message)
        window.console.log(e)
        yield put(Actions.submitCountryOrderNumberError(e))

    }
}

function* onGenerateUSLink(action) {

    try {
        const agentProfile = yield select(agentProfileSelector.get);
        const props = {
            agentId: agentProfile.agentId,
            opportunityId: action.payload.opportunityId
        };
        const data = yield call(backgroundCheckApi.generateUSLink, props);

        yield put(Actions.generateUSLinkComplete(data))

        let url = data.orderLink;
        if (url) {
            yield put(_3rdPartyLinksActions.openBroswerLinkNewTab(url))
            window.location.reload();
            // re query 
            let enrollmentProps = { agentId: agentProfile.agentId, enrollmentId: action.payload.enrollmentId };
            yield put(enrollmentStepsActions.fetchEnrollmentSteps(enrollmentProps));


        } else {
            alert("Error while fetching BGC verification. This may be due to incorrect package selection. Please contact your system administrator")
        }
    } catch (e) {
        if (e.data && e.data.message)
            alert(e.data.message)
        window.console.log(e)
        yield put(Actions.generateUSLinkError(e))

    }
}



function* onGetBgcOrderId(action) {
    try {
        const agentProfile = yield select(agentProfileSelector.get);
        const props = {
            agentId: agentProfile.contactId,
            opportunityId: action.payload.opportunityId
        };
        const data = yield call(backgroundCheckApi.getBGCOrderId, props);


        if (data.status === "InProgress") {
            let url = data.orderLink;
            if (url && data.orderStatus !== "Complete") {
                yield put(_3rdPartyLinksActions.openBroswerLinkNewTab(url))
                window.location.reload();
                let enrollmentProps = { agentId: agentProfile.agentId, enrollmentId: action.payload.enrollmentId };
                yield put(enrollmentStepsActions.fetchEnrollmentSteps(enrollmentProps));
            }
        }
        else if (data.orderStatus) {
            yield put(Actions.getBgcOrderIdSuccess(data))
        }
        else {
            alert("Error while fetching BGC verification. This may be due to incorrect package selection. Please contact your system administrator")
        }

    } catch (e) {
        if (e.data && e.data.message)
            alert(e.data.message)
        window.console.log(e)
        yield put(Actions.getBgcOrderIdFailure(e))

    }
}


function* onGetStatus(action) {
    try {

        const data = yield call(backgroundCheckApi.getStatus, action.payload);

        yield put(Actions.getStatusComplete(data))


    } catch (e) {

        yield put(Actions.getStatusError(e))

    }
}

export default function* watcher() {
    yield takeLatest(ActionType.submit_BACKGROUND_CHECK_UK_OrderNumber, onSubmitUKOrderNumber);
    yield takeLatest(ActionType.submit_BACKGROUND_CHECK_JM_OrderNumber, onSubmitJMOrderNumber)
    yield takeLatest(ActionType.generate_BACKGROUND_CHECK_US_Link, onGenerateUSLink);
    yield takeLatest(ActionType.BACKGROUND_CHECK_GET_STATUS, onGetStatus);
    yield takeLatest(ActionType.GET_BGC_ORDER_ID, onGetBgcOrderId)
}


