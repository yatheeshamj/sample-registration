let REGISTRATION_BASE_URL;
let REGISTRATION_TYPE;
let LOGIN_BASE_URL;
let GOOGLE_RECAPTCHA_CLIENT_KEY;
let GOOGLE_MAPS_API_KEY;
let BASE_API_URL;
let BASE_AUTH_URL;
let PORTAL_REDIRECT_URL;
let IPAPI_IPADDRESS_API_KEY;

if (!process.env.REACT_APP_SERVER_URL) {
    REGISTRATION_BASE_URL = 'https://stgregister.spotify.com';
    BASE_API_URL = "https://stgregister.spotify.com/api/prm/v1/";
    BASE_AUTH_URL = "https://stgoauth.spotify.com/";
    //BASE_API_URL = "http://localhost:50996/v1/";
    //BASE_AUTH_URL = "http://localhost:41650/";
    //REGISTRATION_BASE_URL = 'https://stgregister.spotify.com';
    //BASE_API_URL = "https://stgregister.spotify.com/api/prm/v1/";
    //BASE_AUTH_URL = "https://stgoauth.spotify.com/";
    //BASE_API_URL = "http://localhost:50996/v1/";
    //BASE_AUTH_URL = "http://localhost:41650/";
    REGISTRATION_BASE_URL = 'https://stgregister.spotify.com';
    BASE_API_URL = "https://stgregister.spotify.com/api/prm/v1/";
    BASE_AUTH_URL = "https://stgoauth.spotify.com/";
    REGISTRATION_TYPE = 506920001;
    LOGIN_BASE_URL = 'https://stgregister.spotify.com';
    GOOGLE_RECAPTCHA_CLIENT_KEY = '6LfFdqEUAAAAAIcO8jucHIBFeOsgr_D-EcfN2ohA';
    GOOGLE_MAPS_API_KEY = 'AIzaSyDea9QM44uAgDPRaBlVTj-_EKcPTEM0GM0';
    //PORTAL_REDIRECT_URL = 'https://stglink.local.com/auth/signin';
    PORTAL_REDIRECT_URL = 'https://stglink.spotify.com/auth/signin';
    IPAPI_IPADDRESS_API_KEY = 'Xg7B67L221ebiZYyYAoj5BaHyn3Ppo2C7eGGy3pL0IOtsVzPUj';
} else {
    REGISTRATION_BASE_URL = 'https://stgregister.spotify.com';
    BASE_API_URL = "https://stgregister.spotify.com/api/prm/v1/";
    REGISTRATION_BASE_URL = '{{some-production-base-url}}';
    REGISTRATION_TYPE = '{{some-number}}';
    LOGIN_BASE_URL = '{{some-production-base-url}}';
    GOOGLE_RECAPTCHA_CLIENT_KEY = '{some-client-key}';
    GOOGLE_MAPS_API_KEY = '{some-client-key}';
    // PORTAL_REDIRECT_URL = 'https://stglink.local.com/auth/signin';
    PORTAL_REDIRECT_URL = 'https://stglink.spotify.com/auth/signin';
    IPAPI_IPADDRESS_API_KEY = '{some-client-key}';
}

export {
    BASE_AUTH_URL,
    BASE_API_URL,
    REGISTRATION_BASE_URL,
    REGISTRATION_TYPE,
    LOGIN_BASE_URL,
    GOOGLE_MAPS_API_KEY,
    GOOGLE_RECAPTCHA_CLIENT_KEY,
    PORTAL_REDIRECT_URL,
    IPAPI_IPADDRESS_API_KEY
};
