
import analytics from "./analytics"
import opportunities from "./opportunities"
import opportunityBoard from "./opportunityBoard"
import preferences from "./preferencesWatcher"
import opportunityDetailsPage from "./opportunityDetailsPage"
import countryWatcher from "./country"
import opportunityAnnouncementWacther from "./opportunityAnnouncement"
import _3rdPartyLinksWacther from "./3rdPartyLinks"
import enrolledProgramsWacther from "./enrolledPrograms"
import welcomeContent from "./welcomeContent"
import enrollmentPrerequisitesPage from "./enrollmentPrerequisitesPage"
import enrollmentSteps from "./enrollmentSteps"
import headerWatcher from "./headerWatcher"
import selfAssessmentsWatcher from "./selfAssessments"
import performanceMetricsWatcher from "./performanceMetrics"
import enrollmentAssessmentsWatcher from "./enrollmentAssessments"
import pccheckAssessmentWatcher from "./pcCheck"
import pcscanAssessmentWatcher from "./pcScan"
import globalParametersWatcher from "./globalParameters"
import identityVerificationWatcher from "./identityVerfication"
import agreementTemplatesWatcher from "./agreementTemplates"
import backgroundCheckWatcher from "./backgroundCheck"
import paymentWatcher from "./payment"
import photoIdWatcher from "./photoId"
import trnvalidationwatcher from "./trnvalidation"
import educationModuleWatcher from "./educationModule"


export default [
    analytics(),
    opportunities(),
    opportunityBoard(),
    opportunityDetailsPage(),
    countryWatcher(),
    opportunityAnnouncementWacther(),
    _3rdPartyLinksWacther(),
    enrolledProgramsWacther(),
    preferences(),
    welcomeContent(),
    enrollmentPrerequisitesPage(),
    enrollmentSteps(),
	headerWatcher(),
    selfAssessmentsWatcher(),
    performanceMetricsWatcher(),
	enrollmentAssessmentsWatcher(),
    pccheckAssessmentWatcher(),
	globalParametersWatcher(),
    identityVerificationWatcher(),
    agreementTemplatesWatcher(),
	backgroundCheckWatcher(),
    paymentWatcher(),
    photoIdWatcher(),
    trnvalidationwatcher(),
    pcscanAssessmentWatcher(),
    educationModuleWatcher()

]
