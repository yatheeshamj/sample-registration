import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Parser } from 'html-to-react';
import Button from 'spotify-shared-web/components/common/Button';
import styles from './SignAgreement.module.scss';
import { Translate } from 'spotify-shared-web/localize'
import AgreementLayout from '../../layouts/AgreementLayout';
import AgreementBody from './AgreementBody';

import { signAgreement } from '../../../actions/legalDocsActions';

import { hideAgreementContent } from '../../../actions/agentTypeActions';
import LoadingComponent from 'spotify-shared-web/components/common/LoadingComponent';

import { USER_ID } from '../../../constants';
import SCREEN_CONFIG from '../../../screensConfig';

const CURRENT_SCREEN = SCREEN_CONFIG.agreementPage;



const htmlToReactParser = new Parser();

class SignAgreement extends Component {
    state = {
        hasClickedSign: false,
        hasScrolledAgreement: false
    };

    componentDidUpdate() {
        this.preloadSSN()
    }

    handleSignClick = () => {
        if (this.validateForm()) {
            this.setState({
                hasClickedSign: true
            });
        }
    };

    handleCancelClick = () => {
        this.setState({
            hasClickedSign: false
        });
    };

    handleScrolledAgreement = () => {
        this.setState({ hasScrolledAgreement: true });
    };


    removePunctuation = (strText) => {
        var re = /[^a-zA-Z0-9\s]+/g;

        strText = strText.replace(re, "");

        return strText;
    }

    removeWhiteSpace = (strText) => {
        var re = /\s+/g;

        strText = strText.replace(re, "");

        return strText;
    }

    removeLeadingAndTrailingWhiteSpace = (strText) => {
        var re = /^\s+|\s$/g;

        strText = strText.replace(re, "");

        return strText;
    }

    removeWordsInList = (strText, strListOfWordsToRemove) => {
        if (strListOfWordsToRemove != "") {
            var arrListOfWordsToRemove = strListOfWordsToRemove.split(",");
            var strWordToRemove;
            var intWordToRemove;

            for (intWordToRemove = 0; intWordToRemove < arrListOfWordsToRemove.length; intWordToRemove++) {
                strWordToRemove = this.removePunctuation(this.removeLeadingAndTrailingWhiteSpace(arrListOfWordsToRemove[intWordToRemove].toLowerCase()));

                var re = new RegExp("\\b" + strWordToRemove + "\\b", "gi");

                strText = strText.replace(re, "");
            }
        }

        return strText;
    }

    validateForm = () => {
        // This is the required fields section for the W9.

        var strMissingRequiredFields = "";

        if (document.getElementById("chkSoleProprietor") && document.getElementById("chkCCorporation") && document.getElementById("chkSCorporation") && document.getElementById("chkPartnership") && document.getElementById("chkTrustEstate") && document.getElementById("chkLLC") && document.getElementById("chkCorpOther") && document.getElementById("txtSSN1") && document.getElementById("txtSSN2") && document.getElementById("txtSSN3")) {

            if (document.getElementById("chkSoleProprietor").checked == false && document.getElementById("chkCCorporation").checked == false && document.getElementById("chkSCorporation").checked == false && document.getElementById("chkPartnership").checked == false && document.getElementById("chkTrustEstate").checked == false && document.getElementById("chkLLC").checked == false && document.getElementById("chkCorpOther").checked == false) {
                strMissingRequiredFields += "- Check appropriate box for federal tax classification\n";
            }

            if (document.getElementById("chkLLC").checked == true && document.getElementById("txtLLCClassification").value == "") {
                strMissingRequiredFields += "- LLC classification value\n";
            }

            if (strMissingRequiredFields != "") {
                alert("Please enter values for the following field(s):\n\n" + strMissingRequiredFields + "\nIf you require assistance then click on the Instructions button.");
                return false;
            }

            if (document.getElementById("chkCorpOther").checked == true) {
                alert("spotify doesn't accept the Other corporations classification.");
                return false;
            }

            /* if (this.props.isRegisterBusiness && document.getElementById("chkSoleProprietor").checked == true) {
                 alert("spotify doesn't accept Individual/Sole proprietor corporations.");
                 return false;
             } */

            if (document.getElementById("chkPartnership").checked == true) {
                alert("spotify doesn't accept Partnership corporations.");
                return false;
            }

            if (document.getElementById("chkTrustEstate").checked == true) {
                alert("spotify doesn't accept Trust/estate corporations.");
                return false;
            }

            if (document.getElementById("chkLLC").checked == true) {
                var strW9AllowedLLCClassificationList = "C,S,P";

                var strLLCClassification = document.getElementById("txtLLCClassification").value;

                strLLCClassification = this.removePunctuation(strLLCClassification)

                strLLCClassification = this.removeWordsInList(strLLCClassification, strW9AllowedLLCClassificationList);

                strLLCClassification = this.removeWhiteSpace(strLLCClassification);

                if (strLLCClassification != "") {
                    var arrW9AllowedLLCClassification = strW9AllowedLLCClassificationList.split(",");

                    var strW9AllowedLLCClassificationText = "";

                    var intLLCClassificationNum;

                    for (intLLCClassificationNum = 0; intLLCClassificationNum < arrW9AllowedLLCClassification.length; intLLCClassificationNum++) {
                        strW9AllowedLLCClassificationText += "- " + arrW9AllowedLLCClassification[intLLCClassificationNum] + "\n";
                    }

                    alert("The types of \"Other\" corporations that spotify accepts are:\n\n" + strW9AllowedLLCClassificationText);
                    document.getElementById("txtLLCClassification").focus();
                    return false;
                }
            }

            if (document.getElementById("chkLLC").checked == false && document.getElementById("txtLLCClassification").value != "") {
                alert("Since you have entered a value for the \"LLC Classification\" field, please check the \"Other\" checkbox.");
                return false;
            }

            if (this.props.isRegisterBusiness && (document.getElementById("txtSSN1").value != "" || document.getElementById("txtSSN2").value != "" || document.getElementById("txtSSN3").value != "")) {
                alert("Please don't enter a value for the Social security number.");
                document.getElementById("txtSSN1").focus();
                return false;
            }

            return true;
        } else return true
    }

