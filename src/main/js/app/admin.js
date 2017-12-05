import React from 'react';
import ReactDOM from 'react-dom';
import ArticleEditorContainer from "./containers/ArticleEditorContainer";

import {articleReducer, messageReducer, adminReducer, imagesReducer} from "./reducers";
import {articleService, imagesService} from "./api-middleware";
import {routerMiddleware, routerReducer} from "react-router-redux";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {Provider} from "react-redux";


// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

const store = createStore(
    combineReducers({
        adminReducer,
        articleReducer,
        messageReducer,
        imagesReducer,
        router: routerReducer
    }),
    preloadedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__( //DEBUG remove in production
        applyMiddleware(routerMiddleware(history), articleService, imagesService))
);

function ClientSideRender() {
    ReactDOM.render(
        <Provider store={store}>
            <ArticleEditorContainer />
        </Provider>,
        document.getElementById('content')
    );
}

ClientSideRender();