import React from "react";
import ReactDOM from "react-dom";
import Hello from "./hello"

import {applyMiddleware, combineReducers, createStore} from "redux";
import {Provider} from "react-redux";

import createHistory from "history/createBrowserHistory";
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

import {routerReducer, routerMiddleware} from 'react-router-redux';

const history = createHistory();

const middleware = routerMiddleware(history);

const store = createStore(
    combineReducers({
        /*...reducers,*/
        router: routerReducer
    }),
    applyMiddleware(middleware)
);


function component () {
    const element = document.createElement('div');
    element.setAttribute('id', 'mount');
    return element;
}

document.body.appendChild(component());
ReactDOM.render(
    <Provider store={store}>
        { /* Tell the Router to use our enhanced history */ }
        <Router>
            <div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/topics">Topics</Link></li>
                </ul>

                <hr/>

                <Route exact path="/" component={Hello}/>
                <Route path="/about" component={Hello}/>
                <Route path="/topics" component={Hello}/>
            </div>
        </Router>
    </Provider>,
    document.getElementById('mount')
);