    preloadSSN = () => {

        if (document.getElementById('txtSSN1')) {

            var ssn = document.getElementById('hfSSN') && document.getElementById('hfSSN').value;
            var valid = this.validateSSN(ssn);

            if (!valid) {
                this.setSSNAccess(false);
                return;
            }

            if (ssn.length === 9 && !(ssn.indexOf('-') > -1)) {
                this.setSSN(ssn.slice(0, 3), ssn.slice(3, 5), ssn.slice(5, 9));
            } else {
                var array = ssn.split('-'), a = array[0], b = array[1], c = array[2];
                if (array.length === 3) {
                    this.setSSN(a, b, c);
                }
            }
        }
    }

    setSSN = (a, b, c) => {
        document.getElementById('txtSSN1').value = a;
        document.getElementById('txtSSN2').value = b;
        document.getElementById('txtSSN3').value = c;
    }

    setSSNAccess = (disabled) => {
        document.getElementById("txtSSN1").disabled = disabled;
        document.getElementById("txtSSN2").disabled = disabled;
        document.getElementById("txtSSN3").disabled = disabled;
    }

    validateSSN = (elementValue) => {
        var ssnPattern = /^[0-9]{3}\-?[0-9]{2}\-?[0-9]{4}$/;
        return ssnPattern.test(elementValue);
    }

    getAgreementUserInput = () => {
        let userInput = [];

        if (document.getElementById("chkCCorporation") && document.getElementById("chkSCorporation") && document.getElementById("chkLLC")
            && document.getElementById("chkSoleProprietor")) {


            if (document.getElementById("chkCCorporation").checked === true || document.getElementById("chkSCorporation").checked === true || document.getElementById("chkLLC").checked === true
                || document.getElementById("chkSoleProprietor").checked === true) {
                userInput.push(
                    {
                        Id: document.getElementById("chkCCorporation").checked === true ? "chkCCorporation" : document.getElementById("chkSCorporation").checked === true ? "chkSCorporation" : document.getElementById("chkSoleProprietor").checked === true ? "chkSoleProprietor" : "chkLLC",
                        HtmlData: document.getElementById("chkCCorporation").checked === true ? document.getElementById("chkCCorporation").outerHTML : document.getElementById("chkSCorporation").checked === true ? document.getElementById("chkSCorporation").outerHTML : document.getElementById("chkLLC").outerHTML,
                        Type: "checkbox"
                    }
                )
            }

            if (document.getElementById("txtLLCClassification") && document.getElementById("txtLLCClassification").value !== "") {
                userInput.push(
                    {
                        Id: "txtLLCClassification",
                        Type: "text",
                        HtmlData: document.getElementById("txtLLCClassification").outerHTML,
                        Value: document.getElementById("txtLLCClassification").value
                    }
                )
            }

            if (document.getElementById("txtAccountNumbers") && document.getElementById("txtAccountNumbers").value !== "") {
                userInput.push(
                    {
                        Id: "txtAccountNumbers",
                        Type: "text",
                        HtmlData: document.getElementById("txtAccountNumbers").outerHTML,
                        Value: document.getElementById("txtAccountNumbers").value
                    }
                )
            }

            if (document.getElementById("txtRequestersNameAndAddress") && document.getElementById("txtRequestersNameAndAddress").value !== "") {
                userInput.push(
                    {
                        Id: "txtRequestersNameAndAddress",
                        Type: "textarea",
                        HtmlData: document.getElementById("txtRequestersNameAndAddress").outerHTML,
                        Value: document.getElementById("txtRequestersNameAndAddress").value
                    }
                )
            }
            
            if (document.getElementById("chkCorpOther3b") && document.getElementById("chkCorpOther3b").checked == true) {
                userInput.push(
                    {
                        Id: "chkCorpOther3b",
                        HtmlData: document.getElementById("chkCorpOther3b").outerHTML,
                        Type: "checkbox"
                    }
                )
            }

        }
        return userInput;
    }


