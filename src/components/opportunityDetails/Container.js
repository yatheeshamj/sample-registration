import React, { Component } from 'react';
import { connect } from "react-redux";
import {
    OpportunityDetailsContainerBase,
    OpportunityDetailsContainerBaseConnect
} from "spotify-shared/containers/OpportunityDetailsContainerBase"
import View from "./Container.View"
import { boostrapBreakpoints } from "../../const/helpers"
import MainLayoutFullNavAuthenticated from "../layouts/MainLayoutFullNavAuthenticated";
import { withRouter } from 'react-router-dom'
import { setShowAgentTypeComplete } from "../../actions/admissionStepActions"
import { showCompletedAgentTypeAlert } from "spotify-shared/selectors/admissionSteps"
import { COUNTRY_IDS,OpportunityType } from "spotify-shared/constants"
import { agentProfile } from 'spotify-shared/selectors';
import { ThreeSixty } from '@material-ui/icons';
import { checkEligiblity, clearEligiblity } from 'spotify-shared/actions/enrolledPrograms';
import * as enrolledProgramSelectors from "spotify-shared/selectors/enrolledPrograms"
import { CheckIfOppType } from "spotify-shared/helpers/opportunity"

//ASI-3486
const checkIfAlertDisplayed=(data,type)=>{
    if(data && data!=null && data.length>0){
        if(type==OpportunityType.NewLearner || type==OpportunityType.SkillEnhancement || type==OpportunityType==OpportunityType.CrossCertification){
            return true
        }
        return false

    }
    return false
}


class OpportunityDetailsContainer extends OpportunityDetailsContainerBase {

    constructor(props) {
        super(props);
        this.state = {
            ShowEnrollCourseModal: false
        };

        localStorage.removeItem('redirect_path')

        this.onEnrollCourseClick = this.onEnrollCourseClick.bind(this);
        this.onHideEnrollCourseModal = this.onHideEnrollCourseModal.bind(this);
        this.onLearnMoreClick = this.onLearnMoreClick.bind(this);
        this.onInProgressResumeClick = this.onInProgressResumeClick.bind(this);

        this.onSubmitClick = this.onSubmitClick.bind(this);
        this.shouldShowEnrollCourseModal = this.shouldShowEnrollCourseModal.bind(this);

        this.isMobile = this.isMobile.bind(this);
        this.getWindowWidth = this.getWindowWidth.bind(this);
        this.toggleRelatedOpportunities = this.toggleRelatedOpportunities.bind(this);
        this.areRelatedOpportunitiesVisible = this.areRelatedOpportunitiesVisible.bind(this);
        this.onDismissAgentTypeSuccessAlert = this.onDismissAgentTypeSuccessAlert.bind(this);
        this.onCheckForConflict = this.onCheckForConflict.bind(this);
        this.onHideConflictModal = this.onHideConflictModal.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        super.componentDidUpdate(prevProps, prevState);

        if (this.props.opportunity) {
            window.clientId = this.props.opportunity.clientId
            window.clientName = this.props.opportunity.clientName
            window.opportunityId = this.props.opportunity.crmId
            window.opportunityName = this.props.opportunity.name
        }

        if (this.props.getScreeningAssessmentRequired != null && this.props.opportunity && this.props.opportunity.type === OpportunityType.NewLearner &&
            (this.props.getScreeningAssessmentRequired.assessmentRequired == true || this.props.getScreeningAssessmentRequired.assessmentFailed == true)
        ) {
            this.props.history.push(`/opportunities`);
        }


    }

    componentWillUnmount() {
        window.clientId = undefined
        window.clientName = undefined
        window.opportunityId = undefined
        window.opportunityName = undefined
    }

    getWindowWidth() {
        // only needed for web app

        return this.props.windowWidth;
    }

    /* override from base  */
    isMobile() {

        return this.getWindowWidth() < boostrapBreakpoints.md;
    }


    toggleRelatedOpportunities() {

        this.setState((prevState, props) => ({
            ...prevState,
            RelatedOpportunitiesState: !prevState.RelatedOpportunitiesState

        }))
    }

    areRelatedOpportunitiesVisible() {

        return ((this.isMobile() && this.state.RelatedOpportunitiesState) || (this.isMobile() === false));
    }




    shouldShowEnrollCourseModal() {
        if (this.props.opportunityEnrolling.isComplete == true) this.onHideEnrollCourseModal();
        return this.props.opportunity && this.props.opportunity.crmId === this.props.opportunityEnrolling.id;
    }

    onHideConflictModal() {
        this.props.clearEligiblity();
    }

    onEnrollCourseClick() {
        this.props.screenConfig.PeakSeason.applied
            ? this.props.checkEligiblity(this.props.agentProfile.agentId, this.props.opportunity.crmId)
            : this.props.stageOpportunityToEnroll(this.props.opportunity.crmId);
        
    }

