import React, { Component } from 'react';
import { connect } from 'react-redux';
import TrnFormContainer  from './TrnFormContainer';

class Trn extends Component {
    render() {
        return (
            <div> 
             <TrnFormContainer
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

export default connect(mapStateToProps)(Trn);
