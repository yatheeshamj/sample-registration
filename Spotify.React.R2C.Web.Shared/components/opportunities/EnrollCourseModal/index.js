
//framework & 3rd parties
import React, { Fragment, Component } from 'react';
import { Translate } from '../../../localize';
import { Formik, Field, Form } from "formik";
import * as Yup from "yup"
import ModalWithFormWrapper from "../../common/ModalWithForm"
import formHelpers from 'spotify-shared/helpers/formHelpers'
import NumberFormat from 'react-number-format';
import { getDateDifferenceInDays } from "spotify-shared/helpers/utils"
import RadioButton from "../../common/form/RadioButton"
import { getTimeZoneForCountryByCurrency } from "spotify-shared/helpers/country"
import ErrorMessage from "../../common/ErrorMessage"
import Checkbox from "spotify-shared-web/components/common/form/CheckboxInput";
import { FooterLinks, Country } from '../../../../src/constants';
// FooterLinks

import SCREEN_CONFIG from "../../../../src/screensConfig";

const CURRENT_SCREEN = SCREEN_CONFIG.opportunitiesDetails;


const FormBody = ({
	opportunity,
	opportunityEnrolling,
	hasErrors,
	agentsCountry,
	doesDepositStepExist,
	checkforConflict,
	formProps // this is why we need to have a form body
}) => {


	let classLengthInDays = getDateDifferenceInDays(opportunity.courseEndDate, opportunity.classStartDate);
	const choices = ["true"]

	const tag = `<a class="link pointer" target="_blank" href="https://www.spotifyworkfromhome.com/wp-content/uploads/2022/07/No-Show-Fee-Policy.pdf" >View No-Show Policy</a>`;

	const getClassNameHelper = (schedule, translate) => {

		if (agentsCountry === Country.US) {
			return `${schedule.isFull ? "FULL - " : ""} ${schedule.daysOfWeek} ${formHelpers.formatTime(schedule.classStartDateTime)} - ${formHelpers.formatTimeAddHours(schedule.classStartDateTime, schedule.classDuration)} ${translate(`${CURRENT_SCREEN}.timeZone`)} estimated time to completion - ${schedule.estimatedHoursToCompleteSelfPacedCourse}`
	
		} else {
			return `${schedule.isFull ? "FULL - " : ""} ${schedule.daysOfWeek} ${formHelpers.formatTime(schedule.classStartDateTime)} - ${formHelpers.formatTimeAddHours(schedule.classStartDateTime, schedule.classDuration)} ${translate(`${CURRENT_SCREEN}.timeZone`)}`
	
		}
	
	}

	const getError = (error) => {
		if (error.includes("Auto-Qualify Failure (Auto):")) {
			const errorArray = error.replace("Auto-Qualify Failure (Auto):", "").split(";");
			return (
				<ul>
					{errorArray.map((item) => (
						<li>{item.split(":")[1]}</li>
					))}
				</ul>
			);
		} else return error;
	};

	//Api call to check for conflict on agent selects class
	const checkConflict = (classId) => {
		checkforConflict({ classId, oppId: opportunity.crmId, isEnroll: true });
	};

	return (<Translate>
		{({ translate }) => <Fragment>

			{/* {hasErrors === true &&
				<ErrorMessage
					title={`${translate('You are not eligible to Enroll')}`}
					message={opportunityEnrolling.error}
				/>
			} */}
			{hasErrors === true && (
				<ErrorMessage
					title={`${translate("You are not eligible to Enroll")}`}
					message={getError(opportunityEnrolling.error)}
				/>
			)}
			{hasErrors === false &&
				<Fragment>
					<ul>
						<li>{translate(`${CURRENT_SCREEN}.courseCost`)} : <NumberFormat value={opportunity.cost} displayType={'text'}
							thousandSeparator={true} prefix={translate(`${CURRENT_SCREEN}.currency`)} />
						</li>
						{opportunity.flatBGCFees > 0 && (<li>{translate(`${CURRENT_SCREEN}.bgcFees`)}: <NumberFormat value={opportunity.flatBGCFees} displayType={'text'}
							thousandSeparator={true} prefix={translate(`${CURRENT_SCREEN}.currency`)} /> (<a className="link pointer" target="_blank" href={agentsCountry == Country.JM ? FooterLinks.BACKGROUND_CHECK_POLICY_FOR_JM : FooterLinks.BACKGROUND_CHECK_POLICY}>{translate(`${CURRENT_SCREEN}.viewBgcPolicy`)}</a>)
						</li>)}

						{opportunity.classNoShowFees > 0 && doesDepositStepExist.length > 0 && <li>{translate("Class Confirmation Deposit")}: <NumberFormat value={opportunity.classNoShowFees} displayType={'text'}
							thousandSeparator={true} prefix={translate(`${CURRENT_SCREEN}.currency`)} /> <span>(<a className="link pointer" href={FooterLinks.CLASS_CONFIRMATION_POLICY} target="_blank">{translate(`${CURRENT_SCREEN}.viewClassConfirmPolicy`)}</a>)</span>
						</li>}

						<li>
							{formHelpers.formatShortDate(opportunity.classStartDate)} - {formHelpers.formatShortDate(opportunity.courseEndDate)}
						</li>
						<li>{translate(`${CURRENT_SCREEN}.registrationCloses`)}   {formHelpers.formatShortDate(opportunity.registrationDueDate)}</li>
					</ul>
					<Field
						required
						values={formProps.values}
						setFieldValue={formProps.setFieldValue}
						name={"SelectClass"}
						label={`${translate(`${CURRENT_SCREEN}.selectClass`)}`}
						hint={null}
						options={
							opportunity.availableSchedules.filter(schedule => schedule.isFull == false).map((schedule, key) => {
								return { value: schedule.crmId, label: getClassNameHelper(schedule, translate) }
							})
						}
						id={"SelectClass"}
						component={RadioButton}
						onClick={checkConflict}
					/>
					<Field
						disabled
						values={formProps.values}
						name={"FullClasses"}
						label={""}
						hint={null}
						options={
							opportunity.availableSchedules.filter(schedule => schedule.isFull == true).map((schedule, key) => {
								return { value: schedule.crmId, label: getClassNameHelper(schedule, translate) }
							})
						}
						id={"FullClasses"}
						component={RadioButton}
					/>


					{opportunity.classNoShowFees > 0 && doesDepositStepExist.length == 0 && <Field
						required
						value={formProps.values.ConsentClassNoShow}
						name={"ConsentClassNoShow"}
						label={`${translate(`${CURRENT_SCREEN}.iAgree`)} ${translate(`${CURRENT_SCREEN}.currency`)} ${opportunity.classNoShowFees} ${translate(`${CURRENT_SCREEN}.ifFail`)} ${tag}`}
						hint={null}
						options={
							choices.map((key) => {
								return { value: true, label: "ConsentClassNoShow" }
							})
						}
						id={"ConsentClassNoShow"}
						component={Checkbox}
					/>}

					{opportunity.classNoShowFees > 0 && doesDepositStepExist.length == 0 && <p>{translate(`${CURRENT_SCREEN}.disclaimer`)}</p>}

				</Fragment>
			}


		</Fragment>}
	</Translate>);
}

