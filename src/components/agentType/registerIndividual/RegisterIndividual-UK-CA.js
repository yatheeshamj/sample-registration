import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import MainLayout from '../../layouts/MainLayout';
import AdmissionSteps from '../../shared/admissionSteps/AdmissionSteps';
import Ssn from '../ssn/Ssn';
import RestartNextFooter from '../../shared/RestartNextFooter';
import RegisterIndividualFormContainer from './RegisterIndividualFormContainer';
import ConfirmRestartAgentModal from '../ConfirmRestartAgentModal';
import AgreementsContainer from '../AgreementsContainer';
import SignAgreement from '../agreements/SignAgreement';
import RegisterIndividualIcon from '../../../assets/images/agentType/sole-proprietor.svg';
import { showAgreements, removeRegisterIndividual } from '../../../actions/agentTypeActions';
import businessLogicHelper from '../../../helpers/businessLogicHelper';
import { AdmissionStep } from '../../../constants'
import { ADMISSION_STEP_ROUTES } from '../../../config';
import { logoutRedirect } from '../../../actions/loginActions';
import { Redirect } from 'react-router-dom';
import { getAgentStepFromURL } from '../../../helpers/uiHelpers';
import MainLayoutFullNavAuthenticated from "../../layouts/MainLayoutFullNavAuthenticated";
import * as admissionStepSelectors from "spotify-shared/selectors/admissionSteps"
import { getCountries } from "../../../actions/registrationActions"
import LoadingComponent from 'spotify-shared-web/components/common/LoadingComponent';
import { withRouter } from 'react-router-dom'
import { Translate } from 'spotify-shared-web/localize'
import ConfirmModal from "spotify-shared-web/components/common/ConfirmModal";
import { Card } from 'react-bootstrap';
import styles from '../registerBusiness/RegisterBusiness.module.scss';
import commonStyle from '../../shared/CommonStyle.module.scss'
const subStepMap = {
    [AdmissionStep.SP_VERIFY_IDENTITY]: "ssn",
    [AdmissionStep.SP_BUSINESS_INFO]: "businessinfo",
    [AdmissionStep.SP_SIGN_AGREEMENTS]: "agreements"
}

class RegisterIndividualUK_CA extends Component {

    state = {
        isRestartModalOpen: false
    };

    componentDidMount() {

        this.props.getCountries();
    }




    getSubSteps = (agentTypeSteps) => {
        const currentStep = agentTypeSteps.find((agentTypeStep) => {
            return agentTypeStep.uniqueId === AdmissionStep.SOLE_PROPRIETOR;
        });
        return currentStep ? currentStep.childSteps : undefined;
    };

    isOnFirstStep = (substeps) => {
        return !!substeps.find((substep) => {
            return substep.available || substep.inProgress || substep.completed;
        });
    };

    handleRestartModalOpen = () => {
        this.setState({
            isRestartModalOpen: true
        });
    };

    handleRestartModalClose = () => {
        this.setState({
            isRestartModalOpen: false
        });
    };

    handleRestartModalConfirm = () => {

        this.props.removeRegisterIndividual(this.props.agentProfile.agentId);
    };

    getHandleNextClickAction = (substeps) => {
        const currentStep = substeps.find((substep) => {
            return substep.available === true || substep.inProgress === true;
        });


        switch (currentStep.uniqueId) {
            case AdmissionStep.JB_SEND_REQUEST:
                return () => { };
            case AdmissionStep.SP_SIGN_AGREEMENTS:
                return this.props.showAgreements;
            default:
                return () => { };
        }
    };

    getNextDisabled = (substeps) => {
        const currentStep = substeps.find((substep) => {
            return substep.available === true || substep.inProgress === true;
        });
        return (
            currentStep.uniqueId === AdmissionStep.JB_SEND_REQUEST ||
            currentStep.uniqueId === AdmissionStep.JB_PENDING_FINALIZATION
        );
    };

    getHandleNextCTA = (substeps) => { };