    onHideEnrollCourseModal() {
        if (this.props.opportunityEnrolling.isComplete) {
            var enrollmentCrmId = this.props.opportunityEnrolling.data.enrollmentCrmId;
            this.props.stageOpportunityToEnroll(null);
            this.props.history.push(`/opportunity/${this.props.opportunityId}/enrollment-prerequisites/${enrollmentCrmId}`);
        }
        else if (this.props.opportunityEnrolling.isSubmitting === false) {
            this.props.cancelEnrollmentRefresh(this.props.agentProfile.agentId, this.props.agentProfile.countryId, true, false);
            this.props.stageOpportunityToEnroll(null);
            this.props.history.push(`/opportunity/${this.props.opportunityId}`);
        }
    }


    onInProgressResumeClick(id, enrollmentId) {
        this.props.history.push(`/opportunity/${id}/enrollment-prerequisites/${enrollmentId}`);
    }

    onLearnMoreClick(id) {
        this.props.history.push(`/opportunity/${id}`);
    }

    onSubmitClick(values) {
        if (this.props.opportunityEnrolling.isComplete === false) {
            const typeId = this.props.opportunity.typeId;
            const id = this.props.opportunityId;
            this.props.expressInterestInOpportunity(this.props.agentProfile.agentId, this.props.opportunityId, values.SelectClass, this.props.opportunity.typeId, values.ConsentClassNoShow);
        }

    }

    onDismissAgentTypeSuccessAlert() {
        this.props.setShowAgentTypeComplete(false);
    }

    onCheckForConflict(values) {
        console.log(values)
        const { agentProfile, opportunity } = this.props
        if (agentProfile.countryId == COUNTRY_IDS.US && CheckIfOppType(opportunity.type)) {
            this.props.checkforClassConflict(values)
        }
    }
    render() {
        const {
            relatedOpportunities
            , opportunity
            , isFetching
            , opportunityEnrolling
            , enrollmentAssessments
            , showCompletedAgentTypeAlert
            , conflictCheckData
        } = this.props;

        const {
            hasUserCompletedRegistration,
            showEnrollNowBtn,
            onHideEnrollCourseModal,
            onSubmitClick,
            isEnrollmentInprocess,
            isUserBusinessOwner,
            isLegacyUser,
            hasPendingTasks,
            onEnrollCourseClick,
            onDownloadPDF,
            disableEnrollNowBtn,
            shouldShowEnrollCourseModal,
            onLearnMoreClick,
            onInProgressResumeClick,
            isMobile,
            toggleRelatedOpportunities,
            areRelatedOpportunitiesVisible,
            onDismissAgentTypeSuccessAlert,
            onCheckForConflict,
            onHideConflictModal,
        } = this;

        return (<View
            showCompletedAgentTypeAlert={showCompletedAgentTypeAlert}
            onDismissAgentTypeSuccessAlert={onDismissAgentTypeSuccessAlert}
            enrollmentAssessments={enrollmentAssessments}
            onInProgressResumeClick={onInProgressResumeClick}
            onLearnMoreClick={onLearnMoreClick}
            disableEnrollNowBtn={disableEnrollNowBtn()}
            onEnrollCourseClick={onEnrollCourseClick}
            isLegacyUser={isLegacyUser()}
            isUserBusinessOwner={isUserBusinessOwner()}
            onHideEnrollCourseModal={onHideEnrollCourseModal}
            shouldShowEnrollCourseModal={shouldShowEnrollCourseModal()}
            onSubmitClick={onSubmitClick}
            isFetching={!opportunity || isFetching}
            opportunity={opportunity}
            relatedOpportunities={relatedOpportunities}
            hasUserCompletedRegistration={hasUserCompletedRegistration()}
            hasPendingTasks={hasPendingTasks()}
            showEnrollNowBtn={showEnrollNowBtn()}
            isEnrollmentInprocess={isEnrollmentInprocess()}
            onDownloadPDF={onDownloadPDF}
            opportunityEnrolling={opportunityEnrolling}
            stageOpportunityToEnroll={this.props.stageOpportunityToEnroll}
            isMobile={isMobile}
            toggleRelatedOpportunities={toggleRelatedOpportunities}
            areRelatedOpportunitiesVisible={areRelatedOpportunitiesVisible()}
            isScreeningAssessmentRequired={this.props.getScreeningAssessmentRequired}
            agentsCountry={this.props.agentProfile.countryCode}
            eligiblity={this.props.eligiblity}
            onHideConflictModal={onHideConflictModal}
            checkforClassConflict={onCheckForConflict}
            conflictCheckData={conflictCheckData}
        />);
    }
}



function extendMapStateToProps(state, props) {
    const opportunityId = props.match.params.id;
    const eligiblity = enrolledProgramSelectors.checkEligiblity(state);
    const screenConfig = state.app.countryConfigurations.config;

    return {
        screenConfig,
        agentProfile: state.agentProfile,
        windowWidth: state.window.width,
        opportunityId,
        showCompletedAgentTypeAlert: showCompletedAgentTypeAlert(state),
        eligiblity: eligiblity,

    };
}
const extendsDispatchToProps = {
    setShowAgentTypeComplete,
    checkEligiblity,
    clearEligiblity
}


export default MainLayoutFullNavAuthenticated(withRouter(OpportunityDetailsContainerBaseConnect(connect, OpportunityDetailsContainer, extendMapStateToProps, extendsDispatchToProps)))
