import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Navigation/Routes";
import createHistory from "history/createBrowserHistory";
import {BrowserRouter as Router} from "react-router-dom";
import PageNavigation from "./Navigation/PageNavigation";
import {Provider} from "react-redux";
import ApplicationStoreFactory from "./Configuration/ApplicationStoreFactory";


const history = createHistory();
const store = ApplicationStoreFactory(history);

function ClientSideRender() {
    ReactDOM.render(
        <Provider store={store}>
            <Router history={history}>
                <div className="page-content">
                    <PageNavigation/>
                    <Routes />
                </div>
            </Router>
        </Provider>, document.getElementById('mount'));
}

ClientSideRender();
