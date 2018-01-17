import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Navigation/Routes";
import createHistory from "history/createBrowserHistory";
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";
import {ApplicationStoreFactory} from "./Configuration";
import {PageNavigationContainer} from "./Navigation";


const history = createHistory();
const store = ApplicationStoreFactory(history);

function ClientSideRender() {
    store.dispatch({type: 'IS_ADMIN'});

    const root = document.getElementById('mount');
    const renderStratety = root.innerHTML ? ReactDOM.hydrate : ReactDOM.render;

    renderStratety(
        <Provider store={store}>
            <Router history={history}>
                <div className="page-content">
                    <PageNavigationContainer/>
                    <Routes />
                </div>
            </Router>
        </Provider>, root);
}

ClientSideRender();