    renderViewByAdmissionStep = () => {

        const { isAdmissionStepsFetchInProgress } = this.props;
        switch (this.currentSubstep) {
            case "ssn":
                return (
                    <Ssn
                        agentProfile={this.props.agentProfile}
                        restartText="Don’t want to register as a Sole Proprietor"
                        handleRestartClick={this.handleRestartModalOpen}
                        btnNextId="btnRegisterIndividualSSNNext"
                        changeTypeBtnId="btnRegisterIndividualSSNChangeType"
                    />
                );
            case "businessinfo":
                return ((<Translate>
                    {({ translate }) => <Fragment>
                        <Ssn
                            hideSSNFields={true}
                            agentProfile={this.props.agentProfile}
                            restartText="Don’t want to register as a Sole Proprietor"
                            handleRestartClick={this.handleRestartModalOpen}
                            btnNextId="btnRegisterIndividualSSNNext"
                            changeTypeBtnId="btnRegisterIndividualSSNChangeType"
                        />
                        <ConfirmModal
                            title={`${translate("Register as a Sole Proprietor")}`}
                            isVisible={true}
                            onHide={() => { }}
                            hideCancel={true}
                            hideOk={true}
                            closeButton={false}>
                            <Fragment>
                                <RegisterIndividualFormContainer
                                    overrideIsLoading={isAdmissionStepsFetchInProgress}
                                    agentProfile={this.props.agentProfile}
                                    handleRestartClick={this.handleRestartModalOpen}
                                />
                            </Fragment>
                        </ConfirmModal>
                    </Fragment>}
                </Translate>));
            case "agreements":
                return (
                    <AgreementsContainer
                        btnAgreementsNextId="btnRegisterIndividualAgreementsNext"
                        agentProfile={this.props.agentProfile}
                        isSoleProprietor={true}
                    />
                )
            default:
                return null;
        }
    };

    renderRestartFooter = (substeps) => {
        const currentStep = businessLogicHelper.getCurrentSubstep(substeps);

        if (
            currentStep.uniqueId === AdmissionStep.SP_VERIFY_IDENTITY ||
            currentStep.uniqueId === AdmissionStep.SP_BUSINESS_INFO
        ) {
            return false;
        }
        return true;
    };

    renderStepsContainer = () => {
        const { selectPathSteps, agentCountryId, countries, admissionSteps } = this.props;
        const region = businessLogicHelper.getAgentRegion(agentCountryId, countries);
        const agentTypeSteps = selectPathSteps.childSteps;
        const substeps = this.getSubSteps(agentTypeSteps);

        return (<Translate>
            {({ translate }) => <>
                <div className={`col-lg-4 mt-md-5 mt-sm-0 ${commonStyle['paddingChangeMedium']}`} >
                    {/*<img src={RegisterIndividualIcon} alt='' />*/}
                    <div className={`d-none d-lg-block`}>
                        <AdmissionSteps
                            headerCopy={translate("Three steps to finish!")}
                            substeps={substeps}
                            business={'register-individual'}
                            region={region}
                        />
                    </div>
                    <Card className={`float-right col-12 mb-xxl-3 ${commonStyle['cardPadding']} ${commonStyle['cardTopMargin']} customCard ${styles['align-center']} ${commonStyle['lastComponent']} ${commonStyle['inCard']} w-100 ${commonStyle['cardStyle__specific']}`}>
                        <Card.Body className='p-0'>
                            <Card.Text className={`${commonStyle['paragraph_5']} ${commonStyle['headerForm']} ${commonStyle['blackColor']} ${commonStyle['mediumFont']} p-0 mt-0 ${commonStyle['cardInBetween']}`}>
                                {this.props.agentProfile.countryId === COUNTRY_IDS.UK ?
                                    translate("Don’t want to register a company, or want to look at the other options more closely?") : translate("Don’t want to register a company, or want to look at the other options more closely?")}
                            </Card.Text>
                            <button
                                id={"btnRegisterIndividualChangeContratorType_" + this.currentSubstep}
                                type='button'
                                className={`btn btn-primary ${styles['restart-button']} ${styles['align-right']}`}
                                onClick={this.handleRestartModalOpen}
                            >
                                {translate("Change Your Contactor Type")}
                            </button>
                        </Card.Body>
                    </Card>
                </div>

            </>}
        </Translate>)
    }

