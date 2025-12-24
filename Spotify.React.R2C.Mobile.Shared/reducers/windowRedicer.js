import * as todoActionTypes from "../actionTypes/windowResizeTypes"

const initalState = {
    height: window.innerHeight,
    width: window.innerWidth
};

//state must be Immutable 
export default (state = initalState, action) => {

    switch (action.type) {

        case todoActionTypes.SET_WINDOW_SIZE:
            state = {
                ...action.payload
            }
            break;
        default:
            return state;
    }

    return state;
}
