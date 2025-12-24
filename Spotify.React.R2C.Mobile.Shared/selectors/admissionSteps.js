import { AdmissionStep } from "../constants"


export const isValidateAccountComplete = state => {

   let validateStep = state.admissionSteps.steps.find(x => x.uniqueId === AdmissionStep.VALIDATE_ACCOUNT);

    return validateStep && validateStep.completed

}

export const getAgentTypeSteps = state => state.admissionSteps.steps.find(x => x.uniqueId === AdmissionStep.AGENT_TYPE) || {};

export const isAgentTypeComplete = state => {
    let agentTypeStep = getAgentTypeSteps(state);
    if (Object.keys(agentTypeStep).length === 0) {

        agentTypeStep = state.admissionSteps.steps.find(x => x.name === "Select a Path" || x.name === "Select Agent Type") || {};
    }
  
    return agentTypeStep && agentTypeStep.completed 
}


export const isBackgroundCheckComplete = state => {
    const step = state.admissionSteps.steps.filter(x => x.name === "Background Check");
    return step.length > 0 && step[0].completed;
}


export const isProfileComplete = state => {
    const step = state.admissionSteps.steps.filter(x => x.name === "Profile");
    return step.length > 0 && step[0].completed;
}


export const showCompletedAgentTypeAlert = state => state.admissionSteps.showCompletedAgentTypeAlert

export const canPickAClient = state => {

    let step = state.admissionSteps.steps.find(x => x.uniqueId === AdmissionStep.PICK_CLIENT);

    return step && step.available

}