    render() {

        const { selectPathSteps, agentProfile, logoutRedirect, agentCountryId, countries, admissionSteps, agentType } = this.props;
        if (Object.keys(selectPathSteps).length === 0 || countries.length === 0) return <LoadingComponent />

        if (selectPathSteps && !selectPathSteps.completed) {
            const region = businessLogicHelper.getAgentRegion(agentCountryId, countries);
            const agentTypeSteps = selectPathSteps.childSteps;
            const substeps = this.getSubSteps(agentTypeSteps);
            const subStep = businessLogicHelper.getCurrentSubstep(substeps);
            if (!subStep) return <Redirect to="/" />
            const incomingSubStep = subStepMap[subStep.uniqueId];
            this.currentSubstep = getAgentStepFromURL(this.props.location.search);
            const isAgreementsStep = subStep.uniqueId === AdmissionStep.SP_SIGN_AGREEMENTS;

            const headerTitle = "Register as a Sole Proprietor";
            const headerSubTitle = "soleProprieterDescription"
            if (incomingSubStep !== this.currentSubstep)
                return <Redirect to={{ pathname: ADMISSION_STEP_ROUTES.soleProprietor_uk_ca, search: `?step=${incomingSubStep}` }} />;

            return substeps ? isAgreementsStep && agentType.isSigningAgreement
                ? <SignAgreement logoutUser={logoutRedirect} />
                : (<Translate>
                    {({ translate }) =>
                        <Fragment>
                            <div className={`row justify-content-between`}>
                                <div className={classNames({
                                    "col-lg-5": this.currentSubstep !== "agreements",
                                    "col-lg-7": this.currentSubstep == "agreements",
                                    "col-md-10 offset-md-1 offset-lg-0 col-xs-12": true,
                                })}>
                                    {/* <div className={`row ${commonStyle['centralize__Row']}`}>
                                <div className={`col-lg-8 `}> */}
                                    {/* <br /> */}
                                    <h1 className={`${commonStyle['heading_1']} ${commonStyle['regularFont']} ${commonStyle['heading_1_top']} ${commonStyle['active_color']} mb-0 `}>{translate(headerTitle)}</h1>
                                    {this.currentSubstep === "ssn" && <p className={`${commonStyle['widthChange']} ${commonStyle['paddingChangeMedium']} ${commonStyle['regularFont']} ${commonStyle['blackColor']} ${commonStyle['paragraph_3']}`}>{translate(headerSubTitle)}</p>}
                                    {this.currentSubstep == "agreements" &&
                                        <h3 className={`${styles['text-bold']} ${commonStyle['paragraph_1']} ${commonStyle['blackColor']} ${commonStyle['componentsMargin']} `}>
                                            {translate("Just one step to go. Let’s make it official!")}</h3>}
                                    <p className={`agreementcopy col-xl-11 col-md-12 pl-0 ${commonStyle['lightFont']} ${commonStyle['paragraph_3']} ${commonStyle['blackColor']} ${commonStyle['agreementcopy1']}`}>{this.currentSubstep == "agreements" && translate("agreementCopy")}</p>
                                    <div className={`d-block d-lg-none`}>
                                        <AdmissionSteps
                                            headerCopy={translate("Three steps to finish!")}
                                            substeps={substeps || []}
                                            business={'register-individual'}
                                            region={region}
                                        />
                                    </div>
                                    <br />
                                    {this.renderViewByAdmissionStep()}
                                    {this.renderRestartFooter(substeps) ? (
                                        <div className='row'>
                                            <div className='col-12'>
                                                <RestartNextFooter
                                                    handleRestartClick={this.handleRestartModalOpen}
                                                    handleNextClick={this.getHandleNextClickAction(substeps)}
                                                    handleNextCTA={this.getHandleNextCTA(substeps)}
                                                    isNextDisabled={this.getNextDisabled(substeps)}
                                                    hideNext={isAgreementsStep}
                                                    changeContratorTypeBtnId={"btnRegisterIndividualChangeContratorType_" + this.currentSubstep}
                                                    restartText="Don’t want to register as a Sole Proprietor"
                                                />
                                            </div>
                                        </div>
                                    ) : null}
                                </div>
                                {this.renderStepsContainer()}
                            </div>
                            <ConfirmRestartAgentModal
                                isOpen={this.state.isRestartModalOpen}
                                onRequestClose={this.handleRestartModalClose}
                                handleCancelClick={this.handleRestartModalClose}
                                handleConfirmClick={this.handleRestartModalConfirm}
                            />
                        </Fragment>}
                </Translate>)
                : <Redirect to="/" />
        }
        else return <Redirect to="/" />
    }
}

const mapStateToProps = (state, props) => {
    const { agentProfile, registration, agentType, admissionSteps } = state;
    const selectPathSteps = admissionStepSelectors.getAgentTypeSteps(state);
    const agentCountryId = agentProfile.countryId;
    const countries = registration.profile.formOptions.countries;
    const isAdmissionStepsFetchInProgress = admissionSteps && admissionSteps.isFetchInProgress;
    return { selectPathSteps, agentProfile, agentCountryId, countries, agentType, admissionSteps, isAdmissionStepsFetchInProgress };
}




export default MainLayoutFullNavAuthenticated(withRouter(connect(
    mapStateToProps,
    { showAgreements, removeRegisterIndividual, logoutRedirect, getCountries }
)(RegisterIndividualUK_CA)));
