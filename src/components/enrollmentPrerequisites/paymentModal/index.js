import "./index.scss"
//framework & 3rd parties
//framework & 3rd parties
import React, { Fragment, Component } from 'react';

import * as Yup from "yup"
import { Formik, Field, Form } from "formik";
import { Translate } from 'spotify-shared-web/localize'
import ErrorMessage from "spotify-shared-web/components/common/ErrorMessage"
import SuccessMessage from "spotify-shared-web/components/common/SuccessMessage"
import ModalWithFormWrapper from "spotify-shared-web/components/common/ModalWithForm"
import LoadingComponent from 'spotify-shared-web/components/common/LoadingComponent';
import { Hidden } from '@material-ui/core';
import RadioButton from "spotify-shared-web/components/common/form/RadioButton"
import NumberFormat from 'react-number-format';
import TextInput from 'spotify-shared-web/components/common/form/TextInput';
import SelectInput from "spotify-shared-web/components/common/form/SelectInput"
import { FooterLinks } from "../../../constants";

import SCREEN_CONFIG from "../../../screensConfig";

const CURRENT_SCREEN = SCREEN_CONFIG.payment;


const FormBody = ({
    assessment,
    paymentResults,
    hasErrors,
    isSubmittingPayment,
    isCompletePayment,
    paymentErrors,
    paymentInfoData,
    verifiedData,
    statesData,
    onSubmit,
    paymentCompleteData,
    onHideRefundPolicyClick,
    onViewRefundPolicyClick,
    showRefundPolicy,
    doesDepositStepExist,
    formProps // this is why we need to have a form body
}) => {

    {
        ((verifiedData != null && verifiedData.verified == true) || (paymentCompleteData != null && paymentCompleteData.isSaving == false && paymentCompleteData.isSuccessful != null && paymentCompleteData.isSuccessful == true)) &&
            onSubmit(null);
    }



    return (<Translate>
        {({ translate }) =>
            <Fragment>

                {(isSubmittingPayment === true && hasErrors === false) || (paymentCompleteData != null && paymentCompleteData.isSaving) &&
                    <Fragment>
                        <LoadingComponent />
                    </Fragment>
                }

                {verifiedData != null && verifiedData.verified == false && (verifiedData.verificationLevelType == 'PremisesPartial' || verifiedData.verificationLevelType == 'StreetPartial') &&
                    <Fragment>
                        <ErrorMessage
                            title='Failed to verify your address'
                            message={verifiedData.verificationLevelType == 'PremisesPartial' ? 'Please Confirm your Apt/Ste/Unit Number.' : verifiedData.prompt} />
                    </Fragment>
                }
                {verifiedData != null && verifiedData.verified == false && (verifiedData.verificationLevelType == 'None' || verifiedData.verificationLevelType == 'Multiple') &&
                    <Fragment>
                        <ErrorMessage
                            title='Failed to verify your address'
                            message={verifiedData.prompt} />
                    </Fragment>
                }

                {verifiedData != null && verifiedData.verified == true &&
                    <Fragment>
                        <SuccessMessage
                            title='Address was verified '
                            message={verifiedData.prompt} />
                        <div className="address">
                            {verifiedData.returnedAddresses != null && verifiedData.returnedAddresses.map((address, key) => {
                                address.addressLine.map((addressLineOut, key2) => <div id="key">{addressLineOut}</div>)
                            })
                            }
                        </div>

                    </Fragment>

                }

                {
                    (paymentInfoData && isSubmittingPayment === false && hasErrors === false && paymentCompleteData != null && paymentCompleteData.isSaving == false) &&
                    <Fragment>
                        <p>{translate(`${CURRENT_SCREEN}.description`)}</p>

                        <table className="opportunity-board_top__table table table-responsive table-borderless table-sm">
                            <tbody>
                                <tr>
                                    <th scope="row" className="text-muted">{translate(`${CURRENT_SCREEN}.opportunity`)}</th>
                                    <td>
                                        {paymentInfoData.itemDescription}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="text-muted">{translate(`${CURRENT_SCREEN}.class`)}</th>
                                    <td>
                                        {paymentInfoData.className}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="text-muted">{translate(`${CURRENT_SCREEN}.courseCost`)}</th>
                                    <td>
                                        <NumberFormat value={paymentInfoData.itemCost} displayType={'text'} thousandSeparator={true} prefix={translate(`${CURRENT_SCREEN}.currency`)} />
                                    </td>
                                </tr>
                                {paymentInfoData.flatBGCFees > 0 && (<tr>
                                    <th scope="row" className="text-muted">{translate(`${CURRENT_SCREEN}.bgcFees`)}</th>
                                    <td>
                                        <NumberFormat value={paymentInfoData.flatBGCFees} displayType={'text'} thousandSeparator={true} prefix={translate(`${CURRENT_SCREEN}.currency`)} /> (<a className="link pointer" href={FooterLinks.BACKGROUND_CHECK_POLICY} target="_blank">view background check policy</a>)
                                    </td>
                                </tr>)}

                                {paymentInfoData.vouchersUsed > 0 &&
                                    <tr>
                                        <th scope="row" className="text-muted">{translate(`${CURRENT_SCREEN}.voucher`)}</th>
                                        <td>
                                            <NumberFormat value={paymentInfoData.vouchersUsed} displayType={'text'} thousandSeparator={true} prefix={translate(`${CURRENT_SCREEN}.currency`)} />
                                        </td>
                                    </tr>
                                }
                                <tr>
                                    <th scope="row" className="text-muted">{translate(`${CURRENT_SCREEN}.paymentAmount`)}</th>
                                    <td>
                                        <NumberFormat value={paymentInfoData.cost} displayType={'text'} thousandSeparator={true} prefix={translate(`${CURRENT_SCREEN}.currency`)} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>


                        {paymentInfoData.classNoShowFees > 0 && doesDepositStepExist && doesDepositStepExist.length == 0 && <p>
                            {translate(`${CURRENT_SCREEN}.note`)} <span><NumberFormat value={paymentInfoData.classNoShowFees} displayType={'text'} thousandSeparator={true} prefix={translate(`${CURRENT_SCREEN}.currency`)} /></span> {translate(`${CURRENT_SCREEN}.noteContinue`)} <a className="link pointer" href={FooterLinks.NO_SHOW_POLICY} target="_blank">{translate(`${CURRENT_SCREEN}.viewNoShowPolicy`)}</a>
                        </p>}

                        {paymentInfoData.classNoShowFees > 0 && doesDepositStepExist && doesDepositStepExist.length == 0 && <p>{translate(`${CURRENT_SCREEN}.disclaimer`)}</p>}
                        {/* <p><a className="link pointer" href={FooterLinks.NO_SHOW_POLICY}>View no-show policy</a></p> */}
                    </Fragment>
                }



                {showRefundPolicy === false && verifiedData != null && verifiedData.verified == false && verifiedData.verificationLevelType == 'Multiple' &&
                    <Fragment>
                        <div className="addresses">
                            <Field
                                values={formProps.values}
                                setFieldValue={formProps.setFieldValue}
                                onChange={formProps.handleChange}

                                name={"multipleaddress"}
                                label={verifiedData.prompt}
                                options={
                                    verifiedData.returnedAddresses.map((address, key) => {
                                        return { value: key, label: address.addressLine }
                                    })

                                }
                                id={"address"}
                                component={RadioButton}
                            />
                        </div>
                    </Fragment>
                }

                {showRefundPolicy === false && hasErrors === false && paymentInfoData != null && paymentInfoData.countryCode == 'US' && isSubmittingPayment === false && paymentResults != null && paymentResults.required == true && (verifiedData == null || (verifiedData != null && verifiedData.verified == false && verifiedData.verificationLevelType != 'Multiple')) &&
                    <Fragment>
                        <div>
                            <b>Shipping Information</b>

                            <p>Under this opportunity, spotify may ship items relating to your company's use of the platform or service on the program, or both. Please enter your current residential address. P.O. Boxes are not accepted.</p>
                        </div>
                        <Field
                            values={formProps.values}
                            setFieldValue={formProps.setFieldValue}
                            onChange={formProps.handleChange}

                            name={"address"}
                            label="Ship To"
                            options={
                                paymentResults.addresses != null ? (paymentResults.addresses.map((address, key) => {
                                    return { value: address.addressType, label: address.addressType + " \n" + (address.addressString != null ? address.addressString : "") }
                                }))
                                    : [{ value: "", label: "New Address " }]
                            }
                            /*options={
                                [{ value: "contactProfile", label: "Profile Address \n" + paymentResults.contactProfileAddress.addressString },
                                { value: "cspAddress", label: "Saved Address \n" + paymentResults.cspAddress.addressString },
                                { value: "newAddress", label: "New Address " }
                                ]
                            }*/
                            id={"address"}
                            component={RadioButton}
                        />
                        {formProps.values.address == "New Address" &&
                            <div id="newAddressFields">
                                <Field
                                    onChange={formProps.handleChange}
                                    name={"addressLine1"}
                                    value={formProps.values.addressLine1}
                                    label={"Street Address"}
                                    id={"addressLine1"}
                                    component={TextInput}
                                    size="small"

                                />
                                <Field
                                    onChange={formProps.handleChange}
                                    name={"addressLine2"}
                                    value={formProps.values.addressLine2}
                                    label={"Apt/Suite"}
                                    id={"addressLine2"}
                                    component={TextInput}
                                    size="small"
                                />
                                <Field
                                    onChange={formProps.handleChange}
                                    name={"city"}
                                    value={formProps.values.city}
                                    label={"City"}
                                    id={"city"}
                                    component={TextInput}
                                    size="small"
                                />
                                <Field
                                    onChange={formProps.handleChange}
                                    name={"state"}
                                    value={formProps.values.state}
                                    label={"State"}
                                    id={"state"}
                                    options={
                                        statesData.map((state, key) => {
                                            return { value: state.code, label: state.name }
                                        })
                                    }
                                    component={SelectInput}
                                    size="small"
                                />
                                <Field
                                    onChange={formProps.handleChange}
                                    name={"zip"}
                                    value={formProps.values.zip}
                                    label={"Zip/Postal Code"}
                                    id={"zip"}
                                    component={TextInput}
                                    size="small"
                                />
                            </div>
                        }
                    </Fragment>
                }
            </Fragment>}
    </Translate >);
}

class PaymentModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showRefundPolicy: false
        }

        this.onSubmitSave = this.onSubmitSave.bind(this);
        this.onViewRefundPolicyClick = this.onViewRefundPolicyClick.bind(this);
        this.onHideRefundPolicyClick = this.onHideRefundPolicyClick.bind(this);

    }

    onViewRefundPolicyClick() {
        this.setState({
            showRefundPolicy: true
        })
    }

    onHideRefundPolicyClick() {
        this.setState({
            showRefundPolicy: false
        })
    }

    closeLabel() {
        return "Cancel";

    }

    hideCancelBtn() {
        if ((this.props.verifiedData != null && this.props.verifiedData.verified == true) || (this.props.paymentCompleteData != null && this.props.paymentCompleteData.isSaving == false && this.props.paymentCompleteData.isSuccessful != null && this.props.paymentCompleteData.isSuccessful == true))
            return true;
        return false;
    }

    submitLabel() {
        return "Continue";
    }

    onSubmitSave(values) {
        this.props.onSubmit(values);
    }


    hasResults() {
        if (this.props.idVerificationnResults != null && (this.props.idVerificationnResults.errors != null || this.props.idVerificationnResults.results != null)) return true;
        return false;
    }

    hideSaveBtn() {
        return false;
    }

    hasErrors() {
        if (this.props.paymentErrors != null && this.props.paymentErrors != "") return true;
        return false;
    }

    Verified() {
        if (this.props.paymentResults != null && this.props.paymentResults.verified != null && this.props.paymentResults.verified == true) return true;
        return false;
    }

    validationSchema() {

        let schemaObj = {
        };


        if ((this.props.paymentInfoData != null && this.props.paymentInfoData.countryCode != 'US') ||
            (this.props.paymentInfoData != null && this.props.paymentInfoData.countryCode == 'US' && this.props.paymentResults != null && this.props.paymentResults.required == false))
            return null;
        schemaObj["address"] = Yup.string().required("Address Line 1 is required");

        schemaObj["addressLine1"] = Yup.string().when("address", {
            is: "New Address",
            then: Yup.string().required("Address Line 1 is required"),
        });
        schemaObj["city"] = Yup.string().when("address", {
            is: "New Address",
            then: Yup.string().required("City is required"),
        });
        schemaObj["state"] = Yup.string().when("address", {
            is: "New Address",
            then: Yup.string().required("State is required"),
        });
        schemaObj["zip"] = Yup.string().when("address", {
            is: "New Address",
            then: Yup.string().required("Zip/Postal Code is required"),
        });

        return Yup.object(schemaObj);
    }

    render() {
        const {
            assessment,
            isModalVisible,
            onSubmit,
            onHideModal,
            paymentResults,
            isSubmittingPayment,
            isCompletePayment,
            paymentErrors,
            paymentInfoData,
            verifiedData,
            statesData,
            paymentCompleteData,
            doesDepositStepExist
        } = this.props;


        return isModalVisible &&
            <Translate>
                {({ translate }) => <Fragment>
                    <ModalWithFormWrapper
                        overrideIsSubmitting={isCompletePayment}
                        id={"PaymentModal"}
                        title={"Payment"}
                        isVisible={isModalVisible}
                        onHide={onHideModal}
                        onSubmit={this.onSubmitSave}
                        onCancel={onHideModal}
                        hideApply={this.hideSaveBtn()}
                        hideCancel={isSubmittingPayment || this.hideCancelBtn()}
                        closeButton={false}
                        backdrop='static'
                        showClearAndHide={false}
                        applyLbl={translate(this.submitLabel())}
                        cancelLbl={translate(this.closeLabel())}
                        isInitialValid={((paymentInfoData != null && paymentInfoData.countryCode != 'US') || (paymentInfoData != null && paymentInfoData.countryCode == 'US' && paymentResults != null && paymentResults.required == false)) ? true : false}
                        validationSchema={this.validationSchema()}
                        initialFormValues={{
                            address: "",
                            addressLine1: "",
                            addressLine2: "",
                            city: "",
                            state: "",
                            zip: "",
                            multipleaddress: "",
                        }}>
                        <FormBody assessment={assessment}
                            paymentResults={paymentResults}
                            hasErrors={this.hasErrors()}
                            isSubmittingPayment={isSubmittingPayment}
                            isCompletePayment={isCompletePayment}
                            paymentErrors={paymentErrors}
                            paymentInfoData={paymentInfoData}
                            verifiedData={verifiedData}
                            statesData={statesData}
                            onSubmit={this.props.onSubmit}
                            paymentCompleteData={paymentCompleteData}
                            showRefundPolicy={this.state.showRefundPolicy}
                            onViewRefundPolicyClick={this.onViewRefundPolicyClick}
                            onHideRefundPolicyClick={this.onHideRefundPolicyClick}
                            doesDepositStepExist={doesDepositStepExist}
                        />
                    </ModalWithFormWrapper>
                </Fragment>}
            </Translate>;
    }
}






export default PaymentModal;
