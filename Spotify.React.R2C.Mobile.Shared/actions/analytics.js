

import * as actions from "../actionTypes/analytics"

export const raiseEvent = (payload) => ({
    type: actions.RaiseEvent,
    payload
});

export const raiseModalView = (payload) => ({
    type: actions.RaiseModalView,
    payload
});

export const raisePageView = (payload) => ({
    type: actions.RaisePageView,
    payload
});


