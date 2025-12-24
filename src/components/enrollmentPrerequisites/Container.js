import "./index.scss";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  Nav,
  Tabs,
  Tab,
  Row,
  Col,
  ButtonGroup,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import {
  EnrollmentPrerequisitesContainerBase,
  EnrollmentPrerequisitesContainerBaseConnect,
} from "spotify-shared/containers/EnrollmentPrerequisitesContainerBase";
import { Translate } from "spotify-shared-web/localize";
import LoadingComponent from "spotify-shared-web/components/common/LoadingComponent";
import MainLayoutFullNavAuthenticated from "../layouts/MainLayoutFullNavAuthenticated";
import { withRouter } from "react-router-dom";
import QuickOverviewCard from "spotify-shared-web/components/opportunities/QuickOverviewCard";
import EnrollmentStep from "./enrollmentstep";
import SelfAssessmentModal from "./selfassessment";
import GenericAssessmentModal from "./genericAssessmentModal";
import AssessmentInProgressModal from "./assessmentInProgressModal";
import PCCheckModal from "./pccheck";
import IdentityVerificationModal from "./identityVerificationModal";
import { EnrollmentModuleNames, PhotoIdStatus } from "spotify-shared/constants";
import CancelEnrollmentModal from "spotify-shared-web/components/opportunities/CancelEnrollmentModal";
import OpportunityDetailAlerts from "../opportunityDetails/OpportunityDetailAlerts";
import { setTimeout } from "timers";
import { osName } from "react-device-detect";
import AdditionalFormsModal from "./additionalFormsModal";
import ErrorMessage from "spotify-shared-web/components/common/ErrorMessage";
import BackgroundCheckModal from "./backgroundCheckModal";
import PaymentModal from "./paymentModal";
import PhotoIdModal from "./photoIdModal";
import NoShowDepositModal from "./noShowDepositModal";
import moment from "moment";
import { getPaymentPortalBaseUrl } from "spotify-shared/api/helpers/request";
import { IframeModal } from "spotify-shared-web/components/common/IframeModal";
import TRNValidationForm from "./TrnValidation";
import { retrieveGlobalParameter } from "spotify-shared/actions/globalParameters";
import { getGlobalParameterByString } from "spotify-shared/selectors/globalParameters";
import { GlobalParameterTypes } from "spotify-shared/constants";
import * as agentSelector from "spotify-shared/selectors/agentProfile";
import { COUNTRY_IDS } from "spotify-shared/constants"
import { CheckIfOppType } from "spotify-shared/helpers/opportunity"
import { CheckForClassConflictWithServicingTime } from "spotify-shared/actions/opportunities"



class EnrollmentPrerequisitesContainer extends EnrollmentPrerequisitesContainerBase {
  constructor(props) {
    super(props);
    this.state = {
      ShowSelfAssessmentModal: false,
      CurrentAssessment: null,
      PhotoIdAssessment: null,
      GenericAssessmentInProgress: null,
      PCAssessment: null,
      IdVerificationAssessment: null,
      BackgroundCheckAssessment: null,
      PaymentAssessment: null,
      noShowDepositPayment: null,
      isPaymentWindowAvailable: null,
      showDropReasonModal: false,
      noShowCloseWindowDate: null,
      showIframeModal: false,
      showTrnValidationForm: null,
      sevenDaysCCDFlow: false
    };

    this.onOpportunityLearnMoreClick =
      this.onOpportunityLearnMoreClick.bind(this);
    this.onSelfAssessmentStartClick =
      this.onSelfAssessmentStartClick.bind(this);
    this.getAllEnrollmentStepRequirements =
      this.getAllEnrollmentStepRequirements.bind(this);

    // Assessments
    this.onAssessmentStartClick = this.onAssessmentStartClick.bind(this);
    this.onHideGenericAssessmentModal =
      this.onHideGenericAssessmentModal.bind(this);
    this.onSubmitGenericAssessmentModal =
      this.onSubmitGenericAssessmentModal.bind(this);
    this.shouldShowGenericAssessmentModal =
      this.shouldShowGenericAssessmentModal.bind(this);
    this.shouldShowAssessmentInProgressModal =
      this.shouldShowAssessmentInProgressModal.bind(this);
    this.onHideAssessmentInProgressModal =
      this.onHideAssessmentInProgressModal.bind(this);
    this.onSubmitAssessmentInProgressModal =
      this.onSubmitAssessmentInProgressModal.bind(this);

    //Self Assessment Modal
    this.onSaveSelfAssessment = this.onSaveSelfAssessment.bind(this);
    this.shouldShowSelfAssessmentModal =
      this.shouldShowSelfAssessmentModal.bind(this);
    this.onHideSelfAssessmentModal = this.onHideSelfAssessmentModal.bind(this);

    //PC Check Assessment Modal
    this.onProcessPCCheckAssessment =
      this.onProcessPCCheckAssessment.bind(this);
    this.shouldShowPCCheckModal = this.shouldShowPCCheckModal.bind(this);
    this.onHidePCCheckModal = this.onHidePCCheckModal.bind(this);
    this.onPCCheckStartClick = this.onPCCheckStartClick.bind(this);
    this.onClearPCCheckAssessment = this.onClearPCCheckAssessment.bind(this);
    this.resetPCAssessment = this.resetPCAssessment(this);

    //Identity Verification
    this.onProcessIdVerificationAssessment =
      this.onProcessIdVerificationAssessment.bind(this);
    this.shouldShowIdVerificationModal =
      this.shouldShowIdVerificationModal.bind(this);
    this.onHideIdVerificationModal = this.onHideIdVerificationModal.bind(this);
    this.onIdVerificationStartClick =
      this.onIdVerificationStartClick.bind(this);
    this.onClearIdentityVerificationAssessment =
      this.onClearIdentityVerificationAssessment.bind(this);
    this.resetIdVerificationAssessment =
      this.resetIdVerificationAssessment(this);


    // AdditionalForms
    this.onViewSignAgreementClick = this.onViewSignAgreementClick.bind(this);
    this.onHideAdditionalFormsModal =
      this.onHideAdditionalFormsModal.bind(this);
    this.onConfirmSignAgreementClick =
      this.onConfirmSignAgreementClick.bind(this);

    //BACKGROUND_CHECK
    this.onBackgroundCheckStartClick =
      this.onBackgroundCheckStartClick.bind(this);
    this.onSubmitonBackgroundCheckModal =
      this.onSubmitonBackgroundCheckModal.bind(this);
    this.onHideonBackgroundCheckModal =
      this.onHideonBackgroundCheckModal.bind(this);
    this.shouldShowonBackgroundCheckModal =
      this.shouldShowonBackgroundCheckModal.bind(this);
    this.onResumeBackgroundCheckClick =
      this.onResumeBackgroundCheckClick.bind(this);

    //Payment
    this.onProcessPaymentAssessment =
      this.onProcessPaymentAssessment.bind(this);
    this.shouldShowPaymentModal = this.shouldShowPaymentModal.bind(this);
    this.onHidePaymentModal = this.onHidePaymentModal.bind(this);
    this.onPaymentStartClick = this.onPaymentStartClick.bind(this);
    this.resetPaymentAssessment = this.resetPaymentAssessment(this);

    //PHOTO_ID
    this.onSubmitPhotoIdAssessmentModal =
      this.onSubmitPhotoIdAssessmentModal.bind(this);
    this.onHidePhotoIdAssessmentModal =
      this.onHidePhotoIdAssessmentModal.bind(this);
    this.OnResumePhotoIdClick = this.OnResumePhotoIdClick.bind(this);
    this.OnRefreshPhotoIdClick = this.OnRefreshPhotoIdClick.bind(this);

    //NoshowDeposit
    this.NoShowDepositClick = this.NoShowDepositClick.bind(this);
    this.shouldShowNoShowDepositModal =
      this.shouldShowNoShowDepositModal.bind(this);
    this.onHideNoShowDepositModal = this.onHideNoShowDepositModal.bind(this);
    this.opendropModal = this.opendropModal.bind(this);
    this.onHideDropModal = this.onHideDropModal.bind(this);
    //this.paymentOptionAvailable=this.paymentOptionAvailable.bind(this)

    //conga Agreement
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)

