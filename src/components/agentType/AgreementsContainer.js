import React, { Component } from "react";
import { connect } from "react-redux";
import { Translate } from "spotify-shared-web/localize";
import styles from "./AgreementsContainer.module.scss";
import Button from "spotify-shared-web/components/common/Button";
import DocumentList from "./agreements/DocumentList";
import LoadingComponent from "spotify-shared-web/components/common/LoadingComponent";
import { logoutRedirect } from "../../actions/loginActions";
import {
  getAgreementTemplates,
  getAgreementTemplateContent,
  checkSignStatus,
  getSignUrl,
  clearTransactionId
} from "../../actions/legalDocsActions";

import {
  hideAgreements,
  showAgreementContent,
  finalizeRegisterBusiness,
  finalizeRegisterIndividual,
} from "../../actions/agentTypeActions";
import { updateReferralUserData } from "../../actions/registrationActions";
import { getAdmissionStepInstances } from "../../actions/admissionStepActions";
import { AdmissionStep, AgentPath, agentStatusId } from "../../constants";
import commonStyle from "../shared/CommonStyle.module.scss";
import { CongoAgreementBlock } from "./agreements/CongaAgreement";
import { IframeModal } from "spotify-shared-web/components/common/IframeModal";
import { errorMessages } from "../../constants";
import SCREEN_CONFIG from "../../screensConfig";

const CURRENT_SCREEN = SCREEN_CONFIG.agreementContainer;


class LegalDocs extends Component {


  constructor(props){
    super(props)
    this.state={
      isModalVisible:false,
      currentSignUrl:null
    }

    this.openModal=this.openModal.bind(this)
    this.closeModal=this.closeModal.bind(this)
  }
  componentDidMount() {
    const { agentProfile, admissionSteps, getAgreementTemplates } = this.props;
    
    
    getAgreementTemplates(
      agentProfile.agentId,
      this.getAgreementPath(admissionSteps)
    );
  }

  componentDidUpdate(prevProps){
    //check if error is occured and agreeement Trigger is exceeded
    const {legalDocs}=prevProps
    const { agentProfile, admissionSteps, clearTransactionId } = this.props;
    //debugger;
    if(legalDocs.error=="" &&  this.props.legalDocs.error!="" && this.props.legalDocs.error!=errorMessages.ClearTransactionIdError && this.props.legalDocs.cntOfAgreementTriggers<2){
      // Initiate a call to clear Transaction
      setTimeout(()=>{
        clearTransactionId(
          agentProfile.agentId,
          this.getAgreementPath(admissionSteps)
        );
      },3000)

    }
  }
  getSubSteps = (agentTypeSteps) => {
    const currentStep = agentTypeSteps.find((agentTypeStep) => {
      return agentTypeStep.uniqueId === AdmissionStep.SOLE_PROPRIETOR;
    });
    return currentStep ? currentStep.childSteps : undefined;
  };

  getCurrentStepName = (admissionSteps) => {
    return admissionSteps.steps
      .find((admissionStep) => {
        return admissionStep.uniqueId === AdmissionStep.AGENT_TYPE;
      })
      .childSteps.find((step) => {
        return step.inProgress === true;
      });
  };

  getAgreementPath = (admissionSteps) => {
    const currentStep = this.getCurrentStepName(admissionSteps);

    switch (currentStep.uniqueId) {
      case AdmissionStep.SOLE_PROPRIETOR:
        return AgentPath.SOLE_PROPRIETOR;
      case AdmissionStep.NEW_CALL_CENTER:
        return AgentPath.NEW_CALL_CENTER;
      case AdmissionStep.JOIN_BUSINESS:
        return AgentPath.JOIN_BUSINESS;
      default:
        return null;
    }
  };

  getNextAction = (admissionSteps) => {
    const currentStep = this.getCurrentStepName(admissionSteps);

    switch (currentStep.uniqueId) {
      case AdmissionStep.SOLE_PROPRIETOR:
        return () =>
          this.props.finalizeRegisterIndividual(
            this.props.agentProfile.agentId
          );
      case AdmissionStep.NEW_CALL_CENTER:
        return () =>
          this.props.finalizeRegisterBusiness(this.props.agentProfile.agentId);
      case AdmissionStep.JOIN_BUSINESS:
        return () => {
          this.props.getAdmissionStepInstances();
          this.props.hideAgreements();
          this.props.referUser.agentStatusId = agentStatusId.VerifyIdentity;
          const { referUser } = this.props;
          const { userId } = this.props.agentProfile;
          const userData = {};
          userData.referUser = referUser;
          userData.userId = userId;
          this.props.updateReferralUserData(userData);
        };
      case AdmissionStep.PICK_CLIENT:
        return () => {
          this.props.getAdmissionStepInstances();
          this.props.hideAgreements();
          this.props.referUser.agentStatusId = agentStatusId.VerifyIdentity;
          const { referUser } = this.props;
          const { userId } = this.props.agentProfile;
          const userData = {};
          userData.referUser = referUser;
          userData.userId = userId;
          this.props.updateReferralUserData(userData);
        };
      default:
        return () => { };
    }
  };

