import { SignalCellularNullOutlined } from '@material-ui/icons';
import {
    SET_RESULTS, SET_spotify_KNOWLEDGE_ZONE_LINK, SET_IS_SCREENINGURL_GENERATED, SET_TO_INITIAL,
    START_PCSCAN,
    START_PHOTOID_VERIFICATION,
    CLEAR_PCSCAN,
    PCSCAN_COMPLETED,
} from '../actionTypes/3rdPartyLinks';

import { _3rdPartyLinkTypes } from '../constants';

const initialState = {
    "spotifyKnowledgeZoneLink": null,
    "isScreeeningUrlGenerated": null

};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_RESULTS:
            state = {
                ...state,
                [action.payload.key]: {
                    ...action.payload.data
                }
            };
            break;
        case SET_spotify_KNOWLEDGE_ZONE_LINK:
            state = {
                ...state,
                spotifyKnowledgeZoneLink: action.payload.data
                //[_3rdPartyLinkTypes.KNOWLEDGE_ZONE_LINK]: action.payload.data
            };

            break;

        case SET_IS_SCREENINGURL_GENERATED:
            state = {
                ...state,
                "isScreeeningUrlGenerated": action.payload
            }
            break;
        case START_PCSCAN:
            state = {
                ...state,
                virtualClassData: action.payload,
            };
            break;
        case CLEAR_PCSCAN:
            state = {
                ...state,
                virtualClassData: null,
            };
            break;
        case START_PHOTOID_VERIFICATION:
            state = {
                ...state,
                virtualClassData: action.payload,
            };
            break;
        case SET_TO_INITIAL:
            state = {
                ...state,
                "isScreeeningUrlGenerated": null
            }
            break;
        default:
            return state;
    }
    return state;
};
