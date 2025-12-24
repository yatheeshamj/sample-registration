import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import MainLayout from '../../layouts/MainLayout';
import AdmissionSteps from '../../shared/admissionSteps/AdmissionSteps';
import Trn from '../trn/Trn';
import Ssn from '../ssn/Ssn';
// import Aadar from '../aadhar/Aadhar';
import Aadhar from '../aadhar/Aadhar';
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

import RegisterBusinessFormContainer from '../registerBusiness/RegisterBusinessFormContainer';

const subStepMap = {
    [AdmissionStep.SP_VERIFY_IDENTITY]: "ssn",
    [AdmissionStep.SP_BUSINESS_INFO]: "businessinfo",
    [AdmissionStep.SP_SIGN_AGREEMENTS]: "agreements"
}

class RegisterIndividualIN extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isRestartModalOpen: false,
            isTermsChecked: false,
        }
    }

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

    renderSelectPathChangeContainer = () => {
        const { selectPathSteps, agentProfile, agentType } = this.props;
        const { isTermsChecked } = this.state;
        const headerTitle = "";

        if (selectPathSteps) {
            const agentTypeSteps = selectPathSteps ? selectPathSteps.childSteps : undefined;

            if (agentTypeSteps && agentProfile && isTermsChecked) {
                //const filterdAgentTypeSteps = agentTypeSteps.filter(item => item.uniqueId !== AdmissionStep.SOLE_PROPRIETOR);
                const filterdAgentTypeSteps = null;
                const currentStep = agentTypeSteps.find((agentTypeStep) => {
                    return agentTypeStep.uniqueId === AdmissionStep.SOLE_PROPRIETOR;
                });

                return (
                    <Translate>
                        {({ translate }) => <>
                            <div className={classNames({
                                "col-lg-5": this.currentSubstep === "ssn",
                                "col-lg-4": this.currentSubstep !== "ssn",
                                "offset-lg-1": this.currentSubstep == "agreements",
                                "offset-lg-2": this.currentSubstep == "ssn",
                                "offset-lg-3": this.currentSubstep == "businessinfo",
                                "col-md-10 offset-lg-0 offset-md-1 col-xs-12": true,
                            })} >
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

    handleRestartModalOpen = () => {
        this.setState({
            isRestartModalOpen: true
        });
    };

    renderViewByAdmissionStep = () => {

        const { isAdmissionStepsFetchInProgress } = this.props;
        switch (this.currentSubstep) {
            case "ssn": //India ssn replace by AADHAR or PAN
                return (
                    <Aadhar
                        agentProfile={this.props.agentProfile}
                        restartText="Don’t want to register as a Sole Proprietor"
                        handleRestartClick={this.handleRestartModalOpen}
                        btnNextId="btnRegisterIndividualSSNNext"
                        changeTypeBtnId="btnRegisterIndividualSSNChangeType"
                    />
                );
            case "businessinfo":
                return (
                    <RegisterBusinessFormContainer
                        agentProfile={this.props.agentProfile}
                        handleRestartClick={this.handleRestartModalOpen}
                    />
                );
            /*return ((<Translate>
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
            </Translate>)); */
            case "agreements":
            /** Demo feedbck: Don't display agreements for phase 1. **/
            // return (
            //     <AgreementsContainer
            //         btnAgreementsNextId="btnRegisterIndividualAgreementsNext"
            //         agentProfile={this.props.agentProfile}
            //         isSoleProprietor={true}
            //     />
            // )


            // return(
            //     (<Translate>
            //         {
            //             ({translate}) => <Fragment>
            //                  <p className={`${styles['form-container__copy']} ${commonStyle['lightFont']} ${commonStyle['blackColor']}`}>
            //                     End spotify India Pahse 1 registration process. spotify will reach you on further enhancements. 
            //             </p>
            //             </Fragment>
            //         }
            //     </Translate>)
            // )
            default:
                return null;
        }
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

    render() {
        const { selectPathSteps, agentProfile, logoutRedirect, agentCountryId, countries, admissionSteps, agentType } = this.props;

        if (Object.keys(selectPathSteps).length === 0 || countries.length === 0) return <LoadingComponent />
        if (selectPathSteps) {
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
                return <Redirect to={{ pathname: ADMISSION_STEP_ROUTES.soleProprietor, search: `?step=${incomingSubStep}` }} />;

            return substeps ? isAgreementsStep && agentType.isSigningAgreement
                ? <SignAgreement logoutUser={logoutRedirect} />
                : (
                    <Translate>
                        {
                            ({ translate }) => <Fragment>
                                <div className={`row `}>
                                    <div className={classNames({
                                        "col-lg-5": this.currentSubstep !== "agreements",
                                        "col-lg-7": this.currentSubstep == "agreements",
                                        "col-md-10 offset-md-1 offset-lg-0 col-xs-12": true,
                                    })}>
                                        <h1 className={`${commonStyle['heading_1']} ${commonStyle['regularFont']} ${commonStyle['heading_1_top']} ${commonStyle['active_color']} ${commonStyle['widthChange4']}  ${styles['lineHeight']} `}>{translate(headerTitle)}</h1>
                                        {this.currentSubstep === "ssn" && <p className={`${commonStyle['widthChange']} ${commonStyle['paddingChangeMedium']} ${commonStyle['lightFont']} ${commonStyle['blackColor']} ${commonStyle['paragraph_3']} ${commonStyle['componentsMargin']}`}>{translate(headerSubTitle)}</p>}

                                        {/* Hiding below content for spotify India Pahse 1 */}
                                        {/* {this.currentSubstep == "agreements" &&
                                        <h3 className={`${styles['text-bold']} ${commonStyle['paragraph_1']} ${commonStyle['blackColor']} ${commonStyle['componentsMargin']} `}>
                                            { translate("Just one step to go. Let’s make it official!") }</h3>}   
                            {this.currentSubstep == "agreements" && <p className={`agreementcopy col-xl-11 col-md-12 pl-0 ${commonStyle['lightFont']} ${commonStyle['paragraph_3']} ${commonStyle['blackColor']} ${commonStyle['agreementcopy1']}`}>{translate("agreementCopy")}</p>} */}
                                        {/* End spotify India Phase 1 */}
                                        {this.currentSubstep == "agreements" &&
                                            <h2 className={` ${commonStyle['lightFont']}`}>
                                                {translate("End spotify India Phase 1")}
                                            </h2>}

                                        <div className={`d-none d-lg-none`}>
                                            <AdmissionSteps
                                                headerCopy={translate("Three steps to finish!")}
                                                substeps={substeps || []}
                                                business={'register-individual'}
                                                region={region}
                                            />
                                        </div>

                                        {/* pending */}
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
                                    {this.renderSelectPathChangeContainer()}
                                </div>
                                <ConfirmRestartAgentModal
                                    isOpen={this.state.isRestartModalOpen}
                                    onRequestClose={this.handleRestartModalClose}
                                    handleCancelClick={this.handleRestartModalClose}
                                    handleConfirmClick={this.handleRestartModalConfirm}
                                />
                            </Fragment>
                        }
                    </Translate>
                )
                : <Redirect to="/" />

        }

        return (
            <div>
            </div>
        )
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
    { showAgreements, removeRegisterIndividual, logoutRedirect, getCountries, getMedia }
)(RegisterIndividualIN)));
