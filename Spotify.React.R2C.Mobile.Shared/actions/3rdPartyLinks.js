
import * as actions from "../actionTypes/3rdPartyLinks"

//
export const generateSelfPaced = (payload) => ({
    type: actions.GENERATE_SELF_PACED_LINK,
    payload
});

export const generateAbsorbLMS = (payload) => ({
	type: actions.GENERATE_ABSORB_LMS_LINK,
	payload
});

export const generateVirtualClassroom = (payload) => ({
    type: actions.GENERATE_VIRTUAL_CLASSROOM_LINK,
    payload
});

export const startPCScan = (payload) => ({
    type: actions.START_PCSCAN,
    payload
});

export const onPCScanCompleted = (payload) => ({
    type: actions.PCSCAN_COMPLETED,
    payload
});

export const clearPCScan = (payload) => ({
    type: actions.CLEAR_PCSCAN,
    payload
});

export const startPhotoIdVerification = (payload) => ({
    type: actions.START_PHOTOID_VERIFICATION,
    payload
});

export const generateCrowdhub = (payload) => ({
    type: actions.GENERATE_CROWD_HUB_LINK,
    payload
});


export const openBroswerLink = (payload) => ({
    type: actions.OPEN_BROSWER_LINK,
    payload
});
export const openBroswerLinkNewTab = (payload) => ({
    type: actions.OPEN_BROSWER_LINK_NEW_TAB,
    payload
});

export const openBrowserPostNewTab = (payload) => (
{
    type: actions.OPEN_BROWSER_POST_NEW_TAB,
    payload
}
);

export const openBroswerLinkNewWindow = (payload) => ({
    type: actions.OPEN_BROSWER_LINK_NEW_WINDOW,
    payload
});

export const openStarmatic = (payload) => ({
    type: actions.OPEN_Starmatic,
    payload
});

export const generateChatRoom = (payload) => ({
    type: actions.GENERATE_CHAT_ROOM_LINK,
    payload
});

export const generateKnowledgeZone = (payload) => ({
    type: actions.GENERATE_KNOWLEDGE_ZONE_LINK,
    payload
});

export const generatespotifyKnowledgeZone = (payload) => ({
    type: actions.GENERATE_spotify_KNOWLEDGE_ZONE_LINK,
    payload
});

export const generateInterviewIqLink = payload => ({
    type: actions.GENERATE_INTERVIEW_IQ_LINK,
    payload
});


export const generateVoiceLink = payload => ({
    type: actions.GENERATE_VOICE_LINK,
    payload
});

export const generateProgramLink = payload => ({
	type: actions.GENERATE_PROGRAM_LINK,
	payload
});

export const setResults = payload => ({
    type: actions.SET_RESULTS,
    payload
});

export const generateVALink = payload => ({
    type: actions.GENERATE_VA_LINK,
    payload
});

export const CheckspotifyKnowledgeZone = (payload) => ({
    type: actions.CHECK_spotify_KNOWLEDGE_ZONE_LINK,
    payload
});

export const SetspotifyKnowledgeZoneLink = (payload) => ({
    type: actions.SET_spotify_KNOWLEDGE_ZONE_LINK,
    payload
});

export const generateScreeningAssessmentLink = payload => ({
	type: actions.GENERATE_SCREENINGASSESSMENT_LINK,
	payload
});

export const generateLanguageIQLink = payload => ({
	type: actions.GENERATE_LANGUAGEIQ_LINK,
	payload
});

export const setisScreeningUrlGenerated=payload=>({
    type:actions.SET_IS_SCREENINGURL_GENERATED,
    payload
});

export const generateFingerPrintLink = payload => ({
	type: actions.GENERATE_FINGERPRINT_LINK,
	payload
});

export const setToInitial=()=>({
    type:actions.SET_TO_INITIAL
    });
