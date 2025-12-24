import { put, takeLatest, call, select } from "redux-saga/effects";
import { registrationApi } from "./api";
import history from "../history";

import {
  CREATE_AGENT_PROFILE,
  CREATE_AGENT_PROFILE_COMPLETED,
  CREATE_AGENT_PROFILE_FAILED,
  GET_AGENT_PROFILE,
  GET_AGENT_PROFILE_COMPLETED,
  GET_AGENT_PROFILE_FAILED,
  GET_USER_COUNTRY,
  GET_USER_COUNTRY_COMPLETED,
  GET_USER_COUNTRY_FAILED,
  GET_COUNTRIES,
  GET_COUNTRIES_COMPLETED,
  GET_COUNTRIES_FAILED,
  GET_STATES,
  GET_STATES_COMPLETED,
  GET_STATES_FAILED,
  GET_PROVINCES,
  GET_PROVINCES_COMPLETED,
  GET_PROVINCES_FAILED,
  REGISTER_REDIRECT,
  GET_REFERRAL_USER,
  GET_REFERRAL_USER_SUCCESS,
  GET_REFERRAL_USER_FAILURE,
  PUT_REFERRAL_USER,
  PUT_JM_USER_NAME_DOB,
  GET_PARISHES,
  GET_PARISHES_COMPLETED,
  GET_PARISHES_FAILED,
  PUT_PARISH_DATA,
  PUT_PARISH_DATA_FAILURE,
  PUT_PARISH_DATA_COMPLETED,
  CHECK_IF_JM_CONSENT_SIGNED,
  CHECK_IF_JM_CONSENT_SIGNED_SUCCESS,
  DECLINE_JM_CONSENT,
  UPDATE_LANGUAGE_PREFERENCE
} from "../types/registrationTypes";

import { GET_ADMISSION_STEP_INSTANCES } from "../types/admissionStepTypes";

import { GET_AUTH_TOKEN } from "../types/authTypes";
import { checkifJMConsentSigned, getAgentProfile } from "../actions/registrationActions";
import { COUNTRY_IDS } from "../constants";
import * as agentProfileSelector from "spotify-shared/selectors/agentProfile"
import { getIpAddress } from "spotify-shared/api/3rdPartyLinks"
import { logoutRedirect } from "../actions/loginActions";



export function* registerRedirect(action) {
  var utmCode = action.payload.code;
  var country = action.payload.country;
  var referral = action.payload.referral;
  var params = {
    acr_values: encodeURIComponent(
      `register:true;utm_code:${utmCode};country:${country};referral:${referral}`
    ).toLowerCase(),
  };
  const response = yield call(registrationApi.registerRedirect, params);
}

export function* createAgentProfileRequest(action) {
  try {
    const response = yield call(registrationApi.createAgentProfile, action);
    yield put({
      type: CREATE_AGENT_PROFILE_COMPLETED,
      payload: { data: response },
    });
    yield put({ type: GET_AUTH_TOKEN, payload: action.payload });
  } catch (err) {
    yield put({ type: CREATE_AGENT_PROFILE_FAILED, error: err });
  }
}

export function* getUserProfileRequest(action) {
  try {
    const getToken = (state) => state.auth.authToken;

    const token = yield select(getToken);
    action.auth_token = token;

    const response = yield call(registrationApi.getUserProfile, action);

    yield put({
      type: GET_AGENT_PROFILE_COMPLETED,
      payload: { data: response },
    });

    // history.push('/');
  } catch (err) {
    yield put({ type: GET_AGENT_PROFILE_FAILED, error: err });
  }
}

export function* getUserCountryRequest(action) {
  try {
    let response = yield call(registrationApi.getUserCountry, action);
    response = response ? response.code : {};
    // map GB to UK
    if (response.code === "GB") {
      response.code = "UK";
    }
    if (
      response.code !== "US" &&
      response.code !== "CA" &&
      response.code !== "UK"
    ) {
      response = {
        code: "US",
        country: "United States",
        isCountryFoundByIP: false,
      };
    } else {
      response.isCountryFoundByIP = true;
    }
    yield put({
      type: GET_USER_COUNTRY_COMPLETED,
      payload: { data: response },
    });
  } catch (err) {
    yield put({ type: GET_USER_COUNTRY_FAILED, error: err });
  }
}

export function* getCountriesRequest(action) {
  try {
    const response = yield call(registrationApi.getCountries, action);
    yield put({
      type: GET_COUNTRIES_COMPLETED,
      payload: { data: response.reverse() },
    });
  } catch (err) {
    yield put({ type: GET_COUNTRIES_FAILED, error: err });
  }
}

