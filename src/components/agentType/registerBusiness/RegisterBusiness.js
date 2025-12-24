import styles from './RegisterBusiness.module.scss';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import RegisterBusinessFormContainer from './RegisterBusinessFormContainer';
import Ssn from '../ssn/Ssn';
import UniqueIdFormContainer from '../uniqueIdentity/UniqueIdFormContainer';
import AdmissionSteps from '../../shared/admissionSteps/AdmissionSteps';
import RestartNextFooter from '../../shared/RestartNextFooter';
import ConfirmRestartAgentModal from '../ConfirmRestartAgentModal';
import RegisterBusinessIcon from '../../../assets/images/agentType/new-call-center.svg';
import { getStates, getProvinces } from '../../../actions/registrationActions';
import { showAgreements, removeRegisterBusinessForm, removeRegisterBusiness, getMedia } from '../../../actions/agentTypeActions';
import businessLogicHelper from '../../../helpers/businessLogicHelper';
import { AdmissionStep, COUNTRY_IDS } from '../../../constants'
import { ADMISSION_STEP_ROUTES } from '../../../config';
import { logoutRedirect } from '../../../actions/loginActions';
import { Redirect } from 'react-router-dom';
import { getAgentStepFromURL } from '../../../helpers/uiHelpers';
import AgreementsContainer from '../AgreementsContainer';
import SignAgreement from '../agreements/SignAgreement';
import MainLayoutFullNavAuthenticated from "../../layouts/MainLayoutFullNavAuthenticated";
import * as admissionStepSelectors from "spotify-shared/selectors/admissionSteps"
import { getCountries } from "../../../actions/registrationActions"
import LoadingComponent from 'spotify-shared-web/components/common/LoadingComponent';
import { withRouter } from 'react-router-dom'
import { Translate } from 'spotify-shared-web/localize'
import AgentTypeItem from '../AgentTypeItem-US'
import { agentImageStringMapping } from '../agentData';
import { Card } from 'react-bootstrap';
import commonStyle from '../../../../src/components/shared/CommonStyle.module.scss';
import AgentTypeList from "../AgentTypeList";
import classNames from "classnames";
import RegisterIndividualIcon from "../../../assets/images/agentType/sole-proprietor.svg";
import registerBusinessIcon from "../../../assets/images/agentType/Registration-form-graphic.svg";
import JoinBusinessIcon from "../../../assets/images/agentType/service-agent.svg";
//import { TRUE } from 'node-sass';
import AgentTypeHelp from '../AgentTypeHelp';
import SCREEN_CONFIG from '../../../screensConfig';

const CURRENT_SCREEN = SCREEN_CONFIG.registerYourCompany;

const subStepIDMap = {
    [AdmissionStep.RB_VERIFY_IDENTITY]: "verifyIdentity",
    [AdmissionStep.RB_BUSINESS_INFO]: "businessinfo",
    [AdmissionStep.RB_SIGN_AGREEMENTS]: "agreements",
    [AdmissionStep.RB_VERIFY_BUSINESS_INFO]: "pendingfinalization"
}

const subStepIndexMap = {
    verifyIdentity: "verifyIdentity",
    businessinfo: "businessinfo",
    agreements: "agreements",
    finalisePending: "pendingfinalization"

}

class RegisterBusiness extends Component {
    state = {
        isRestartModalOpen: false,
        isTermsChecked: false,
        isAgeChecked: false,
        majorType: undefined,
    };

    componentDidMount = () => {
        this.props.getStates();
        this.props.getProvinces();
        this.props.getCountries();
        this.props.getMedia(this.props.agentProfile.countryId);
    };

    getSubSteps = (agentTypeSteps) => {
        const currentStep = agentTypeSteps.find((agentTypeStep) => {
            return agentTypeStep.uniqueId === AdmissionStep.NEW_CALL_CENTER;
        });
        return currentStep ? currentStep.childSteps : undefined;
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
        this.props.removeRegisterBusiness(this.props.agentProfile.agentId);
        this.props.removeRegisterBusinessForm();
    };

