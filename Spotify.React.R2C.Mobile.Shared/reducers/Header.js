import * as headerActionTypes from "../actionTypes/headerActionTypes"

const initialState = {
    headerVisible: true
};

//state must be Immutable 
export default (state = initialState, action) => {
   
    switch (action.type) {

        case headerActionTypes.SET_HEADER_VISIBLE_COMPLETE:
            state = {
                headerVisible: true

            }
            
            break;
        case headerActionTypes.SET_HEADER_INVISIBLE_COMPLETE:
            state = {
                headerVisible: false

            }
            
            break;
        default:
            return state;
    }
    return state;
}
