
import * as opportunities from "./opportunities"
import * as opportunityBoard from "./opportunityBoard"

export const top3 = (state, excludeOpportunityId) => {
    // return opportunityBoard.opportunities(state)
    //     .filter(x => x.crmId != excludeOpportunityId && x._isIneligible === false)
    //     .slice(0, 3);

    return opportunityBoard.opportunitiesAsArray(state)
    .filter(x => x.crmId != excludeOpportunityId && x._isIneligible === false)
    .slice(0, 3);
}


export const getOpportunityId = state => state.opportunityDetailsPage.opportunityId;
export const getExistingUserPrograms=state=>state.opportunityDetailsPage.userdataPrograms;
