import "./card.scss"

import React, { Fragment, Component, useState } from 'react';

import { Row, Col, Button, Modal } from 'react-bootstrap';
import CardTitle from "./cardtitle";
import Details from "./details";
import InProgressDetails from "./inProgressDetails";
import InProgressActions from "./inProgressActions";
import classNames from "classnames"
import Breakdown from "./breakdown";
import Banner from "./banner";
import VideoModal from "../videoModal"
import CancelEnrollmentModal from "../CancelEnrollmentModal"
import DropEnrollmentModalConnect from "../DropEnrollmentModal"
import RescheduleCourseModal from "../RescheduleCourseModal"
import { GlobalParameterTypes, OpportunityStatus } from "spotify-shared/constants"
import { downloadPDFForWeb } from "spotify-shared/actions/opportunityAnnouncement"
import * as _3rdPartyLinksActions from "spotify-shared/actions/3rdPartyLinks"
import { stageEnrollmentToCancel } from 'spotify-shared/actions/enrolledPrograms';
import EnrollCourseModal from "../EnrollCourseModal"
import * as enrolledProgramSelectors from "spotify-shared/selectors/enrolledPrograms"
import * as enrolledProgramActions from "spotify-shared/actions/enrolledPrograms"
import * as performanceMetricsSelector from "spotify-shared/selectors/performanceMetrics"
import * as LinksSelector from "spotify-shared/selectors/3rdPartyLinks";
import * as agentProfileSelector from "../../../../spotify.React.R2C.Mobile.Shared/selectors/agentProfile"
import * as agentTypeAction from '../../../../src/actions/agentTypeActions'
import NoshowForfeitModal from "../NoShowForfeitModal";
import { retrieveGlobalParameter } from "spotify-shared/actions/globalParameters";
import { getGlobalParameterByString } from "spotify-shared/selectors/globalParameters";
// getGlobalParameterByString
import LMSMessageModal from "../LMSMessageModal";
import { FetchSbacOverideRequiredForOpp, CheckForClassConflictWithServicingTime } from "spotify-shared/actions/opportunities"

import PCCheckModal from "../../../../src/components/enrollmentPrerequisites/pccheck";
import PhotoIdModal from "../../../../src/components/enrollmentPrerequisites/photoIdModal/index";
import * as pcCheckSelectors from "spotify-shared/selectors/pcCheck";
import * as photoIdSelectors from "spotify-shared/selectors/photoId";
import * as photoIdActions from "spotify-shared/actions/photoId";
import { createPCCheckAssessment } from "spotify-shared/actions/pcCheck";
import * as opportunitySelector from "spotify-shared/selectors/opportunities";
import { CheckIfOppType } from "spotify-shared/helpers/opportunity";

let DropEnrollmentModal;// this will be initialized inside connect passing in connect with proper store config
//TODO 
/*
 Please Note there is code here that will be common to Mobile APP
 and  will need to get pushed into a base class in a future date.
 Take into account when designing Methods 

 */
