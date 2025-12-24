import store from '../../store';
import { axios } from 'spotify-shared/api/axios';
import { BASE_API_URL } from '../../config';
// import { asyncValidateIndiviualTaxId } from '../../components/agentType/uniqueIdentity/customValidation';

let cancelToken;
let cancelTaxIdToken;

export default {
    asyncValidateFein(value) {
        var token = store.getState().auth.authToken;
        console.log("Token: " + token);

        return axios.get(
            `${BASE_API_URL}feinunique/feins/${value}`,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Bearer ${token}`,
                    Pragma: "no-cache"
                }
            }
        );
    },

    async asyncValidateBusinessId(value, countryId) {

        var businessId = value.toUpperCase();
        var token = store.getState().auth.authToken;

        if (typeof cancelToken !== 'undefined') {
            cancelToken.cancel('Operation canceled due to new request.');
        }
        // Save the cancel token for the current request
        cancelToken = axios.CancelToken.source();

        // const TEST_BASE_URL = 'http://localhost:50996/v1/';
        const response = await axios.get(
            `${BASE_API_URL}unique/countryId/${countryId}/businessId/${businessId}`,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Bearer ${token}`,
                    Pragma: "no-cache"
                },
                cancelToken: cancelToken.token,
            }
        );
        return response.data;
    },

    async asyncValidateTaxId(value, countryId) {
        var taxId = value.toUpperCase();
        var token = store.getState().auth.authToken;

        if (cancelTaxIdToken && !cancelTaxIdToken.token.reason) {
            cancelTaxIdToken.cancel('Operation canceled due to new request.');
        }

        cancelTaxIdToken = axios.CancelToken.source();

        try {
            const response = await axios.get(
                `${BASE_API_URL}unique/countryId/${countryId}/taxId/${taxId}`,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization: `Bearer ${token}`,
                        Pragma: "no-cache"
                    },
                    cancelToken: cancelTaxIdToken.token,
                }
            );
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },



    asyncValidateSsn(value) {
        var token = store.getState().auth.authToken;
        console.log("Token: " + token);

        return axios.get(
            `${BASE_API_URL}ssnunique/ssns/${value}`,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Bearer ${token}`,
                    Pragma: "no-cache"
                }
            }
        );
    },

    asyncValidateUniqueId(value, agentId, duplicateApi) {
        var uniqueID = value.toUpperCase();
        var token = store.getState().auth.authToken;
        var endpoint;


        if (duplicateApi.includes('${agentId}')) {
            endpoint = `${BASE_API_URL}${duplicateApi.replace('${agentId}', agentId).replace('${uniqueID}', uniqueID)}`;
        } else {
            endpoint = `${BASE_API_URL}${duplicateApi.replace('${uniqueID}', uniqueID)}`;
        }

        return axios.get(
            endpoint,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Bearer ${token}`,
                    Pragma: "no-cache"
                }
            }
        );

    },

    asyncValidateSecondaryUniqueId(value, agentId) {
        var secondaryID = value.toUpperCase();
        var token = store.getState().auth.authToken;


        return axios.get(
            `${BASE_API_URL}agentssns/agents/${agentId}/secondaryUniqueIdentity/${secondaryID}`,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Bearer ${token}`,
                    Pragma: "no-cache"
                }
            }
        );
    },

    // asyncValidateIndiviualTaxId(value, agentId) {
    //     var individualTaxId = value.toUpperCase();
    //     var token = store.getState().auth.authToken;


    //     return axios.get(
    //         `${BASE_API_URL}agentssns/agents/${agentId}/individualTaxId/${individualTaxId}`,
    //         {
    //             headers: {
    //                 'Content-Type': 'application/x-www-form-urlencoded',
    //                 Authorization: `Bearer ${token}`,
    //                 Pragma: "no-cache"
    //             }
    //         }
    //     );
    // },

    asyncValidateSsnByCountry(value, countryId,contactId="00000000-0000-0000-0000-000000000000") {
        //contactId needs to be passed if the agent needs to be excluded from the match
        var token = store.getState().auth.authToken;
        return axios.get(
            `${BASE_API_URL}ssnunique/ssns/${value}/country/${countryId}?currentContactId=${contactId}`,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Bearer ${token}`,
                    Pragma: "no-cache"
                }
            }
        ); 
    },

    asyncValidateUsername(value) {
        return axios.get(
            `${BASE_API_URL}usernameunique/usernames/${value}`,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Pragma: "no-cache"
                }
            }
        );
    },

    asyncValidateEmail(value) {
        return axios.get(
            `${BASE_API_URL}agentemailunique/emails?emailAddress=${value}`,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Pragma: "no-cache"
                }
            }
        );
    },

    asyncValidatePAN(value) {
        var token = store.getState().auth.authToken;
        console.log("Token: " + token);

        return axios.get(
            `${BASE_API_URL}panunique/pans/${value}`,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Bearer ${token}`,
                    Pragma: "no-cache"
                }
            }
        );
    }
};
