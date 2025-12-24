import "./index.scss"

//framework & 3rd parties
//framework & 3rd parties
import React, { Fragment, Component } from 'react';
import * as Yup from "yup"
import { Formik, Field, Form } from "formik";
import { Translate } from 'spotify-shared-web/localize'
import ErrorMessage from "spotify-shared-web/components/common/ErrorMessage"
import SuccessMessage from "spotify-shared-web/components/common/SuccessMessage"
import ModalWithFormWrapper from "spotify-shared-web/components/common/ModalWithForm"
import QuestionResults from "./questions";
import LoadingComponent from 'spotify-shared-web/components/common/LoadingComponent';
import { Hidden } from '@material-ui/core';
import RadioButton from "spotify-shared-web/components/common/form/RadioButton"




const FormBody = ({
	assessment,
	idVerificationnResults,
	hasQuestions,
	hasErrors,
	isSubmittingIdVerification,
	idVerificationErrors,
	isCompleteIdVerification,
	idVerificationQuestionData,
	savedSuccessfully,
	formProps // this is why we need to have a form body
}) => {


	return (<Translate>
		{({ translate }) =>
			<Fragment>
				{hasQuestions === true && idVerificationQuestionData != null
					&& idVerificationQuestionData.data != null
					&& idVerificationQuestionData.data.questionAndAnswer != null
					&& idVerificationQuestionData.data.questionAndAnswer.length > 0 &&
					<Fragment>
						{idVerificationQuestionData.data.questionAndAnswer.map((question, key) => {
							return <Field
								values={formProps.values}
								setFieldValue={formProps.setFieldValue}
								name={"question_" + key}
								label={question.questionText}
								options={
									question.choices.map((choice, key2) => {
										return { value: choice.item1, label: choice.item2 }
									})
								}
								id={"question_" + key}
								component={RadioButton}
							/>
						})
						}
					</Fragment>
				}

				{(hasErrors === true || (isCompleteIdVerification === true && savedSuccessfully === false)) &&
					<Fragment>
						<ErrorMessage
							title={`${translate('Failed to verify your identity')}`}
							message={`${translate('spotify has been unable to confirm your identity.')}`} />
					</Fragment>

				}

				{isSubmittingIdVerification === true &&
					<Fragment>
						<LoadingComponent />
					</Fragment>
				}

				{isCompleteIdVerification === true && savedSuccessfully == true && hasQuestions === false &&
					<Fragment>
						<SuccessMessage
							title={`${translate('Successfully Verified Your Identity')}`}
							message={`${translate('Thank you. Your identity has been verified.')}`} />
					</Fragment>
				}


				{hasErrors === false && hasQuestions === false && isSubmittingIdVerification === false && isCompleteIdVerification == false && savedSuccessfully == false &&
					<Fragment>


						<ul>
							{assessment.timeLimit != null && <li> Time Limit: {assessment.timeLimit}</li>}
							{assessment.averageTimeToComplete != null && <li>Average Time to Complete: {assessment.averageTimeToComplete}</li>}
							{assessment.averageWaitingTime != null && <li> Average Waiting Time: {assessment.averageWaitingTime}</li>}
						</ul>
						<div>Requirements</div>
						<ul>
						{assessment.enrollmentStepRequirements.sort((a, b) => b.sortOrder < a.sortOrder ? 1 : -1).map((r, key) => <li key={key}>{r.name}</li>)}
						</ul>
						<div dangerouslySetInnerHTML={{ __html: assessment.assessmentDetails }} />
					</Fragment>
				}


			</Fragment>}
	</Translate >);
}

class IdentityVerificationModal extends Component {

	constructor(props) {
		super(props);

		/*this.savedSuccessfully = this.savedSuccessfully.bind(this);*/
	}

	closeLabel() {
		if (this.hideSaveBtn())
			return "Close";
		return "Cancel";

	}

