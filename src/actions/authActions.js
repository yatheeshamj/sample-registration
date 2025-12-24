import {
    EnsureIsAuthenticatedWithAgentProfile,
    UnauthorizedResponseReceived
} from "../types/authTypes"

export const ensureIsAuthenticatedWithAgentProfile = (payload) => ({
    type: EnsureIsAuthenticatedWithAgentProfile,
    payload
});

export const unauthorizedResponseReceived = payload => ({
    type: UnauthorizedResponseReceived,
    payload
});