    getHandleNextClickAction = (substeps) => {
        const currentStep = substeps.find((substep) => {
            return substep.available === true || substep.inProgress === true;
        });

        switch (currentStep.uniqueId) {
            case AdmissionStep.JB_SEND_REQUEST:
                return () => { };
            case AdmissionStep.RB_SIGN_AGREEMENTS:
                return this.props.showAgreements;
            default:
                return () => { };
        }
    };

    getHandleNextCTA = (substeps) => { };

    getNextDisabled = (substeps) => {
        const currentStep = substeps.find((substep) => {
            return substep.available === true || substep.inProgress === true;
        });
        return (
            currentStep.uniqueId === AdmissionStep.JB_SEND_REQUEST ||
            currentStep.uniqueId === AdmissionStep.JB_PENDING_FINALIZATION ||
            currentStep.uniqueId === AdmissionStep.RB_VERIFY_BUSINESS_INFO
        );
    };

    renderViewByAdmissionStep = () => {
        const { agentProfile } = this.props;
        const isUKUser = agentProfile.countryId === COUNTRY_IDS.UK;



        switch (this.currentSubstep) {
            case subStepIndexMap.verifyIdentity:
                return (
                    // <Ssn
                    //     agentProfile={this.props.agentProfile}
                    //     handleRestartClick={this.handleRestartModalOpen}
                    //     restartText={isUKUser ? "Don’t want to register a company" : "Don’t want to register a company"}
                    //     btnNextId="btnRegisterBusinessSSNNext"
                    //     changeTypeBtnId="btnRegisterBusinessSSNChangeType"
                    // />
                    <UniqueIdFormContainer
                        agentProfile={this.props.agentProfile}
                        restartText="Don’t want to register a Company"
                        handleRestartClick={this.handleRestartModalOpen}
                        btnNextId="btnRegisterBusinessSSNNext"
                        changeTypeBtnId="btnRegisterBusinessSSNChangeType"
                        agentTypeSteps={this.props.selectPathSteps.childSteps}
                    />
                );
            case subStepIndexMap.businessinfo:
                return (
                    <RegisterBusinessFormContainer
                        agentProfile={this.props.agentProfile}
                        handleRestartClick={this.handleRestartModalOpen}
                    />
                );
            case subStepIndexMap.agreements:
                return (
                    <AgreementsContainer
                        btnAgreementsNextId="btnRegisterBusinessAgreementsNext"
                        agentProfile={this.props.agentProfile}
                        isRegisterBusiness={true}
                    />
                )
            case subStepIndexMap.finalisePending:
                return (<Translate>
                    {({ translate }) => <>
                        <div className={`${styles['pending-review']} ${commonStyle['componentsMargin']}`}>
                            <h5 className={styles['pending-review__header']}>
                                {translate("RegisterBusinessPendingFinalization")}
                            </h5>
                        </div>
                    </>}
                </Translate>)
            default:
                return <div></div>;
        }
    };

    renderRestartFooter = (substeps) => {
        const currentStep = businessLogicHelper.getCurrentSubstep(substeps);

        if (
            currentStep.uniqueId === AdmissionStep.RB_VERIFY_IDENTITY ||
            currentStep.uniqueId === AdmissionStep.RB_BUSINESS_INFO
        ) {
            return false;
        }
        return true;
    };

