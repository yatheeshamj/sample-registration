
import { takeLatest, put, call, select, all, take } from "redux-saga/effects";
import * as ActionType from "../actionTypes/opportunities"
import * as Actions from "../actions/opportunities"
import { setupData, extractListData } from "../schema/opportunities"
import * as opportunitiesApi from "../api/opportunities"
import * as opportunitiesSelector from "../selectors/opportunities"
import * as agentProfileSelector from "../selectors/agentProfile"
import * as globalParametersSelector from "../selectors/globalParameters"
import * as globalParametersApi from "../api/globalParameters"
import { GlobalParameterTypes,ErrorMessages} from "../constants"
import * as globalActions from "../actions/globalParameters"
import * as performanceMetricsActions from "../actions/performanceMetrics"
import * as opportunityBoardActions from "../actions/opportunityBoard"
import * as enrollmentAssessmentsActions from "../actions/enrollmentAssessments"
import { setTab } from "../actions/opportunityBoard"
import * as enrolledProgramsSelector from "../selectors/enrolledPrograms"
import { TabNames } from "./../../src/constants"
// import * as ThirptyActions from "../actions/3rdPartyLinks"
import { _3rdPartyLinkTypes } from "../constants"
import * as _3rdPartyLinksApi from "../api/3rdPartyLinks"
// import * as thirdPartyActionTypes from "../actionTypes/3rdPartyLinks"
// import * as thirdPartyAction from "../actions/3rdPartyLinks"


function* fetchOpportunity(action) {
    try {
        const opportunityData = yield call(opportunitiesApi.byIdForAgent, action.payload);
        const agentProfile = yield select(agentProfileSelector.get);
        var rescheduleCutoffTime = yield select(globalParametersSelector.getRescheduleCutoffTime);
        if (rescheduleCutoffTime === undefined) {
            rescheduleCutoffTime = yield call(globalParametersApi.retrieveGlobalParameters, GlobalParameterTypes.ENROLLMENT_RESCHEDULE_CUTOFFTIME);
            yield put(globalActions.retrieveGlobalParameterComplete([GlobalParameterTypes.ENROLLMENT_RESCHEDULE_CUTOFFTIME, rescheduleCutoffTime]));
        }
        const opportunity = setupData(opportunityData, rescheduleCutoffTime, agentProfile);

        yield put(Actions.fetchOpportunityComplete(opportunity));

        yield put(enrollmentAssessmentsActions.getEnrollmentAssessmentsForOpportunity(opportunity.crmId));

        //if (opportunity.programCrmId)
        // yield put(performanceMetricsActions.fetchMetricsForProgram(opportunity.programCrmId));

    } catch (e) {
        yield put(Actions.fetchOpportunityError(e));
    }
}


function* fetchOpportunities(action) {
    try {
        const agentProfile = yield select(agentProfileSelector.get);
        const opportunities = yield call(opportunitiesApi.byAgentByCountry, action.payload);
        var rescheduleCutoffTime = yield select(globalParametersSelector.getRescheduleCutoffTime);
        if (rescheduleCutoffTime === undefined) {
            rescheduleCutoffTime = yield call(globalParametersApi.retrieveGlobalParameters, GlobalParameterTypes.ENROLLMENT_RESCHEDULE_CUTOFFTIME);
            yield put(globalActions.retrieveGlobalParameterComplete([GlobalParameterTypes.ENROLLMENT_RESCHEDULE_CUTOFFTIME, rescheduleCutoffTime]));
        }

        if (opportunities.length > 0) {
            const { data } = extractListData(opportunities, rescheduleCutoffTime, agentProfile);

            if (data) {
                yield put(Actions.fetchOpportunitiesComplete(data));

                if (opportunities != null) {
                    // yield put(opportunityBoardActions.setIsFirstInstance(opportunities[0].isFirstInstance));

                    var payload = {
                        isFirstInstance: opportunities[0].isFirstInstance,
                        isSecondInstance: opportunities[0].isSecondInstance,
                        isSecondInstanceAvailable: opportunities[0].isSecondInstanceAvailable
                    }
                    const myPrograms = yield select(enrolledProgramsSelector.getMyPrograms);

                    var harverAssessmentRequired = yield select(globalParametersSelector.getHarverAssessmentRequired);

                    if ((myPrograms.length > 0)) {
                        yield put(setTab("In Progress"));
                    }
                    else if (payload.isFirstInstance && harverAssessmentRequired) {
                        yield put(setTab(TabNames.BestMatchTab));
                    }
                    else if (payload.isSecondInstance && harverAssessmentRequired) {
                        yield put(setTab(TabNames.AdditionalOppurtunities));
                    }
                    yield put(opportunityBoardActions.setOpportunityInstanceTypeValue(payload));
                }
            }

            //yield put(performanceMetricsActions.fetchAllMetrics());

            //yield put(opportunityBoardActions.calculateOpportunities())
        }
        else {
            yield put(opportunityBoardActions.InitializeOpportunityBoardSecondInstance());
            yield put(setTab(TabNames.AdditionalOppurtunities));
        }

    } catch (e) {
        yield put(Actions.fetchOpportunitiesError(e));
    }
}


