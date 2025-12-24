import { put, takeLatest, call, select, delay } from "redux-saga/effects";
import { agentTypeApi, admissionStepApi, registrationApi } from "./api";
import * as agentProfileSelector from "spotify-shared/selectors/agentProfile";

import { AdmissionStep, AgentPath, Country, errorMessages } from "../constants";
import { ADMISSION_STEP_ROUTES } from "../config";
import { _3rdPartyLinkTypes } from "spotify-shared/constants";


import {
  SELECT_BUSINESS_PATH,
  SELECT_BUSINESS_PATH_COMPLETED,
  SELECT_BUSINESS_PATH_FAILED,
  VERIFY_SSN_UNIQUE,
  VERIFY_SSN_AND_NAME,
  VERIFY_SSN_AND_NAME_COMPLETED,
  VERIFY_SSN_AND_NAME_FAILED,
  VERIFY_SSN_AND_NAME_COUNTRY,
  REGISTER_INDIVIDUAL,
  REGISTER_INDIVIDUAL_COMPLETED,
  REGISTER_INDIVIDUAL_FAILED,
  REGISTER_BUSINESS,
  SPRING_VERIFY_GST,
  SPRING_VERIFY_GST_COMPLETED,
  SPRING_VERIFY_GST_FAILED,
  SPRING_VERIFY_GST_API_FAILED,
  REGISTER_BUSINESS_COMPLETED,
  REGISTER_BUSINESS_FAILED,
  VALIDATE_GSTHST_INIT,
  VALIDATE_GSTHST_COMPLETED,
  VALIDATE_GSTHST_FAILED,
  JOIN_BUSINESS,
  JOIN_BUSINESS_COMPLETED,
  JOIN_BUSINESS_FAILED,
  GET_BUSINESS_BY_FEIN,
  GET_BUSINESS_BY_FEIN_COMPLETED,
  GET_BUSINESS_BY_FEIN_FAILED,
  GET_BUSINESS_BY_ID,
  GET_BUSINESS_BY_ID_COMPLETED,
  GET_BUSINESS_BY_ID_FAILED,
  GET_BUSINESSES_TO_JOIN,
  GET_BUSINESSES_TO_JOIN_COMPLETED,
  GET_BUSINESSES_TO_JOIN_FAILED,
  REMOVE_JOIN_BUSINESS,
  REMOVE_JOIN_BUSINESS_COMPLETED,
  REMOVE_JOIN_BUSINESS_FAILED,
  REMOVE_REGISTER_BUSINESS,
  REMOVE_REGISTER_BUSINESS_COMPLETED,
  REMOVE_REGISTER_BUSINESS_FAILED,
  REMOVE_REGISTER_INDIVIDUAL,
  REMOVE_REGISTER_INDIVIDUAL_COMPLETED,
  REMOVE_REGISTER_INDIVIDUAL_FAILED,
  GET_JOIN_BUSINESS_STATUS,
  GET_JOIN_BUSINESS_STATUS_COMPLETED,
  GET_JOIN_BUSINESS_STATUS_FAILED,
  GET_GST_HST,
  GET_GST_HST_COMPLETED,
  GET_GST_HST_FAILED,
  FINALIZE_REGISTER_BUSINESS,
  FINALIZE_REGISTER_BUSINESS_COMPLETED,
  FINALIZE_REGISTER_BUSINESS_FAILED,
  FINALIZE_REGISTER_INDIVIDUAL,
  FINALIZE_REGISTER_INDIVIDUAL_COMPLETED,
  FINALIZE_REGISTER_INDIVIDUAL_FAILED,
  GET_MEDIA,
  GET_MEDIA_FAILED,
  GET_MEDIA_COMPLETED,
  SCREENINGASSESSMENT_REQUIRED,
  CHANGE_BUSINESS_PATH,
  TOGGLE_IS_FETCHING_FLAG_FOR_GST,
  SCREENINGASSESSMENT_REFRESH,
  SEC_VERIFY,
  SEC_VERIFY_COMPLETED,
  SEC_VERIFY_FAILED,
  SEC_VERIFY_API_FAILED,
  TOGGLE_IS_FETCHING_FLAG_FOR_SEC,
  TIN_VERIFY,
  TIN_VERIFY_COMPLETED,
  TIN_VERIFY_FAILED,
  TIN_VERIFY_API_FAILED,
  TOGGLE_IS_FETCHING_FLAG_FOR_TIN,
  GET_TypeOfIncorporation,
  GET_TypeOfIncorporation_COMPLETED,
  GET_TypeOfIncorporation_FAILED
} from '../types/agentTypeTypes';

