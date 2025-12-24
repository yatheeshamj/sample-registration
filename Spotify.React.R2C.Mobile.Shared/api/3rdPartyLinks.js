import { getWithAuthRequest, postRequestWithAuth, getRequest } from './helpers/request';
import { getBaseUrl } from "./helpers/request"
import { IPAPI_IPADDRESS_API_KEY } from '../../src/config';


export const getIpAddress = () => {

    
    if(IPAPI_IPADDRESS_API_KEY && IPAPI_IPADDRESS_API_KEY.length > 0)
    {
        return fetch('https://ipapi.co/json/?key=' + IPAPI_IPADDRESS_API_KEY)
            .then(function (response) {
            return response.json();
        })
    }
    else
    {
         //return getRequest("https://jsonip.com", headerAddition);
        return fetch('https://ipapi.co/json/')
            .then(function (response) {
                return response.json();
            })
    }

   
}

export const requestHelpBotLink = props => {
    const { agentId } = props;
    return getWithAuthRequest(`${getBaseUrl()}helpbots/agents/${agentId}`);
}

export const torchServices = props => {
    const { agentId } = props;
    return getWithAuthRequest(`${getBaseUrl()}AbsorbLms/agents/${agentId}`);
}

export const getAbsorbLMSURL = props => {
	const { agentId, token } = props;
	return getWithAuthRequest(`${getBaseUrl()}AbsorbLms/agents/${agentId}/token/${token}`);
}

export const GoToTrainings = props => {

    const { enrollmentids, scheduleids, agentId } = props;
    return getWithAuthRequest(`${getBaseUrl()}GoToTrainings/agents/${agentId}/scheduleids/${scheduleids}/enrollmentids/${enrollmentids}`);

}

export const crowdHubs = props => {

    
    const { legacyApplicationId, chZoneName, agentId } = props;

    return getWithAuthRequest(`${getBaseUrl()}crowdhubs/agents/${agentId}/programids/${legacyApplicationId}/zonenames/${chZoneName}`);

}

export const crowdHubsWithInsert = props => {
    
    const { legacyApplicationId, chZoneName, agentId, enrollmentId } = props;
    
    if(chZoneName == "CERT ZONE")
    {
        return getWithAuthRequest(`${getBaseUrl()}crowdhubs/agents/${agentId}/programids/${legacyApplicationId}/zonenames/${chZoneName}/enrollmentid/${enrollmentId}`);
    }
    else if(chZoneName == "PROD ZONE")
    {
        let enrollmentId2 = '00000000-0000-0000-0000-000000000000';
        
        return getWithAuthRequest(`${getBaseUrl()}crowdhubs/agents/${agentId}/programids/${legacyApplicationId}/zonenames/${chZoneName}/enrollmentid/${enrollmentId2}`);
    }

}

export const KnowledgeZone = props => {
    const { legacyApplicationId, crmId, agentId, chZoneName } = props;
   // let chZoneName = "KNOWLEDGE ZONE"
    return getWithAuthRequest(`${getBaseUrl()}crowdhubs/agentids/${agentId}/application/${crmId}/zonenames/${chZoneName}`);

}

export const spotifyKnowledgeZone = props => {
    const { agentId } = props;
    return getWithAuthRequest(`${getBaseUrl()}spotifyKnowledgeZone/agents/${agentId}`);
}

export const getChatRoom = props => {
    const { programCrmId, agentId, ipAddress } = props;
    console.log('Chat Orginal IP Address: ' + ipAddress);

    let regex = /\:/g;
    let ipAddressReplace = " "
    
    if(ipAddress && ipAddress.length > 0)
    {
        ipAddressReplace = ipAddress.replace(regex, "-");
    }

    console.log('IP Address Final: ' + ipAddressReplace);

    return getWithAuthRequest(`${getBaseUrl()}chatrooms/agents/${agentId}/application/${programCrmId}/ipaddress/${ipAddressReplace}/`);
} 

