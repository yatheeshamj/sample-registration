import {
  VERIFY_SSN_UNIQUE,
  VERIFY_SSN_AND_NAME,
  VERIFY_SSN_AND_NAME_COUNTRY,
  SELECT_BUSINESS_PATH,
  REGISTER_INDIVIDUAL,
  REGISTER_INDIVIDUAL_COUNTRY,
  REMOVE_REGISTER_INDIVIDUAL,
  FINALIZE_REGISTER_INDIVIDUAL,
  REGISTER_BUSINESS,
  VALIDATE_GSTHST_INIT,
  SPRING_VERIFY_GST,
  TOGGLE_IS_FETCHING_FLAG_FOR_GST,
  GET_GST_HST,
  REMOVE_REGISTER_BUSINESS,
  REMOVE_REGISTER_BUSINESS_FORM,
  FINALIZE_REGISTER_BUSINESS,
  VERIFY_FEIN_UNIQUE,
  VERIFY_BUSINESS_ID,
  JOIN_BUSINESS,
  REMOVE_JOIN_BUSINESS,
  GET_JOIN_BUSINESS_STATUS,
  GET_BUSINESS_BY_FEIN,
  GET_BUSINESS_BY_ID,
  GET_BUSINESSES_TO_JOIN,
  GET_MEDIA,
  SELECT_BUSINESS_TO_JOIN,
  SHOW_AGREEMENTS,
  HIDE_AGREEMENTS,
  SHOW_AGREEMENT_CONTENT,
  HIDE_AGREEMENT_CONTENT,
  UPDATE_NAME,
  SCREENINGASSESSMENT_REQUIRED,
  SET_SCREENINGASSESSMENT_REQUIRED,
  CHANGE_BUSINESS_PATH,
  CLEAR_REGISTER_BUSINESS_ERROR,
  SCREENINGASSESSMENT_REFRESH,
  TOGGLE_IS_FETCHING_FLAG_FOR_SEC,
  SEC_VERIFY,
  TIN_VERIFY,
  TOGGLE_IS_FETCHING_FLAG_FOR_TIN,
  GET_TypeOfIncorporation
} from "../types/agentTypeTypes";

export const verifySsnUnique = (ssn) => ({
  type: VERIFY_SSN_UNIQUE,
  payload: ssn,
});

export const verifySsnAndName = (formData) => ({
  type: VERIFY_SSN_AND_NAME,
  payload: formData,
});


export const verifySsnAndNameByCountry = (formData) =>
({
  type: VERIFY_SSN_AND_NAME_COUNTRY,
  payload: formData
});

export const selectBusinessPath = (agentId, path) => ({
  type: SELECT_BUSINESS_PATH,
  payload: { agentId, path },
});

export const registerIndividual = (formData) => ({
  type: REGISTER_INDIVIDUAL,
  payload: formData,
});

export const registerBusiness = (formData) => ({
  type: REGISTER_BUSINESS,
  payload: formData,
});

export const validateGstHst = (data) => ({
  type: VALIDATE_GSTHST_INIT,
  payload: { data },
});

export const springVerifyGST = (agentId, name, vatid) => ({
  type: SPRING_VERIFY_GST,
  payload: { agentId, name, vatid },
});

export const secVerify = (agentId, name, vatid) => ({
  type: SEC_VERIFY,
  payload: { agentId, name, vatid },
});

export const tinVerify = (agentId, name, vatid) => ({
  type: TIN_VERIFY,
  payload: { agentId, name, vatid },
});

export const toggleIsFetchingFlagForGST = (flag) =>
({
  type: TOGGLE_IS_FETCHING_FLAG_FOR_GST,
  payload: flag
});

export const toggleIsFetchingFlagForSEC = (flag) =>
({
  type: TOGGLE_IS_FETCHING_FLAG_FOR_SEC,
  payload: flag
});


export const toggleIsFetchingFlagForTIN = (flag) =>
({
  type: TOGGLE_IS_FETCHING_FLAG_FOR_TIN,
  payload: flag
});

