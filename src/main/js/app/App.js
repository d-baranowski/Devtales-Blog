import React, { Component }  from 'react';
import {articleReducer, messageReducer, adminReducer} from "./reducers";
import articleService from "./api-middleware/articleService";
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
        router: routerReducer
    }),
    preloadedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__( //DEBUG remove in production
    applyMiddleware(routerMiddleware(history), articleService))
);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                {this.props.children}
            </Provider>
        )
    }
}

export default App;