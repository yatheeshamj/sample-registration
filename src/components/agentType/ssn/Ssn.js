import React, { Component } from 'react';
import { connect } from 'react-redux';
import SsnFormContainer from '../uniqueIdentity/UniqueIdFormContainer';

class Ssn extends Component {
    render() {
        return (
            <div>
                <SsnFormContainer
                    hideSSNFields={this.props.hideSSNFields}
                    agentProfile={this.props.agentProfile}
                    restartText={this.props.restartText}
                    handleRestartClick={this.props.handleRestartClick}
                    btnNextId={this.props.btnNextId}
                    changeTypeBtnId={this.props.changeTypeBtnId}

                />
            </div>
        );
    }
}

function mapStateToProps({ agentType }) {
    return { agentType };
}

export default connect(mapStateToProps)(Ssn);
