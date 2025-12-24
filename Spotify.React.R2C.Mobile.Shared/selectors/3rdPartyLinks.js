import { _3rdPartyLinkTypes } from "../constants"

export const interviewIqResults = state => state._3rdPartyLinks[_3rdPartyLinkTypes.INTERVIEW_IQ]

export const voiceAssessmentResults = state => state._3rdPartyLinks[_3rdPartyLinkTypes.VOICE]

export const programAssessmentResults = state => state._3rdPartyLinks[_3rdPartyLinkTypes.PROGRAM]

export const pcCheckResults = state => state._3rdPartyLinks[_3rdPartyLinkTypes.PC_CHECK]

export const spotifyknowledgeZoneResults = state => state._3rdPartyLinks["spotifyKnowledgeZoneLink"]
//export const knowledgeZoneResults = state => state._3rdPartyLinks[_3rdPartyLinkTypes.spotify_KNOWLEDGE_ZONE_LINK]
export const languageIQAssessmentResults = state => state._3rdPartyLinks[_3rdPartyLinkTypes.LANGUAGE_IQ]
export const isGenerateScreenAssessmentURLFailed = state => state._3rdPartyLinks["isScreeeningUrlGenerated"]
export const screenAssesmentServiceError = state => state._3rdPartyLinks[_3rdPartyLinkTypes.SCREENING_ASSESSMENT]
export const fingerPrintResults = state => state._3rdPartyLinks[_3rdPartyLinkTypes.FINGERPRINT]

