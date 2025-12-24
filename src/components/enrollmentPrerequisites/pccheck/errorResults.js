import React, { Component } from 'react';
import "./index.scss"

class ErrorResults extends Component {
	render() {
		const { result, key } = this.props;

		return (
			<div className="pcResults">
				<div className="messages pcMessages" id="{key}">
					<div className="messages-header">
						<h3>{result.specName}</h3>
						<span>{result.requirement}</span>
					</div>
					<div className="pcErrorResults">
						<span className="messages-addon error"></span>
						<div className="messages-body">
							<h4>{result.specValue} Test Value for Now</h4>
							<span>
								{result.requirementCategory != null && result.requirementCategory.remedyTip != null &&
									<span>{result.requirementCategory.remedyTip}</span>
								}
								{result.requirementCategory != null && result.requirementCategory.learnUrl != null &&
									<a href="{result.requirementCategory.learnUrl}">Learn more</a>
								}
								<span>Remedy Tip </span>
								<a href="#">Learn more</a>
							</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ErrorResults;
