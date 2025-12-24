import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import MainLayout from '../../layouts/MainLayout';
import AdmissionSteps from '../../shared/admissionSteps/AdmissionSteps';
import Ssn from '../ssn/Ssn';
import UniqueIdFormContainer from '../uniqueIdentity/UniqueIdFormContainer';
import RestartNextFooter from '../../shared/RestartNextFooter';
import RegisterIndividualFormContainer from './RegisterIndividualFormContainer';
import ConfirmRestartAgentModal from '../ConfirmRestartAgentModal';
import AgreementsContainer from '../AgreementsContainer';
import SignAgreement from '../agreements/SignAgreement';
import RegisterIndividualIcon from '../../../assets/images/agentType/sole-proprietor.svg';
import { showAgreements, removeRegisterIndividual, getMedia } from '../../../actions/agentTypeActions';
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
import ConfirmModal from "spotify-shared-web/components/common/ConfirmModal"
import { constant } from 'lodash';
import { agentImageStringMapping } from '../agentData';
import AgentTypeItem from '../AgentTypeItem-US'
import AgentTypeHelp from '../AgentTypeHelp';
import classNames from 'classnames';
import { Card } from 'react-bootstrap';
import styles from '../registerBusiness/RegisterBusiness.module.scss';
import commonStyle from '../../shared/CommonStyle.module.scss'
import SCREEN_CONFIG from '../../../screensConfig';

const CURRENT_SCREEN = SCREEN_CONFIG.registerAsSoleProprietor;

const subStepIDMap = {
    [AdmissionStep.SP_VERIFY_IDENTITY]: "verifyIdentity",
    [AdmissionStep.SP_BUSINESS_INFO]: "businessinfo",
    [AdmissionStep.SP_SIGN_AGREEMENTS]: "agreements"
}

const subStepIndexMap = {
    verifyIdentity: "verifyIdentity",
    businessinfo: "businessinfo",
    agreements: "agreements"
}

class RegisterIndividual extends Component {

    state = {
        isRestartModalOpen: false,
        isTermsChecked: false,
    };

