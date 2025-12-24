import { takeLatest, put, call, select, all, take, takeEvery, cancel } from "redux-saga/effects";
import * as ActionType from "../actionTypes/opportunityDetailsPage"
import * as Actions from "../actions/opportunityDetailsPage"
import * as opportunityActions from "../actions/opportunities"
import * as opportunityBoardActions from "../actions/opportunityBoard"
import * as opportunitiesSelector from "../selectors/opportunities"
import * as agentProfileSelector from "../selectors/agentProfile"
import * as opportunitiesAPI from "../api/opportunities";



function* onInitializeOpportunityDetailsPage(action) {

    try {
        const Opportunities = yield select(opportunitiesSelector.getDataAsArray);

        if (Opportunities.length === 0) {
            // we call initializeOpportunityBoard 
            // here becuase this actions is what fetches all opportunities
            // and sorts them. we then show the top 3 in the details page
            // so if we havent already done this action
            // we will need to kick this action off to
            // obtain the top 3 for the you will also like section
            yield put(opportunityBoardActions.initializeOpportunityBoard(action.payload));
        }

        yield put(opportunityActions.fetchOpportunity(action.payload));
        yield put(Actions.FetchUserDataProgram())

        yield put(Actions.InitializeOpportunityDetailsPageComplete());

    } catch (e) {
        console.log(e)
    }

}

function* fetchuserPrograms(action){
    try {
        const agentProfile=yield select(agentProfileSelector.get)
        console.log(agentProfile,"inside userPrograms")
        action.payload={
            userId:agentProfile.userId
        }
        console.log(action.payload,"inside userPrograms")
        const response=yield call (opportunitiesAPI.fetchUserPrograms,action.payload)
        

        yield put({
            type:ActionType.FetchUserDataProgramComplete,
            payload:response
        })
        
        
    } catch (error) {
        
    }

}

export default function* watcher() {
    yield takeLatest(ActionType.InitializeOpportunityDetailsPage, onInitializeOpportunityDetailsPage);
    yield takeLatest(ActionType.FetchUserDataProgram,fetchuserPrograms);
}
