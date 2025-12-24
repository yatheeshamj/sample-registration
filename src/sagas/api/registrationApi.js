import {
  getRequest,
  getWithAuthRequest,
  postRequestFormEncoded,
  putWithAuthRequest,
  putRequestFormEncoded
} from "spotify-shared/api/helpers/request";

import {
  BASE_API_URL,
  REGISTRATION_TYPE,
  GOOGLE_MAPS_API_KEY,
} from "../../config";

import AuthService from "../../services/authService";
import { GOOGLE_MAPS_BASE_URL } from "../../constants";
import { getReferralUser } from "../../actions/registrationActions";
import { agentProfile } from "spotify-shared/selectors";

export default {
  registerRedirect(params) {
    var authService = new AuthService();
    authService.signinRedirect(params);
  },

  createAgentProfile(action) {
    const payload = Object.assign(action.payload, {
      registrationType: REGISTRATION_TYPE,
    });

    return postRequestFormEncoded(`${BASE_API_URL}agentprofiles`, payload);
  },

  getUserProfile(action) {
    const userId = action.payload;
    var url = `${BASE_API_URL}agentprofiles/${userId}`;
    return getWithAuthRequest(url, action.auth_token);
  },

  getLegacyUserId(action) {
    const { agentId, auth_token } = action.payload;
    var url = `${BASE_API_URL}contacts/agents/${agentId}`;
    return getWithAuthRequest(url, auth_token);
  },

  getUserCountry(action) {
    return fetch(
      `${GOOGLE_MAPS_BASE_URL}/geolocation/v1/geolocate?key=${GOOGLE_MAPS_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Pragma: "no-cache",
        },
        body: JSON.stringify(action.payload),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        const { lat, lng } = response.location;
        return fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`,
          {
            method: "GET",
          }
        )
          .then((resp) => {
            return resp.json();
          })
          .then((resp) => {
            if (!resp.results.length) {
              return null;
            } else {
              return {
                name: resp.results[resp.results.length - 1]
                  .address_components[0].long_name,
                code: resp.results[resp.results.length - 1]
                  .address_components[0].short_name,
              };
            }
          });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getCountries(action) {
    return getRequest(`${BASE_API_URL}countries`);
  },

  getStates(action) {
    //return getRequest(`${BASE_API_URL}states`);
    const { countryId } = action.payload
    return getRequest(`${BASE_API_URL}states/statecountry/${countryId}`);
  },

  getProvinces(action) {
    const { countryId } = action.payload
    return getRequest(`${BASE_API_URL}provinces/country/${countryId}`);
  },

  getReferralUser(action) {
    const userId = action.payload;
    return getWithAuthRequest(`${BASE_API_URL}referral/${userId}`);
  },
  updateReferralUser(action) {
    const referralUser = action.payload.referUser;
    const userId = action.payload.userId;
    return putWithAuthRequest(
      `${BASE_API_URL}referral/referrals/${userId}`,
      referralUser
    );
  },

  updateJMNameAndDOB(props) {

    const { contactId, formData, thresholdDate, agentId } = props
    const { firstname, lastname, dob } = formData

    // const dateStringdob = dob.getDate().toString() + "-" + ( dob.getMonth() + 1).toString() + "-" + dob.getFullYear().toString();
    const dateStringdob = (dob.getMonth() + 1).toString() + "-" + dob.getDate().toString() + "-" + dob.getFullYear().toString();
    //const dateStringTreshold=thresholdDate.getDate().toString() + "-" + ( thresholdDate.getMonth() + 1).toString() + "-" + thresholdDate.getFullYear().toString();
    const dateStringTreshold = (thresholdDate.getMonth() + 1).toString() + "-" + thresholdDate.getDate().toString() + "-" + thresholdDate.getFullYear().toString();

    return putWithAuthRequest(
      `${BASE_API_URL}agentProfiles/agents/${agentId}/agentCrmId/${contactId}/firstname/${firstname}/lastname/${lastname}/dob/${dateStringdob}/thresholdDate/${dateStringTreshold}`
    );
  },

  getParishes(action) {

    const { countryId } = action.payload
    return getRequest(`${BASE_API_URL}provinces/country/${countryId}`);
  },

  putParishData(action) {
    const { agentId, contactId } = action.payload
    const { parishId } = action.payload.formData
    return putWithAuthRequest(`${BASE_API_URL}agentProfiles/agentId/${contactId}/parishId/${parishId}`, action.payload.formData)
  },


  checkifConsentSigned(action) {
    const { agentId, contactId } = action.payload;
    return getWithAuthRequest(`${BASE_API_URL}agreements/agents/${agentId}/contactid/${contactId}`)
  },
  declineJmConsent(action) {
    const { agentId, contactId } = action.payload;

    return putWithAuthRequest(`${BASE_API_URL}agentProfiles/consent/decline/agentId/${agentId}/contacttId/${contactId}`)
  },

  updateUsersLanguagePreference(action) {
    const { agentId, language } = action.payload;

    return putWithAuthRequest(`${BASE_API_URL}Preferencesquestions/agents/${agentId}/preferredlanguage/${language}`);
  }
};


