import React, { Component } from 'react';

import * as opportunitiesSelector from "../selectors/opportunities"
import * as enrollmentPrerequisitesPageSelector from "../selectors/enrollmentPrerequisitesPage"
import * as enrollmentPrerequisitesPageActions from "../actions/enrollmentPrerequisitesPage"

import * as enrollmentStepsSelector from "../selectors/enrollmentSteps"
import * as agreementTemplatesSelector from "../selectors/agreementTemplates"

import * as selfAssessmentsSelectors from "../selectors/selfAssessments"
import * as selfAssessmentsActions from "../actions/selfassessments"
import * as _3rdPartyLinksActions from "../actions/3rdPartyLinks"
import * as _3rdPartyLinksSelector from "../selectors/3rdPartyLinks"
import * as pcCheckSelectors from "../selectors/pcCheck"
import * as pcCheckActions from "../actions/pcCheck"
import * as idVerificationSelectors from "../selectors/identityVerification"
import * as idVerificationActions from "../actions/identityVerification"
import * as agreementTemplatesActions from "../actions/agreementTemplates"
import { identityVerification } from '../reducers';
import * as opportunityActions from "../actions/opportunities"
import * as agentSelector from "../selectors/agentProfile"
import * as backgroundCheckActions from "../actions/backgroundCheck"
import * as backgroundCheckSelectors from "../selectors/backgroundCheck"
import payment from '../reducers/payment';
import * as paymentActions from "../actions/payment"
import * as paymentSelectors from "../selectors/payment"
import { registrationWatcher } from '../../src/sagas/registrationWatcher';
import * as photoIdActions from "../actions/photoId"
import * as photoIdSelectors from "../selectors/photoId"
import { getGlobalParameterByString } from '../selectors/globalParameters';
import { GlobalParameterTypes } from '../constants';
import * as trnvalidationActions from "../actions/trnvalidation"



export class EnrollmentPrerequisitesContainerBase extends Component {


    constructor(props) {

        super(props);

        this.initializePageHelper = this.initializePageHelper.bind(this);
    }

    componentDidMount() {
        this.initializePageHelper();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.opportunityId !== this.props.opportunityId ||
            prevProps.enrollmentId !== this.props.enrollmentId) {

            this.initializePageHelper();
        }


        let prevProps_completedSteps = prevProps.enrollmentSteps.filter(x => x.completed)
        let props_completedSteps = this.props.enrollmentSteps.filter(x => x.completed)

        //check if all steps are completed, compared to before 
        // if so update
        if (prevProps_completedSteps.length != props_completedSteps.length) {
            const {
                opportunityId
                , enrollmentId
                , agentProfile
                , fetchOpportunity
            } = this.props;

            fetchOpportunity({
                opportunityId,
                agentId: agentProfile.agentId,
            });
        }
    }

    initializePageHelper() {
        const {
            opportunityId
            , enrollmentId
            , agentProfile
            , initializeEnrollmentPrerequisitesPage
        } = this.props;

        if (opportunityId && agentProfile && enrollmentId) {
            initializeEnrollmentPrerequisitesPage({
                opportunityId,
                enrollmentId,
                agentId: agentProfile.agentId,
            });
        }
    }


    render() {

        return <></>
    }
}



