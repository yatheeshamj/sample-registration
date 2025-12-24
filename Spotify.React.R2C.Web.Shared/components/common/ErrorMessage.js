import React, { Component } from 'react';
import './ErrorMessage.module.scss';

class ErrorMessage extends Component {
  render() {
    const { title, message } = this.props;

    return (
		<div className="messages error">
			<span className="messages-addon error"></span>
			<div className="messages-body">
				<h3>{title}</h3>
				<p>{message}</p>
			</div>
		</div>
    );
  }
}

export default ErrorMessage;