    renderStepsContainer = () => {
        const { selectPathSteps, agentCountryId, countries, admissionSteps, agentProfile } = this.props;
        const region = businessLogicHelper.getAgentRegion(agentCountryId, countries);
        const agentTypeSteps = selectPathSteps.childSteps;
        const substeps = this.getSubSteps(agentTypeSteps);
        const headerCopy = agentProfile.countryId === COUNTRY_IDS.CA ? 'Two steps to finish!' : 'Three steps to finish!';
        return (<Translate>
            {({ translate }) => <>
                {/*<div className='col-lg-2'></div>*/}

                <div
                    className={classNames({
                        "col-lg-4 offset-md-3 offset-lg-0 col-md-10": true,
                        "mt-sm-0": true,
                        "mt-lg-5": true,
                        "mt-sm-0": this.currentSubstep === "pendingfinalization",
                    })}
                >
                    <div className={`d-none d-lg-block`}>
                        <AdmissionSteps
                            headerCopy={translate(headerCopy)}
                            substeps={substeps}
                            business={'register-business'}
                            region={region}

                        />
                    </div>
                    <Card className={`float-right col-12 ${commonStyle['cardTopMargin']}  mb-xxl-3 ${commonStyle['cardPadding']} customCard ${styles['align-center']} ${commonStyle['lastComponent']} ${commonStyle['inCard']} w-100 ${commonStyle['cardStyle__specific']}`}>
                        <Card.Body className='p-0'>
                            <Card.Text className={`${commonStyle['paragraph_5']} ${commonStyle['blackColor']} ${commonStyle['mediumFont']} p-0 mt-0 ${commonStyle['cardInBetween']}`}>
                                {this.props.agentProfile.countryId === COUNTRY_IDS.UK ?
                                    translate("Don’t want to register a company, or want to look at the other options more closely?") : translate("Don’t want to register a company, or want to look at the other options more closely?")}</Card.Text>
                            <button
                                id="btnRegisterBusinessChangeContratorType_businessinfo"
                                type='button'
                                className={`btn btn-primary ${styles['restart-button']} ${styles['align-right']} ${styles['block']}`}
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

    renderSelectPathChangeContainer = () => {
        const { selectPathSteps, agentProfile, agentType, roleRegistrationScreen } = this.props;
        const { isTermsChecked } = this.state;
        //const headerTitle = "Don’t want to register a company?"

        const prmSteps = selectPathSteps.childSteps;

        const getDisplayedSteps = () => {
            const displayedSteps = Object.keys(roleRegistrationScreen)
                .filter(stepName => roleRegistrationScreen[stepName].display)
                .map(stepName => {
                    const step = roleRegistrationScreen[stepName];
                    const correspondingStep = prmSteps.find(prmStep => prmStep.uniqueId === step.admissionStepId);
                    return correspondingStep;
                });


            return displayedSteps.filter(step => step !== undefined).reverse();
        };

        const filteredSteps = getDisplayedSteps();

        if (selectPathSteps) {
            const agentTypeSteps = selectPathSteps ? selectPathSteps.childSteps : undefined;

            if (agentTypeSteps && agentProfile) {
                const filterdAgentTypeSteps = filteredSteps.filter(item => item.uniqueId !== AdmissionStep.NEW_CALL_CENTER);
                const currentStep = agentTypeSteps.find((agentTypeStep) => {
                    return agentTypeStep.uniqueId === AdmissionStep.NEW_CALL_CENTER;
                });

                return (
                    <Translate>
                        {({ translate }) => <>
                            <div className={classNames({
                                "col-lg-4": true,
                                "offset-lg-0": this.currentSubstep == subStepIndexMap.agreements,
                                // "offset-lg-2": this.currentSubstep == subStepIndexMap.verifyIdentity,
                                // "offset-lg-3": this.currentSubstep == subStepIndexMap.businessinfo,
                                "col-md-10 offset-lg-0 offset-md-1 col-xs-12": true,
                            })}>
                                {/* <br />
                                <br />
                                <br /> */}
                                {/* {this.currentSubstep == subStepIndexMap.verifyIdentity && <h1 className={`${commonStyle['heading_1']} ${commonStyle['heading_1_topUS']} ${commonStyle['componentsBottomMargin']}`} style={{ textTransform: 'uppercase' }}>
                                    {translate(`${CURRENT_SCREEN}.sideHeader`)}</h1>} */}

                                {(this.currentSubstep != subStepIndexMap.verifyIdentity || this.currentSubstep == subStepIndexMap.verifyIdentity) && <Fragment>



                                    <p className={`${commonStyle['heading_1_topUS']} ${commonStyle['componentsBottomMargin']}`} style={{ fontWeight: 600 }}>{translate(`${CURRENT_SCREEN}.sideHeader`)}</p>

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
                        <div className={`d-none d-lg-block col-lg-4`}  >
                        </div>
                    </>
                }
            </Translate>
        )
    }

    render() {

        const { selectPathSteps, agentProfile, agentType, logoutRedirect, agentCountryId, countries, admissionSteps } = this.props;


        const isUKUser = agentProfile.countryId === COUNTRY_IDS.UK;
        const isCAUser = agentProfile.countryId === COUNTRY_IDS.CA;
        const isUSUser = agentProfile.countryId === COUNTRY_IDS.US;
        const isPHUser = agentProfile.countryId === COUNTRY_IDS.PH;


        if (Object.keys(selectPathSteps).length === 0 || countries.length === 0) return <LoadingComponent />

        if (selectPathSteps && !selectPathSteps.completed) {


            const region = businessLogicHelper.getAgentRegion(agentCountryId, countries);
            const agentTypeSteps = selectPathSteps.childSteps;
            const substeps = this.getSubSteps(agentTypeSteps);

            const subStep = businessLogicHelper.getCurrentSubstep(substeps);

            if (!subStep) return <Redirect to="/" />
            const incomingSubStep = subStepIDMap[subStep.uniqueId];
            this.currentSubstep = getAgentStepFromURL(this.props.location.search);
            const isAgreementsStep = subStep.uniqueId === AdmissionStep.RB_SIGN_AGREEMENTS;



            const headerSubTitle = "The following corporate types are not accepted: Partnership corporations, Trust/estate corporations. Businesses registering as an incorporated entity must also have a business checking account associated with the registration."

            return incomingSubStep !== this.currentSubstep
                ? <Redirect to={{ pathname: ADMISSION_STEP_ROUTES.registerBusiness, search: `?step=${incomingSubStep}` }} />
                : substeps
                    ? isAgreementsStep && agentType.isSigningAgreement
                        ? <SignAgreement logoutUser={logoutRedirect} isRegisterBusiness={true} />
                        : (<Translate>
                            {({ translate }) => <Fragment>
                                <div className={`row justify-content-space-between`}>
                                    <div className={classNames({
                                        "col-lg-7": true,
                                        "col-md-10 offset-md-1 offset-lg-0 col-xs-12": this.currentSubstep != "agreements",
                                        "col-md-10 offset-md-1 offset-lg-0 col-xs-12": this.currentSubstep != "businessinfo",
                                    })}>
                                        {/* <br /> */}
                                        <h1 className={`${commonStyle['heading_1']} ${commonStyle['regularFont']} ${commonStyle['heading_1_top']} ${commonStyle['active_color']} ${styles['lineHeight']} mb-0 `}>{translate(`${CURRENT_SCREEN}.heading`)}</h1>

                                        {isUKUser && this.currentSubstep === subStepIndexMap.businessinfo &&
                                            <p className={` ${styles["justified-text"]} ${commonStyle['widthChange']}  ${commonStyle['lightFont']} ${commonStyle['blackColor']} ${commonStyle['headerForm']}`}>
                                                {translate("If you are a named Director of a LTD company, enter your company details and we will verify them with Companies House.")}</p>
                                        }


                                        {!isUKUser && this.currentSubstep === subStepIndexMap.verifyIdentity &&
                                            <p className={`${commonStyle['paragraph_3']} ${commonStyle['withinParaMargin']} ${commonStyle['widthChange']} ${commonStyle['lightFont']} ${commonStyle['blackColor']} ${commonStyle['componentsMargin']}`} >
                                                {translate((`${CURRENT_SCREEN}.description`))}</p>}

                                        {!isUKUser && this.currentSubstep !== subStepIndexMap.agreements && this.currentSubstep == subStepIndexMap.verifyIdentity &&
                                            <p className={`${commonStyle['paragraph_1']} ${commonStyle['semiBoldWeight']} ${commonStyle['blackColor']} m-0`}>
                                                {translate(`${CURRENT_SCREEN}.subTitle`)}</p>}

                                        {!isUKUser && this.currentSubstep !== subStepIndexMap.agreements && this.currentSubstep == subStepIndexMap.businessinfo &&
                                            <p className={`${styles['componentsTopMargin']} ${commonStyle['paragraph_1']} ${commonStyle['semiBoldWeight']} ${commonStyle['blackColor']}`}>
                                                {translate(`${CURRENT_SCREEN}.subTitle`)}</p>}

                                        {/* {!isUKUser && this.currentSubstep !== subStepIndexMap.agreements && this.currentSubstep !== subStepIndexMap.verifyIdentity &&
                                            <p className={`${commonStyle['paragraph_1']} ${commonStyle['semiBoldWeight']} ${commonStyle['blackColor']} ${commonStyle['componentsMargin']}`}>
                                                {translate("RegisterBusinessCopy")}</p>} */}

                                        {this.currentSubstep == subStepIndexMap.agreements &&
                                            <h3 className={`${styles['text-bold']} ${commonStyle['paragraph_1']} ${commonStyle['blackColor']} ${commonStyle['componentsMargin']} `}>
                                                {translate(`${CURRENT_SCREEN}.signDocuments.header`)}</h3>}

                                        {this.currentSubstep == subStepIndexMap.agreements && <p className={`col-xl-11 col-md-12 pl-0 agreementcopy ${commonStyle['lightFont']} ${commonStyle['paragraph_3']} ${commonStyle['blackColor']} ${commonStyle['agreementcopy1']}`}>
                                            {translate(`${CURRENT_SCREEN}.signDocuments.description`)}</p>}
                                        {/*{this.renderViewByAdmissionStep(substeps)}*/}
                                        {!isPHUser &&
                                            <div className={`d-none d-lg-none`}>
                                                <AdmissionSteps
                                                    headerCopy={translate('Three steps to finish!')}
                                                    substeps={substeps}
                                                    business={'register-business'}
                                                    region={region}
                                                />
                                            </div>
                                        }

                                        {this.renderViewByAdmissionStep(substeps)}
                                        {this.renderRestartFooter(substeps) ? (
                                            <div className='row'>
                                                <div className='col-12'>
                                                    <RestartNextFooter
                                                        handleRestartClick={this.handleRestartModalOpen}
                                                        handleNextClick={this.getHandleNextClickAction(substeps)}
                                                        handleNextCTA={this.getHandleNextCTA(substeps)}
                                                        isNextDisabled={this.getNextDisabled(substeps)}
                                                        hideNext={isAgreementsStep}
                                                        changeContratorTypeBtnId={"btnRegisterBusinessChangeContratorType_" + this.currentSubstep}
                                                        restartText={"Don’t want to register a company"}
                                                    />
                                                </div>
                                            </div>
                                        ) : null}
                                    </div>
                                    {isPHUser && this.currentSubstep === subStepIndexMap.businessinfo &&
                                        <div style={{ position: 'relative' }}>
                                            <img className={`mb-md-5 mb-xxl-3 mb-xl-3 mb-sm-4 ${styles['admissionStepTopmargin']}  ${styles['img-us']}`}
                                                src={registerBusinessIcon}
                                                alt=''
                                                style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 0,
                                                }}
                                            />
                                        </div>
                                    }
                                    {isPHUser && this.currentSubstep == subStepIndexMap.agreements &&
                                        <div style={{ position: 'relative' }}>
                                            <img className={`mb-md-5 mb-xxl-3 mb-xl-3 mb-sm-4 ${styles['admissionStepTopmargin']}  ${styles['img-us']}`}
                                                src={JoinBusinessIcon}
                                                alt=''
                                                style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 0,
                                                }}
                                            />
                                        </div>
                                    }

                                    {!isUSUser && !isPHUser && this.renderStepsContainer()}
                                    {isUSUser && !isPHUser && this.renderSelectPathChangeContainer()}
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
    const { agentType, agentProfile, registration, admissionSteps, app } = state;
    const agentCountryId = agentProfile.countryId;
    const countries = registration.profile.formOptions.countries;
    const registerBusinessScreenConfig = app.countryConfigurations.config.roleRegistrationScreen.companyRegistrationScreen;
    const roleRegistrationScreen = app.countryConfigurations.config.roleRegistrationScreen;
    const selectPathSteps = admissionStepSelectors.getAgentTypeSteps(state);
    return { selectPathSteps, agentCountryId, countries, agentType, admissionSteps, agentProfile, registerBusinessScreenConfig, roleRegistrationScreen };
}

export default MainLayoutFullNavAuthenticated(withRouter(connect(
    mapStateToProps,
    {
        getStates,
        getProvinces,
        showAgreements,
        removeRegisterBusiness,
        removeRegisterBusinessForm,
        logoutRedirect,
        getCountries,
        getMedia,

    }
)(RegisterBusiness)));
