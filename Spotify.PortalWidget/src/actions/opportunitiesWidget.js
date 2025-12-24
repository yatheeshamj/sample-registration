import * as actionTypes from "../actionTypes/opportunitiesWidget"

export const setTab = (payload) => ({
    type: actionTypes.Opportunity_Widget_SET_TAB,
    payload
});

export const initializeOpportunityWidget = (payload) => ({
    type: actionTypes.Opportunity_Widget_Initialize,
    payload
});


export const setOpportunitiesData = (payload) => ({
    type: actionTypes.Opportunity_Widget_Set_Opportunities_Data,
    payload
});

export const setInProgressData = (payload) => ({
    type: actionTypes.Opportunity_Widget_Set_In_Progress_Data,
    payload
});
