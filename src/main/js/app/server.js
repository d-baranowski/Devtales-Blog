import React from "react";
import {renderToString} from "react-dom/server";

import {applyMiddleware, combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import {routerMiddleware, routerReducer} from "react-router-redux";
import {Router, Route} from "react-router-dom";
import createMemoryHistory from "history/createMemoryHistory";

import PageNavigation from "./components/PageNavigation";
import ArticleListContainer from "./containers/articleListContainer";


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
                    <Route exact path="/" component={ArticleListContainer}/>
                    <Route path="/blog" component={ArticleListContainer}/>
                    <Route path="/about" component={}/>
                    <Route path="/projects" component={}/>
                    <PageNavigation/>

                </div>
            </Router>
        </Provider>
    );
};

export default ServerSideRender; //This is actually used by React.java class



