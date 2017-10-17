import React from "react";
import {renderToString} from "react-dom/server";

import {adminReducer} from "./reducers";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import {routerMiddleware, routerReducer} from "react-router-redux";
import {Router} from "react-router-dom";
import createMemoryHistory from "history/createMemoryHistory";
import {Route} from "react-router-dom";
import ArticleListContainer from "./containers/articleListContainer";
import PageNavigation from "./components/PageNavigation";


const ServerSideRender = function (isAdmin) {
    const history = createMemoryHistory();

    const store = createStore(
        combineReducers({
            adminReducer,
            router: routerReducer
        }),
        applyMiddleware(routerMiddleware(history))
    );

    if (isAdmin === true) {
        store.dispatch({type: 'ADMIN_BECOME'})
    }

    // Grab the initial state from our Redux store
    const preloadedState = store.getState();

    return {
        html: renderToString(
            <Provider store={store}>
                <Router history={history}>
                    <div>
                        <Route exact path="/" component={ArticleListContainer}/>
                        <Route path="/blog" component={ArticleListContainer}/>
                        {/* <Route path="/about" component={}/>
                         <Route path="/projects" component={}/>*/}
                        <PageNavigation/>
                    </div>
                </Router>
            </Provider>
        ),
        state: JSON.stringify(preloadedState).replace(/</g, '\\u003c')
    }
};

export default ServerSideRender; //This is actually used by React.java class



