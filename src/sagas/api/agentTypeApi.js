import {
    getWithAuthRequest,
    postRequestFormEncodedWithAuth,
    deleteWithAuthRequest,
    putWithAuthRequest,
    postRequestURLEncodedWithAuth,
    getRequest
} from 'spotify-shared/api/helpers/request';


import { BASE_API_URL } from '../../config';
import { country } from 'spotify-shared/reducers';
import { COUNTRY_IDS } from '../../constants'

export default {
    selectBusinessPath(action) {
        const { agentId, path } = action.payload;
        var uri = `${BASE_API_URL}selectbusinesspaths/agents/${agentId}/paths/${path}`;
        return postRequestFormEncodedWithAuth(uri, null);
    },

    registerIndividual(action) {
        const { agentId, countryId } = action.payload;
        console.log("register indiviual")

        if (countryId && countryId === COUNTRY_IDS.IN) {
            return postRequestFormEncodedWithAuth(
                //`${BASE_API_URL}registerindividuals/agents/${agentId}/country/${countryId}`
                `${BASE_API_URL}registerindividuals/agents/${agentId}`
            );
        }
        else if (countryId && countryId === COUNTRY_IDS.JM) {
            return postRequestFormEncodedWithAuth(
                `${BASE_API_URL}registerindividuals/agents/${agentId}/country/${countryId}`
            );
        }
        else {
            return postRequestFormEncodedWithAuth(
                `${BASE_API_URL}registerindividuals/agents/${agentId}`
            );
        }
    },

    registerIndividualByCountry(action) {
        const { agentId, countryId } = action.payload;

        return postRequestFormEncodedWithAuth(
            `${BASE_API_URL}registerindividuals/agents/${agentId}/country/${countryId}`
        );
    },

    verifySsnUnique(action) {
        const ssn = action.payload;

        return getWithAuthRequest(
            `${BASE_API_URL}ssnunique/ssns/${ssn}`
        );
    },

    verifySsnAndName(action) {
        const { agentId, ssn, firstName, lastName } = action.payload;

        return putWithAuthRequest(
            `${BASE_API_URL}agentssns/agents/${agentId}/ssns/${ssn}?firstName=${firstName}&lastName=${lastName}`
        );
    },

    verifySsnAndNameByCountry(action) {
        const { agentId, ssn, firstName, lastName, countryId } = action.payload;

        return putWithAuthRequest(
            `${BASE_API_URL}agentssns/agents/${agentId}/ssns/${ssn}/countryId/${countryId}?firstName=${firstName}&lastName=${lastName}`
        );
    },

    springverifygst(action) {
        let { agentId, vatid, name } = action.payload;

        return postRequestFormEncodedWithAuth(
            `${BASE_API_URL}IndiaGST/agents/${agentId}/GST/${vatid}/CompanyName/${name}`
        );
    },

    secverify(action) {
        let { agentId, vatid, name } = action.payload;

        const sanitizedcompanyName = name.replace(/\.+$/, ''); // Removes trailing dots

        return getWithAuthRequest(
            `${BASE_API_URL}PhilippinesSECValidation/agentId/${agentId}/secNumber/${vatid}/company/${sanitizedcompanyName}`
        );
    },

    tinverify(action) {
        let { agentId, vatid, name } = action.payload;

        const sanitizedcompanyName = name.replace(/\.+$/, ''); // Removes trailing dots

        return getWithAuthRequest(
            `${BASE_API_URL}PhilippinesTINValidation/agentId/${agentId}/tinNumber/${vatid}/company/${sanitizedcompanyName}`
        );

    },

    registerBusiness(action) {
        let { agentId, ...formData } = action.payload;
        console.log("action.payload from indian business ", action.payload);

        return postRequestFormEncodedWithAuth(
            `${BASE_API_URL}registerbusinesses/agents/${agentId}`,
            { ...formData, }
        );
    },

    validateGstHst(action) {
        const { data } = action.payload;
        const { agentId, gstNumber, companyName } = data;
        const sanitizedcompanyName = companyName.replace(/\.+$/, ''); // Removes trailing dots
        return getRequest(
            `${BASE_API_URL}gstValidation/agentId/${agentId}/gstNumber/${gstNumber}/companyName/${sanitizedcompanyName}`
        );
    },

    verifyFeinUnique(action) {
        const fein = action.payload;
        return getWithAuthRequest(
            `${BASE_API_URL}feinunique/feins/${fein}`
        );
    },

    verifyIsBusinessIdUnique(action) {


        const id = action.payload;
        return getWithAuthRequest(
            `${BASE_API_URL}feinunique/feins/${id}`
        );
    },



    joinBusiness(action) {
        const { businessId, agentId } = action.payload;

        return postRequestFormEncodedWithAuth(
            `${BASE_API_URL}joinbusinesses/agents/${agentId}/businesses/${businessId}`
        );
    },

    getBusinessByFein(action) {
        const { fein, countryId } = action.payload;

        return getWithAuthRequest(
            `${BASE_API_URL}businessbyfeins/feins/${fein}/countries/${countryId}`
        );
    },

    getBusinessById(action) {
        const { businessId, countryId } = action.payload;

        return getWithAuthRequest(
            `${BASE_API_URL}businesses/${businessId}/countries/${countryId}`
        );
    },

    getBusinessesToJoin(action) {
        const { countryId, agentId } = action.payload;

        return getWithAuthRequest(
            `${BASE_API_URL}joinbusinesses/countries/${countryId}/agents/${agentId}`
        );
    },

    removeJoinBusiness(action) {
        const { agentId } = action.payload;
        var uri = `${BASE_API_URL}joinbusinesses/agents/${agentId}`;
        return deleteWithAuthRequest(uri);
    },

    removeRegisterBusiness(action) {
        const { agentId } = action.payload;
        var uri = `${BASE_API_URL}registerbusinesses/agents/${agentId}`
        return deleteWithAuthRequest(uri);
    },

    removeRegisterIndividual(action) {
        const { agentId } = action.payload;
        var uri = `${BASE_API_URL}registerindividuals/agents/${agentId}`;
        return deleteWithAuthRequest(uri);
    },

    getJoinBusinessStatus(action) {
        const { agentId } = action.payload;
        var uri = `${BASE_API_URL}joinbusinesses/agents/${agentId}`;
        return getWithAuthRequest(uri);
    },

    getGstHst(action) {
        return getWithAuthRequest(
            `${BASE_API_URL}enumerations/100000000/`
        );
    },

    getTypeOfIncopration(action) {
        return getWithAuthRequest(
            `${BASE_API_URL}enumerations/100000001/`
        );
    },

    finalizeRegisterBusiness(action) {
        const { agentId } = action.payload;

        return putWithAuthRequest(
            `${BASE_API_URL}registerbusinesses/agents/${agentId}/actions/finalize`
        );
    },

    finalizeRegisterIndividual(action) {
        const { agentId } = action.payload;

        return putWithAuthRequest(
            `${BASE_API_URL}registerindividuals/agents/${agentId}/actions/finalize`
        );
    },

    getMedia(action) {
        const { countryId } = action.payload;
        return getWithAuthRequest(
            `${BASE_API_URL}medias/countries/${countryId}/items/1000000`
        );
    },

    getHelpBot(agentId) {
        return getWithAuthRequest(
            `${BASE_API_URL}/helpbots/agents/${agentId}`
        );
    },

    postMarketingParams(agentId, marketingParams) {
        return postRequestURLEncodedWithAuth(`${BASE_API_URL}campaigndetails/agents/${agentId}`, marketingParams);
    },

    checkScreeningAssessmentRequired(action) {
        const { agentId } = action.payload;
        return getWithAuthRequest(
            `${BASE_API_URL}screeningassessments/agents/${agentId}`
        );
    },

    checkScreeningAssessmentRequiredByCountry(action) {
        const { agentId, countryId } = action.payload;
        return getWithAuthRequest(
            `${BASE_API_URL}screeningassessments/agents/${agentId}/country/${countryId}`
        );
    },
};
