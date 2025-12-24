import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import styles from './ConfirmRestartAgentModal.module.scss';
import Modal from '../common/Modal';
import Button from 'spotify-shared-web/components/common/Button';
import LoadingComponent from 'spotify-shared-web/components/common/LoadingComponent';
import { Translate } from 'spotify-shared-web/localize';
import SCREEN_CONFIG from "../../screensConfig";

const CURRENT_SCREEN = SCREEN_CONFIG.confirmRestartAgentModal;

class ConfirmRestartAgentModal extends Component {

    processingRestartRequest = () => {

        const { admissionSteps, agentType } = this.props;

        if (agentType.removeAgentTypeInProgress || admissionSteps.isFetchInProgress) {
            return true;
        } else {
            return false;
        }
    }

    handleConfirmClick = () => {
        localStorage.setItem('FromContracterType', true);
        localStorage.setItem('isCheckboxChecked', true);
        this.props.handleConfirmClick();
    }

    render() {
        const {
            isOpen,
            handleCancelClick,
        } = this.props;

        return (
            <Translate>
                {({ translate }) => <>
                    <Modal isOpen={isOpen}>
                        {!this.processingRestartRequest() ? (
                            <div className={styles['confirm-modal']}>
                                {/* <p className={styles['confirm-modal__copy']}>
                                    {translate("All your current information for this contractor type will be deleted.")}
                                </p> */}
                                <p className={styles['confirm-modal__copy']}>
                                    {translate(`${CURRENT_SCREEN}.warning`)}
                                </p>
                                <div className={styles['confirm-modal__button-wrapper']}>
                                    <Button
                                        size="medium"
                                        type='button'
                                        variant='secondary'
                                        onClick={handleCancelClick}>
                                        {translate(`${CURRENT_SCREEN}.cancelButton`)}
                                    </Button>
                                    <Button
                                        size="medium"
                                        type='button'
                                        variant='primary'
                                        isSubmitting={this.processingRestartRequest()}
                                        onClick={this.handleConfirmClick}>
                                        {translate(`${CURRENT_SCREEN}.confirmButton`)}
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <LoadingComponent />
                        )}
                    </Modal>
                </>}
            </Translate>);
    }
}

function mapStateToProps({ agentType, admissionSteps }) {
    return { agentType, admissionSteps };
}

export default connect(
    mapStateToProps, {}
)(ConfirmRestartAgentModal);


