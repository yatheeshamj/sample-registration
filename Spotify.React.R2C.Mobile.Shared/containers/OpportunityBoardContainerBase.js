import React, { Component } from 'react';
import { REACT_APP_PORTAL_BASE_URL } from "../../src/config"
import * as opportunityBoardActions from "../actions/opportunityBoard"
import * as opportunityBoardSelector from "../selectors/opportunityBoard"
import * as opportunitiesSelector from "../selectors/opportunities"
import * as admissionStepsSelector from "../selectors/admissionSteps"
import * as agentProfileSelector from "../selectors/agentProfile"
import * as enrolledProgramsSelector from "../selectors/enrolledPrograms"
import * as _3rdPartyLinksActions from "../actions/3rdPartyLinks"
import * as agentTypeAction from '../../src/actions/agentTypeActions'
import * as globalParameterSelector from "../selectors/globalParameters"
import { Translate } from "spotify-shared-web/localize";




export class OpportunityBoardContainerBase extends Component {

    constructor(props) {

        super(props);

        this.toggle = this.toggle.bind(this);
        this.onOpportunitiesFilterFieldChange = this.onOpportunitiesFilterFieldChange.bind(this);
        this.setOpportunityFilter = this.setOpportunityFilter.bind(this);
        this.onOpportunitiesSortChange = this.onOpportunitiesSortChange.bind(this);
        this.onClearFilter = this.onClearFilter.bind(this);
        this.getOpportunityBoardMessage = this.getOpportunityBoardMessage.bind(this);
        this.hasUserCompletedRegistration = this.hasUserCompletedRegistration.bind(this);
        this.getOpportunityInProgressMessage = this.getOpportunityInProgressMessage.bind(this);
        this.isBackgroundCheckComplete = this.isBackgroundCheckComplete.bind(this);
        this.hasPendingTasks = this.hasPendingTasks.bind(this);
        this.displayOpportunityBoardDisclaimer = this.displayOpportunityBoardDisclaimer.bind(this);
        this.isLegacyUser = this.isLegacyUser.bind(this);

    }

    componentDidMount() {
        const {
            isFirstLoad,
            tab,
            overrideDefaultTab,
            initializeOpportunityBoard,
            agentProfile,
            initializeOpportunityBoardSecondInstance,
            initializeOpportunityBoardFirstInstance
        } = this.props;

        if (this.props.agentProfile.priorityTaskExist === true) {
            return window.location.href = `${REACT_APP_PORTAL_BASE_URL}tasks`;
        }

        if (isFirstLoad) {
            initializeOpportunityBoard({
                ...agentProfile,
                overrideDefaultTab: overrideDefaultTab
            });
        } else {
            if (tab === "In Progress") {
                // refresh data fix for Alithya Connect Case# 62567 , TFS 91090
                initializeOpportunityBoard(agentProfile);
            }
            if (tab === "Best Match" || tab === "Opportunities") {
                initializeOpportunityBoardFirstInstance(agentProfile);
            }
            if (tab === "Additional Opportunities") {
                initializeOpportunityBoardSecondInstance(agentProfile);
            }
        }


        if (tab !== undefined) {
            this.toggle(tab, false);
        }

        //this.props.isScreeningAssessmentRequired(agentProfile.agentId)
        //AAD-2153: Harver General Assessment removal (Canada)
        this.props.isScreeningAssessmentRequired(agentProfile.agentId, agentProfile.countryId)
    }

    isLegacyUser() {
        return this.props.isLegacyUser;
    }

    hasPendingTasks() {
        return this.props.hasPendingTasks;
    }

    isUserBusinessOwner() {
        return this.props.isUserBusinessOwner
    }

    isBackgroundCheckComplete() {
        return this.props.isBackgroundCheckComplete;
    }

    hasUserCompletedRegistration() {
        return this.props.isAgentTypeComplete;
    }

    getOpportunityInProgressMessage() {
        return <Translate id="opportunitiesCard.inProgressMessage" />;
    }

