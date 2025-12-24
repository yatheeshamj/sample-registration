import { takeLatest, put, call, select, all, take, takeEvery, cancel } from "redux-saga/effects";
import * as ActionType from "../actionTypes/enrollmentPrerequisitesPage"
import * as Actions from "../actions/enrollmentPrerequisitesPage"
import * as agreementTemplatesActions from "../actions/agreementTemplates"
import * as enrollmentStepsSelector from "../selectors/enrollmentSteps"
import * as opportunityActions from "../actions/opportunities"
import * as opportunityActionTypes from "../actionTypes/opportunities"
import * as opportunitiesSelector from "../selectors/opportunities"
import * as enrollmentStepsActions from "../actions/enrollmentSteps"
import * as enrollmentStepsActionTypes from "../actionTypes/enrollmentSteps"
import * as selfAssessmentsActionTypes from "../actionTypes/selfassessments"
import * as selfAssessmentsActions from "../actions/selfassessments"
import { EnrollmentModuleNames, GlobalParameterTypes } from "../constants"
import * as agentProfileSelector from "../selectors/agentProfile"
import * as identityVerificationActions from "../actions/identityVerification"
import * as backgroundCheckActions from "../actions/backgroundCheck"
import * as paymentActions from "../actions/payment"
import * as photoIdActions from "../actions/photoId"
import { retrieveGlobalParameter } from "../actions/globalParameters";
import { getGlobalParameterByString } from "../selectors/globalParameters";
import { PollEnrollmentSignUrl } from "../actionTypes/agreementTemplates";
import { trnValidation } from "../actions";


// import * as globalparamactions from "../"



function* onInitializeEnrollmentPrerequisitesPage(action) {


	try {

		yield put(opportunityActions.fetchOpportunity(action.payload));

		yield put(enrollmentStepsActions.fetchEnrollmentSteps(action.payload));

		yield put(selfAssessmentsActions.fetchSelfAssessments(action.payload));

		yield all([
			take(opportunityActionTypes.FetchOpportunityComplete),
			take(enrollmentStepsActionTypes.FetchEnrollmentStepsComplete),
			take(selfAssessmentsActionTypes.fetchSelfAssessmentsComplete)
		]);


		// get opportunity, & Enrollment Steps 
		let opportunity = yield select(opportunitiesSelector.getById, action.payload.opportunityId)
		let allEnrollmentSteps = yield select(enrollmentStepsSelector.getData)
		const agentProfile = yield select(agentProfileSelector.get);

		//ADDITIONAL_FORMS
		let additionalFormStep = allEnrollmentSteps.find(x => x.userFacing && x.moduleName === EnrollmentModuleNames.ADDITIONAL_FORMS)
		if (additionalFormStep && additionalFormStep.available) {
		
			const agreementTemplatePayload = {
				agentId: agentProfile.agentId,
				clientId: opportunity.clientCrmId,
				enrollmentId: action.payload.enrollmentId,
				opportunityId: action.payload.opportunityId
			}
			yield put(agreementTemplatesActions.SearchTemplatesByClient(agreementTemplatePayload))
		}

		//IDENTITY_VERIFICATION
		let identityVerificationStep = allEnrollmentSteps.find(x => x.userFacing && x.moduleName === EnrollmentModuleNames.IDENTITY_VERIFICATION)
		if (identityVerificationStep && identityVerificationStep.available) {
			yield put(identityVerificationActions.checkIdentityStatus(action.payload));
			const {statusNotes}=identityVerificationStep
			if(statusNotes!=null && statusNotes.search(/transactionid/)!==-1){
				const data=statusNotes.split(":")
				console.log(data,"identity verification")
				const transactionid=data[1]
				yield put({
					type:PollEnrollmentSignUrl,
					payload:{muleSoftDocTransactionId:transactionid}
				})

			}

		}


		// BACKGROUND_CHECK
		let backgroundCheckStep = allEnrollmentSteps.find(x => x.userFacing && x.moduleName === EnrollmentModuleNames.BACKGROUND_CHECK)
		if (backgroundCheckStep && backgroundCheckStep.inProgress) {
			const bgProps = {
				agentId: agentProfile.agentId,
				enrollmentId: action.payload.enrollmentId,
			};
			yield put(backgroundCheckActions.getStatus(bgProps));
		}

		//PAY
		let payStep = allEnrollmentSteps.find(x => x.userFacing && x.moduleName === EnrollmentModuleNames.PAY)
		if (payStep && payStep.available) {
			const payProps = {
				agentId: agentProfile.agentId,
				enrollmentId: action.payload.enrollmentId,
			};
			yield put(paymentActions.getPaymentInfo(payProps));
			yield put(paymentActions.getStates(null));
		}
		//Noshow deposit
		let payStepNoShow = allEnrollmentSteps.find(x => x.userFacing && x.moduleName === EnrollmentModuleNames.DEPOSIT)
		if (payStepNoShow && payStepNoShow.available) {
			const payProps = {
				agentId: agentProfile.agentId,
				enrollmentId: action.payload.enrollmentId,
			};

			const noshowWindow=yield select(getGlobalParameterByString,GlobalParameterTypes.NO_SHOW_WINDOW)
            const noshowReinstate=yield select(getGlobalParameterByString,GlobalParameterTypes.NO_SHOW_REINSTATE)
            const noshowAutoDrop=yield select(getGlobalParameterByString,GlobalParameterTypes.NO_SHOW_AUTO_DROP)
            //make call if they dont exist already
            if(!noshowWindow) yield put(retrieveGlobalParameter(GlobalParameterTypes.NO_SHOW_WINDOW));
            if(!noshowAutoDrop) yield put(retrieveGlobalParameter(GlobalParameterTypes.NO_SHOW_AUTO_DROP));
            if(!noshowReinstate) yield put(retrieveGlobalParameter(GlobalParameterTypes.NO_SHOW_REINSTATE));
			yield put(paymentActions.getPaymentInfo(payProps));
			yield put(paymentActions.getStates(null));
			

		}

		//PHOTO_ID
		let photoIdStep = allEnrollmentSteps.find(x => x.userFacing && x.moduleName === EnrollmentModuleNames.PHOTO_ID)
		if (photoIdStep && photoIdStep.available) {
			const _photoProps = {
				agentId: agentProfile.agentId,
				enrollmentId: action.payload.enrollmentId,
			};
			yield put(photoIdActions.photoIdStatusSingle(_photoProps));

		}
		//TRNDetails
		let trnvalidtionStep=allEnrollmentSteps.find(x=>x.userFacing && x.moduleName===EnrollmentModuleNames.VERIFY_TRN)

		if(trnvalidtionStep && (trnvalidtionStep.available || trnValidation.inProgress)){
			
			yield put(trnValidation.getAgentTrnDetails())
		}

		yield put(Actions.initializeEnrollmentPrerequisitesPageComplete());

	} catch (ex) {


		yield put(Actions.initializeEnrollmentPrerequisitesPageError(ex));
	}
}

export default function* watcher() {
	yield takeLatest(ActionType.InitializeEnrollmentPrerequisitesPage, onInitializeEnrollmentPrerequisitesPage);
}
