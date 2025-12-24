import { all } from 'redux-saga/effects';
import { registrationWatcher } from './registrationWatcher';
import { admissionStepWatcher } from './admissionStepWatcher';
import { loginWatcher } from './loginWatcher';
import { authWatcher } from "./authWatcher";
import { validateAccountWatcher } from './validateAccountWatcher';
import { agentTypeWatcher } from './agentTypeWatcher';
import { legalDocsWatcher } from './legalDocsWatcher';
import { uniqueIdentityWatcher } from './uniqueIdentityWatcher';
import applicationInsightsWatcher from './applicationInsights';
import routeChangeWatcher from './routeChange';
import { sagas } from "spotify-shared";
import openBroswerLink from "spotify-shared-web/saga/openBroswerLink";
export default function* rootSaga() {
    yield all([
        authWatcher(),
        registrationWatcher(),
        admissionStepWatcher(),
        loginWatcher(),
        validateAccountWatcher(),
        agentTypeWatcher(),
        uniqueIdentityWatcher(),
        legalDocsWatcher(),
        applicationInsightsWatcher(),
        ...sagas.default,
        openBroswerLink(),
        routeChangeWatcher()
    ]);
}
