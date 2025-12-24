// import styles from './RegisterBusiness.module.scss';
// import React, { Component, Fragment } from 'react';
// import { connect } from 'react-redux';
// import RegisterBusinessFormContainer from './RegisterBusinessFormContainer';
// import Ssn from '../ssn/Ssn';
// import AdmissionSteps from '../../shared/admissionSteps/AdmissionSteps';
// import RestartNextFooter from '../../shared/RestartNextFooter';
// import ConfirmRestartAgentModal from '../ConfirmRestartAgentModal';
// import RegisterBusinessIcon from '../../../assets/images/agentType/new-call-center.svg';
// import { getStates, getProvinces } from '../../../actions/registrationActions';
// import { showAgreements, removeRegisterBusiness, getMedia } from '../../../actions/agentTypeActions';
// import businessLogicHelper from '../../../helpers/businessLogicHelper';
// import { AdmissionStep, COUNTRY_IDS } from '../../../constants'
// import { ADMISSION_STEP_ROUTES } from '../../../config';
// import { logoutRedirect } from '../../../actions/loginActions';
// import { Redirect } from 'react-router-dom';
// import { getAgentStepFromURL } from '../../../helpers/uiHelpers';
// import AgreementsContainer from '../AgreementsContainer';
// import SignAgreement from '../agreements/SignAgreement';
// import MainLayoutFullNavAuthenticated from "../../layouts/MainLayoutFullNavAuthenticated";
// import * as admissionStepSelectors from "spotify-shared/selectors/admissionSteps"
// import { getCountries } from "../../../actions/registrationActions"
// import LoadingComponent from 'spotify-shared-web/components/common/LoadingComponent';
// import { withRouter } from 'react-router-dom'
// import { Translate } from 'spotify-shared-web/localize'
// import AgentTypeItem from '../AgentTypeItem-US'
// import { agentImageStringMapping } from '../agentData';
// import { Card } from 'react-bootstrap';
// import commonStyle from '../../../../src/components/shared/CommonStyle.module.scss';
// import AgentTypeList from "../AgentTypeList";
// import classNames from "classnames";
// import RegisterIndividualIcon from "../../../assets/images/agentType/sole-proprietor.svg";
// import JoinBusinessIcon from "../../../assets/images/agentType/working-for-call-center.svg";
// //import { TRUE } from 'node-sass';
// import AgentTypeHelp from '../AgentTypeHelp';

// const subStepMap = {
//     [AdmissionStep.NCC_VERIFY_IDENTITY]: "ssn",
//     [AdmissionStep.NCC_BUSINESS_INFO]: "businessinfo",
//     [AdmissionStep.NCC_SIGN_AGREEMENTS]: "agreements",
//     [AdmissionStep.NCC_VERIFY_BUSINESS_INFO]: "pendingfinalization"
// }

// class RegisterBusinessUS extends Component {
//     state = {
//         isRestartModalOpen: false,
//         isTermsChecked: false,
//         isAgeChecked: false,
//         majorType: undefined,
//     };

//     componentDidMount = () => {
//         this.props.getStates();
//         this.props.getProvinces();
//         this.props.getCountries();
//         this.props.getMedia(this.props.agentProfile.countryId);
//     };

//     getSubSteps = (agentTypeSteps) => {
//         const currentStep = agentTypeSteps.find((agentTypeStep) => {
//             return agentTypeStep.uniqueId === AdmissionStep.NEW_CALL_CENTER;
//         });
//         return currentStep ? currentStep.childSteps : undefined;
//     };

//     handleRestartModalOpen = () => {
//         this.setState({
//             isRestartModalOpen: true
//         });
//     };

//     handleRestartModalClose = () => {
//         this.setState({
//             isRestartModalOpen: false
//         });
//     };

//     handleRestartModalConfirm = () => {
//         this.props.removeRegisterBusiness(this.props.agentProfile.agentId);
//     };

//     getHandleNextClickAction = (substeps) => {
//         const currentStep = substeps.find((substep) => {
//             return substep.available === true || substep.inProgress === true;
//         });

//         switch (currentStep.uniqueId) {
//             case AdmissionStep.JB_SEND_REQUEST:
//                 return () => { };
//             case AdmissionStep.NCC_SIGN_AGREEMENTS:
//                 return this.props.showAgreements;
//             default:
//                 return () => { };
//         }
//     };

//     getHandleNextCTA = (substeps) => { };

