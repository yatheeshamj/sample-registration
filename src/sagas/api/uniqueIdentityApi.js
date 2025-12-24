import { BASE_API_URL } from '../../config';
import {
    getWithAuthRequest,
    postRequestFormEncodedWithAuth,
    deleteWithAuthRequest,
    putWithAuthRequest,
    postRequestURLEncodedWithAuth
} from 'spotify-shared/api/helpers/request';




export default {
    verifyPrimaryUniqueIdentityAPI(action) {

        const { agentId, uniqueIdentity, firstName, middleInitial, lastName, countryId, submitApi } = action.payload;
        var endpoint;
        if (submitApi.includes('${countryId}')) {
            endpoint = `${BASE_API_URL}${submitApi.replace('${agentId}', agentId).replace('${uniqueIdentity}', uniqueIdentity).replace('${countryId}', countryId).replace('${firstName}', firstName).replace('${lastName}', lastName)}`;
        } else {
            endpoint = `${BASE_API_URL}${submitApi.replace('${agentId}', agentId).replace('${uniqueIdentity}', uniqueIdentity).replace('${firstName}', firstName).replace('${middleInitial}', middleInitial).replace('${lastName}', lastName)}`;
        }

        return putWithAuthRequest(endpoint);

    },
    verifySecondaryUniqueIdentity(action) {
        const { agentId, uniqueIdentity, secondaryUniqueIdentity, firstName, middleInitial, lastName, countryId } = action.payload;


        return putWithAuthRequest(
            `${BASE_API_URL}agentssns/agents/${agentId}/secondaryUniqueIdentity/${secondaryUniqueIdentity}?firstName=${firstName}&middleName=${middleInitial}&lastName=${lastName}`
        );
    },

    getAadhaarRedirectionURLAPI(action) {

        const { agentId, uniqueIdentity, firstName, middleInitial, lastName } = action.payload;


        return postRequestURLEncodedWithAuth(
            `${BASE_API_URL}IndiaAadhar/agents/${agentId}/Aadhar/${uniqueIdentity}`
            // `${BASE_API_URL}IndiaAadhar/agents/936240/Aadhar/270398753910`
        );

    },
    checkPrimaryUniqueIdentityVerifiedAPI(action) {
        const { agentId, uniqueIdentity, firstName, middleInitial, lastName, requestId, personId } = action.payload;


        return postRequestURLEncodedWithAuth(

            // `${BASE_API_URL}IndiaAadhar/agents/936240/Aadhar/270398753910/RequestId/6597a64e6351d3001347c55f/PersonId/6597a64d6351d3001347c557/FirstName/bharat/LastName/kumar`
            `${BASE_API_URL}IndiaAadhar/agents/${agentId}/Aadhar/${uniqueIdentity}/RequestId/${requestId}/PersonId/${personId}/FirstName/${firstName}/LastName/${lastName}`

        );


    },
    checkSecondaryUniqueIdentityVerifiedAPI(action) {
        const { agentId, firstName, lastName, secondaryUniqueIdentity, middleInitial } = action.payload;

        if (middleInitial !== "") {
            return postRequestURLEncodedWithAuth(

                // `${BASE_API_URL}IndiaPAN/agents/936240/PAN/AOGPK0597L/firstName/bharat/lastName/kumar`
                `${BASE_API_URL}IndiaPAN/agents/${agentId}/PAN/${secondaryUniqueIdentity}/firstName/${firstName}/lastName/${lastName}/middleName/${middleInitial}`

            );
        }
        else {
            return postRequestURLEncodedWithAuth(

                // `${BASE_API_URL}IndiaPAN/agents/936240/PAN/AOGPK0597L/firstName/bharat/lastName/kumar`
                `${BASE_API_URL}IndiaPAN/agents/${agentId}/PAN/${secondaryUniqueIdentity}/firstName/${firstName}/lastName/${lastName}`

            );
        }
    }
}

