import React from "react";
import {renderToString} from "react-dom/server";

import Routes from "./Navigation/Routes"
import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import {routerMiddleware} from "react-router-redux";
import {StaticRouter as Router} from "react-router-dom";
import createMemoryHistory from "history/createMemoryHistory";
import PageNavigation from "./Navigation/PageNavigation";
import {ApplicationReducer} from "./Configuration";


const ServerSideRender = function (url, preState) {
    const history = createMemoryHistory();

    const store = createStore(
        ApplicationReducer,
        JSON.parse(preState),
        applyMiddleware(routerMiddleware(history))
    );

    // Grab the initial state from our Redux store
    const preloadedState = store.getState();

    return {
        html: renderToString(
            <Provider store={store}>
                <Router context={{}} location={url} history={history}>
                    <div className="page-content">
                        <PageNavigation/>
                        <Routes />
                    </div>
                </Router>
            </Provider>
        ),
        state: JSON.stringify(preloadedState).replace(/</g, '\\u003c')
    }
};

//noinspection JSUnusedGlobalSymbols This is actually used by React.java class
export default ServerSideRender;



