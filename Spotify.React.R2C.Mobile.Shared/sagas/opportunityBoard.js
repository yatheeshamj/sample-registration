import { takeLatest, put, call, select, all, take, takeEvery, cancel } from "redux-saga/effects";
import * as ActionType from "../actionTypes/opportunityBoard"
import * as Actions from "../actions/opportunityBoard"
import * as opportunityActions from "../actions/opportunities"
import * as enrolledProgramsActionTypes from "../actionTypes/enrolledPrograms"
import * as enrolledProgramsActions from "../actions/enrolledPrograms"
import * as opportunityActionTypes from "../actionTypes/opportunities"
import * as opportunitiesSelector from "../selectors/opportunities"
import * as enrolledProgramsSelector from "../selectors/enrolledPrograms"
import * as countrySelector from "../selectors/country"
import * as agentProfileSelector from "../selectors/agentProfile"
import * as opportunityBoardSelector from "../selectors/opportunityBoard"
import * as globalParameterAction from "../actions/globalParameters"

import { getFilterOptionQuestionResponseKey } from "spotify-shared/helpers/opportunityBoard"

import * as opportunitiesApi from "../api/opportunities"
import { extractData } from "../schema/opportunities"
import {
    getCurrencySymbolForCountry
} from "../helpers/country"
import { FilterOptionQuestionDelimiter } from "../helpers/opportunityBoard"
import { GlobalParameterTypes } from "../constants";
import * as globalParameterSelector from "../selectors/globalParameters"



function* onFetchOpportunityFilterOptions(action) {


    //const serviceTypes = yield call(opportunitiesApi.serviceTypes);
    //yield put(Actions.setFilterOptionValue({
    //    key: "Type",
    //    value: serviceTypes.sort((a, b) => a.value < b.value ? 1 : -1)
    //}));

    //const programServices = yield call(opportunitiesApi.programServices);
    //yield put(Actions.setFilterOptionValue({
    //    key: "Channel",
    //    value: programServices.sort((a, b) => a.value < b.value ? 1 : -1)
    //}));

    //const servicingTimes = yield call(opportunitiesApi.servicingTimes);
    //yield put(Actions.setFilterOptionValue({
    //    key: "Servicing Times",
    //    value: servicingTimes
    //}));

    const agentProfile = yield select(agentProfileSelector.get);
    var agentCountryCode = yield select(countrySelector.getCountryCode);
    if (agentProfile != null && agentProfile.countryCode != null)
        agentCountryCode = agentProfile.countryCode;
    const currencySymbol = getCurrencySymbolForCountry(agentCountryCode);

    const [
        serviceTypes, programServices, servicingTimes, languages, equipments
    ] = yield all([
        call(opportunitiesApi.serviceTypes),
        call(opportunitiesApi.programServices),
        call(opportunitiesApi.servicingTimes),
        call(opportunitiesApi.languages),
        call(opportunitiesApi.equipments)
    ])

    yield put(Actions.setFilterOptionValue({
        key: "Servicing Times",
        value: servicingTimes
    }));
    yield put(Actions.setFilterOptionValue({
        key: "Channel",
        value: programServices.sort((a, b) => a.value < b.value ? 1 : -1)
    }));
    yield put(Actions.setFilterOptionValue({
        key: "Type",
        value: serviceTypes.sort((a, b) => a.value < b.value ? 1 : -1)
    }));
    yield put(Actions.setFilterOptionValue({
        key: "Language",
        value: languages.sort((a, b) => a.value < b.value ? 1 : -1)
    }));
    yield put(Actions.setFilterOptionValue({
        key: "Equipment",
        value: equipments.sort((a, b) => a.value < b.value ? 1 : -1)
    }));

    yield put(Actions.setFilterOptionValue({
        key: "Course Duration",
        value: [
            {
                key: 1,
                value: "Less than a week"
            },
            {
                key: 2,
                value: "1 - 2 Weeks"
            },
            {
                key: 3,
                value: "3 - 4 Weeks"
            },
            {
                key: 4,
                value: "Longer than 4 Weeks"
            }
        ]
    }));

    yield put(Actions.setFilterOptionValue({
        key: "Course Cost",
        value: [
            {
                key: 1,
                value: `Less than ${currencySymbol}50`
            },
            {
                key: 2,
                value: `${currencySymbol}50 - ${currencySymbol}100`
            },
            {
                key: 3,
                value: `${currencySymbol}100 & Above`
            }
        ]
    }));








    // fetch all options then lick off complete
    yield put(Actions.fetchOpportunityFilterOptionsComplete());

}

