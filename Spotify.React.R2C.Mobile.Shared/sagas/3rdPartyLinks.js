import { takeLatest, put, call, select, all, take, takeEvery, cancel } from "redux-saga/effects";
import * as ActionType from "../actionTypes/3rdPartyLinks"
import * as Actions from "../actions/3rdPartyLinks"
import * as _3rdPartyLinksApi from "../api/3rdPartyLinks"
import * as enrolledProgramsSelector from "../selectors/enrolledPrograms"
import * as agentProfileSelector from "../selectors/agentProfile"
import { _3rdPartyLinkTypes } from "../constants"
import * as linkSelector from "../selectors/3rdPartyLinks";
import { Schedulefacility, GlobalParameterTypes } from "../constants"
import * as globalParametersApi from "../api/globalParameters"
import * as enrollmentStepsActions from "../actions/enrollmentSteps"
import { byIdForAgent } from "../api/opportunities";


function* onSelfPaced(action) {
    try {
        const ipData = yield call(_3rdPartyLinksApi.getIpAddress, {});
        const ipAddress = ipData.ip;
        const agentProfile = yield select(agentProfileSelector.get);
        const props = {
            agentId: agentProfile.agentId,
            opportunitycrmId: action.payload.opportunitycrmId,
            ipAddress: ipAddress
        };
        console.log(action.payload, "LMS")

        if (action.payload.primaryClassSchedule.facility === Schedulefacility.Accelerate_LMS) {

        }

        if (action.payload.facility === Schedulefacility.Accelerate_LMS) {
            const lmsAccessURL = yield call(globalParametersApi.retrieveGlobalParameters, GlobalParameterTypes.LMS_ACCELERATE_AccessURL);

            if (lmsAccessURL)
                yield put(Actions.openBroswerLinkNewTab(lmsAccessURL))
        }
        else {
            if (action.payload.primaryClassSchedule.facility === Schedulefacility.Absorb_LMS) {
                //Absorb LMS
                const data = yield call(_3rdPartyLinksApi.torchServicesABsorbLMS, props);


                if (data)
                    yield put(Actions.openBroswerLinkNewTab(data))
            }

            else if (action.payload.primaryClassSchedule.facility === Schedulefacility.Accelerate_LMS) {
                //for centrical
                // const data = yield call(_3rdPartyLinksApi.torchServicesCentrical, props);
                const lmsAccessURL = yield call(globalParametersApi.retrieveGlobalParameters, GlobalParameterTypes.LMS_ACCELERATE_AccessURL);

                if (lmsAccessURL)
                    yield put(Actions.openBroswerLinkNewTab(lmsAccessURL))


            }
            else {
                const data = yield call(_3rdPartyLinksApi.torchServices, props);


                if (data)
                    yield put(Actions.openBroswerLinkNewTab(data))
            }




        }
    } catch (e) {
        alert("The Self Paced URL is missing.") // temp for testing remove
        window.console.log(e)
        yield put(Actions.setResults({
            key: _3rdPartyLinkTypes.SELF_PACED,
            data: {
                error: e
            }
        }))
    }
}

function* onGenerateAbsorbLMS(action) {
    try {
        const props = {
            agentId: action.payload.agentid,
            token: action.payload.token
        };
        const data = yield call(_3rdPartyLinksApi.getAbsorbLMSURL, props);

        console.log(data)
        if (data) {
            yield put(Actions.openBroswerLink(data));
            //localStorage.removeItem('showModels');
        }

        ////this code erroring out. 
        {/*} yield put(Actions.setResults({
			key: _3rdPartyLinkTypes.ABSORBLMS_URL,
			data
		})) */}

    } catch (e) {
        alert("The Absorb LMS URL is missing.")
        window.console.log(e)
        yield put(Actions.setResults({
            key: _3rdPartyLinkTypes.ABSORBLMS_URL,
            data: {
                error: e
            }
        }))
    }
}

