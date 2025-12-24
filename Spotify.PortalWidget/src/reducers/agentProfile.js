
import { SET_AGENT_PROFILE } from "../actionTypes/agentProfile"




const initialState = {

};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_AGENT_PROFILE:
            state = action.payload;
            break;


        default:
            return state;
    }
    return state;
};
