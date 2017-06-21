import "babel-polyfill";
import React from "react";
import {renderToString} from "react-dom/server";
import PageNavigation from "./components/PageNavigation";
import createMemoryHistory from 'history/createMemoryHistory';
import {Router, Route} from "react-router-dom";

const history = createMemoryHistory();

const ServerSideRender = function() {
    let html;
    html = renderToString(
        <Router history={history}>
            <PageNavigation/>
        </Router>
    );

    return html;
};

export default ServerSideRender;