export function* expressInterestInOpportunity(action) {
    try {
        const response = yield call(opportunitiesApi.expressInterestInOpportunity, action);

        if (response.success) {
            yield put({
                type: ActionType.ExpressInterestInOpportunityComplete,
                payload: response
            });
            yield put(Actions.fetchOpportunity(action.payload));
            yield all([
                take(ActionType.FetchOpportunityComplete)
            ]);

            yield put(opportunityBoardActions.calculateOpportunities())
        }
        else {
            yield put({
                type: ActionType.ExpressInterestInOpportunityError,
                payload: response.autoQualifyResult
            });
        }


    } catch (err) {

        yield put({
            type: ActionType.ExpressInterestInOpportunityError,
            payload: err
        });
    }
}

function* fetchOpportunitiesSecondInstance(action) {

    try {
        const agentProfile = yield select(agentProfileSelector.get);
        const opportunities = yield call(opportunitiesApi.secondInstanceByAgentByCountry, action.payload);

        var rescheduleCutoffTime = yield select(globalParametersSelector.getRescheduleCutoffTime);
        if (rescheduleCutoffTime === undefined) {
            rescheduleCutoffTime = yield call(globalParametersApi.retrieveGlobalParameters, GlobalParameterTypes.ENROLLMENT_RESCHEDULE_CUTOFFTIME);
            yield put(globalActions.retrieveGlobalParameterComplete([GlobalParameterTypes.ENROLLMENT_RESCHEDULE_CUTOFFTIME, rescheduleCutoffTime]));
        }

        const { data } = extractListData(opportunities, rescheduleCutoffTime, agentProfile);

        if (opportunities != null && opportunities.length > 0) {
            var payload = {
                isFirstInstance: opportunities[0].isFirstInstance,
                isSecondInstance: opportunities[0].isSecondInstance,
                isSecondInstanceAvailable: opportunities[0].isSecondInstanceAvailable
            }

            yield put(opportunityBoardActions.setOpportunityInstanceTypeValue(payload));

        }
        yield put(Actions.fetchOpportunitiesComplete(data||[]));
        yield put(setTab(TabNames.AdditionalOppurtunities));
    }
    catch (e) {
        yield put(Actions.fetchOpportunitiesError(e));
    }
}

function* fetchOpportunitiesFirstInstance(action) {
    try {
        const agentProfile = yield select(agentProfileSelector.get);

        const opportunities = yield call(opportunitiesApi.firstInstanceByAgentByCountry, action.payload);

        var rescheduleCutoffTime = yield select(globalParametersSelector.getRescheduleCutoffTime);
        if (rescheduleCutoffTime === undefined) {
            rescheduleCutoffTime = yield call(globalParametersApi.retrieveGlobalParameters, GlobalParameterTypes.ENROLLMENT_RESCHEDULE_CUTOFFTIME);
            yield put(globalActions.retrieveGlobalParameterComplete([GlobalParameterTypes.ENROLLMENT_RESCHEDULE_CUTOFFTIME, rescheduleCutoffTime]));
        }


        if (opportunities.length > 0) {
            const { data } = extractListData(opportunities, rescheduleCutoffTime, agentProfile);
            if (data) {
                if (opportunities != null) {
                    var payload = {
                        isFirstInstance: opportunities[0].isFirstInstance,
                        isSecondInstance: opportunities[0].isSecondInstance,
                        isSecondInstanceAvailable: opportunities[0].isSecondInstanceAvailable
                    }

                    yield put(opportunityBoardActions.setOpportunityInstanceTypeValue(payload));

                }
                yield put(Actions.fetchOpportunitiesComplete(data));
                yield put(setTab(TabNames.BestMatchTab));
            }
        }
        else {
            //if(opportunities.length == 0)
            //{
            yield put(opportunityBoardActions.InitializeOpportunityBoardSecondInstance());
            yield put(setTab(TabNames.AdditionalOppurtunities));
            //}
        }
    }
    catch (e) {
        yield put(Actions.fetchOpportunitiesError(e));
    }
}

