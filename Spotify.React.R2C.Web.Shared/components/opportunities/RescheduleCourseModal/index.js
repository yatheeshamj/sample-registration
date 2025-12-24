
//framework & 3rd parties
import React, { Fragment, Component } from 'react';
import { Translate } from '../../../localize';
import { Formik, Field, Form } from "formik";
import ModalWithFormWrapper from "../../common/ModalWithForm"
import formHelpers from 'spotify-shared/helpers/formHelpers'
import NumberFormat from 'react-number-format';
import { getDateDifferenceInDays } from "spotify-shared/helpers/utils"
import RadioButton from "../../common/form/RadioButton"
import { getTimeZoneForCountryByCurrency } from "spotify-shared/helpers/country"
import ErrorMessage from "../../common/ErrorMessage"
import SuccessMessage from "../../common/SuccessMessage"
import * as Yup from "yup"



const getClassNameHelper = (startTime, classDuration, daysOfWeek, timeZone) => {

	return `${daysOfWeek} ${formHelpers.formatTime(startTime)} - ${formHelpers.formatTimeAddHours(startTime, classDuration)} ${timeZone}`
}

const FormBody = ({
	opportunity,
	enrollmentToReschedule,
	hasErrors,
	savedSuccessfully,
	checkforConflict,
	formProps // this is why we need to have a form body
}) => {


	let classLengthInDays = getDateDifferenceInDays(opportunity.courseEndDate, opportunity.classStartDate);
	const timeZone = getTimeZoneForCountryByCurrency(opportunity.currencyCode);

	//Api call to check for conflict on agent selects class
	const checkConflict=(classId)=>{
		checkforConflict({classId,oppId:opportunity.crmId})
	}


	return (<Translate>
		{({ translate }) => <Fragment>

			{enrollmentToReschedule != null && enrollmentToReschedule.error != null && <ErrorMessage
				title={`${translate('Reschedule Enrollment Error')}`}
				message={opportunityEnrolling.error} />
			}
			{savedSuccessfully === true &&
				<SuccessMessage
					title={`${translate('Class Rescheduled')}`}
				message={`${translate('The class time has been rescheduled successfully.')}`} />
			}
			{hasErrors === false && savedSuccessfully === false &&
				<Fragment>

					<ul>
						<li><NumberFormat value={opportunity.cost} displayType={'text'}
							thousandSeparator={true} prefix={opportunity.currencyCode} />
						</li>
						<li>
							{formHelpers.formatShortDate(opportunity.classStartDate)} - {formHelpers.formatShortDate(opportunity.courseEndDate)}
						</li>
						<li>{translate('Registration Closes')}   {formHelpers.formatShortDate(opportunity.registrationDueDate)}</li>
					</ul>

					<Field
						disabled
						values={formProps.values}
						setFieldValue={formProps.setFieldValue}
						name={"selectedClass"}
						label={translate('Selected Class')}
						options={
							[{ value: opportunity.primaryClassSchedule.crmId, label: getClassNameHelper(opportunity.primaryClassSchedule.classStartDateTime, opportunity.primaryClassSchedule.classDuration, opportunity.primaryClassSchedule.daysOfWeek, timeZone) }]
						}
						id={"selectedClass"}
						component={RadioButton}
					/>

					<Field
						required
						values={formProps.values}
						setFieldValue={formProps.setFieldValue}
						name={"newClass"}
						label={`${translate('Select New Class Time')}`}
						hint={null}
						options={
							opportunity.availableSchedules.filter(schedule => schedule.isFull == false).map((schedule, key) => {
								return { value: schedule.crmId, label: getClassNameHelper(schedule.classStartDateTime, schedule.classDuration, schedule.daysOfWeek, timeZone) }
							})
						}
						id={"newClass"}
						component={RadioButton}
						onClick={checkConflict}
					/>

					<p>Please note: rescheduling the class will result in losing any pre-work already completed in the current class. Choose your schedule carefully to avoid repeating your efforts. </p>
				</Fragment>
			}
        </Fragment>}
    </Translate>);
	}
	
class RescheduleCourseModal extends Component {

			constructor(props) {
		super(props);

		this.validationSchema = this.validationSchema.bind(this);
		this.savedSuccessfully = this.savedSuccessfully.bind(this);

	}

	okButtonLabel() {

		if (this.savedSuccessfully())
			return "View Opportunity";
		if (this.hasErrors())
			return "View Opportunity";
		else
			return "Reschedule Class Time";
	}

	cancelButtonLabel() {
		if (this.savedSuccessfully())
			return 'Close';
		else if (this.hasErrors())
			return "Close";
		else
			return "Stay in Class";
	}


	savedSuccessfully() {
		return this.props.enrollmentToReschedule.isComplete;
	}

	hasErrors() {
		return (this.props.enrollmentToReschedule != null && this.props.enrollmentToReschedule.errors != null);
	}


	validationSchema() {

			Yup.object().shape({
				newClass: Yup.string().required('Required'),
			});
		}
	
	getSelectedClass() {
		if (this.props.opportunity != null && this.props.opportunity.primaryClassSchedule != null)
			return this.props.opportunity.primaryClassSchedule.crmId;
		else
			return "";
	}

    render() {
        const {
			opportunity,
		title,
		isModalVisible,
		onSubmit,
		onHideModal,
		onCancel,
		enrollmentToReschedule,
		checkforConflict,
		isConflictDataFetching
	} = this.props;

        return <Translate>
			{({ translate }) => <Fragment>
				<ModalWithFormWrapper
					overrideIsSubmitting={this.savedSuccessfully()}
					id={"RescheduleCourseModal"}
					title={title}
					isVisible={isModalVisible}
					onHide={onHideModal}
					onSubmit={onSubmit}
					onCancel={onCancel}
					closeButton={false}
					backdrop='static'
					showClearAndHide={false}
					applyLbl={this.okButtonLabel()}
					cancelLbl={translate(this.cancelButtonLabel())}
					hideApply={this.hasErrors()}
					validationSchema={this.validationSchema()}
					isSubmitButtonDisabled={isConflictDataFetching}
					initialFormValues={{
						selectedClass: this.getSelectedClass(),
						newClass: ""
					}}>
					<FormBody opportunity={opportunity} enrollmentToReschedule={enrollmentToReschedule} hasErrors={this.hasErrors()} savedSuccessfully={this.savedSuccessfully()} checkforConflict={checkforConflict}/>
				</ModalWithFormWrapper>
			</Fragment>}
		</Translate>;
    }
}






export default RescheduleCourseModal;