//     getNextDisabled = (substeps) => {
//         const currentStep = substeps.find((substep) => {
//             return substep.available === true || substep.inProgress === true;
//         });
//         return (
//             currentStep.uniqueId === AdmissionStep.JB_SEND_REQUEST ||
//             currentStep.uniqueId === AdmissionStep.JB_PENDING_FINALIZATION ||
//             currentStep.uniqueId === AdmissionStep.NCC_VERIFY_BUSINESS_INFO
//         );
//     };

//     renderViewByAdmissionStep = () => {
//         const { agentProfile } = this.props;
//         const isUKUser = agentProfile.countryId === COUNTRY_IDS.UK;

//         switch (this.currentSubstep) {
//             case "ssn":
//                 return (
//                     <Ssn
//                         agentProfile={this.props.agentProfile}
//                         handleRestartClick={this.handleRestartModalOpen}
//                         restartText={isUKUser ? "Don’t want to register a company" : "Don’t want to register a company"}
//                         btnNextId="btnRegisterBusinessSSNNext"
//                         changeTypeBtnId="btnRegisterBusinessSSNChangeType"
//                     />
//                 );
//             case "businessinfo":
//                 return (
//                     <RegisterBusinessFormContainer
//                         agentProfile={this.props.agentProfile}
//                         handleRestartClick={this.handleRestartModalOpen}
//                     />
//                 );
//             case "agreements":
//                 return (
//                     <AgreementsContainer
//                         btnAgreementsNextId="btnRegisterBusinessAgreementsNext"
//                         agentProfile={this.props.agentProfile}
//                         isRegisterBusiness={true}
//                     />
//                 )
//             case "pendingfinalization":
//                 return (<Translate>
//                     {({ translate }) => <>
//                         <div className={`${styles['pending-review']} ${commonStyle['componentsMargin']}`}>
//                             <h5 className={styles['pending-review__header']}>
//                                 {translate("RegisterBusinessPendingFinalization")}
//                             </h5>
//                         </div>
//                     </>}
//                 </Translate>)
//             default:
//                 return <div></div>;
//         }
//     };

//     renderRestartFooter = (substeps) => {
//         const currentStep = businessLogicHelper.getCurrentSubstep(substeps);

//         if (
//             currentStep.uniqueId === AdmissionStep.NCC_VERIFY_IDENTITY ||
//             currentStep.uniqueId === AdmissionStep.NCC_BUSINESS_INFO
//         ) {
//             return false;
//         }
//         return true;
//     };

//     renderStepsContainer = () => {
//         const { selectPathSteps, agentCountryId, countries, admissionSteps } = this.props;
//         const region = businessLogicHelper.getAgentRegion(agentCountryId, countries);
//         const agentTypeSteps = selectPathSteps.childSteps;
//         const substeps = this.getSubSteps(agentTypeSteps);

//         return (<Translate>
//             {({ translate }) => <>
//                 <div className={`d-none d-lg-block col-lg-4 ${styles['align-center']} ${styles['horizontal-spacing']}`}>
//                     <img src={RegisterBusinessIcon} alt='' />
//                     <AdmissionSteps
//                         headerCopy={translate("Three steps to finish!")}
//                         substeps={substeps}
//                         business={'register-business'}
//                         region={region}
//                     />
//                 </div>
//             </>}
//         </Translate>)
//     }

//     renderSelectPathChangeContainer = () => {
//         const { selectPathSteps, agentProfile, agentType } = this.props;
//         const { isTermsChecked } = this.state;
//         const headerTitle = "Don’t want to register a company?"

//         if (selectPathSteps) {
//             const agentTypeSteps = selectPathSteps ? selectPathSteps.childSteps : undefined;

//             if (agentTypeSteps && agentProfile) {
//                 const filterdAgentTypeSteps = agentTypeSteps.filter(item => item.uniqueId !== AdmissionStep.NEW_CALL_CENTER);
//                 const currentStep = agentTypeSteps.find((agentTypeStep) => {
//                     return agentTypeStep.uniqueId === AdmissionStep.NEW_CALL_CENTER;
//                 });

//                 return (
//                     <Translate>
//                         {({ translate }) => <>
//                             <div className={classNames({
//                                 "col-lg-5": this.currentSubstep === "ssn",
//                                 "col-lg-4": this.currentSubstep !== "ssn",
//                                 "offset-lg-1": this.currentSubstep == "agreements",
//                                 "offset-lg-2": this.currentSubstep == "ssn",
//                                 "offset-lg-3": (this.currentSubstep == "businessinfo" || this.currentSubstep == "pendingfinalization"),
//                                 "col-md-10 offset-md-1 offset-lg-0 col-xs-12": true,
//                             })}>
//                                 {/* <br />
//                                 <br />
//                                 <br /> */}
//                                 {this.currentSubstep == "ssn" && <h1 className={`${commonStyle['heading_1']} ${commonStyle['heading_1_topUS']} ${commonStyle['componentsBottomMargin']}`} style={{ textTransform: 'uppercase' }}>
//                                 {headerTitle}</h1>}