import { GET_ADMISSION_STEP_INSTANCES } from "../types/admissionStepTypes";
import * as agentAction from "../../src/actions/agentTypeActions";
import { PUT_REFERRAL_USER } from "../types/registrationTypes";

export function* selectBusinessPathRequest(action) {
  try {
    const response = yield call(agentTypeApi.selectBusinessPath, action);
    yield put({
      type: SELECT_BUSINESS_PATH_COMPLETED,
      payload: { data: response },
    });
    yield put({
      type: GET_ADMISSION_STEP_INSTANCES,
      payload: {},
    });
  } catch (err) {
    alert("Error select");
    yield put({
      type: SELECT_BUSINESS_PATH_FAILED,
      error: err,
    });
  }
}

export function* registerIndividualRequest(action) {
  try {
    const response = yield call(agentTypeApi.registerIndividual, action);
    //ASI-1351 Add delay after selecting the Sole Proprietor option and on the Sign Agreements step
    yield delay(3000)
    yield put({
      type: REGISTER_INDIVIDUAL_COMPLETED,
      payload: { data: response },
    });
    yield put({
      type: GET_ADMISSION_STEP_INSTANCES,
      payload: {},
    });
  } catch (err) {
    yield put({
      type: REGISTER_INDIVIDUAL_FAILED,
      error: err,
    });
  }
}

export function* verifySsnUniqueRequest(action) {
  try {
    const response = yield call(agentTypeApi.verifySsnUnique, action);
  } catch (err) {
    console.log(err);
  }
}

export function* verifySsnAndNameRequest(action) {
  try {
    const response = yield call(agentTypeApi.verifySsnAndName, action);
    yield put({
      type: VERIFY_SSN_AND_NAME_COMPLETED,
      payload: { data: response },
    });
    yield put({
      type: GET_ADMISSION_STEP_INSTANCES,
      payload: {},
    });
  } catch (err) {
    yield put({
      type: VERIFY_SSN_AND_NAME_FAILED,
      error: err,
    });
  }
}

export function* verifySsnAndNameRequestCountry(action) {



  try {
    const response = yield call(agentTypeApi.verifySsnAndNameByCountry, action);

    yield put({
      type: VERIFY_SSN_AND_NAME_COMPLETED,
      payload: { data: response }
    });
    yield put({
      type: GET_ADMISSION_STEP_INSTANCES,
      payload: {}
    });
  } catch (err) {
    const agentProfile = yield select(agentProfileSelector.get);
    yield put({
      type: VERIFY_SSN_AND_NAME_FAILED,
      error: err.data.message ? err : { data: { message: errorMessages.TRNError } },
    });
  }
}

export function* springverifygstRequest(action) {
  try {
    const response = yield call(agentTypeApi.springverifygst, action);
    yield put({
      type: response.isGstValid ? SPRING_VERIFY_GST_COMPLETED : SPRING_VERIFY_GST_FAILED,
      payload: { data: response },
    });
  } catch (err) {
    yield put({
      type: SPRING_VERIFY_GST_API_FAILED,
      errorCode: err.status,
    });
  }
  yield put({
    type: TOGGLE_IS_FETCHING_FLAG_FOR_GST,
    payload: false

  });
}

export function* verifySecRequest(action) {
  try {
    const response = yield call(agentTypeApi.secverify, action);
    // const response = {
    //   "IsValid": true,
    //   "ValidationMessage": false,
    //   "MaxAttempts": 3,
    //   "FailAttempts": 2
    // };
    yield put({
      type: response.isValid ? SEC_VERIFY_COMPLETED : SEC_VERIFY_FAILED,
      payload: { data: response },
    });
  } catch (err) {
    yield put({
      type: SEC_VERIFY_API_FAILED,
      errorCode: err.status,
    });
  }
  yield put({
    type: TOGGLE_IS_FETCHING_FLAG_FOR_SEC,
    payload: false

  });
}

export function* verifyTinRequest(action) {
  try {
    const response = yield call(agentTypeApi.tinverify, action);
    // const response = {
    //   "isValid": true,
    //   "ValidationMessage": false,
    //   "MaxAttempts": 3,
    //   "FailAttempts": 2
    // };

    yield put({
      type: response.isValid ? TIN_VERIFY_COMPLETED : TIN_VERIFY_FAILED,
      payload: { data: response },
    });
  } catch (err) {
    yield put({
      type: TIN_VERIFY_API_FAILED,
      errorCode: err.status,
    });
  }
  yield put({
    type: TOGGLE_IS_FETCHING_FLAG_FOR_TIN,
    payload: false

  });
}