function* onCrowdHub(action) {
    try {

        const { programCrmId, enrollmentId } = action.payload;
        const enrolledProgramData = yield select(enrolledProgramsSelector.getData);
        const enrolledProgram = enrolledProgramData[programCrmId];
        const agentProfile = yield select(agentProfileSelector.get);

        //if (enrolledProgram && enrolledProgram.bloomFire && enrolledProgram.bloomFire.ssoUrl) {
        //    let link = `${enrolledProgram.bloomFire.ssoUrl}${enrolledProgram.bloomFire.apiKey}`;
        //    yield put(Actions.openBroswerLinkNewTab(link))
        //} else {

        const props = {
            agentId: agentProfile.agentId,
            programCrmId,
            enrollmentId,
            ...enrolledProgram
        };
        const data = yield call(_3rdPartyLinksApi.crowdHubsWithInsert, props);

        console.log(data)
        if (data)
            yield put(Actions.openBroswerLinkNewTab(data))

        //this code erroring out. 
        {/*yield put(Actions.setResults({
            key: _3rdPartyLinkTypes.CROWD_HUB,
            data
        })) */}
        // }

    } catch (e) {
        alert("No Crowd Hub Link found for user")
        window.console.log(e)
        {/*yield put(Actions.setResults({
            key: _3rdPartyLinkTypes.CROWD_HUB,
            data: {
                error: e
            }
        })) */}
    }
}

function* onVirtualClassroom(action) {

    try {

        const primaryClassSchedule = action.payload.primaryClassSchedule;
        const enrollmentId = action.payload.enrollmentId;

        const agentProfile = yield select(agentProfileSelector.get);
        const props = {
            enrollmentids: enrollmentId//primaryClassSchedule.courseCrmId
            , scheduleids: primaryClassSchedule.crmId
            , agentId: agentProfile.agentId
        };
        const data = yield call(_3rdPartyLinksApi.GoToTrainings, props);

        

        // const data = "FACEAUTH";
        console.log(data)

        const apiProps = {
            data: data,
            enrollmentId: enrollmentId
        }
        var opportunityData = {
            agentId: agentProfile.agentId,
            opportunityId: action.payload.primaryClassSchedule.opportunityId,
        };


        if (data === "FACEAUTH") {
            yield put(Actions.startPhotoIdVerification(apiProps));
        } else if (data === "FIRSTCLASSDAY") {
            const oppData = yield call(byIdForAgent, opportunityData);
            const pcApiProps = { ...apiProps, rulesetId: oppData.pcCheckRulesetId }
            yield put(Actions.startPCScan(pcApiProps));
        } else {
            yield put(Actions.openBroswerLinkNewTab(data));
        }

        //this code erroring out. 
        {/* yield put(Actions.setResults({
            key: _3rdPartyLinkTypes.CHAT_ROOM,
            data
        })) */}
    } catch (e) {
        alert("No Link available ")
        window.console.log(e)
        yield put(Actions.setResults({
            key: _3rdPartyLinkTypes.CHAT_ROOM,
            data: {
                error: e
            }
        }))
    }

}

function* onGenerateKnowledgeZone(action) {

    try {
        const genericKnowledgeZoneProgram = yield select(enrolledProgramsSelector.getGenericKnowledgeZone)

        //if (genericKnowledgeZoneProgram && genericKnowledgeZoneProgram.bloomFire && genericKnowledgeZoneProgram.bloomFire.ssoUrl) {
        //    let link = `${genericKnowledgeZoneProgram.bloomFire.ssoUrl}${genericKnowledgeZoneProgram.bloomFire.apiKey}`;
        //    yield put(Actions.openBroswerLinkNewTab(link))
        //}

        const { programCrmId } = action.payload;
        const agentProfile = yield select(agentProfileSelector.get);
        const enrolledProgramData = yield select(enrolledProgramsSelector.getData);
        const enrolledProgram = enrolledProgramData[programCrmId];
        const props = {
            agentId: agentProfile.agentId,
            ...genericKnowledgeZoneProgram
        };
        const data = yield call(_3rdPartyLinksApi.KnowledgeZone, props);

        console.log(data)
        if (data)
            yield put(Actions.openBroswerLinkNewTab(data))

        //this code erroring out. 
        {/* yield put(Actions.setResults({
            key: _3rdPartyLinkTypes.KNOWLEDGE_ZONE,
            data
        })) */}


    } catch (e) {
        alert("No Link Available") // temp for testing remove
        window.console.log(e)
        yield put(Actions.setResults({
            key: _3rdPartyLinkTypes.KNOWLEDGE_ZONE,
            data: {
                error: e
            }
        }))
    }
}

