import * as opportunitiesSelector from "spotify-shared/selectors/opportunities"

export const getActiveTab = (state) => state.opportunitiesWidget.activeTab;

export const opportunities = (state) => {

    const sortedIds = state.opportunitiesWidget.opportunitiesTab.data;
    const opportunities = opportunitiesSelector.getData(state);

    if (Object.keys(opportunities).length === 0)
        return [];

    return sortedIds.map(x => opportunities[x]);;
}

export const inProgress = (state) => {

    const sortedIds = state.opportunitiesWidget.inProgressTab.data;
    const opportunities = opportunitiesSelector.getData(state);

    if (Object.keys(opportunities).length === 0)
        return [];

    return sortedIds.map(x => opportunities[x]);;
}


export const isFetching = state => opportunitiesSelector.isFetching(state)



export const top3 = (state) => {
    return opportunities(state)
        .filter(x => x._isIneligible === false)
        .slice(0, 3);
}
