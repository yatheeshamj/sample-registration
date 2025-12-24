import React, { Component } from 'react'
import { connect } from 'react-redux';
import AadharFormContainer from './AadharFormContainer';
//import SsnFormContainer from '../ssn/SsnFormContainer';

class Aadhar extends Component {

  render() {
    return (
      <div>
       <AadharFormContainer agentProfile={this.props.agentProfile}
        hideSSNFields={this.props.hideSSNFields}
        btnNextId={this.props.btnNextId}
        changeTypeBtnId={this.props.changeTypeBtnId}
        handleRestartClick={this.props.handleRestartClick}
       ></AadharFormContainer> 

      </div>
    )
  }
}

function mapStateToProps({ agentType }) {
    return { agentType };
}

export default connect(mapStateToProps)(Aadhar);