function* onSetOpportunityFilterDefaults(action) {
    //lets construct the active filter object with all null values.
    // this is needed by the calculation service for counts
    const opportunitiesFilterOptions = yield select(opportunityBoardSelector.allOpportunitiesFilterOptions);

    const defaultActiveFiltersObj = opportunitiesFilterOptions
        .map(option => option.value.map(_v => {
            const key = getFilterOptionQuestionResponseKey(option, _v);
            return {
                [key]: undefined
            }
        }))
        .flat()
        .reduce(function (acc, cur, i) {
            const key = Object.keys(cur)[0];
            acc[key] = cur[key];
            return acc;
        }, {});


    yield put(Actions.setOpportunityFilter(defaultActiveFiltersObj));
}

function* onInitializeOpportunityBoard(action) {

    //check global parameter "HarverAssessmentRequired"
    yield put(globalParameterAction.retrieveGlobalParameter('HarverAssessmentRequired'));

    // fetch Opportunities
    yield put(opportunityActions.fetchOpportunities(action.payload));

    // fetch filter options
    yield put(Actions.fetchOpportunityFilterOptions());

    // fetch programs 
    yield put(enrolledProgramsActions.getByAgent(action.payload))


    // wait for Opportunities, programs  & filter options
    yield all([
        take(ActionType.FetchOpportunityFilterOptionsComplete)
        , take(opportunityActionTypes.FetchOpportunitiesComplete)
        , take(enrolledProgramsActionTypes.ENROLLED_PROGRAM_GET_BY_AGENT_COMPLETE)
    ]);

    // cacluate totals 
    yield put(Actions.setOpportunityFilterDefaults());

    // check if we have any opportunities In Progress or Programs
    // if so default to In Progress Tab
    const opportunitiesInProgress = yield select(opportunitiesSelector.getInProgressDataAsArray);
    const myPrograms = yield select(enrolledProgramsSelector.getMyPrograms);
    if (!action.payload.overrideDefaultTab && (opportunitiesInProgress.length > 0 || myPrograms.length > 0)) {
        //fetch global parameters for opportunities whose next step is Class Confirmation Deposit
        let ifDepositStepAvailable = false;
        for (let i = 0; i < opportunitiesInProgress.length; i++) {
            if (opportunitiesInProgress[i].step && (opportunitiesInProgress[i].step.search(/deposit/i) != -1)) {
                //console.log(opportunitiesInProgress[i].step,"---Swaroop")
                ifDepositStepAvailable = true;
                break;
            }
        }
        if (ifDepositStepAvailable) {
            const noshowWindow = yield select(globalParameterSelector.getGlobalParameterByString, GlobalParameterTypes.NO_SHOW_WINDOW)
            const noshowReinstate = yield select(globalParameterSelector.getGlobalParameterByString, GlobalParameterTypes.NO_SHOW_REINSTATE)
            const noshowAutoDrop = yield select(globalParameterSelector.getGlobalParameterByString, GlobalParameterTypes.NO_SHOW_AUTO_DROP)
            //make call if they dont exist already
            if (!noshowWindow) yield put(globalParameterAction.retrieveGlobalParameter(GlobalParameterTypes.NO_SHOW_WINDOW));
            if (!noshowAutoDrop) yield put(globalParameterAction.retrieveGlobalParameter(GlobalParameterTypes.NO_SHOW_AUTO_DROP));
            if (!noshowReinstate) yield put(globalParameterAction.retrieveGlobalParameter(GlobalParameterTypes.NO_SHOW_REINSTATE));
        }

        //LMS modal erro message
        let LMStext = false
        for (let i = 0; i < opportunitiesInProgress.length; i++) {

            const { _isEnrolledFullPayment, isFinalized, _isCertificationPassed, _hasSelfPaced, _isClassAccessDisabled } = opportunitiesInProgress[i]
            if (_isEnrolledFullPayment && isFinalized && _isCertificationPassed === false && _hasSelfPaced && _isClassAccessDisabled === false) {
                LMStext = true
                break;
            }
        }
        if (LMStext) {
            //call to global parameter
            const LMSMessage = yield select(globalParameterSelector.getGlobalParameterByString, GlobalParameterTypes.LMSMessage)
            // const SBACenabled=yield select(globalParameterSelector.getGlobalParameterByString,GlobalParameterTypes.SBACCheck_GlobalIsEnabled)
            if (!LMSMessage) yield put(globalParameterAction.retrieveGlobalParameter(GlobalParameterTypes.LMSMessage))
            // if(!SBACenabled) yield put(globalParameterAction.retrieveGlobalParameter(GlobalParameterTypes.SBACCheck_GlobalIsEnabled))
        }

        yield put(Actions.setTab("In Progress"));


    }

    //desiabling override default tab. AAD-386 rules are applied and display happens.
    //if (action.payload.overrideDefaultTab) yield put(Actions.setTab(action.payload.overrideDefaultTab));
}

