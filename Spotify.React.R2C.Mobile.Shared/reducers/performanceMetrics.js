
import * as actionTypes from "../actionTypes/performanceMetrics"

const initalState = {
    "isFetching": false,
    "error": null,
    "data": {

    }
};

//state must be Immutable 
export default (state = initalState, action) => {

    switch (action.type) {
        case actionTypes.FETCH_METRICS:
            {
                state = {
                    ...state,
                    error: null,
                    isFetching: true
                }
                break;
            }
        case actionTypes.FETCH_METRICS_COMPLETE: {
            state = {
                ...state,
                error: null,
                isFetching: false,
                data: {
                    ...state.data,
                    ...action.payload
                }
            }
            break;
        }
        case actionTypes.FETCH_METRICS_ERROR: {
            state = {
                ...state,
                isFetching: false,
                error: action.payload
            }
            break;
        }
        default:
            return state;

    }

    return state;
}
