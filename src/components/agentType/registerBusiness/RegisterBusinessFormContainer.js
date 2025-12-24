import React, { Component } from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import styles from './RegisterBusinessFormContainer.module.scss';
import { Translate } from 'spotify-shared-web/localize'
import RegisterBusinessForm from './RegisterBusinessForm';
import {
    registerBusinessSchema,
    registerBusinessSchemaUS,
    registerBusinessSchemaCA,
    registerBusinessSchemaUK,
    registerBusinessSchemaIN
} from './registerBusinessSchema';
import { COUNTRY_IDS, TaxProgram, TypeOfIncopration } from '../../../constants';

import formHelpers from 'spotify-shared/helpers/formHelpers'
import { getCountries, getProvinces, getStates, } from '../../../actions/registrationActions';

import { logoutRedirect } from '../../../actions/loginActions';

import {
    registerBusiness,
    getGstHst,
    getTypeOfIncorporation,
    validateGstHst,
    springVerifyGST,
    toggleIsFetchingFlagForGST,
    secVerify,
    toggleIsFetchingFlagForSEC,
    tinVerify,
    toggleIsFetchingFlagForTIN,
    clearRegisterBusinessError
} from '../../../actions/agentTypeActions';
import commonStyle from '../../shared/CommonStyle.module.scss';
import SCREEN_CONFIG from '../../../screensConfig';

const CURRENT_SCREEN = SCREEN_CONFIG.registerYourCompany;

class RegisterBusinessFormContainer extends Component {
    state = {
        recent: '',
    };

    componentDidMount() {
        if (!this.props.profile.isFetchCountriesComplete) {
            this.props.getCountries();
        }
        if (!this.props.profile.isFetchStatesComplete || !this.props.profile.isFetchProvincesComplete) {
            if (this.props.registerBusinessScreenConfig.companyDetails.stateOfIncorporation.isState === false)
                getProvinces();
            else
                this.props.getStates();
        }
        this.props.getGstHst();
        this.props.getTypeOfIncorporation();
    }

    handleFeinVerification = (value) => {
        this.props.verifyFeinUnique(value);
    };

    verifyBusinessID = (value) => {
        this.props.verifyFeinUnique(value);
    };

    getInitialFormValuesByRegion = (agentProfile, registerBusiness) => {


        switch (agentProfile.countryId) {
            // case COUNTRY_IDS.US:
            //     return registerBusiness.US.formInfo;
            // case COUNTRY_IDS.UK:
            //     return registerBusiness.UK.formInfo;
            // case COUNTRY_IDS.CA:
            //     return registerBusiness.CA.formInfo;
            // case COUNTRY_IDS.IN:
            //     return registerBusiness.IN.formInfo;
            default:
                return registerBusiness.REGISTERCOUNTRY.formInfo;
        }
    };

    getValidationSchemaByRegion = (agentProfile, registerBusinessScreenConfig) => {
        // switch (agentProfile.countryId) {
        // case COUNTRY_IDS.US:
        //     return registerBusinessSchema(registerBusinessScreenConfig);
        // case COUNTRY_IDS.UK:
        //     return registerBusinessSchemaUK;
        // case COUNTRY_IDS.CA:
        //     return registerBusinessSchemaCA;
        // case COUNTRY_IDS.IN:
        //     return registerBusinessSchemaIN;
        //     default:
        //         return registerBusinessSchemaUS;
        // }
        return registerBusinessSchema(registerBusinessScreenConfig);
    };

