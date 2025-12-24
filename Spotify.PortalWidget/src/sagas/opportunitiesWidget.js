import { takeLatest, put, call, select, all, take } from "redux-saga/effects";
import * as ActionType from "../actionTypes/opportunitiesWidget"
import * as Actions from "../actions/opportunitiesWidget"
import * as AuthActions from "../actions/auth"
import * as AuthActionTypes from "../actionTypes/auth"
import * as opportunitiesSelector from "spotify-shared/selectors/opportunities"
import * as opportunityActionTypes from "spotify-shared/actionTypes/opportunities"
import * as opportunityActions from "spotify-shared/actions/opportunities"
import * as enrolledProgramsActionTypes from "spotify-shared/actionTypes/enrolledPrograms"
import * as enrolledProgramsActions from "spotify-shared/actions/enrolledPrograms"
import * as enrolledProgramsSelector from "spotify-shared/selectors/enrolledPrograms"

function* onInitializeOpportunityWidget(action) {

    try {

        yield put(AuthActions.getToken());

        yield all([
            take(AuthActionTypes.SET_TOKEN)
        ]);


        let agentProfile = yield select((state) => state.agentProfile);
        // fetch Opportunities
        yield put(opportunityActions.fetchOpportunities(agentProfile));

        // wait for service to finish
        yield all([
            take(opportunityActionTypes.FetchOpportunitiesComplete)
        ]);

        const opportunitiesInProgress = yield select(opportunitiesSelector.getInProgressDataAsArray);
        const opportunitiesNotInProgress = yield select(opportunitiesSelector.getNotInProgressDataAsArray);

        const opportunitiesNotInProgresssortedArrayOfids = opportunitiesNotInProgress.sort((a, b) => {
            if (b._isEligible > a._isEligible || b.sponsored > a.sponsored) return 1;
            if (b._isEligible < a._isEligible || b.sponsored < a.sponsored) return -1;
            return 0;
        }).map(x => x.crmId);

        yield put(Actions.setOpportunitiesData(opportunitiesNotInProgresssortedArrayOfids));

        const sortedInPregressData = opportunitiesInProgress
            .sort((a, b) => (a.name < b.name ? 1 : -1))
            .map(x => x.crmId);

        yield put(Actions.setInProgressData(sortedInPregressData));

        // fetch programs after we have Opportunities
        yield put(enrolledProgramsActions.getByAgent(agentProfile))

        // wait till we have programs
        yield all([
            take(enrolledProgramsActionTypes.ENROLLED_PROGRAM_GET_BY_AGENT_COMPLETE)
        ]);

        const myPrograms = yield select(enrolledProgramsSelector.getMyPrograms);

        // check if we have any opportunities In Progress
        // if so default to In Progress Tab
        if (opportunitiesInProgress.length > 0 || myPrograms.length > 0) {
            yield put(Actions.setTab("In Progress"));
        }

    } catch (e) {
        console.log(e)

    }

}



export default function* watcher() {
    yield takeLatest(ActionType.Opportunity_Widget_Initialize, onInitializeOpportunityWidget);

}