    render() {
        const { legalDocs, agentProfile, logoutRedirect } = this.props;

        let agreementBody;
        let agreementHTML
        if (legalDocs.currentViewedAgreement) {
            agreementHTML = legalDocs.currentViewedAgreement.agreementBody;
            agreementBody = htmlToReactParser.parse(agreementHTML);

        }



        return (<Translate>
            {({ translate }) => <>
                <h2>{translate(`${CURRENT_SCREEN}.heading`)}</h2>
                {legalDocs.isFetchAgreementConentComplete ? (
                    <AgreementLayout
                        headerTitle={legalDocs.currentViewedAgreement.templateName}
                        navTitle={`${USER_ID}: ${agentProfile.agentId}`}
                        buttonName='Logout'
                        handleClick={logoutRedirect}
                        showProgress={false}
                    >
                        <div className='row'>
                            <div className='col-md-12'>
                                <AgreementBody
                                    content={agreementBody}
                                    handleScrolledAgreement={this.handleScrolledAgreement}
                                    html={agreementHTML}
                                />
                                <div className={styles['agreement-footer']}>
                                    <div className={styles['back-link']}>
                                        <button
                                            type='button'
                                            onClick={this.props.hideAgreementContent}
                                        >
                                            {translate(`${CURRENT_SCREEN}.backButton`)}
                                        </button>
                                    </div>
                                    <div className={styles['agreement-footer__sign']}>
                                        {this.state.hasClickedSign ? (
                                            <>
                                                <p>{translate(`${CURRENT_SCREEN}.confirmSign`)}</p>
                                                <div className={styles['button-wrapper']}>
                                                    <Button
                                                        id="btnCancelAgreement"
                                                        size="medium"
                                                        variant='secondary'
                                                        onClick={this.handleCancelClick}
                                                    >
                                                        {translate(`${CURRENT_SCREEN}.cancelButton`)}
                                                    </Button>
                                                    <Button
                                                        id="btnConfirmAgreement"
                                                        size="medium"
                                                        onClick={() => {
                                                            const ArgumentData = this.getAgreementUserInput()
                                                            this.validateForm() ?
                                                                this.props.signAgreement(
                                                                    legalDocs.currentViewedAgreement.templateId,
                                                                    legalDocs.currentViewedAgreement.agreementBody,
                                                                    agentProfile.agentId,
                                                                    legalDocs.currentViewedAgreement
                                                                        .agreementSecondSignatureId,
                                                                    ArgumentData

                                                                )
                                                                : undefined
                                                        }}
                                                        isSubmitting={legalDocs.isSigningAgreement}
                                                    >
                                                        {translate(`${CURRENT_SCREEN}.confirmButton`)}
                                                    </Button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <p>
                                                    {translate(`${CURRENT_SCREEN}.signAgreementDisclaimer`)}
                                                </p>
                                                <div className={styles['button-wrapper']}>
                                                    <Button
                                                        id="btnSignAgreement"
                                                        size="medium"
                                                        onClick={this.handleSignClick}
                                                        disabled={!this.state.hasScrolledAgreement}
                                                    >
                                                        {translate(`${CURRENT_SCREEN}.signButton`)}
                                                    </Button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AgreementLayout>
                ) : (
                    <LoadingComponent />
                )}
            </>}
        </Translate>
        );
    }
}

function mapStateToProps({ legalDocs, agentProfile }) {
    return { legalDocs, agentProfile };
}

export default connect(
    mapStateToProps,
    { signAgreement, hideAgreementContent }
)(SignAgreement);