  getIsSubmitting = (admissionSteps, agentType) => {
    const currentStep = this.getCurrentStepName(admissionSteps);

    switch (currentStep.uniqueId) {
      case AdmissionStep.SOLE_PROPRIETOR:
        return agentType.registerIndividual.isSubmittingFinalize;
      case AdmissionStep.NEW_CALL_CENTER:
        return agentType.registerBusiness.isSubmittingFinalize;
      case AdmissionStep.JOIN_BUSINESS:
        return agentType.joinBusiness.isSubmittingAgreements;
      default:
        return () => { };
    }
  };

  checkAllAgreementsSigned = (agreements) => {
    return !agreements.find((agreement) => {
      return agreement.isSigned === false;
    });
  };

  openModal(url){
    this.setState({isModalVisible:true,currentSignUrl:url})
  }
  closeModal(){
    const {muleSoftDocTransactionId}=this.props.legalDocs
    this.setState({isModalVisible:false})
    this.props.getSignUrl({muleSoftDocTransactionId:muleSoftDocTransactionId})
  }

  checkIfInprogress=(admissionStep)=>{
    const pathStep=this.getCurrentStepName(admissionStep)
    const agreementStep=pathStep.childSteps.find((e)=>{return e.uniqueId==AdmissionStep.JB_SIGN_AGREEMENTS || e.uniqueId==AdmissionStep.NCC_SIGN_AGREEMENTS || e.uniqueId==AdmissionStep.SP_SIGN_AGREEMENTS})

    if (agreementStep && agreementStep.statusNotes!=null && agreementStep.statusNotes.search(/transactionid/)!==-1){
      return true
    }
    return false
  }

  render() {
    const {
      agentProfile,
      agentType,
      admissionSteps,
      legalDocs,
      btnAgreementsNextId = "btnAgreementsNext",
      referUser,
    } = this.props;
    const {isFetchAgreementTemplatesComplete,error,cntOfAgreementTriggers}=legalDocs
    console.log(this.getCurrentStepName(admissionSteps),"Agreement Container")
    return (
      <Translate>
        {({ translate }) => (
          <>
           
              <div className="row">
                <div className={`col-md-12 col-xl-11`}>
                  {/*<h3 className={styles['text-bold']}>{translate("Let’s make it official!")}</h3>
                                <p className='agreementcopy'>{translate("agreementCopy")}</p>*/}

                  {/*<br />*/}
                  
                  {isFetchAgreementTemplatesComplete? <DocumentList
                    agreements={legalDocs.agreements}
                    agentId={agentProfile.agentId}
                    admissionSteps={admissionSteps}
                    showAgreementContent={this.openModal}
                    isRegisterBusiness={this.props.isRegisterBusiness}
                    isSoleProprietor={this.props.isSoleProprietor}
                    checkSignStatus={this.props.checkSignStatus}
                  />:<>
                  <LoadingComponent/>
                  <div className={`text-center`}>Please wait while we prepare your agreements</div>
                  </>}
                  {/* <CongoAgreementBlock
                    agreements={legalDocs.agreements}
                    openAgreementModal={this.openModal}
                    isFetchingComplete={legalDocs.isFetchAgreementTemplatesComplete}
                    errorMessage={legalDocs.error}
                    isSignInProgress={this.checkIfInprogress(admissionSteps)}
                  /> */}
                  <IframeModal
                    url={this.state.currentSignUrl}
                    handleClose={this.closeModal}
                    isVisible={this.state.isModalVisible}
                  />

                  {isFetchAgreementTemplatesComplete && error!="" && cntOfAgreementTriggers<2 &&  <div className={styles['server-error']}>{error}</div>}
                  {isFetchAgreementTemplatesComplete && error!="" && cntOfAgreementTriggers>=2 &&  <div className={styles['server-error']}>{errorMessages.CongaErrorAfterRetry}</div>}
                  <div
                    className={`${styles["submit-wrapper"]} ${commonStyle["lastComponent5"]}`}
                  >
                    <Button
                      id={btnAgreementsNextId}
                      size="nextButton"
                      color="orange"
                      type="button"
                      isSubmitting={this.getIsSubmitting(
                        admissionSteps,
                        agentType
                      )}
                      onClick={this.getNextAction(admissionSteps)}
                      // disabled={
                      //   !this.checkAllAgreementsSigned(legalDocs.agreements) ||
                      //   !legalDocs.agreements.length
                      // }
                    >
                      {translate(`${CURRENT_SCREEN}.nextButton`)}
                    </Button>
                  </div>
                </div>
              </div>
            
          </>
        )}
      </Translate>
    );
  }
}

function mapStateToProps({ legalDocs, agentType, admissionSteps, referUser }) {
  return { legalDocs, agentType, admissionSteps, referUser };
}

export default connect(mapStateToProps, {
  getAgreementTemplates,
  getAgreementTemplateContent,
  hideAgreements,
  showAgreementContent,
  finalizeRegisterBusiness,
  finalizeRegisterIndividual,
  getAdmissionStepInstances,
  logoutRedirect,
  updateReferralUserData,
  checkSignStatus,
  getSignUrl,
  clearTransactionId
})(LegalDocs);
