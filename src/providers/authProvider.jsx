import React, { Component } from "react";
import { connect } from 'react-redux';
import AuthService from "../services/authService";
import Cookies from 'universal-cookie';
import { setToken, getToken } from '../actions/loginActions';
import { unauthorizedResponseReceived } from "../actions/authActions"
import { loginRedirect, logoutRedirect } from '../actions/loginActions';
import { setUserDevice } from "../actions/appActions";
import { setBaseUrl, registerOnUnauthorizedCallback, setGoogleMapsApiKey, setPaymentPortalBaseUrl,setStarmaticBaseUrl } from "spotify-shared/api/helpers/request"
import { BASE_API_URL, GOOGLE_MAPS_API_KEY, REACT_APP_PORTAL_BASE_URL, PAYMENT_PORTAL_BASE_URL,BASE_STARMATIC_API_URL } from "../config"
import { agentTypeApi } from "../sagas/api";
import { MarketingParamKeys } from '../constants';
import cookie from 'react-cookies';

import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
} from "react-device-detect";
import LanguageToggle from "../components/layouts/LanguageToggle";


const AuthContext = React.createContext({
    signinRedirectCallback: () => ({}),
    logout: () => ({}),
    signoutRedirectCallback: () => ({}),
    isAuthenticated: () => ({}),
    signinRedirect: () => ({}),
    signinSilentCallback: () => ({}),
    createSigninRequest: () => ({}),
    getUser: () => ({}),
    sub: () => ({}),
    token: () => ({})
});

export const AuthConsumer = AuthContext.Consumer;

class AuthProvider extends React.Component {

    authService;
    UserManager;
    accessToken;
    user;
    sub;
    token;
    helpBotLoaded;
    setMarketingParams


    renameMarketingParamKeys = (obj) => {
        if (obj) {
            const keyValues = Object.keys(obj).map(key => {
                const newKey = MarketingParamKeys[key] || key;
                const shouldReplaceSpecialCharacters = [newKey] == "Keyword" || [newKey] == "Term"
                return { [newKey]: (obj[key] && shouldReplaceSpecialCharacters) ? obj[key].replace(/\+/g, " ").trim() : obj[key] };
            });
            return Object.assign({}, ...keyValues);
        }
    }

    componentDidUpdate() {
        const cookies = new Cookies();
        const { agentProfile } = this.props;
        let marketingParams = cookies.get('marketing_params');
        marketingParams = this.renameMarketingParamKeys(marketingParams)

        if (agentProfile.agentId && !this.helpBotLoaded) {
            this.helpBotLoaded = true;
            agentTypeApi.getHelpBot(agentProfile.agentId)
                .then(scriptText => {

                    if (document.getElementById("helpBot") === null) {
                        var script = document.createElement('script');
                        script.type = 'text/javascript';
                        script.id = 'helpBot';
                        script.async = true;

                        script.appendChild(document.createTextNode(scriptText));
                        document.body.appendChild(script);
                    }
                })
                .catch(err => console.error(`Could not retrieve Help Bot script. Error: ${err}`))
        }




        if (agentProfile.agentId && marketingParams && !this.setMarketingParams) {
            this.setMarketingParams = true;
            agentTypeApi.postMarketingParams(agentProfile.agentId, marketingParams)
                .then(() => cookies.remove('marketing_params'))
                .catch(err => console.error(`Could not pass marketing parameters. Error: ${err}`))
        }

        if (agentProfile && agentProfile.contractorTypeCompleted === false && agentProfile.registrationType == "506920000") {

            window.location.href = `${REACT_APP_PORTAL_BASE_URL}home`;
        }
    }

    componentDidMount() {

        const { router: { location: { pathname, search } } } = this.props;

        if (pathname.includes('opportunity') || pathname.includes('preferences')) localStorage.setItem('redirect_path', pathname);
        if (pathname.includes('lmsauthentication')) {
            localStorage.setItem('redirect_path', `${pathname}${search}`);
            localStorage.setItem('showModels', `false`);
        }

        this.authService.getUser().then(user => {
            if (user !== undefined && user !== null) {
                this.user = user;
                this.sub = this.user.profile.sub;
                this.token = this.user.access_token;
                this.setState({ userId: this.user.profile.sub });
                if (this.user.expired === false) this.props.setToken(this.user.access_token);

            } else {

                if (process.env.NODE_ENV !== "development") {
                    /*
                     This is needed to fix a bug if a user book marks the login page directlly 
                     */
                    /* setTimeout(() => {
                         window.location.href = window.location.origin
                     }, 500)*/
                }

            }

        });
    }

    constructor(props) {
        super(props);
        this.authService = new AuthService(this.props.setToken);
        setBaseUrl(BASE_API_URL);
        setStarmaticBaseUrl(BASE_STARMATIC_API_URL);
        setPaymentPortalBaseUrl(PAYMENT_PORTAL_BASE_URL);
        setGoogleMapsApiKey(GOOGLE_MAPS_API_KEY);
        registerOnUnauthorizedCallback(this.props.unauthorizedResponseReceived);

        this.props.setUserDevice(isMobile === true ? "Mobile" : "Desktop")
    }

    //Removed language Modal from R2C
    render() {
        // -------------------------------------------------------------------------------------------------------------------------------------------

        const hasCountrySelected = cookie.load("remoteIPAddress")
        // return (
        //     !hasCountrySelected ?
        //         <LanguageToggle /> :
        //         <AuthContext.Provider value={this.authService}>{this.props.children}</AuthContext.Provider>);

        //-----------------------------------------------------------------------------------------------------------------------------------------
        return <AuthContext.Provider value={this.authService}>{this.props.children}</AuthContext.Provider>;
    }
}

const mapStateToProps = state => state;
const mapDispatchToProps = {
    setToken
    , getToken
    , unauthorizedResponseReceived
    , setUserDevice
    , loginRedirect
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthProvider);



