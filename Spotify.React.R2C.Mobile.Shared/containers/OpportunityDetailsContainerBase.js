import React, { Component } from 'react';

import * as opportunityDetailsPageActions from "../actions/opportunityDetailsPage"
import * as opportunitiesSelector from "../selectors/opportunities"
import * as opportunityDetailsPageSelector from "../selectors/opportunityDetailsPage"
import * as agentProfileSelector from "../selectors/agentProfile"
import * as admissionStepsSelector from "../selectors/admissionSteps"
import * as enrolledProgramsSelector from "../selectors/enrolledPrograms"
import { stageEnrollmentToCancel } from '../actions/enrolledPrograms';
import { downloadPDFForWeb } from "../actions/opportunityAnnouncement"

import * as opportunityActions from "../actions/opportunities"
import * as enrolledProgramActions from "../actions/enrolledPrograms"
import * as agentTypeAction from '../../src/actions/agentTypeActions'




export class OpportunityDetailsContainerBase extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // object to track if RelatedOpportunities are visible or not
            RelatedOpportunitiesState: false
        };

        this.initializeOpportunityDetailsPageHelper = this.initializeOpportunityDetailsPageHelper.bind(this);
        this.hasUserCompletedRegistration = this.hasUserCompletedRegistration.bind(this);
        this.isEnrollmentInprocess = this.isEnrollmentInprocess.bind(this);
        this.isUserBusinessOwner = this.isUserBusinessOwner.bind(this);
        this.isLegacyUser = this.isLegacyUser.bind(this);
        this.isBackgroundCheckComplete = this.isBackgroundCheckComplete.bind(this);
        this.hasPendingTasks = this.hasPendingTasks.bind(this);
        this.onDownloadPDF = this.onDownloadPDF.bind(this);
        this.showEnrollNowBtn = this.showEnrollNowBtn.bind(this);
        this.disableEnrollNowBtn = this.disableEnrollNowBtn.bind(this);
    }




	componentDidMount() {
		this.initializeOpportunityDetailsPageHelper();
    }

    componentDidUpdate(prevProps, prevState) {

        if (prevProps.opportunityId !== this.props.opportunityId) {
            this.initializeOpportunityDetailsPageHelper();
        }
    }

    initializeOpportunityDetailsPageHelper() {
        const {
            opportunityId
            , initializeOpportunityDetailsPage
            , agentProfile
        } = this.props;

		this.props.isScreeningAssessmentRequired(agentProfile.agentId, agentProfile.countryId);

		if (opportunityId !== null && agentProfile !== null) {
            initializeOpportunityDetailsPage({
                opportunityId,
                agentId: agentProfile.agentId,
                countryId: agentProfile.countryId
            }

            );
        }
    }
    onDownloadPDF(pdfLink) {
        this.props.downloadPDFForWeb(pdfLink);
    }

    hasPendingTasks() {
        return this.props.hasPendingTasks;
    }

    isLegacyUser() {
        return this.props.isLegacyUser;
    }

    isUserBusinessOwner() {
        return this.props.isUserBusinessOwner
    }

    isEnrollmentInprocess() {
        const { opportunity } = this.props;
        return opportunity && opportunity._inProgress;
    }

    disableEnrollNowBtn() {
        return this.props.isLegacyUser === false && this.props.hasPendingTasks;
    }

    showEnrollNowBtn() {
        //Do not show button IF Opportunity Detail screen is in one of the following states:
        //-	Outstanding Tasks state
        //    - Enrollment Prerequisites in Progress
        //        - Certification in progress
        //        - Not Eligible
        //            - Course is Full

        const { opportunity } = this.props;
        return opportunity &&
            opportunity._isIneligible === false &&
            opportunity._isCourseFull === false &&
            opportunity._isInCertification === false &&
            this.isEnrollmentInprocess() === false
    }

    hasUserCompletedRegistration() {
        return this.props.isAgentTypeComplete;
    }

    isBackgroundCheckComplete() {
        return this.props.isBackgroundCheckComplete;
    }

    render() {
        return <></>
    }
}



export function OpportunityDetailsContainerBaseConnect(reduxConnect, Component, extendStateToProps, extendsDispatchToProps = {}) {

    function mapStateToProps(state, props) {


        const opportunityId = opportunityDetailsPageSelector.getOpportunityId(state);
        const isFetching = opportunitiesSelector.isFetching(state);
        const opportunity = opportunitiesSelector.getById(state, opportunityId);
        const relatedOpportunities = opportunityDetailsPageSelector.top3(state, opportunityId) || [];
        const opportunityEnrolling = opportunitiesSelector.getOpportunityEnrolling(state);


        const isUserBusinessOwner = agentProfileSelector.isUserBusinessOwner(state);
        const isAgentTypeComplete = admissionStepsSelector.isAgentTypeComplete(state);
        const isBackgroundCheckComplete = admissionStepsSelector.isBackgroundCheckComplete(state);
        const isLegacyUser = agentProfileSelector.isLegacyUser(state);
        const extendedState = extendStateToProps !== undefined ? extendStateToProps(state, props) : {}
        const hasPendingTasks = agentProfileSelector.hasPendingTasks(state);

        const enrollmentToCancel = enrolledProgramsSelector.getEnrollmentToCancel(state);

		const enrollmentAssessments = opportunitiesSelector.getEnrollmentAssessmentsForOpportunity(state, opportunityId);
		const getScreeningAssessmentRequired = agentProfileSelector.isScreeningAssessmentRequired(state);
        const activeUserPrograms=opportunityDetailsPageSelector.getExistingUserPrograms(state);
        const conflictCheckData=opportunitiesSelector.getClassConflictData(state);


        return {
            opportunityId
            , opportunity
            , isFetching
            , relatedOpportunities
            , isUserBusinessOwner
            , isAgentTypeComplete
            , isLegacyUser
            , isBackgroundCheckComplete
            , hasPendingTasks
            , enrollmentToCancel
            , opportunityEnrolling
            , enrollmentAssessments
			, getScreeningAssessmentRequired
            ,activeUserPrograms
            ,conflictCheckData

            // extends with passed in props if any
            , ...extendedState
        };
    }
    const mapDispatchToProps = {


        initializeOpportunityDetailsPage: opportunityDetailsPageActions.InitializeOpportunityDetailsPage

        , stageEnrollmentToCancel
        , downloadPDFForWeb
        , expressInterestInOpportunity: opportunityActions.expressInterestInOpportunity
		, stageOpportunityToEnroll: opportunityActions.stageOpportunityToEnroll
		, cancelEnrollmentRefresh: enrolledProgramActions.cancelEnrollmentRefresh
		, isScreeningAssessmentRequired: agentTypeAction.isScreeningAssessmentRequired
        ,checkforClassConflict:opportunityActions.CheckForClassConflictWithServicingTime


        // extends with passed in props if any
        , ...extendsDispatchToProps
    };

    return reduxConnect(
        mapStateToProps,
        { ...mapDispatchToProps }
    )(Component);
}

