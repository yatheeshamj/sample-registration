import {
  SUBMIT_PRIMARY_UNIQUE_IDENTITY,
  GET_AADHAAR_REDIRECTION_URL,
  SUBMIT_SECONDARY_UNIQUE_IDENTITY,
  CLEAR_UNIQUE_ID_ERROR,
  CLEAR_SECONDARY_UNIQUE_ID_ERROR,
  CHECK_PRIMARY_UNIQUE_IDENTITY_VERIFIED,
  CHECK_SECONDARY_UNIQUE_IDENTITY_VERIFIED,
  TOGGLE_IS_FETCHING_FLAG_FOR_IDENTITY,
  TOGGLE_IS_FETCHING_FLAG_FOR_SECONDARY_IDENTITY,
  INDIVIUAL_TAX_ID_CHECKED
} from "../types/uniqueIdentityTypes";


export const verifyPrimaryUniqueIdentity = (formData) =>
({
  type: SUBMIT_PRIMARY_UNIQUE_IDENTITY,
  payload: formData
});

export const getAadhaarRedirectionURL = (agentId, firstName, middleInitial, lastName, uniqueIdentity) => {

  return {
    type: GET_AADHAAR_REDIRECTION_URL,
    payload: { agentId, firstName, middleInitial, lastName, uniqueIdentity }
  };
};

export const checkSecondaryUniqueIdentityVerified = (agentId, firstName, middleInitial, lastName, secondaryUniqueIdentity) => {


  return {
    type: CHECK_SECONDARY_UNIQUE_IDENTITY_VERIFIED,
    payload: { agentId, firstName, middleInitial, lastName, secondaryUniqueIdentity }
  };
};

export const clearUniqueIdenityVerificationErrorMessage = () =>
({
  type: CLEAR_UNIQUE_ID_ERROR,
  payload: {}
});

export const clearSecondaryUniqueIdenityVerificationErrorMessage = () =>
({
  type: CLEAR_SECONDARY_UNIQUE_ID_ERROR,
  payload: {}
});

export const checkPrimaryUniqueIdVerified = (agentId, personId, requestId, uniqueIdentity, firstName, lastName) => {

  return {
    type: CHECK_PRIMARY_UNIQUE_IDENTITY_VERIFIED,
    payload: { agentId, personId, requestId, uniqueIdentity, firstName, lastName }
  };
};


export const verifySecondaryUniqueIdentity = (formData) =>
({
  type: SUBMIT_SECONDARY_UNIQUE_IDENTITY,
  payload: formData
});

export const toggleIsFetchingFlagForIdentity = (flag) =>
({
  type: TOGGLE_IS_FETCHING_FLAG_FOR_IDENTITY,
  payload: flag
});

export const toggleIsFetchingFlagForSecondaryIdentity = (flag) =>
({
  type: TOGGLE_IS_FETCHING_FLAG_FOR_SECONDARY_IDENTITY,
  payload: flag
});

export const makeindividualTaxIdChecked = (flag) =>
({
  type: INDIVIUAL_TAX_ID_CHECKED,
  payload: flag
});

