import { put, takeLatest, call } from "redux-saga/effects";
import AuthService from "../services/authService";
import { setToken } from "../actions/loginActions";
import { registrationApi } from "./api";
import {
  GET_AGENT_PROFILE_COMPLETED,
  GET_LEGACY_ID_COMPLETE,
} from "../types/registrationTypes";
import {
  SET_TOKEN,
  EnsureIsAuthenticatedWithAgentProfile,
  UnauthorizedResponseReceived,
} from "../types/authTypes";

import {
  SET_USER_DEVICE,
  SET_COUNTRY_CONFIGURATIONS
} from "../types/appTypes"


import { loginRedirect, logoutRedirect } from "../actions/loginActions";
import { setAuthorizationHeader } from "spotify-shared/api/helpers/request";
import { getUserCountry } from "spotify-shared/actions/country";
function* onSetToken(action) {
  setAuthorizationHeader(action.payload);
}

function* onEnsureIsAuthenticatedWithAgentProfile(action) {
  let authService = new AuthService();
  const user = yield authService.getUser();

  if (!user || (user && user.expired === true)) {
    yield put(loginRedirect());
  }
  if (user && user.expired === false) {
    yield setToken(user.access_token);
    yield put(getUserCountry({ considerIp: true }));
    const profileResponse = yield call(registrationApi.getUserProfile, {
      auth_token: user.access_token,
      payload: user.profile.sub,
    });

    const configurations = yield import('../resources/config/' + profileResponse.countryCode + '-config.json')
    // const configurations = yield import('../resources/config/' + "IN" + '-config.json')
    yield put({
      type: SET_COUNTRY_CONFIGURATIONS,
      payload: [profileResponse.countryCode, configurations]
    });


    yield put({
      type: GET_AGENT_PROFILE_COMPLETED,
      payload: { data: profileResponse },
    });

    if (profileResponse !== null) {
      window.agentId = profileResponse.agentId;
      window.countryCode = profileResponse.countryCode;
    }

    const legacyUserID = yield call(registrationApi.getLegacyUserId, {
      payload: {
        auth_token: user.access_token,
        agentId: profileResponse.agentId,
      },
    });
    yield put({
      type: GET_LEGACY_ID_COMPLETE,
      payload: { data: legacyUserID },
    });
  }
}

function* onUnauthorizedResponseReceived(action) {
  yield put(logoutRedirect());
}

export function* authWatcher() {
  yield takeLatest(SET_TOKEN, onSetToken);
  yield takeLatest(
    EnsureIsAuthenticatedWithAgentProfile,
    onEnsureIsAuthenticatedWithAgentProfile
  );
  yield takeLatest(
    UnauthorizedResponseReceived,
    onUnauthorizedResponseReceived
  );
}
