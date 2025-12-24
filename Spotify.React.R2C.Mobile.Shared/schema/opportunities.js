import React from "react"
import { normalize, schema } from "normalizr";
import { Translate } from "react-localize-redux";
import {
	OpportunityStatus
	, OpportunityEligibleStatuses
	, OpportunityIneligibleStatuses
	, OpportunityAnnouncementDocumentType
	, OpportunityEnrollmentInProgressStatuses
	, OpportunityInCertificationStatuses
	, Schedulefacility
	, OpportunityInProgressStatuses
} from "../constants"
import { getDateDifferenceInDays } from "../helpers/utils"
import { StatusFilterHelper } from "../helpers/opportunity"
import { DateTimeUtils } from "@microsoft/applicationinsights-common";
import * as moment from "moment";

const TranslateHelper = prop => prop

const _schema = new schema.Entity("Opportunities", {}, { idAttribute: 'crmId' });


export const setupData = (o, rescheduleCutoffTime, agentProfile) => {

	let _classStarted = false;

	let daysToRegistration = getDateDifferenceInDays(o.registrationDueDate);

	//TODO a course is full if >= max of either and all classes are full
	const _isCourseFull = o.availableSchedules.filter(x => x.isFull==false).length == 0;

	//#region 3rd Party Links

	let _hasSelfPaced = o.primaryClassSchedule && (o.primaryClassSchedule.facility === Schedulefacility.Absorb_LMS || o.primaryClassSchedule.facility === Schedulefacility.Accelerate_LMS);
	let _hasVirtualClassroom = o.primaryClassSchedule && (o.primaryClassSchedule.vcFacility === Schedulefacility.GOTOTraining || o.primaryClassSchedule.vcFacility === Schedulefacility.Zoom);
	let _isClassAccessDisabled = o.isClassAccessDisabled;

	//#endregion

	//#region Announcements

	let _pdfLink = o.opportunityAnnouncements.find(x => x.documentType === OpportunityAnnouncementDocumentType.PDF);
	let _videoLink = o.opportunityAnnouncements.find(x => x.documentType === OpportunityAnnouncementDocumentType.Video);


	//#endregion

	//#region Statuses
	let _isCertificationPassed = o.enrollmentStatus === OpportunityStatus.Passed;
	let _inProgress = StatusFilterHelper(OpportunityInProgressStatuses, o).length > 0;
	let _isEnrolledFullPayment = o.enrollmentStatus === OpportunityStatus.Enrolled_Full_Payment;
	let _isEligible = StatusFilterHelper(OpportunityEligibleStatuses, o).length > 0;
	let _isIneligible = StatusFilterHelper(OpportunityIneligibleStatuses, o).length > 0;
	let _isInCertification = StatusFilterHelper(OpportunityInCertificationStatuses, o).length > 0;
	var rescheduleCutoffTime = moment.utc().add(rescheduleCutoffTime, "minutes").format('YYYY-MM-DD HH:mm:ss');
	var primaryClassDate = rescheduleCutoffTime;
	if (o.primaryClassSchedule != null) {
		primaryClassDate = moment.utc(o.primaryClassSchedule.classStartDateTime).format('YYYY-MM-DD HH:mm:ss');
		//Check class Started or not
		let dt = o.primaryClassSchedule.classStartDateTime;
		if (agentProfile.countryCode != "UK")
			dt = moment.utc(o.primaryClassSchedule.classStartDateTime);
		let duration = moment.duration(dt.diff(moment().utc()));
		let minutes = Math.floor(duration.asMinutes());
		let hours = Math.floor(duration.asHours());
		let days = Math.floor(duration.asDays());

		if (days < 1 && hours < 1 && minutes < 30)
			_classStarted = true

		daysToRegistration = getDateDifferenceInDays(o.primaryClassSchedule.registrationDueDate);

	}
	let _isEnrolledClassSelfPaced = (o.primaryClassSchedule != null && o.primaryClassSchedule.selfPaced);
	//#endregion

	//#region Type

	let _isNewLearner = o.type === "New Learner";
	let _isCrossCertification = o.type === "Cross Certification";
	let _isSelfPace = o.type === "Self-Pace";

	//#endregion

	//#region ButtonFlags
	let _canReschedule = _isIneligible === false && o.availableSchedules.length > 0 && o.primaryClassSchedule != null && primaryClassDate > rescheduleCutoffTime && _isCourseFull === false && _isSelfPace == false && o.canRescheduleEnrollment;
	let _canCancel = _isIneligible === false && (o.enrollmentStatus === OpportunityStatus.Interested || o.enrollmentStatus === OpportunityStatus.Client_Qualified) && daysToRegistration > 0;
	let _canDrop = _isIneligible === false && o.primaryClassSchedule != null && !_classStarted && _isEnrolledFullPayment && (_isNewLearner || _isCrossCertification);
	//#endregion 


	return {
		...o,

		// anything styarting with _ has been calculated

		_isInCertification,
		_isCertificationPassed,
		_isEligible,
		_isIneligible,
		_pdfLink,
		_videoLink,
		_hasSelfPaced,
		_hasVirtualClassroom,
		_canCancel,
		_isEnrolledFullPayment,
		_isCourseFull,
		_isNewLearner,
		_isCrossCertification,
		_isSelfPace,
		_inProgress,
		_canReschedule,
		_canDrop,
		_isClassAccessDisabled
	}

}

export const extractListData = (opportunities, rescheduleCutoffTime, agentProfile) => {

	let opportunitiesPayload = opportunities.map((o) => setupData(o, rescheduleCutoffTime, agentProfile));


	const wrangledData = normalize(opportunitiesPayload, [_schema]);
	const defaultSortOrder = wrangledData.result;
	const Opportunities = wrangledData.entities.Opportunities;

	return {
		data: Opportunities,
		ids: defaultSortOrder
	}
}

