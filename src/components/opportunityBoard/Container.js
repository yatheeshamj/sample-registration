import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import {
    OpportunityBoardContainerBase,
    OpportunityBoardContainerBaseConnect
} from "spotify-shared/containers/OpportunityBoardContainerBase"
import View from "./Container.View"
import { boostrapBreakpoints } from "../../const/helpers"
import MainLayoutFullNavAuthenticated from "../layouts/MainLayoutFullNavAuthenticated";
import { withRouter } from 'react-router-dom'
import { setShowAgentTypeComplete } from "../../actions/admissionStepActions"
import { showCompletedAgentTypeAlert } from "spotify-shared/selectors/admissionSteps"
import ConfirmModal from "spotify-shared-web/components/common/ConfirmModal"
import { Translate } from 'spotify-shared-web/localize'
import spotifyButton from 'spotify-shared-web/components/common/Button';
import { ADMISSION_STEP_ROUTES } from '../../config';
import { OpportunityType } from 'spotify-shared/constants';
import { object } from 'yup';
import AgentSwitchingProgramReasonsModal from './models/AgentSwitchingProgramReasonsModal'
import { AgentSwitchingProgramReSet } from "spotify-shared/actions/opportunities";
import SCREEN_CONFIG from "../../screensConfig";

const CURRENT_SCREEN = SCREEN_CONFIG.assessment;

class OpportunityBoardContainer extends OpportunityBoardContainerBase {
    state = {
        showPendingTasksModal: false,
        showScreeningAssessmentTaskModal: false,
        showScreeningAssementFailModal: false,
        showAgentSwitchingProgramReason: false,
        selectedOpportunityId: ''
    }
    constructor(props) {
        super(props);

        this.isMobile = this.isMobile.bind(this);
        this.onOpportunityLearnMoreClick = this.onOpportunityLearnMoreClick.bind(this);
        this.onInProgressResumeClick = this.onInProgressResumeClick.bind(this);
        this.onDismissAgentTypeSuccessAlert = this.onDismissAgentTypeSuccessAlert.bind(this);
        this.goToOpportunities = this.goToOpportunities.bind(this);
        this.onHidePendingTasksModal = this.onHidePendingTasksModal.bind(this);
        this.onCompleteProfileClick = this.onCompleteProfileClick.bind(this);
        this.onGenerateScreeningAssessmentLink = this.onGenerateScreeningAssessmentLink.bind(this);
        this.onHideAgentSwitchingProgramReasonModal = this.onHideAgentSwitchingProgramReasonModal.bind(this);

    }

    componentDidUpdate(prevProps) {
        if (this.props.isAgentChangeProgramRedirect === true && prevProps.isAgentChangeProgramRedirect === false) {
            if (this.state.selectedOpportunityId) {
                this.props.AgentSwitchingProgramReSet(false);
                this.props.history.push(`/opportunity/${this.state.selectedOpportunityId.id}`);
            }
        }
    }

    getWindowWidth() {
        // only needed for web app
        return this.props.windowWidth;
    }
    /* override from base  */
    isMobile() {
        return this.getWindowWidth() < boostrapBreakpoints.md;
    }
    onOpportunityLearnMoreClick(id) {

        const opportunity = this.props.opportunities.filter((opp) => opp.crmId === id)[0]
        if (this.props.isLegacyUser === false && this.props.hasPendingTasks) {
            this.setState({
                showPendingTasksModal: true
            });
        }
        else if (this.props.isLegacyUser === false && this.props.getScreeningAssessmentRequired.assessmentRequired == true
            && this.props.getScreeningAssessmentRequired.assessmentFailed == false && opportunity.type === OpportunityType.NewLearner) {
            this.setState({
                showScreeningAssessmentTaskModal: true
            });
        }
        else if (this.props.isLegacyUser === false && this.props.getScreeningAssessmentRequired.assessmentFailed == true
            && this.props.getScreeningAssessmentRequired.assessmentRequired == false && opportunity.type === OpportunityType.NewLearner) {
            this.setState({
                showScreeningAssementFailModal: true
            });
        }
        else {
            // When the servicing SP/Agent selects a new opportunity from the Opportunity Board and if they are already servicing another Program,
            //they should be displayed with a pop-up window for reasons.
            let isRaisePopup = false;
            if (opportunity && opportunity.programCrmId) {
                let objenrolledPrograms = this.props.enrolledPrograms;
                if (objenrolledPrograms) {
                    let enrolledPrograms = Object.values(objenrolledPrograms);

                    if (enrolledPrograms && enrolledPrograms.length > 0) {
                        var checkPrograms = enrolledPrograms.filter(prg => (prg.crmId != opportunity.programCrmId && prg.isCSPContracted === true));

                        if (checkPrograms && checkPrograms.length > 0)
                            isRaisePopup = true;
                    }
                }
            }

            if (isRaisePopup) {
                this.setState({
                    showAgentSwitchingProgramReason: true,
                    selectedOpportunityId: { id }
                });
            }
            else
                this.props.history.push(`/opportunity/${id}`);
        }
    }