//                                 {this.currentSubstep != "ssn" && <Fragment>



//                                     <p className={`${commonStyle['heading_1_topUS']} ${commonStyle['componentsBottomMargin']}`} style={{ fontWeight: 600 }}>{headerTitle}</p>

//                                     {/* <br />

//                                     <br /> */}

//                                 </Fragment>}
//                                 {filterdAgentTypeSteps &&
//                                     filterdAgentTypeSteps.map((type, index) => (
//                                         <>
//                                             <AgentTypeItem
//                                                 agentTypeStep={type}
//                                                 agentId={agentProfile.agentId}
//                                                 agentImageStringMapping={agentImageStringMapping}
//                                                 isTermsChecked={isTermsChecked}
//                                                 key={type.admissionStepId}
//                                                 currentStep={currentStep}
//                                             />
//                                         </>

//                                     ))
//                                 }
//                                 <AgentTypeHelp media={agentType.media} />
//                             </div>
//                         </>}
//                     </Translate>
//                 )
//                 //const substeps = this.getSubSteps(agentTypeSteps);
//             }
//         }
//         return (
//             <Translate>
//                 {
//                     ({ translate }) => <>
//                         <div className={`d-none d-lg-block col-lg-4`} >
//                         </div>
//                     </>
//                 }
//             </Translate>
//         )
//     }

//     render() {

//         const { selectPathSteps, agentProfile, agentType, logoutRedirect, agentCountryId, countries, admissionSteps } = this.props;
//         const isUKUser = agentProfile.countryId === COUNTRY_IDS.UK;
//         const isCAUser = agentProfile.countryId === COUNTRY_IDS.CA;
//         if (Object.keys(selectPathSteps).length === 0 || countries.length === 0) return <LoadingComponent />

//         if (selectPathSteps && !selectPathSteps.completed) {


//             const region = businessLogicHelper.getAgentRegion(agentCountryId, countries);
//             const agentTypeSteps = selectPathSteps.childSteps;
//             const substeps = this.getSubSteps(agentTypeSteps);

//             const subStep = businessLogicHelper.getCurrentSubstep(substeps);
//             if (!subStep) return <Redirect to="/" />
//             const incomingSubStep = subStepMap[subStep.uniqueId];
//             this.currentSubstep = getAgentStepFromURL(this.props.location.search);
//             const isAgreementsStep = subStep.uniqueId === AdmissionStep.NCC_SIGN_AGREEMENTS;

//             const headerTitle = "REGISTER A COMPANY";
//             const headerSubTitle = "The following corporate types are not accepted: Partnership corporations, Trust/estate corporations. Businesses registering as an incorporated entity must also have a business checking account associated with the registration."

//             return incomingSubStep !== this.currentSubstep
//                 ? <Redirect to={{ pathname: ADMISSION_STEP_ROUTES.servicePartner_us, search: `?step=${incomingSubStep}` }} />
//                 : substeps
//                     ? isAgreementsStep && agentType.isSigningAgreement
//                         ? <SignAgreement logoutUser={logoutRedirect} isRegisterBusiness={true} />
//                         : (<Translate>
//                             {({ translate }) => <Fragment>
//                                 <div className={`row`}>
//                                     <div className={classNames({
//                                         "col-lg-5": this.currentSubstep !== "agreements",
//                                         "col-lg-7": this.currentSubstep == "agreements",
//                                         "col-md-10 offset-md-1 offset-lg-0 col-xs-12": true,
//                                     })}>
//                                         {/* <br /> */}
//                                         <h1 className={`${commonStyle['heading_1']} ${commonStyle['regularFont']} ${commonStyle['heading_1_top']} ${commonStyle['active_color']} ${styles['lineHeight']} mb-0 `}>{translate(headerTitle)}</h1>

//                                         {isUKUser && this.currentSubstep == "businessinfo" &&
//                                             <p className={`${commonStyle['widthChange']}  ${commonStyle['lightFont']} ${commonStyle['blackColor']} ${commonStyle['headerForm']}`}>
//                                                 {translate("If you are a named Director of a LTD company, enter your company details and we will verify them with Companies House.")}</p>
//                                         }

