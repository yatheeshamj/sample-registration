import "./OpportunityDetailAlerts.scss"
import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Nav, Tabs, Tab, Row, Col, TabPane } from 'react-bootstrap';
import { Translate } from 'spotify-shared-web/localize'
import CourseCountDown from "spotify-shared-web/components/opportunities/CourseCountDown";
import spotifyButton from 'spotify-shared-web/components/common/Button';
import formHelpers from 'spotify-shared/helpers/formHelpers'
import { CircularProgressbar, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { getDateDifferenceInDays } from "../../helpers/uiHelpers"
import EnrollCourseModal from "spotify-shared-web/components/opportunities/EnrollCourseModal"
import CancelEnrollmentModal from "spotify-shared-web/components/opportunities/CancelEnrollmentModal"
import DropEnrollmentModalConnect from "spotify-shared-web/components/opportunities/DropEnrollmentModal"
import { GlobalParameterTypes, OpportunityStatus } from "spotify-shared/constants"
import warningIcon from '../../assets/images/warning-red.svg';
import { withRouter } from 'react-router-dom'
import * as enrolledProgramSelectors from "spotify-shared/selectors/enrolledPrograms"
import * as enrolledProgramActions from "spotify-shared/actions/enrolledPrograms"
import RescheduleCourseModal from "spotify-shared-web/components/opportunities/RescheduleCourseModal";
import { getGlobalParameterByString } from "spotify-shared/selectors/globalParameters";
import NoshowForfeitModal from "spotify-shared-web/components/opportunities/NoShowForfeitModal";
import { retrieveGlobalParameter } from "spotify-shared/actions/globalParameters";
import { clearAgreementTemplates } from "spotify-shared/actions/agreementTemplates";
import SCREEN_CONFIG from '../../screensConfig';
import { checkforConflict } from "spotify-shared/api/opportunities";

const CURRENT_SCREEN = SCREEN_CONFIG.opportunitiesDetails;


// retrieveGlobalParameter



const DropEnrollmentModal = DropEnrollmentModalConnect(connect);
//TODO 
/*
 Please Note there is code here that will be common to Mobile APP 
 and  will need to get pushed into a base class in a future date.
 Take into account when designing Methods 
 
 */
class OpportunityDetailAlerts extends Component {


    constructor(props) {
        super(props);



        //#region State

        this.state = {
            ShowEnrollCourseModal: false,
            ShowDropEnrollmentModal: false,
            cancelModal: false,
            dropModal: false,
            rescheduleModal: false,
            noShowForfeitModal: false

        };

        //#endregion

        //#region Render Helpers

        this.shouldShow = this.shouldShow.bind(this);
        this.getTitle = this.getTitle.bind(this);
        this.getMessage = this.getMessage.bind(this);
        this.showProgressIndicator = this.showProgressIndicator.bind(this);



        //#endregion

        //#region Button Methods

        // CancelEnrollment
        this.onCancelEnrollmentSubmit = this.onCancelEnrollmentSubmit.bind(this);
        this.shouldShowCancelEnrollmentModal = this.shouldShowCancelEnrollmentModal.bind(this);
        this.onHideCancelEnrollmentModal = this.onHideCancelEnrollmentModal.bind(this);
        this.onCancelEnrollmentClick = this.onCancelEnrollmentClick.bind(this);
        this.hideCancelBtn = this.hideCancelBtn.bind(this);

        //  DropEnrollment
        this.onDropEnrollmentSubmit = this.onDropEnrollmentSubmit.bind(this);
        this.onDropEnrollmentClick = this.onDropEnrollmentClick.bind(this);
        this.hideDropEnrollmentBtn = this.hideDropEnrollmentBtn.bind(this);
        this.onHideDropEnrollmentModal = this.onHideDropEnrollmentModal.bind(this);

        // RescheduleCourse
        this.onRescheduleEnrollmentSubmit = this.onRescheduleEnrollmentSubmit.bind(this);
        this.shouldShowRescheduleEnrollmentModal = this.shouldShowRescheduleEnrollmentModal.bind(this);
        this.onHideRescheduleEnrollmentModal = this.onHideRescheduleEnrollmentModal.bind(this);
        this.onRescheduleEnrollmentClick = this.onRescheduleEnrollmentClick.bind(this);
        this.hideRescheduleBtn = this.hideRescheduleBtn.bind(this);

        // EnrollCourse
        this.onEnrollCourseClick = this.onEnrollCourseClick.bind(this);
        this.onHideEnrollCourseModal = this.onHideEnrollCourseModal.bind(this);

        // Continue
        this.hideContinueBtn = this.hideContinueBtn.bind(this);




        //#endregion

        //#region Enrollment Prerequisites In Progress Alert
        this.showEnrollmentPrerequisitesInProgressAlert = this.showEnrollmentPrerequisitesInProgressAlert.bind(this);
        this.isEnrollmentPrerequisitesInProgressNoPaymentMade = this.isEnrollmentPrerequisitesInProgressNoPaymentMade.bind(this);
        this.isEnrollmentPrerequisitesInProgressPaymentMadeClassNotSatrted = this.isEnrollmentPrerequisitesInProgressPaymentMadeClassNotSatrted.bind(this);
        this.isEnrollmentPrerequisitesInProgressPaymentMadeClassStarted = this.isEnrollmentPrerequisitesInProgressPaymentMadeClassStarted.bind(this);
        this.getEnrollmentPrerequisitesInProgressAlertTitle = this.getEnrollmentPrerequisitesInProgressAlertTitle.bind(this);
        this.getEnrollmentPrerequisitesInProgressAlertMessage = this.getEnrollmentPrerequisitesInProgressAlertMessage.bind(this);
        //#endregion

        //#region Class Starting Soon Alert
        this.showClassStartingSoonSlert = this.showClassStartingSoonSlert.bind(this);
        this.getClassStartingAlertTitle = this.getClassStartingAlertTitle.bind(this);
        this.getClassStartingAlertMessage = this.getClassStartingAlertMessage.bind(this);
        //#endregion

        //#region  In Certification Alert

        this.showInCertificationAlert = this.showInCertificationAlert.bind(this);
        this.getInCertificationTitle = this.getInCertificationTitle.bind(this);
        this.getInCertificationMessage = this.getInCertificationMessage.bind(this);

        //#endregion

        //#region Not eligible ALert

        this.isIneligible = this.isIneligible.bind(this);
        this.getIneligibleAlertTitle = this.getIneligibleAlertTitle.bind(this);
        this.getIneligibleAlertMessage = this.getIneligibleAlertMessage.bind(this);

        //#endregion

        //#region Course Full Alert

        this.showCourseFullAlert = this.showCourseFullAlert.bind(this);
        this.getCourseFullAlertTitle = this.getCourseFullAlertTitle.bind(this);
        this.getCourseFullAlertMessage = this.getCourseFullAlertMessage.bind(this);

        //#endregion

        this.onEnrollmentPrerequisitesClick = this.onEnrollmentPrerequisitesClick.bind(this);

        //NoshowForfeitModal
        this.showNoShowForfeitModal = this.showNoShowForfeitModal.bind(this);
        this.hideNoShowForfeitModal = this.hideNoShowForfeitModal.bind(this);

    }

    componentDidMount() {
        if (this.props.dropStatusReasons.length === 0 && this.props.isDropFetching === false) this.props.getDropStatusReasons();
        if (this.props.opportunity.noShowDepositReceived == 1 && (!this.props.noShowRefund)) {
            //make call to global param
            this.props.retrieveGlobalParameter(GlobalParameterTypes.REFUND_WINDOW)
        }

    }
    componentDidUpdate(prev) {

        if (prev.showDropModalAuto == false && this.props.showDropModalAuto == true) {
            this.onDropEnrollmentClick()


        }
    }

    //#region Not eligible ALert

    isIneligible() {
        return this.props.opportunity._isIneligible
    }

    getIneligibleAlertTitle() {
        return <Fragment>
            <img className=""
                style={{
                    "height": "25px",
                    "marginRight": "10px"
                }}
                src={warningIcon} alt='' />

            Sorry, you are not eligible for this Opportunity
        </Fragment>
    }

    getIneligibleAlertMessage() {
        return <Fragment>
            {this.props.opportunity.enrollmentStatusReasonDisplayName}
        </Fragment>
    }

    //#endregion

    //#region Enrollment Prerequisites In Progress Alert

    showEnrollmentPrerequisitesInProgressAlert() {
        return this.props.opportunity && this.props.opportunity._inProgress
    }

    isEnrollmentPrerequisitesInProgressNoPaymentMade() {
        //Enrollment Progress < 100 % AND
        //Opportunity  Status = Interested OR Client Qualified
        return this.props.opportunity.percentEnrollmentComplete < 100 && this.props.opportunity.enrollmentStatus === OpportunityStatus.Interested ||
            this.props.opportunity.enrollmentStatus === OpportunityStatus.Client_Qualified;
    }

    isEnrollmentPrerequisitesInProgressPaymentMadeClassNotSatrted() {
        //Enrollment Progress < 100 % AND
        //Opportunity Status = Enrolled Full Pay AND
        //Current Date = < Class Start Date
        const daysToStart = getDateDifferenceInDays(this.props.opportunity.classStartDate);
        return this.props.opportunity.percentEnrollmentComplete < 100 && this.props.opportunity._isEnrolledFullPayment && daysToStart > 0;
    }

    isEnrollmentPrerequisitesInProgressPaymentMadeClassStarted() {
        //Enrollment Progress <= 100 % AND
        //Opportunity Status = Enrolled Full Pay AND
        //Current Date => Class Start Date
        const daysToStart = getDateDifferenceInDays(this.props.opportunity.classStartDate);
        return this.props.opportunity.percentEnrollmentComplete <= 100 && this.props.opportunity._isEnrolledFullPayment && daysToStart <= 0;
    }

    getEnrollmentPrerequisitesInProgressAlertTitle() {
        if (this.isEnrollmentPrerequisitesInProgressNoPaymentMade())
            return <Translate>{({ translate }) => <Fragment>{translate(`${CURRENT_SCREEN}.enrollmentPrerequisitesInProgress`)}</Fragment>}</Translate>

        if (this.isEnrollmentPrerequisitesInProgressPaymentMadeClassNotSatrted())
            return <Fragment> Enrollment Prerequisites in Progress! Class Starting Soon! </Fragment>

        if (this.isEnrollmentPrerequisitesInProgressPaymentMadeClassStarted())
            return <Fragment>Enrollment Prerequisites in Progress! Certification in progress!</Fragment>
    }

    getEnrollmentPrerequisitesInProgressAlertMessage() {
        const daysToRegistrationDueDate = getDateDifferenceInDays(this.props.opportunity.registrationDueDate);

        if (this.isEnrollmentPrerequisitesInProgressNoPaymentMade() && daysToRegistrationDueDate > 0)
            return <Fragment>
                Deadline by {formHelpers.formatDate(this.props.opportunity.registrationDueDate)}
                <CourseCountDown
                    registrationDueDate={this.props.opportunity.registrationDueDate} />
            </Fragment>

        if (this.isEnrollmentPrerequisitesInProgressPaymentMadeClassNotSatrted())
            return <Fragment>  Class start: {formHelpers.formatDate(this.props.opportunity.classStartDate)} </Fragment>

        return <Fragment>   </Fragment>
    }

    //#endregion

    //#region Class Starting Soon Alert

    showClassStartingSoonSlert() {
        //Enrollment Progress = 100 % AND
        //Current Date < Class Start Date

        const daysToStart = getDateDifferenceInDays(this.props.opportunity.classStartDate);
        return this.props.opportunity.percentEnrollmentComplete === 100 && daysToStart > 0 && this.props.opportunity && this.props.opportunity._inProgress;
    }

    getClassStartingAlertTitle() {
        return <Fragment>Class Starting Soon!</Fragment>
    }

    getClassStartingAlertMessage() {
        return <Fragment>  Class start: {formHelpers.formatDate(this.props.opportunity.classStartDate)} </Fragment>
    }

    //#endregion

    //#region  In Certification Alert

    showInCertificationAlert() {
        //Enrollment Progress = 100 % AND
        //Current Date => Class Start Date
        const daysToStart = getDateDifferenceInDays(this.props.opportunity.classStartDate);

        return this.props.opportunity.percentEnrollmentComplete === 100 && daysToStart <= 0 && this.props.opportunity && this.props.opportunity._inProgress && this.props.opportunity._isInCertification;

    }

    getInCertificationTitle() {
        return <Fragment> Certification in Progress! </Fragment>
    }

    getInCertificationMessage() {
        return <Fragment> </Fragment>
    }

    //#endregion

    //#region Course Full Alert 

    showCourseFullAlert() {
        return this.props.opportunity._isCourseFull
    }

    getCourseFullAlertTitle() {
        return <Fragment> Class is Full </Fragment>
    }

    getCourseFullAlertMessage() {
        return <Fragment>This opportunity was very popular and is now full. Please visit the portal for other exciting opportunities! </Fragment>
    }


    //#endregion

    //#region  CancelEnroll

    shouldShowCancelEnrollmentModal() {
        return this.props.opportunity && this.props.opportunity.enrollmentId === this.props.enrollmentToCancel.id;
    }

    onCancelEnrollmentSubmit() {
        if (this.props.enrollmentToCancel.isComplete == false) {
            this.props.cancelStagedEnrollment(this.props.agentProfile.agentId, this.props.opportunity.enrollmentId);
        }
        else {
            this.props.cancelEnrollmentRefresh(this.props.agentProfile.agentId, this.props.agentProfile.countryId, true, false);
            this.props.stageEnrollmentToCancel(null);
            this.props.history.push("/opportunities");
        }
    }

    onHideCancelEnrollmentModal() {
        if (this.props.enrollmentToCancel.isComplete) {
            this.props.cancelEnrollmentRefresh(this.props.agentProfile.agentId, this.props.agentProfile.countryId, false, false);
        }
        this.props.stageEnrollmentToCancel(null);
    }

    onCancelEnrollmentClick() {
        this.setState({ cancelModal: true })
        if (this.props.opportunity.enrollmentId != null)
            this.props.stageEnrollmentToCancel(this.props.opportunity.enrollmentId);
        else
            this.props.stageEnrollmentToCancel(null);
        this.props.clearAgreementTemplates()
    }

    //#endregion

    //#region EnrollCourse

    onEnrollCourseClick() {
        this.setState({ ShowEnrollCourseModal: true })
    }

    onHideEnrollCourseModal() {
        this.setState({ ShowEnrollCourseModal: false })
    }
    //#endregion

    //#region Drop Enrollment


    shouldShowDropEnrollmentModal() {
        return this.props.opportunity && this.props.opportunity.crmId === this.props.enrollmentToCancel.id;
    }


    onDropEnrollmentSubmit(values) {
        if (this.props.enrollmentToCancel.isComplete == false) {
            if (values != null && values.dropPolicy == true) {
                if (window.confirm('If you drop this class, you may not be able to enroll in another opportunity for up to 30 days. Are you sure you want to drop the class??')) {

                    this.props.dropStagedEnrollment(this.props.agentProfile.agentId, this.props.opportunity.crmId, values.dropReason, true);
                }
                else {
                    this.props.cancelEnrollmentRefresh(this.props.agentProfile.agentId, this.props.agentProfile.countryId, true, false);
                    this.props.stageEnrollmentToCancel(null);

                }

            }
        }
        else {
            //commenting this below line. this is resulting calling FetchOpportunities twice.
            //this.props.cancelEnrollmentRefresh(this.props.agentProfile.agentId, this.props.agentProfile.countryId, true, false);
            this.props.stageEnrollmentToCancel(null);

            this.props.history.push("/opportunities");
        }

    }

    onDropEnrollmentClick() {
        // alert("inside drop click")
        //some condition to to see if user has payed for NoShow class deposit if yes open new modal
        this.setState({ dropModal: true, noShowForfeitModal: false })
        if (this.props.opportunity.crmId != null)
            this.props.stageEnrollmentToCancel(this.props.opportunity.crmId);
        else
            this.props.stageEnrollmentToCancel(null);

    }

    onHideDropEnrollmentModal() {
        if (typeof this.props.onHide === "function") {
            this.props.onHide()
        }

        if (this.props.enrollmentToCancel.isComplete) {
            this.props.cancelEnrollmentRefresh(this.props.agentProfile.agentId, this.props.agentProfile.countryId, false, false);
        }
        this.props.stageEnrollmentToCancel(null);
    }


    //#endregion 


    //#region Reschedule Enrollment

    shouldShowRescheduleEnrollmentModal() {
        return this.props.opportunity && this.props.opportunity.crmId === this.props.enrollmentToReschedule.id;
    }

    onRescheduleEnrollmentSubmit(values) {
        if (this.props.enrollmentToReschedule.isComplete == false) {
            if (values != null) {
                if (window.confirm('Are you sure you want to reschedule the class time?')) {
                    this.props.rescheduleClass(this.props.agentProfile.agentId, this.props.opportunity.crmId, values.newClass);
                }
                else {
                    this.props.cancelEnrollmentRefresh(this.props.agentProfile.agentId, this.props.agentProfile.countryId, true, false);
                    this.props.stageClassToReschedule(null);
                }
            }
        }
        else {
            var id = this.props.opportunity.crmId;
            this.props.cancelEnrollmentRefresh(this.props.agentProfile.agentId, this.props.agentProfile.countryId, false, false);
            this.props.stageClassToReschedule(null);
            this.props.history.push(`/opportunity/${id}`);
        }

    }

    onRescheduleEnrollmentClick() {
        if (this.props.opportunity.crmId != null)
            this.props.stageClassToReschedule(this.props.opportunity.crmId);
        else
            this.props.stageClassToReschedule(null);

    }

    onHideRescheduleEnrollmentModal() {
        if (this.props.enrollmentToReschedule.isComplete) {
            this.props.cancelEnrollmentRefresh(this.props.agentProfile.agentId, this.props.agentProfile.countryId, false, false);
        }
        this.props.stageClassToReschedule(null);
    }

    //#endregion 

    //#region Button Show/Hide Helpers
    hideContinueBtn() {

        if (this.isIneligible()) return true;
        //Display for users who are in Enrollment Prerequisite In Progress state
        //    (Enrollment Prerequisite Progress is less than 100).
        //    Formula: (Completed Prerequisites / Total Prerequisites) < 100 %
        //    On Click, display Enrollment Prerequisites page.

        return false;
    }

    hideRescheduleBtn() {
        return this.props.opportunity._canReschedule === false;
    }

    hideCancelBtn() {
        return this.props.opportunity._canCancel === false;
    }

    hideDropEnrollmentBtn() {
        return this.props.opportunity._canDrop === false;
    }

    //#endregion

    //#region Render Helpers

    showProgressIndicator() {
        if (this.isIneligible()) return false;

        return this.props.opportunity._inProgress
    }

    shouldShow() {

        return this.isIneligible() ||
            this.showEnrollmentPrerequisitesInProgressAlert() ||
            this.showClassStartingSoonSlert() ||
            this.showInCertificationAlert() ||
            this.showCourseFullAlert();
    }

    getTitle() {

        if (this.isIneligible()) {
            return this.getIneligibleAlertTitle();
        }
        else if (this.showEnrollmentPrerequisitesInProgressAlert()) {

            return this.getEnrollmentPrerequisitesInProgressAlertTitle();

        }
        else if (this.showInCertificationAlert()) {

            return this.getInCertificationTitle()
        }
        else if (this.showClassStartingSoonSlert()) {

            return this.getClassStartingAlertTitle();

        }
        else if (this.showCourseFullAlert()) {

            return this.getCourseFullAlertTitle()
        }

        return <Fragment></Fragment>
    }

    getMessage() {

        if (this.isIneligible()) {
            return this.getIneligibleAlertMessage();
        }
        else if (this.showEnrollmentPrerequisitesInProgressAlert()) {

            return this.getEnrollmentPrerequisitesInProgressAlertMessage();

        } else if (this.showClassStartingSoonSlert()) {

            return this.getClassStartingAlertMessage();

        } else if (this.showInCertificationAlert()) {

            return this.getInCertificationMessage()
        }
        else if (this.showCourseFullAlert()) {

            return this.getCourseFullAlertMessage()
        }
        return <Fragment></Fragment>
    }

    //#endregion


    onEnrollmentPrerequisitesClick() {
        this.props.history.push(`/opportunity/${this.props.opportunity.crmId}/enrollment-prerequisites/${this.props.opportunity.enrollmentId}`);
    }
    //NoshowForfeitModal
    showNoShowForfeitModal() {
        this.setState({ noShowForfeitModal: true })
    }
    hideNoShowForfeitModal() {
        this.setState({ noShowForfeitModal: false })
    }
    render() {

        const {
            opportunity,
            showDropModalAuto,
            checkforConflict,
            isConflictDataFetching
        } = this.props;



        return this.shouldShow() && <Translate>
            {({ translate }) =>
                <Row className="OpportunityDetailAlertsContainer">
                    <EnrollCourseModal
                        opportunity={opportunity}
                        title={"Enroll in Course"}
                        isModalVisible={this.state.ShowEnrollCourseModal}
                        onHideModal={this.onHideEnrollCourseModal}
                        onSubmit={this.onEnrollCourseClick}
                        onCancel={this.onHideEnrollCourseModal}
                    />
                    <RescheduleCourseModal
                        opportunity={opportunity}
                        title={"Reschedule Class"}
                        isModalVisible={this.shouldShowRescheduleEnrollmentModal()}
                        onHideModal={this.onHideRescheduleEnrollmentModal}
                        onSubmit={this.onRescheduleEnrollmentSubmit}
                        onCancel={this.onHideRescheduleEnrollmentModal}
                        enrollmentToReschedule={this.props.enrollmentToReschedule}
                        checkforConflict={checkforConflict}
                        isConflictDataFetching={isConflictDataFetching}
                    />
                    <CancelEnrollmentModal
                        enrollmentToCancel={this.props.enrollmentToCancel}
                        isModalVisible={this.shouldShowCancelEnrollmentModal()}
                        onSubmit={this.onCancelEnrollmentSubmit}
                        onHideModal={this.onHideCancelEnrollmentModal}
                        onCancel={this.onHideCancelEnrollmentModal}
                    />
                    <DropEnrollmentModal
                        opportunity={opportunity}
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
                        hasAgentpayedNoShowDeposit={this.props.opportunity.noShowDepositReceived == 1 ? true : false}
                        noshowRefund={this.props.noShowRefund}
                        classStartDate={this.props.opportunity.primaryClassSchedule ? this.props.opportunity.primaryClassSchedule.classStartDateTime : null}
                        classNoShowFees={this.props.opportunity.classNoShowFees}
                        currencyCode={this.props.opportunity.currencyCode}
                    />

                    {this.showProgressIndicator() &&
                        <Col lg={2} md={3}>

                            <div style={{ width: "150px", margin: "auto" }}>
                                <CircularProgressbarWithChildren
                                    value={opportunity.percentEnrollmentComplete}>
                                    <div className="opp-progress-percent" style={{ fontSize: 18, marginTop: -5 }}>
                                        <strong>{opportunity.percentEnrollmentComplete}%</strong>
                                    </div>
                                    <div className="opp-progress-title">{translate(`${CURRENT_SCREEN}.progress`)}</div>
                                </CircularProgressbarWithChildren>
                            </div>
                        </Col>
                    }

                    <Col lg={9} md={3}>
                        <Col xs={12}>
                            <h4 className="OpportunityDetailAlertsTitle" >
                                {this.getTitle()}
                            </h4>
                        </Col>

                        <Col xs={12} className="OpportunityDetailAlertsMessage" >
                            {this.getMessage()}
                        </Col>

                        <Col xs={12} className="OpportunityDetailAlertsActions">
                            {this.props.showContinue &&
                                <spotifyButton
                                    hide={this.hideContinueBtn()}
                                    onClick={this.onEnrollmentPrerequisitesClick}>
                                    {translate("Continue")}
                                </spotifyButton>
                            }

                            <spotifyButton
                                variant={"outline-primary"}
                                hide={this.hideRescheduleBtn()}
                                onClick={this.onRescheduleEnrollmentClick}>
                                {translate("Reschedule Class")}
                            </spotifyButton>

                            <spotifyButton
                                variant={"outline-primary"}
                                hide={this.hideCancelBtn()}
                                onClick={this.onCancelEnrollmentClick}>
                                {translate(`${CURRENT_SCREEN}.cancelEnrollment`)}
                            </spotifyButton>

                            <spotifyButton
                                variant={"outline-primary"}
                                hide={this.hideDropEnrollmentBtn()}
                                // onClick={this.onDropEnrollmentClick}
                                onClick={this.showNoShowForfeitModal}
                            >
                                {translate("Drop Class")}
                            </spotifyButton>

                        </Col>
                    </Col>

                </Row>}
        </Translate>;
    }

}


function mapStateToProps(state, props) {

    const enrollmentToCancel = enrolledProgramSelectors.getEnrollmentToCancel(state);
    const enrollmentToReschedule = enrolledProgramSelectors.getEnrollmentToReschedule(state);
    const opportunity = props.opportunity;
    const showContinue = props.showContinue != false && opportunity._inProgress;

    const dropStatusReasons = enrolledProgramSelectors.getDropStatusReasons(state);
    const isDropFetching = enrolledProgramSelectors.isDropFetching(state);

    const noShowRefund = getGlobalParameterByString(state, GlobalParameterTypes.REFUND_WINDOW)

    return {

        enrollmentToCancel
        , enrollmentToReschedule
        , agentProfile: state.agentProfile
        , opportunity
        , showContinue
        , dropStatusReasons
        , isDropFetching
        , noShowRefund
    }
}

const mapDispatchToProps = {
    stageEnrollmentToCancel: enrolledProgramActions.stageEnrollmentToCancel,
    cancelStagedEnrollment: enrolledProgramActions.cancelStagedEnrollment,
    cancelEnrollmentRefresh: enrolledProgramActions.cancelEnrollmentRefresh,
    dropStagedEnrollment: enrolledProgramActions.dropStagedEnrollment,
    stageClassToReschedule: enrolledProgramActions.stageClassToReschedule,
    rescheduleClass: enrolledProgramActions.rescheduleClass,
    getDropStatusReasons: enrolledProgramActions.getDropStatusReasons,
    retrieveGlobalParameter:retrieveGlobalParameter,
    clearAgreementTemplates:clearAgreementTemplates
    

};

export default connect(
    mapStateToProps,
    { ...mapDispatchToProps }
)(withRouter(OpportunityDetailAlerts));
