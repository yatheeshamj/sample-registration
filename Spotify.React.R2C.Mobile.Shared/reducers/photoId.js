
import * as actionTypes from "../actionTypes/photoId"

const initalState = {
    "isFetching": false,
    "error": null,
    continuePulling: true,
    "data": {
        "overallStatus": undefined,
        "inProgress": undefined,
        "pending": undefined,
        "failed": undefined,
        "numberOfAttempts": undefined,
        "reachedMaxAttempts": undefined,
        "maxAttempts": undefined,
		"canRetry": undefined,
		"signedPhotoIdAgreement": false,
		"agreements": null,
        "initResponse": {
            "timestamp": undefined,
            "transactionReference": undefined,
            "redirectUrl": undefined,
            "pageMediaUrl": undefined,
        },
    },
    isStatusLoading: false,
    statusPullCount: 0,
    hasClickedOnUrl: false
};

//state must be Immutable 
export default (state = initalState, action) => {

    switch (action.type) {
        //#region Initialise_PhotoId_QRCode
        case actionTypes.Initialise_PhotoId_QRCode:
            {
                state = {
                    ...state,
                    statusPullCount: 0,
                    statusData: null,
                    error: null,
                    isFetching: true,
                    continuePulling: true,
                }
                break;
            }
        case actionTypes.Initialise_PhotoId_QRCode_Complete: {
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
        case actionTypes.Initialise_PhotoId_QRCode_Error: {
            state = {
                ...state,
                isFetching: false,
                error: action.payload
            }
            break;
        }
        //#endregion

        case actionTypes.PhotoId_Set_Pulling_Flag: {
            state = {
                ...state,
                continuePulling: action.payload
            }
            break;
        }
        case actionTypes.PhotoIdMediaComplete: {
            state = {
                ...state,
                media: action.payload
            }
            break;
        }
            


        //#region PhotoId_QRCode_Status
        case actionTypes.PhotoId_QRCode_Status_Single:
            {
                state = {
                    ...state,
                    error: null,
                    isStatusLoading: true,
                    isSingleStatusLoading: true,
                    continuePulling: true,
                }
                break;
            }
        case actionTypes.PhotoId_QRCode_Status:
            {
                state = {
                    ...state,
                    error: null,
                    isStatusLoading: true
                }
                break;
            }
        case actionTypes.PhotoId_QRCode_Status_Complete: {
            state = {
                ...state,
                error: null,
                data: action.payload,
                isStatusLoading: false,
                isSingleStatusLoading: false,
                statusPullCount: state.statusPullCount + 1
            }
            break;
        }
        case actionTypes.PhotoId_QRCode_Status_Error: {
            state = {
                ...state,
                isStatusLoading: false,
                error: action.payload
            }
            break;
        }
        case actionTypes.PhotoId_HasClickedOnUrl: {
            state = {
                ...state,
                hasClickedOnUrl: true
            }
            break;
        }
        //#endregion


        default:
            return state;

    }

    return state;
}
