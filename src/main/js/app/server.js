import React from "react";
import {renderToString} from "react-dom/server";

import {applyMiddleware, combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import {routerMiddleware, routerReducer} from "react-router-redux";
import {Router, Route} from "react-router-dom";
import createMemoryHistory from "history/createMemoryHistory";

import PageNavigation from "./components/PageNavigation";
import Hello from "./hello";


const ServerSideRender = function() {
    const history = createMemoryHistory();

    const store = createStore(
        combineReducers({
            router: routerReducer
        }),
        applyMiddleware(routerMiddleware(history))
    );

    return renderToString(
        <Provider store={store}>
            <Router history={history}>
                <div>
                    <Route exact path="/" component={Hello}/>
                    <Route path="/blog" component={Hello}/>
                    <Route path="/about" component={Hello}/>
                    <Route path="/projects" component={Hello}/>
                    <PageNavigation/>

                </div>
            </Router>
        </Provider>
    );
};

export default ServerSideRender; //This is actually used by React.java class



