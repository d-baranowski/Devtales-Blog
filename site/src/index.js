import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Navigation/Routes';
import createHistory from 'history/createBrowserHistory';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {ApplicationStoreFactory} from './Configuration';
import {PageNavigationContainer} from './Navigation';
import './styles/main.scss';
import LoginCard from "./Login/LoginCard";


const history = createHistory();
const store = ApplicationStoreFactory(history);

function ClientSideRender() {
    const root = document.getElementById('mount');
    const renderStratety = root.innerHTML ? ReactDOM.hydrate : ReactDOM.render;

    renderStratety(
        <Provider store={store}>
            <Router history={history}>
                <div className="page-content">
                    <LoginCard/>
                    <PageNavigationContainer/>
                    <Routes />
                </div>
            </Router>
        </Provider>, root);
}

ClientSideRender();