    handleSubmit = (values) => {
        //IN Condition TaxId is verifiesd through Spring Verify and GST is optional
        if ((this.props.agentProfile.countryId === COUNTRY_IDS.IN &&
            ((this.props.registerBusinessScreenConfig.companyDetails.taxId.taxIdVerification === "SpringVerify")
                || (!this.props.registerBusinessScreenConfig.companyDetails.taxId.required && values.vatid && values.vatid.length === 0))) ||
            //CA Condition BusinessId is verifiesd through Scraper or if its OFF
            (this.props.agentProfile.countryId === COUNTRY_IDS.CA &&
                ((this.props.registerBusinessScreenConfig.companyDetails.businessId.businessIdVerification === "Scraper" && (this.props.agentType.registerBusiness.gstHstValid || (values.registrationStatus === "Exempt" && values.exemptCheckBox) || this.props.agentType.registerBusiness.error === "EXTERNAL_SERVER_ERROR"))
                    || (this.props.registerBusinessScreenConfig.companyDetails.businessId.businessIdVerification === "OFF" && this.props.registerBusinessScreenConfig.companyDetails.taxId.taxIdVerification === "N/A")))
            //US Condition Business Id verifiesd through is TIN
            || (this.props.agentProfile.countryId === COUNTRY_IDS.US &&
                (this.props.registerBusinessScreenConfig.companyDetails.businessId.businessIdVerification === "TIN"))
            //UK Condition Both Business Id and Tax id is NA
            || (this.props.agentProfile.countryId === COUNTRY_IDS.UK && (this.props.registerBusinessScreenConfig.companyDetails.businessId.businessIdVerification === "N/A" && this.props.registerBusinessScreenConfig.companyDetails.taxId.taxIdVerification === "N/A"))
            //PH Condition Business Id verifiesd through is TIN
            || (this.props.agentProfile.countryId === COUNTRY_IDS.PH &&
                (this.props.registerBusinessScreenConfig.companyDetails.taxId.taxIdVerification === "SEC"))
        ) {
            console.log("submitEvent-->");
            if (this.props.agentProfile.countryId === COUNTRY_IDS.PH) {
                const formData = formHelpers.constructFormData(values);
                console.log("formData-->", formData);
                this.props.registerBusiness(
                    Object.assign(formData, {
                        agentId: this.props.agentProfile.agentId,
                        countryId: this.props.agentProfile.countryId,
                        vatid: values.vatidPH,
                        fein: values.feinPH,
                        servicePartnerType: TypeOfIncopration[values.typeOfIncorporation]
                    })
                );
            } else {
                const formData = formHelpers.constructFormData(values);
                this.props.registerBusiness(
                    Object.assign(formData, {
                        agentId: this.props.agentProfile.agentId,
                        countryId: this.props.agentProfile.countryId,
                        GSTValidationStatus: this.props.agentType.registerBusiness.gstHstValid ? "Yes" : "No",
                        GSTRegistrationStatus: values.registrationStatus,
                        GstHst: TaxProgram[values.taxProgram],
                        typeOfIncopration: TypeOfIncopration[values.typeOfIncorporation]
                    })
                );
            }

        }


    };

    setRecent = (name) => {
        this.setState({
            recent: name
        });
    };

    getSmartyAddresses = (value) => {
        console.log("inside form container", value)
        //this.props.fetchsmartyAddresses({searchkey:value})
    }