export function EnrollmentPrerequisitesContainerBaseConnect(reduxConnect, Component, extendStateToProps, extendsDispatchToProps = {}) {

    function mapStateToProps(state, props) {

        //
        const opportunityId = enrollmentPrerequisitesPageSelector.getOpportunityId(state);
        const isFetching = enrollmentPrerequisitesPageSelector.isFetching(state);
        const enrollmentId = enrollmentPrerequisitesPageSelector.getEnrollmentId(state);
        //
        const opportunity = opportunitiesSelector.getById(state, opportunityId);
        //
		const enrollmentSteps = enrollmentStepsSelector.getData(state).filter(x => x.userFacing);
		const topIsNotPhotoIdStep = enrollmentSteps.filter(x => x.userFacing && x.moduleName == 'PHOTO_ID' && x.available).length == 0 ? true : false;
        //
        const selfAssessmentQuestions = selfAssessmentsSelectors.getData(state);

        //
        const interviewIqResults = _3rdPartyLinksSelector.interviewIqResults(state);
        const voiceAssessmentResults = _3rdPartyLinksSelector.voiceAssessmentResults(state);
        const programAssessmentResults = _3rdPartyLinksSelector.programAssessmentResults(state);


        const pcCheckResults = pcCheckSelectors.getResults(state);
        const pcCheckErrors = pcCheckSelectors.getError(state);
        const isSubmittingPCCheck = pcCheckSelectors.isSaving(state);
        const isCompletePCCheck = pcCheckSelectors.isComplete(state);
        const isSuccessfulPCCheck = pcCheckSelectors.isSuccessful(state);

        const idVerificationnResults = idVerificationSelectors.getResults(state);
        const idVerificationErrors = idVerificationSelectors.getError(state);
        const isSubmittingIdVerification = idVerificationSelectors.isSaving(state);
        const isCompleteIdVerification = idVerificationSelectors.isComplete(state);
        const idVerificationQuestionData = idVerificationSelectors.questionData(state);
        const isSuccessfulIdVerification = idVerificationSelectors.isSuccessful(state);

        //
        const agreementsToSign = agreementTemplatesSelector.getData(state);
        const agreementSigning = agreementTemplatesSelector.getSigning(state);

        const isAgentFromUK = agentSelector.isAgentFromUK(state);
        const isAgentFromJM = agentSelector.isAgentFromJM(state);
        //const isAgentFromUSA = agentSelector.isAgentFromUSA(state);
        const isBackgroundCheckFetching = backgroundCheckSelectors.isFetching(state);
        const backgroundCheckData = backgroundCheckSelectors.getData(state);
        const isBackgroundCheckComplete = backgroundCheckSelectors.isBackgroundCheckComplete(state);


        const paymentShippingResults = paymentSelectors.getResults(state);
        const paymentShippingErrors = paymentSelectors.getError(state);
        const isProcessingPaymentShipping = paymentSelectors.isSaving(state);
        const isCompletePaymentShipping = paymentSelectors.isComplete(state);
        const paymentInfoData = paymentSelectors.getPaymentInfoData(state);
        const verifiedData = paymentSelectors.getVerifiedData(state);
        const statesData = paymentSelectors.getStates(state);
        const paymentCompleteData = paymentSelectors.getPaymentComplete(state);

        const photoIdIsFetching = photoIdSelectors.isFetching(state);
        const photoIdIsStatusLoading = photoIdSelectors.isStatusLoading(state);
        const photoIdStatusPullCount = photoIdSelectors.statusPullCount(state);
        const photoIdError = photoIdSelectors.error(state);
        const photoIdInitData = photoIdSelectors.getInitResponse(state);
        const photoIdStatusData = photoIdSelectors.getStatusData(state);
        const photoIdMedia = photoIdSelectors.getMeida(state);
        const languageIQAssessmentResults = _3rdPartyLinksSelector.languageIQAssessmentResults(state);
        const incodeApiNotWorking = getGlobalParameterByString(state, GlobalParameterTypes.Incode_System_Down_Wait_Time);
        
        const fingerPrintResults = _3rdPartyLinksSelector.fingerPrintResults(state);

        //No-show
        const NoShowWindow=getGlobalParameterByString(state,GlobalParameterTypes.NO_SHOW_WINDOW)
        const NoShowAutoDrop=getGlobalParameterByString(state,GlobalParameterTypes.NO_SHOW_AUTO_DROP)
        const NoShowReinstate=getGlobalParameterByString(state,GlobalParameterTypes.NO_SHOW_REINSTATE)
        const extendedState = extendStateToProps !== undefined ? extendStateToProps(state, props) : {}

        //trnvalidation
        const trnValidationdata=state.trnvalidation

        return {
            opportunityId
            , enrollmentId
            , isFetching
            , opportunity
            , enrollmentSteps
            , selfAssessmentQuestions
            , interviewIqResults
            , voiceAssessmentResults
            , programAssessmentResults
            , pcCheckResults
            , isSubmittingPCCheck
            , isCompletePCCheck
            , pcCheckErrors
            , idVerificationnResults
            , idVerificationErrors
            , isSubmittingIdVerification
            , isCompleteIdVerification
            , agreementsToSign
            , agreementSigning
            , idVerificationQuestionData
            , isSuccessfulIdVerification
            , isAgentFromUK
            , isAgentFromJM
            , isBackgroundCheckFetching
            , backgroundCheckData
            , isBackgroundCheckComplete
            , paymentShippingResults
            , paymentShippingErrors
            , isProcessingPaymentShipping
            , isCompletePaymentShipping
            , paymentInfoData
            , verifiedData
            , statesData
            , paymentCompleteData
            , photoIdIsFetching
            , photoIdIsStatusLoading
            , photoIdStatusPullCount
            , photoIdError
            , photoIdInitData
            , photoIdStatusData
			, photoIdMedia
			, languageIQAssessmentResults
			, topIsNotPhotoIdStep
            , fingerPrintResults
            ,NoShowWindow
            ,NoShowAutoDrop
            ,NoShowReinstate
            ,incodeApiNotWorking
            ,trnValidationdata
            // extends with passed in props if any
            , ...extendedState
        };
    }

    const mapDispatchToProps = {

        initializeEnrollmentPrerequisitesPage: enrollmentPrerequisitesPageActions.initializeEnrollmentPrerequisitesPage
        , saveSelfAssessments: selfAssessmentsActions.saveSelfAssessments
        , generateInterviewIqLink: _3rdPartyLinksActions.generateInterviewIqLink
        , generateVoiceLink: _3rdPartyLinksActions.generateVoiceLink
        , generateProgramLink: _3rdPartyLinksActions.generateProgramLink
        , createPCCheckAssessment: pcCheckActions.createPCCheckAssessment
        , clearPCCheckAssessment: pcCheckActions.clearPCCheckAssessment
        , checkIdentityStatus: idVerificationActions.checkIdentityStatus
        , checkInitialExperianVerification: idVerificationActions.checkInitialExperianVerification
        , saveIdentityVerificationQuestions: idVerificationActions.saveIdentityVerificationQuestions
        , clearIdentityVerificationAssessment: idVerificationActions.clearIdentityVerificationAssessment
        , RetrieveAgreementTemplateByType: agreementTemplatesActions.RetrieveAgreementTemplateByType
        , SaveEnrollmentAgreement: agreementTemplatesActions.SaveEnrollmentAgreement
        , CancelAgreementSigning: agreementTemplatesActions.CancelAgreementSigning
        , fetchOpportunity: opportunityActions.fetchOpportunity
        , submitUKOrderNumber: backgroundCheckActions.submitUKOrderNumber
        , submitJMOrderNumber: backgroundCheckActions.submitJMOrderNumber
        , generateUSLink: backgroundCheckActions.generateUSLink
        , retrieveShippingAddress: paymentActions.retrieveShippingAddress
        , validateShippingAddress: paymentActions.validateShippingAddress
        , getformatAddress: paymentActions.getFormatAddress
        , getPaymentInfo: paymentActions.getPaymentInfo
        , clearPaymentInfo: paymentActions.clearPaymentInfo
        , paymentComplete: paymentActions.paymentComplete
        , generateLanguageIQLink: _3rdPartyLinksActions.generateLanguageIQLink
        , initialisePhotoIdQRCode: photoIdActions.initialisePhotoIdQRCode
        , photoIdSetPullingStatus: photoIdActions.photoIdSetPullingStatus
        , generateFingerPrintLink: _3rdPartyLinksActions.generateFingerPrintLink
        ,pollsignurl:agreementTemplatesActions.pollSignUrl
        ,validateTrnDetails: trnvalidationActions.validateTrnDetails
        ,getAgentTrnDetails:trnvalidationActions.getAgentTrnDetails
        ,checkforClassConflict:opportunityActions.CheckForClassConflictWithServicingTime
        ,photoIdStatusSingle: photoIdActions.photoIdStatusSingle
        // extends with passed in props if any
        , ...extendsDispatchToProps
    };

    return reduxConnect(
        mapStateToProps,
        { ...mapDispatchToProps }
    )(Component);
}