	submitLabel() {
		if (this.hasQuestions() == true)
			return "Submit";
		if (this.hasQuestions() == false && this.hasResults() == false)
			return "Start Prerequisite";
		else
			return "Hidden";

	}

	showCancelButton() {
		if (this.hasResults() || this.hasErrors())
			return false;
		else
			return true;
	}

	/*savedSuccessfully() {
		return (this.props.isCompleteIdVerification && (this.props.idVerificationErrors == null || this.props.idVerificationErrors === ''));
	}*/

	hasResults() {
		if (this.props.idVerificationnResults != null && (this.props.idVerificationnResults.errors != null || this.props.idVerificationnResults.results != null)) return true;
		return false;
	}

	hasQuestions() {
		if (this.props.idVerificationQuestionData != null && (this.props.idVerificationQuestionData.hasQuestions == true || this.props.idVerificationQuestionData.intialQuestions == true) && this.props.idVerificationQuestionData.data != null) return true;
		return false;
	}

	hideSaveBtn() {
		if ((this.hasQuestions() === false && (this.props.isSuccessfulIdVerification === true || this.hasErrors() === true)) || (this.hasQuestions() === false && this.props.idVerificationnResults && this.props.idVerificationnResults.reachedMaxAttempts === true))
			return true;
		return false;
	}

	hasErrors() {
		if (this.props.idVerificationErrors != null && this.props.idVerificationErrors != "") return true;
		return false;
	}

	validationSchema() {

		let schemaObj = {
		};

		if (this.props.idVerificationQuestionData.data != null && this.props.idVerificationQuestionData.data.questionAndAnswer != null) {
			this.props.idVerificationQuestionData.data.questionAndAnswer.map((question, key) => {
				schemaObj["question_" + key] = Yup.number().notOneOf([0], 'Required');
			});
			return Yup.object(schemaObj);
		}
		return null;
	}

	initialFormValues() {
		let schemaObj = {
		};

		if (this.props.idVerificationQuestionData.data != null && this.props.idVerificationQuestionData.data.questionAndAnswer != null) {
			this.props.idVerificationQuestionData.data.questionAndAnswer.map((question, key) => {
				schemaObj["question_" + key] = 0;
			});
			//this.validationSchema();
			return schemaObj;
		}

		return {};
	}

	render() {
		const {
			assessment,
			isModalVisible,
			onSubmit,
			onHideModal,
			idVerificationnResults,
			isSubmittingIdVerification,
			isCompleteIdVerification,
			idVerificationQuestionData,
			idVerificationErrors,
			isSuccessfulIdVerification,
		} = this.props;

		return isModalVisible &&
			<Translate>
				{({ translate }) => <Fragment>
					<ModalWithFormWrapper
						overrideIsSubmitting={isSuccessfulIdVerification}
						id={"PCCheckModal"}
						title={assessment.displayName}
						isVisible={isModalVisible}
						onHide={onHideModal}
						onSubmit={onSubmit}
						onCancel={onHideModal}
						hideApply={this.hideSaveBtn()}
						closeButton={false}
						backdrop='static'
						showClearAndHide={false}
						applyLbl={translate(this.submitLabel())}
						cancelLbl={translate(this.closeLabel())}
						isInitialValid={!this.hasQuestions()}
						validationSchema={this.validationSchema()}
						initialFormValues={this.initialFormValues()}>
						<FormBody assessment={assessment}
							idVerificationnResults={idVerificationnResults}
							hasErrors={this.hasErrors()}
							isSubmittingIdVerification={isSubmittingIdVerification}
							hasQuestions={this.hasQuestions()}
							isCompleteIdVerification={isCompleteIdVerification}
							idVerificationErrors={idVerificationErrors}
							idVerificationQuestionData={idVerificationQuestionData}
							savedSuccessfully={isSuccessfulIdVerification}
						/>
					</ModalWithFormWrapper>
				</Fragment>}
			</Translate>;
	}
}






export default IdentityVerificationModal;