    componentDidMount() {

        this.props.getCountries();

        this.setState({ isTermsChecked: true });
        this.props.getMedia(this.props.agentProfile.countryId);
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
            case subStepIndexMap.verifyIdentity:
                return (
                    <UniqueIdFormContainer
                        agentProfile={this.props.agentProfile}
                        restartText="Don’t want to register as a Sole Proprietor"
                        handleRestartClick={this.handleRestartModalOpen}
                        btnNextId="btnRegisterIndividualSSNNext"
                        changeTypeBtnId="btnRegisterIndividualSSNChangeType"
                        agentTypeSteps={this.props.selectPathSteps.childSteps}

                    />
                );
            case subStepIndexMap.businessinfo:
                return ((<Translate>
                    {({ translate }) => <Fragment>
                        <UniqueIdFormContainer
                            hideSSNFields={true}
                            agentProfile={this.props.agentProfile}
                            restartText="Don’t want to register as a Sole Proprietor"
                            handleRestartClick={this.handleRestartModalOpen}
                            btnNextId="btnRegisterIndividualSSNNext"
                            changeTypeBtnId="btnRegisterIndividualSSNChangeType"
                        />
                        <ConfirmModal
                            // Fetch Title from Config File
                            title={translate(`${CURRENT_SCREEN}.heading`)}
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
            case subStepIndexMap.agreements:
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
                                {translate("Don’t want to register a company, or want to look at the other options more closely?")}
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

    renderSelectPathChangeContainer = (translate) => {
        const { selectPathSteps, agentProfile, agentType, roleRegistrationScreen } = this.props;
        const { isTermsChecked } = this.state;
        const headerTitle = translate(`${CURRENT_SCREEN}.sideHeader`);

        const prmSteps = selectPathSteps.childSteps;

        const getDisplayedSteps = () => {
            const displayedSteps = Object.keys(roleRegistrationScreen)
                .filter(stepName => roleRegistrationScreen[stepName].display)
                .map(stepName => {
                    const step = roleRegistrationScreen[stepName];
                    const correspondingStep = prmSteps.find(prmStep => prmStep.uniqueId === step.admissionStepId);
                    return correspondingStep;
                });


            return displayedSteps.filter(step => step !== undefined);
        };

        const filteredSteps = getDisplayedSteps();


        if (selectPathSteps) {
            const agentTypeSteps = selectPathSteps ? selectPathSteps.childSteps : undefined;

            if (agentTypeSteps && agentProfile && isTermsChecked) {
                const filterdAgentTypeSteps = filteredSteps.filter(item => item.uniqueId !== AdmissionStep.SOLE_PROPRIETOR);

                const currentStep = agentTypeSteps.find((agentTypeStep) => {
                    return agentTypeStep.uniqueId === AdmissionStep.SOLE_PROPRIETOR;
                });

                return (
                    <Translate>
                        {({ translate }) => <>
                            <div className={classNames({
                                "col-lg-4": true,
                                "offset-lg-1": this.currentSubstep == subStepIndexMap.agreements,
                                // "offset-lg-2": this.currentSubstep == subStepIndexMap.verifyIdentity,
                                // "offset-lg-3": this.currentSubstep == subStepIndexMap.businessinfo,
                                "col-md-10 offset-lg-0 offset-md-1 col-xs-12": true,
                            })} >
                                {/* <br /> */}
                                {/* {this.currentSubstep == subStepIndexMap.verifyIdentity && <h1 className={`${commonStyle['heading_1']} ${commonStyle['heading_1_topUS']} ${commonStyle['regularFont']} ${commonStyle['componentsBottomMargin']} `} style={{ textTransform: 'uppercase' }}>{headerTitle}</h1>} */}

                                {(this.currentSubstep != subStepIndexMap.verifyIdentity || this.currentSubstep == subStepIndexMap.verifyIdentity) && <Fragment>



                                    <p className={`${commonStyle['heading_1_topUS']} ${commonStyle['componentsBottomMargin']}`} style={{ fontWeight: 600 }}>{headerTitle}</p>

                                    {/* <br />

                                    <br /> */}

                                </Fragment>}
                                {filterdAgentTypeSteps &&
                                    filterdAgentTypeSteps.map((type, index) => (
                                        <>
                                            <AgentTypeItem
                                                agentTypeStep={type}
                                                agentId={agentProfile.agentId}
                                                agentImageStringMapping={agentImageStringMapping}
                                                isTermsChecked={isTermsChecked}
                                                key={type.admissionStepId}
                                                currentStep={currentStep}
                                            />
                                        </>

                                    ))
                                }
                                <AgentTypeHelp media={agentType.media} />
                            </div>
                        </>}
                    </Translate>
                )
                //const substeps = this.getSubSteps(agentTypeSteps);
            }
        }
        return (
            <Translate>
                {
                    ({ translate }) => <>
                        <div className={`d-none d-lg-block col-lg-4`}>
                        </div>
                    </>
                }
            </Translate>
        )
    }

    render() {

        const { selectPathSteps, agentProfile, logoutRedirect, agentCountryId, countries, admissionSteps, agentType, soleProprietorScreenConfig } = this.props;
        if (Object.keys(selectPathSteps).length === 0 || countries.length === 0) return <LoadingComponent />


        // Checking if the Select Path Steps are completed
        if (selectPathSteps && !selectPathSteps.completed) {

            // Select Path Steps are not completed.
            const region = businessLogicHelper.getAgentRegion(agentCountryId, countries);
            const agentTypeSteps = selectPathSteps.childSteps;
            const substeps = this.getSubSteps(agentTypeSteps);


            const subStep = businessLogicHelper.getCurrentSubstep(substeps);
            // If None of the child steps are In-Progress, then redirect to "/"
            if (!subStep) return <Redirect to="/" />

            // Else, find the incoming sub-step which is In-progress
            const incomingSubStep = subStepIDMap[subStep.uniqueId];



            // Checking if the URL already has sub-step information and routing information.
            this.currentSubstep = getAgentStepFromURL(this.props.location.search);


            // Checking if the process is in Agreement Step
            const isAgreementsStep = subStep.uniqueId === AdmissionStep.SP_SIGN_AGREEMENTS;

            // Read this from Config File
            const headerTitle = "Register as a Sole Proprietor";
            const headerSubTitle = "soleProprieterDescription"


            // If the incoming sub-step which is In-progress is not mentioned in the URL, then add the incoming sub step to the URL, so that route will ensure
            // right component will take over.
            if (incomingSubStep !== this.currentSubstep)
                return <Redirect to={{ pathname: ADMISSION_STEP_ROUTES.soleProprietor, search: `?step=${incomingSubStep}` }} />;

            return substeps
                // If the curent Step is Agreement Step && agentType.isSigningAgreement then,
                ? isAgreementsStep && agentType.isSigningAgreement
                    ? <SignAgreement logoutUser={logoutRedirect} />
                    :
                    (<Translate>
                        {({ translate }) =>
                            <Fragment>
                                <div className={`row justify-content-space-between `}>
                                    <div className={classNames({
                                        "col-lg-8": this.currentSubstep !== "agreements",
                                        "col-lg-7": this.currentSubstep == "agreements",
                                        "col-md-10 offset-md-1 offset-lg-0 col-xs-12": true,

                                    })}>

                                        <h1
                                            className={`${commonStyle['heading_1']} ${commonStyle['regularFont']} ${commonStyle['heading_1_top']} ${commonStyle['active_color']} ${commonStyle['widthChange4']}  ${styles['lineHeight']} `}>
                                            {translate(`${CURRENT_SCREEN}.heading`)}
                                        </h1>

                                        {
                                            this.currentSubstep === subStepIndexMap.verifyIdentity &&
                                            <p
                                                style={{width: "70%"}}
                                                className={`${commonStyle['widthChange']} ${commonStyle['paddingChangeMedium']} ${commonStyle['lightFont']} ${commonStyle['blackColor']} ${commonStyle['paragraph_3']} ${commonStyle['componentsMargin']}`}>
                                                {translate(`${CURRENT_SCREEN}.description`)}
                                            </p>
                                        }

                                        {
                                            this.currentSubstep == "agreements" &&
                                            <h3
                                                className={`${styles['text-bold']} ${commonStyle['paragraph_1']} ${commonStyle['blackColor']} ${commonStyle['componentsMargin']} `}>
                                                {translate(`${CURRENT_SCREEN}.signDocuments.header`)}
                                            </h3>
                                        }

                                        {this.currentSubstep == "agreements" &&
                                            <p
                                                className={`agreementcopy col-xl-11 col-md-12 pl-0 ${commonStyle['lightFont']} ${commonStyle['paragraph_3']} ${commonStyle['blackColor']} ${commonStyle['agreementcopy1']}`}>
                                                {translate(`${CURRENT_SCREEN}.signDocuments.description`)}
                                            </p>
                                        }

                                        <div className={`d-none d-lg-none`}>
                                            <AdmissionSteps
                                                headerCopy={translate("Three steps to finish!")}
                                                substeps={substeps}
                                                region={region}
                                                business={'register-individual'}
                                                screenConfig={soleProprietorScreenConfig}
                                            />
                                        </div>

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
                                    {/*  Path Change  JSX */}
                                    {region !== 'JM' && region !== 'US' && this.renderStepsContainer()}
                                    {region == 'US' &&this.renderSelectPathChangeContainer(translate)}
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


    const { agentProfile, registration, agentType, admissionSteps, app } = state;


    const selectPathSteps = admissionStepSelectors.getAgentTypeSteps(state);
    const agentCountryId = agentProfile.countryId;
    const countries = registration.profile.formOptions.countries;
    const soleProprietorScreenConfig = app.countryConfigurations.config.roleRegistrationScreen.soleProprietorScreen;
    const roleRegistrationScreen = app.countryConfigurations.config.roleRegistrationScreen;
    const isAdmissionStepsFetchInProgress = admissionSteps && admissionSteps.isFetchInProgress;
    return { selectPathSteps, roleRegistrationScreen, agentProfile, agentCountryId, countries, agentType, admissionSteps, isAdmissionStepsFetchInProgress, soleProprietorScreenConfig };
}




export default MainLayoutFullNavAuthenticated(withRouter(connect(
    mapStateToProps,
    { showAgreements, removeRegisterIndividual, logoutRedirect, getCountries, getMedia }
)(RegisterIndividual)));
