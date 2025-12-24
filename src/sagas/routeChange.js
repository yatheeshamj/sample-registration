



import { put, takeEvery, call, select } from 'redux-saga/effects';
import { ADMISSION_STEP_ROUTES } from '../config';
import * as admissionStepsSelector from "spotify-shared/selectors/admissionSteps"
const routeChangeEvent = "@@router/LOCATION_CHANGE";

function* onRouteChange(action) {
    let { location: { pathname } } = action.payload;
    let isValidateAccountComplete = yield select(admissionStepsSelector.isValidateAccountComplete);
    if (isValidateAccountComplete === false) {
        let isValidatingAccount = pathname.indexOf(ADMISSION_STEP_ROUTES.validateAccount) === 0;
        if (isValidatingAccount === false) {
            // redirect user
            window.location.href = window.location.origin + `${ADMISSION_STEP_ROUTES.validateAccount}`
        }
    }
}

export default function* wacther() {
    yield takeEvery(
        routeChangeEvent,
        onRouteChange
    );

}
