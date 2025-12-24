import * as Actions from "../actionTypes/photoId"
import * as actions from "../actionTypes/3rdPartyLinks"

export const initialisePhotoIdQRCode = (payload) => ({
     type: Actions.Initialise_PhotoId_QRCode,
    //type: actions.OPEN_BROSWER_LINK_NEW_TAB,
    payload
});


export const initialisePhotoIdQRCodeComplete = (payload) => ({
    type: Actions.Initialise_PhotoId_QRCode_Complete,
    payload
});

export const initialisePhotoIdQRCodeError = (payload) => ({
    type: Actions.Initialise_PhotoId_QRCode_Error,
    payload
});


//Status
export const photoIdStatus = (payload) => ({
    type: Actions.PhotoId_QRCode_Status,
    payload
});
export const photoIdStatusSingle = (payload) => ({
    type: Actions.PhotoId_QRCode_Status_Single,
    payload
});


export const photoIdStatusComplete = (payload) => ({
    type: Actions.PhotoId_QRCode_Status_Complete,
    payload
});

export const photoIdStatusError = (payload) => ({
    type: Actions.PhotoId_QRCode_Status_Error,
    payload
});

export const photoIdSetPullingStatus = payload => ({
    type: Actions.PhotoId_Set_Pulling_Flag,
    payload
});

export const photoIdResponse = payload => ({
    type: Actions.PhotoId_Callback_Response,
    payload
});
export const photoIdResponseComplete = payload => ({
    type: Actions.PhotoId_Callback_Response_Complete,
    payload
});
export const photoIdResponseError = payload => ({
    type: Actions.PhotoId_Callback_Response_Error,
    payload
});


export const PhotoIdMediaComplete = payload => ({
    type: Actions.PhotoIdMediaComplete,
    payload
});

export const PhotoId_HasClickedOnUrl = () => ({
    type: Actions.PhotoId_HasClickedOnUrl
});
