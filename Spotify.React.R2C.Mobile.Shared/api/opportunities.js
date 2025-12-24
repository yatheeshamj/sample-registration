import { getWithAuthRequest, getBlobWithAuthRequest, postRequestFormEncodedWithAuth, postRequestWithAuth, putWithAuthRequest } from './helpers/request';
import { getBaseUrl,getStarmaticBaseUrl } from "./helpers/request" 

export const byAgentByCountry = (props) => {
	const { agentId, countryId } = props;
	var url = `${getBaseUrl()}opportunities/agents/${agentId}/countries/${countryId}`;
	return getWithAuthRequest(`${getBaseUrl()}opportunities/agents/${agentId}/countries/${countryId}`);
}

export const byIdForAgent = props => {
	const { agentId, opportunityId } = props;
	return getWithAuthRequest(`${getBaseUrl()}opportunities/agents/${agentId}/opportunities/${opportunityId}`);
}

export const enrollmentAssessments = props => {
	const { agentId, opportunityId } = props;
	return getWithAuthRequest(`${getBaseUrl()}enrollmentassessments/agents/${agentId}/opportunities/${opportunityId}`);
}

export const opportunityAnnouncement = props => {
	const { agentId, crmId, mimeType } = props;
	return getBlobWithAuthRequest(`${getBaseUrl()}documents/ids/${crmId}/agents/${agentId}`, null, mimeType);
}

export const serviceTypes = props => {
	return getWithAuthRequest(`${getBaseUrl()}servicetypes`);
}

export const programServices = props => {
	return getWithAuthRequest(`${getBaseUrl()}programservices`);
}

export const languages = props => {
	return getWithAuthRequest(`${getBaseUrl()}languages`);
}

export const equipments = props => {
	return getWithAuthRequest(`${getBaseUrl()}equipments`);
}

export const servicingTimes = props => {
	return getWithAuthRequest(`${getBaseUrl()}servicingtimes`);
}

export const expressInterestInOpportunity = (action) => {
	const { agentId, opportunityId, classScheduleId, typeId, ConsentClassNoShow,userId } = action.payload;
	const uri = `${getBaseUrl()}enrollmentopportunities/agents/${agentId}`;
	return postRequestFormEncodedWithAuth(uri,
		{
			opportunityId,
			classScheduleId,
			typeId,
			ConsentClassNoShow,
			userId
		});

}

export const updatePreferences = (action) => {
	const { agentId, preferences } = action.payload;
	console.log(preferences);
	const uri = `${getBaseUrl()}AgentAnsweredQuestions/agents/${agentId}`;
	return postRequestWithAuth(uri, preferences);
}


export const upsertAgentOpportunityBoardFilterAttributes = (props) => {
	const { agentId, filterAttributes } = props;

	const uri = `${getBaseUrl()}OpportunityBoardFilter/agents/${agentId}`;
	return postRequestWithAuth(uri, filterAttributes);
}

export const secondInstanceByAgentByCountry = (props) => {
	const { agentId, countryId } = props;
	const instanceType = 'secondinstance';

	var url = `${getBaseUrl()}opportunities/agents/${agentId}/countries/${countryId}/InstanceType/${instanceType}`;
	return getWithAuthRequest(url);
}

export const firstInstanceByAgentByCountry = (props) => {
	const { agentId, countryId } = props;
	const instanceType = 'firstinstance';

	var url = `${getBaseUrl()}opportunities/agents/${agentId}/countries/${countryId}/InstanceType/${instanceType}`;
	return getWithAuthRequest(url);
}

export const agentSwitchingProgramReasons = (props) => {
	const { agentId, data } = props;
	const uri = `${getBaseUrl()}AgentSwitchingProgramReasons/agents/${agentId}`;
	return postRequestFormEncodedWithAuth(uri, data);
}

export const updateOpportunityBoardType = (props) => {
	const { agentId, data } = props;
	const uri = `${getBaseUrl()}AgentOpportunityBoardType/agents/${agentId}/opportunityBoardType/${data}`;
	return putWithAuthRequest(uri, '');
}

export const fetchUserPrograms=(props)=>{
	const {userId}=props;
	const uri = `${getStarmaticBaseUrl()}userprograms/users/${userId}`;

	return getWithAuthRequest(uri)
}

export const checkforConflict=(props)=>{
	console.log(props,"inside opp Api")
	const {agentid,oppId,classId,acprmId}=props
	const uri=`${getBaseUrl()}starmatic/agentId/${agentid}/acprmId/${acprmId}/OppcrmId/${oppId}/classId/${classId}`
	return getWithAuthRequest(uri)
}
