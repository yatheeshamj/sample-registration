
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'react-circular-progressbar/dist/styles.css';
import 'spotify-shared-web/assets/styles/normalize.css';
import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import AuthProvider from "./providers/authProvider";
import { Provider as ReduxProvider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router' //https://github.com/supasate/connected-react-router
import { BrowserRouter as Router, Route } from 'react-router-dom'
import store, { history } from './store';
import { LocalizeProvider } from "spotify-shared-web/localize";
import { Routes } from './routes';
import ScrollToTop from "./components/common/ScrollToTop"


ReactDOM.render(
    <ReduxProvider store={store}>
        <LocalizeProvider >
            <ConnectedRouter history={history} >
                <AuthProvider>
                    <ScrollToTop>
                        {Routes}
                    </ScrollToTop>
                </AuthProvider>
            </ConnectedRouter>
        </LocalizeProvider>
    </ReduxProvider>,

    document.querySelector('#root')
);
