import {
  REGISTER_REDIRECT,
  CREATE_AGENT_PROFILE,
  GET_AGENT_PROFILE,
  GET_USER_COUNTRY,
  GET_COUNTRIES,
  GET_STATES,
  GET_PROVINCES,
  GET_REFERRAL_USER,
  GET_REFERRAL_USER_SUCCESS,
  PUT_REFERRAL_USER,
  PUT_JM_USER_NAME_DOB,
  GET_PARISHES,
  PUT_PARISH_DATA,
  CHECK_IF_JM_CONSENT_SIGNED,
  DECLINE_JM_CONSENT,
  UPDATE_LANGUAGE_PREFERENCE

} from "../types/registrationTypes";

export const registerRedirect = (code, country, referral) => ({
  type: REGISTER_REDIRECT,
  payload: { code, country, referral },
});

export const createAgentProfile = (formData) => ({
  type: CREATE_AGENT_PROFILE,
  payload: formData,
});

export const getAgentProfile = (userId) => ({
  type: GET_AGENT_PROFILE,
  payload: userId,
});

export const getUserCountry = (considerIp) => ({
  type: GET_USER_COUNTRY,
  payload: considerIp,
});

export const getCountries = () => ({
  type: GET_COUNTRIES,
  payload: {},
});

export const getStates = () => ({
  type: GET_STATES,
  payload: {},
});

export const getProvinces = () => ({
  type: GET_PROVINCES,
  payload: {},
});

export const getReferralUser = (userId) => ({
  type: GET_REFERRAL_USER,
  payload: userId,
});

export const updateReferralUserData = (data) => ({
  type: PUT_REFERRAL_USER,
  payload: data,
});

export const updateNameAndDob = (data) => ({
  type: PUT_JM_USER_NAME_DOB,
  payload: data
})


export const getParishes = () => ({
  type: GET_PARISHES,
  payload: {},
})

export const updateParishData = (data) => ({
  type: PUT_PARISH_DATA,
  payload: data
})


export const checkifJMConsentSigned = (data) => ({
  type: CHECK_IF_JM_CONSENT_SIGNED,
  payload: data
})


export const declineJmConsent = () => ({
  type: DECLINE_JM_CONSENT,
  payload: {}
})

// export const fetchLegalConsent=(data)=>({
//   type:
// })

export const updateLanguagePreference = (agentId, language) => ({
  type: UPDATE_LANGUAGE_PREFERENCE,
  payload: {
    agentId,
    language
  }
});
