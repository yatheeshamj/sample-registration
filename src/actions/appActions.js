import {
    SET_USER_DEVICE,
    SET_COUNTRY_CONFIGURATIONS
} from "../types/appTypes"

export const setUserDevice = payload => ({
    type: SET_USER_DEVICE,
    payload
})

export const initializeConfigurations = (countryCode, config) => ({
    type: SET_COUNTRY_CONFIGURATIONS,
    payload: [countryCode, config]
})
