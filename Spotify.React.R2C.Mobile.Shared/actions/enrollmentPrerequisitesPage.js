import * as Actions from "../actionTypes/enrollmentPrerequisitesPage"


export const initializeEnrollmentPrerequisitesPage = payload => ({
    type: Actions.InitializeEnrollmentPrerequisitesPage,
    payload
});

export const initializeEnrollmentPrerequisitesPageComplete = payload => ({
    type: Actions.InitializeEnrollmentPrerequisitesPageComplete,
    payload
});

export const initializeEnrollmentPrerequisitesPageError = payload => ({
    type: Actions.InitializeEnrollmentPrerequisitesPageError,
    payload
});