export function* registerBusinessRequest(action) {
  try {
    const response = yield call(agentTypeApi.registerBusiness, action);
    yield put({
      type: REGISTER_BUSINESS_COMPLETED,
      payload: { data: response },
    });
    yield put({
      type: GET_ADMISSION_STEP_INSTANCES,
      payload: {},
    });
  } catch (err) {
    yield put({
      type: REGISTER_BUSINESS_FAILED,
      error: err,
    });
  }
}

export function* validateGstHstRequest(action) {
  try {
    const response = yield call(agentTypeApi.validateGstHst, action);
    yield put({
      type: VALIDATE_GSTHST_COMPLETED,
      payload: { data: response },
    });
  } catch (err) {
    yield put({
      type: VALIDATE_GSTHST_FAILED,
      error: err,
    });
  }
}

export function* joinBusinessRequest(action) {
  try {
    const response = yield call(agentTypeApi.joinBusiness, action);

    yield put({
      type: JOIN_BUSINESS_COMPLETED,
      payload: { data: response },
    });
    yield put({
      type: GET_ADMISSION_STEP_INSTANCES,
      payload: {},
    });
    yield put({
      type: GET_JOIN_BUSINESS_STATUS,
      payload: action.payload,
    });
    yield call(registrationApi.updateReferralUser, action);
  } catch (err) {
    yield put({
      type: JOIN_BUSINESS_FAILED,
      error: err,
    });
  }
}

export function* getBusinessByFeinRequest(action) {
  try {
    const response = yield call(agentTypeApi.getBusinessByFein, action);
    yield put({
      type: GET_BUSINESS_BY_FEIN_COMPLETED,
      payload: { data: response },
    });
  } catch (err) {
    yield put({
      type: GET_BUSINESS_BY_FEIN_FAILED,
      error: err,
    });
  }
}

export function* getBusinessByIdRequest(action) {
  try {
    const response = yield call(agentTypeApi.getBusinessById, action);
    yield put({
      type: GET_BUSINESS_BY_ID_COMPLETED,
      payload: { data: response },
    });
  } catch (err) {
    yield put({
      type: GET_BUSINESS_BY_ID_FAILED,
      error: err,
    });
  }
}

export function* getBusinessesToJoinRequest(action) {
  try {
    const response = yield call(agentTypeApi.getBusinessesToJoin, action);
    yield put({
      type: GET_BUSINESSES_TO_JOIN_COMPLETED,
      payload: { data: response },
    });
  } catch (err) {
    yield put({
      type: GET_BUSINESSES_TO_JOIN_FAILED,
      error: err,
    });
  }
}

export function* removeJoinBusinessRequest(action) {
  try {
    const response = yield call(agentTypeApi.removeJoinBusiness, action);

    yield put({
      type: REMOVE_JOIN_BUSINESS_COMPLETED,
      payload: { data: response, message: action.payload.message },
    });
    yield put({
      type: GET_ADMISSION_STEP_INSTANCES,
      payload: {},
    });
  } catch (err) {
    yield put({
      type: REMOVE_JOIN_BUSINESS_FAILED,
      error: err,
    });
  }
}

export function* removeRegisterBusinessRequest(action) {
  try {
    const response = yield call(agentTypeApi.removeRegisterBusiness, action);

    yield put({
      type: REMOVE_REGISTER_BUSINESS_COMPLETED,
      payload: { data: response, message: action.payload.message },
    });
    yield put({
      type: GET_ADMISSION_STEP_INSTANCES,
      payload: {},
    });
  } catch (err) {
    yield put({
      type: REMOVE_REGISTER_BUSINESS_FAILED,
      error: err,
    });
  }
}

export function* removeRegisterIndividualRequest(action) {
  try {
    const response = yield call(agentTypeApi.removeRegisterIndividual, action);

    yield put({
      type: REMOVE_REGISTER_INDIVIDUAL_COMPLETED,
      payload: { data: response, message: action.payload.message },
    });
    yield put({
      type: GET_ADMISSION_STEP_INSTANCES,
      payload: {},
    });
  } catch (err) {
    yield put({
      type: REMOVE_REGISTER_INDIVIDUAL_FAILED,
      error: err,
    });
  }
}

