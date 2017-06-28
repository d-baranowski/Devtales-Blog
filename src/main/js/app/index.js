import React from "react";
import ReactDOM from "react-dom";
import Hello from "./hello";

import {applyMiddleware, combineReducers, createStore} from "redux";
import {Provider} from "react-redux";

import createHistory from "history/createBrowserHistory";
import {BrowserRouter as Router, Route} from "react-router-dom";


import {routerMiddleware, routerReducer} from "react-router-redux";
import PageNavigation from "./components/PageNavigation";

const history = createHistory();

const store = createStore(
    combineReducers({
        router: routerReducer
    }),
    applyMiddleware(routerMiddleware(history))
);

function ClientSideRender() {
    ReactDOM.render(
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
        </Provider>,document.getElementById('mount'));
}

ClientSideRender();


