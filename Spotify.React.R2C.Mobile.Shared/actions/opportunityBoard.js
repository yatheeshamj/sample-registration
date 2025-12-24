
import * as analytics from "./analytics"
import * as actions from "../actionTypes/opportunityBoard"


export const inProgressTabClick = () => analytics.raiseEvent({
    category: 'ui action',
    action: 'TabClick',
    label: 'in Progress Tab'
});

export const opportunitiesTabClick = () => analytics.raiseEvent({
    category: 'ui action',
    action: 'TabClick',
    label: 'opportunities Tab'
});

export const setTab = (payload) => ({
    type: actions.SET_TAB,
    payload
});

export const setOpportunityFilter = (payload) => ({
    type: actions.SetOpportunityFilter,
    payload
});
export const setOpportunityFilterFeild = (payload) => ({
    type: actions.SetOpportunityFilterFeild,
    payload
});
export const setOpportunitySort = (payload) => ({
    type: actions.SetOpportunitySort,
    payload
});

export const setFilterCounts = (payload) => ({
    type: actions.SetFilterCounts,
    payload
});

export const calculateOpportunities = () => ({
    type: actions.CalculateOpportunities
});

export const setOpportunitiesTabData = (payload) => ({
    type: actions.SetOpportunitiesTabData,
    payload
});

export const setInProgressTabData = payload => ({
    type: actions.SetInProgressTabData,
    payload
});

export const fetchOpportunityFilterOptions = (payload) => ({
    type: actions.FetchOpportunityFilterOptions,
    payload
});
export const fetchOpportunityFilterOptionsComplete = (payload) => ({
    type: actions.FetchOpportunityFilterOptionsComplete,
    payload
});
export const fetchOpportunityFilterOptionsError = (payload) => ({
    type: actions.FetchOpportunityFilterOptionsError,
    payload
});

export const initializeOpportunityBoard = (payload) => ({
    type: actions.InitializeOpportunityBoard,
    payload
});

export const setFilterOptionValue = payload => ({
    type: actions.SetFilterOptionValue,
    payload
});

export const setOpportunityFilterDefaults = payload => ({
    type: actions.SetOpportunityFilterDefaults,
    payload
})
export const resetOpportunityFilterDefaults = payload => ({
    type: actions.ResetOpportunityFilterDefaults,
    payload
})

export const setIntialFilterCountCompleted = payload => ({
    type: actions.SetIntialFilterCountCompleted,
    payload
});

export const InitializeOpportunityBoardSecondInstance = (payload) => ({
    type: actions.InitializeOpportunityBoardSecondInstance,
    payload
});

export const setOpportunityInstanceTypeValue = payload => ({
    type: actions.setOpportunityInstanceTypeValue,
    payload
});

export const InitializeOpportunityBoardFirstInstance = (payload) => ({
    type: actions.InitializeOpportunityBoardFirstInstance,
    payload
});

export const SetOpportunityBoardType = (payload) => ({
    type: actions.SetOpportunityBoardType,
    payload
});

