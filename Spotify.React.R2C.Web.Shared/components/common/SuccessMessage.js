import React, { Component } from 'react';
import './ErrorMessage.module.scss';

class SuccessMessage extends Component {
  render() {
    const { title, message } = this.props;

    return (
		<div className="messages complete">
			<span className="messages-addon complete"></span>
			<div className="messages-body">
				<h3>{title}</h3>
				<p>{message}</p>
			</div>
		</div>
    );
  }
}

export default SuccessMessage;
