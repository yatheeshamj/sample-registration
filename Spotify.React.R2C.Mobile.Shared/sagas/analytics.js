//
import { takeLatest, takeEvery, put, call } from "redux-saga/effects";


function* pageview(action) {
    //console.log("pageview")
    //console.log(action)
    //console.log(action.payload.location.pathname + action.payload.location.search)
    //ReactGA.pageview(action.payload.location.pathname + action.payload.location.search);
}


function* modalview(action) {
    //console.log("modalview")
    //console.log(action)
    //ReactGA.modalview(modalName)
}

function* event(action) {
    //console.log("event")
    //console.log(action)
    // ReactGA.event({
    //     category: 'Promotion',
    //     action: 'Displayed Promotional Widget',
    //     label: 'Homepage Thing',
    //     nonInteraction: true
    //   });
}

export default function* todoWatcher() {
    yield takeEvery('@@router/LOCATION_CHANGE', pageview);
    yield takeEvery('ga.pageview', pageview);
    yield takeEvery('ga.event', event);
    yield takeEvery('ga.modalview', modalview);
}