export function* changeBusinessPathRequest(action) {
  //alert('changeBusinessPathRequest call');
  const { agentId, currentPathId, newPathId } = action.payload;

  //remove the current step.
  switch (currentPathId) {
    case AdmissionStep.SOLE_PROPRIETOR:
      try {
        const response = yield call(
          agentTypeApi.removeRegisterIndividual,
          action
        );
        yield put({
          type: REMOVE_REGISTER_INDIVIDUAL_COMPLETED,
          payload: { data: response, message: action.payload.message },
        });
      } catch (err) {
        yield put({
          type: REMOVE_REGISTER_INDIVIDUAL_FAILED,
          error: err,
        });
      }
      break;

    case AdmissionStep.NEW_CALL_CENTER:
      try {
        const response = yield call(
          agentTypeApi.removeRegisterBusiness,
          action
        );

        yield put({
          type: REMOVE_REGISTER_BUSINESS_COMPLETED,
          payload: { data: response, message: action.payload.message },
        });
      } catch (err) {
        yield put({
          type: REMOVE_REGISTER_BUSINESS_FAILED,
          error: err,
        });
      }
      break;

    case AdmissionStep.JOIN_BUSINESS:
      try {
        const response = yield call(agentTypeApi.removeJoinBusiness, action);

        yield put({
          type: REMOVE_JOIN_BUSINESS_COMPLETED,
          payload: { data: response, message: action.payload.message },
        });
      } catch (err) {
        yield put({
          type: REMOVE_JOIN_BUSINESS_FAILED,
          error: err,
        });
      }
      break;
    default:
    //return null;
  }

  //join new step
  try {
    const response = yield call(agentTypeApi.selectBusinessPath, action);
    yield put({
      type: SELECT_BUSINESS_PATH_COMPLETED,
      payload: { data: response },
    });
  } catch (err) {
    yield put({
      type: SELECT_BUSINESS_PATH_FAILED,
      error: err,
    });
  }

  //action.payload = agentId
  //const response = yield call(admissionStepApi.getAdmissionStepInstances, action);
  yield put({
    type: GET_ADMISSION_STEP_INSTANCES,
    payload: {},
  });
}

export function* getJoinBusinessStatusRequest(action) {
  try {
    const response = yield call(agentTypeApi.getJoinBusinessStatus, action);

    yield put({
      type: GET_JOIN_BUSINESS_STATUS_COMPLETED,
      payload: { data: response },
    });

    if (response.statusId === "") {
    }

    yield put({
      type: GET_ADMISSION_STEP_INSTANCES,
      payload: {},
    });
  } catch (err) {
    yield put({
      type: GET_JOIN_BUSINESS_STATUS_FAILED,
      error: err,
    });
    yield put({
      type: GET_ADMISSION_STEP_INSTANCES,
      payload: {},
    });
  }
}

export function* getGstHstRequest(action) {
  try {
    const response = yield call(agentTypeApi.getGstHst, action);

    yield put({
      type: GET_GST_HST_COMPLETED,
      payload: { data: response },
    });
  } catch (err) {
    yield put({
      type: GET_GST_HST_FAILED,
      error: err,
    });
  }
}

export function* getTypeOfIncorporationRequest(action) {
  try {
    const response = yield call(agentTypeApi.getTypeOfIncopration, action);

    yield put({
      type: GET_TypeOfIncorporation_COMPLETED,
      payload: { data: response },
    });
  } catch (err) {
    yield put({
      type: GET_TypeOfIncorporation_FAILED,
      error: err,
    });
  }
}


export function* getMediaRequest(action) {
  try {
    const response = yield call(agentTypeApi.getMedia, action);
    yield put({
      type: GET_MEDIA_COMPLETED,
      payload: { data: response },
    });
  } catch (err) {
    yield put({
      type: GET_MEDIA_FAILED,
      error: err,
    });
  }
}

export function* finalizeRegisterBusinessRequest(action) {
  try {
    const response = yield call(agentTypeApi.finalizeRegisterBusiness, action);

    yield put({
      type: FINALIZE_REGISTER_BUSINESS_COMPLETED,
      payload: { data: response },
    });
    yield put({
      type: GET_ADMISSION_STEP_INSTANCES,
      payload: {},
    });
  } catch (err) {
    yield put({
      type: FINALIZE_REGISTER_BUSINESS_FAILED,
      error: err,
    });
  }
}

