import { takeLatest, put, call, select } from "redux-saga/effects";
import * as ActionType from "../actionTypes/educationModule";
import * as Actions from "../actions/educationModule";
import * as educationModuleApi from "../api/educationModule";
import * as agentProfileSelector from "../selectors/agentProfile";
import { getAdmissionStepInstances } from "../../src/actions/admissionStepActions";
import { REACT_APP_PORTAL_BASE_URL } from "../../src/config";

function* onFetchQuestions(action) {
  try {
    const data = yield call(educationModuleApi.fetchQuestions);

    yield put(Actions.fetchQuestionsComplete(data));
  } catch (e) {
    yield put(Actions.fetchQuestionsError(e));
  }
}

export function* onSubmitAnswers(action) {
  try {
    const props = {
      AgentId: action.payload.agentId,
      IsPass: action.payload.isPass,
      EducationalContentId: action.payload.educationalContentId,
      AssessmentAnswer: action.payload.assessmentAnswer,
      IsVideoWatched: action.payload.isVideoWatched,
      NumberOfCorrectAnswer: action.payload.numberOfCorrectAnswer,
    };

    const response = yield call(educationModuleApi.submitAnswers, props);
    const result = Object.assign(
      {
        mandatoryTask: action.payload.mandatoryTask,
        redirect: action.payload.redirect,
      },
      ...response
    );

    yield put({
      type: ActionType.submitAnswersComplete,
      payload: result,
    });
    //yield put(getAdmissionStepInstances());
  } catch (err) {
    yield put(Actions.SubmitAnswerssError(err));
  }
}

export function* onSubmitAnswersComplete(action) {
  try {
    const agentProfile = yield select(agentProfileSelector.get);

    if (action.payload.mandatoryTask) {
      setTimeout(() => {
        window.location.href = `${REACT_APP_PORTAL_BASE_URL}tasks`;
      }, 5000);
    }
    if (action.payload.redirect) {
      yield put(getAdmissionStepInstances());
    }
  } catch (err) {}
}

export function* onSkipModule(action) {
  try {
    yield put({
      type: ActionType.skipModuleComplete,
    });
    if (action.payload.mandatoryTask) {
      setTimeout(() => {
        window.location.href = `${REACT_APP_PORTAL_BASE_URL}tasks`;
      }, 3000);
    } else {
      yield put(getAdmissionStepInstances());
    }
  } catch (err) {
    yield put(Actions.skipModuleError(err));
  }
}

export function* onClearAnswers(action) {
  try {
    const agentProfile = yield select(agentProfileSelector.get);
    console.log(action);

    put({
      type: ActionType.clearAnswers,
      payload: null,
    });
  } catch (err) {}
}

export default function* watcher() {
  yield takeLatest(ActionType.fetchQuestions, onFetchQuestions);
  yield takeLatest(ActionType.submitAnswers, onSubmitAnswers);
  yield takeLatest(ActionType.clearAnswers, onClearAnswers);
  yield takeLatest(ActionType.skipModule, onSkipModule);
  yield takeLatest(ActionType.submitAnswersComplete, onSubmitAnswersComplete);
}
