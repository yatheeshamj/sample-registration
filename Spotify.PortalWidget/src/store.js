import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { middleware } from "spotify-shared";
import rootSaga from './sagas';
import reducers from './reducers';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    reducers(),
    composeEnhancer(applyMiddleware(...middleware.default, sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