function* onGenerateChatRoom(action) {
    try {
        const ipData = yield call(_3rdPartyLinksApi.getIpAddress, {});
        const ipAddress = ipData.ip;
        const programCrmId = action.payload;
        const agentProfile = yield select(agentProfileSelector.get);
        const props = {
            agentId: agentProfile.agentId,
            programCrmId,
            ipAddress
        };
        const data = yield call(_3rdPartyLinksApi.getChatRoom, props);

        if (data)
            yield put(Actions.openBroswerLinkNewTab(data))

        //this code erroring out. 
        {/* yield put(Actions.setResults({
            key: _3rdPartyLinkTypes.CHAT_ROOM,
            data
        })) */}
    } catch (e) {
        alert("Error") // temp for testing remove
        window.console.log(e)
        yield put(Actions.setResults({
            key: _3rdPartyLinkTypes.CHAT_ROOM,
            data: {
                error: e
            }
        }))
    }
}


function* onOpenStarmatic(action) {

    try {

        const ipData = yield call(_3rdPartyLinksApi.getIpAddress, {});
        const ipAddress = ipData.ip;
        const programCrmId = action.payload;
        const agentProfile = yield select(agentProfileSelector.get);

        const props = {
            agentId: agentProfile.agentId,
            programCrmId,
            ipAddress
        };
        const data = yield call(_3rdPartyLinksApi.getStarmatic, props);

        if (data) {
            const params = {
                redirectURL: data.redirectURL,
                authenticationToken: data.authenticationToken,
                userID: data.userID,
                name: 'Starmatic'
            }

            //F: 109051: Pen Test implementaton for Starmatic - Sensitive Info Included in URL
            yield put(Actions.openBrowserPostNewTab(params))
        }

        /*if (data)
            yield put(Actions.openBroswerLinkNewTab(data))*/

        //this code erroring out. 
        {/*yield put(Actions.setResults({
            key: _3rdPartyLinkTypes.Starmatic,
            data
        })) */}
    } catch (e) {
        alert("Error") // temp for testing remove
        window.console.log(e)
        yield put(Actions.setResults({
            key: _3rdPartyLinkTypes.Starmatic,
            data: {
                error: e
            }
        }))
    }


}

function* onGenerateInterviewIQLink(action) {


    try {
        const agentProfile = yield select(agentProfileSelector.get);
        const props = {
            agentId: agentProfile.agentId,
            opportunityId: action.payload.opportunityId,
            enrollmentId: action.payload.enrollmentId
        };
        const data = yield call(_3rdPartyLinksApi.requestNProcessInterviewIQ, props);
        if (data && data.success === false) throw data.message

        let url = data.applyURL;
        if (url)
            yield put(Actions.openBroswerLinkNewTab(url))

        //this code erroring out. 
        {/*yield put(Actions.setResults({
            key: _3rdPartyLinkTypes.INTERVIEW_IQ,
            data
        })) */}

    } catch (e) {
        alert("Error") // temp for testing remove
        window.console.log(e)
        yield put(Actions.setResults({
            key: _3rdPartyLinkTypes.INTERVIEW_IQ,
            data: {
                error: e
            }
        }))
    }

}


function* onGenerateVoiceLink(action) {


    try {
        const agentProfile = yield select(agentProfileSelector.get);
        const props = {
            agentId: agentProfile.agentId,
            enrollmentId: action.payload
        };
        const data = yield call(_3rdPartyLinksApi.requestNProcessVoice, props);

        if (data && data.success === false) throw data.message

        let url = data.applyURL;
        if (url)
            yield put(Actions.openBroswerLinkNewTab(url))

        //this code erroring out. 
        {/* yield put(Actions.setResults({
            key: _3rdPartyLinkTypes.VOICE,
            data
        })) */}

    } catch (e) {
        alert("Error") // temp for testing remove
        window.console.log(e)
        yield put(Actions.setResults({
            key: _3rdPartyLinkTypes.VOICE,
            data: {
                error: e
            }
        }))
    }
}

