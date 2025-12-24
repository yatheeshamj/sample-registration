import { takeLatest, put, call, select, all, take, takeEvery, cancel } from "redux-saga/effects";

import * as ActionType from "../actionTypes/opportunityAnnouncement"
import * as Actions from "../actions/opportunityAnnouncement"
import * as opportunitiesApi from "../api/opportunities"
import * as agentProfileSelector from "../selectors/agentProfile"
import { REGISTRATION_BASE_URL } from "../../src/config";



function* onDownloadPDFForWeb(action) {

    let opportunityAnnouncement = action.payload;

    if (!opportunityAnnouncement) return alert("No Attachemnt Found")
    
    
    const agentProfile = yield select(agentProfileSelector.get);
    const opportunityData = yield call(opportunitiesApi.byIdForAgent, {agentId: agentProfile.agentId, opportunityId: opportunityAnnouncement.opportunityId });
    console.log(opportunityData)

    
    const params = new URLSearchParams({
        OA_ID: encodeURIComponent(opportunityData.opportunityId),
        Agent_ID: encodeURIComponent(agentProfile.agentId),
        Country: encodeURIComponent(opportunityData.opportunityCountry),
        Agent_Email: encodeURIComponent(agentProfile.email),
        Enroll_Link : encodeURIComponent(`${REGISTRATION_BASE_URL}/opportunity/${opportunityAnnouncement.opportunityId}`)
    });

    if (opportunityAnnouncement.sourceURL) {
        const opportunityURL = `${opportunityAnnouncement.sourceURL}?${params.toString()}`
        //window.open(opportunityAnnouncement.sourceURL);
        window.open(opportunityURL);
    }
    else {

        try {

            let filename = opportunityAnnouncement.fileName || "Opportunity Announcement";
            //const agentProfile = yield select(agentProfileSelector.get);
            const opportunityAnnouncementData = yield call(opportunitiesApi.opportunityAnnouncement, { mimeType: opportunityAnnouncement.mimeType, agentId: agentProfile.agentId, crmId: opportunityAnnouncement.crmId });
            var file = new Blob([opportunityAnnouncementData], { type: opportunityAnnouncement.mimeType });

            if (navigator.appVersion.toString().indexOf('.NET') > 0) {

                window.navigator.msSaveBlob(file, filename + '.pdf'); // for IE browser

            } else {

                var fileURL = URL.createObjectURL(file);
                if (navigator.vendor.toLowerCase().indexOf('apple') > -1) {
                    window.console.log("apple device")
                    window.location.href = fileURL;

                } else {
                    let _newTabRef = window.open(fileURL);
                    window.console.log("_newTabRef")
                    window.console.log(_newTabRef)
                    if (_newTabRef != null &&
                        (_newTabRef.navigator === undefined || _newTabRef.length === 0 || _newTabRef.length === undefined)) {

                        window.console.log("creating Link")

                        var a = document.createElement("a");
                        document.body.appendChild(a);
                        a.style = "display: none";
                        a.href = fileURL;
                        a.download = filename + '.pdf';
                        a.target = '_blank';
                        a.click();

                        window.console.log(a)

                        a.parentNode.removeChild(a);
                    }
                }



            }


        }
        catch (ex) {


            window.console.log(ex)
        }

    }

}

export default function* watcher() {
    yield takeLatest(ActionType.DOWNLOAD_PDF_FOR_WEB, onDownloadPDFForWeb);
}
