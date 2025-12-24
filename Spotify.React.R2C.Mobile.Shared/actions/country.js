import { GET_USER_COUNTRY } from "../actionTypes/country"

export const getUserCountry = (considerIp) => ({
    type: GET_USER_COUNTRY,
    payload: considerIp
});