class EnrollCourseModal extends Component {

	constructor(props) {
		super(props);

		this.validationSchema = this.validationSchema.bind(this);
	}


	shouldShowEnrollCourseModal() {
		return this.props.opportunity && this.props.opportunity.crmId === this.props.opportunityEnrolling.id;
	}

	hasErrors() {
		return (this.props.opportunityEnrolling != null && this.props.opportunityEnrolling.error != null)
	}


	validationSchema() {
		const { opportunity, doesDepositStepExist } = this.props
		return Yup.object().shape({
			SelectClass: Yup.string().required('Required'),
			ConsentClassNoShow: opportunity.classNoShowFees > 0 && doesDepositStepExist && doesDepositStepExist.length == 0 ? Yup.boolean().required().oneOf([true], 'you must accept the terms') : Yup.boolean()
		});

	}


	render() {
		const {
			opportunity,
			title,
			isModalVisible,
			onSubmit,
			onHideModal,
			onCancel,
			opportunityEnrolling,
			agentsCountry,
			doesDepositStepExist,
			checkforConflict,
			isConflictDataFetching,
		} = this.props;

		return <Translate>
			{({ translate }) => <Fragment>
				<ModalWithFormWrapper
					overrideIsSubmitting={this.hasErrors()}
					id={"EnrollCourseModal"}
					title={title}
					isVisible={isModalVisible}
					onHide={onHideModal}
					onSubmit={onSubmit}
					showClearAndHide={false}
					onCancel={onCancel}
					applyLbl='Continue'
					closeButton={false}
					backdrop='static'
					hideApply={this.hasErrors()}
					validationSchema={this.validationSchema()}
					isSubmitButtonDisabled={isConflictDataFetching}
					initialFormValues={{
						SelectClass: "",
						FullClasses: "",
						ConsentClassNoShow: ""
					}}>
					<FormBody opportunity={opportunity} opportunityEnrolling={opportunityEnrolling} hasErrors={this.hasErrors()} agentsCountry={agentsCountry} doesDepositStepExist={doesDepositStepExist} checkforConflict={checkforConflict}/>
				</ModalWithFormWrapper>
			</Fragment>}
		</Translate>;
	}
}






export default EnrollCourseModal;
