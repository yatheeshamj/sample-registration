import { OpportunityInProgressStatuses, OpportunityNotForBestMatchTab, OpportunityNotForAdditionalTab } from "../constants"
import { StatusFilterHelper } from "../helpers/opportunity"


export const getData = (state) => state.opportunities.data;

export const getDataAsArray = (state) => {
    return Object.values(state.opportunities.data);
}


export const getNotInProgressDataAsArray = (state) => {
    if (!state.opportunities.data) return [];
    return Object.values(state.opportunities.data)
        .filter(opportunity => StatusFilterHelper(OpportunityInProgressStatuses, opportunity).length === 0);
}

export const getOppForBestMatchTabDataAsArray = (state) => {
    if (!state.opportunities.data) return [];
    return Object.values(state.opportunities.data)
        .filter(opportunity => StatusFilterHelper(OpportunityNotForBestMatchTab, opportunity).length === 0);
}

export const getOppForAdditionalTabDataAsArray = (state) => {
    if (!state.opportunities.data) return [];
    return Object.values(state.opportunities.data)
        .filter(opportunity => StatusFilterHelper(OpportunityNotForAdditionalTab, opportunity).length === 0);
}

export const getInProgressDataAsArray = (state) => {
    if (!state.opportunities.data) return [];
    return Object.values(state.opportunities.data)
        .filter(opportunity => StatusFilterHelper(OpportunityInProgressStatuses, opportunity).length > 0);
}


export const getById = (state, id) => {
    return state.opportunities.data[id];
}




export const isFetching = (state) => state.opportunities.isFetching;

export const getOpportunityEnrollingError = state => state.opportunities.error;

export const getOpportunityEnrolling = state => state.opportunities.enrolling;



export const getEnrollmentAssessmentsForOpportunity = (state, opportunityId) => state.enrollmentAssessments.data[opportunityId] || []

export const getClassDetailsById=(state,opportunityId,classId)=>{
    //break down the details 
    if(!state.opportunities.data) return []
    const opp=state.opportunities.data[opportunityId]
    const availableSchedules=opp.availableSchedules
    if (!availableSchedules) return []
    const classdetails=availableSchedules.find((c)=>c.crmId==classId)
    return [classdetails.classStartDateTime,classdetails.classEndTime]
    
}

export const getClassConflictData=(state)=>{
    return state.opportunities.conflictCheck.isFetching
}

export const getClassConflictByClassId=(state,classId)=>{
    console.log(classId)
    if(!state.opportunities.conflictCheck.conflictcheckData) return null
    return state.opportunities.conflictCheck.conflictcheckData[classId]
}