export const clearRegisterBusinessError = () =>
({
  type: CLEAR_REGISTER_BUSINESS_ERROR,
  payload: {}
});


export const verifyFeinUnique = (fein) => ({
  type: VERIFY_FEIN_UNIQUE,
  payload: fein,
});

export const verifyIsBusinessIdUnique = (id) => ({
  type: VERIFY_BUSINESS_ID,
  payload: id,
});

export const joinBusiness = (formData) => ({
  type: JOIN_BUSINESS,
  payload: formData,
});

export const getBusinessByFein = (fein, countryId) => ({
  type: GET_BUSINESS_BY_FEIN,
  payload: { fein, countryId },
});

export const getBusinessById = (businessId, countryId) => ({
  type: GET_BUSINESS_BY_ID,
  payload: { businessId, countryId },
});

export const getBusinessesToJoin = (countryId, agentId) => ({
  type: GET_BUSINESSES_TO_JOIN,
  payload: { countryId, agentId },
});

export const selectBusinessToJoin = (businessId, name) => ({
  type: SELECT_BUSINESS_TO_JOIN,
  payload: { businessId, name },
});

export const removeJoinBusiness = (agentId, message) => ({
  type: REMOVE_JOIN_BUSINESS,
  payload: { agentId, message },
});

export const removeRegisterBusiness = (agentId, message) => ({
  type: REMOVE_REGISTER_BUSINESS,
  payload: { agentId, message },
});

export const removeRegisterBusinessForm = () => ({
  type: REMOVE_REGISTER_BUSINESS_FORM,
  payload: {},
});

export const removeRegisterIndividual = (agentId, message) => ({
  type: REMOVE_REGISTER_INDIVIDUAL,
  payload: { agentId, message },
});

export const changePatch = (agentId, currentPathId, newPathId, path) => ({
  type: CHANGE_BUSINESS_PATH,
  payload: { agentId, currentPathId, newPathId, path },
});

export const showAgreements = () => ({
  type: SHOW_AGREEMENTS,
  payload: {},
});

export const hideAgreements = () => ({
  type: HIDE_AGREEMENTS,
  payload: {},
});

export const showAgreementContent = () => ({
  type: SHOW_AGREEMENT_CONTENT,
  payload: {},
});

export const hideAgreementContent = () => ({
  type: HIDE_AGREEMENT_CONTENT,
  payload: {},
});

export const getJoinBusinessStatus = (agentId, userId, referUser) => ({
  type: GET_JOIN_BUSINESS_STATUS,
  payload: { agentId, userId, referUser },
});

export const getGstHst = () => ({
  type: GET_GST_HST,
  payload: {},
});

export const getTypeOfIncorporation = () => ({
  type: GET_TypeOfIncorporation,
  payload: {},
});

export const finalizeRegisterBusiness = (agentId) => ({
  type: FINALIZE_REGISTER_BUSINESS,
  payload: { agentId },
});

export const finalizeRegisterIndividual = (agentId) => ({
  type: FINALIZE_REGISTER_INDIVIDUAL,
  payload: { agentId },
});

export const getMedia = (countryId) => ({
  type: GET_MEDIA,
  payload: { countryId },
});

export const updateName = (nameValues) => ({
  type: UPDATE_NAME,
  payload: { firstName: nameValues.firstName, middleInitial: nameValues.middleInitial, lastName: nameValues.lastName },
});

export const isScreeningAssessmentRequired = (agentId, countryId) => {
  return { type: SCREENINGASSESSMENT_REQUIRED, payload: { agentId, countryId } };
};

export const refreshScreeningAssessment = (agentId, countryId) => {
  return { type: SCREENINGASSESSMENT_REFRESH, payload: { agentId, countryId } };
};

export const SetScreeningAssessmentRequired = (
  isScreeningAssessmentRequired
) => ({
  type: SET_SCREENINGASSESSMENT_REQUIRED,
  payload: { isScreeningAssessmentRequired },
});
