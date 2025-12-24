import * as opportunitiesSelector from "./opportunities"
const spotifyCrowdHubGenericProgramLegacyID = 9991;

export const getData = (state) => state.enrolledPrograms.data;

export const getDataById = (state, id) => state.enrolledPrograms.data[id];

export const getDataAsArray = (state) => {
    return Object.values(state.enrolledPrograms.data);
}

export const getMyPrograms = state => {

    const opportunitiesInProgress = opportunitiesSelector.getInProgressDataAsArray(state);
    const programDataAsArray = getDataAsArray(state).filter(x => x.legacyApplicationId !== spotifyCrowdHubGenericProgramLegacyID);

    // outter join. Get items that are not present in opportunitiesInProgress
    var myPrograms = programDataAsArray.filter((program) => {
        return !opportunitiesInProgress.find(opp => opp.programCrmId === program.crmId);
    })


    return myPrograms;
}

export const getGenericKnowledgeZone = state => {

    return getDataAsArray(state).find(x => x.legacyApplicationId === spotifyCrowdHubGenericProgramLegacyID && x.chZoneName === "KNOWLEDGE ZONE");
}

export const isFetching = state => state.enrolledPrograms.isFetching

export const getEnrollmentToCancel = state => state.enrolledPrograms.canceling;

export const getDropStatusReasons = state => state.enrolledPrograms.dropreasons;

export const isDropFetching = state => state.enrolledPrograms.isDropFetching;


export const isEnrollmentProgramsLoading = state => state.enrolledPrograms.isFetching;

export const getEnrollmentProgramsError = state => state.enrolledPrograms.error;

export const getEnrollmentToReschedule = state => state.enrolledPrograms.rescheduling;

export const checkEligiblity = state => state.enrolledPrograms.eligiblity;
