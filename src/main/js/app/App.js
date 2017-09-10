import React, { Component }  from 'react';
import {articleReducer, messageReducer} from "./reducers";
import articleService from "./api-middleware/articleService";
import {routerMiddleware, routerReducer} from "react-router-redux";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {Provider} from "react-redux";

const store = createStore(
    combineReducers({
        articleReducer,
        messageReducer,
        router: routerReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), //DEBUG remove in production
    applyMiddleware(routerMiddleware(history), articleService)
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