    getOpportunityBoardMessage() {
        const { isOpportunitiesFetching, opportunities, anyActiveOpportunityFilters } = this.props;

        if (isOpportunitiesFetching) return "";

        if (anyActiveOpportunityFilters === true) {
            if (opportunities.length === 0) {
                return "There are no Client Opportunities that match specified criteria.";
            }
        }
        if (anyActiveOpportunityFilters === false) {
            if (opportunities.length === 0) {
                return "Thank you for your interest! Currently, all Client Opportunities have been filled. However, new ones are added frequently so please check back often!";
            }
        }

        return "Click 'Learn More' for details on each Opportunity. ";
    }

    displayOpportunityBoardDisclaimer() {
        const { isOpportunitiesFetching, opportunities, anyActiveOpportunityFilters } = this.props;

        if (isOpportunitiesFetching) return false;

        if (anyActiveOpportunityFilters === true) {
            if (opportunities.length === 0) {
                return false;
            }
        }
        if (anyActiveOpportunityFilters === false) {
            if (opportunities.length === 0) {
                return false;
            }
        }

        return true;
    }

    toggle(tab, registerClick = true) {

        if (tab === this.props.tab) return;
        this.props.setTab(tab);

        switch (tab) {
            case "In Progress":
                registerClick && this.props.inProgressTabClick();
                break;

            case "Opportunities":
                //registerClick && this.props.opportunitiesTabClick();
                registerClick && this.props.initializeOpportunityBoardFirstInstance();
                break;

        }

    }

    setOpportunityFilter(filterValues) {
        const { setOpportunityFilter } = this.props;
        setOpportunityFilter(filterValues);

    }

    onOpportunitiesFilterFieldChange(filterValues) {
        const { setOpportunityFilterFeild } = this.props;
        setOpportunityFilterFeild(filterValues);

    }

    onOpportunitiesSortChange(sortField) {
        const { setOpportunitySort } = this.props;
        setOpportunitySort(sortField);

    }

    onClearFilter() {
        const { resetOpportunityFilterDefaults } = this.props;
        resetOpportunityFilterDefaults();

    }



    render() {
        return <></>
    }
}