class Card extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ShowEnrollCourseModal: false,
            KnowledgeZoneFirstCallDone: false,
            noShowForfeitModal: false,
            LMSMessageModal: false,
        };

        this.onWatchVideoClick = this.onWatchVideoClick.bind(this);
        this.onHideVideoModal = this.onHideVideoModal.bind(this);
        this.onDownloadPDF = this.onDownloadPDF.bind(this);
        this.onLearnMoreClick = this.onLearnMoreClick.bind(this);
        this.canLearnMore = this.canLearnMore.bind(this);
        this.onViewComplexHoursDetailClick = this.onViewComplexHoursDetailClick.bind(this);

        this.onOpenStarmatic = this.onOpenStarmatic.bind(this);
        this.onGenerateChatRoom = this.onGenerateChatRoom.bind(this);
        this.onGenerateKnowledgeZone = this.onGenerateKnowledgeZone.bind(this);
        this.onGeneratespotifyKnowledgeZone = this.onGeneratespotifyKnowledgeZone.bind(this);
        //this.onSetspotifyKnowledgeZone = this.onSetspotifyKnowledgeZone.bind(this);

        //#region  Enroll Course

        this.onEnrollCourseClick = this.onEnrollCourseClick.bind(this);
        this.onHideEnrollCourseModal = this.onHideEnrollCourseModal.bind(this);

        //#endregion 

        //#region  Cancel Enrollment
        this.onCancelEnrollmentSubmit = this.onCancelEnrollmentSubmit.bind(this);
        this.shouldShowCancelEnrollmentModal = this.shouldShowCancelEnrollmentModal.bind(this);
        this.onHideCancelEnrollmentModal = this.onHideCancelEnrollmentModal.bind(this);
        this.onCancelEnrollmentClick = this.onCancelEnrollmentClick.bind(this);
        //#endregion 

        //#region  Drop Enrollment
        this.onDropEnrollmentSubmit = this.onDropEnrollmentSubmit.bind(this);
        this.onDropEnrollmentClick = this.onDropEnrollmentClick.bind(this);
        this.onHideDropEnrollmentModal = this.onHideDropEnrollmentModal.bind(this);
        //#endregion 

        //#region  Reschedule Enrollment
        this.onRescheduleEnrollmentSubmit = this.onRescheduleEnrollmentSubmit.bind(this);
        this.onHideRescheduleEnrollmentModal = this.onHideRescheduleEnrollmentModal.bind(this);
        this.onRescheduleEnrollmentClick = this.onRescheduleEnrollmentClick.bind(this);
        this.shouldShowRescheduleEnrollmentModal = this.shouldShowRescheduleEnrollmentModal.bind(this);

        //#endregion 

        //#region In Progress Specific

        this.isInProgress = this.isInProgress.bind(this);
        this.onGenerateSelfPaced = this.onGenerateSelfPaced.bind(this);
        this.onGenerateVirtualClassroom = this.onGenerateVirtualClassroom.bind(this);
        this.onGenerateCrowdhub = this.onGenerateCrowdhub.bind(this);
        this.onInProgressResumeClick = this.onInProgressResumeClick.bind(this);

        //#endregion
        //Noshow deposit
        this.showNoShowForfeitModal = this.showNoShowForfeitModal.bind(this);
        this.hideNoShowForfeitModal = this.hideNoShowForfeitModal.bind(this);

        //LMs Modal
        this.hideLMSMessageModal = this.hideLMSMessageModal.bind(this);
        this.onCheckForConflict = this.onCheckForConflict.bind(this);


    }

    componentDidMount() {
        const {
            agentProfile,
            getScreeningAssessmentRequired
        } = this.props

        setTimeout(() => {

            if (this.props.dropStatusReasons.length === 0 && this.props.isDropFetching === false) this.props.getDropStatusReasons();

        }, 1000)

        if (!getScreeningAssessmentRequired) this.props.isScreeningAssessmentRequired(agentProfile.agentId, agentProfile.countryId);
        if (this.props.noShowDepositReceived == 1 && (!this.props.noShowRefund)) {
            //make call to global param
            this.props.retrieveGlobalParameter(GlobalParameterTypes.REFUND_WINDOW)
        }
    }
    componentDidUpdate(prevProps) {
        // const {opportunityId,enrollmentId,classSchedule}=this.state
        if (prevProps.hasactivesbacoverride == null && this.props.hasactivesbacoverride == true) {
            this.setState({ LMSMessageModal: true })
        }
        if (prevProps.hasactivesbacoverride == null && this.props.hasactivesbacoverride == false) {
            this.props.generateSelfPaced({ primaryClassSchedule: this.props.primaryClassSchedule, opportunitycrmId: this.props.enrollmentId })
        }
    }

    //#region  Enroll Course
    onEnrollCourseClick() {
        if (this.props.screenConfig.PeakSeason.applied) {
            this.props.checkEligiblity();
        }
        this.setState({ ShowEnrollCourseModal: true })
    }

    onHideEnrollCourseModal() {
        if (this.props.enrollmentToCancel.isComplete) {
            this.props.cancelEnrollmentRefresh(this.props.agentProfile.agentId, this.props.agentProfile.countryId, false, false);
        }
        this.props.stageEnrollmentToCancel(null);
    }
    //#endregion 

    //#region Drop Enrollment

    shouldShowDropEnrollmentModal() {


        return this.props.crmId === this.props.enrollmentToCancel.id;


    }


    onDropEnrollmentSubmit(values) {
        if (this.props.enrollmentToCancel.isComplete == false) {
            if (values != null && values.dropPolicy == true) {
                if (window.confirm('If you drop this class, you may not be able to enroll in another opportunity for up to 30 days. Are you sure you want to drop the class??')) {

                    this.props.dropStagedEnrollment(this.props.agentProfile.agentId, this.props.crmId, values.dropReason, true);
                }
                else {
                    this.props.cancelEnrollmentRefresh(this.props.agentProfile.agentId, this.props.agentProfile.countryId, true, false);
                    this.props.stageEnrollmentToCancel(null);

                }

            }
        }
        else {
            this.props.cancelEnrollmentRefresh(this.props.agentProfile.agentId, this.props.agentProfile.countryId, true, false);
            this.props.stageEnrollmentToCancel(null);
            this.props.goToOpportunities();
        }

    }

    onDropEnrollmentClick() {
        // this.setState({noShowForfeitModal:true})
        this.hideNoShowForfeitModal()
        if (this.props.crmId != null)
            this.props.stageEnrollmentToCancel(this.props.crmId);
        else
            this.props.stageEnrollmentToCancel(null);

    }

    onHideDropEnrollmentModal() {
        if (this.props.enrollmentToCancel.isComplete) {
            this.props.cancelEnrollmentRefresh(this.props.agentProfile.agentId, this.props.agentProfile.countryId, false, false);
        }
        this.props.stageEnrollmentToCancel(null);
        this.setState({ noShowForfeitModal: false })
    }

    //#endregion 

    //#region  Cancel Enrollment

    onCancelEnrollmentSubmit() {
        if (this.props.enrollmentToCancel.isComplete == false) {
            this.props.cancelStagedEnrollment(this.props.agentProfile.agentId, this.props.enrollmentId);
        }
        else {
            this.props.cancelEnrollmentRefresh(this.props.agentProfile.agentId, this.props.agentProfile.countryId, true, true);
            this.props.stageEnrollmentToCancel(null);
            this.props.goToOpportunities()
        }
    }

    shouldShowCancelEnrollmentModal() {
        return this.props.enrollmentToCancel.id === this.props.enrollmentId;
    }

    onHideCancelEnrollmentModal() {
        if (this.props.enrollmentToCancel.isComplete) {
            this.props.cancelEnrollmentRefresh(this.props.agentProfile.agentId, this.props.agentProfile.countryId, false, true);
        }
        this.props.stageEnrollmentToCancel(null);
    }
    onCancelEnrollmentClick() {

        this.props.stageEnrollmentToCancel(this.props.enrollmentId);

    }

    //#endregion 


    //#region Reschedule Enrollment

    shouldShowRescheduleEnrollmentModal() {
        return this.props.crmId === this.props.enrollmentToReschedule.id;
    }

    onRescheduleEnrollmentSubmit(values) {
        if (this.props.enrollmentToReschedule.isComplete == false) {
            if (values != null) {
                if (window.confirm('Are you sure you want to reschedule the class time?')) {
                    this.props.rescheduleClass(this.props.agentProfile.agentId, this.props.crmId, values.newClass);
                }
                else {
                    this.props.cancelEnrollmentRefresh(this.props.agentProfile.agentId, this.props.agentProfile.countryId, false, true);
                    this.props.stageClassToReschedule(null);
                }
            }
        }
        else {
            this.props.cancelEnrollmentRefresh(this.props.agentProfile.agentId, this.props.agentProfile.countryId, false, true);
            this.props.stageClassToReschedule(null);
        }
    }

    onRescheduleEnrollmentClick() {
        if (this.props.crmId != null)
            this.props.stageClassToReschedule(this.props.crmId);
        else
            this.props.stageClassToReschedule(null);

    }

    onHideRescheduleEnrollmentModal() {
        if (this.props.enrollmentToReschedule.isComplete) {
            this.props.cancelEnrollmentRefresh(this.props.agentProfile.agentId, this.props.agentProfile.countryId, false, true);
        }
        this.props.stageClassToReschedule(null);
    }

    //#endregion

    isInProgress() {
        return this.props._inProgress || this.props._isCertificationPassed;
    }



    onGenerateSelfPaced(primaryClassSchedule, opportunityId, enrollmentId) {
        this.props.FetchSbacOverideRequiredForOpp({ opportunityId, enrollmentId })
        if (this.props.hasactivesbacoverride != null) {
            if (this.props.hasactivesbacoverride == true) {
                this.setState({ LMSMessageModal: true })
            }

        }

    }

    onGenerateVirtualClassroom(payload) {
        this.props.generateVirtualClassroom(payload);
    }

    onGenerateCrowdhub({ enrolledProgram, programCrmId, enrollmentId }) {
        this.props.generateCrowdhub({ enrolledProgram, programCrmId, enrollmentId });
    }


    onInProgressResumeClick() {
        this.props.onInProgressResumeClick(this.props.crmId, this.props.enrollmentId)
    }


    onWatchVideoClick() {
        this.setState({ showVid: true })
    }

    onHideVideoModal() {
        this.setState({ showVid: false })
    }

    onLearnMoreClick(id) {

        this.canLearnMore() && this.props.onLearnMoreClick(id);
    }

    onDownloadPDF(pdfLink) {
        this.props.downloadPDFForWeb(pdfLink);
    }

    onViewComplexHoursDetailClick(pdfLink) {
        this.props.downloadPDFForWeb(pdfLink);
    }

    canLearnMore() {
        return this.props.enrollmentStatus !== OpportunityStatus.Passed;
    }

    hasAvailableSchedules() {
        return this.props.availableSchedules.length > 0;
    }

    onOpenStarmatic({ programCrmId }) {
        this.props.openStarmatic(programCrmId)
    }

    onGenerateChatRoom({ programCrmId }) {
        this.props.generateChatRoom(programCrmId)
    }

    onGenerateKnowledgeZone({ enrolledProgram, programCrmId }) {
        this.props.generateKnowledgeZone({ enrolledProgram, programCrmId })
    }

    onGeneratespotifyKnowledgeZone() {
        this.props.generatespotifyKnowledgeZone({});
    }

    shouldShowLMSModal() {
        return this.state.LMSMessageModal
    }
    hideLMSMessageModal(primaryClassSchedule = this.props.primaryClassSchedule, opportunitycrmId = this.props.enrollmentId) {
        this.setState({ LMSMessageModal: false })
        //New LMS call
        // this.props
        this.props.generateSelfPaced({ primaryClassSchedule, opportunitycrmId })
    }

    showNoShowForfeitModal() {
        this.setState({ noShowForfeitModal: true })
    }
    hideNoShowForfeitModal() {
        this.setState({ noShowForfeitModal: false })
    }

    onCheckForConflict(values) {

        const { isUSUser, type } = this.props
        if (isUSUser && CheckIfOppType(type)) {
            this.props.checkforClassConflict(values)
        }

    }

    render() {
        const {
            crmId,
            name,
            enrollmentId,
            description,
            clientLogoURL,
            serviceType,
            programService,
            cost,
            displayfrom,
            displayto,
            availableSchedules,
            hasIncentives,
            classStartDate,
            startEarningDate,
            monthlyRevenue,
            averageWeeklyHours,
            hourlyRate,
            registrationDueDate,
            announcementFilePathCSP,
            chkDisplayIcon,
            oppFlag,
            colorValue,
            colorId,
            colorName,
            qaScore,
            isServicingComplex,
            currencyCode,
            showHide,
            courseEndDate,
            sponsored,
            _isInCertification,
            _videoLink,
            _pdfLink,
            _hasSelfPaced,
            _hasVirtualClassroom,
            _canCancel,
            _isEnrolledFullPayment,

            enrollmentStatusReasonDisplayName,
            _inProgress,
            _canReschedule,
            _isCertificationPassed,
            _canDrop,
            commitmentAdherencePercentage,
            currentOrNextSlotDateTimeProgram,
            overallStarRating,
            _isClassAccessDisabled,
            agentProfile,
            noShowDepositReceived,
            classNoShowFees,
            primaryClassSchedule,
            pcCheckResults,
            isSubmittingPCCheck,
            isCompletePCCheck,
            pcCheckErrors,
            opportunity,
            photoIdIsFetching,
            photoIdStatusData,
            photoIdMedia,
            photoIdError,
            conflictCheckData,
            openOnPortal,
            step,
            stepAvailableSince,
            enrollmentStatusDate
        } = this.props;

        return <div className="OpportunityCardWrapper">
            <VideoModal
                videoLink={_videoLink && _videoLink.sourceURL}
                isVisible={this.state.showVid}
                onHide={this.onHideVideoModal} />
            <CancelEnrollmentModal
                enrollmentToCancel={this.props.enrollmentToCancel}
                isModalVisible={this.shouldShowCancelEnrollmentModal()}
                onSubmit={this.onCancelEnrollmentSubmit}
                onHideModal={this.onHideCancelEnrollmentModal}
                onCancel={this.onHideCancelEnrollmentModal}
            />
            <RescheduleCourseModal
                opportunity={this.props}
                title={"Reschedule Class"}
                isModalVisible={this.shouldShowRescheduleEnrollmentModal()}
                onHideModal={this.onHideRescheduleEnrollmentModal}
                onSubmit={this.onRescheduleEnrollmentSubmit}
                onCancel={this.onHideRescheduleEnrollmentModal}
                enrollmentToReschedule={this.props.enrollmentToReschedule}
                checkforConflict={this.onCheckForConflict}
                isConflictDataFetching={conflictCheckData}
            />
            <DropEnrollmentModal
                opportunity={this.props}
                title={"Drop Class"}
                isModalVisible={this.shouldShowDropEnrollmentModal()}
                onSubmit={this.onDropEnrollmentSubmit}
                onHideModal={this.onHideDropEnrollmentModal}
                onCancel={this.onHideDropEnrollmentModal}
                enrollmentToCancel={this.props.enrollmentToCancel}
            />


            <NoshowForfeitModal
                isModalVisible={this.state.noShowForfeitModal}
                onSubmitSave={this.onDropEnrollmentClick}
                onHide={this.hideNoShowForfeitModal}
                hasAgentpayedNoShowDeposit={noShowDepositReceived == 1 ? true : false}
                noshowRefund={this.props.noShowRefund}
                classStartDate={primaryClassSchedule != null ? primaryClassSchedule.classStartDateTime : null}
                classNoShowFees={classNoShowFees}
                currencyCode={currencyCode}
            />

            {/* {*show a message if user clicks on self paced button*} */}
            <LMSMessageModal
                opportunity={this.props}
                title={"VPN Access"}
                message={this.props.lmsMessage ? this.props.lmsMessage : null}
                isModalVisible={this.shouldShowLMSModal()}
                onSubmit={this.hideLMSMessageModal}
                onHideModal={this.hideLMSMessageModal}
                onCancel={this.hideLMSMessageModal}
                enrolledOppId={enrollmentId}
                primaryClassSchedule={this.props.primaryClassSchedule}
            />

            <Col className={classNames({
                "OpportunityCard": true,
                "InProgress": this.isInProgress()
            })}>
                <div className={`OpportunityCardHeader`}>
                    <CardTitle opportunity={this.props} enrolledProgram={this.props.enrolledProgram}
                        onLearnMoreClick={this.onLearnMoreClick} />

                </div>
                <div className="OpportunityCardBody pt-0 pb-0">
                    {this.isInProgress() &&
                        <InProgressDetails
                            enrolledProgram={this.props.enrolledProgram}
                            commitmentAdherencePercentage={commitmentAdherencePercentage}
                            currentOrNextSlotDateTimeProgram={currentOrNextSlotDateTimeProgram}
                            onDownloadPDF={this.onDownloadPDF}
                            onGenerateSelfPaced={this.onGenerateSelfPaced}
                            onGenerateVirtualClassroom={this.onGenerateVirtualClassroom}
                            onGenerateCrowdhub={this.onGenerateCrowdhub}
                            overallStarRating={this.props.overallStarRating}
                            NoShowWindow={this.props.NoShowWindow}
                            NoShowAutoDrop={this.props.NoShowAutoDrop}
                            NoShowReinstate={this.props.NoShowReinstate}
                            {...this.props}
                            openOnPortal={openOnPortal}
                            step={step}
                            stepAvailableSince={stepAvailableSince}
                            enrollmentStatusDate={enrollmentStatusDate}
                        />
                    }

                    {!this.isInProgress() &&
                        <Fragment>
                            <Details
                                onViewComplexHoursDetailClick={this.onViewComplexHoursDetailClick}
                                {...this.props} />
                            <Banner {...this.props} />
                        </Fragment>

                    }
                </div>
                <div className={`OpportunityCardFooter row mt-3`}>
                    {this.isInProgress() === true &&
                        <InProgressActions
                            {...this.props}
                            enrolledProgram={this.props.enrolledProgram}
                            onInProgressResumeClick={this.onInProgressResumeClick}
                            onDownloadPDF={this.onDownloadPDF}
                            onGenerateSelfPaced={this.onGenerateSelfPaced}
                            onGenerateVirtualClassroom={this.onGenerateVirtualClassroom}
                            onGenerateCrowdhub={this.onGenerateCrowdhub}
                            onOpenStarmatic={this.onOpenStarmatic}
                            onGenerateChatRoom={this.onGenerateChatRoom}
                            onGenerateKnowledgeZone={this.onGenerateKnowledgeZone}
                            onRescheduleEnrollmentClick={this.onRescheduleEnrollmentClick}
                            onCancelEnrollmentClick={this.onCancelEnrollmentClick}
                            onDropEnrollmentClick={this.showNoShowForfeitModal}
                            hasAvailableSchedules={this.hasAvailableSchedules()}
                            onGeneratespotifyKnowledgeZone={this.onGeneratespotifyKnowledgeZone}
                            opportunityId={this.props.enrollmentId}

                            pcCheckResults={pcCheckResults}
                            isSubmittingPCCheck={isSubmittingPCCheck}
                            isCompletePCCheck={isCompletePCCheck}
                            pcCheckErrors={pcCheckErrors}
                            rulesetId={opportunity ? opportunity.pcCheckRulesetId : 0}
                            isFirstClass={true}

                            photoIdIsFetching={photoIdIsFetching}
                            PhotoIdStatus={photoIdStatusData}
                            photoIdMedia={photoIdMedia}
                            photoIdError={photoIdError}
                            virtualClassData={this.props.virtualClassData}
                            generateVirtualClassroom={this.props.generateVirtualClassroom}
                            clearPCScan={this.props.clearPCScan}
                            createPCCheckAssessment={this.props.createPCCheckAssessment}
                            initialisePhotoIdQRCode={this.props.initialisePhotoIdQRCode}

                        />
                    }

                    {this.isInProgress() === false &&
                        <Fragment>
                            <Breakdown {...this.props}
                                onDownloadPDF={this.onDownloadPDF}
                                onWatchVideoClick={this.onWatchVideoClick}
                                onLearnMoreClick={this.onLearnMoreClick}
                                onGeneratespotifyKnowledgeZone={this.onGeneratespotifyKnowledgeZone} />
                        </Fragment>

                    }

                </div>
            </Col>
        </div>;
    }
}



