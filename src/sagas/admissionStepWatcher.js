import { put, takeLatest, call, select } from "redux-saga/effects";
import { admissionStepApi } from "./api";
import store from "../store";

import {
  GET_ADMISSION_STEP_INSTANCES,
  GET_ADMISSION_STEP_INSTANCES_COMPLETED,
  GET_ADMISSION_STEP_INSTANCES_FAILED,
  SET_SHOW_AGENT_TYPE_COMPLETE,
} from "../types/admissionStepTypes";
import { setShowAgentTypeComplete } from "../actions/admissionStepActions";
import { ADMISSION_STEP_ROUTES } from "../config";
import {
  GET_AGENT_PROFILE_COMPLETED,
  REFERRAL_USER_SUCCESS,
} from "../types/registrationTypes";
import * as admissionStepsSelector from "spotify-shared/selectors/admissionSteps";

function* onGetAdmissionSTepsCompleted(action) {
  let {
    location: { pathname },
  } = window; // check current url
  let isValidateAccountComplete = yield select(
    admissionStepsSelector.isValidateAccountComplete
  );

  if (isValidateAccountComplete === false) {
    let isValidatingAccount =
      pathname.indexOf(ADMISSION_STEP_ROUTES.validateAccount) === 0;
    if (isValidatingAccount === false) {
      // redirect user
      window.location.href =
        window.location.origin + `${ADMISSION_STEP_ROUTES.validateAccount}`;
      return;
    }
  }
}

function* onSetShowAGentComplete(action) {
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  let value = action.payload;

  if (value === true) {
    yield delay(5000);
    yield put(setShowAgentTypeComplete(false));
  }
}

export function* getAdmissionStepInstancesRequest(action) {
  let currentState_isAgentTypeComplete = yield select(
    admissionStepsSelector.isAgentTypeComplete
  );
  const agentId = store.getState().agentProfile.agentId;
  action.payload = agentId;

  try {
    const response = yield call(
      admissionStepApi.getAdmissionStepInstances,
      action
    );

    if (currentState_isAgentTypeComplete === false) {
      let furtureState_isAgentTypeComplete =
        admissionStepsSelector.isAgentTypeComplete({
          admissionSteps: { steps: response },
        });

      if (furtureState_isAgentTypeComplete) {
        //yield put(setShowAgentTypeComplete(true));
      }
    }
    if ((!response) ||(response && response.length==0)){
      yield put({
        type: GET_ADMISSION_STEP_INSTANCES_FAILED,
        error: "Empty ASI",
      });
    }
    yield put({
      type: GET_ADMISSION_STEP_INSTANCES_COMPLETED,
      payload: { data: response },
    });
    // yield put({ type: REFERRAL_USER, payload: { data: response } });
  } catch (err) {
    yield put({
      type: GET_ADMISSION_STEP_INSTANCES_FAILED,
      error: err,
    });
  }
}

export function* admissionStepWatcher() {
  yield takeLatest(
    GET_ADMISSION_STEP_INSTANCES,
    getAdmissionStepInstancesRequest
  );
  yield takeLatest(
    GET_AGENT_PROFILE_COMPLETED,
    getAdmissionStepInstancesRequest
  );
  yield takeLatest(
    GET_ADMISSION_STEP_INSTANCES_COMPLETED,
    onGetAdmissionSTepsCompleted
  );
  yield takeLatest(SET_SHOW_AGENT_TYPE_COMPLETE, onSetShowAGentComplete);
}