    render() {
        const { agentProfile } = this.props;
        const { registerBusiness } = this.props.agentType;


        return (
            <Translate>
                {({ translate }) => {
                    const isPHUser = agentProfile.countryId === COUNTRY_IDS.PH;
                    // let descriptionString = translate(`${CURRENT_SCREEN}.companyDetails.description`);
                    // if (agentProfile.countryId === COUNTRY_IDS.CA) {
                    //     const innerText = descriptionString.props.dangerouslySetInnerHTML.__html;
                    //     descriptionString = innerText.replace(/<\/?span[^>]*>/gi, '');
                    // }
                    return <>
                        <div className={`${styles['form-container']} ${commonStyle['widthChange']} `}>
                            {/* <br/> */}

                            <h3 className={`${styles['form-container__header']} ${commonStyle['mediumFont']} ${commonStyle['blackColor']} ${commonStyle['semiBoldWeight']} ${commonStyle['subHeading1']} ${commonStyle['componentsMargin']}`}>
                                {translate(`${CURRENT_SCREEN}.companyDetails.header`)}
                            </h3>



                            <p className={`${styles['form-container__copy']} ${commonStyle['lightFont']} ${commonStyle['blackColor']} ${styles["justified-text"]}`}
                            // dangerouslySetInnerHTML={{ __html: descriptionString }}
                            >{translate(`${CURRENT_SCREEN}.companyDetails.description`)}</p>

                            <Formik
                                initialValues={this.getInitialFormValuesByRegion(
                                    agentProfile,
                                    registerBusiness
                                )}
                                validationSchema={registerBusinessSchema(this.props.registerBusinessScreenConfig, this.props.profile.formOptions.states, isPHUser)}
                                validateOnBlur={true}
                                onSubmit={this.handleSubmit}
                                render={(formikProps) => (
                                    <RegisterBusinessForm
                                        registerBusinessScreenConfig={this.props.registerBusinessScreenConfig}
                                        phoneValidations={this.props.phoneValidations}
                                        registerBusiness={registerBusiness}
                                        verifyBusinessID={this.verifyBusinessID}
                                        springVerifyGST={this.props.springVerifyGST}
                                        secVerify={this.props.secVerify}
                                        tinVerify={this.props.tinVerify}
                                        isFetchingSEC={this.props.isFetchingSEC}
                                        isFetchingTIN={this.props.isFetchingTIN}
                                        isFetchingGST={this.props.isFetchingGST}
                                        toggleIsFetchingFlagForGST={this.props.toggleIsFetchingFlagForGST}
                                        toggleIsFetchingFlagForSEC={this.props.toggleIsFetchingFlagForSEC}
                                        toggleIsFetchingFlagForTIN={this.props.toggleIsFetchingFlagForTIN}
                                        isSpringVerifyGSTValid={this.props.isSpringVerifyGSTValid}
                                        isSecVerifyValid={this.props.isSecVerifyValid}
                                        isTinVerifyValid={this.props.isTinVerifyValid}
                                        remainingtaxIDAttempts={this.props.remainingtaxIDAttempts}
                                        clearRegisterBusinessError={this.props.clearRegisterBusinessError}
                                        // verifyFeinUnique={this.handleFeinVerification}
                                        handleRestartClick={this.props.handleRestartClick}
                                        agentProfile={this.props.agentProfile}
                                        profile={this.props.profile}
                                        setRecent={this.setRecent}
                                        recent={this.state.recent}
                                        validateGstHst={this.props.validateGstHst}
                                        logoutRedirect={this.props.logoutRedirect}
                                        {...formikProps}
                                    />
                                )}
                            />

                        </div>
                    </>
                }}
            </Translate>);
    }
}

function mapStateToProps(state, props) {
    const { agentType, agentProfile, registration, app } = state;


    const isFetchingGST = agentType.registerBusiness.isFetchingGST;
    const isFetchingSEC = agentType.registerBusiness.isFetchingSEC;
    const isFetchingTIN = agentType.registerBusiness.isFetchingTIN;
    const isSpringVerifyGSTValid = agentType.registerBusiness.springVerifyGSTvalid;
    const isSecVerifyValid = agentType.registerBusiness.secVerifyvalid;
    const isTinVerifyValid = agentType.registerBusiness.tinVerifyvalid;
    const remainingtaxIDAttempts = agentType.registerBusiness.remainingtaxIdAttempts;



    return {
        agentType,
        agentProfile,
        profile: registration.profile,
        phoneValidations: app.countryConfigurations.config.phonenumberValidationScreen.phoneNumberFormat.validation,
        registerBusinessScreenConfig: app.countryConfigurations.config.roleRegistrationScreen.companyRegistrationScreen,
        isFetchingGST,
        isFetchingSEC,
        isFetchingTIN,
        isSpringVerifyGSTValid,
        isSecVerifyValid,
        isTinVerifyValid,
        businessIdValidated: agentType.registerBusiness.businessIdValidated,
        remainingtaxIDAttempts
    };
}

export default connect(
    mapStateToProps,
    {
        registerBusiness,
        springVerifyGST,
        secVerify,
        toggleIsFetchingFlagForSEC,
        tinVerify,
        toggleIsFetchingFlagForTIN,
        getGstHst,
        getTypeOfIncorporation,
        getCountries,
        getStates,
        getProvinces,
        validateGstHst,
        logoutRedirect,
        toggleIsFetchingFlagForGST,
        clearRegisterBusinessError
    }
)(RegisterBusinessFormContainer);