//                                         {!isUKUser && this.currentSubstep == "ssn" &&
//                                             <p className={`${commonStyle['paragraph_3']} ${commonStyle['withinParaMargin']} ${commonStyle['widthChange']} ${commonStyle['lightFont']} ${commonStyle['blackColor']} ${commonStyle['componentsMargin']}`} >
//                                                 {headerSubTitle}</p>}

//                                         {!isUKUser && this.currentSubstep !== "agreements" && this.currentSubstep == "ssn" &&
//                                             <p className={`${commonStyle['paragraph_1']} ${commonStyle['semiBoldWeight']} ${commonStyle['blackColor']} m-0`}>
//                                                 {translate("RegisterBusinessCopy")}</p>}

//                                                 {!isUKUser && this.currentSubstep !== "agreements" && this.currentSubstep == "businessinfo" &&
//                                             <p className={`${styles['componentsTopMargin']} ${commonStyle['paragraph_1']} ${commonStyle['semiBoldWeight']} ${commonStyle['blackColor']}`}>
//                                                 {translate("RegisterBusinessCopy")}</p>}

//                                         {/* {!isUKUser && this.currentSubstep !== "agreements" && this.currentSubstep !== "ssn" &&
//                                             <p className={`${commonStyle['paragraph_1']} ${commonStyle['semiBoldWeight']} ${commonStyle['blackColor']} ${commonStyle['componentsMargin']}`}>
//                                                 {translate("RegisterBusinessCopy")}</p>} */}

//                                                 {this.currentSubstep == "agreements" &&
//                                         <h3 className={`${styles['text-bold']} ${commonStyle['paragraph_1']} ${commonStyle['blackColor']} ${commonStyle['componentsMargin']} `}>
//                                             { translate("Just one step to go. Let’s make it official!") }</h3>}

//                                         {this.currentSubstep == "agreements" && <p className={`col-xl-11 col-md-12 pl-0 agreementcopy ${commonStyle['lightFont']} ${commonStyle['paragraph_3']} ${commonStyle['blackColor']} ${commonStyle['agreementcopy1']}`}>
//                                             {translate("agreementCopy")}</p>}
//                                         {/*{this.renderViewByAdmissionStep(substeps)}*/}
//                                         <div className={`d-none d-lg-none`}>
//                                             <AdmissionSteps
//                                                 headerCopy={translate('Three steps to finish!')}
//                                                 substeps={substeps}
//                                                 business={'register-business'}
//                                                 region={region}
//                                             />
//                                         </div>
//                                         {this.renderViewByAdmissionStep(substeps)}
//                                         {this.renderRestartFooter(substeps) ? (
//                                             <div className='row'>
//                                                 <div className='col-12'>
//                                                     <RestartNextFooter
//                                                         handleRestartClick={this.handleRestartModalOpen}
//                                                         handleNextClick={this.getHandleNextClickAction(substeps)}
//                                                         handleNextCTA={this.getHandleNextCTA(substeps)}
//                                                         isNextDisabled={this.getNextDisabled(substeps)}
//                                                         hideNext={isAgreementsStep}
//                                                         changeContratorTypeBtnId={"btnRegisterBusinessChangeContratorType_" + this.currentSubstep}
//                                                         restartText={"Don’t want to register a company"}
//                                                     />
//                                                 </div>
//                                             </div>
//                                         ) : null}
//                                     </div>
//                                     {/*{this.renderStepsContainer()}*/}
//                                     {this.renderSelectPathChangeContainer()}
//                                 </div>
//                                 <ConfirmRestartAgentModal
//                                     isOpen={this.state.isRestartModalOpen}
//                                     onRequestClose={this.handleRestartModalClose}
//                                     handleCancelClick={this.handleRestartModalClose}
//                                     handleConfirmClick={this.handleRestartModalConfirm}
//                                 />
//                             </Fragment>}
//                         </Translate>)
//                     : <Redirect to="/" />
//         }
//         else return <Redirect to="/" />
//     }
// }

// const mapStateToProps = (state, props) => {
//     const { agentType, agentProfile, registration, admissionSteps } = state;
//     const agentCountryId = agentProfile.countryId;
//     const countries = registration.profile.formOptions.countries;
//     const selectPathSteps = admissionStepSelectors.getAgentTypeSteps(state);
//     return { selectPathSteps, agentCountryId, countries, agentType, admissionSteps, agentProfile };
// }

// export default MainLayoutFullNavAuthenticated(withRouter(connect(
//     mapStateToProps,
//     {
//         getStates,
//         getProvinces,
//         showAgreements,
//         removeRegisterBusiness,
//         logoutRedirect,
//         getCountries,
//         getMedia
//     }
// )(RegisterBusinessUS)));
