import React, { useState, useEffect } from 'react';
import { TextField, CircularProgress } from '@material-ui/core';
import { Field, Form, ErrorMessage, useFormikContext } from 'formik';
import styles from './RegisterBusinessForm.module.scss';
import { Translate } from 'spotify-shared-web/localize';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import infoIcon from '../../../assets/images/info.png';
import Button from 'spotify-shared-web/components/common/Button';
import StateSelectField from '../../registration/profile/customFieldComponents/StateSelectField';
import PhoneField from '../../registration/profile/customFieldComponents/PhoneField';
import PhoneFieldUK from '../../registration/profile/customFieldComponents/PhoneFieldUK';
import formHelpers from 'spotify-shared/helpers/formHelpers'
import OverlaySpinner from 'spotify-shared-web/components/common/OverlaySpinner';
import OverlayTextLoader from 'spotify-shared-web/components/common/OverlayTextLoader';
import { asyncValidateTaxId, asyncValidateFein, asyncValidateBusinessId, persistError, validateConfirmPAN, asyncValidatePAN } from './customValidation';
import verified from "../../../assets/images/language/verified.png";
import { COUNTRY_IDS, CountryISO3CountryCode, titleAtTheCompany } from '../../../constants';
import { useInputStyles } from '../../../styles';
import commonStyle from '../../shared/CommonStyle.module.scss';
import SCREEN_CONFIG from '../../../screensConfig';
import spotifyButton from "spotify-shared-web/components/common/Button";
import DatePicker from "react-datepicker";
import { HTTP_STATUS, GST_VALIDATION_CODE } from "../../../constants";
import Checkbox from "spotify-shared-web/components/common/form/CheckboxInput"
import moment from "moment";

const CURRENT_SCREEN = SCREEN_CONFIG.registerYourCompany;
//import { render } from 'enzyme';
// import classNames from 'classnames';
// classNames
import Autocomplete from '@material-ui/lab/Autocomplete';
import debounce from 'lodash/debounce';
import { AutocompleteField } from './AutocompleteField';
import { AutocompleteFieldNonUS } from './AutocompleteFieldNonUS';
import { SMARTY_ADDRESS_US, SMARTY_ADDRESS_NON_US, SMARTY_API_KEY } from '../../../config';
import { BorderColor } from '@material-ui/icons';
import CheckboxGroup from "spotify-shared-web/components/common/form/CheckboxGroup";
import RadioButtonHorizontally from "spotify-shared-web/components/common/form/RadioButtonHorizontally";


//error style
const errorStyle = {
    marginBottom: "10px",
    marginTop: "-10px",
    fontSize: "12px",
    color: "red"
}
//Autocompete field
// const AutocompleteField = ({ name, label, fetchOptions,className,setFieldTouched,setRecent }) => {
//     const [loading, setLoading] = useState(false);
//     const { setFieldValue } = useFormikContext();
//     const [options, setOptions] = useState([]);
//     const [searchValue, setSearchValue] = useState('');
//     const [selectedValue, setSelectedValue] = useState(null);
//     const [open, setOpen] = useState(false);


//     const debouncedFetch = debounce(async (inputValue,selectedkey="") => {
//       setLoading(true);
//       const options = await fetchOptions(inputValue,selectedkey);
//       setLoading(false);
//       //setFieldValue(name, options);
//       console.log(options,"debounced fetch")
//       const res=options || []
//       setOptions(res);
//      setOpen(true)
//     }, 300);

//     const handleInputChange = (event, newInputValue) => {

//         setSearchValue(newInputValue);
//         debouncedFetch(newInputValue);
//     };
//     function buildAddress(suggestion) {
//         let whiteSpace = " ";
//         let modifiedSecondary=suggestion.secondary
//         if (suggestion.secondary) {
//             if (suggestion.entries > 1) {
//                 modifiedSecondary += " (" + suggestion.entries + " entries)";
//             }

//         }
//         return suggestion.street_line + whiteSpace + modifiedSecondary + " " + suggestion.city +  " " + suggestion.state + " " + suggestion.zipcode;
//     }
//     function buildSelected(suggestion) {
//         console.log(suggestion,"inside build")
//         let whiteSpace = "+";
//         let modifiedSecondary=suggestion.secondary
//         if (suggestion.secondary) {
//             if (suggestion.entries > 1) {
//                 modifiedSecondary += " (" + suggestion.entries + ")";
//             }

//         }
//         return suggestion.street_line + whiteSpace + modifiedSecondary + whiteSpace + suggestion.city + whiteSpace + suggestion.state + whiteSpace+ suggestion.zipcode;
//     }

//     return (
//         <div>
//       <Autocomplete

//         options={options}
//         getOptionLabel={(option) => buildAddress(option)}
//         value={selectedValue} // Use the selected value to control the Autocomplete value
//         inputValue={searchValue} // Manually set the input value
//         open={open}
//         onOpen={() => {
//             setOpen(true);
//         }}
//         onClose={() => {
//             setOpen(false);
//         }}
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             label={label}
//             variant="outlined"
//             className={className}
//             InputProps={{
//               ...params.InputProps,
//               endAdornment: (
//                 <>
//                   {loading ? <CircularProgress color="inherit" size={20} /> : null}
//                   {params.InputProps.endAdornment}
//                 </>
//               ),
//             }}
//           />
//         )}
//         onChange={(event, newValue) => {
//             console.log(newValue,"onchange")
//             if(newValue && newValue.entries<2){
//                 console.log("hello",newValue)
//                 //close the otpions
//                 setOpen(false)
//                 //set search field value
//                 let text=newValue["street_line"]+","+newValue["secondary"]+","+newValue["city"]+","+newValue["state"]
//                 setSelectedValue(newValue)
//                 //set actual field value and other fields
//                 setFieldValue(name, newValue["street_line"]+","+newValue["secondary"]+","+newValue["city"]+","+newValue["state"]);
//                 setFieldValue("city",newValue["city"])
//                 setFieldValue("zipCode", newValue["zipcode"])
//                 setFieldValue("address2",newValue["secondary"])

//                 //setFieldError()
//                 //trigger error
//                 setRecent(event.nativeEvent.srcElement.id);
//                 setFieldTouched(name,true)
//             }
//             else{
//                 let searchKey=buildAddress(newValue)
//                 searchKey=searchKey.split('(')[0]
//                 console.log(searchKey,"set")
//                 setSearchValue(searchKey)
//                 let selected=buildSelected(newValue)
//                 console.log(selected,"--------",searchKey)
//                 //setSearchValue()
//                 debouncedFetch(searchKey.replaceAll(" ","+"),selected.replaceAll(" ","+"))
//             }
//         }}
//         onInputChange={handleInputChange}

//       />
//        {/* {errors['address'] && touched['address'] && <div style={errorStyle}> <ErrorMessage name="name" /></div>} */}
//       </div>
//     );
//   };

