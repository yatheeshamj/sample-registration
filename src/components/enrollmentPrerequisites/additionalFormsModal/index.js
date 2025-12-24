
import React, { Fragment, Component } from 'react';
import { Translate } from 'spotify-shared-web/localize'
import ConfirmModal from "spotify-shared-web/components/common/ConfirmModal"
import AgreementBody from "../../agentType/agreements/AgreementBody"
import { Parser } from 'html-to-react';
import Button from 'spotify-shared-web/components/common/Button';
import SCREEN_CONFIG from '../../../screensConfig';

const CURRENT_SCREEN = SCREEN_CONFIG.agreementPage;


const htmlToReactParser = new Parser();

class AdditionalFormsModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasClickedSign: false,
            hasScrolledAgreement: false
        }
        this.handleScrolledAgreement = this.handleScrolledAgreement.bind(this);
        this.handleSignClick = this.handleSignClick.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);


    }


    handleScrolledAgreement = () => {
        this.setState({ hasScrolledAgreement: true });
    };

    handleSignClick = () => {
        this.setState({
            hasClickedSign: true
        });

    };

    handleCancelClick = () => {
        this.setState({
            hasClickedSign: false
        });
    };

    render() {

        const {
            agreementSigning,
            isModalVisible,
            onHideModal,
            onConfirmSignAgreementClick,
            closeButton = true,
            keyboard = true,
            backdrop = true,
            showDecline = false
        } = this.props;


        if (!isModalVisible) return <Fragment></Fragment>

        let agreementHTML = agreementSigning.data.template;

        if (agreementHTML.indexOf("<![CDATA[") === 0) {
            agreementHTML = agreementHTML.substr("<![CDATA[".length, agreementHTML.length - ("<![CDATA[]]>").length)
        }


        let agreementBody = htmlToReactParser.parse(agreementHTML, { trim: true });

        return <Translate>
            {({ translate }) => <Fragment>
                <ConfirmModal
                    title={`${agreementSigning.data.friendlyName}`}
                    isVisible={isModalVisible}
                    onHide={onHideModal}
                    hideCancel={true}
                    hideOk={true}
                    closeButton={closeButton}
                    keyboard={keyboard}
                    backdrop={backdrop}
                >
                    <Fragment>
                        <AgreementBody
                            isModal={true}
                            html={agreementHTML}
                            handleScrolledAgreement={this.handleScrolledAgreement}
                        />
                        <div className="">

                            <div className="">
                                {this.state.hasClickedSign ? (
                                    <>
                                        <p>{translate(`${CURRENT_SCREEN}.confirmSign`)}</p>
                                        <div className="d-flex justify-content-end">
                                            <Button
                                                style={{ marginRight: 10 }}
                                                variant='secondary'
                                                disabled={agreementSigning.isFetching}
                                                onClick={this.handleCancelClick}>
                                                {translate(`${CURRENT_SCREEN}.cancelButton`)}
                                            </Button>
                                            <Button
                                                onClick={() => onConfirmSignAgreementClick(agreementSigning.data)}
                                                isSubmitting={agreementSigning.isFetching}>
                                                {translate(`${CURRENT_SCREEN}.confirmButton`)}
                                            </Button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <p>
                                            {translate(`${CURRENT_SCREEN}.signAgreementDisclaimer`)}
                                        </p>
                                        <div className="d-flex justify-content-end">
                                            {
                                                showDecline == true &&
                                                <Button
                                                    style={{ marginRight: 10 }}
                                                    onClick={this.props.onDecline}
                                                    disabled={!this.state.hasScrolledAgreement}
                                                    variant='outline-primary'
                                                >
                                                    {translate(`${CURRENT_SCREEN}.declineButton`)}
                                                </Button>
                                            }
                                            <Button

                                                onClick={this.handleSignClick}
                                                disabled={!this.state.hasScrolledAgreement}>
                                                {translate(`${CURRENT_SCREEN}.signButton`)}
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </Fragment>
                </ConfirmModal>
            </Fragment>}
        </Translate>;
    }
}







export default AdditionalFormsModal;

