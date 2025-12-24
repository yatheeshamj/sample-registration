import * as actionTypes from "../actionTypes/trnvalidation"

const initalState = {
    "isFetching": false,
    "error": null,
	"data": {},
	"complete": false,
    "validationsuccess":null
};

export default (state = initalState, action) => {

    switch (action.type) {
        
        case actionTypes.GET_AGENT_TRN_DETAILS:
            {
                state = {
                    ...state,
                    error: null,
                    isFetching: true
                }
                break;
            }
       
        case actionTypes.GET_AGENT_TRN_DETAILS_SUCCESS:
            {
                state = {
                    ...state,
                    error: null,
                    isFetching: false,
					data: action.payload,
                    validationsuccess:null
					
                }
                break;
            }
       
       
        case actionTypes.GET_AGENT_TRN_DETAILS_ERROR:
            {
                state = {
                    ...state,
                    isFetching: false,
                    error: action.error
                }
                break;
            }
        case actionTypes.VALIDATE_TRN_DETAILS_ERROR:
        
            {
                state = {
                    ...state,
                    isFetching: false,
                    error: action.error,
                    validationsuccess:false
                }
                break;
            }
        case actionTypes.VALIDATE_TRN_DETAILS:
            {
                state={
                    ...state,
                    isFetching:true,
                    

                }
                break;
            }
            case actionTypes.VALIDATE_TRN_DETAILS_SUCCESS:
                {
                    state={
                        ...state,
                        isFetching:false,
                        validationsuccess:action.payload
    
                    }
                    break;
                }
    

        default:
            return state;

    }

    return state;
}
