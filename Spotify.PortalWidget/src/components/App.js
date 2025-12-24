import "./app.scss"
import React, { Component, Fragment } from 'react';
import { withLocalize, Translate } from 'spotify-shared-web/localize'
import { Nav, Tabs, Tab, Row, Col, TabPane } from 'react-bootstrap';
import { connect } from 'react-redux';
import { renderToStaticMarkup } from "react-dom/server";
import englishResources from "spotify-shared/resources/en.resources.json";
import OpportunitiesWidget from "./OpportunitiesWidget"
import { setBaseUrl, registerOnUnauthorizedCallback, setGoogleMapsApiKey } from "spotify-shared/api/helpers/request"
import { BASE_API_URL } from "../config"
import * as authActions from "../actions/auth"
import * as agentProfileActions from "../actions/agentProfile"

class App extends Component {

    constructor(props) {
        super(props);

        this.props.initialize({
            languages: [
                { name: 'English', code: 'en' }
            ],
            translation: englishResources,
            options: {
                renderToStaticMarkup,
                renderInnerHtml: true,
                defaultLanguage: "en"
            }
        });


        registerOnUnauthorizedCallback(this.props.unauthorizedResponseReceived);

        let _config = window.document.getElementById("PortalWidgetAppConfig");
        let authToken = _config.dataset.token;

        if (authToken === "" || authToken === undefined || authToken === null) {
            this.props.setTokenMissing();
        } else {
            this.props.setToken(authToken);
        }

        let agentProfile = {
            countryId: _config.dataset.countryId,
            agentId: _config.dataset.agentid,
            countryCode: _config.dataset.countryCode,
        };

        setBaseUrl(_config.dataset.api);

        this.props.setAgentProfile(agentProfile);


    }

    componentDidUpdate(prevProps) {

    }





    render() {
        const {
            tokenMissing,
            agentProfile,
            tokenExpired
        } = this.props;

        //if (tokenMissing) return <div className="alert alert-error">
        //    Error, no token found
        //</div>

        //if (tokenExpired) return <div className="alert alert-error">
        //    Error, Session Expired
        //</div>


        if (!agentProfile) {
            // Loading, pending agent Profile. cannot render OpportunitiesWidget yet
        }

        return <Fragment>
            <OpportunitiesWidget />
        </Fragment>
    }
}

function mapStateToProps(state, props) {

    return {
        authToken: state.auth.authToken,
        tokenMissing: state.auth.tokenMissing,
        agentProfile: state.agentProfile,
        tokenExpired: state.auth.tokenExpired
    };
}

const mapDispatchToProps = {
    setToken: authActions.setToken,
    setTokenMissing: authActions.setTokenMissing,
    setAgentProfile: agentProfileActions.setAgentProfile,
    unauthorizedResponseReceived: authActions.unauthorizedResponseReceived
};

export default connect(
    mapStateToProps,
    { ...mapDispatchToProps },
)(withLocalize(App));