function* onInitializeOpportunityBoardSecondInstance(action) {

    const agentProfile = yield select(agentProfileSelector.get);
    const payload = {
        agentId: agentProfile.agentId,
        countryId: agentProfile.countryId
    };

    // fetch Opportunities
    yield put(opportunityActions.fetchOpportunitiesSecondInstance(payload));

    // wait for Opportunities, programs  & filter options
    yield all([
        take(opportunityActionTypes.FetchOpportunitiesComplete)
    ]);

}

function* onInitializeOpportunityBoardFirstInstance(action) {
    const agentProfile = yield select(agentProfileSelector.get);
    const payload = {
        agentId: agentProfile.agentId,
        countryId: agentProfile.countryId
    };

    yield put(opportunityActions.fetchOpportunitiesFirstInstance(payload));

    yield all([
        take(opportunityActionTypes.FetchOpportunitiesComplete)
    ]);

}

function* onCalculateOpportunities(action) {
    let counts = {};

    const opportunitiesInProgress = yield select(opportunitiesSelector.getInProgressDataAsArray);
    const opportunitiesNotInProgress = yield select(opportunitiesSelector.getNotInProgressDataAsArray);

    const isFirstTimeSettingCount = yield select(opportunityBoardSelector.isFirstTimeSettingCount);
    const activeFiltersObject = yield select(opportunityBoardSelector.opportunitiesActiveFilter);
    const sortedByField = yield select(opportunityBoardSelector.getSortedByField);
    const opportunitiesFiltersObject = yield select(opportunityBoardSelector.opportunitiesFiltersObject);
    const arrayOfActiveFilters = Object.keys(activeFiltersObject);
    const existingFilterOptionCount = yield select(opportunityBoardSelector.opportunitiesFilterCounts);

    const filteredData = opportunitiesNotInProgress.filter(opportunity => {
        let result = true;

        // trim results based on filter function results
        for (let i = 0; i < arrayOfActiveFilters.length; i++) {
            const filterObjectKey = arrayOfActiveFilters[i];
            const [
                filterLabel
                , selectedOption
                , selectedValue
            ] = filterObjectKey.split(FilterOptionQuestionDelimiter);

            const filterOptionConfig = opportunitiesFiltersObject[filterLabel];
            const isFilterOptionSelected = activeFiltersObject[filterObjectKey];

            if (filterOptionConfig && filterOptionConfig.filterFunc) {
                const haveResults = filterOptionConfig.filterFunc(opportunity, selectedValue);

                if (isFilterOptionSelected && haveResults === false) {
                    result = false;
                }
            }
        }

        return result;
    });

    // get counts for filter
    filteredData.forEach(opportunity => {
        for (let i = 0; i < arrayOfActiveFilters.length; i++) {
            const filterObjectKey = arrayOfActiveFilters[i];
            const [
                filterLabel
                , selectedOption
                , selectedValue
            ] = filterObjectKey.split(FilterOptionQuestionDelimiter);
            const filterOptionConfig = opportunitiesFiltersObject[filterLabel];
            if (filterOptionConfig && filterOptionConfig.filterFunc) {
                const haveResults = filterOptionConfig.filterFunc(opportunity, selectedValue);
                if (counts[filterObjectKey] === undefined) {
                    counts[filterObjectKey] = 0;
                }
                if (haveResults) {
                    counts[filterObjectKey] = counts[filterObjectKey] + 1;
                }
                if (existingFilterOptionCount[filterObjectKey] === -1) {
                    counts[filterObjectKey] = -1;
                }
            }
        }
    });


    if (isFirstTimeSettingCount) {
        // when inital count is done, before user has filtered data
        // set count to -1 for filter options that are not valued for the data avaiable
        // this will remove the option from the ui
        for (let i = 0; i < arrayOfActiveFilters.length; i++) {
            const filterObjectKey = arrayOfActiveFilters[i];
            if (counts[filterObjectKey] === 0) {
                counts[filterObjectKey] = -1;
            }
        }

        yield put(Actions.setIntialFilterCountCompleted(true));
    }



    // filter & sort logic  then kick off setData
    filteredData.sort((a, b) => {

        if (isFirstTimeSettingCount || sortedByField == "") {
            //default sort

            if (b._isEligible > a._isEligible || b.sponsored > a.sponsored) return 1;
            if (b._isEligible < a._isEligible || b.sponsored < a.sponsored) return -1;

            return 0;

        } else {

            if (a[sortedByField] > b[sortedByField]) return 1;
            if (a[sortedByField] < b[sortedByField]) return -1;

            return 0;
        }
    });
    const sortedArrayOfids = filteredData.map(x => x.crmId);

    yield put(Actions.setOpportunitiesTabData(sortedArrayOfids));

    const sortedInProgressData = opportunitiesInProgress
        .sort((a, b) => (a.name < b.name ? 1 : -1))
        .map(x => x.crmId);

    yield put(Actions.setInProgressTabData(sortedInProgressData));


    //set filter counts 
    yield put(Actions.setFilterCounts(counts));


}

