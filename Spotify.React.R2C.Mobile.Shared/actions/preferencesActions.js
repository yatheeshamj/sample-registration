import { GET_PREFERENCES, UPDATE_PREFERENCES } from '../actionTypes/preferencesTypes';

export const getPreferences = (agentId, onlyRequired) => ({
  type: GET_PREFERENCES,
  payload: agentId,
  onlyRequired
});

export const updatePreferences = (agentId, preferences, OnPreferencesCompleted) => ({
  type: UPDATE_PREFERENCES,
  payload: { agentId, preferences, OnPreferencesCompleted }
});
