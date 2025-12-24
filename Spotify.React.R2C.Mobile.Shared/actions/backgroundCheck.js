import {
    submit_BACKGROUND_CHECK_UK_OrderNumber,
    submit_BACKGROUND_CHECK_JM_OrderNumber,
    generate_BACKGROUND_CHECK_US_Link,
    submit_BACKGROUND_CHECK_UK_OrderNumber_Complete,
    submit_BACKGROUND_CHECK_UK_OrderNumber_Error,
    submit_BACKGROUND_CHECK_Country_OrderNumber_Complete,
    submit_BACKGROUND_CHECK_Country_OrderNumber_Error,
    generate_BACKGROUND_CHECK_US_Link_Complete,
    generate_BACKGROUND_CHECK_US_Link_Error,
    BACKGROUND_CHECK_GET_STATUS,
    BACKGROUND_CHECK_GET_STATUS_COMPLETE,
    BACKGROUND_CHECK_GET_STATUS_ERROR,
    GET_BGC_ORDER_ID,
    GET_BGC_ORDER_ID_SUCCESS,
    GET_BGC_ORDER_ID_ERROR
} from "../actionTypes/backgroundCheck"

export const submitUKOrderNumber = payload => ({
    type: submit_BACKGROUND_CHECK_UK_OrderNumber,
    payload
});

export const submitJMOrderNumber = payload => ({
    type: submit_BACKGROUND_CHECK_JM_OrderNumber,
    payload
});

export const submitUKOrderNumberComplete = payload => ({
    type: submit_BACKGROUND_CHECK_UK_OrderNumber_Complete,
    payload
});

export const submitCountryOrderNumberComplete = payload => ({
    type: submit_BACKGROUND_CHECK_Country_OrderNumber_Complete,
    payload
});

export const submitUKOrderNumberError = payload => ({
    type: submit_BACKGROUND_CHECK_UK_OrderNumber_Error,
    payload
});

export const submitCountryOrderNumberError = payload => ({
    type: submit_BACKGROUND_CHECK_Country_OrderNumber_Error,
    payload
});

export const generateUSLink = payload => ({
    type: generate_BACKGROUND_CHECK_US_Link,
    payload
})
export const generateUSLinkComplete = payload => ({
    type: generate_BACKGROUND_CHECK_US_Link_Complete,
    payload
})
export const generateUSLinkError = payload => ({
    type: generate_BACKGROUND_CHECK_US_Link_Error,
    payload
})

export const getStatus = payload => ({
    type: BACKGROUND_CHECK_GET_STATUS,
    payload
});

export const getStatusComplete = payload => ({
    type: BACKGROUND_CHECK_GET_STATUS_COMPLETE,
    payload
});

export const getStatusError = payload => ({
    type: BACKGROUND_CHECK_GET_STATUS_ERROR,
    payload
});


export const getBgcOrderId = (payload) => {
    return {
        type: GET_BGC_ORDER_ID,
        payload
    };
};

export const getBgcOrderIdSuccess = payload => {
    return {
        type: GET_BGC_ORDER_ID_SUCCESS,
        payload
    };
};

export const getBgcOrderIdFailure = payload => {
    return {
        type: GET_BGC_ORDER_ID_ERROR,
        payload
    };
};