function* onGenerateProgramLink(action) {


    try {
        const agentProfile = yield select(agentProfileSelector.get);
        const { enrollmentId, opportunityId } = action.payload;

        const props = {
            agentId: agentProfile.agentId,
            enrollmentId,
            opportunityId
        };
        const data = yield call(_3rdPartyLinksApi.requestNProcessProgram, props);
        if (data && data.success === false) throw data.message

        let url = data.applyURL;
        if (url)
            yield put(Actions.openBroswerLinkNewTab(url))

        //this code erroring out. 
        {/*yield put(Actions.setResults({
            key: _3rdPartyLinkTypes.PROGRAM,
            data
        })) */}

    } catch (e) {
        alert("Error") // temp for testing remove
        window.console.log(e)
        yield put(Actions.setResults({
            key: _3rdPartyLinkTypes.PROGRAM,
            data: {
                error: e
            }
        }))
    }
}

function* onGenerateVALink(action) {
    try {
        const agentProfile = yield select(agentProfileSelector.get);

        const props = {
            agentId: agentProfile.agentId,
        };
        const data = yield call(_3rdPartyLinksApi.requestHelpBotLink, props);

        console.log(data)
        //let url = data.applyURL;
        //if (url)
        //    yield put(Actions.openBroswerLink(url))
        //yield put(Actions.setResults({
        //    key: _3rdPartyLinkTypes.VA,
        //    data
        //}))

    } catch (e) {

        window.console.log(e)
        yield put(Actions.setResults({
            key: _3rdPartyLinkTypes.VA,
            data: {
                error: e
            }
        }))
    }
}

function* onGeneratespotifyKnowledgeZone(action) {

    try {
        const link = yield select(linkSelector.spotifyknowledgeZoneResults);

        if (link && link.length > 0) {
            yield put(Actions.openBroswerLinkNewTab(link))
        }
        else {
            const agentProfile = yield select(agentProfileSelector.get);
            const props = {
                agentId: agentProfile.agentId
            };
            const data = yield call(_3rdPartyLinksApi.spotifyKnowledgeZone, props);

            if (data.length > 0) {
                yield put(Actions.SetspotifyKnowledgeZoneLink({
                    data
                }))

                yield put(Actions.openBroswerLinkNewTab(data))
            }
        }

    } catch (e) {
        alert("No spotify Knowledge Zone Link Available") // temp for testing remove
        window.console.log(e)
        yield put(Actions.setResults({
            key: _3rdPartyLinkTypes.spotify_KNOWLEDGE_ZONE_LINK,
            data: {
                error: e
            }
        }))
    }
}

function* onCheckspotifyKnowledgeZone(action) {
    try {

        const link = yield select(linkSelector.spotifyknowledgeZoneResults);

        if (!link) {
            const agentProfile = yield select(agentProfileSelector.get);
            const props = {
                agentId: agentProfile.agentId
            };

            const data = yield call(_3rdPartyLinksApi.spotifyKnowledgeZone, props);

            if (data.length > 0) {
                yield put(Actions.SetspotifyKnowledgeZoneLink({
                    data
                }))
            }
        }
    }
    catch (e) {
        //alert("Can not check Link") // temp for testing remove
        //window.console.log(e)
        yield put(Actions.SetspotifyKnowledgeZoneLink({
        }))
    }
}

function* onGenerateScreeningAssessmentLink(action) {
    try {
        const agentProfile = yield select(agentProfileSelector.get);
        //const { enrollmentId, opportunityId } = action.payload;

        const props = {
            agentId: agentProfile.agentId,
            countryId: agentProfile.countryId,
        };
        const data = yield call(_3rdPartyLinksApi.requestNProcessScreeningAssessment, props);
        if (data && data.success === false) throw data.message

        let url = data.redirectURL;
        if (url) {
            yield put(Actions.setisScreeningUrlGenerated(true))
            yield put(Actions.openBroswerLinkNewTab(url))
        }
    } catch (e) {

        yield put(Actions.setResults({
            key: _3rdPartyLinkTypes.SCREENING_ASSESSMENT,
            data: {
                error: e
            }
        }))

        yield put(Actions.setisScreeningUrlGenerated(false))
    }
}

