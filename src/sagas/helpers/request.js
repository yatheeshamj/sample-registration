//import { axios } from 'spotify-shared/api/axios';


//export function setAuthorizationHeader(token) {
//    axios.defaults.headers.common['Authorization'] = token;
//}

//function getConfig() {
//    return {
//        headers: {
//            'Content-Type': 'application/json'
//        }
//    };
//}

//function getConfigWithAuth(tokenOverride) {
//    var token = axios.defaults.headers.common.Authorization || tokenOverride // store.getState().auth.authToken;
//    return {
//        headers: {
//            'Content-Type': 'application/x-www-form-urlencoded',
//            Authorization: `Bearer ${token}`
//        }
//    };
//}

//function getConfigFormEncdoded() {
//    return {
//        headers: {
//            'Content-Type': 'application/x-www-form-urlencoded'
//        }
//    };
//}

//function handleError(err) {
//    // check for 401
//    // if 401, auth_token is expired
//    // call LOGOUT_USER action
//    // call EXPIRED_TOKEN action
//    if (err.status === "401") {
//        alert(err.response.statusText);
//    }
//    //this.history.pushState(null, '/logout/callback');
//    throw err.response;
//}

//function handleResponse(response) {
//    return response.data;
//}

//function encodeUrl(data) {
//    let formBody = [];
//    for (var property in data) {
//        var encodedKey = encodeURIComponent(property);
//        var encodedValue = encodeURIComponent(data[property]);
//        formBody.push(encodedKey + '=' + encodedValue);
//    }
//    formBody = formBody.join('&');
//    return formBody;
//}

//export function getRequest(url) {
//    return axios
//        .get(url, getConfig())
//        .then(handleResponse)
//        .catch(handleError);
//}

//export function getWithAuthRequest(url, tokenOverride) {  

//    var authHeader = getConfigWithAuth(tokenOverride); 
   
//    return axios
//        .get(url, authHeader)
//        .then(handleResponse)
//        .catch(handleError);
//}

//export function postRequest(url, data) {
//    return axios
//        .post(url, data, getConfig())
//        .then(handleResponse)
//        .catch(handleError);
//}

//export function postRequestFormEncoded(url, data) {
//    const formBody = encodeUrl(data);
//    return axios
//        .post(url, formBody, getConfigFormEncdoded())
//        .then(handleResponse)
//        .catch(handleError);
//}

//export function postRequestFormEncodedWithAuth(url, data) {     
    
//    const formBody = encodeUrl(data);   

//    var authHeader = getConfigWithAuth();
   
//    return axios
//        .post(url, formBody, authHeader)
//        .then(handleResponse)
//        .catch(handleError);
//}

//export function putRequestFormEncoded(url, data) {
//    const formBody = encodeUrl(data);
//    return axios
//        .put(url, formBody, getConfigFormEncdoded())
//        .then(handleResponse)
//        .catch(handleError);
//}

//export function putWithAuthRequest(url, data, ) {

//    var authHeader = getConfigWithAuth();

//    const formBody = encodeUrl(data);
//    return axios
//        .put(url, formBody, authHeader)
//        .then(handleResponse)
//        .catch(handleError);
//}

//export function deleteRequest(url) {
//    return axios
//        .delete(url, getConfig())
//        .then(handleResponse)
//        .catch(handleError);
//}

//export function deleteWithAuthRequest(url) {

//    var authHeader = getConfigWithAuth();

//    return axios
//        .delete(url, authHeader)
//        .then(handleResponse)
//        .catch(handleError);
//}