function* onAgentSwitchingProgram(action) {

    const agentProfile = yield select(agentProfileSelector.get);

    const payload = {
        agentId: agentProfile.agentId,
        data: action.payload
    };

    try {
        const response = yield call(opportunitiesApi.agentSwitchingProgramReasons, payload);

        if (response) {
            yield put(Actions.AgentSwitchingProgramCompleted(true));
        }
        else {
            //alert('Done API Call Error');
            yield put(Actions.AgentSwitchingProgramReSet(false));

        }
    }
    catch (e) {
        yield put(Actions.fetchOpportunitiesError(e));
    }

}

function* fetchSbacRequiredForOpp(action) {

    const ipData = yield call(_3rdPartyLinksApi.getIpAddress, {});
    const ipAddress = ipData.ip;
    const agentProfile = yield select(agentProfileSelector.get);
    const props = {
        agentId: agentProfile.agentId,
        opportunitycrmId: action.payload.enrollmentId,
        ipAddress: ipAddress
    };


    try {
        const data = yield call(_3rdPartyLinksApi.torchServicesCentrical, props);
        if (data) {
            yield put(Actions.SetSbacRequired({ sbac_Required: data.hasactivesbacoverride, crmId: action.payload.opportunityId }))
        }

    } catch {
        alert("error in fetching requried for SBAC")
    }

}

function* checkClassTimeConflict(action){
    try {
        
        //check if conflict for class is already fetched
        const conflictData=yield select(opportunitiesSelector.getClassConflictByClassId,action.payload.classId);
        
        if(conflictData==null){
            const agentProfile = yield select(agentProfileSelector.get);
            action.payload={
                ...action.payload,
                agentid:agentProfile.agentId,
                acprmId:agentProfile.contactId

            }
            const data=yield call(opportunitiesApi.checkforConflict,action.payload)
            
            if(!data){
                yield put({type:ActionType.CheckForClassConflictComplete,payload:{classId:action.payload.classId,val:false}})
            }
        }
        else{

            if(conflictData==true) {
                const conflicterror=new Error("conflict with servicing hours");
                conflicterror.status=409;
                throw conflicterror;
            }
            else{
                yield put({type:ActionType.CheckForClassConflictComplete,payload:{classId:action.payload.classId,val:false}})
            }
        }
        
        
    } catch (error) {
        //check if status  code is 409/conflict
        console.log(error.status)
        yield put({type:ActionType.CheckForClassConflictComplete,payload:{classId:action.payload.classId,val:true}})
        if(error.status==409){
            alert(action.payload.isEnroll? ErrorMessages.ClassConflictWithServicingTimeWhileEnroll:ErrorMessages.ClassConflictWithServicingTimeWhileReschedule)
        }
    }
}


export default function* watcher() {
    yield takeLatest(ActionType.FetchOpportunities, fetchOpportunities);
    yield takeLatest(ActionType.FetchOpportunity, fetchOpportunity);
    yield takeLatest(ActionType.ExpressInterestInOpportunity, expressInterestInOpportunity);
    yield takeLatest(ActionType.FetchOpportunitiesSecondInstance, fetchOpportunitiesSecondInstance);
    yield takeLatest(ActionType.FetchOpportunitiesFirstInstance, fetchOpportunitiesFirstInstance);
    yield takeLatest(ActionType.AgentSwitchingProgram, onAgentSwitchingProgram);
    yield takeLatest(ActionType.FETCH_SBAC_REQUIRED_FOR_OPP, fetchSbacRequiredForOpp);
    yield takeLatest(ActionType.CheckForClassConflict,checkClassTimeConflict)
}
