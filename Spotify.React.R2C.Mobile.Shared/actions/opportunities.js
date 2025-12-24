import * as actions from "../actionTypes/opportunities"

export const fetchOpportunities = (payload) => ({
    type: actions.FetchOpportunities,
    payload
});

export const fetchOpportunitiesComplete = (payload) => ({
    type: actions.FetchOpportunitiesComplete,
    payload
});

export const fetchOpportunitiesError = (payload) => ({
    type: actions.FetchOpportunitiesError,
    payload
});

//
export const fetchOpportunity = (payload) => ({
    type: actions.FetchOpportunity,
    payload
});

export const fetchOpportunityComplete = (payload) => ({
    type: actions.FetchOpportunityComplete,
    payload
});

export const fetchOpportunityError = (payload) => ({
    type: actions.FetchOpportunityError,
    payload
});

export const expressInterestInOpportunity = (agentId, opportunityId, classScheduleId, typeId,ConsentClassNoShow ) => ({
	type: actions.ExpressInterestInOpportunity,
	payload: { agentId, opportunityId, classScheduleId, typeId, ConsentClassNoShow}
});

export const expressInterestInOpportunityError = (payload) => ({
	type: actions.ExpressInterestInOpportunityError,
	payload
});

export const expressInterestInOpportunityComplete = (payload) => ({
	type: actions.ExpressInterestInOpportunityComplete,
	payload
});

export const stageOpportunityToEnroll = payload => ({
	type: actions.StageOpportunityEnrollment,
	payload
})

export const fetchOpportunitiesSecondInstance = (payload) => ({
    type: actions.FetchOpportunitiesSecondInstance,
    payload
});

export const fetchOpportunitiesFirstInstance = (payload) => ({
    type: actions.FetchOpportunitiesFirstInstance,
    payload
});

export const AgentSwitchingProgram = (payload) => ({
    type: actions.AgentSwitchingProgram,
    payload
});

export const AgentSwitchingProgramCompleted = (payload) => ({
    type: actions.AgentSwitchingProgramCompleted,
    payload
});

export const AgentSwitchingProgramReSet = (payload) => ({
    type: actions.AgentSwitchingProgramReSet,
    payload
});


export const SetSbacRequired=(payload)=>({
    type:actions.SET_SBAC_OVERIDE_REQUIRED,
    payload
})


export const FetchSbacOverideRequiredForOpp=(payload)=>({
    type:actions.FETCH_SBAC_REQUIRED_FOR_OPP,
    payload
})

export const CheckForClassConflictWithServicingTime=(payload)=>({
    type:actions.CheckForClassConflict,
    payload
})