const RegisterBusinessForm = ({

    form,
    field,
    errors,
    touched,
    values,
    handleChange,
    handleBlur,
    verifyFeinUnique,
    setFieldValue,
    setFieldTouched,
    registerBusiness,
    validateaddress,
    handleRestartClick,
    agentProfile,
    profile,
    setRecent,
    recent,
    setFieldError,
    phoneValidations,
    registerBusinessScreenConfig,
    springVerifyGST,
    isFetchingGST,
    toggleIsFetchingFlagForGST,
    validateGstHst,
    logoutRedirect,
    isSpringVerifyGSTValid,
    secVerify,
    isFetchingSEC,
    tinVerify,
    isFetchingTIN,
    isSecVerifyValid,
    isTinVerifyValid,
    toggleIsFetchingFlagForSEC,
    toggleIsFetchingFlagForTIN,
    remainingtaxIDAttempts,
    clearRegisterBusinessError
}) => {

    const companyDetails = registerBusinessScreenConfig.companyDetails;

    const [companyNameError, setCompanyNameError] = useState(false);
    const [nameVerified, setnameVerified] = useState(false);
    const [CheckedBox, setCheckedBox] = useState(false);

    const [businessIdError, setBusinessIdError] = useState('');
    const [businessIdValidationLoading, setBusinessIdValidationLoading] = useState(false);
    const [spverifyGST, setSpVerifyGST] = useState(false);
    const [verifySEC, setverifySEC] = useState(false);
    const [verifyTIN, setverifyTIN] = useState(false);
    const [showTransactionDateTooltip, setShowTransactionDateTooltip] = useState(false);
    const [businessIdActive, setBusinessIdActive] = useState(false);



    useEffect(() => {
        // Checking conditions for GST verification 
        if (
            companyDetails.taxId.taxIdVerification === "SpringVerify" &&
            values.name &&
            values.vatid &&
            !errors.name &&
            !errors.vatid &&
            !registerBusiness.error
        ) {
            // Calling function for GST verification 

            if (values.vatid.length === companyDetails.taxId.length) {

                setSpVerifyGST(true);

            }
        }

    }, [
        values.name,
        values.vatid,
        errors.name,
        errors.vatid,
    ]);

    useEffect(() => {
        // Checking conditions for SEC verification 
        if (
            companyDetails.taxId.taxIdVerification === "SEC" &&
            values.name &&
            values.vatidPH &&
            !errors.name &&
            !errors.vatidPH &&
            !registerBusiness.error
        ) {
            // Calling function for SEC verification 

            if (formHelpers.isTaxIdValid(values.vatidPH, companyDetails.taxId.validation.patternType)) {

                setverifySEC(true);

            }
        }

    }, [
        values.name,
        values.vatidPH,
        errors.name,
        errors.vatidPH,
    ]);

    useEffect(() => {
        // Checking conditions for TIN verification 
        if (
            companyDetails.businessId.businessIdVerification === "TIN" &&
            values.name &&
            values.feinPH &&
            !errors.name &&
            !errors.feinPH &&
            !registerBusiness.error
        ) {
            // Calling function for TIN verification 

            if (values.feinPH.length === companyDetails.businessId.minlength || values.feinPH.length === companyDetails.businessId.length) {

                setverifyTIN(true);

            } else {
                setverifyTIN(false);
            }
        }

    }, [
        values.name,
        values.feinPH,
        errors.name,
        errors.feinPH,
    ]);

    // useEffect(() => {
    //     // Checking 
    //     console.log("values-->", values);

    //     const formData = formHelpers.constructFormData(values);
    //     if (values.CheckBox) {
    //         console.log("formData-->", formData);
    //         RegisterBusiness(
    //             Object.assign(formData, {
    //                 agentId: agentProfile.agentId,
    //                 countryId: agentProfile.countryId,
    //                 vatid: values.vatidPH,
    //                 fein: values.feinPH,
    //                 servicePartnerType: TypeOfIncopration[values.typeOfIncorporation]
    //             })
    //         );
    //     }
    // }, [
    //     values
    // ]);



    const classes = useInputStyles();
    const SelectFieldStyle = {
        paddingTop: 24
    }
    const errorStyle = {
        marginBottom: "10px",
        marginTop: "-10px",
        fontSize: "12px",
        color: "red",

    }

    const nameErrorStyle = {
        ...errorStyle,
        ...(companyNameError && { marginBottom: '25px' }),
    }
    useEffect(() => {
        const { name, fein, taxProgram, companyType, registrationStatus } = values;
        const { businessId } = companyDetails;
        const businessIdVerification = businessId.businessIdVerification;
        const nameHasError = errors.name;
        const companyTypeHasError = errors.companyType;
        const feinHasError = errors.fein;
        const taxProgramError = errors.taxProgram;
        const registrationStatusError = errors.registrationStatus

        const hasErrors = nameHasError || companyTypeHasError || feinHasError || taxProgramError || registrationStatusError;
        const allFieldsFilled = name && fein && taxProgram && companyType && registrationStatus;

        if (allFieldsFilled && !hasErrors && !businessIdError && !businessIdValidationLoading && businessIdVerification === "Scraper") {
            const companyNameRegex = new RegExp(companyDetails.companyName.validation.pattern);
            const companyNameError = name && !companyNameRegex.test(name);
            if (!companyNameError) {
                validateGstHst({
                    "agentId": agentProfile.agentId,
                    "gstNumber": fein,
                    "companyName": name,
                    //"transactionDate": moment(transactionDate).format('MM/DD/YYYY')
                });
            }

        }
    }, [values.taxProgram, values.transactionDate, errors.name, errors.fein, errors.taxProgram, errors.transactionDate, businessIdError, businessIdValidationLoading, errors.registrationStatusError, values.registrationStatusError]);

    useEffect(() => {
        if (
            values.typeOfIncorporation && // prevent running on undefined
            companyDetails.companyName.validation.types.available &&
            values.name
        ) {
            checkCompanyNameRegex(values.name);
            if (!companyNameError && values.name) {
                setnameVerified(true);
            }
        }
    }, [values.typeOfIncorporation, values.name]);

    useEffect(() => {
        if (
            values.CheckBox
        ) {
            setCheckedBox(true);
        } else {
            setCheckedBox(false);
        }
    }, [values.CheckBox]);

    useEffect(() => {
        if (registerBusiness.remainingAttempts === 0) {
            setTimeout(() => {
                logoutRedirect();
            }, 7000);
        }
    }, [registerBusiness.remainingAttempts]);

    useEffect(() => {
        if (GST_VALIDATION_CODE.includes(registerBusiness.error) && registerBusiness.error !== "EXTERNAL_SERVER_ERROR") {
            setFieldValue('fein', '')
            if (values.registrationStatus === "Registered") setFieldValue('taxProgram', '')
        }
    }, [registerBusiness.error])

    function showError(name) {
        if (errors[name] && touched[name]) {
            return 'input-error';
        }
        return '';
    }
    const renderClasses = (name) => {
        if (name === 'primary-phone') {
            name = "primaryPhone"
        }
        if (name === 'province') {
            name = 'provinceId'
        }


        return `${name}-inputs-wrapper`


    }
    const errorShow = (name) => {
        if (name === 'primary-phone') {
            name = "primaryPhone"
        }
        if (name === 'province') {
            name = 'provinceId'
        }
        return `${name}-error-form`
    }

    const handlePaste = (event) => {
        event.preventDefault();
    };

    const clearFormField = (formField) => {
        values[formField] = "";
    }

    const taxIdValid = () => {

        if (agentProfile.countryId === COUNTRY_IDS.PH) {
            toggleIsFetchingFlagForSEC(true);
            secVerify(agentProfile.agentId, values.name, values.vatidPH);
            toggleIsFetchingFlagForSEC(false);
        } else {
            toggleIsFetchingFlagForGST(true);
            if (agentProfile.countryId === COUNTRY_IDS.CA) {
                validateGstHst({
                    "agentId": agentProfile.agentId,
                    "gstNumber": values.fein,
                    "companyName": values.name,
                    //"transactionDate": moment(transactionDate).format('MM/DD/YYYY')
                });
            } else {
                springVerifyGST(agentProfile.agentId, values.name, values.vatid);
            }
            toggleIsFetchingFlagForGST(false);
        }

    };

    const businessIdValid = () => {
        toggleIsFetchingFlagForTIN(true);
        tinVerify(agentProfile.agentId, values.name, values.feinPH);
        toggleIsFetchingFlagForTIN(false);
    }

    const handleBusinessIdValidation = async (businessId, translate) => {
        if (businessId && businessId.length === companyDetails.businessId.length) {
            setBusinessIdValidationLoading(true);
            try {
                const res = await asyncValidateBusinessId(businessId, agentProfile.countryId, translate);
                setBusinessIdError(res);
            } catch (error) {
                setBusinessIdError(error);
            } finally {
                setBusinessIdValidationLoading(false);
            }
        } else setBusinessIdError('');
    }

    const checkCompanyNameRegex = (input) => {
        const lowercaseInput = input.toLowerCase();
        let error;
        // "pattern": "^.+\\s*(ltd|ltd\\.|ltd|limited|limitée|inc\\.|inc|incorporated|incorporée|corp|corp\\.|corporation|société)\\s*$"
        if (agentProfile.countryId === COUNTRY_IDS.PH) {
            if (values.typeOfIncorporation === "Company") {
                const companyNameRegex1 = new RegExp(companyDetails.companyName.validation.types.DomesticCorporation.pattern);
                error = !companyNameRegex1.test(lowercaseInput);

            } else if (values.typeOfIncorporation === "PartnerShip") {
                const companyNameRegex2 = new RegExp(companyDetails.companyName.validation.types.Partnership.pattern);
                error = !companyNameRegex2.test(lowercaseInput);
            } else if (values.typeOfIncorporation === "Individual") {
                const companyNameRegex3 = new RegExp(companyDetails.companyName.validation.types.OnePersonCompany.pattern);
                error = !companyNameRegex3.test(lowercaseInput);
            }

        } else {
            const companyNameRegex = new RegExp(companyDetails.companyName.validation.pattern);
            error = !companyNameRegex.test(lowercaseInput);
        }

        setCompanyNameError(error);
        return error;
    }

    const getRequiredValidation = (field, value) => {
        if (agentProfile.countryId === COUNTRY_IDS.CA) {
            switch (field) {
                case "businessId": return value;
                case "taxProgram": return value && values.registrationStatus === 'Registered';
                default: return value;
            }
        } return true;
    }

    //.matches(new RegExp(companyValidation.validation.pattern), <Translate id="registerYourCompany.companyDetails.invalidCompanyName" />)
    const nameFieldComponent = (<OverlaySpinner
        loading={registerBusiness.isGstHstValidating}
        spinnerStyle='field-spinner-style'
        content={<Translate>
            {({ translate }) => <>

                <div className={`${styles[renderClasses('name')]} ${(registerBusiness.gstHstValid || isSpringVerifyGSTValid && styles["disabled-input-field"])} `
                }>
                    <Field
                        error={errors['name'] && touched['name'] ? true : false}
                        fullWidth
                        id="name"
                        name='name'
                        type={companyDetails.companyName.inputType}
                        onPaste={handlePaste}
                        disabled={registerBusiness.gstHstValid || isSpringVerifyGSTValid || isSecVerifyValid || isTinVerifyValid || isFetchingGST || registerBusiness.error === "EXTERNAL_SERVER_ERROR" || registerBusiness.isSubmitting}
                        validate={(value) =>
                            touched["name"]
                                ? value !== undefined && value.length > 0 && checkCompanyNameRegex(value)
                                : null
                        }
                        autoComplete='off'
                        value={values.name}
                        onChange={(e) => {
                            clearRegisterBusinessError()
                            setRecent(e.nativeEvent.srcElement.id);
                            handleChange(e);
                            checkCompanyNameRegex(e.target.value)
                        }}
                        label={translate(`${CURRENT_SCREEN}.companyDetails.companyName`) + (companyName.required ? translate(`${CURRENT_SCREEN}.companyDetails.requiredPlaceholder`) : "")}
                        variant="outlined"
                        // helperText={errors['name'] && touched['name'] ? errors['name'] : ''}
                        classes={{ root: !(errors['name'] && touched['name']) && classes.root }}
                        component={TextField}
                        style={registerBusiness.gstHstValid || isSpringVerifyGSTValid ? { background: '#f8f9fa', width: '70%' } : { width: '70%' }}
                        size="small"
                        onBlur={(e) => { setFieldTouched(e.nativeEvent.srcElement.id, true, true); }}
                        SelectProps={{ style: SelectFieldStyle }}
                    />
                </div>
                {errors['name'] && touched['name'] && <div style={nameErrorStyle}> <ErrorMessage name="name" /></div>}
            </>}
        </Translate>} />
    );

    const renderFeinPlaceholder = () => {
        if (agentProfile.countryId === COUNTRY_IDS.CA) return "Business Number (required)"
        else if (agentProfile.countryId === COUNTRY_IDS.UK) return "Company ID (required)"
        else if (agentProfile.countryId === COUNTRY_IDS.IN) return "PAN Number (required)"
        else return "FEIN (required)"
    }

    const renderFeinConfirmPlaceholder = () => {
        if (agentProfile.countryId === COUNTRY_IDS.IN) return "PAN Number Confirm (required)"
        else return "FEIN Confirm(required)"
    }

    const handleTimeout = () => {
        setTimeout(() => {
            logoutRedirect();
        }, 4000)
    }



    const companyTypeFieldComponent = (
        <Translate>
            {({ translate }) => <>
                <div className={`${styles['company-type-inputs-wrapper']} ${styles["width-70"]}`}>
                    <div>
                        <TextField
                            id="companyType"
                            name="companyType"
                            autoComplete='off'
                            fullWidth
                            classes={{ root: !(errors['companyType'] && touched['companyType']) && classes.root }}
                            //select will be true or false based on config file value of select for yourTitle
                            select
                            label={translate(`${CURRENT_SCREEN}.companyDetails.companyType`) + (companyType.required ? translate(`${CURRENT_SCREEN}.companyDetails.requiredPlaceholder`) : "")}
                            value={values.companyType}
                            disabled={registerBusiness.businessIdValidated}
                            onChange={(e) => {
                                setRecent("companyType")
                                setFieldValue("companyType", e.target.value)
                            }}
                            onBlur={(e) => { setFieldTouched(e.nativeEvent.srcElement.id, true, true); }}
                            error={errors['companyType'] && touched['companyType'] ? true : false}
                            size="small"
                            SelectProps={{
                                native: true,
                                classes: { root: !(errors['companyType'] && touched['companyType']) && classes.root }
                            }}
                            variant="outlined"
                        >
                            {<option value="" />}
                            {registerBusinessScreenConfig.companyDetails.companyType.option.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </TextField>
                    </div>
                    <div className={`${styles['info-icon-containter']} `}>
                        <OverlayTrigger
                            placement={'right'}
                            overlay={
                                <Tooltip className={`${styles['tool-tip']}`}>
                                    <div className={`${styles['tool-tip-content']}`}>
                                        {translate(`${CURRENT_SCREEN}.companyDetails.smallBusinessTooltip`)}
                                        <br /><br />
                                        {translate(`${CURRENT_SCREEN}.companyDetails.largeBusinessTooltip`)}
                                    </div>
                                </Tooltip>
                            }>
                            <img src={infoIcon} alt='' className={`${styles['info-icon']}`} />
                        </OverlayTrigger>
                    </div>
                </div>
                {errors['companyType'] && touched['companyType'] && <div style={errorStyle}> <ErrorMessage name="companyType" /></div>}
            </>}
        </Translate >);

    const registrationStatusFieldComponent = (<Translate>
        {({ translate }) => <>
            <div className={`${styles['registration-status-inputs-wrapper']} ${styles["width-70"]} ${(registerBusiness.gstHstValid || isSpringVerifyGSTValid) && styles["disabled-input-field"]}`}>
                <div>
                    <TextField
                        id="registrationStatus"
                        name="registrationStatus"
                        autoComplete='off'
                        fullWidth
                        classes={{ root: !(errors['registrationStatus'] && touched['registrationStatus']) && classes.root }}
                        style={registerBusiness.gstHstValid || isSpringVerifyGSTValid ? { background: '#f8f9fa' } : { background: '#ffffff' }}
                        //select will be true or false based on config file value of select for yourTitle
                        select
                        label={translate(`${CURRENT_SCREEN}.companyDetails.registrationStatus`) + (registrationStatus.required ? translate(`${CURRENT_SCREEN}.companyDetails.requiredPlaceholder`) : "")}
                        value={values.registrationStatus}
                        disabled={registerBusiness.businessIdValidated || companyNameError || !values.name || registerBusiness.gstHstValid || isSpringVerifyGSTValid || (registerBusiness.error === "EXTERNAL_SERVER_ERROR") || registerBusiness.isSubmitting}
                        onChange={(e) => {
                            clearRegisterBusinessError()
                            setRecent("registrationStatus")
                            setFieldValue("registrationStatus", e.target.value)
                            setFieldValue("taxProgram", "")
                            setFieldValue("fein", "")
                            setFieldValue("exemptCheckBox", false)
                        }}
                        onBlur={(e) => { setFieldTouched(e.nativeEvent.srcElement.id, true, true); }}
                        error={errors['registrationStatus'] && touched['registrationStatus'] ? true : false}
                        size="small"
                        SelectProps={{
                            native: true,
                            classes: { root: !(errors['registrationStatus'] && touched['registrationStatus']) && classes.root }
                        }}
                        variant="outlined"
                    >
                        {<option value="" />}
                        {registerBusinessScreenConfig.companyDetails.registrationStatus.option.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>
                </div>
            </div>
            {errors['registrationStatus'] && touched['registrationStatus'] && <div style={errorStyle}> <ErrorMessage name="registrationStatus" /></div>}
        </>}
    </Translate >);



    const exemptCheckBox = (<Translate>
        {({ translate }) => <div className={`${values.registrationStatus === 'Exempt' ? styles['exemptCheckBox-inputs-container'] : styles['exemptCheckBox-inputs-container-hidden']} ${styles['width-70']}`}>
            <input
                id="exemptCheckBox"
                name='exemptCheckbox'
                type='checkbox'
                className={styles['checkbox-input']}
                checked={values.exemptCheckBox}
                onChange={() => {
                    setRecent("exemptCheckBox")
                    setFieldValue("exemptCheckBox", !values.exemptCheckBox)
                    setFieldValue("taxProgram", values.exemptCheckBox ? "" : "NA")
                }}
                error={errors["exemptCheckbox"] && touched["exemptCheckbox"] ? true : false}
            />
            <span className={`${commonStyle['lightFont']} ${commonStyle['blackColor']} ${styles["justified-text"]}`}>
                {translate(`${CURRENT_SCREEN}.companyDetails.exemptCheckbox`)}
            </span>
        </div>}
    </Translate >);

    const gstComponent = (<Translate>
        {({ translate }) => <div>
            {gastHstTitleComponent}
            <div className={`${styles['businessId-inputs-wrapper']} ${styles['width-80']} ${(registerBusiness.gstHstValid || isSpringVerifyGSTValid) && styles["disabled-input-field"]}`}>
                <div className={`${styles['businessId-inputs-container']}`}>
                    <div className={`${styles['businessId-input']}`}>{businessId.display && businessIdComponent}</div>
                    <div className={`${styles['taxProgram-input']}`}> {taxProgram.display && taxProgramFieldComponent}</div>
                </div>
                {values.registrationStatus === 'Registered' && (registerBusiness.gstHstValid || isSpringVerifyGSTValid ?
                    (<div className={`${styles['verified-containter']} `}>
                        <img src={verified} className={styles["verified-icon"]} alt='' />
                        {/* <span>{translate(`${CURRENT_SCREEN}.companyDetails.verified`)}</span> */}
                    </div>
                    ) : agentProfile.countryId === COUNTRY_IDS.CA && values.taxProgram && registerBusiness.error !== "EXTERNAL_SERVER_ERROR" ? (<div className={`${styles['validate-button-containter']}`}>
                        <spotifyButton
                            color="primary"
                            size="medium-2"
                            onClick={taxIdValid}
                            disabled={!values.taxProgram || errors['fein'] || companyNameError || registerBusiness.error === "EXTERNAL_SERVER_ERROR" || registerBusiness.isSubmitting}
                            style={{ padding: "0px" }}
                        >
                            {translate(`${CURRENT_SCREEN}.companyDetails.validate`)}
                        </spotifyButton>
                    </div>) : "")}
            </div>
        </div>}
    </Translate>);

const businessIdComponent = (<OverlayTextLoader
        loading={false}
        spinnerStyle='field-spinner-style'
        loadingText="Verifying TAN..."
        content={<Translate>
            {({ translate }) => <>
                <div className={`${styles[renderClasses('fein')]} ${agentProfile.countryId === COUNTRY_IDS.CA ? styles['width-100'] : styles['width-70']} `}>
                    {/* <div className={`${styles[renderClasses('fein')]} ${styles['width-70']} `}> */}
                    <Field
                        id="fein"
                        name='fein'
                        type={companyDetails.businessId.inputType}
                        onPaste={handlePaste}
                        autoComplete='off'
                        disabled={registerBusiness.businessIdValidated || registerBusiness.gstHstValid || (agentProfile.countryId === COUNTRY_IDS.CA && (!values.registrationStatus || (values.registrationStatus === 'Exempt' && !values.exemptCheckBox))) || registerBusiness.error === "EXTERNAL_SERVER_ERROR" || registerBusiness.isSubmitting}
                        // readOnly={true}
                        value={values.fein}
                        // onChange={(e) => {
                        //     setRecent(e.nativeEvent.srcElement.id);
                        //     //formHelpers.isValueNumber(e.target.value) && (e.target.value.length <= 9) && handleChange(e);
                        //     formHelpers.isBusinessIdValid(e.target.value, companyDetails.businessId.validation.patternType, companyDetails.businessId.length) && handleChange(e);
                        // }}
                        onChange={(e) => {
                            setRecent(e.nativeEvent.srcElement.id);
                            setBusinessIdActive(true)
                            setFieldTouched(
                                e.nativeEvent.srcElement.id,
                                true,
                                true
                            );
                            handleBusinessIdValidation(e.target.value, translate);
                            // eslint-disable-next-line no-unused-expressions
                            e.target.value.length > 0 && businessIdError
                            if (
                                formHelpers.isBusinessIdValid(e.target.value, companyDetails.businessId.validation.patternType, companyDetails.businessId.length) && handleChange(e)
                            ) {
                                setRecent(e.nativeEvent.srcElement.id);
                                handleChange(e);
                                if (!touched["fein"]) {
                                    setFieldTouched(
                                        e.nativeEvent.srcElement.id,
                                        true,
                                        true
                                    );
                                } else {
                                    setRecent("");
                                }
                            }
                        }}
                        validate={(value) =>
                            touched['fein']
                                ? value !== undefined && value.length > 0 && asyncValidateBusinessId(value, agentProfile.countryId, translate)
                                : persistError(errors['fein'])
                        }
                        onBlur={(e) => {
                            setRecent(e.nativeEvent.srcElementid);
                            setBusinessIdActive(false)
                            if (!touched['fein']) {
                                setFieldTouched(e.nativeEvent.srcElement.id, true, true);
                            } else {
                                setRecent('');
                            }
                            if (e.target.value.length === 0) {
                                if (values.registrationStatus !== "Exempt") setFieldValue('taxProgram', '');
                                setFieldValue('transactionDate', '');
                            }
                        }}
                        label={translate(`${CURRENT_SCREEN}.companyDetails.businessId`) + (getRequiredValidation("businessId", businessId.required) ? translate(`${CURRENT_SCREEN}.companyDetails.requiredPlaceholder`) : "")}
                        variant="outlined"
                        fullWidth
                        error={((errors['fein'] && touched['fein']) || businessIdError) ? true : false}
                        size="small"
                        classes={{ root: !((errors['fein'] && touched['fein']) || businessIdError) && classes.root }}
                        style={(registerBusiness.gstHstValid || isSpringVerifyGSTValid) ? { background: '#f8f9fa' } : { background: '#ffffff' }}
                        component={TextField}
                    //label={translate(`${CURRENT_SCREEN}.companyDetails.businessId`) + (businessId.required ? translate(`${CURRENT_SCREEN}.companyDetails.requiredPlaceholder`) : "")}
                    // variant="outlined"
                    // fullWidth
                    // error={errors['fein'] && touched['fein'] ? true : false}
                    // size="small"
                    // classes={{ root: !(errors['fein'] && touched['fein']) && classes.root }}
                    // component={TextField}
                    />
                </div>
                {/* errors['fein'] && touched['fein'] && <div style={errorStyle}> <ErrorMessage name="fein" /></div> */}
                {errors['fein'] && touched['fein'] && !businessIdError && <div style={errorStyle}> <ErrorMessage name="fein" /></div>}
                {businessIdError && <div style={errorStyle}>{businessIdError}</div>}
            </>}
        </Translate >} />);

    const taxProgramFieldComponent = (<Translate>
        {({ translate }) => <>
            <div className={`${styles['title-inputs-wrapper']} ${styles['width-100']}`}>
                <TextField
                    id="taxProgram"
                    name="taxProgram"
                    autoComplete='off'
                    disabled={registerBusiness.businessIdValidated || registerBusiness.gstHstValid || isSpringVerifyGSTValid || !values.fein || errors['fein'] || values.registrationStatus === 'Exempt' || registerBusiness.error === "EXTERNAL_SERVER_ERROR" || registerBusiness.isSubmitting}
                    classes={{ root: !(errors['taxProgram'] && touched['taxProgram']) && classes.root }}
                    style={((registerBusiness.gstHstValid || isSpringVerifyGSTValid) || values.exemptCheckBox) ? { background: '#f8f9fa' } : { background: '#ffffff' }}
                    select
                    label={translate(`${CURRENT_SCREEN}.companyDetails.taxProgram`) + (getRequiredValidation("taxProgram", taxProgram.required) ? translate(`${CURRENT_SCREEN}.companyDetails.requiredPlaceholder`) : "")}
                    value={values.taxProgram}
                    onChange={(e) => {
                        setRecent("taxProgram")
                        setFieldValue("taxProgram", e.target.value)
                    }}
                    onBlur={(e) => { setFieldTouched(e.nativeEvent.srcElement.id, true, true); }}
                    fullWidth
                    error={errors['taxProgram'] && touched['taxProgram'] ? true : false}
                    size="small"
                    InputLabelProps={{
                        shrink: true
                    }}
                    SelectProps={{
                        native: true,
                        classes: { root: !(errors['taxProgram'] && touched['taxProgram']) && classes.root }
                    }}
                    variant="outlined"
                >
                    {<option value="" />}
                    {registerBusinessScreenConfig.companyDetails.taxProgram.programId.map((option) => (
                        <option key={option} value={option} style={{ display: option === "NA" ? "none" : "block", padding: "5px" }}>
                            {option}
                        </option>
                    ))}
                </TextField>
            </div>
            {errors['taxProgram'] && touched['taxProgram'] && <div style={errorStyle}> <ErrorMessage name="taxProgram" /></div>}
        </>}
    </Translate >);

    // const transactionDateFieldComponent = (<Translate>
    //     {({ translate }) => <>
    //         <div className={`${styles['tDate-inputs-wrapper']} ${styles["width-70"]}`}>
    //             <OverlayTrigger
    //                 placement={'right'}
    //                 overlay={
    //                     showTransactionDateTooltip ? <Tooltip id="tooltip-right" >
    //                         <div style={{ textAlign: 'left' }}>
    //                             {translate(`${CURRENT_SCREEN}.companyDetails.transactionDateTooltip`)}
    //                         </div>
    //                     </Tooltip> : <span />
    //                 }
    //             >
    //                 <DatePicker
    //                     name="transactionDate"
    //                     id="transactionDate"
    //                     dateFormat="MM/dd/yyyy"
    //                     peekNextMonth
    //                     showMonthDropdown
    //                     showYearDropdown
    //                     dropdownMode="select"
    //                     maxDate={new Date()}
    //                     wrapperClassName={`${styles['transaction-date-container']}`}
    //                     onChange={(d, e) => {
    //                         setRecent(e.nativeEvent.srcElement.id);
    //                         setFieldValue("transactionDate", moment(d).format('MM/DD/YYYY'));
    //                         setShowTransactionDateTooltip(false);
    //                     }}
    //                     disabled={registerBusiness.businessIdValidated || !values.fein}
    //                     value={values.transactionDate}
    //                     onFocus={() => setShowTransactionDateTooltip(true)}
    //                     onBlur={(e) => { setShowTransactionDateTooltip(false); setFieldTouched(e.nativeEvent.srcElement.id, true, true) }}
    //                     customInput={
    //                         <Field
    //                             fullWidth
    //                             label={translate(`${CURRENT_SCREEN}.companyDetails.transactionDate`) + (getRequiredValidation("transactionDate", transactionDate.required) ? translate(`${CURRENT_SCREEN}.companyDetails.requiredPlaceholder`) : "")}
    //                             variant="outlined"
    //                             error={errors['transactionDate'] && touched['transactionDate'] ? true : false}
    //                             size="small"
    //                             classes={{ root: !(errors['transactionDate'] && touched['transactionDate']) && classes.root }}
    //                             component={TextField}
    //                         />
    //                     }
    //                 />
    //             </OverlayTrigger>
    //         </div>
    //         {errors['transactionDate'] && touched['transactionDate'] && <div style={errorStyle}> <ErrorMessage name="transactionDate" /></div>}
    //     </>}
    // </Translate >);



    const taxIdComponent = (<OverlayTextLoader
        loading={isFetchingGST}
        spinnerStyle='field-spinner-style'
        loadingText="Verifying GST Number..."
        content={<Translate>
            {({ translate }) => <>
                <div className={`${styles[renderClasses('fein')]}  ${styles['verified-status']} ${(registerBusiness.gstHstValid || isSpringVerifyGSTValid) && styles["disabled-input-field"]} `
                }>
                    <Field
                        id="vatid"
                        name="vatid"
                        type={companyDetails.taxId.inputType}
                        onPaste={handlePaste}
                        disabled={registerBusiness.gstHstValid || isSpringVerifyGSTValid}
                        autoComplete='off'
                        //readOnly={true}
                        value={values.vatid}
                        validate={(value) =>
                            touched["vatid"] !== undefined
                                ? value !== undefined && value.length > 0 && asyncValidateTaxId(value, agentProfile.countryId, translate)
                                : persistError(errors["vatid"])
                        }
                        onChange={(e) => {
                            clearRegisterBusinessError()
                            setRecent(e.nativeEvent.srcElement.id);
                            setFieldTouched(
                                e.nativeEvent.srcElement.id,
                                true,
                                true
                            );
                            if (
                                formHelpers.isBusinessIdValid(e.target.value, companyDetails.taxId.validation.patternType, companyDetails.taxId.length) && handleChange(e)
                            ) {
                                setRecent(e.nativeEvent.srcElement.id);
                                handleChange(e);
                                if (!touched["vatid"]) {
                                    setFieldTouched(
                                        e.nativeEvent.srcElement.id,
                                        true,
                                        true
                                    );
                                } else {
                                    setRecent("");
                                }
                            }

                        }}

                        onBlur={(e) => {
                            setRecent(e.nativeEvent.srcElement.id);
                            if (!touched["vatid"]) {
                                setFieldTouched(e.nativeEvent.srcElement.id, true, true);
                            } else {
                                setRecent('');
                            }
                        }}
                        label={translate(`${CURRENT_SCREEN}.companyDetails.taxId`) + (taxId.required ? translate(`${CURRENT_SCREEN}.companyDetails.requiredPlaceholder`) : "")}
                        variant="outlined"
                        fullWidth
                        error={errors["vatid"] && touched["vatid"] ? true : false}
                        style={registerBusiness.gstHstValid || isSpringVerifyGSTValid ? { background: '#f8f9fa', width: '70%' } : { width: '70%' }}
                        size="small"
                        classes={{ root: !(errors["vatid"] && touched["vatid"]) && classes.root }}
                        component={TextField}

                    />
                    {companyDetails.taxId.taxIdVerification === "SpringVerify" &&
                        !(registerBusiness.gstHstValid || isSpringVerifyGSTValid) &&
                        spverifyGST &&
                        !errors.vatid &&
                        !registerBusiness.error &&
                        !companyNameError &&
                        !businessIdActive &&
                        values.vatid.length === companyDetails.taxId.length && (
                            <div className="vertical-spacing-1 left-spacing">
                                <spotifyButton
                                    color="primary"
                                    size="medium-2"
                                    onClick={taxIdValid}
                                    disabled={!values.vatid || errors.vatid}
                                >
                                    {translate(`${CURRENT_SCREEN}.companyDetails.verify`)}
                                </spotifyButton>
                            </div>
                        )}
                    <div>
                        {registerBusiness.gstHstValid || isSpringVerifyGSTValid && (
                            <div className={`left-spacing ${styles["verified-style"]}`}>
                                <img src={verified} className={styles["verified-icon"]} alt="" />
                                <span>{translate(`${CURRENT_SCREEN}.companyDetails.verified`)}</span>
                            </div>

                        )}
                    </div>
                </div>
                {errors["vatid"] && touched["vatid"] && <div style={errorStyle}> <ErrorMessage name="vatid" /></div>}
            </>}
        </Translate >} />);

    const taxIdComponentPH = (<OverlayTextLoader
        loading={isFetchingSEC}
        spinnerStyle='field-spinner-style'
        loadingText="Verifying SEC Number..."
        content={<Translate>
            {({ translate }) => <>
                <div className={`${styles[renderClasses('fein')]}  ${styles['verified-status']} ${(isSecVerifyValid) && styles["disabled-input-field"]} `
                }>
                    <Field
                        id="vatidPH"
                        name="vatidPH"
                        type={companyDetails.taxId.inputType}
                        onPaste={handlePaste}
                        disabled={isSecVerifyValid || !nameVerified}
                        autoComplete='off'
                        //readOnly={true}
                        value={values.vatidPH}
                        validate={(value) =>
                            touched["vatidPH"] !== undefined
                                ? value !== undefined && value.length > 0 && asyncValidateTaxId(value, agentProfile.countryId, translate)
                                : persistError(errors["vatidPH"])
                        }
                        onChange={(e) => {
                            clearRegisterBusinessError()
                            setRecent(e.nativeEvent.srcElement.id);
                            setFieldTouched(
                                e.nativeEvent.srcElement.id,
                                true,
                                true
                            );
                            if (
                                formHelpers.isTaxIdValid(e.target.value, companyDetails.taxId.validation.patternType, companyDetails.taxId.length) && handleChange(e)
                            ) {
                                setRecent(e.nativeEvent.srcElement.id);
                                handleChange(e);
                                if (!touched["vatidPH"]) {
                                    setFieldTouched(
                                        e.nativeEvent.srcElement.id,
                                        true,
                                        true
                                    );
                                } else {
                                    setRecent("");
                                }
                            }

                        }}

                        onBlur={(e) => {
                            setRecent(e.nativeEvent.srcElement.id);
                            if (!touched["vatidPH"]) {
                                setFieldTouched(e.nativeEvent.srcElement.id, true, true);
                            } else {
                                setRecent('');
                            }
                        }}

                        label={translate(`${CURRENT_SCREEN}.companyDetails.taxId`) + (taxId.required ? translate(`${CURRENT_SCREEN}.companyDetails.requiredPlaceholder`) : "")}
                        variant="outlined"
                        fullWidth
                        error={errors["vatidPH"] && touched["vatidPH"] ? true : false}
                        style={isSecVerifyValid ? { background: '#f8f9fa', width: '70%' } : { width: '70%' }}
                        size="small"
                        classes={{ root: !(errors["vatidPH"] && touched["vatidPH"]) && classes.root }}
                        component={TextField}


                    />
                    {
                        (companyDetails.taxId.taxIdVerification === "SEC") &&
                        !(isSecVerifyValid) &&
                        verifySEC &&
                        !errors.vatidPH &&
                        !registerBusiness.error &&
                        !companyNameError &&
                        nameVerified &&
                        (
                            <div className="vertical-spacing-1 left-spacing">
                                <spotifyButton
                                    color="primary"
                                    size="medium-2"
                                    onClick={taxIdValid}
                                    disabled={!values.vatidPH || errors.vatidPH}
                                >
                                    {translate(`${CURRENT_SCREEN}.companyDetails.verify`)}
                                </spotifyButton>
                            </div>
                        )
                    }
                    <div>
                        {isSecVerifyValid && (
                            <div className={`left-spacing ${styles["verified-style"]}`}>
                                <img src={verified} className={styles["verified-icon"]} alt="" style={{ marginRight: "8px" }} />
                                <span>{translate(`${CURRENT_SCREEN}.companyDetails.verified`)}</span>
                            </div>

                        )}
                    </div>
                </div>
                {errors["vatidPH"] && touched["vatidPH"] && <div style={errorStyle}> <ErrorMessage name="vatidPH" /></div>}
            </>}
        </Translate >} />);

    const businessIdComponentPH = (<OverlayTextLoader
        loading={isFetchingTIN}
        spinnerStyle='field-spinner-style'
        loadingText="Verifying TIN Number..."
        content={<Translate>
            {({ translate }) => <>
                <div className={`${styles[renderClasses('fein')]}  ${styles['verified-status']} ${(isTinVerifyValid) && styles["disabled-input-field"]}`}>
                    <Field
                        id="feinPH"
                        name="feinPH"
                        type={companyDetails.businessId.inputType}
                        onPaste={handlePaste}
                        disabled={isTinVerifyValid || !isSecVerifyValid}
                        autoComplete='off'
                        //readOnly={true}
                        value={values.feinPH}
                        validate={(value) =>
                            touched['feinPH'] !== undefined
                                ? value !== undefined && value.length > 0 && asyncValidateBusinessId(value, agentProfile.countryId, translate)
                                : persistError(errors['feinPH'])
                        }

                        onChange={(e) => {
                            clearRegisterBusinessError()
                            setRecent(e.nativeEvent.srcElement.id);
                            setFieldTouched(e.nativeEvent.srcElement.id, true, true);  // Always mark field as touched immediately
                            handleChange(e);  // Always let Formik update the value

                            if (
                                formHelpers.isBusinessIdValidPH(e.target.value, companyDetails.businessId.validation.patternType, companyDetails.businessId.length, companyDetails.businessId.minlength) && handleChange(e)
                            ) {
                                setRecent(e.nativeEvent.srcElement.id);
                                handleChange(e);
                                if (!touched["feinPH"]) {
                                    setFieldTouched(
                                        e.nativeEvent.srcElement.id,
                                        true,
                                        true
                                    );
                                } else {
                                    setRecent("");
                                }
                            }
                        }}

                        onBlur={(e) => {
                            setRecent(e.nativeEvent.srcElementid);
                            if (!touched['feinPH']) {
                                setFieldTouched(e.nativeEvent.srcElement.id, true, true);
                            } else {
                                setRecent('');
                            }
                        }}

                        label={translate(`${CURRENT_SCREEN}.companyDetails.businessId`) + (businessId.required ? translate(`${CURRENT_SCREEN}.companyDetails.requiredPlaceholder`) : "")}
                        variant="outlined"
                        fullWidth
                        error={errors["feinPH"] && touched["feinPH"] ? true : false}
                        style={isTinVerifyValid ? { background: '#f8f9fa', width: '70%' } : { width: '70%' }}
                        size="small"
                        classes={{ root: !(errors["feinPH"] && touched["feinPH"]) && classes.root }}
                        component={TextField}

                    />
                    {
                        !(isTinVerifyValid) &&
                        verifyTIN &&
                        !errors.feinPH &&
                        !registerBusiness.error &&
                        !companyNameError &&
                        nameVerified &&
                        (
                            <div className="vertical-spacing-1 left-spacing">
                                <spotifyButton
                                    color="primary"
                                    size="medium-2"
                                    onClick={businessIdValid}
                                    disabled={!values.feinPH || errors.feinPH}
                                // disabled={false}
                                >
                                    {translate(`${CURRENT_SCREEN}.companyDetails.verify`)}
                                </spotifyButton>
                            </div>
                        )
                    }
                    <div>
                        {isTinVerifyValid && (
                            <div className={`left-spacing ${styles["verified-style"]}`}>
                                <img src={verified} className={styles["verified-icon"]} alt="" style={{ marginRight: "8px" }} />
                                <span>{translate(`${CURRENT_SCREEN}.companyDetails.verified`)}</span>
                            </div>

                        )}
                    </div>
                </div>
                {errors["feinPH"] && touched["feinPH"] && <div style={errorStyle}> <ErrorMessage name="feinPH" /></div>}
            </>}
        </Translate >} />);

    const typeOfIncorporationComponent = (<Translate>
        {({ translate }) => <>
            <div className={`${styles['registration-status-inputs-wrapper']} ${styles["width-70"]} ${(registerBusiness.gstHstValid || isSpringVerifyGSTValid) && styles["disabled-input-field"]}`}>
                <div>
                    <TextField
                        id="typeOfIncorporation"
                        name="typeOfIncorporation"
                        autoComplete='off'
                        fullWidth
                        classes={{ root: !(errors['typeOfIncorporation'] && touched['typeOfIncorporation']) && classes.root }}
                        style={registerBusiness.gstHstValid || isSpringVerifyGSTValid ? { background: '#f8f9fa' } : { background: '#ffffff' }}
                        //select will be true or false based on config file value of select for yourTitle
                        select
                        label={translate(`${CURRENT_SCREEN}.companyDetails.typeOfIncorporation`) + (typeOfIncorporation.required ? translate(`${CURRENT_SCREEN}.companyDetails.requiredPlaceholder`) : "")}
                        value={values.typeOfIncorporation}
                        disabled={(isSecVerifyValid || isTinVerifyValid)}
                        onChange={(e) => {
                            clearRegisterBusinessError()
                            setRecent("typeOfIncorporation")
                            setFieldValue("typeOfIncorporation", e.target.value)
                        }}
                        onBlur={(e) => { setFieldTouched(e.nativeEvent.srcElement.id, true, true); }}
                        error={errors['typeOfIncorporation'] && touched['typeOfIncorporation'] ? true : false}
                        size="small"
                        SelectProps={{
                            native: true,
                            classes: { root: !(errors['typeOfIncorporation'] && touched['typeOfIncorporation']) && classes.root }
                        }}
                        variant="outlined"
                    >
                        {<option value="" />}
                        {registerBusiness.PH.formOptions.typeOfIncorporation.map((option) => (
                            <option key={option.id} value={option.name}>
                                {registerBusinessScreenConfig.companyDetails.typeOfIncorporation.label[option.name]}
                            </option>
                        ))}
                    </TextField>

                </div>
            </div>
            {errors['typeOfIncorporation'] && touched['typeOfIncorporation'] && <div style={errorStyle}> <ErrorMessage name="typeOfIncorporation" /></div>}
        </>}
    </Translate >);

    const panFeildComponent = (<Translate>
        {({ translate }) => <>
            <div className={`${styles[renderClasses('fein')]} ${styles["width-70"]}`
            }>
                <Field
                    id="fein"
                    name='fein2'
                    type='password'
                    autoComplete='off'
                    readOnly={true}
                    value={values.fein}
                    onChange={(e) => {
                        setRecent(e.nativeEvent.srcElement.id);
                        handleChange(e);
                    }}
                    validate={
                        recent === 'fein' && touched['fein']
                            ? asyncValidatePAN
                            : () => persistError(errors['fein'])
                    }
                    onBlur={(e) => {
                        setRecent(e.nativeEvent.srcElement.id);
                        if (!touched['fein']) {
                            setFieldTouched(e.nativeEvent.srcElement.id, true, true);
                        } else {
                            setRecent('');
                        }
                    }}
                    label={renderFeinPlaceholder()}
                    variant="outlined"
                    fullWidth
                    error={errors['fein'] && touched['fein'] ? true : false}
                    size="small"
                    classes={{ root: !(errors['fein'] && touched['fein']) && classes.root }}
                    component={TextField}
                />
            </div>
            {errors['fein'] && touched['fein'] && <div style={errorStyle}> <ErrorMessage name="fein" /></div>}
        </>}
    </Translate >);

    const panConfirmFeildComponent = (<Translate>
        {({ translate }) => <>
            <div className={`${styles[renderClasses('fein')]} ${styles["width-70"]}`
            }>
                <Field
                    id="feinConfirm"
                    name='feinConfirm'
                    type='password'
                    autoComplete='off'
                    readOnly={true}
                    value={values.feinConfirm}
                    onChange={(e) => {
                        setRecent(e.nativeEvent.srcElement.id);
                        handleChange(e);
                    }}
                    validate={(value) =>
                        validateConfirmPAN(value, values.fein)
                    }
                    label={renderFeinConfirmPlaceholder()}
                    variant="outlined"
                    fullWidth
                    error={errors['feinConfirm'] && touched['feinConfirm'] ? true : false}
                    size="small"
                    classes={{ root: !(errors['feinConfirm'] && touched['feinConfirm']) && classes.root }}
                    component={TextField}
                />
            </div>
            {errors['feinConfirm'] && touched['feinConfirm'] && <div style={errorStyle}> <ErrorMessage name="feinConfirm" /></div>}
        </>}
    </Translate >);

    const stateFieldComponent = (<Translate>
        {({ translate }) => <>
            <div className={`${styles[renderClasses('stateId')]} ${styles["width-70"]} ${addressLine1.smartyAddressVerification && errors.stateId && touched['stateId'] && styles["error-input-field"]}`
            }>
                <Field
                    id="stateId"
                    name="stateId"
                    autoComplete='off'
                    component={TextField}
                    classes={{ root: !(errors['stateId'] && touched['stateId']) && classes.root }}
                    select
                    label={translate(`${CURRENT_SCREEN}.companyDetails.state`) + (state.required ? translate(`${CURRENT_SCREEN}.companyDetails.requiredPlaceholder`) : "")}

                    value={values.stateId}
                    onChange={(e) => {
                        setRecent("stateId")
                        setFieldValue("stateId", e.target.value)
                    }}
                    onBlur={(e) => { setFieldTouched(e.nativeEvent.srcElement.id, true, true); }}
                    fullWidth
                    // helperText={errors['stateId'] && touched['stateId'] ? errors['stateId'] : ''}
                    error={errors['stateId'] && touched['stateId'] ? true : false}
                    size="small"
                    SelectProps={{
                        native: true,
                        classes: { root: !(errors['stateId'] && touched['stateId']) && classes.root }
                    }}
                    variant="outlined"
                    disabled={addressLine1.smartyAddressVerification}
                >
                    {<option value="" />}
                    {addressLine1.smartyAddressVerification ? profile.formOptions.states.map((option) => (
                        <option key={option.id} value={option.id} data-state-code={option.code}>
                            {option.name}
                        </option>
                    )) : profile.formOptions.states.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.name}
                        </option>
                    ))}
                </Field>
            </div>
            {errors['stateId'] && touched['stateId'] && <div style={errorStyle}> <ErrorMessage name="stateId" /></div>}
        </>}
    </Translate >);

    const titleFieldComponent = (<Translate>
        {({ translate }) => <>
            <div className={`${styles['title-inputs-wrapper']} ${styles["width-70"]}`
            }>
                <TextField
                    id="title"
                    name="title"
                    autoComplete='off'
                    classes={{ root: !(errors['title'] && touched['title']) && classes.root }}
                    //select will be true or false based on config file value of select for yourTitle
                    select
                    label={translate(`${CURRENT_SCREEN}.companyDetails.yourTitle`) + (yourTitle.required ? translate(`${CURRENT_SCREEN}.companyDetails.requiredPlaceholder`) : "")}

                    value={values.title}
                    onChange={(e) => {
                        setRecent("title")
                        setFieldValue("title", e.target.value)
                    }}
                    onBlur={(e) => { setFieldTouched(e.nativeEvent.srcElement.id, true, true); }}
                    fullWidth
                    // helperText={errors['title'] && touched['title'] ? errors['title'] : ''}
                    error={errors['title'] && touched['title'] ? true : false}
                    size="small"
                    SelectProps={{
                        native: true,
                        classes: { root: !(errors['title'] && touched['title']) && classes.root }
                    }}
                    variant="outlined"
                >
                    {<option value="" />}
                    {registerBusinessScreenConfig.companyDetails.yourTitle.titleAtTheCompany.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </TextField>
            </div>
            {errors['title'] && touched['title'] && <div className={`${styles['title']}`}> <ErrorMessage name="title" /></div>}
        </>}
    </Translate >);

    const primaryPurposeFieldComponent = (<Translate>
        {({ translate }) => <>
            <div className={`${styles[renderClasses('primary-phone')]} ${styles["width-70"]}`
            }>

                <Field
                    required
                    values={values}
                    setFieldValue={setFieldValue}
                    name={"primaryPurpose"}
                    label={<p className={`${styles['form-container__copy']} ${commonStyle['lightFont']} ${commonStyle['blackColor']} ${styles["justified-text"]}`}>
                        {translate(`${CURRENT_SCREEN}.companyDetails.primaryPurpose`)}
                    </p>}
                    options={[
                        { value: true, label: "Yes" },   // will set boolean true
                        { value: false, label: "No" }    // will set boolean false
                    ]}
                    id={"primaryPurpose"}
                    component={RadioButtonHorizontally}
                />

            </div>
            {errors['primaryPurpose'] && touched['primaryPurpose'] && <div className={`${styles["primaryPurpose"]}`}> <ErrorMessage name="primaryPurpose" /></div>}
        </>}
    </Translate>);


    // const checkBoxFieldComponent = (<Translate>
    //     {({ translate }) => <>
    //         <div className={`${styles[renderClasses('primary-phone')]} ${styles["width-70"]}`
    //         }>

    //             {/* <Field
    //                 required
    //                 values={values}
    //                 setFieldValue={setFieldValue}
    //                 name={"primaryPurpose"}
    //                 label={<p className={`${styles['form-container__copy']} ${commonStyle['lightFont']} ${commonStyle['blackColor']} ${styles["justified-text"]}`}>
    //                     {translate(`${CURRENT_SCREEN}.companyDetails.primaryPurpose`)}
    //                 </p>}
    //                 id={"primaryPurpose"}
    //                 component={Checkbox}
    //             /> */}

    //             <Field
    //                 onChange={handleChange}
    //                 name={"CheckBox"}
    //                 checked={values.CheckBox}
    //                 label={<p className={`${styles['form-container__copy']} ${commonStyle['lightFont']} ${commonStyle['blackColor']} ${styles["justified-text"]}`}>
    //                     {translate(`${CURRENT_SCREEN}.companyDetails.checkBoxText`)}
    //                 </p>}
    //                 id={"CheckBox"}
    //                 component={Checkbox}
    //             />


    //         </div>

    //     </>}
    // </Translate>);

    const phoneFieldComponent = (<Translate>
        {({ translate }) => <>
            <div className={`${styles[renderClasses('primary-phone')]} ${styles["width-70"]}`
            }>
                <PhoneField
                    name='primaryPhone'
                    value={values.primaryPhone}
                    placeholder={translate(`${CURRENT_SCREEN}.companyDetails.primaryPhone`) + (primaryPhone.required ? translate(`${CURRENT_SCREEN}.companyDetails.requiredPlaceholder`) : "")}

                    autoComplete='off'
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    error={errors.primaryPhone}
                    phoneValidations={phoneValidations}
                    // errorClassName={styles['message-error']}
                    touched={touched.primaryPhone}
                    setRecent={setRecent}
                    className={`${styles['form-input']} ${styles[showError('primaryPhone')]
                        } `}
                />
            </div>
            {errors['primaryPhone'] && touched['primaryPhone'] && <div className={`${styles["title"]}`}> <ErrorMessage name="primaryPhone" /></div>}
        </>}
    </Translate>);

    const phoneUKFieldComponent = (<Translate>
        {({ translate }) => <>
            <div className={`${styles[renderClasses('primary-phone')]} ${styles["width-70"]}`
            }>
                <PhoneFieldUK
                    name='primaryPhone'
                    id='primaryPhoneUK'
                    value={values.primaryPhone}
                    placeholder={translate(`${CURRENT_SCREEN}.companyDetails.primaryPhone`)}
                    autoComplete='off'
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    phoneValidations={phoneValidations}
                    // error={errors.primaryPhone}
                    // errorClassName={styles['message-error']}
                    touched={touched.primaryPhone}
                    setRecent={setRecent}
                    className={`${styles['form-input']} ${styles[showError('primaryPhone')]}
                         `}
                />
            </div>
            {errors['primaryPhone'] && touched['primaryPhone'] && <div className={`${styles["phone"]}`}> <ErrorMessage name="primaryPhone" /></div>}
        </>}
    </Translate>)

    const emailFieldComponent = (<Translate>
        {({ translate }) => <>
            <div className={`${styles[renderClasses('email')]} ${styles["width-70"]}`
            }>
                <Field
                    name='email'
                    readOnly={true}
                    onChange={(e) => {
                        setRecent(e.nativeEvent.srcElement.id);
                        handleChange(e);
                    }}
                    onBlur={(e) => { setFieldTouched(e.nativeEvent.srcElement.id, true, true); }}
                    id="email"
                    autoComplete="off"
                    fullWidth
                    type={companyDetails.companyContactInformation.companyEmail.inputType}

                    value={values.email}
                    label={translate(`${CURRENT_SCREEN}.companyDetails.email`) + (companyEmail.required ? translate(`${CURRENT_SCREEN}.companyDetails.requiredPlaceholder`) : "")}
                    variant="outlined"
                    error={errors['email'] && touched['email'] ? true : false}
                    // helperText={errors['email'] && touched['email'] ? errors['email'] : ''}
                    size="small"
                    classes={{ root: !(errors['email'] && touched['email']) && classes.root }}
                    component={TextField}
                />
            </div>
            {errors['email'] && touched['email'] && <div style={errorStyle}> <ErrorMessage name="email" /></div>}
        </>}
    </Translate >);

    const addressFieldComponent = (<Translate>
        {({ translate }) => <>
            <div className={`${styles[renderClasses('address')]} ${styles["width-70"]} ${addressLine1.smartyAddressVerification && errors.address && touched['address'] && styles["error-input-field"]}`
            }>
                <Field
                    id="address"
                    name='address'
                    autoComplete={addressLine1.smartyAddressVerification ? 'on' : 'off'}
                    onChange={(e) => {
                        setRecent(e.nativeEvent.srcElement.id);
                        handleChange(e);
                    }}
                    onBlur={(e) => { setFieldTouched(e.nativeEvent.srcElement.id, true, true); }}
                    fullWidth
                    type={companyDetails.companyContactInformation.addressLine1.inputType}

                    value={values.address}
                    label={translate(`${CURRENT_SCREEN}.companyDetails.address`) + (addressLine1.required ? translate(`${CURRENT_SCREEN}.companyDetails.requiredPlaceholder`) : "")}
                    variant="outlined"
                    error={errors['address'] && touched['address'] ? true : false}
                    // helperText={errors['address'] && touched['address'] ? errors['address'] : ''}
                    size="small"
                    classes={{ root: !(errors['address'] && touched['address']) && classes.root }}
                    component={TextField}
                />
            </div>
            {errors['address'] && touched['address'] && <div style={errorStyle}> <ErrorMessage name="address" /></div>}

        </>}
    </Translate >);

    //New smarty Address Field Component for US
    const addressFieldComponentUS = (<Translate>
        {({ translate }) => <>
            {profile.isFetchStatesComplete &&
                <div className={`${styles[renderClasses('address')]} ${styles["width-70"]} ${addressLine1.smartyAddressVerification && errors.address && touched['address'] && styles["error-input-field"]}`
                }>

                    <AutocompleteField
                        name="address"
                        label={translate(`${CURRENT_SCREEN}.companyDetails.address`) + (addressLine1.required ? translate(`${CURRENT_SCREEN}.companyDetails.requiredPlaceholder`) : "")}
                        fetchOptions={async (inputValue, selectedKey = "") => {

                            let url = `${SMARTY_ADDRESS_US}/lookup?key=${SMARTY_API_KEY}&search=` + inputValue
                            if (selectedKey !== "") {
                                url = url + "&selected=" + selectedKey
                            }
                            const data = await fetch(url)
                            const res = await data.json()

                            return res.suggestions
                        }}
                        classes={{ root: !(errors['address'] && touched['address']) && classes.root }}
                        //onBlur={(e) => { setFieldTouched(e.nativeEvent.srcElement.id, true, true); }}
                        error={errors['address'] && touched['address'] ? true : false}
                        setFieldTouched={setFieldTouched}
                        setRecent={setRecent}

                    />
                </div>}
            {errors['address'] && touched['address'] && <div style={errorStyle}> <ErrorMessage name="address" /></div>}

        </>}
    </Translate >);

    //New smarty Address Field Component for Non-US Countries
    const addressFieldComponentNonUS = (<Translate>
        {({ translate }) => <>

            <div className={`${styles[renderClasses('address')]} ${styles["width-70"]} ${addressLine1.smartyAddressVerification && errors.address && touched['address'] && styles["error-input-field"]}`
            }>

                <AutocompleteFieldNonUS
                    name="address"
                    label={translate(`${CURRENT_SCREEN}.companyDetails.address`) + (addressLine1.required ? translate(`${CURRENT_SCREEN}.companyDetails.requiredPlaceholder`) : "")}
                    fetchOptions={async (searchkey, addressId) => {

                        let country = CountryISO3CountryCode[agentProfile.countryId]
                        //console.log('API call with search term:', searchkey,country, addressId);
                        let url = ""
                        if (addressId && addressId !== "") {
                            url = `${SMARTY_ADDRESS_NON_US}/v2/lookup/${addressId}?key=${SMARTY_API_KEY}&country=${country}`
                        }
                        else {
                            url = `${SMARTY_ADDRESS_NON_US}/v2/lookup?key=${SMARTY_API_KEY}&search=` + searchkey + "&country=" + country
                        }
                        const data = await fetch(url)
                        const res = await data.json()

                        return res.candidates
                    }}
                    classes={{ root: !(errors['address'] && touched['address']) && classes.root }}
                    onBlur={(e) => { setFieldTouched(e.nativeEvent.srcElement.id, true, true); }}
                    error={errors['address'] && touched['address'] ? true : false}
                    setFieldTouched={setFieldTouched}
                    setRecent={setRecent}
                    countryISO={CountryISO3CountryCode[agentProfile.countryId]}

                />
            </div>
            {errors['address'] && touched['address'] && <div style={errorStyle}> <ErrorMessage name="address" /></div>}

        </>}
    </Translate >);


    const address2FieldComponent = (<Translate>
        {({ translate }) => <>

            <div className={`${styles[renderClasses('address2')]} ${styles["width-70"]} `
            }>
                <Field
                    name='address2'
                    autoComplete='off'
                    onChange={(e) => {
                        setRecent(e.nativeEvent.srcElement.id);
                        handleChange(e);
                    }}
                    id="address2"
                    fullWidth
                    type={companyDetails.companyContactInformation.addressLine2.inputType}

                    value={values.address2}
                    label={translate(`${CURRENT_SCREEN}.companyDetails.address2`) + (addressLine2.required ? translate(`${CURRENT_SCREEN}.companyDetails.requiredPlaceholder`) : "")}
                    variant="outlined"
                    error={errors['address2'] && touched['address2'] ? true : false}
                    // helperText={errors['address2'] && touched['address2'] ? errors['address2'] : ''}
                    size="small"
                    classes={{ root: !(errors['address2'] && touched['address2']) && classes.root }}
                    component={TextField}
                    disabled={addressLine1.smartyAddressVerification}
                />
            </div>
            {errors['address2'] && touched['address2'] && <div style={errorStyle}> <ErrorMessage name="address2" /></div>}

        </>}
    </Translate >);



    const cityFieldComponent = (<Translate>
        {({ translate }) => <>

            <div className={`${styles[renderClasses('city')]} ${styles["width-70"]} ${addressLine1.smartyAddressVerification && errors.city && touched['city'] && styles["error-input-field"]}`}>
                <Field
                    name='city'
                    autoComplete='off'
                    onChange={(e) => {
                        setRecent(e.nativeEvent.srcElement.id);
                        handleChange(e);
                    }}
                    onBlur={(e) => { setFieldTouched(e.nativeEvent.srcElement.id, true, true); }}
                    id="city"
                    fullWidth
                    type={companyDetails.companyContactInformation.city.inputType}
                    value={values.city}
                    label={translate(`${CURRENT_SCREEN}.companyDetails.city`) + (city.required ? translate(`${CURRENT_SCREEN}.companyDetails.requiredPlaceholder`) : "")}

                    variant="outlined"
                    error={errors['city'] && touched['city'] ? true : false}
                    // helperText={errors['city'] && touched['city'] ? errors['city'] : ''}
                    size="small"
                    classes={{ root: !(errors['city'] && touched['city']) && classes.root }}
                    component={TextField}
                    disabled={addressLine1.smartyAddressVerification}
                />
            </div>
            {errors['city'] && touched['city'] && <div style={errorStyle}> <ErrorMessage name="city" /></div>}

        </>}
    </Translate >);

    // const provinceFieldComponent = (<Translate>
    //     {({ translate }) => <>

    //         <div className={`${styles[renderClasses('city')]} ${styles["width-70"]} ${addressLine1.smartyAddressVerification && errors.provinceId && touched['provinceId'] && styles["error-input-field"]}`}>
    //             <Field
    //                 name='provinceId'
    //                 autoComplete='off'
    //                 onChange={(e) => {
    //                     setRecent(e.nativeEvent.srcElement.id);
    //                     handleChange(e);
    //                 }}
    //                 onBlur={(e) => { setFieldTouched(e.nativeEvent.srcElement.id, true, true); }}
    //                 id="provinceId"
    //                 fullWidth
    //                 type={companyDetails.companyContactInformation.city.inputType}
    //                 value={values.provinceId}
    //                 label={translate(`${CURRENT_SCREEN}.companyDetails.province`) + translate(`${CURRENT_SCREEN}.companyDetails.requiredPlaceholder`)}
    //                 variant="outlined"
    //                 error={errors['provinceId'] && touched['provinceId'] ? true : false}
    //                 // helperText={errors['provinceId'] && touched['provinceId'] ? errors['provinceId'] : ''}
    //                 size="small"
    //                 classes={{ root: !(errors['provinceId'] && touched['provinceId']) && classes.root }}
    //                 component={TextField}
    //                 disabled={addressLine1.smartyAddressVerification}
    //             />
    //         </div>
    //         {errors['provinceId'] && touched['provinceId'] && <div style={errorStyle}> <ErrorMessage name="provinceId" /></div>}

    //     </>}
    // </Translate >);

    const provinceFieldComponent = (<Translate>
        {({ translate }) => <>
            <div className={`${styles[renderClasses('stateId')]} ${styles["width-70"]} ${addressLine1.smartyAddressVerification && errors.provinceId && touched['provinceId'] && styles["error-input-field"]}`} >
                {profile.isFetchProvincesComplete && (
                    <TextField
                        id="provinceId"
                        name="provinceId"
                        classes={{ root: !(errors['provinceId'] && touched['provinceId']) && classes.root }}
                        select
                        // label={translate(`${CURRENT_SCREEN}.companyDetails.province`) + translate(`${CURRENT_SCREEN}.companyDetails.requiredPlaceholder`)}
                        label={
                            state.required
                                ? translate(`${CURRENT_SCREEN}.companyDetails.province`) +
                                translate(`${CURRENT_SCREEN}.companyDetails.requiredPlaceholder`) 
                                : translate(`${CURRENT_SCREEN}.companyDetails.province`)
                        }

                        value={values.provinceId}
                        onChange={(e) => {
                            setRecent("provinceId")
                            setFieldValue("provinceId", e.target.value)
                        }}
                        autoComplete='off'
                        onBlur={(e) => { setFieldTouched(e.nativeEvent.srcElement.id, true, true); }}
                        fullWidth
                        // helperText={errors['provinceId'] && touched['provinceId'] ? errors['provinceId'] : ''}
                        error={errors['provinceId'] && touched['provinceId'] ? true : false}
                        size="small"
                        SelectProps={{
                            native: true,
                        }}
                        variant="outlined"
                        disabled={addressLine1.smartyAddressVerification}
                    >
                        {<option value="" />}
                        {addressLine1.smartyAddressVerification ? profile.formOptions.provinces.map((option) => (
                            <option key={option.id} value={option.id} data-state-code={option.code}>
                                {option.name}
                            </option>
                        )) : profile.formOptions.provinces.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </TextField>
                )}
            </div>
            {errors['provinceId'] && touched['provinceId'] && <div style={errorStyle}> <ErrorMessage name="provinceId" /></div>}
        </>}
    </Translate >);

    const stateOfIncorporationFieldComponent = (<Translate>
        {({ translate }) => <>
            <div className={`${styles[renderClasses('stateOfIncorporationId')]} ${styles["width-70"]}`} >
                {(profile.isFetchStatesComplete) && (
                    <TextField
                        id="stateOfIncorporationId"
                        name="stateOfIncorporationId"
                        autoComplete='off'
                        classes={{ root: !(errors['stateOfIncorporationId'] && touched['stateOfIncorporationId']) && classes.root }}
                        //select will be true or false based on config file value of select for stateOfIncorporation
                        select
                        label={translate(`${CURRENT_SCREEN}.companyDetails.stateOfIncorporation`) + (stateOfIncorporation.required ? translate(`${CURRENT_SCREEN}.companyDetails.requiredPlaceholder`) : "")}
                        value={values.stateOfIncorporationId}
                        onChange={(e) => {
                            setRecent("stateOfIncorporationId")
                            setFieldValue("stateOfIncorporationId", e.target.value)
                        }}
                        onBlur={(e) => { setFieldTouched(e.nativeEvent.srcElement.id, true, true); }}
                        fullWidth

                        error={errors['stateOfIncorporationId'] && touched['stateOfIncorporationId'] ? true : false}
                        size="small"
                        style={{ "fontSize": "15px", "fontWeight": "normal", "fontStyle": "normal", "lineHeight": "23px" }}
                        SelectProps={{
                            native: true
                        }}
                        variant="outlined"
                    >
                        {<option value="" />}
                        {profile.formOptions.states.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </TextField>
                )}
            </div>
            {errors['stateOfIncorporationId'] && touched['stateOfIncorporationId'] && <div style={errorStyle}> <ErrorMessage name="stateOfIncorporationId" /></div>}
        </>
        }
    </Translate >);

    // const stateOfIncorporationFieldComponentUS = (<Translate>
    //     {({ translate }) => <>
    //         <div className={`${styles[renderClasses('stateOfIncorporationId')]} ${styles["width-70"]}`} >
    //             {profile.isFetchStatesComplete && (
    //                 <TextField
    //                     id="address"
    //                     name="address"
    //                     autoComplete='off'
    //                     classes={{ root: !(errors['address'] && touched['address']) && classes.root }}

    //                     label="address (required)"
    //                     value={values.address}
    //                     onChange={(e) => {
    //                         setRecent("address")
    //                         setFieldValue("address", e.target.value)
    //                         //debounce function
    //                         debouncedFetchOptions(e.target.value);
    //                     }}
    //                     onBlur={(e) => { setFieldTouched(e.nativeEvent.srcElement.id, true, true); }}
    //                     fullWidth

    //                     error={errors['address'] && touched['address'] ? true : false}
    //                     size="small"
    //                     style={{ "fontSize": "15px", "fontWeight": "normal", "fontStyle": "normal", "lineHeight": "23px" }}

    //                     variant="outlined"
    //                     select
    //                 >

    //                     {profile.formOptions.smartyaddress.length > 0 ? profile.formOptions.smartyaddress.map((option) => (
    //                         <option key={option.id} value={option.street_line}>
    //                             {option.street_line + "" + option.secondary + "" + option.state}
    //                         </option>
    //                     )) : <option value=""> fetching the address</option>}
    //                 </TextField>
    //             )}
    //         </div>
    //         {errors['address'] && touched['address'] && <div style={errorStyle}> <ErrorMessage name="address" /></div>}
    //     </>}
    // </Translate >);

    const renderZipCodePlaceholder = () => {
        if (agentProfile.countryId === COUNTRY_IDS.CA) return "Post Code (required)"
        else if (agentProfile.countryId === COUNTRY_IDS.UK) return "Post Code (required)"
        else return "ZIP Code (required)"
    }

    const zipCodeValidation = (value) => {
        if (agentProfile.countryId === COUNTRY_IDS.CA) return formHelpers.isPostalCodeValid(value);
        else if (agentProfile.countryId === COUNTRY_IDS.UK) return true;
        else return formHelpers.isValueNumber(value) && value.length <= 5
    }

    const zipCodeFieldComponent = (<Translate>
        {({ translate }) => <>
            <div className={`${styles[renderClasses('zip-code')]} ${styles["width-70"]} ${addressLine1.smartyAddressVerification && errors.zipCode && touched['zipCode'] && styles["error-input-field"]}`} >
                <Field
                    name='zipCode'
                    autoComplete='off'
                    onChange={(e) => {
                        setRecent(e.nativeEvent.srcElement.id);
                        handleChange(e);

                    }}
                    // onBlur={(e) => { setFieldTouched(e.nativeEvent.srcElement.id, true, true); }}
                    label={translate(`${CURRENT_SCREEN}.companyDetails.zipCode`) + (zipCode.required ? translate(`${CURRENT_SCREEN}.companyDetails.requiredPlaceholder`) : "")}
                    id="zipCode"
                    fullWidth
                    type={companyDetails.companyContactInformation.zipCode.inputType}
                    value={values.zipCode}
                    variant="outlined"
                    error={errors['zipCode'] && touched['zipCode'] ? true : false}
                    // helperText={errors['zipCode'] && touched['zipCode'] ? errors['zipCode'] : ''}
                    size="small"
                    classes={{ root: !(errors['zipCode'] && touched['zipCode']) && classes.root }}
                    component={TextField}
                    onBlur={(e) => { setFieldTouched(e.nativeEvent.srcElement.id, true, true); }}
                    disabled={addressLine1.smartyAddressVerification}
                />
            </div>
            {errors['zipCode'] && touched['zipCode'] && <div style={{
                marginTop: "6px",
                fontSize: "12px",
                color: "red"
            }}> <ErrorMessage name="zipCode" /></div>}
        </>}
    </Translate >);

    const gstHstFieldComponent = (<Translate>
        {({ translate }) => <>
            <div className={`${styles[renderClasses('gsthst')]} ${styles["width-70"]}`}>
                <TextField
                    id="taxProgram"
                    name="taxProgram"
                    autoComplete="off"
                    classes={{ root: !(errors['taxProgram'] && touched['taxProgram']) && classes.root }}
                    select
                    label={translate(`${CURRENT_SCREEN}.companyDetails.taxProgram`) + (taxProgram.required ? translate(`${CURRENT_SCREEN}.companyDetails.requiredPlaceholder`) : "")}
                    value={values.gsthst}
                    onChange={(e) => {
                        setRecent("taxProgram")
                        setFieldValue("taxProgram", e.target.value)
                    }}
                    onBlur={(e) => { setFieldTouched(e.nativeEvent.srcElement.id, true, true); }}
                    fullWidth
                    // helperText={errors['gsthst'] && touched['gsthst'] ? errors['gsthst'] : ''}
                    error={errors['taxProgram'] && touched['taxProgram'] ? true : false}
                    size="small"
                    SelectProps={{
                        native: true
                    }}
                    variant="outlined"
                >
                    {<option value="" />}
                    {registerBusiness.CA.formOptions.gsthst.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.name}
                        </option>
                    ))}
                </TextField>
            </div>
            {errors['taxProgram'] && touched['taxProgram'] && <div style={errorStyle}> <ErrorMessage name="taxProgram" /></div>}

        </>}
    </Translate >);

    const provinceOfIncorporationFieldComponent = (<Translate>
        {({ translate }) => <>
            <div className={`${styles[renderClasses('stateOfIncorporationId')]} ${styles["width-70"]}`} >
                {profile.isFetchProvincesComplete && (
                    <TextField
                        id="provinceOfIncorporationId"
                        name="provinceOfIncorporationId"
                        autoComplete='off'
                        classes={{ root: !(errors['provinceOfIncorporationId'] && touched['provinceOfIncorporationId']) && classes.root }}
                        select
                        // label={translate(`${CURRENT_SCREEN}.companyDetails.provinceOfIncorporation`) + translate(`${CURRENT_SCREEN}.companyDetails.requiredPlaceholder`)}
                        label={
                            stateOfIncorporation.required
                                ? translate(`${CURRENT_SCREEN}.companyDetails.provinceOfIncorporation`) +
                                translate(`${CURRENT_SCREEN}.companyDetails.requiredPlaceholder`) 
                                : translate(`${CURRENT_SCREEN}.companyDetails.provinceOfIncorporation`)
                        }
                        value={values.provinceOfIncorporationId}
                        disabled={false}
                        onChange={(e) => {
                            setRecent("provinceOfIncorporationId")
                            setFieldValue("provinceOfIncorporationId", e.target.value)
                        }}
                        onBlur={(e) => { setFieldTouched(e.nativeEvent.srcElement.id, true, true); }}
                        fullWidth
                        // helperText={errors['provinceOfIncorporationId'] && touched['provinceOfIncorporationId'] ? errors['provinceOfIncorporationId'] : ''}
                        error={errors['provinceOfIncorporationId'] && touched['provinceOfIncorporationId'] ? true : false}
                        size="small"
                        SelectProps={{
                            native: true
                        }}
                        variant="outlined"
                    >
                        {<option value="" />}
                        {profile.formOptions.provinces.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </TextField>

                )}
            </div>
            {errors['provinceOfIncorporationId'] && touched['provinceOfIncorporationId'] && <div style={errorStyle}> <ErrorMessage name="provinceOfIncorporationId" /></div>}
        </>}
    </Translate >);

    // const provinceFieldComponent = (<Translate>
    //     {({ translate }) => <>
    //         <div className={`${styles[renderClasses('stateId')]} ${styles["width-70"]} ${addressLine1.smartyAddressVerification && errors.provinceId && touched['provinceId'] && styles["error-input-field"]}`} >
    //             {profile.isFetchProvincesComplete && (
    //                 <TextField
    //                     id="provinceId"
    //                     name="provinceId"
    //                     classes={{ root: !(errors['provinceId'] && touched['provinceId']) && classes.root }}
    //                     select
    //             label={translate(`${CURRENT_SCREEN}.companyDetails.province`) + translate(`${CURRENT_SCREEN}.companyDetails.requiredPlaceholder`)}
    //             value={values.provinceId}
    //             onChange={(e) => {
    //                 setRecent("provinceId")
    //                 setFieldValue("provinceId", e.target.value)
    //             }}
    //             autoComplete='off'
    //             onBlur={(e) => { setFieldTouched(e.nativeEvent.srcElement.id, true, true); }}
    //             fullWidth
    //             // helperText={errors['provinceId'] && touched['provinceId'] ? errors['provinceId'] : ''}
    //             error={errors['provinceId'] && touched['provinceId'] ? true : false}
    //             size="small"
    //             SelectProps={{
    //                 native: true,
    //             }}
    //             variant="outlined"
    //             disabled={false}
    //         >
    //             {<option value="" />}
    //             {addressLine1.smartyAddressVerification ? profile.formOptions.provinces.map((option) => (
    //                 <option key={option.id} value={option.id} data-state-code={option.code}>
    //                     {option.name}
    //                 </option>
    //             )) : profile.formOptions.provinces.map((option) => (
    //                 <option key={option.id} value={option.id}>
    //                     {option.name}
    //                 </option>
    //             ))}
    //         </TextField>
    //     )}
    // </div>
    // {errors['provinceId'] && touched['provinceId'] && <div style={errorStyle}> <ErrorMessage name="provinceId" /></div>}
    //     </>}
    // </Translate >);

    const vatidFieldComponent = (<Translate>
        {({ translate }) => <>
            <div className={styles[renderClasses("vatid")]}>
                <Field
                    name="vatid"
                    type="password"
                    autoComplete="off"
                    onChange={(e) => {
                        setRecent(e.nativeEvent.srcElement.id);
                        e.target.value.length <= 10 && handleChange(e);
                    }}
                    // onBlur={(e) => { setFieldTouched(e.nativeEvent.srcElement.id, true, true); }}
                    label="VAT Registration ID"
                    id="vatid"
                    fullWidth
                    value={values.vatid}
                    variant="outlined"
                    error={errors["vatid"] && touched["vatid"] ? true : false}
                    // helperText={errors["vatid"] && touched["vatid"] ? errors["vatid"] : ''}
                    size="small"
                    classes={{ root: !errors["vatid"] && classes.root }}
                    component={TextField}
                    onBlur={(e) => { setFieldTouched(e.nativeEvent.srcElement.id, true, true); }}
                />
            </div>
            {errors["vatid"] && touched["vatid"] && <div style={errorStyle}> <ErrorMessage name="vatid" /></div>}
        </>}
    </Translate >);

    const gastHstTitleComponent = (<Translate>
        {({ translate }) => <>
            <h4 className={`${styles['gst-title']}`}>
                {translate(`${CURRENT_SCREEN}.companyDetails.gsthstTitle`)}
            </h4>
        </>}
    </Translate >);

    const getErrorMessageForGST = (errorCode, attempts, translate) => {
        const errorMessage = translate(`${CURRENT_SCREEN}.companyDetails.gstValidationMessage.${errorCode}`);
        return errorMessage.replace('{n}', attempts);
    };

    const { primaryPhone, companyEmail, addressLine1, addressLine2, city, state, zipCode } = companyDetails.companyContactInformation;
    const { companyName, businessId, companyType, transactionDate, registrationStatus, taxProgram, taxId, stateOfIncorporation, yourTitle, typeOfIncorporation, primaryPurpose } = companyDetails;

    return (<Translate>
        {({ translate }) => <>
            <div>
                <Form>
                    {agentProfile.countryId !== COUNTRY_IDS.CA && GST_VALIDATION_CODE.includes(registerBusiness.error) ? (
                        <div className={styles['server-error']} style={{ width: '70%' }}>
                            {getErrorMessageForGST(registerBusiness.error, registerBusiness.remainingAttempts, translate)}
                        </div>
                    ) : null}
                    {registerBusiness.error === "The call center can't be inserted because the specified FEIN is already assigned to another VSC." ? (
                        <div className={styles['server-error']} style={{ width: '70%' }}>
                            {translate(`${CURRENT_SCREEN}.companyDetails.duplicateBusinessId`)}
                        </div>
                    ) : null}
                    {registerBusiness.error === "EIN being used by another CyberCorporation. Please correct EIN and try again" ? (
                        <div className={styles['server-error']} style={{ width: '70%' }}>
                            {translate(`${CURRENT_SCREEN}.companyDetails.duplicateBusinessId`)}
                        </div>
                    ) : null}
                    {registerBusiness.error === 'GST Validation Failed' ? (
                        <div className={styles['server-error']} style={{ width: '70%' }}>
                            {translate(`${CURRENT_SCREEN}.companyDetails.taxIdValidationFailed`)}
                            {remainingtaxIDAttempts + `${translate(`${CURRENT_SCREEN}.companyDetails.attemptsRemaining`)}`}
                            {clearFormField("vatid")}
                        </div>
                    ) : null}
                    {registerBusiness.error === 'INVALID SEC NUMBER' ? (
                        <div className={styles['server-error']} style={{ width: '70%' }}>
                            {translate(`${CURRENT_SCREEN}.companyDetails.taxIdValidationFailed`)}
                            {/* {remainingtaxIDAttempts + `${translate(`${CURRENT_SCREEN}.companyDetails.attemptsRemaining`)}`} */}
                            {clearFormField("vatidPH")}
                        </div>
                    ) : null}
                    {registerBusiness.error === 'INVALID TIN NUMBER' ? (
                        <div className={styles['server-error']} style={{ width: '70%' }}>
                            {translate(`${CURRENT_SCREEN}.companyDetails.businessIdValidationFailed`)}
                            {/* {remainingtaxIDAttempts + `${translate(`${CURRENT_SCREEN}.companyDetails.attemptsRemaining`)}`} */}
                            {clearFormField("feinPH")}
                        </div>
                    ) : null}
                    {registerBusiness.error === 'Record Not Found ( GSTIN )' ? (
                        <div className={styles['server-error']} style={{ width: '70%' }}>
                            {translate(`${CURRENT_SCREEN}.companyDetails.taxIdRecordNotFound`)}
                            {remainingtaxIDAttempts + `${translate(`${CURRENT_SCREEN}.companyDetails.attemptsRemaining`)}`}
                            {clearFormField("vatid")}
                        </div>
                    ) : null}
                    {registerBusiness.error === 'GST Validation Failed. Profile was Inactivated' ? (
                        <div className={styles['server-error']} style={{ width: '70%' }}>
                            {translate(`${CURRENT_SCREEN}.companyDetails.taxIdProfileInactivation`)}
                            {handleTimeout()}
                        </div>
                    ) : null}
                    {(registerBusiness.error === HTTP_STATUS.BAD_REQUEST || registerBusiness.error === HTTP_STATUS.FORBIDDEN) && (
                        <div className={styles["server-error"]} style={{ width: '70%' }} >
                            {translate(`${CURRENT_SCREEN}.companyDetails.apiFailure`)}
                            {clearFormField("vatid")}
                        </div>
                    )}
                    {agentProfile.countryId !== COUNTRY_IDS.PH &&
                        companyNameError &&
                        <div className={styles['server-error']} style={{ width: '70%' }}>
                            {translate(`${CURRENT_SCREEN}.companyDetails.invalidCompanyName`)}
                        </div>
                    }

                    {agentProfile.countryId === COUNTRY_IDS.PH &&
                        companyNameError && values.typeOfIncorporation === "Company" &&
                        <div className={styles['server-error']} style={{ width: '70%' }}>
                            {translate(`${CURRENT_SCREEN}.companyDetails.invalidCompanyNameDomesticCorporation`)}
                        </div>
                    }
                    {agentProfile.countryId === COUNTRY_IDS.PH &&
                        companyNameError && values.typeOfIncorporation === "PartnerShip" &&
                        <div className={styles['server-error']} style={{ width: '70%' }}>
                            {translate(`${CURRENT_SCREEN}.companyDetails.invalidCompanyNamePartnership`)}
                        </div>
                    }
                    {agentProfile.countryId === COUNTRY_IDS.PH &&
                        companyNameError && values.typeOfIncorporation === "Individual" &&
                        <div className={styles['server-error']} style={{ width: '70%' }}>
                            {translate(`${CURRENT_SCREEN}.companyDetails.invalidCompanyNameOnePersonCompany`)}
                        </div>
                    }

                    {agentProfile.countryId !== COUNTRY_IDS.PH && (
                        <div className={` ${styles['register-us']} `}>
                            <OverlayTextLoader
                                loading={registerBusiness.isGstHstValidating}
                                loadingText="Verifying GST..."
                                spinnerStyle='overlay-spinner'
                                content={<span>
                                    {companyName.display && nameFieldComponent}
                                    {companyType.display && companyTypeFieldComponent}
                                    {registrationStatus.display && registrationStatusFieldComponent}
                                    {registrationStatus.display && exemptCheckBox}
                                    {taxId.display && taxIdComponent}
                                    {(companyType.display || registrationStatus.display) ?
                                        gstComponent : businessId.display && businessIdComponent}
                                    {/* {transactionDate.display && transactionDateFieldComponent} */}
                                </span>}
                            />
                            {/* {companyName.display && nameFieldComponent}
                            {taxId.display && taxIdComponent} */}
                            {/* {businessId.display && businessIdComponent} */}
                            {/* {taxProgram.display && gstHstFieldComponent} */}
                            {(registerBusiness.gstHstValid) && <div className={`${styles["status-message"]}`}>{translate(`${CURRENT_SCREEN}.companyDetails.businessIdValid`)}</div>}
                            {agentProfile.countryId === COUNTRY_IDS.CA && GST_VALIDATION_CODE.includes(registerBusiness.error) ? (
                                <div className={styles['server-error']} style={{ width: '70%', fontSize: "14px", textAlign: "justify" }}>
                                    {getErrorMessageForGST(registerBusiness.error, registerBusiness.remainingAttempts, translate)}
                                </div>
                            ) : null}
                            {stateOfIncorporation.display && (stateOfIncorporation.isState === false ? provinceOfIncorporationFieldComponent : stateOfIncorporationFieldComponent)}
                            {yourTitle.display && titleFieldComponent}
                            <h3 className={`${commonStyle['subHeading1']} ${commonStyle['semiBoldWeight']} ${commonStyle['blackColor']} ${commonStyle['withinComponentMargin']} ${commonStyle['mediumFont']} ${styles['title-company-us']}`}>{translate(`${CURRENT_SCREEN}.companyDetails.subHeader`)}</h3>
                            {/*<br />*/}
                            {primaryPhone.display && phoneFieldComponent}
                            {companyEmail.display && emailFieldComponent}
                            {addressLine1.display && addressLine1.smartyAddressVerification
                                ? (addressLine1.smartyInternational ? addressFieldComponentNonUS : addressFieldComponentUS)
                                : addressFieldComponent}
                            {addressLine2.display && address2FieldComponent}
                            {city.display && cityFieldComponent}
                            {state.display && (state.isState ? stateFieldComponent : provinceFieldComponent)}
                            {zipCode.display && zipCodeFieldComponent}
                            {/* { agentProfile.countryId !== COUNTRY_IDS.CA && <div className="vertical-spacing-1 left-spacing">
                            <spotifyButton
                                color="primary"
                                size="medium-2"
                                onClick={taxIdValid}
                                disabled={false}
                            >
                                {translate(`${CURRENT_SCREEN}.companyDetails.verify`)}
                            </spotifyButton>
                        </div>} */}

                        </div>)}

                    {agentProfile.countryId === COUNTRY_IDS.PH && (
                        <div className={styles['register-us']}>
                            {typeOfIncorporation.display && typeOfIncorporationComponent}
                            {companyName.display && nameFieldComponent}
                            {taxId.display && taxId.taxIdVerification === "SEC" && taxIdComponentPH}
                            {taxId.display && businessId.businessIdVerification === "TIN" && businessIdComponentPH}
                            {stateOfIncorporation.display && (stateOfIncorporation.isState === false ? provinceOfIncorporationFieldComponent : stateOfIncorporationFieldComponent)}
                            {yourTitle.display && titleFieldComponent}
                            {primaryPurpose.display && primaryPurposeFieldComponent}

                            {/* Contact Information */}
                            <h3 className={`${commonStyle['subHeading1']} ${commonStyle['semiBoldWeight']} ${commonStyle['blackColor']} ${commonStyle['withinComponentMargin']} ${commonStyle['mediumFont']} ${styles['title-company-us']}`}>
                                {translate(`${CURRENT_SCREEN}.companyDetails.subHeader`)}
                            </h3>
                            {primaryPhone.display && phoneFieldComponent}
                            {companyEmail.display && emailFieldComponent}

                            {addressLine1.display && addressLine1.smartyAddressVerification
                                ? (addressLine1.smartyInternational ? addressFieldComponentNonUS : addressFieldComponentUS)
                                : addressFieldComponent}

                            {addressLine2.display && address2FieldComponent}
                            {city.display && cityFieldComponent}
                            {state.display && (state.isState ? stateFieldComponent : provinceFieldComponent)}
                            {zipCode.display && zipCodeFieldComponent}

                            <div className={`${styles["width-70"]} ${styles['form-container__copy']} ${commonStyle['lightFont']} ${commonStyle['blackColor']} ${commonStyle['subHeading1']} ${commonStyle['componentsMargin']}`}>
                                <Field
                                    name="CheckBox"
                                    label={`I agree to email a copy of the Bureau of Internal Revenue (BIR) Certificate of Registration of my company to <b>ph.compliance@spotify.com</b> within five (5) business days.`}
                                    id="CheckBox"
                                    component={Checkbox}
                                    value={values.CheckBox !== undefined ? values.CheckBox : false}

                                />
                            </div>

                        </div>
                    )}

                    {/* { agentProfile.countryId !== COUNTRY_IDS.CA && <div className="vertical-spacing-1 left-spacing">
                            <spotifyButton
                                color="primary"
                                size="medium-2"
                                onClick={taxIdValid}
                                disabled={false}
                            >
                                {translate(`${CURRENT_SCREEN}.companyDetails.verify`)}
                            </spotifyButton>
                        </div>} */}



                    {/* {agentProfile.countryId === COUNTRY_IDS.CA && (
                        <div className={styles['register-ca']}>
                            {nameFieldComponent}
                            {titleFieldComponent}
                            {businessIdComponent}
                            {gstHstFieldComponent}
                            {emailFieldComponent}
                            {provinceOfIncorporationFieldComponent}
                            {phoneFieldComponent}
                            <h3 className={`${commonStyle['mediumFont']} ${commonStyle['subHeading1']} ${commonStyle['semiBoldWeight']} ${commonStyle['blackColor']} ${styles['primaryPhone-company-us']}`}>
                                {translate("Company Contact Information")}</h3>

                            {addressFieldComponent}
                            
                            {addressFieldComponentNonUS}
                            {address2FieldComponent}
                            {cityFieldComponent}
                            {provinceFieldComponent}
                            {zipCodeFieldComponent}
                        </div>
                    )}
                    {agentProfile.countryId === COUNTRY_IDS.UK && (
                        <div className={styles['register-uk']}>
                            {nameFieldComponent}
                            {titleFieldComponent}
                            {businessIdComponent}
                            {vatidFieldComponent}
                            {emailFieldComponent}
                            {phoneUKFieldComponent}
                            <h4 className={`${commonStyle['mediumFont']} ${styles['headerForm']} ${commonStyle['subHeading1']} ${commonStyle['semiBoldWeight']} ${commonStyle['blackColor']} ${styles['primaryPhone-company-uk']}`}>
                                {translate("Company Contact Information")}</h4>

                            {addressFieldComponent}
                            
                            {addressFieldComponentNonUS}
                            {address2FieldComponent}
                            {cityFieldComponent}
                            {zipCodeFieldComponent}
                        </div>
                    )}

                    {agentProfile.countryId === COUNTRY_IDS.IN && (
                        <div className={` ${styles['register-in']}`}>
                            {panFeildComponent}
                            {panConfirmFeildComponent}
                        </div>
                    )} */}
                    {/* {agentProfile.countryId === COUNTRY_IDS.US && <div className={`${styles['align-right']} ${commonStyle['lastComponent4']}`}>
                        <Button size="medium" color="orange" type='submit' isSubmitting={registerBusiness.isSubmitting} id="btnRegisterBusinessBusinessInfoNext">
                            {translate("Next")}
                        </Button>
                    </div>
                    } */}

                    {agentProfile.countryId !== COUNTRY_IDS.PH && (
                        <div className={` ${styles['align-right']} ${commonStyle['componentsMargin']} ${commonStyle['lastComponent5']} `} style={{ width: '70%' }}>
                            <Button
                                size="medium"
                                color="orange"
                                type='submit'
                                disabled={registerBusiness.remainingAttempts === 0 || (registerBusiness.error && (registerBusiness.error !== "EXTERNAL_SERVER_ERROR" && registerBusiness.error !== "GST_VALID"))}
                                isSubmitting={registerBusiness.isSubmitting}
                                id="btnRegisterBusinessBusinessInfoNext"
                            >
                                {translate(`${CURRENT_SCREEN}.nextButton`)}
                            </Button>
                        </div>

                    )}

                    {agentProfile.countryId === COUNTRY_IDS.PH && (
                        <div className={` ${styles['align-right']} ${commonStyle['componentsMargin']} ${commonStyle['lastComponent5']} `} style={{ width: '70%' }}>
                            <Button
                                size="medium"
                                color="orange"
                                type='submit'
                                disabled={registerBusiness.remainingAttempts === 0 || (registerBusiness.error && (registerBusiness.error !== "EXTERNAL_SERVER_ERROR" && registerBusiness.error !== "GST_VALID")) || !(isSecVerifyValid && isTinVerifyValid && CheckedBox)}
                                isSubmitting={registerBusiness.isSubmitting}
                                id="btnRegisterBusinessBusinessInfoNext"
                            >
                                {translate(`${CURRENT_SCREEN}.nextButton`)}
                            </Button>
                        </div>

                    )}


                </Form>
            </div>
        </>}
    </Translate >);
};

export default RegisterBusinessForm;
