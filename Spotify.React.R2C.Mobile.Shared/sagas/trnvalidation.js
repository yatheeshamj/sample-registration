import * as actionTypes from "../actionTypes/trnvalidation"
import { takeLatest, put, call, select, all, take,delay } from "redux-saga/effects";
import * as trnvalidationAPI from "./../api/trnvalidation"
import * as AgentSelectors from "../selectors/agentProfile"
import * as enrollmentStepsActions from "../actions/enrollmentSteps"
import { ErrorMessages } from "../constants";



function* getAgentTrnDetails(action){

    try {
        const agentProfile=yield select(AgentSelectors.get,{})
        const payload={
            agentId:agentProfile.agentId
        }
        const data=yield call(trnvalidationAPI.retrieveTrnDetails,payload)

        yield put({type:actionTypes.GET_AGENT_TRN_DETAILS_SUCCESS,payload:data})


        
    } catch (error) {
        yield put({type:actionTypes.GET_AGENT_TRN_DETAILS_ERROR,error:error})
    }
}


function* validateTrnDetails(action){
    console.log(action,"details")
    try {
        const agentProfile=yield select(AgentSelectors.get,{})
        let payload={
            ...action.payload,
            agentId:agentProfile.agentId,
            firstName:agentProfile.firstName,
            lastName:agentProfile.lastName
        }
        //check for Duplicate before calling validationTRN
        const result=yield call(trnvalidationAPI.validateTrnDetails,payload)
        
        if(result){
            yield put({type:actionTypes.VALIDATE_TRN_DETAILS_SUCCESS,payload:result})
            yield delay(3000)
            yield put(enrollmentStepsActions.fetchEnrollmentSteps(payload));
        }
        else{
            console.log("common")
            yield put({
                type:actionTypes.VALIDATE_TRN_DETAILS_ERROR,
                error:  ErrorMessages.TRNError,
            })
            console.log("common1-2")
            return;
        }
        
        
    } catch (error) {
        yield put({
            type:actionTypes.VALIDATE_TRN_DETAILS_ERROR,
            error: error.data && error.data.message ? error.data.message : ErrorMessages.TRNError,
        })
    }
}


export default function* watcher(){
    yield takeLatest(actionTypes.GET_AGENT_TRN_DETAILS,getAgentTrnDetails)
    yield takeLatest(actionTypes.VALIDATE_TRN_DETAILS,validateTrnDetails)

}
