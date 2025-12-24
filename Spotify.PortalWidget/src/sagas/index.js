import { all } from 'redux-saga/effects';
import { sagas } from "spotify-shared";
import opportunitiesWidgetWacther from "./opportunitiesWidget"
import authWacther from "./auth"
import openBroswerLink from "spotify-shared-web/saga/openBroswerLink";

export default function* rootSaga() {
    yield all([
        ...sagas.default,
        opportunitiesWidgetWacther(),
        authWacther(),
        openBroswerLink()
    ]);
}
