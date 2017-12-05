import React from "react";
import ReactDOM from "react-dom";

import Routes from "./components/Routes"
import createHistory from "history/createBrowserHistory";
import {BrowserRouter as Router} from "react-router-dom";

import PageNavigation from "./components/PageNavigation";

import {articleReducer, messageReducer, adminReducer} from "./reducers";
import articleService from "./api-middleware/articleService";
import {routerMiddleware, routerReducer} from "react-router-redux";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {Provider} from "react-redux";


const history = createHistory();

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

const store = createStore(
    combineReducers({
        adminReducer,
        articleReducer,
        messageReducer,
        router: routerReducer
    }),
    preloadedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__( //DEBUG remove in production
        applyMiddleware(routerMiddleware(history), articleService))
);

function ClientSideRender() {
    ReactDOM.render(
        <Provider store={store}>
            <Router history={history}>
                <div>
                    <PageNavigation/>
                    <Routes />
                </div>
            </Router>
        </Provider>, document.getElementById('mount'));
}

ClientSideRender();