    //TRN validation
    this.showTrnValidationForm = this.showTrnValidationForm.bind(this)
    this.hideTrnValidationForm = this.hideTrnValidationForm.bind(this)
    this.onSubmitTrnValidationform = this.onSubmitTrnValidationform.bind(this)
    this.onCheckForConflict = this.onCheckForConflict.bind(this);

  }

  componentWillUnmount() {
    this.props.photoIdSetPullingStatus(false);
  }

  componentDidUpdate(prevProps, prevState) {
    super.componentDidUpdate(prevProps, prevState);
    const { CurrentAssessment, noShowDepositPayment } = this.state;

    if (CurrentAssessment) {
      switch (CurrentAssessment.moduleName) {
        case EnrollmentModuleNames.INTERVIEW_IQ: {
          if (this.props.interviewIqResults !== prevProps.interviewIqResults) {
            this.setState({
              GenericAssessmentInProgress: this.props.interviewIqResults,
            });
          }
          break;
        }
        case EnrollmentModuleNames.VOICE_ASSESSMENT: {
          if (
            this.props.voiceAssessmentResults !==
            prevProps.voiceAssessmentResults
          ) {
            this.setState({
              GenericAssessmentInProgress: this.props.voiceAssessmentResults,
            });
          }
          break;
        }
        case EnrollmentModuleNames.PROGRAM_ASSESSMENT: {
          if (
            this.props.programAssessmentResults !==
            prevProps.programAssessmentResults
          ) {
            this.setState({
              GenericAssessmentInProgress: this.props.programAssessmentResults,
            });
          }
          break;
        }
        case EnrollmentModuleNames.LANGUAGE_IQ: {
          if (
            this.props.languageIQAssessmentResults !==
            prevProps.languageIQAssessmentResults
          ) {
            this.setState({
              GenericAssessmentInProgress:
                this.props.languageIQAssessmentResults,
            });
          }
          break;
        }
        case EnrollmentModuleNames.FINGERPRINT: {
          if (this.props.fingerPrintResults !== prevProps.fingerPrintResults) {
            this.setState({
              GenericAssessmentInProgress: this.props.fingerPrintResults,
            });
          }
          break;
        }
        default:
      }
    }

    //BACKGROUND_CHECK
    let previousBackgroungCheck = prevProps.enrollmentSteps.find(
      (x) => x.moduleName === EnrollmentModuleNames.BACKGROUND_CHECK
    );
    let updatedBackgroundCheck = this.props.enrollmentSteps.find(
      (x) => x.moduleName === EnrollmentModuleNames.BACKGROUND_CHECK
    );
    if (previousBackgroungCheck && updatedBackgroundCheck) {
      if (
        previousBackgroungCheck.inProgress === false &&
        updatedBackgroundCheck.inProgress === true
      ) {
        this.onHideonBackgroundCheckModal();
      }
    }

    //PHOTO_ID
    let previousPhotoId = prevProps.enrollmentSteps.find(
      (x) => x.moduleName === EnrollmentModuleNames.PHOTO_ID
    );
    let updatedPhotoId = this.props.enrollmentSteps.find(
      (x) => x.moduleName === EnrollmentModuleNames.PHOTO_ID
    );
    if (
      this.props.photoIdStatusData != null &&
      this.props.photoIdStatusData.overallStatus != null &&
      this.state.PhotoIdAssessment != null
    ) {
      if (
        (this.props.photoIdStatusData.inProgress === false &&
          this.props.photoIdStatusData.overallStatus != null &&
          this.props.photoIdStatusData.overallStatus !=
          PhotoIdStatus.Incomplete) ||
        (this.props.photoIdInitData == null &&
          this.props.photoIdStatusData != null &&
          this.props.photoIdMedia &&
          this.props.photoIdMedia.url &&
          this.props.isMobileDevice === false &&
          this.props.photoIdIsFetching == false)
      ) {
        this.setState({
          PhotoIdAssessment: null,
        });
      }
    }
    if (
      prevProps.photoIdStatusData &&
      this.props.photoIdStatusData &&
      typeof prevProps.photoIdStatusData.overallStatus != "undefined" &&
      prevProps.photoIdStatusData.overallStatus !=
      this.props.photoIdStatusData.overallStatus &&
      (this.props.photoIdStatusData.overallStatus == PhotoIdStatus.Fail ||
        this.props.photoIdStatusData.overallStatus == PhotoIdStatus.Pass)
    ) {
      this.initializePageHelper();
    }
    if (
      prevProps.photoIdStatusData &&
      prevProps.photoIdStatusData.overallStatus != PhotoIdStatus.Pass &&
      this.props.photoIdStatusData &&
      this.props.photoIdStatusData.overallStatus == PhotoIdStatus.Pass
    ) {
      this.initializePageHelper();
    }
    //for Noshow Deposit
    const enrollmentStep = this.props.enrollmentSteps.find(
      (x) => x.moduleName === EnrollmentModuleNames.DEPOSIT
    );
    if (
      enrollmentStep &&
      enrollmentStep.available &&
      noShowDepositPayment != null &&
      this.props.NoShowWindow &&
      !prevProps.NoShowWindow
    ) {
      this.NoShowDepositClick(enrollmentStep);
    }
  }

  onOpportunityLearnMoreClick() {
    this.props.history.push(`/opportunity/${this.props.opportunity.crmId}`);
  }

  onPCCheckStartClick(enrollmentStep) {
    this.setState({ PCAssessment: enrollmentStep });
  }

  shouldShowPCCheckModal() {
    return this.state.PCAssessment != null;
  }

  onClearPCCheckAssessment() {
    this.props.clearPCCheckAssessment();
  }

  resetPCAssessment() {
    this.setState({ PCAssessment: null });
  }

  onProcessPCCheckAssessment(values) {
    // Kick off web service to run pccheck
    let props = {
      opportunityId: this.props.opportunityId,
      pcId: values.hdnPCId,
      ipAddress: values.ip,
      osType: values.hdnOSType,
    };
    this.props.createPCCheckAssessment(props);
    if (
      this.props.pcCheckResults != null &&
      this.props.pcCheckResults.results === null &&
      this.props.pcCheckResults.globalResult === "PASS"
    ) {
      this.setState({ PCAssessment: null });
    }
  }
  onHidePCCheckModal() {
    this.props.clearPCCheckAssessment();
    setTimeout(this.setState({ PCAssessment: null }), 1000);
    this.initializePageHelper();
    this.props.history.push(
      `/opportunity/${this.props.opportunityId}/enrollment-prerequisites/${this.props.enrollmentId}`
    );
  }

  onSelfAssessmentStartClick(values) {
    this.setState({ ShowSelfAssessmentModal: true });
  }

  shouldShowSelfAssessmentModal() {
    this.setState({ ShowSelfAssessmentModal: true });
  }

  onSaveSelfAssessment(values) {
    var fullString = this.props.selfAssessmentQuestions
      .map(function (v, i) {
        return v;
      })
      .join(";");

    this.props.saveSelfAssessments(
      this.props.agentProfile.agentId,
      this.props.enrollmentId,
      fullString,
      this.props.opportunityId
    );
    setTimeout(this.onHideSelfAssessmentModal, 1000);
    this.initializePageHelper();
    this.props.history.push(
      `/opportunity/${this.props.opportunityId}/enrollment-prerequisites/${this.props.enrollmentId}`
    );
  }

  onHideSelfAssessmentModal() {
    this.setState({ ShowSelfAssessmentModal: false });
  }

  getAllEnrollmentStepRequirements() {
    let set = new Set(
      this.props.enrollmentSteps
        .sort((a, b) => (b.sortOrder < a.sortOrder ? 1 : -1))
        .map((es) => es.enrollmentStepRequirements.map((esr) => esr.name))
        .flat()
    );
    return [...set];
  }

  onAssessmentStartClick(enrollmentStep) {
    this.setState({ CurrentAssessment: enrollmentStep });
  }

  onSubmitGenericAssessmentModal() {
    const { initialisePhotoIdQRCode } = this.props;
    const { CurrentAssessment } = this.state;
    switch (CurrentAssessment.moduleName) {
      case EnrollmentModuleNames.INTERVIEW_IQ: {
        let props = {
          opportunityId: this.props.opportunityId,
          enrollmentId: this.props.enrollmentId,
        };
        this.props.generateInterviewIqLink(props);
        break;
      }
      case EnrollmentModuleNames.VOICE_ASSESSMENT: {
        this.props.generateVoiceLink(this.props.enrollmentId);
        break;
      }
      case EnrollmentModuleNames.PROGRAM_ASSESSMENT: {
        let props = {
          opportunityId: this.props.opportunity.opportunityId,
          enrollmentId: this.props.enrollmentId,
        };
        this.props.generateProgramLink(props);
        break;
      }
      case EnrollmentModuleNames.LANGUAGE_IQ: {
        let props = {
          opportunityId: this.props.opportunity.opportunityId,
          enrollmentId: this.props.enrollmentId,
        };
        this.props.generateLanguageIQLink(props);
        break;
      }
      case EnrollmentModuleNames.PHOTO_ID: {
        this.props.initialisePhotoIdQRCode({
          enrollmentId: this.props.enrollmentId,
        });
        this.setState({
          PhotoIdAssessment: CurrentAssessment,
          CurrentAssessment: null,
        });
        break;
      }
      case EnrollmentModuleNames.FINGERPRINT: {
        let props = {
          opportunityId: this.props.opportunity.opportunityId,
          enrollmentId: this.props.enrollmentId,
        };
        this.props.generateFingerPrintLink(props);
        setTimeout(() => this.onHideGenericAssessmentModal(), 3000);
        break;
      }
      default:
        this.setState({
          CurrentAssessment: null,
        });
    }
  }

  OnResumePhotoIdClick(enrollmentStep, photoIdStatusData) {
    this.props.initialisePhotoIdQRCode({
      enrollmentId: this.props.enrollmentId,
    });
    this.setState({
      CurrentAssessment: null,
      PhotoIdAssessment: enrollmentStep,
    });
  }

  OnRefreshPhotoIdClick(enrollmentStep) {
      const _photoProps = {
				agentId: this.props.agentProfile.agentId,
				enrollmentId: this.props.enrollmentId,
			};
        this.props.photoIdStatusSingle(_photoProps);
        this.setState({
            CurrentAssessment: null,
            PhotoIdAssessment: enrollmentStep,
        });
    }

  onHideGenericAssessmentModal() {
    this.setState({ CurrentAssessment: null });
  }

  shouldShowGenericAssessmentModal() {
    const { CurrentAssessment, GenericAssessmentInProgress } = this.state;
    return CurrentAssessment != null && GenericAssessmentInProgress === null;
  }

  onSubmitAssessmentInProgressModal() {
    this.setState({
      CurrentAssessment: null,
      GenericAssessmentInProgress: null,
    });
    this.initializePageHelper();
  }

  onHideAssessmentInProgressModal() {
    this.setState({
      CurrentAssessment: null,
      GenericAssessmentInProgress: null,
    });
    this.initializePageHelper();
  }

  shouldShowAssessmentInProgressModal() {
    const { CurrentAssessment, GenericAssessmentInProgress } = this.state;
    return CurrentAssessment != null && GenericAssessmentInProgress != null;
  }

  onIdVerificationStartClick(enrollmentStep) {
    this.setState({ IdVerificationAssessment: enrollmentStep });
  }
  shouldShowIdVerificationModal() {
    return this.state.IdVerificationAssessment != null;
  }

  onClearIdentityVerificationAssessment() {
    this.props.clearIdentityVerificationAssessment();
  }

  resetIdVerificationAssessment() {
    this.setState({ IdVerificationAssessment: null });
  }

  onProcessIdVerificationAssessment(values) {
    // Kick off web service to run pccheck
    let props = {
      enrollmentId: this.props.enrollmentId,
    };

    //Initial call to get the 1st set of questions
    if (
      this.props.idVerificationQuestionData != null &&
      this.props.idVerificationQuestionData.hasQuestions == false &&
      this.props.idVerificationQuestionData.intialQuestions == false
    ) {
      this.props.checkInitialExperianVerification(props);
    } else values != null && values.length > 0;
    {
      var Answers = [];
      var answers = Object.values(values)
        .map(function (v) {
          return v;
        })
        .join(";");

      const answer_array = answers.split(";");

      if (answers.length > 0) {
        var sessionID = this.props.idVerificationQuestionData.data.sessionID;
        var referenceNumber =
          this.props.idVerificationQuestionData.data.referenceNumber;
        var questionAnswers =
          this.props.idVerificationQuestionData.data.questionAndAnswer;

        for (var i = 0; i < questionAnswers.length; i++) {
          if (questionAnswers[i] != null) {
            let answer = {
              Answer: answer_array[i],
              choices: questionAnswers[i].choices,
              displayOrder: questionAnswers[i].displayOrder,
              questionText: questionAnswers[i].questionText,
              questionType: questionAnswers[i].questionType,
            };

            Answers.push(answer);
          }
        }

        let answerProps = {
          opportunityId: this.props.opportunityId,
          enrollmentId: this.props.enrollmentId,
          sessionID: this.props.idVerificationQuestionData.data.sessionID,
          referenceNumber:
            this.props.idVerificationQuestionData.data.referenceNumber,
          questionAnswers: Answers,
        };

        this.props.saveIdentityVerificationQuestions(answerProps);
      }
    }
  }
  onHideIdVerificationModal() {
    if (this.props.idVerificationQuestionData.hasQuestions === true) {
      if (window.confirm("Are you sure you want to cancel?") == false) {
        return;
      }
    }
    let props = {
      enrollmentId: this.props.enrollmentId,
    };
    this.props.clearIdentityVerificationAssessment(props);
    this.setState({ IdVerificationAssessment: null });
    this.initializePageHelper();
  }
  onViewSignAgreementClick(aggrement) {
    let props = { aggrement, enrollmentId: this.props.enrollmentId };

    this.props.RetrieveAgreementTemplateByType(props);
  }

  onHideAdditionalFormsModal() {
    this.props.CancelAgreementSigning();
  }

  onConfirmSignAgreementClick(agreementSigning) {
    this.props.SaveEnrollmentAgreement({
      agreementSigning,
      opportunityId: this.props.opportunityId,
      enrollmentId: this.props.enrollmentId,
    });
  }

  //#region BACKGROUND_CHECK
  onBackgroundCheckStartClick(enrollmentStep) {
    this.setState({ BackgroundCheckAssessment: enrollmentStep });
  }

  onSubmitonBackgroundCheckModal(values) {
    if (this.props.isAgentFromUK) {
      this.props.submitUKOrderNumber({
        opportunityId: this.props.opportunityId,
        enrollmentId: this.props.enrollmentId,
        orderNumber: values.orderNumber,
      });
    } else if (this.props.isAgentFromJM) {
      this.props.submitJMOrderNumber({
        opportunityId: this.props.opportunityId,
        enrollmentId: this.props.enrollmentId,
        orderNumber: values.orderNumber,
      });
    } else {
      this.props.generateUSLink({
        opportunityId: this.props.opportunityId,
        enrollmentId: this.props.enrollmentId,
      });
    }
  }

  onHideonBackgroundCheckModal() {
    this.props.clearPaymentInfo();
    this.setState({ BackgroundCheckAssessment: null });
    this.initializePageHelper();
  }

  shouldShowonBackgroundCheckModal() {
    return this.state.BackgroundCheckAssessment != null;
  }

  onResumeBackgroundCheckClick() {
    if (this.props.isAgentFromUK) {
      // this is not a valid case
    } else {
      //
      this.props.generateUSLink({
        opportunityId: this.props.opportunityId,
        enrollmentId: this.props.enrollmentId,
      });
    }
  }

  //#endregion

  //#region Payment
  onPaymentStartClick(enrollmentStep) {
    this.props.retrieveShippingAddress({
      opportunityId: this.props.opportunityId,
    });

    this.setState({ PaymentAssessment: enrollmentStep });
  }
  shouldShowPaymentModal() {
    return this.state.PaymentAssessment != null;
  }

  resetPaymentAssessment() {
    this.setState({ PaymentAssessment: null });
  }

  onProcessPaymentAssessment(values) {
    //Payment Complete process is done
    if (
      this.props.paymentInfoData != null &&
      this.props.paymentInfoData.cost == 0 &&
      this.props.paymentCompleteData != null &&
      this.props.paymentCompleteData.isSuccessful != null &&
      this.props.paymentCompleteData.isSuccessful == true
    ) {
      this.onHidePaymentModal();
      return;
    } else if (
      (this.props.verifiedData !== null &&
        this.props.verifiedData.verified == true) ||
      (this.props.paymentShippingResults != null &&
        (this.props.paymentShippingResults.required == false ||
          this.props.paymentInfoData.countryCode != "US"))
    ) {
      if (this.props.paymentInfoData != null && (
        (this.props.paymentInfoData.itemType == "Class" && ((this.props.paymentInfoData.cost + this.props.paymentInfoData.flatBGCFees) > 0) || (this.props.paymentInfoData.createPaymentProfile)) ||
        (this.props.paymentInfoData.itemType == "Deposit" && (this.props.paymentInfoData.classNoShowFees > 0)))
      ) {
        //redirect to spotify.payment.com
        localStorage.clear();
        setTimeout(() => {
          window.location = `${getPaymentPortalBaseUrl()}/agent/${this.props.agentProfile.agentId
            }/enrollment/${this.props.enrollmentId}`;
        }, 500);
      } else if (
        this.props.paymentCompleteData != null &&
        this.props.paymentCompleteData.isSaving == false &&
        this.props.paymentCompleteData.isSuccessful == null
      ) {
        const completeProps = {
          itemCost: this.props.paymentInfoData.upFrontCost,
          vouchersUsed: this.props.paymentInfoData.vouchersUsed,
          isOppCapturedCostBigger:
            this.props.paymentInfoData.isOppCapturedCostBigger,
          enrollmentCrmId: this.props.enrollmentId,
          opportunityCrmId: this.props.opportunityId,
          voucherType: "506920000",
        };
        //if 
        this.props.paymentComplete(completeProps);
      }
    } else if (values != null) {
      if (
        this.props.verifiedData !== null &&
        this.props.verifiedData.verified == false &&
        this.props.verifiedData.verificationLevelType == "Multiple"
      ) {
        if (values.multipleaddress != null) {
          const addressPicked =
            this.props.verifiedData.returnedAddresses[values.multipleaddress];
          const addressProps = {
            addressString: addressPicked.addressLine[0],
            street1: null,
            street2: null,
            city: null,
            state: null,
            zip: null,
          };
          this.props.validateShippingAddress(addressProps);
        }
      } else if (values.address == "New Address") {
        const addressProps = {
          street1: values.addressLine1,
          street2: values.addressLine2,
          city: values.city,
          state: values.state,
          zip: values.zip,
          addressString: "",
        };
        this.props.validateShippingAddress(addressProps);
      } else if (values.address == "Saved Address") {
        if (this.props.paymentShippingResults.cspAddress != null) {
          const addressProps2 = {
            street1: "",
            street2: "",
            city: "",
            state: "",
            zip: "",
            addressString:
              this.props.paymentShippingResults.cspAddress.addressString,
          };
          this.props.validateShippingAddress(addressProps2);
        }
      } else if (values.address == "Profile Address") {
        if (this.props.paymentShippingResults.contactProfileAddress != null) {
          const addressProps3 = {
            street1: "",
            street2: "",
            city: "",
            state: "",
            zip: "",
            addressString:
              this.props.paymentShippingResults.contactProfileAddress
                .addressString,
          };
          this.props.validateShippingAddress(addressProps3);
        }
      }
    }
  }

  onHidePaymentModal() {
    this.props.clearPaymentInfo();
    this.setState({ PaymentAssessment: null, noShowDepositPayment: null });
    this.initializePageHelper();
  }
  //#endregion

  onSubmitPhotoIdAssessmentModal() { }

  onHidePhotoIdAssessmentModal() {
    this.setState({
      PhotoIdAssessment: null,
    });
  }

  //NoshowDepoist
  NoShowDepositClick(sevenDaysCCDFlow, enrollmentstep) {
    this.setState({
      noShowDepositPayment: enrollmentstep,
      sevenDaysCCDFlow
    });

    if (
      this.props.NoShowWindow &&
      this.props.opportunity.primaryClassSchedule
    ) {
      let currentDate;
      if (this.props.opportunity.currencyCode != "£") {
        currentDate = moment().tz("America/New_York").format();
        console.log(currentDate, "calculated Current Date")
        currentDate = new Date(currentDate).getTime()
      } else {
        currentDate = moment().tz("Europe/London").format();
        console.log(currentDate, "calculated Current Date")

        const temp1 = moment().tz("Europe/London").utcOffset()
        const temp2 = moment().tz("America/New_York").utcOffset()
        console.log(temp1, temp2, "Timezones")

        //get the time difference between Newyork and London
        currentDate = new Date(currentDate).getTime() + (temp1 - temp2) * 60 * 1000
        console.log(currentDate, "calculated CUrrent date in ms")
      }
      currentDate = new Date(currentDate).getTime();
      const { classStartDateTime } =
        this.props.opportunity.primaryClassSchedule;
      const classStart = new Date(classStartDateTime).getTime();
      const window = parseInt(this.props.NoShowWindow) * 24 * 60 * 60 * 1000; //X days class start date
      const closewindow =
        parseInt(this.props.NoShowAutoDrop) * 24 * 60 * 60 * 1000;
      const reinstatewindow =
        parseInt(this.props.NoShowReinstate) * 24 * 60 * 60 * 1000;

      const calculatedWindowCloseDate = new Date();

      //CCD FLOW Conditions starts

      let GoliveDate = this.props.goliveDate;
      let openOnPortal = this.props.opportunity.openOnPortal;
      let EnrollmentStatusDate = this.props.opportunity.enrollmentStatusDate;

      // Convert both to Date objects (or timestamps)
      let goliveTimestamp = new Date(GoliveDate).toISOString().slice(0, 10);
      let openOnPortalTimestamp = new Date(openOnPortal).toISOString().slice(0, 10);

      if ((openOnPortalTimestamp <= goliveTimestamp && this.props.opportunity.openOnPortal != "0001-01-01T00:00:00" && this.props.isAgentFromUSA) || (!this.props.isAgentFromUSA)) {
        if (classStart - currentDate <= window) {
          if (classStart - currentDate >= closewindow) {
            //deposit window open
            calculatedWindowCloseDate.setTime(classStart - closewindow);

            this.setState({
              isPaymentWindowAvailable: true,
              noShowCloseWindowDate: calculatedWindowCloseDate,
            });
            this.props.retrieveShippingAddress({
              opportunityId: this.props.opportunityId,
            });
          } else if (classStart - currentDate >= reinstatewindow) {
            //reinstate scenario
            calculatedWindowCloseDate.setTime(classStart - reinstatewindow);

            this.setState({
              isPaymentWindowAvailable: true,
              noShowCloseWindowDate: calculatedWindowCloseDate,
            });
            this.props.retrieveShippingAddress({
              opportunityId: this.props.opportunityId,
            });
          } else {
            //peroid after reinstate and before Class start date
            calculatedWindowCloseDate.setTime(classStart);

            this.setState({
              isPaymentWindowAvailable: true,
              noShowCloseWindowDate: calculatedWindowCloseDate,
            });
            this.props.retrieveShippingAddress({
              opportunityId: this.props.opportunityId,
            });
          }
        } else {
          calculatedWindowCloseDate.setTime(classStart - window);
          this.setState({
            isPaymentWindowAvailable: false,
            noShowCloseWindowDate: calculatedWindowCloseDate,
          });
        }
      } else if ((openOnPortalTimestamp > goliveTimestamp || this.props.opportunity.openOnPortal === "0001-01-01T00:00:00") && this.props.isAgentFromUSA) {
        const today = new Date();
        const availableOnDate = new Date(enrollmentstep.availableOn);

        let availableOnDateTimestamp = new Date(enrollmentstep.availableOn).toISOString().slice(0, 10);

        const enrollmentStatusDate = new Date(EnrollmentStatusDate);
        let enrollmentStatusDateTimestamp = new Date(EnrollmentStatusDate).toISOString().slice(0, 10);
        const millisInDay = 1000 * 60 * 60 * 24;

        // Calculate the deadline date
        let deadlineDate;

        if (enrollmentStatusDateTimestamp > availableOnDateTimestamp) {
          deadlineDate = new Date(enrollmentStatusDate.getTime() + this.props.xDayLimit * millisInDay);
        } else {
          deadlineDate = new Date(availableOnDate.getTime() + this.props.xDayLimit * millisInDay);
        }
        const formattedDeadline = deadlineDate.toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });


        calculatedWindowCloseDate.setTime(deadlineDate);

        this.setState({
          isPaymentWindowAvailable: true,
          noShowCloseWindowDate: calculatedWindowCloseDate,
        });
        this.props.retrieveShippingAddress({
          opportunityId: this.props.opportunityId,
        });

      }
    }
  }
  shouldShowNoShowDepositModal() {
    return this.state.noShowDepositPayment != null;
  }
  onHideNoShowDepositModal() {
    this.props.clearPaymentInfo();
    this.setState({ noShowDepositPayment: null });
    this.initializePageHelper();
  }
  opendropModal() {
    this.setState({ noShowDepositPayment: null, showDropReasonModal: true });
  }
  // paymentOptionAvailable(){
  //     return (this.state.noShowDepositPayment != null);
  // }
  shouldShowDropModal() {
    return this.state.showDropReasonModal;
  }

  onHideDropModal() {
    this.setState({ showDropReasonModal: false });
  }
  openModal() {
    // alert("some clicked")
    this.setState({ showIframeModal: true })
  }
  closeModal() {
    const { muleSoftDocTransactionId, muleSoftDocSignURL } = this.props.agreementSigning.data
    this.setState({ showIframeModal: false })
    console.log(muleSoftDocTransactionId, muleSoftDocSignURL, "close modal")
    this.props.pollsignurl({ muleSoftDocTransactionId: muleSoftDocTransactionId })
  }
  //region TRN Validation
  showTrnValidationForm(enrollmentStep) {
    this.setState(({ showTrnValidationForm: enrollmentStep }))
  }

  hideTrnValidationForm() {

    if (this.props.trnValidationdata.error != null) {
      //get trn verify details from server
      this.props.getAgentTrnDetails()
    }
    this.setState(({ showTrnValidationForm: null }))
  }
  //Handle Trn submit
  onSubmitTrnValidationform(formvalues, actions) {
    if (formvalues) {
      this.props.validateTrnDetails({ ...formvalues, enrollmentId: this.props.enrollmentId })

    }
  }
  //endregion

  //Check for classConflict
  onCheckForConflict(values) {
    const { agentProfile, opportunity } = this.props
    if (agentProfile.countryId == COUNTRY_IDS.US && CheckIfOppType(opportunity.type)) {
      this.props.checkforClassConflict(values)
    }

  }

  render() {
    const {
      opportunityId,
      enrollmentId,
      isFetching,
      opportunity,
      enrollmentSteps,
      selfAssessmentQuestions,
      pcCheckResults,
      isSubmittingPCCheck,
      isCompletePCCheck,
      pcCheckErrors,
      idVerificationnResults,
      idVerificationErrors,
      isSubmittingIdVerification,
      isCompleteIdVerification,
      agreementsToSign,
      agreementSigning,
      idVerificationQuestionData,
      isMobileDevice,
      isSuccessfulIdVerification,
      isAgentFromUK,
      isAgentFromJM,
      isBackgroundCheckFetching,
      backgroundCheckData,
      isBackgroundCheckComplete,
      paymentShippingResults,
      paymentShippingErrors,
      isProcessingPaymentShipping,
      isCompletePaymentShipping,
      paymentInfoData,
      verifiedData,
      statesData,
      paymentCompleteData,
      photoIdIsFetching,
      photoIdIsStatusLoading,
      photoIdStatusPullCount,
      photoIdError,
      photoIdInitData,
      photoIdStatusData,
      photoIdMedia,
      topIsNotPhotoIdStep,
      NoShowWindow,
      NoShowAutoDrop,
      NoShowReinstate,
      trnValidationdata,
      agentProfile,
      goliveDate,
      xDayLimit,
      isAgentFromUSA,
      conflictCheckData
    } = this.props;

    const {
      onOpportunityLearnMoreClick,
      onViewSignAgreementClick,
      onBackgroundCheckStartClick,
      onResumeBackgroundCheckClick,
    } = this;

    if (isFetching) return <LoadingComponent />;

    return (
      <Fragment>
        <Translate>
          {({ translate }) => (
            <Fragment>
              {opportunity && (
                <OpportunityDetailAlerts
                  showContinue={false}
                  opportunity={opportunity}
                  showDropModalAuto={this.shouldShowDropModal()}
                  onHide={this.onHideDropModal}
                  checkforConflict={this.onCheckForConflict}
                  isConflictDataFetching={conflictCheckData}
                />
              )}

              <Row className="enrollmentPrerequisitesContainer mt-4 mb-4">
                <Col xs={12} sm={12} md={8} lg={9} className="main-content">
                  <Row>
                    <Col
                      xs={12}
                      sm={12}
                      md={12}
                      lg={4}
                      className="opportunity-data"
                    >
                      <QuickOverviewCard
                        onLearnMoreClick={onOpportunityLearnMoreClick}
                        opportunity={opportunity}
                      />
                    </Col>
                    <Col
                      xs={12}
                      sm={12}
                      md={12}
                      lg={8}
                      className="enrollment-prerequisites-steps"
                    >
                      {isMobileDevice && this.props.topIsNotPhotoIdStep && (
                        <Fragment>
                          <ErrorMessage
                            message={translate("prerequisitesMobileMsg")}
                          />
                        </Fragment>
                      )}
                      {enrollmentSteps.map((step, key) => (
                        <EnrollmentStep
                          key={key}
                          isMobileDevice={isMobileDevice}
                          isAgentFromUK={isAgentFromUK}
                          backgroundCheckData={backgroundCheckData}
                          onBackgroundCheckStartClick={
                            onBackgroundCheckStartClick
                          }
                          onResumeBackgroundCheckClick={
                            onResumeBackgroundCheckClick
                          }
                          isBackgroundCheckFetching={isBackgroundCheckFetching}
                          enrollmentStep={step}
                          agreementsToSign={agreementsToSign}
                          onViewSignAgreementClick={onViewSignAgreementClick}
                          onAssessmentStartClick={this.onAssessmentStartClick}
                          onSelfAssessmentStartClick={
                            this.onSelfAssessmentStartClick
                          }
                          onIdVerificationStartClick={
                            this.onIdVerificationStartClick
                          }
                          onPCCheckStartClick={this.onPCCheckStartClick}
                          idVerificationnResults={idVerificationnResults}
                          onPaymentStartClick={this.onPaymentStartClick}
                          photoIdStatusData={photoIdStatusData}
                          photoIdIsStatusLoading={photoIdIsStatusLoading}
                          OnResumePhotoIdClick={this.OnResumePhotoIdClick}
                          OnRefreshPhotoIdClick={this.OnRefreshPhotoIdClick}
                          enrollmentCrmId={enrollmentId}
                          isAgentFromJM={isAgentFromJM}
                          classNoShowFees={
                            this.props.opportunity
                              ? this.props.opportunity.classNoShowFees
                              : null
                          }
                          currencyCode={
                            this.props.opportunity
                              ? this.props.opportunity.currencyCode
                              : null
                          }
                          NoShowAutoDrop={NoShowAutoDrop}
                          NoShowWindow={NoShowWindow}
                          NoShowReinstate={NoShowReinstate}
                          agreementData={agreementSigning}
                          showIframe={this.openModal}
                          showTrnValidationForm={this.showTrnValidationForm}
                          trnData={trnValidationdata.data}
                          isTRNDataFetching={trnValidationdata.isFetching}

                          NoShowDepositClick={(sevenDaysCCDFlow, enrollmentstep) => this.NoShowDepositClick(sevenDaysCCDFlow, enrollmentstep)}
                          OpenOnPortal={
                            this.props.opportunity
                              ? this.props.opportunity.openOnPortal
                              : null
                          }
                          xDayLimit={
                            this.props.xDayLimit
                              ? this.props.xDayLimit
                              : null
                          }
                          goliveDate={goliveDate}
                          isAgentFromUSA={isAgentFromUSA}
                          EnrollmentStatusDate={this.props.opportunity.enrollmentStatusDate}
                        />
                      ))}
                    </Col>
                  </Row>
                </Col>
                <Col
                  xs={12}
                  sm={12}
                  md={4}
                  lg={3}
                  className="secondary-content "
                >
                  <div className="spotify-card secondary ">
                    {translate(`Get prepared before you begin`)}
                    <br />
                    {translate(`To complete these assessments, you'll need`)}
                    <br />
                    <ul>
                      {this.getAllEnrollmentStepRequirements().map((r, key) => (
                        <li key={key}>{r}</li>
                      ))}
                    </ul>
                  </div>
                </Col>
              </Row>
              <SelfAssessmentModal
                title={translate(`Self Assessment Questions`)}
                isModalVisible={this.state.ShowSelfAssessmentModal}
                onSubmit={this.onSaveSelfAssessment}
                onHideModal={this.onHideSelfAssessmentModal}
                onCancel={this.onHideSelfAssessmentModal}
                selfAssessmentQuestions={selfAssessmentQuestions}
              />
              <GenericAssessmentModal
                assessment={this.state.CurrentAssessment}
                onSubmit={this.onSubmitGenericAssessmentModal}
                onHideModal={this.onHideGenericAssessmentModal}
                isModalVisible={this.shouldShowGenericAssessmentModal()}
                isStepPhotoId={true}
              />
              <AssessmentInProgressModal
                assessment={this.state.CurrentAssessment}
                onSubmit={this.onSubmitAssessmentInProgressModal}
                onHideModal={this.onHideAssessmentInProgressModal}
                isModalVisible={this.shouldShowAssessmentInProgressModal()}
              />
              <PCCheckModal
                assessment={this.state.PCAssessment}
                onSubmit={this.onProcessPCCheckAssessment}
                onHideModal={this.onHidePCCheckModal}
                isModalVisible={this.shouldShowPCCheckModal()}
                pcCheckResults={pcCheckResults}
                isSubmittingPCCheck={isSubmittingPCCheck}
                isCompletePCCheck={isCompletePCCheck}
                pcCheckErrors={pcCheckErrors}
                rulesetId={opportunity ? opportunity.pcCheckRulesetId : 0}
              />
              <IdentityVerificationModal
                assessment={this.state.IdVerificationAssessment}
                isModalVisible={this.shouldShowIdVerificationModal()}
                onSubmit={this.onProcessIdVerificationAssessment}
                onHideModal={this.onHideIdVerificationModal}
                idVerificationnResults={idVerificationnResults}
                isSubmittingIdVerification={isSubmittingIdVerification}
                isCompleteIdVerification={isCompleteIdVerification}
                idVerificationQuestionData={idVerificationQuestionData}
                idVerificationErrors={idVerificationErrors}
                isSuccessfulIdVerification={isSuccessfulIdVerification}
              />
              {/* <AdditionalFormsModal
                onHideModal={this.onHideAdditionalFormsModal}
                agreementSigning={agreementSigning}
                onConfirmSignAgreementClick={this.onConfirmSignAgreementClick}
                isModalVisible={agreementSigning.data != null && agreementSigning.data.muleSoftTransactionId==null}
              /> */}
              <BackgroundCheckModal
                isBackgroundCheckFetching={isBackgroundCheckFetching}
                isAgentFromUK={isAgentFromUK}
                isAgentFromJM={isAgentFromJM}
                assessment={this.state.BackgroundCheckAssessment}
                onSubmit={this.onSubmitonBackgroundCheckModal}
                onHideModal={this.onHideonBackgroundCheckModal}
                isModalVisible={this.shouldShowonBackgroundCheckModal()}
                isBackgroundCheckComplete={isBackgroundCheckComplete}
              />
              <PaymentModal
                assessment={this.state.PaymentAssessment}
                isModalVisible={this.shouldShowPaymentModal()}
                onSubmit={this.onProcessPaymentAssessment}
                onHideModal={this.onHidePaymentModal}
                paymentResults={paymentShippingResults}
                isSubmittingPayment={isProcessingPaymentShipping}
                isCompletePayment={isCompletePaymentShipping}
                paymentErrors={paymentShippingErrors}
                paymentInfoData={paymentInfoData}
                verifiedData={verifiedData}
                statesData={statesData}
                paymentCompleteData={paymentCompleteData}
                doesDepositStepExist={enrollmentSteps.filter(
                  (e) => e.moduleName == EnrollmentModuleNames.DEPOSIT
                )}
              />
              <NoShowDepositModal
                assessment={this.state.noShowDepositPayment}
                isModalVisible={this.shouldShowNoShowDepositModal()}
                onSubmit={this.onProcessPaymentAssessment}
                onHideModal={this.onHideNoShowDepositModal}
                paymentResults={paymentShippingResults}
                isSubmittingPayment={isProcessingPaymentShipping}
                isCompletePayment={isCompletePaymentShipping}
                paymentErrors={paymentShippingErrors}
                paymentInfoData={paymentInfoData}
                verifiedData={verifiedData}
                statesData={statesData}
                paymentCompleteData={paymentCompleteData}
                isPaymentWindowAvaliable={this.state.isPaymentWindowAvailable}
                showDropReasonModal={this.opendropModal}
                WindowCloseDate={this.state.noShowCloseWindowDate}
                NoShowWindow={this.props.NoShowWindow}
                sevenDaysCCDFlow={this.state.sevenDaysCCDFlow}
              />
              <PhotoIdModal
                assessment={this.state.PhotoIdAssessment}
                onSubmit={this.onSubmitPhotoIdAssessmentModal}
                onHideModal={this.onHidePhotoIdAssessmentModal}
                isModalVisible={this.state.PhotoIdAssessment != null}
                photoIdIsFetching={photoIdIsFetching}
                photoIdIsStatusLoading={photoIdIsStatusLoading}
                photoIdStatusPullCount={photoIdStatusPullCount}
                photoIdError={photoIdError}
                isMobileDevice={isMobileDevice}
                data={photoIdInitData}
                status={photoIdStatusData}
                photoIdMedia={photoIdMedia}
              />

              {agreementsToSign && agreementSigning.data && agreementSigning.data.muleSoftDocSignURL && <IframeModal
                url={agreementSigning.data.muleSoftDocSignURL}
                handleClose={this.closeModal}
                isVisible={this.state.showIframeModal}
              />}

              <TRNValidationForm
                onSubmitSave={this.onSubmitTrnValidationform}
                isModalVisible={this.state.showTrnValidationForm != null}
                onHide={this.hideTrnValidationForm}
                trnData={trnValidationdata.data}
                isSubmitting={trnValidationdata.isFetching}
                isSuccessful={trnValidationdata.validationsuccess}
                agentCrmId={agentProfile.contactId}
                hasErrors={trnValidationdata.error}

              />
            </Fragment>
          )}
        </Translate>
      </Fragment>
    );
  }
}

function extendMapStateToProps(state, props) {
  const opportunityId = props.match.params.opportunityId;
  const enrollmentId = props.match.params.enrollmentId;
  const isMobileDevice = state.app.device == "Mobile";
  const goliveDate = getGlobalParameterByString(state, GlobalParameterTypes.DOLE_GOLIVE_CCD);
  const xDayLimit = getGlobalParameterByString(state, GlobalParameterTypes.CDD_Pay_Day_Limit);
  const isAgentFromUSA = agentSelector.isAgentFromUSA(state);

  return {
    opportunityId,
    enrollmentId,
    agentProfile: state.agentProfile,
    isMobileDevice,
    goliveDate,
    xDayLimit,
    isAgentFromUSA
  };
}

const mapDispatchToProps = {
  retrieveGlobalParameter,
  checkforClassConflict: CheckForClassConflictWithServicingTime
};


export default MainLayoutFullNavAuthenticated(
  withRouter(
    EnrollmentPrerequisitesContainerBaseConnect(
      connect,
      EnrollmentPrerequisitesContainer,
      extendMapStateToProps
    )
  )
);