export function* finalizeRegisterIndividualRequest(action) {
  try {
    const response = yield call(
      agentTypeApi.finalizeRegisterIndividual,
      action
    );

    yield put({
      type: FINALIZE_REGISTER_INDIVIDUAL_COMPLETED,
      payload: { data: response },
    });
    yield put({
      type: GET_ADMISSION_STEP_INSTANCES,
      payload: {},
    });
  } catch (err) {
    yield put({
      type: FINALIZE_REGISTER_INDIVIDUAL_FAILED,
      error: err,
    });
  }
}

export function* isScreeningAssessmentRequired(action) {
  try {
    const agentProfile = yield select(agentProfileSelector.get);
    const isScreeningAssessment = agentProfile.isScreeningAssessmentRequired;
    /* const data = yield call(
       agentTypeApi.checkScreeningAssessmentRequired,
       action
     ); */
    /* AAD-2153 : Harver General Assessment removal (Canada)  */
    const data = yield call(
      agentTypeApi.checkScreeningAssessmentRequiredByCountry,
      action
    );

    yield put(agentAction.SetScreeningAssessmentRequired(data));
  } catch (err) {
    yield put({
      type: _3rdPartyLinkTypes.SCREENING_ASSESSMENT,
      error: err,
    });
  }
}

export function* refreshScreeningAssessment(action) {
  try {
    const data = yield call(
      agentTypeApi.checkScreeningAssessmentRequiredByCountry,
      action
    );

    setTimeout(() => window.location.reload(), 5000);
  } catch (err) {
    yield put({
      type: _3rdPartyLinkTypes.SCREENING_ASSESSMENT,
      error: err,
    });
  }
}
// export function* isReferralUser(action) {
//   try {
//     const agentReferral = yield select(agentReferralSelector.get);
//     const servicepartner = agentReferral.isReferralUser;
//     const response = yield call(agentTypeApi.referralAgent, action);
//     yield put({
//       type: REFERRAL_USER_SUCCESS,
//       payload: { data: response },
//     });
//   } catch (err) {
//     yield put({
//       type: REFERRAL_USER_FAIL,
//       error: err,
//     });
//   }
// }

export function* agentTypeWatcher() {


  yield takeLatest(SELECT_BUSINESS_PATH, selectBusinessPathRequest);
  yield takeLatest(REGISTER_INDIVIDUAL, registerIndividualRequest);
  yield takeLatest(VERIFY_SSN_UNIQUE, verifySsnUniqueRequest);
  yield takeLatest(VERIFY_SSN_AND_NAME, verifySsnAndNameRequest);
  yield takeLatest(VERIFY_SSN_AND_NAME_COUNTRY, verifySsnAndNameRequestCountry);
  yield takeLatest(SPRING_VERIFY_GST, springverifygstRequest);
  yield takeLatest(SEC_VERIFY, verifySecRequest);
  yield takeLatest(TIN_VERIFY, verifyTinRequest);
  yield takeLatest(REGISTER_BUSINESS, registerBusinessRequest);
  yield takeLatest(VALIDATE_GSTHST_INIT, validateGstHstRequest);
  yield takeLatest(JOIN_BUSINESS, joinBusinessRequest);
  yield takeLatest(GET_BUSINESS_BY_FEIN, getBusinessByFeinRequest);
  yield takeLatest(GET_BUSINESS_BY_ID, getBusinessByIdRequest);
  yield takeLatest(GET_BUSINESSES_TO_JOIN, getBusinessesToJoinRequest);
  yield takeLatest(REMOVE_JOIN_BUSINESS, removeJoinBusinessRequest);
  yield takeLatest(REMOVE_REGISTER_BUSINESS, removeRegisterBusinessRequest);
  yield takeLatest(REMOVE_REGISTER_INDIVIDUAL, removeRegisterIndividualRequest);
  yield takeLatest(GET_JOIN_BUSINESS_STATUS, getJoinBusinessStatusRequest);
  yield takeLatest(GET_GST_HST, getGstHstRequest);
  yield takeLatest(GET_TypeOfIncorporation, getTypeOfIncorporationRequest);
  yield takeLatest(FINALIZE_REGISTER_BUSINESS, finalizeRegisterBusinessRequest);
  yield takeLatest(
    FINALIZE_REGISTER_INDIVIDUAL,
    finalizeRegisterIndividualRequest
  );
  yield takeLatest(GET_MEDIA, getMediaRequest);
  yield takeLatest(SCREENINGASSESSMENT_REQUIRED, isScreeningAssessmentRequired);
  yield takeLatest(SCREENINGASSESSMENT_REFRESH, refreshScreeningAssessment);
  yield takeLatest(CHANGE_BUSINESS_PATH, changeBusinessPathRequest);

}