export function* getStatesRequest(action) {
  try {
    const agent = yield select(agentProfileSelector.get)
    action.payload.countryId = agent.countryId
    const response = yield call(registrationApi.getProvinces, action);
    yield put({ type: GET_PROVINCES_COMPLETED, payload: { data: response } });
  } catch (err) {
    yield put({ type: GET_PROVINCES_FAILED, error: err });
  }
}

export function* getProvincesRequest(action) {
  try {
    const agent = yield select(agentProfileSelector.get)
    action.payload.countryId = agent.countryId
    const response = yield call(registrationApi.getStates, action);
    yield put({ type: GET_STATES_COMPLETED, payload: { data: response } });
  } catch (err) {
    yield put({ type: GET_STATES_FAILED, error: err });
  }
}

export function* getReferralUserRequest(action) {
  try {
    const response = yield call(registrationApi.getReferralUser, action);
    yield put({ type: GET_REFERRAL_USER_SUCCESS, payload: { data: response } });
    yield put({
      type: GET_ADMISSION_STEP_INSTANCES,
      payload: {},
    });
  } catch (err) {
    yield put({ type: GET_REFERRAL_USER_FAILURE, error: err });
  }
}

export function* putReferralUser(action) {
  try {
    yield call(registrationApi.updateReferralUser, action);
    //yield put(register)
  } catch (err) { }
}

export function* putJMUserNameDOB(action) {
  try {
    yield call(registrationApi.updateJMNameAndDOB, action.payload)
    yield put(getAgentProfile(action.payload.userId));

  }

  catch (err) {
    alert(err)
  }
}

export function* getParishList(action) {
  try {

    action.payload = {
      countryId: COUNTRY_IDS.JM
    }
    const parishList = yield call(registrationApi.getParishes, action)
    yield put({ type: GET_PARISHES_COMPLETED, payload: { data: parishList } });

  }

  catch (err) {
    yield put({ type: GET_PARISHES_FAILED, error: err });
  }
}


export function* putParishData(action) {
  try {
    //const ipData = yield call(_3rdPartyLinksApi.getIpAddress, {});
    yield call(registrationApi.putParishData, action)
    yield put(getAgentProfile(action.payload.userId));

  }

  catch (err) {
    yield put({ type: PUT_PARISH_DATA_FAILURE, error: err });
  }
}





export function* onCheckifJMConsentSigned(action) {
  try {
    const agentProfile = yield select(agentProfileSelector.get, {})
    const payload = { ...action.payload, ...agentProfile }
    action.payload = payload
    const data = yield call(registrationApi.checkifConsentSigned, action)

    yield put({ type: CHECK_IF_JM_CONSENT_SIGNED_SUCCESS, payload: data })

  } catch (error) {

  }
}


export function* onDeclineJmConsent(action) {
  try {
    const agentProfile = yield select(agentProfileSelector.get, {})
    action.payload = { ...action.payload, ...agentProfile }

    const data = yield call(registrationApi.declineJmConsent, action)

    yield put(logoutRedirect())

  } catch (error) {

  }
}

export function* updateLanguagePreference(action) {
  try {
    const response = yield call(registrationApi.updateUsersLanguagePreference, action)
  } catch (error) { }
}

export function* registrationWatcher() {
  yield takeLatest(REGISTER_REDIRECT, registerRedirect);
  yield takeLatest(CREATE_AGENT_PROFILE, createAgentProfileRequest);
  yield takeLatest(GET_AGENT_PROFILE, getUserProfileRequest);
  yield takeLatest(GET_USER_COUNTRY, getUserCountryRequest);
  yield takeLatest(GET_COUNTRIES, getCountriesRequest);
  yield takeLatest(GET_STATES, getStatesRequest);
  yield takeLatest(GET_PROVINCES, getProvincesRequest);
  yield takeLatest(GET_REFERRAL_USER, getReferralUserRequest);
  yield takeLatest(PUT_REFERRAL_USER, putReferralUser);
  yield takeLatest(PUT_JM_USER_NAME_DOB, putJMUserNameDOB);
  yield takeLatest(GET_PARISHES, getParishList);
  yield takeLatest(PUT_PARISH_DATA, putParishData);

  yield takeLatest(CHECK_IF_JM_CONSENT_SIGNED, onCheckifJMConsentSigned);
  yield takeLatest(DECLINE_JM_CONSENT, onDeclineJmConsent)

  yield takeLatest(UPDATE_LANGUAGE_PREFERENCE, updateLanguagePreference)

}
