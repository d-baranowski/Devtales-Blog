import React from "react";
import ReactDOM from "react-dom";


import {applyMiddleware, combineReducers, createStore} from "redux";
import {Provider} from "react-redux";

import createHistory from "history/createBrowserHistory";
import {BrowserRouter as Router, Route} from "react-router-dom";


import {routerMiddleware, routerReducer} from "react-router-redux";

import PageNavigation from "./components/PageNavigation";
import Hello from "./hello";
import articleReducer from "./reducers/articleReducer";
import articleService from "./api-middleware/articleService";
import ArticleListContainer from "./containers/articleListContainer";

const history = createHistory();

const store = createStore(
    combineReducers({
        articleReducer,
        router: routerReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), //DEBUG remove in production
    applyMiddleware(routerMiddleware(history), articleService)
);

function ClientSideRender() {
    ReactDOM.render(
       <Provider store={store}>
            <Router history={history}>
                <div>
                    <Route exact path="/" component={Hello}/>
                    <Route path="/blog" component={Hello}/>
                    <Route path="/about" component={Hello}/>
                    <Route path="/projects" component={Hello}/>
                    <PageNavigation/>
                    <ArticleListContainer />
                </div>
            </Router>
        </Provider>,document.getElementById('mount'));
}

ClientSideRender();
store.dispatch({type: 'ARTICLE_GET_ALL'});


