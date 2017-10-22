import React from "react";
import ReactDOM from "react-dom";

import Routes from "./components/Routes"
import createHistory from "history/createBrowserHistory";
import {BrowserRouter as Router} from "react-router-dom";

import PageNavigation from "./components/PageNavigation";

import App from "./App";

const history = createHistory();

function ClientSideRender() {
    ReactDOM.render(
        <App>
            <Router history={history}>
                <div>
                    <PageNavigation/>
                    <Routes />
                </div>
            </Router>
        </App>, document.getElementById('mount'));
}

ClientSideRender();
