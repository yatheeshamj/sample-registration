import React, { Component } from 'react';
import styles from './AgentTypeItem.module.scss';
import { connect } from 'react-redux';
import Button from 'spotify-shared-web/components/common/Button';
import { selectBusinessPath } from '../../actions/agentTypeActions';
import { updateAdmissionStepInstances } from '../../actions/admissionStepActions';
import { AdmissionStep, AgentPath, Country } from '../../constants';
import { Translate } from 'spotify-shared-web/localize'
import { Modal } from 'antd'


const CURRENT_SCREEN = 'uniqueIdentification';

class AgentTypeItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            agreed: false
        };
    }

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
        const { agentTypeStep, agentId, showIndiviualTaxIdModal } = this.props;

        if (agentTypeStep.name !== "Register a Sole Proprietorship" || !showIndiviualTaxIdModal) {
            this.props.selectBusinessPath(
                agentId,
                this.getAgentPathFromName(agentTypeStep.uniqueId)
            );

        } else {
            this.setState({ showModal: true });
        }



    };

    handleCloseModal = () => {
        // Close the modal
        this.setState({ showModal: false });
    };

    handleAgree = () => {

        this.setState({ agreed: true, showModal: false });


        const { agentTypeStep, agentId } = this.props;
        this.props.selectBusinessPath(
            agentId,
            this.getAgentPathFromName(agentTypeStep.uniqueId)
        );
    };

    // handleAgentTypeSelect = () => {

    //     const { agentTypeStep, agentId, agentCountryId, countries } = this.props;



    //     this.props.selectBusinessPath(
    //         agentId,
    //         this.getAgentPathFromName(agentTypeStep.uniqueId)
    //     );
    // };

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

    render() {
        const { agentTypeStep, agentImageStringMapping } = this.props;
        const { showModal } = this.state;


        return (
            <Translate>
                {({ translate }) => <>
                    <div className={`col-xl-3 col-lg-4 col-md-6 col-sm-12 pt-sm-3 pt-lg-0`}>
                        <div className={` ${styles['agent-item-card']}`}>
                            <div className={`text-center`}>
                                <img className={`${styles['img-container']} `}
                                    src={agentImageStringMapping[agentTypeStep.uniqueId]}
                                    alt=''
                                />
                            </div>
                            <div className={styles['agent-item__content-wrapper']}>
                                <div className={styles['agent-item__content-wrapper--name']}>
                                    {<p dangerouslySetInnerHTML={{ __html: agentTypeStep.name.replace("®", "&reg;") }} />}
                                </div>
                                <h4 className={styles['agent-item__content-wrapper--description']}>
                                    {agentTypeStep.message}
                                </h4>
                            </div>
                            <div className={``}>
                                <Button
                                    id={"btn_" + agentTypeStep.uniqueId + "_ContractorType"}
                                    type='button'
                                    size='AgentType-Block'
                                    onClick={this.handleAgentTypeSelect}
                                >
                                    {translate(agentTypeStep.name)}

                                </Button>

                            </div>
                        </div>
                        <Modal
                            width={800}
                            open={showModal}
                            onCancel={this.handleCloseModal}
                            footer={null}
                        >
                            <h2>{translate(`${CURRENT_SCREEN}.indiviualTaxIdCheckBoxModalHeding`)}</h2>
                            {translate(`${CURRENT_SCREEN}.indiviualTaxIdCheckBoxModalTitle`)}
                            {translate(`${CURRENT_SCREEN}.indiviualTaxIdCheckBoxModalContent`)}
                            <br />
                            <div className={`${styles["agreeButtonGroup"]}`}>
                                <Button onClick={() => this.handleAgree()}>{translate(`${CURRENT_SCREEN}.agreeButton`)}</Button>
                                <Button onClick={() => this.handleCloseModal()} style={{ background: '#fb5151', borderColor: "#fb5151" }}>{translate(`${CURRENT_SCREEN}.declineButton`)}</Button>
                            </div>

                        </Modal>
                    </div>
                </>}
            </Translate>);
    }
}

const mapStateToProps = ({ agentProfile, registration, admissionSteps, app }) => {
    console.log("app ", app);
    const agentCountryId = agentProfile.countryId;
    const countries = registration.profile.formOptions.countries;
    const showIndiviualTaxIdModal = app.countryConfigurations.config.roleRegistrationScreen.soleProprietorScreen.verifyIdentity.fields.individualTaxIdConsentCheckBox.showModal
    return {
        agentCountryId,
        countries,
        admissionSteps,
        showIndiviualTaxIdModal,
        app
    };
};

export default connect(
    mapStateToProps,
    {
        selectBusinessPath,
        updateAdmissionStepInstances,
    }
)(AgentTypeItem);
