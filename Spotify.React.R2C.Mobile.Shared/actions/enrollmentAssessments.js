
import * as Actions from "../actionTypes/enrollmentAssessments"

export const getEnrollmentAssessmentsForOpportunity = (payload) => ({
    type: Actions.GET_Enrollment_Assessments_For_Opportunity,
    payload
});

export const getEnrollmentAssessmentsForOpportunitySucess = (payload) => ({
    type: Actions.GET_Enrollment_Assessments_For_Opportunity_SUCCESS,
    payload
});

export const getEnrollmentAssessmentsForOpportunityError = (payload) => ({
    type: Actions.GET_Enrollment_Assessments_For_Opportunity_ERROR,
    payload
});
