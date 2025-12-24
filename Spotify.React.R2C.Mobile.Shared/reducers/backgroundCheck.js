import * as actionTypes from "../actionTypes/backgroundCheck"

const initalState = {
    "isFetching": false,
    "error": null,
    "data": {},
    "complete": false,
    "displayBGCModal": false,
};

export default (state = initalState, action) => {

    switch (action.type) {
        case actionTypes.generate_BACKGROUND_CHECK_US_Link:
        case actionTypes.submit_BACKGROUND_CHECK_UK_OrderNumber:
        case actionTypes.BACKGROUND_CHECK_GET_STATUS:
        case actionTypes.GET_BGC_ORDER_ID:

            {
                state = {
                    ...state,
                    error: null,
                    isFetching: true
                }
                break;
            }
        case actionTypes.generate_BACKGROUND_CHECK_US_Link_Complete:
        case actionTypes.submit_BACKGROUND_CHECK_UK_OrderNumber_Complete:
        case actionTypes.submit_BACKGROUND_CHECK_Country_OrderNumber_Complete:
        case actionTypes.BACKGROUND_CHECK_GET_STATUS_COMPLETE:
        case actionTypes.GET_BGC_ORDER_ID_SUCCESS:

            {
                state = {
                    ...state,
                    error: null,
                    isFetching: false,
                    data: action.payload,
                    complete: true,
                    displayBGCModal: action.payload.result !== "Incomplete"
                }
                break;
            }
        case actionTypes.generate_BACKGROUND_CHECK_US_Link_Error:
        case actionTypes.submit_BACKGROUND_CHECK_UK_OrderNumber_Error:
        case actionTypes.submit_BACKGROUND_CHECK_Country_OrderNumber_Error:
        case actionTypes.BACKGROUND_CHECK_GET_STATUS_ERROR:
        case actionTypes.GET_BGC_ORDER_ID_ERROR:

            {
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



