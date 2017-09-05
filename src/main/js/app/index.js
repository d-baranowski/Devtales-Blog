import React from "react";
import ReactDOM from "react-dom";

import createHistory from "history/createBrowserHistory";
import {BrowserRouter as Router, Route} from "react-router-dom";

import PageNavigation from "./components/PageNavigation";


import ArticleListContainer from "./containers/articleListContainer";
import App from "./App";

const history = createHistory();

function ClientSideRender() {
    ReactDOM.render(
        <App>
            <Router history={history}>
                <div>
                    <Route exact path="/" component={ArticleListContainer}/>
                    <Route path="/blog" component={ArticleListContainer}/>
                   {/* <Route path="/about" component={}/>
                    <Route path="/projects" component={}/>*/}
                    <PageNavigation/>
                </div>
            </Router>
        </App>,document.getElementById('mount'));
}

ClientSideRender();
