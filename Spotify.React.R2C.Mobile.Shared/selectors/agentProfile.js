import {
  getAgentTypeSteps,
  isAgentTypeComplete,
  isBackgroundCheckComplete,
  isProfileComplete,
} from "./admissionSteps";
import { AdmissionStep, Country, COUNTRY_IDS } from "../constants";

export const get = (state) => state.agentProfile;

export const isUserBusinessOwner = (state) => {
  return state.agentProfile.isPrincipalOwner;
};

export const isLegacyUser = (state) => {
  if (
    state.agentProfile != null &&
    state.agentProfile.registrationType == "506920000"
  )
    return true;
  else return false;
};

export const isRegistrationComplete = (state) => {
  const agentSteps = getAgentTypeSteps(state);

  if (!agentSteps.childSteps) return false;

  return isProfileComplete(state);
};

export const isAgentFromUSA = (state) =>
  state.agentProfile != null &&
  (state.agentProfile.countryCode === Country.US ||
    state.agentProfile.countryId === COUNTRY_IDS.US);

export const isAgentFromUK = (state) =>
  state.agentProfile != null &&
  (state.agentProfile.countryCode === Country.UK ||
    state.agentProfile.countryId === COUNTRY_IDS.UK);

export const isAgentFromJM = state =>  state.agentProfile != null && (state.agentProfile.countryCode === Country.JM || state.agentProfile.countryId === COUNTRY_IDS.JM);


export const hasPendingTasks = state => {
	const _isAgentTypeComplete = isAgentTypeComplete(state);
	return _isAgentTypeComplete === false;
}

export const isScreeningAssessmentRequired = (state) => {
  const isScreeningAssessmentRequired =
    state.agentProfile.isScreeningAssessmentRequired;
  return isScreeningAssessmentRequired;
};

export const opportunityBordType = (state) => {
  const opportunityBordType = state.agentProfile.opportuntiyBoardType;

  if (opportunityBordType === 506920000) {
    return "firstinstance";
  } else if (opportunityBordType === 506920001) return "secondinstance";
  else return "";
};

export const refuser = (state) => {
  console.log(state + "Holiday");
  return state.data;
};
