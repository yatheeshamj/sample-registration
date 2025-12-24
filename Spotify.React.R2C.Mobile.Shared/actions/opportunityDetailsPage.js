
import * as actions from "../actionTypes/opportunityDetailsPage"

export const InitializeOpportunityDetailsPage = payload => ({
    type: actions.InitializeOpportunityDetailsPage,
    payload
});

export const InitializeOpportunityDetailsPageComplete = payload =>({
    type: actions.InitializeOpportunityDetailsPageComplete,
    payload
});

export const FetchUserDataProgram=payload=>({
    type:actions.FetchUserDataProgram,
    payload
})
