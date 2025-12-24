import { axios } from "../axios"
import qs from 'qs';

let BASE_API_URL;
let onUnauthorizedCallback;
let GOOGLE_MAPS_API_KEY;
let PAYMENT_PORTAL_BASE_URL;
let BASE_STARMATIC_API_URL;

export function registerOnUnauthorizedCallback(callback) {
    onUnauthorizedCallback = callback;
}

export function setGoogleMapsApiKey(key) {
    GOOGLE_MAPS_API_KEY = key
}
export function getGoogleMapsApiKey(key) {
    return GOOGLE_MAPS_API_KEY;
}

export function setPaymentPortalBaseUrl(uri) {
    PAYMENT_PORTAL_BASE_URL = uri;
    //axios.defaults.baseURL = uri;
}
export function getPaymentPortalBaseUrl() {
    return PAYMENT_PORTAL_BASE_URL;
    //axios.defaults.baseURL = uri;
}

export function setBaseUrl(uri) {
    BASE_API_URL = uri;
    //axios.defaults.baseURL = uri;
}
export function getBaseUrl() {
    return BASE_API_URL;
    //axios.defaults.baseURL = uri;
}
export function setStarmaticBaseUrl(uri) {
    BASE_STARMATIC_API_URL = uri;
    //axios.defaults.baseURL = uri;
}
export function getStarmaticBaseUrl() {
    return BASE_STARMATIC_API_URL;
    //axios.defaults.baseURL = uri;
}
export function setAuthorizationHeader(token) {
    axios.defaults.headers.common['Authorization'] = token;
}

function getJSONConfigwithAuth() {
    var token = axios.defaults.headers.common.Authorization;

    return {
        headers: {
            'Content-Type': 'application/json',
            Pragma: "no-cache",
            Authorization: `Bearer ${token}`
        }
    };
}

function getConfig() {
    return {
        headers: {
            'Content-Type': 'application/json',
            Pragma: "no-cache"
        }
    };
}

function getConfigWithAuth2(tokenOverride) {
    var token = axios.defaults.headers.common.Authorization || tokenOverride;
    return {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            Pragma: "no-cache"
        }
    };
}

function getConfigWithAuth(tokenOverride) {
    var token = axios.defaults.headers.common.Authorization || tokenOverride;
    return {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${token}`,
            Pragma: "no-cache"
        }
    };
}

function getConfigFormEncdoded() {
    return {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Pragma: "no-cache"
        }
    };
}

function handleError(err) {


    //console.log(err);
    if (err && err.response && err.response.status == 401) {
        // check for 401
        // if 401, auth_token is expired
        if (onUnauthorizedCallback) onUnauthorizedCallback(err.response);
        const msg = err.response.statusText || err.response.data.message;
    }

    throw err.response;
}

function handleResponse(response) {
    return response.data;
}

function encodeUrl(data) {
    let formBody = [];
    for (var property in data) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(data[property]);
        formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    return formBody;
}

export function getRequest(url, headerAddition) {
    return axios
        .get(url, {
            headers: {
                ...getConfig().headers,
                ...headerAddition,
                Pragma: "no-cache"
            }

        })
        .then(handleResponse)
        .catch(handleError);
}


export function getBlobWithAuthRequest(url, tokenOverride, mimeType) {

    var token = axios.defaults.headers.common.Authorization || tokenOverride;



    return axios
        .get(url, {
            responseType: 'arraybuffer',
            headers: {
                //  'Content-Type': 'application/json',
                'Accept': mimeType,
                Authorization: `Bearer ${token}`,
                Pragma: "no-cache"
            },

        })
        .then(handleResponse)
        .catch(handleError);
}


export function getWithAuthRequest(url, tokenOverride, params) {

    var authHeader = getConfigWithAuth(tokenOverride);

    return axios
        .get(url, { ...authHeader, params })
        .then(handleResponse)
        .catch(handleError);
}

export function postRequest(url, data) {
    return axios
        .post(url, data, getConfig())
        .then(handleResponse)
        .catch(handleError);
}

export function postRequestFormEncoded(url, data) {
    const formBody = encodeUrl(data);
    return axios
        .post(url, formBody, getConfigFormEncdoded())
        .then(handleResponse)
        .catch(handleError);
}

function encode(params, prefix) {

    var items = [];

    for (var field in params) {

        var key = prefix ? prefix + "[" + field + "]" : field;
        var type = typeof params[field];

        switch (type) {

            case "object":

                //handle arrays appropriately x[]=1&x[]=3
                if (params[field].constructor == Array) {
                    params[field].each(function (val) {
                        items.push(key + "[]=" + val);
                    }, this);
                } else {
                    //recusrively construct the sub-object
                    items = items.concat(this.encode(params[field], key));
                }
                break;
            case "function":
                break;
            default:
                items.push(key + "=" + escape(params[field]));
                break;
        }
    }

    return items.join("&");
}

export function postRequestURLEncodedWithAuth(url, data) {
    var authHeader = getConfigWithAuth();
    const requestData = data ? qs.stringify(data) : "";
    return axios
        .post(url, requestData, authHeader)
        .then(handleResponse)
        .catch(handleError);

}
export function postRequestURLEncoded(url, data) {
    var authHeader = getConfigWithAuth2();
    return axios
        .post(url, data, authHeader)
        .then(handleResponse)
        .catch(handleError);
}

export function postRequestFormEncodedWithAuth(url, data) {

    console.log(data)

    let formBody = encodeUrl(data);
    var authHeader = getConfigWithAuth();

    return axios
        .post(url, formBody, authHeader)
        .then(handleResponse)
        .catch(handleError);
}


export function postRequestWithAuth(url, data) {

    const formBody = data;

    var authHeader = getJSONConfigwithAuth();

    return axios
        .post(url, formBody, authHeader)
        .then(handleResponse)
        .catch(handleError);
}


export function putRequestFormEncoded(url, data) {
    const formBody = encodeUrl(data);
    return axios
        .put(url, formBody, getConfigFormEncdoded())
        .then(handleResponse)
        .catch(handleError);
}

export function putWithAuthRequest(url, data) {

    var authHeader = getConfigWithAuth();

    const formBody = encodeUrl(data);
    return axios
        .put(url, formBody, authHeader)
        .then(handleResponse)
        .catch(handleError);
}

export function deleteRequest(url) {
    return axios
        .delete(url, getConfig())
        .then(handleResponse)
        .catch(handleError);
}

export function deleteWithAuthRequest(url) {

    var authHeader = getConfigWithAuth();

    return axios
        .delete(url, authHeader)
        .then(handleResponse)
        .catch(handleError);
}


export const postRequestWithTextType=(url)=>{
    let headersList = {
        Accept: "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "text/plain",
        "x-client-id": "0oaf7eri45ex8LtEd4x7",
        "x-client-secret":
          "zthi5O4ZnMeThKvgDjxoxiQmhv2PiaehyMlDo1gCwLS2i6TzbfRUOshbMDI9Okl2",
      };
  
      let bodyContent = `{
             "id": "OZGCXt0N-sIrxW44iy3UFNsjNYs="
           }`;
      let reqOptions = {
        url: url,
        method: "POST",
        headers: headersList,
        data: bodyContent,
      };
    return axios.request(reqOptions).then(handleResponse).catch(handleError)
}
