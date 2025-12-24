
import * as actions from "../actionTypes/enrolledPrograms"

export const getByAgent = payload => ({
    type: actions.ENROLLED_PROGRAM_GET_BY_AGENT,
    payload
})

export const getByAgentComplete = payload => ({
    type: actions.ENROLLED_PROGRAM_GET_BY_AGENT_COMPLETE,
    payload
})

export const getByAgentError = payload => ({
    type: actions.ENROLLED_PROGRAM_GET_BY_AGENT_ERROR,
    payload
})

export const stageEnrollmentToCancel = payload => ({
    type: actions.STAGE_CANCEL_ENROLLMENT,
    payload
})
export const cancelEnrollmentComplete = payload => ({
    type: actions.CANCEL_ENROLLMENT_COMPLETE,
    payload
})
export const cancelEnrollmentError = payload => ({
    type: actions.CANCEL_ENROLLMENT_ERROR,
    payload
})

export const cancelStagedEnrollment = (agentId, enrollmentId) => ({
	type: actions.CANCEL_STAGED_ENROLLMENT,
	payload: { agentId, enrollmentId }
})

export const cancelEnrollmentRefresh = (agentId, countryId, gotoOpportunities, isInProgressTab) => ({
	type: actions.CANCEL_ENROLLMENT_REFRESH,
	payload: { agentId, countryId, gotoOpportunities, isInProgressTab }
})

/*Drop Class */
export const stageEnrollmentToDrop = payload => ({
	type: actions.STAGE_DROP_ENROLLMENT,
	payload
})
export const dropStagedEnrollment = (agentId, opportunityId, opportunityStatusReasonId, agentSelfDropped) => ({
	type: actions.DROP_STAGED_ENROLLMENT,
	payload: { agentId, opportunityId, opportunityStatusReasonId, agentSelfDropped }
})
export const dropEnrollmentComplete = payload => ({
	type: actions.DROP_ENROLLMENT_COMPLETE,
	payload
})
export const dropEnrollmentError = payload => ({
	type: actions.DROP_ENROLLMENT_ERROR,
	payload
})

/* Status Reason */
export const getDropStatusReasons = payload => ({
	type: actions.GET_DROPSTATUSREASON,
	payload
})

export const getDropStatusReasonsComplete = (payload) => ({
	type: actions.GET_DROPSTATUSREASON_COMPLETED,
	payload
});

export const getDropStatusReasonsError = (payload) => ({
	type: actions.GET_DROPSTATUSREASON_ERROR,
	payload
});

/*Reschedule Class */
export const stageClassToReschedule = payload => ({
	type: actions.STAGE_CLASS_TORESCHEDULE,
	payload
})
export const rescheduleClass = (agentId, opportunityId, classId) => ({
	type: actions.RESCHEDULE_CLASS,
	payload: { agentId, opportunityId, classId }
})
export const rescheduleClassComplete = payload => ({
	type: actions.RESCHEDULE_CLASS_COMPLETE,
	payload
})
export const rescheduleClassError = payload => ({
	type: actions.RESCHEDULE_CLASS_ERROR,
	payload
})

export const checkEligiblity = (agentId, opportunityId) => ({
	type: actions.ELIGIBLITY_CHECK,
	payload: { agentId, opportunityId }
})
export const checkEligiblityComplete = payload => ({
	type: actions.ELIGIBLITY_CHECK_COMPLETE,
	payload
})
export const checkEligiblityError = payload => ({
	type: actions.ELIGIBLITY_CHECK_ERROR,
	payload
})

export const clearEligiblity = payload => ({
	type: actions.CLEAR_ELIGIBLITY_CHECK,
	payload
})