function* onFilterSortChange(action) {
    yield put(Actions.calculateOpportunities());
}

function* onSetOpportunityFilterFeild(action) {
    yield put(Actions.calculateOpportunities());

}

function* onResetOpportunityFilterDefaults(action) {
    yield put(Actions.setOpportunitySort(""));
    yield put(Actions.setOpportunityFilterDefaults());
}

function* onSetOpportunityBoardType(action) {
    const agentProfile = yield select(agentProfileSelector.get);

    const payload = {
        agentId: agentProfile.agentId,
        data: action.payload
    };

    try {
        const response = yield call(opportunitiesApi.updateOpportunityBoardType, payload);

    }
    catch (e) {
        //yield put(Actions.fetchOpportunitiesError(e));
    }

}

export default function* watcher() {
    yield takeLatest(ActionType.FetchOpportunityFilterOptions, onFetchOpportunityFilterOptions);
    yield takeLatest(ActionType.InitializeOpportunityBoard, onInitializeOpportunityBoard);
    yield takeLatest(ActionType.CalculateOpportunities, onCalculateOpportunities);
    yield takeLatest(ActionType.SetOpportunityFilter, onFilterSortChange);
    yield takeLatest(ActionType.SetOpportunityFilterFeild, onSetOpportunityFilterFeild);
    yield takeLatest(ActionType.SetOpportunitySort, onFilterSortChange);
    yield takeLatest(ActionType.SetOpportunityFilterDefaults, onSetOpportunityFilterDefaults);
    yield takeLatest(ActionType.ResetOpportunityFilterDefaults, onResetOpportunityFilterDefaults);
    yield takeLatest(ActionType.InitializeOpportunityBoardSecondInstance, onInitializeOpportunityBoardSecondInstance);
    yield takeLatest(ActionType.InitializeOpportunityBoardFirstInstance, onInitializeOpportunityBoardFirstInstance);
    yield takeLatest(ActionType.SetOpportunityBoardType, onSetOpportunityBoardType);
}  
