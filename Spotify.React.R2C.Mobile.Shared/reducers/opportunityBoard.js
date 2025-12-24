import * as actionTypes from "../actionTypes/opportunityBoard"

const initalState = {
    "isSubmitting": false,
    "error": null,
    "activeTab": 'Opportunities',
    "opportunitiesTab": {
        "filtersObject": {
            "Type": {
                order: 1,
                label: "Type",
                type: "checkbox",
                filterField: "serviceTypeId",
                filterFunc: (item, value) => {
                    return Number(item.serviceTypeId) === Number(value);
                },
                value: [

                ]
            },
            "Channel": {
                order: 2,
                label: "Channel",
                type: "checkbox",
                filterField: "programServiceId",
                filterFunc: (item, value) => {
                    return Number(item.programServiceId) === Number(value);
                },
                value: [

                ]
            },
            "Servicing Times": {
                order: 3,
                label: "Servicing times",
                type: "checkbox",
                filterFunc: (item, value) => {
                    for (var i = 0; i < item.servicingTimes.length; i++) {
                        if (Number(item.servicingTimes[i].key) === Number(value))
                            return true;
                    }
                    return false;
                },
                value: [

                ]
            },
            "Course Duration": {
                order: 4,
                label: "Course duration",
                type: "checkbox",
                filterField: "courseDuration",
                filterFunc: (item, value) => {
                    if (Number(value) == 1 && Number(item.courseDuration) <= 4)
                        return true;
                    else if (Number(value) == 2 && Number(item.courseDuration) >= 4 && Number(item.courseDuration) <= 10)
                        return true;
                    else if (Number(value) == 3 && Number(item.courseDuration) > 11 && Number(item.courseDuration) <= 20)
                        return true;
                    else if (Number(value) == 4 && Number(item.courseDuration) > 20)
                        return true;
                    else
                        return false;
                },
                value: [

                ]
            },
            "Course Cost": {
                order: 5,
                label: "Course cost",
                type: "checkbox",
                filterField: "cost",
                filterFunc: (item, value) => {
                    if (Number(value) == 1 && Number(item.cost) < 50)
                        return true;
                    else if (Number(value) == 2 && Number(item.cost) >= 50 && Number(item.cost) < 100)
                        return true;
                    else if (Number(value) == 3 && Number(item.cost) >= 100)
                        return true;
                    else
                        return false;
                },
                value: [

                ]
            },
            "Language": {
                order: 6,
                label: "Language",
                type: "checkbox",
                filterField: "languageId",
                filterFunc: (item, value) => {
                    return Number(item.languageId) === Number(value);
                },
                value: [

                ]
            },
            "Equipment": {
                order: 7,
                label: "Equipment",
                type: "checkbox",
                filterField: "equipments",
                filterFunc: (item, value) => {
                    for (var i = 0; i < item.equipments.length; i++) {
                        if (Number(item.equipments[i].key) === Number(value))
                            return true;
                    }
                    return false;
                },
                value: [

                ]
            }
        },
        "filterOptionsFetching": false,
        "activeFilter": {

        },
        "intialFilterCountCompleted": false,
        "filterCounts": {

        },
        "sortedByOptions": [
            /* 
             Removed on 7/22/2020 as part of Task 84796:Change Request: Delete Ability to Sort Opportunity Board by Revenue
             {
                 label: "Service Revenue Rate",
                 value: "hourlyRate"
             },*/
            {
                label: "Deadline",
                value: "registrationDueDate"
            },
            {
                label: "Start Earning By",
                value: "startEarningDate"
            }
        ],
        "sortedBy": "",
        "data": [],
        "isFirstInstance": false,
        "isSecondInstance": false,
        "isSecondInstanceAvailable": false,

    },
    "inProgressTab": {
        "data": []
    }
};

//state must be Immutable 
export default (state = initalState, action) => {

    switch (action.type) {
        case actionTypes.SET_TAB: {
            state = {
                ...state,
                activeTab: action.payload
            }
            break;
        }

        case actionTypes.SetIntialFilterCountCompleted: {
            state = {
                ...state,
                error: null,
                opportunitiesTab: {
                    ...state.opportunitiesTab,
                    intialFilterCountCompleted: action.payload

                }
            }
            break;
        }
        case actionTypes.SetOpportunityFilterFeild: {
            state = {
                ...state,
                error: null,
                opportunitiesTab: {
                    ...state.opportunitiesTab,
                    activeFilter:
                    {
                        ...state.opportunitiesTab.activeFilter,
                        [action.payload.field]: action.payload.value
                    }

                }
            }
            break;
        }
        case actionTypes.SetOpportunityFilter: {
            state = {
                ...state,
                error: null,
                opportunitiesTab: {
                    ...state.opportunitiesTab,
                    activeFilter: {
                        ...action.payload
                    }
                }
            }
            break;
        }
        case actionTypes.SetOpportunitySort: {
            state = {
                ...state,
                error: null,
                opportunitiesTab: {
                    ...state.opportunitiesTab,
                    sortedBy: action.payload

                }
            }
            break;
        }
        case actionTypes.SetOpportunitiesTabData: {
            state = {
                ...state,
                error: null,
                opportunitiesTab: {
                    ...state.opportunitiesTab,
                    data: action.payload
                }
            }
            break;
        }

        case actionTypes.SetInProgressTabData: {
            state = {
                ...state,
                error: null,
                inProgressTab: {
                    ...state.opportunitiesTab,
                    data: action.payload
                }
            }
            break;
        }

        case actionTypes.SetFilterCounts: {
            state = {
                ...state,
                error: null,
                opportunitiesTab: {
                    ...state.opportunitiesTab,
                    filterCounts: action.payload
                }
            }
            break;
        }
        case actionTypes.FetchOpportunityFilterOptions: {
            state = {
                ...state,
                error: null,
                opportunitiesTab: {
                    ...state.opportunitiesTab,
                    filterOptionsFetching: true
                }
            }
            break;
        }
        case actionTypes.FetchOpportunityFilterOptionsComplete: {
            state = {
                ...state,
                error: null,
                opportunitiesTab: {
                    ...state.opportunitiesTab,
                    filterOptionsFetching: false,
                    filterOptions: action.payload
                }
            }
            break;
        }
        case actionTypes.FetchOpportunityFilterOptionsError: {
            state = {
                ...state,
                opportunitiesTab: {
                    ...state.opportunitiesTab,
                    filterOptionsFetching: false
                },
                error: action.payload
            }
            break;
        }
        case actionTypes.SetFilterOptionValue: {
            state = {
                ...state,
                error: null,
                opportunitiesTab: {
                    ...state.opportunitiesTab,
                    filtersObject: {
                        ...state.opportunitiesTab.filtersObject,
                        [action.payload.key]: {
                            ...state.opportunitiesTab.filtersObject[action.payload.key],
                            value: action.payload.value
                        }
                    }

                }
            }
            break;
        }

        case actionTypes.setOpportunityInstanceTypeValue: {
            state = {
                ...state,
                isFirstInstance: action.payload.isFirstInstance,
                isSecondInstanceAvailable: action.payload.isSecondInstanceAvailable,
                isSecondInstance: action.payload.isSecondInstance
            }
            break;
        }

        default:
            return state;

    }

    return state;
}