export function OpportunityBoardContainerBaseConnect(reduxConnect, Component, extendStateToProps, extendsDispatchToProps = {}) {

    function mapStateToProps(state, props) {
        const tab = opportunityBoardSelector.getActiveTab(state);

        /* opportunities tab*/
        const isFirstLoad = opportunityBoardSelector.isFirstTimeSettingCount(state);
        const isFilterOptionsFetching = opportunityBoardSelector.isFilterOptionsFetching(state);
        //const opportunities = opportunityBoardSelector.opportunities(state);
        const opportunities = opportunityBoardSelector.opportunitiesAsArray(state);
        const opportunitiesNotInProgress = opportunityBoardSelector.opportunitiesNotInProgress(state);
        const opportunitiesForBestMatchTab = opportunityBoardSelector.opportunitiesForBestMatchTab(state);
        const opportunitiesForAdditionalTab = opportunityBoardSelector.opportunitiesForAdditionalTab(state);
        const opportunitiesWithOutFilters = opportunityBoardSelector.opportunitiesWithOutFilters(state);

        const isOpportunitiesFetching = opportunitiesSelector.isFetching(state);
        const opportunitiesSortedBy = opportunityBoardSelector.getSortedByField(state);
        const opportunityFilterOptions = opportunityBoardSelector.opportunitiesFilterOptions(state);
        const opportunitiesActiveFilter = opportunityBoardSelector.opportunitiesActiveFilter(state);
        const opportunitiesSortOptions = opportunityBoardSelector.opportunitiesSortOptions(state);
        const opportunitiesFilterCounts = opportunityBoardSelector.opportunitiesFilterCounts(state);
        const anyActiveOpportunityFilters = opportunityBoardSelector.anyActiveOpportunityFilters(state);
        const isFirstInstance = opportunityBoardSelector.isFirstInstance(state);
        const isSecondInstance = opportunityBoardSelector.isSecondInstance(state);
        const isSecondInstanceAvailable = opportunityBoardSelector.isSecondInstanceAvailable(state);
        //
        const inProgress = opportunityBoardSelector.inProgress(state);

        //
        const isAgentTypeComplete = admissionStepsSelector.isAgentTypeComplete(state);
        const isUserBusinessOwner = agentProfileSelector.isUserBusinessOwner(state);
        const isBackgroundCheckComplete = admissionStepsSelector.isBackgroundCheckComplete(state);
        const hasPendingTasks = agentProfileSelector.hasPendingTasks(state);
        const enrolledPrograms = enrolledProgramsSelector.getData(state);
        const enrollmentToCancel = enrolledProgramsSelector.getEnrollmentToCancel(state);
        const myPrograms = enrolledProgramsSelector.getMyPrograms(state);
        const isEnrolledProgramsFetching = enrolledProgramsSelector.isFetching(state);
        const isLegacyUser = agentProfileSelector.isLegacyUser(state);
        const getScreeningAssessmentRequired = agentProfileSelector.isScreeningAssessmentRequired(state);
        const opportuntiyBoardType = agentProfileSelector.opportunityBordType(state);
        const harverAssessmentRequired = globalParameterSelector.getHarverAssessmentRequired(state);
        //const getOpportunity = opportunitiesSelector.getById(state, opportunityId);

        //
        const extendedState = extendStateToProps !== undefined ? extendStateToProps(state, props) : {}
        return {

            tab
            , isFirstLoad
            , isFilterOptionsFetching
            // opportunities
            , opportunities
            , opportunityFilterOptions
            , opportunitiesActiveFilter
            , isOpportunitiesFetching
            , opportunitiesSortedBy
            , opportunitiesSortOptions
            , opportunitiesFilterCounts
            , anyActiveOpportunityFilters
            , isFirstInstance
            , isSecondInstance
            , isSecondInstanceAvailable
            , opportunitiesWithOutFilters

            // in progress
            , inProgress
            , myPrograms
            , isEnrolledProgramsFetching

            //
            , isLegacyUser
            , isAgentTypeComplete
            , isUserBusinessOwner
            , isBackgroundCheckComplete
            , hasPendingTasks
            , enrolledPrograms
            , enrollmentToCancel
            , getScreeningAssessmentRequired
            , opportuntiyBoardType
            , opportunitiesNotInProgress
            , harverAssessmentRequired
            , opportunitiesForBestMatchTab
            , opportunitiesForAdditionalTab
            //, opportunity
            // extends with passed in props if any
            , ...extendedState
        };
    }

    const mapDispatchToProps = {

        initializeOpportunityBoard: opportunityBoardActions.initializeOpportunityBoard
        , inProgressTabClick: opportunityBoardActions.inProgressTabClick
        , opportunitiesTabClick: opportunityBoardActions.opportunitiesTabClick
        , setTab: opportunityBoardActions.setTab
        , setOpportunityFilter: opportunityBoardActions.setOpportunityFilter
        , setOpportunityFilterFeild: opportunityBoardActions.setOpportunityFilterFeild
        , setOpportunitySort: opportunityBoardActions.setOpportunitySort
        , resetOpportunityFilterDefaults: opportunityBoardActions.resetOpportunityFilterDefaults
        , onGenerateScreeningAssessmentLink: _3rdPartyLinksActions.generateScreeningAssessmentLink
        , isScreeningAssessmentRequired: agentTypeAction.isScreeningAssessmentRequired
        , initializeOpportunityBoardSecondInstance: opportunityBoardActions.InitializeOpportunityBoardSecondInstance
        , initializeOpportunityBoardFirstInstance: opportunityBoardActions.InitializeOpportunityBoardFirstInstance
        , setOpportunityBoardType: opportunityBoardActions.SetOpportunityBoardType
        // extends with passed in props if any
        , ...extendsDispatchToProps
    };

    return reduxConnect(
        mapStateToProps,
        { ...mapDispatchToProps }
    )(Component);
}

