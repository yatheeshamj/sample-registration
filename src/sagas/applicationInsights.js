import { takeLatest, takeEvery, put, call } from "redux-saga/effects";
import * as applicationInsightsActions from "spotify-shared/actionTypes/applicationInsights"
import { appInsights } from "../appInsights"



function* onTrackError(action) {

    try {

        appInsights.trackException({ exception: new Error(action.payload) })
    } catch (e) {
        console.log(e)
    }

}

function* onTrackEvent(action) {
    try {
        // sample object
        //{ name: 'Enroll Button Click ', properties: { productId } }
        appInsights.trackEvent(action.payload)
    } catch (e) {
        console.log(e)
    }
}


function* onTrackTrace(action) {

    try {

        appInsights.trackTrace({ message: action.payload })
    } catch (e) {
        console.log(e)
    }

}


export default function* Watcher() {


    yield takeEvery(applicationInsightsActions.APPLICATION_INSIGHTS_TRACK_EVENT, onTrackEvent);
    yield takeEvery(applicationInsightsActions.APPLICATION_INSIGHTS_TRACK_ERROR, onTrackError);
    yield takeEvery(applicationInsightsActions.APPLICATION_INSIGHTS_TRACK_TRACE, onTrackTrace);
}
