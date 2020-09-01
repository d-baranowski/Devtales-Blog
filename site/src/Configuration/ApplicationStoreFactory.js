import {applyMiddleware, createStore} from 'redux';
import {ApplicationReducer, ApplicationReducerInitialState} from './ApplicationReducer';
import {ApplicationServices} from './ApplicationServices';

export const ApplicationStoreFactory = (history) => {
    // Grab the state from a global variable injected into the server-generated HTML
    const preloadedState = window.__PRELOADED_STATE__;
    delete window.__PRELOADED_STATE__;

    const middleWare = ApplicationServices(history);
    return createStore(
        ApplicationReducer,
        preloadedState || ApplicationReducerInitialState,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
        applyMiddleware(...middleWare))
    );
};
