let REGISTRATION_BASE_URL;
let REGISTRATION_TYPE;
let LOGIN_BASE_URL;
let GOOGLE_RECAPTCHA_CLIENT_KEY;
let GOOGLE_MAPS_API_KEY;
let BASE_API_URL;
let BASE_AUTH_URL;
let PORTAL_REDIRECT_URL;
let REACT_APP_PORTAL_BASE_URL;
let PAYMENT_PORTAL_BASE_URL;
let Show_Agent_header = false;
let REACT_APP_CHANGEPASSWORD_URL;
let IPAPI_IPADDRESS_API_KEY;
let SMARTY_ADDRESS_US;
let SMARTY_ADDRESS_NON_US;
let SMARTY_API_KEY;
let BASE_STARMATIC_API_URL

if (!process.env.REACT_APP_SERVER_URL) {
    REGISTRATION_BASE_URL = 'https://bravoregister.spotify.com';
    BASE_API_URL = "https://bravoregister.spotify.com/api/prm/v1/";
    BASE_AUTH_URL = "https://bravooauth.spotify.com/";
    REGISTRATION_TYPE = 506920001;
    LOGIN_BASE_URL = 'https://bravoregister.spotify.com';
    GOOGLE_RECAPTCHA_CLIENT_KEY = '6LfFdqEUAAAAAIcO8jucHIBFeOsgr_D-EcfN2ohA';
    GOOGLE_MAPS_API_KEY = 'AIzaSyDea9QM44uAgDPRaBlVTj-_EKcPTEM0GM0';

    PORTAL_REDIRECT_URL = 'https://bravolink.spotify.com/auth/signin';
    REACT_APP_PORTAL_BASE_URL = 'https://bravolink.spotify.com/';
    PAYMENT_PORTAL_BASE_URL = 'https://bravopayment.spotify.com';
    Show_Agent_header = true;
    REACT_APP_CHANGEPASSWORD_URL = 'https://bravooauth.spotify.com/Account/changePassword?requestType=2';
    IPAPI_IPADDRESS_API_KEY = 'Xg7B67L221ebiZYyYAoj5BaHyn3Ppo2C7eGGy3pL0IOtsVzPUj';
    SMARTY_ADDRESS_US = "https://us-autocomplete-pro.api.smarty.com"
    SMARTY_ADDRESS_NON_US = "https://international-autocomplete.api.smarty.com"
    SMARTY_API_KEY = "190228402202980866"
    BASE_STARMATIC_API_URL="https://bravoregister.spotify.com/api/starmatic/v1/";
} else {
    REGISTRATION_BASE_URL = 'https://bravoregister.spotify.com';
    BASE_API_URL = "https://bravoregister.spotify.com/api/prm/v1/";
    REGISTRATION_BASE_URL = '{{some-production-base-url}}';
    REGISTRATION_TYPE = '{{some-number}}';
    LOGIN_BASE_URL = '{{some-production-base-url}}';
    GOOGLE_RECAPTCHA_CLIENT_KEY = '{some-client-key}';
    GOOGLE_MAPS_API_KEY = '{some-client-key}';
    PORTAL_REDIRECT_URL = 'https://bravolink.spotify.com/auth/signin';
    REACT_APP_PORTAL_BASE_URL = 'https://bravolink.spotify.com/';
    PAYMENT_PORTAL_BASE_URL = 'https://bravopayment.spotify.com';
    Show_Agent_header = true;
    REACT_APP_CHANGEPASSWORD_URL = 'https://bravooauth.spotify.com/Account/changePassword?requestType=2';
    IPAPI_IPADDRESS_API_KEY = '{some-client-key}';
}

if (process.env.REACT_APP_spotify_PROD) {

    REGISTRATION_BASE_URL = 'https://register.spotify.com';
    BASE_API_URL = "https://register.spotify.com/api/prm/v1/";
    BASE_AUTH_URL = "https://oauth.spotify.com";
    REGISTRATION_TYPE = 506920001;
    LOGIN_BASE_URL = 'https://register.spotify.com';
    GOOGLE_RECAPTCHA_CLIENT_KEY = '6LfFdqEUAAAAAIcO8jucHIBFeOsgr_D-EcfN2ohA';
    GOOGLE_MAPS_API_KEY = 'AIzaSyDea9QM44uAgDPRaBlVTj-_EKcPTEM0GM0';
    PORTAL_REDIRECT_URL = 'https://link.spotify.com/auth/signin';
    REACT_APP_PORTAL_BASE_URL = 'https://link.spotify.com/';
    PAYMENT_PORTAL_BASE_URL = 'https://payment.spotify.com';
    REACT_APP_CHANGEPASSWORD_URL = 'https://oauth.spotify.com/Account/changePassword?requestType=2';
    IPAPI_IPADDRESS_API_KEY = 'Xg7B67L221ebiZYyYAoj5BaHyn3Ppo2C7eGGy3pL0IOtsVzPUj';
    SMARTY_ADDRESS_US = "https://us-autocomplete-pro.api.smarty.com"
    SMARTY_ADDRESS_NON_US = "https://international-autocomplete.api.smarty.com"
    SMARTY_API_KEY = "190228402202980866"
    BASE_STARMATIC_API_URL="https://register.spotify.com/api/starmatic/v1/";
}

const ADMISSION_STEP_ROUTES = {
    validateAccount: "/validateaccount",
    contractorType: "/contractortype",
    // Newly written class for All Countries
    soleProprietor: "/contractortype/soleproprietor",
    registerBusiness: "/contractortype/register-business",
    joinBusiness: "/contractortype/join-business",

    // Old Files for individual countries
    soleProprietor_uk_ca: "/contractortype/soleproprietor-uk-ca",
    soleProprietor_us: "/contractortype/soleproprietor-us",
    soleProprietor_jm: "/contractortype/soleproprietor-jm",
    soleProprietor_in: "/contractortype/soleproprietor-in",
    // 
    servicePartner: "/contractortype/servicepartner",
    servicePartner_us: "/contractortype/servicepartner-us",
    joinServicePartner: "/contractortype/joinservicepartner",
    joinServicePartner_us: "/contractortype/joinservicepartner-us"
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
    ADMISSION_STEP_ROUTES,
    REACT_APP_PORTAL_BASE_URL,
    PAYMENT_PORTAL_BASE_URL,
    Show_Agent_header,
    REACT_APP_CHANGEPASSWORD_URL,
    IPAPI_IPADDRESS_API_KEY,
    SMARTY_API_KEY,
    SMARTY_ADDRESS_US,
    SMARTY_ADDRESS_NON_US,
    BASE_STARMATIC_API_URL
};