export default function CardConnect(reduxConnect, extendStateToProps, extendsDispatchToProps = {}) {

    DropEnrollmentModal = DropEnrollmentModalConnect(reduxConnect); // pass in store 

    function mapStateToProps(state, props) {
        const opportunityId = props.crimId;
        const opportunityProgramId = props.programCrmId;
        const getScreeningAssessmentRequired = agentProfileSelector.isScreeningAssessmentRequired(state);

        const spotifyKnowledgeZoneLink = LinksSelector.spotifyknowledgeZoneResults(state);

        const overallStarRating = performanceMetricsSelector.getMetricForProgram(state, opportunityProgramId)

        const commitmentAdherencePercentage = performanceMetricsSelector.getCommitmentAdherencePercentage(state, opportunityProgramId)
        const currentOrNextSlotDateTimeProgram = performanceMetricsSelector.getCurrentOrNextSlotDateTimeProgram(state, opportunityProgramId)

        const enrolledProgram = enrolledProgramSelectors.getDataById(state, opportunityProgramId);
        const enrollmentToCancel = enrolledProgramSelectors.getEnrollmentToCancel(state);
        const enrollmentToReschedule = enrolledProgramSelectors.getEnrollmentToReschedule(state);
        const dropStatusReasons = enrolledProgramSelectors.getDropStatusReasons(state);
        const isDropFetching = enrolledProgramSelectors.isDropFetching(state);
        const eligiblity = enrolledProgramSelectors.checkEligiblity(state);
        const noShowRefund = getGlobalParameterByString(state, GlobalParameterTypes.REFUND_WINDOW)
        const NoShowWindow = getGlobalParameterByString(state, GlobalParameterTypes.NO_SHOW_WINDOW);
        const NoShowAutoDrop = getGlobalParameterByString(state, GlobalParameterTypes.NO_SHOW_AUTO_DROP);
        const NoShowReinstate = getGlobalParameterByString(state, GlobalParameterTypes.NO_SHOW_REINSTATE);

        const lmsMessage = getGlobalParameterByString(state, GlobalParameterTypes.LMSMessage)
        const extendedState = extendStateToProps !== undefined ? extendStateToProps(state, props) : {}
        const conflictCheckData = opportunitySelector.getClassConflictData(state);
        const isUSUser = agentProfileSelector.isAgentFromUSA(state);

        const pcCheckResults = pcCheckSelectors.getResults(state);
        const pcCheckErrors = pcCheckSelectors.getError(state);
        const isSubmittingPCCheck = pcCheckSelectors.isSaving(state);
        const isCompletePCCheck = pcCheckSelectors.isComplete(state);
        const isSuccessfulPCCheck = pcCheckSelectors.isSuccessful(state);
        const opportunity = opportunitySelector.getById(state, props.crmId);
        const virtualClassData = state._3rdPartyLinks.virtualClassData;

        const photoIdIsFetching = photoIdSelectors.isFetching(state);
        const photoIdStatusData = photoIdSelectors.getStatusData(state);
        const photoIdMedia = photoIdSelectors.getMeida(state);
        const photoIdError = photoIdSelectors.error(state);
        const screenConfig = state.app.countryConfigurations.config;

        return {
            onInProgressResumeClick: props.onInProgressResumeClick,
            enrollmentToCancel,
            enrollmentToReschedule,
            agentProfile: state.agentProfile,
            enrolledProgram,
            overallStarRating,
            commitmentAdherencePercentage,
            currentOrNextSlotDateTimeProgram,
            dropStatusReasons,
            isDropFetching,
            spotifyKnowledgeZoneLink,
            getScreeningAssessmentRequired,
            noShowRefund,
            NoShowAutoDrop,
            NoShowReinstate,
            NoShowWindow,
            lmsMessage,
            eligiblity,
            pcCheckErrors,
            pcCheckResults,
            isSubmittingPCCheck,
            isCompletePCCheck,
            isSuccessfulPCCheck,
            opportunity,
            virtualClassData,

            photoIdIsFetching,
            photoIdStatusData,
            photoIdMedia,
            screenConfig,
            conflictCheckData,
            isUSUser,

            // extends with passed in props if any
            ...extendedState
        }
    }

    const mapDispatchToProps = {
        downloadPDFForWeb
        , stageEnrollmentToCancel
        , generateSelfPaced: _3rdPartyLinksActions.generateSelfPaced
        , generateVirtualClassroom: _3rdPartyLinksActions.generateVirtualClassroom
        , generateCrowdhub: _3rdPartyLinksActions.generateCrowdhub
        , stageEnrollmentToCancel: enrolledProgramActions.stageEnrollmentToCancel
        , cancelStagedEnrollment: enrolledProgramActions.cancelStagedEnrollment
        , cancelEnrollmentRefresh: enrolledProgramActions.cancelEnrollmentRefresh
        , dropStagedEnrollment: enrolledProgramActions.dropStagedEnrollment
        , stageClassToReschedule: enrolledProgramActions.stageClassToReschedule
        , rescheduleClass: enrolledProgramActions.rescheduleClass
        , openStarmatic: _3rdPartyLinksActions.openStarmatic
        , generateChatRoom: _3rdPartyLinksActions.generateChatRoom
        , generateKnowledgeZone: _3rdPartyLinksActions.generateKnowledgeZone
        , generatespotifyKnowledgeZone: _3rdPartyLinksActions.generatespotifyKnowledgeZone
        , getDropStatusReasons: enrolledProgramActions.getDropStatusReasons
        , isScreeningAssessmentRequired: agentTypeAction.isScreeningAssessmentRequired
        , retrieveGlobalParameter: retrieveGlobalParameter
        , FetchSbacOverideRequiredForOpp: FetchSbacOverideRequiredForOpp,
        checkEligiblity: enrolledProgramActions.checkEligiblity
        , createPCCheckAssessment,
        clearPCScan: _3rdPartyLinksActions.clearPCScan,
        initialisePhotoIdQRCode: photoIdActions.initialisePhotoIdQRCode,
        checkforClassConflict: CheckForClassConflictWithServicingTime
        // extends with passed in props if any
        , ...extendsDispatchToProps
    };



    return reduxConnect(
        mapStateToProps,
        { ...mapDispatchToProps }
    )(Card);
}

