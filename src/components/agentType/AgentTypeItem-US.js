import React, { Component } from 'react';
import styles from './AgentTypeItemNew.module.scss';
import { connect } from 'react-redux';
import Button from 'spotify-shared-web/components/common/Button';
import { selectBusinessPath, changePatch } from '../../actions/agentTypeActions';
import { updateAdmissionStepInstances } from '../../actions/admissionStepActions';
import { AdmissionStep, AgentPath, Country } from '../../constants';
import { Translate } from 'spotify-shared-web/localize'
import ConfirmRestartAgentModal from './ConfirmRestartAgentModal';
import commonStyle from '../shared/CommonStyle.module.scss';
import SCREEN_CONFIG from "../../screensConfig";

const CURRENT_SCREEN = SCREEN_CONFIG.otherRegistration;

class AgentTypeItem extends Component {

    state = {
        isRestartModalOpen: false
    };

    completeAgentType = () => {

        const { agentTypeStep, admissionSteps, updateAdmissionStepInstances } = this.props;
        const idx = admissionSteps.steps.findIndex(step => step.uniqueId === AdmissionStep.AGENT_TYPE);

        if (idx !== -1) {
            admissionSteps.steps[idx].childSteps.map(step => {
                step.available = false;
                if (step.name === agentTypeStep.name) {
                    step.inProgress = true;
                    if (step.childSteps) {
                        step.childSteps[0].inProgress = true;
                    }
                }
            })
            updateAdmissionStepInstances(admissionSteps.steps);
        }
    }

    handleAgentTypeSelect = () => {

        const { agentTypeStep, agentId, currentStep } = this.props;

        this.props.changePatch(agentId,
            currentStep.uniqueId,
            agentTypeStep.uniqueId,
            this.getAgentPathFromName(agentTypeStep.uniqueId));

        /*this.props.selectBusinessPath(
            agentId,
            this.getAgentPathFromName(agentTypeStep.uniqueId)
        ); */
    };

    getAgentPathFromName = (agentTypeName) => {

        switch (agentTypeName) {
            case AdmissionStep.SOLE_PROPRIETOR:
                return AgentPath.SOLE_PROPRIETOR;
            case AdmissionStep.NEW_CALL_CENTER:
                return AgentPath.NEW_CALL_CENTER;
            case AdmissionStep.JOIN_BUSINESS:
                return AgentPath.JOIN_BUSINESS;
            default:
                return null;
        }
    };

    getPathName = (pathUniqueId, translate) => {
        switch (pathUniqueId) {
            case AdmissionStep.SOLE_PROPRIETOR:
                return translate(`${CURRENT_SCREEN}.resgisterAsSoleProprietor`);
            case AdmissionStep.NEW_CALL_CENTER:
                return translate(`${CURRENT_SCREEN}.registerYourCompany`);
            case AdmissionStep.JOIN_BUSINESS:
                return translate(`${CURRENT_SCREEN}.joinAServicePartner`);
            default:
                return null;
        }
    }

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
        this.handleAgentTypeSelect();
    };

    render() {
        const { agentTypeStep, agentImageStringMapping, currentStep } = this.props;


        return (
            <Translate>
                {({ translate }) => <>
                    <div className={`d-md-flex ${styles['card-new']} `}>
                        <div className="m-auto m-auto">
                            <img className={` ${styles['img-us']}`}
                                src={agentImageStringMapping[agentTypeStep.uniqueId]}
                                alt=''
                            />
                        </div>
                        <div className={`${styles['description']} ${commonStyle['card-description-style-us2']}`}>

                            <p className={styles['agent-item__content-wrapper--description']}>
                                {/* {translate(`${CURRENT_SCREEN}.${agentTypeStep.message}`)} */}
                                {agentTypeStep.message}
                            </p>

                            <Button
                                id={"btn_" + agentTypeStep.uniqueId + "_ContractorType"}
                                type='button'
                                size='block'
                                onClick={this.handleRestartModalOpen}

                            >
                                {this.getPathName(agentTypeStep.uniqueId, translate)}
                            </Button>
                        </div>

                    </div>
                    <ConfirmRestartAgentModal
                        isOpen={this.state.isRestartModalOpen}
                        onRequestClose={this.handleRestartModalClose}
                        handleCancelClick={this.handleRestartModalClose}
                        handleConfirmClick={this.handleRestartModalConfirm}
                    />

                </>}
            </Translate>);
    }
}

const mapStateToProps = ({ agentProfile, registration, admissionSteps }) => {
    const agentCountryId = agentProfile.countryId;
    const countries = registration.profile.formOptions.countries;
    return {
        agentCountryId,
        countries,
        admissionSteps,
    };
};

export default connect(
    mapStateToProps,
    {
        selectBusinessPath,
        updateAdmissionStepInstances,
        changePatch,
    }
)(AgentTypeItem);
