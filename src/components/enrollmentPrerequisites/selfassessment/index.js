
//framework & 3rd parties
import React, { Fragment, Component } from 'react';

import * as Yup from "yup"
import { connect } from 'react-redux';
import { Translate } from 'spotify-shared-web/localize'
import { Formik, Field, Form } from "formik";

import ModalWithFormWrapper from "spotify-shared-web/components/common/ModalWithForm"
import ErrorMessage from "spotify-shared-web/components/common/ErrorMessage"
import Checkbox from "spotify-shared-web/components/common/form/SingleCheckbox"



const FormBody = ({
	selfAssessmentQuestions,
	formProps // this is why we need to have a form body
}) => {

	return (<Translate>
		{({ translate }) => <Fragment>

			<Fragment>

				<p> {translate('Use this self assessment as a guide to identify your skills and aptitude for this specific program.')}</p>
				<p>{translate("You must check all pertinent items in order to move to the next step.")}</p>

				{selfAssessmentQuestions.map((selfAssessment, key) =>
					<Field
						name={"selfAssessment_" + key}
						label={selfAssessment}
						id={"selfAssessment_" + key}
						component={Checkbox}
						key={key}
					/>)}
			</Fragment>

		</Fragment>}
	</Translate >);
}

class SelfAssessmentModal extends Component {

	constructor(props) {
		super(props);
	}


	validationSchema() {

		let schemaObj = {
		};

		this.props.selfAssessmentQuestions.map((selfAssessment, key) => {
			schemaObj["selfAssessment_" + key] = Yup.bool().notOneOf([false], 'Required');
		});
		return Yup.object(schemaObj);
	}

	initialFormValues() {
		let schemaObj = {
		};
		this.props.selfAssessmentQuestions.map((selfAssessment, key) => {
			schemaObj["selfAssessment_" + key] = false;
		});

		this.validationSchema();

		return schemaObj;
	}


	render() {
		const {
			title,
			isModalVisible,
			onSubmit,
			onHideModal,
			onCancel,
			selfAssessmentQuestions,
		} = this.props;

		return <Translate>

			{({ translate }) => <Fragment>
				<ModalWithFormWrapper
					id={"SelfAssessmentModal"}
					title={title}
					isVisible={isModalVisible}
					onHide={onHideModal}
					onSubmit={this.props.onSubmit}
					showClearAndHide={false}
					onCancel={onCancel}
					closeButton={false}
					backdrop='static'
					applyLbl={translate("Save")}
					cancelLbl={translate("Cancel")}
					validationSchema={this.validationSchema()}
					initialFormValues={this.initialFormValues()}
				>
					<FormBody selfAssessmentQuestions={selfAssessmentQuestions}/>
				</ModalWithFormWrapper>
			</Fragment>}
		</Translate>;
	}
}







export default SelfAssessmentModal;