export const getStarmatic = props => {
    
    const { programCrmId, agentId, ipAddress } = props;
    
    console.log('Starmatic Orginal IP Address: ' + ipAddress);

    let regex = /\:/g;
    let ipAddressReplace = " "
    
    if(ipAddress && ipAddress.length > 0)
    {
        ipAddressReplace = ipAddress.replace(regex, "-");
    }

    console.log('Starmatic IP Address Final: ' + ipAddressReplace);
    return getWithAuthRequest(`${getBaseUrl()}starmatic/agents/${agentId}/application/${programCrmId}/ipaddress/${ipAddressReplace}/`);

}

export const requestNProcessInterviewIQ = props => {
	const { agentId, opportunityId, enrollmentId } = props;
	return postRequestWithAuth(`${getBaseUrl()}interviewiqs/agents/${agentId}/opportunities/${opportunityId}/enrollment/${enrollmentId}`);
}

export const requestNProcessVoice = props => {
    const { agentId, enrollmentId } = props;
    return postRequestWithAuth(`${getBaseUrl()}voiceassessments/agents/${agentId}/enrollments/${enrollmentId}`);
}

export const requestNProcessProgram = props => {
    const { agentId, opportunityId, enrollmentId } = props;
    return postRequestWithAuth(`${getBaseUrl()}programassessments/agents/${agentId}/opportunity/${opportunityId}/modulename/PROGRAM_ASSESSMENT/enrollment/${enrollmentId}`);
}

export const requestNProcessScreeningAssessment = props => {
    const { agentId, countryId } = props;
    return postRequestWithAuth(`${getBaseUrl()}screeningassessments/agents/${agentId}/country/${countryId}`);
}

export const requestNProcessLanguageIQ = props => {
    const { agentId, opportunityId, enrollmentId } = props;
    return postRequestWithAuth(`${getBaseUrl()}LanguageIQAssessments/agents/${agentId}/opportunity/${opportunityId}/modulename/LANGUAGE_IQ/enrollment/${enrollmentId}`);
}

export const requestNProcessFingerPrint = props => {
    const { agentId, opportunityId, enrollmentId } = props;
    return postRequestWithAuth(`${getBaseUrl()}fingerprint/agents/${agentId}/enrollment/${enrollmentId}`);
}

export const torchServicesCentrical = props => {
    const { agentId,opportunitycrmId,ipAddress } = props;
    let regex = /\./g;
    let ipAddressReplace = " "
    if(ipAddress && ipAddress.length > 0)
    {
        ipAddressReplace = ipAddress.replace(regex, "-");
        //to handle ipv6 address
        ipAddressReplace=ipAddressReplace.replace(/\:/g,"-");
    }
    console.log(ipAddressReplace)
    //new end Point--https://devregister.spotify.com/api/prm/v1/SBACOverrides/agents/[Agent Id]/enrolledopportunities/[Enrolled Opportunity Id]/ipaddresses/[IP Address]
    return getWithAuthRequest(`${getBaseUrl()}SBACOverrides/agents/${agentId}/enrolledopportunities/${opportunitycrmId}/ipaddresses/${ipAddressReplace}`);
}

export const torchServicesABsorbLMS=props=>{
    const { agentId,opportunitycrmId,ipAddress } = props;
    let regex = /\./g;
    let ipAddressReplace = " "
    
    if(ipAddress && ipAddress.length > 0)
    {
        ipAddressReplace = ipAddress.replace(regex, "-");
    }
    console.log(ipAddressReplace)
    //new end Point--agents/{agentid}/enrolledopportunities/{enrolledopportunityid}/ipaddresses/{ipaddress}
    return getWithAuthRequest(`${getBaseUrl()}AbsorbLms/agents/${agentId}/enrolledopportunities/${opportunitycrmId}/ipaddresses/${ipAddressReplace}`);
}
//old endopint return getWithAuthRequest(`${getBaseUrl()}AbsorbLms/agents/${agentId}`)