function* onGenerateLanguageIQLink(action) {
    try {
        const agentProfile = yield select(agentProfileSelector.get);
        const { enrollmentId, opportunityId } = action.payload;

        const props = {
            agentId: agentProfile.agentId,
            enrollmentId,
            opportunityId
        };
        const data = yield call(_3rdPartyLinksApi.requestNProcessLanguageIQ, props);
        if (data && data.success === false) throw data.message

        let url = data.applyURL;
        if (url)
            yield put(Actions.openBroswerLinkNewTab(url))

        //this code erroring out. 
        {/*yield put(Actions.setResults({
            key: _3rdPartyLinkTypes.LANGUAGE_IQ,
            data
        })) */}

    } catch (e) {
        alert("Error") // temp for testing remove
        window.console.log(e)
        yield put(Actions.setResults({
            key: _3rdPartyLinkTypes.LANGUAGE_IQ,
            data: {
                error: e
            }
        }))
    }
}

function* onGenerateFingerPrintLink(action) {
    try {
        const agentProfile = yield select(agentProfileSelector.get);
        const { enrollmentId, opportunityId } = action.payload;

        const props = {
            agentId: agentProfile.agentId,
            enrollmentId,
            opportunityId
        };
        const data = yield call(_3rdPartyLinksApi.requestNProcessFingerPrint, props);

        // re query 
        let enrollmentProps = { agentId: props.agentId, enrollmentId: props.enrollmentId };
        yield put(enrollmentStepsActions.fetchEnrollmentSteps(enrollmentProps));

        //this code erroring out. 
        {/*yield put(Actions.setResults({
            key: _3rdPartyLinkTypes.FINGERPRINT,
            data
        })) */}

    } catch (e) {
        alert("Error") // temp for testing remove
        window.console.log(e)
        yield put(Actions.setResults({
            key: _3rdPartyLinkTypes.FINGERPRINT,
            data: {
                error: e
            }
        }))
    }
}

export default function* watcher() {
    yield takeLatest(ActionType.GENERATE_ABSORB_LMS_LINK, onGenerateAbsorbLMS);
    yield takeLatest(ActionType.GENERATE_SELF_PACED_LINK, onSelfPaced);
    yield takeLatest(ActionType.GENERATE_CROWD_HUB_LINK, onCrowdHub);
    yield takeLatest(ActionType.GENERATE_VIRTUAL_CLASSROOM_LINK, onVirtualClassroom);
    yield takeLatest(ActionType.GENERATE_KNOWLEDGE_ZONE_LINK, onGenerateKnowledgeZone);
    yield takeLatest(ActionType.GENERATE_CHAT_ROOM_LINK, onGenerateChatRoom);
    yield takeLatest(ActionType.OPEN_Starmatic, onOpenStarmatic);
    yield takeLatest(ActionType.GENERATE_INTERVIEW_IQ_LINK, onGenerateInterviewIQLink);
    yield takeLatest(ActionType.GENERATE_VOICE_LINK, onGenerateVoiceLink);
    yield takeLatest(ActionType.GENERATE_PROGRAM_LINK, onGenerateProgramLink);
    yield takeLatest(ActionType.GENERATE_VA_LINK, onGenerateVALink);
    yield takeLatest(ActionType.GENERATE_spotify_KNOWLEDGE_ZONE_LINK, onGeneratespotifyKnowledgeZone);
    yield takeLatest(ActionType.CHECK_spotify_KNOWLEDGE_ZONE_LINK, onCheckspotifyKnowledgeZone);

    yield takeLatest(ActionType.GENERATE_SCREENINGASSESSMENT_LINK, onGenerateScreeningAssessmentLink);
    yield takeLatest(ActionType.GENERATE_LANGUAGEIQ_LINK, onGenerateLanguageIQLink);
    yield takeLatest(ActionType.GENERATE_FINGERPRINT_LINK, onGenerateFingerPrintLink);
    yield takeLatest(ActionType.PCSCAN_COMPLETED, onVirtualClassroom);


}
