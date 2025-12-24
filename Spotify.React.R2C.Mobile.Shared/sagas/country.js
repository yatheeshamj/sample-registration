import { put, takeLatest, call, select } from 'redux-saga/effects';
import { GET_USER_COUNTRY, GET_USER_COUNTRY_COMPLETED, GET_USER_COUNTRY_FAILED } from "../actionTypes/country"
import { getUserCountry} from "../api/country"

export function* getUserCountryRequest(action) {
    try {
        let response = yield call(getUserCountry, action);
        console.log('shows where IP was from', response);
        // map GB to UK
        if (response.code === 'GB') {
            response.code = 'UK';
        }
        if (
            response.code !== 'US' &&
            response.code !== 'CA' &&
            response.code !== 'UK'
        ) {
            response = {
                code: 'US',
                country: 'United States',
                isCountryFoundByIP: false
            };
        } else {
            response.isCountryFoundByIP = true;
        }
        yield put({
            type: GET_USER_COUNTRY_COMPLETED,
            payload: { data: response }
        });
    } catch (err) {
        yield put({ type: GET_USER_COUNTRY_FAILED, error: err });
    }
}
export default function* countryWatcher() {
    yield takeLatest(GET_USER_COUNTRY, getUserCountryRequest);
}