    onHidePendingTasksModal() {
        this.setState({
            showPendingTasksModal: false,
            showScreeningAssessmentTaskModal: false,
            showScreeningAssementFailModal: false,
        });
    }

    onInProgressResumeClick(id, enrollmentId) {
        this.props.history.push(`/opportunity/${id}/enrollment-prerequisites/${enrollmentId}`);
    }
    onDismissAgentTypeSuccessAlert() {
        this.props.setShowAgentTypeComplete(false);
    }

    goToOpportunities() {
        //this.props.history.push("/Opportunities");

        //Refresh of Oppotunities is not calling ComponentDidMount event. 
        //Could be because of React Suspence and Lazy.
        //remounting issue : https://github.com/facebook/react/issues/15163 

        //directly call the FirstInstance load event
        this.props.initializeOpportunityBoardFirstInstance(this.props.agentProfile);

    }


    onCompleteProfileClick = () => {
        this.props.history.push(ADMISSION_STEP_ROUTES.contractorType)
    }

    onGenerateScreeningAssessmentLink() {
        this.props.onGenerateScreeningAssessmentLink()
    }

    onHideAgentSwitchingProgramReasonModal() {
        this.setState(
            {
                showAgentSwitchingProgramReason: false,
            }
        )
    }

    render() {

        const {
            tab,
            opportunities,
            isOpportunitiesFetching,
            opportunityFilterOptions,
            opportunitiesActiveFilter,
            opportunitiesSortedBy,
            opportunitiesSortOptions,
            opportunitiesFilterCounts,
            isFilterOptionsFetching,
            anyActiveOpportunityFilters,
            inProgress,
            myPrograms,
            isEnrolledProgramsFetching,
            showCompletedAgentTypeAlert,
            isFirstInstance,
            initializeOpportunityBoardSecondInstance,
            isSecondInstance,
            isSecondInstanceAvailable,
            opportunitiesWithOutFilters,
            initializeOpportunityBoard,
            initializeOpportunityBoardFirstInstance,
            opportunity,
            setOpportunityBoardType,
            opportuntiyBoardType,
            opportunitiesNotInProgress,
            harverAssessmentRequired,
            opportunitiesForBestMatchTab,
            opportunitiesForAdditionalTab,
            screenConfig
        } = this.props;
        const {
            toggle,
            onOpportunitiesFilterFieldChange,
            setOpportunityFilter,
            onOpportunitiesSortChange,
            onClearFilter,
            isMobile,
            getOpportunityBoardMessage,
            hasUserCompletedRegistration,
            getOpportunityInProgressMessage,
            hasPendingTasks,

            displayOpportunityBoardDisclaimer,
            isLegacyUser,
            onOpportunityLearnMoreClick,
            onInProgressResumeClick,
            onDismissAgentTypeSuccessAlert,
            goToOpportunities

        } = this;

        return (<Translate>

            {({ translate }) => <Fragment>
                <View
                    showCompletedAgentTypeAlert={showCompletedAgentTypeAlert}
                    onDismissAgentTypeSuccessAlert={onDismissAgentTypeSuccessAlert}
                    isEnrolledProgramsFetching={isEnrolledProgramsFetching}
                    onInProgressResumeClick={onInProgressResumeClick}
                    onOpportunityLearnMoreClick={onOpportunityLearnMoreClick}
                    isLegacyUser={isLegacyUser()}
                    activeTab={tab}
                    onToggle={toggle}
                    opportunities={opportunities}
                    isOpportunitiesFetching={isOpportunitiesFetching}
                    onOpportunitiesFilterFieldChange={onOpportunitiesFilterFieldChange}
                    setOpportunityFilter={setOpportunityFilter}
                    onOpportunitiesSortChange={onOpportunitiesSortChange}
                    opportunityFilterOptions={opportunityFilterOptions}
                    opportunitiesActiveFilter={opportunitiesActiveFilter}
                    opportunitiesSortedBy={opportunitiesSortedBy}
                    opportunitiesSortOptions={opportunitiesSortOptions}
                    onClearFilter={onClearFilter}
                    opportunitiesFilterCounts={opportunitiesFilterCounts}
                    isMobile={isMobile()}
                    isFilterOptionsFetching={isFilterOptionsFetching}
                    getOpportunityBoardMessage={getOpportunityBoardMessage}
                    anyActiveOpportunityFilters={anyActiveOpportunityFilters}
                    inProgress={inProgress}
                    myPrograms={myPrograms}
                    hasUserCompletedRegistration={hasUserCompletedRegistration()}
                    getOpportunityInProgressMessage={getOpportunityInProgressMessage}
                    hasPendingTasks={hasPendingTasks()}
                    goToOpportunities={goToOpportunities}
                    displayOpportunityBoardDisclaimer={displayOpportunityBoardDisclaimer}
                    isScreeningAssessmentRequired={this.props.getScreeningAssessmentRequired}
                    onGenerateScreeningAssessmentLink={this.onGenerateScreeningAssessmentLink}
                    isFirstInstance={isFirstInstance}
                    initializeOpportunityBoardSecondInstance={initializeOpportunityBoardSecondInstance}
                    isSecondInstance={isSecondInstance}
                    isSecondInstanceAvailable={isSecondInstanceAvailable}
                    opportunitiesWithOutFilters={opportunitiesWithOutFilters}
                    initializeOpportunityBoard={initializeOpportunityBoard}
                    initializeOpportunityBoardFirstInstance={initializeOpportunityBoardFirstInstance}
                    setOpportunityBoardType={setOpportunityBoardType}
                    opportuntiyBoardType={opportuntiyBoardType}
                    opportunitiesNotInProgress={opportunitiesNotInProgress}
                    harverAssessmentRequired={harverAssessmentRequired}
                    opportunitiesForBestMatchTab={opportunitiesForBestMatchTab}
                    opportunitiesForAdditionalTab={opportunitiesForAdditionalTab}
                    agentProfile={this.props.agentProfile}
                    enrolledPrograms={this.props.enrolledPrograms}
                    screenConfig={this.props.screenConfig}
                />

                <ConfirmModal
                    title={`${translate(`${CURRENT_SCREEN}.finishToEnroll`)}`}
                    isVisible={this.state.showPendingTasksModal}
                    onHide={this.onHidePendingTasksModal}
                    hideCancel={true}
                    hideOk={true}
                    closeButton={true}>
                    <Fragment>
                        <spotifyButton color="orange" size="" onClick={this.onCompleteProfileClick} > {translate(`${CURRENT_SCREEN}.finishRegistrationButton`)} </spotifyButton>
                    </Fragment>
                </ConfirmModal>
                <ConfirmModal
                    title={`${translate(`${CURRENT_SCREEN}.finishAssessmentMessage`)}`}
                    isVisible={this.state.showScreeningAssessmentTaskModal}
                    onHide={this.onHidePendingTasksModal}
                    hideCancel={true}
                    hideOk={true}
                    closeButton={true}>
                </ConfirmModal>
                <ConfirmModal
                    title={`${translate(`${CURRENT_SCREEN}.notMetTheRequirement`)}`}
                    isVisible={this.state.showScreeningAssementFailModal}
                    onHide={this.onHidePendingTasksModal}
                    hideCancel={true}
                    hideOk={true}
                    closeButton={true}>
                </ConfirmModal>

                <AgentSwitchingProgramReasonsModal
                    isVisible={this.state.showAgentSwitchingProgramReason}
                    onHide={this.onHideAgentSwitchingProgramReasonModal}>
                </AgentSwitchingProgramReasonsModal>

            </Fragment>}
        </Translate>);
    }
}

function extendMapStateToProps(state, props) {

    return {
        agentProfile: state.agentProfile,
        windowWidth: state.window.width,
        showCompletedAgentTypeAlert: showCompletedAgentTypeAlert(state),
        overrideDefaultTab: props.match.params.selectedTab,
        isAgentChangeProgramRedirect: state.opportunities.isAgentChangeProgramRedirect,
        screenConfig:state.app.countryConfigurations.config
    };
}
const extendsDispatchToProps = {
    setShowAgentTypeComplete,
    AgentSwitchingProgramReSet
}
export default MainLayoutFullNavAuthenticated(withRouter(OpportunityBoardContainerBaseConnect(connect, OpportunityBoardContainer, extendMapStateToProps, extendsDispatchToProps)))
