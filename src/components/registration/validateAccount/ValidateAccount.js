import React, { Component } from 'react';
import styles from './ValidateAccount.module.scss';
import { connect } from 'react-redux';
import { Translate } from 'spotify-shared-web/localize'
import MainLayout from '../../layouts/MainLayout';
import AdmissionSteps from '../../shared/admissionSteps/AdmissionSteps';
import RegistrationHeader from '../../shared/RegistrationHeader';
import ValidatePhone from './validatePhone/ValidatePhone';
import ValidateEmail from './validateEmail/ValidateEmail';
import AssessmentView from './assessment/Container';
import EducationView from './EducationModule/Container';
import PcScan from "./pcscan/PcScan";


import mobileIcon from '../../../assets/images/validateAccount/mobileIcon.png';
import emailIcon from '../../../assets/images/validateAccount/email-icon.svg';
import helpIcon from '../../../assets/images/validateAccount/help-img.png'
import { logoutRedirect } from '../../../actions/loginActions';
import { Redirect } from 'react-router-dom';
import businessLogicHelper from '../../../helpers/businessLogicHelper';
import { getAgentStepFromURL } from '../../../helpers/uiHelpers';
import { ADMISSION_STEP_ROUTES } from '../../../config';
import { USER_ID, COUNTRY_IDS } from '../../../constants';
import commonStyle from '../../shared/CommonStyle.module.scss'
import SCREEN_CONFIG from "../../../screensConfig";
import Footer from '../../layouts/Footer';
import ValidateAccountFooter from '../../layouts/ValidateAccountFooter';
import { Divider } from 'antd';

const subStepMap = {
    "Validate Phone": "phone",
    "Validate Email": "email",
    "Validate System": "pcscan",
    "Validate Assessment": "assessment",
    "Validate Training": "education"
}

const CURRENT_SCREEN = SCREEN_CONFIG.contactValidation;
class ValidateAccount extends Component {

    renderViewByAdmissionStep = () => {
        const { agentProfile } = this.props;
        switch (this.currentSubstep) {
            case 'phone':
                return <ValidatePhone agentProfile={agentProfile} />;
            case 'email':
                return <ValidateEmail agentProfile={agentProfile} />;
            case 'pcscan':
                return <PcScan agentProfile={agentProfile}/>;
            case 'assessment':
                return <AssessmentView agentProfile={agentProfile} />
            case 'education' :
                return <EducationView agentProfile={agentProfile}/>
            default:
                return null;
        }
    };

    renderIconByAdmissionStep = () => {

        switch (this.currentSubstep) {
            case 'phone':
                return <img className={`img-fluid ${commonStyle['widthChange3']}`} src={mobileIcon} alt='' />;
            case 'email':
                return <img src={emailIcon} alt='' />;
            default:
                return null;
        }
    };
    isOldAdmissionSteps = ()  => {
        return ['phone','email'].includes(this.currentSubstep)
    }
    render() {
        const { logoutRedirect, admissionSteps, agentProfile, width } = this.props;
        let validateAccountSteps, subStep, incomingSubStep;
        if (admissionSteps[1] && !admissionSteps[1].completed) {

            validateAccountSteps = admissionSteps[1].childSteps;
            subStep = businessLogicHelper.getCurrentSubstep(validateAccountSteps);
            incomingSubStep = subStepMap[subStep.name];
            this.currentSubstep = getAgentStepFromURL(this.props.location.search)
            return incomingSubStep !== this.currentSubstep
                ? <Redirect to={{ pathname: ADMISSION_STEP_ROUTES.validateAccount, search: `?step=${incomingSubStep}` }} />
                : (<Translate>
                    {({ translate }) => <>
                        <MainLayout
                            navTitle={translate(`${CURRENT_SCREEN}.id`) + `: ${agentProfile.agentId}`}
                            buttonName={translate(`${CURRENT_SCREEN}.logout`)}
                            handleClick={logoutRedirect}
                            showProgress={false}
                            showRegistrationHeader={false}
                            newHeader = {!this.isOldAdmissionSteps()}
                            countryCode={this.props.agentProfile.countryCode}
                        >
                            <div className='row justify-content-between'>



                                <div className={`col-sm-12 col-xl-${this.isOldAdmissionSteps() ?'7': '12'} col-lg-${this.isOldAdmissionSteps() ?'7': '12'}`}>
                                    {this.isOldAdmissionSteps() &&<RegistrationHeader
                                        title={translate(`${CURRENT_SCREEN}.heading`)}
                                        subtitle={translate(this.currentSubstep === 'phone' ? `${CURRENT_SCREEN}.phoneNumber.headerDescription` : `${CURRENT_SCREEN}.headerDescription`)}
                                    />}

                                    {/*<div className="d-block d-lg-none">

                                         <AdmissionSteps
                                            headerCopy= {translate('Two steps to validate!')}
                                            substeps={validateAccountSteps}
                                            parentStep={admissionSteps[1].name}
                                        />
                                    </div>*/}
                                    <div><div className={`d-flex pl-sm-4 pr-sm-4 pr-md-4 ${commonStyle['widthChange4']}`}> {this.renderViewByAdmissionStep()}</div></div>
                                </div>
                                {this.isOldAdmissionSteps() && <div className={`d-none d-lg-block col-lg-4 mt-lg-5 p-0 ${styles['align-right']}`}>
                                    <div className={`mt-3 mr-2 ${styles['mobile-icon']}`}>
                                        {/*<div className={`float-right ${styles['mobile-icon']}`}>*/}
                                        {this.renderIconByAdmissionStep()}
                                        {/* <AdmissionSteps
                                            headerCopy={translate('Two steps to validate!')}
                                            substeps={validateAccountSteps}
                                            parentStep={admissionSteps[1].name}
                                        /> */}
                                    </div>
                                </div>}
                            </div>
                        </MainLayout>

                        <ValidateAccountFooter footerConfig={this.props.screenConfig.footer} />
                        {/* <div className={`row d-none d-md-block d-lg-block mr-2 ${styles['align-right']} ${commonStyle['lastComponent3']}`}>
                                <img src={helpIcon} alt=''/>
                            </div> */}
                    </>}
                </Translate>)
        }
        // else if (admissionSteps.length == 0) {


        //     logoutRedirect();

        // }
        return <Redirect to="/" />
    }
}

function mapStateToProps({ app, validateAccount, admissionSteps, agentProfile }) {
    return {
        screenConfig: app.countryConfigurations.config,
        updatePhone: validateAccount.updatePhone,
        admissionSteps: admissionSteps.steps,
        agentProfile
    };
}

export default connect(
    mapStateToProps,
    { logoutRedirect }
)(ValidateAccount);
