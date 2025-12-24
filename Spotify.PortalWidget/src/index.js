import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'spotify-shared-web/assets/styles/normalize.css';
import "./index.scss"

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { LocalizeProvider } from "spotify-shared-web/localize";
import store from './store';
import App from "./components/App"

ReactDOM.render(
    <ReduxProvider store={store}>
        <LocalizeProvider >
            <App />
        </LocalizeProvider>
    </ReduxProvider>,
    document.getElementById('PortalWidgetApp')
);
