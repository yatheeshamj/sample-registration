import { combineReducers } from "redux";
import { reducers } from "spotify-shared";
import opportunitiesWidget from "./opportunitiesWidget";
import auth from "./auth";
import agentProfile from "./agentProfile";

export default () =>
  combineReducers({
    ...reducers,
    auth,
    opportunitiesWidget,
    agentProfile,
  });
