
//framework & 3rd parties
import React, { Fragment, Component } from 'react';
import classNames from "classnames";
import { Row, Col, Modal } from 'react-bootstrap';
import { Translate } from '../../../localize'
import PropTypes from 'prop-types';
import { Formik, Field, Form } from "formik";
import ConfirmModal from "../../common/ConfirmModal"
import ErrorMessage from "../../common/ErrorMessage"
import SuccessMessage from "../../common/SuccessMessage"
import SCREEN_CONFIG from "../../../../src/screensConfig";


const CURRENT_SCREEN = SCREEN_CONFIG.cancelEnrollment;



class CancelEnrollmentModal extends Component {

	constructor(props) {
		super(props)

		this.savedSuccessfully = this.savedSuccessfully.bind(this);
	}


	savedSuccessfully() {
		return this.props.enrollmentToCancel.isComplete;
	}

	okButtonLabel(translate) {

		if (this.savedSuccessfully())
			return `${translate(`${CURRENT_SCREEN}.viewOpportunities`)}`;
		else
			return `${translate(`${CURRENT_SCREEN}.cancelEnrollmentButton`)}`;

	}
	cancelButtonLabel(translate) {
		if (this.savedSuccessfully())
			return `${translate(`${CURRENT_SCREEN}.closeButton`)}`;
		else if (this.hasErrors())
			return `${translate(`${CURRENT_SCREEN}.closeButton`)}`;
		else
			return `${translate(`${CURRENT_SCREEN}.stayInClassButton`)}`;


	}

	hasErrors() {
		return this.props.enrollmentToCancel.error != null;

	}


	render() {
		const {

			isModalVisible,
			onSubmit,
			onHideModal,
			onCancel,
			enrollmentToCancel,
		} = this.props;

		return isModalVisible && <Translate>
			{({ translate }) => <Fragment>
				<ConfirmModal
					title={translate(`${CURRENT_SCREEN}.title`)}
					isVisible={isModalVisible}
					onHide={onHideModal}
					onSubmit={onSubmit}
					onCancel={onCancel}
					okLbl={(this.okButtonLabel(translate))}
					cancelLbl={(this.cancelButtonLabel(translate))}
					backdrop='static'
					closeButton={false}
					isSubmitting={enrollmentToCancel.isSubmitting}
					hideOk={this.hasErrors()}
					hideCancel={this.savedSuccessfully()}
				>

					<div>
						{this.hasErrors() == false && this.savedSuccessfully() == false &&
							<p>
								{translate(`${CURRENT_SCREEN}.description`)}
							</p>
						}
						{this.hasErrors() && <ErrorMessage
							title={`${translate(`${CURRENT_SCREEN}.rescheduleError`)}`}
							message={this.props.enrollmentToCancel.error} />
						}

						{this.savedSuccessfully() &&
							<SuccessMessage
								title={`${translate(`${CURRENT_SCREEN}.enrollmentCancelled`)}`}
								message={`${translate(`${CURRENT_SCREEN}.notice`)}`} />
						}

					</div>
				</ConfirmModal>
			</Fragment>}
		</Translate>;
	}
}


export default CancelEnrollmentModal;
