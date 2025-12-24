import { createStore, compose, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';

import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import rootSaga from './sagas';

import { middleware } from "spotify-shared";

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    reducers(history),
    composeEnhancer(applyMiddleware(...middleware.default,sagaMiddleware ))
);

sagaMiddleware.run(rootSaga);

export default store;
