import * as opportunitiesSelector from "./opportunities"
import { getFilterOptionQuestionResponseKey } from "spotify-shared/helpers/opportunityBoard"

export const getActiveTab = (state) => state.opportunityBoard.activeTab;
export const opportunitiesFiltersObject = (state) => state.opportunityBoard.opportunitiesTab.filtersObject;
export const getSortedByField = (state) => state.opportunityBoard.opportunitiesTab.sortedBy;
export const opportunitiesSortOptions = (state) => state.opportunityBoard.opportunitiesTab.sortedByOptions;
export const opportunitiesFilterCounts = (state) => state.opportunityBoard.opportunitiesTab.filterCounts;
export const isFilterOptionsFetching = state => state.opportunityBoard.opportunitiesTab.filterOptionsFetching;
export const isFirstTimeSettingCount = state => state.opportunityBoard.opportunitiesTab.intialFilterCountCompleted === false;
export const opportunitiesActiveFilter = (state) => state.opportunityBoard.opportunitiesTab.activeFilter;
export const isFirstInstance = (state) => state.opportunityBoard.isFirstInstance;
export const isSecondInstance = (state) => state.opportunityBoard.isSecondInstance;
export const isSecondInstanceAvailable = (state) => state.opportunityBoard.isSecondInstanceAvailable;
export const isAgentSwithcingProram = state => state.opportunityBoard.opportunitiesTab.isAgentSwithcingProram;


export const allOpportunitiesFilterOptions = (state) => Object.values(state.opportunityBoard.opportunitiesTab.filtersObject);

export const opportunitiesFilterOptions = (state) => {
    let filterObjs = Object.values(state.opportunityBoard.opportunitiesTab.filtersObject);
   
    filterObjs = filterObjs.map((filterObject) => {
        return {
            ...filterObject,
            value: filterObject.value.filter((_v) => {
                const key = getFilterOptionQuestionResponseKey(filterObject, _v);
                const filterOptionCount = opportunitiesFilterCounts(state);
                const value = filterOptionCount[key];
                return isNaN(value) === false ? value >= 0 : true;
            })
        }
    }).sort((a, b) => (a.sortOrder < b.sortOrder));
   
    return filterObjs;
}



export const anyActiveOpportunityFilters = state => {
    let flag = false;
    let activeFilter = state.opportunityBoard.opportunitiesTab.activeFilter
    Object.keys(activeFilter).map(key => {
        if (activeFilter[key]) {
            flag = true;
        }
    });

    return flag;
}

export const opportunities = (state) => {

    const sortedIds = state.opportunityBoard.opportunitiesTab.data;
    const opportunities = opportunitiesSelector.getNotInProgressDataAsArray(state);

    if (!opportunities || Object.keys(opportunities).length === 0)
        return [];

    const storedlist = sortedIds.map(x => opportunities[x]);

    return storedlist;
}

//opportunitiesSecondInstance
export const opportunitiesWithOutFilters  = (state) => {

    const opportunities = opportunitiesSelector.getDataAsArray(state);

    if (!opportunities || Object.keys(opportunities).length === 0)
    return [];

    return opportunities;

}

export const opportunitiesAsArray = (state) => {

    const sortedIds = state.opportunityBoard.opportunitiesTab.data;
    const opportunities = opportunitiesSelector.getDataAsArray(state);
    return opportunities;
}

export const opportunitiesNotInProgress = (state) => {

    const sortedIds = state.opportunityBoard.opportunitiesTab.data;
    const opportunities = opportunitiesSelector.getNotInProgressDataAsArray(state);

    return opportunities;
}

export const opportunitiesForBestMatchTab = (state) => {

    const sortedIds = state.opportunityBoard.opportunitiesTab.data;
    const opportunities = opportunitiesSelector.getOppForBestMatchTabDataAsArray(state);

    return opportunities;
}

export const opportunitiesForAdditionalTab = (state) => {

    const sortedIds = state.opportunityBoard.opportunitiesTab.data;
    const opportunities = opportunitiesSelector.getOppForAdditionalTabDataAsArray(state);

    return opportunities;
}

export const inProgress = (state) => {

    const sortedIds = state.opportunityBoard.inProgressTab.data;
    const opportunities = opportunitiesSelector.getData(state);

    if (!opportunities || Object.keys(opportunities).length === 0)
        return [];

    return sortedIds.map(x => opportunities[x]);;
}

export const getActiveOpportunityFilters = state => {
    let activeFilter = state.opportunityBoard.opportunitiesTab.activeFilter

    let filteredList = Object.keys(activeFilter).filter(key => {
        if (activeFilter[key]) {
            return true
        }
        else
        {
            return false;
        }
    });
    
    return filteredList;
}





