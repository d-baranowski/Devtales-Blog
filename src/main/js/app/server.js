import React from "react";
import {renderToString} from "react-dom/server";

/*import {articleReducer, messageReducer, adminReducer} from "./reducers";*/
import {applyMiddleware, combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import {routerMiddleware, routerReducer} from "react-router-redux";
import {Router} from "react-router-dom";
import createMemoryHistory from "history/createMemoryHistory";

import PageNavigation from "./components/PageNavigation";


const ServerSideRender = function(/*isAdmin*/) {
    const history = createMemoryHistory();

    const store = createStore(
        combineReducers({
           /* adminReducer,
            articleReducer,
            messageReducer,*/
            router: routerReducer
        }),
        applyMiddleware(routerMiddleware(history))
    );

 /*   if (isAdmin === true) {
        store.dispatch({type: 'ADMIN_BECOME'})
    }*/

    return renderToString(
        <Provider store={store}>
            <Router history={history}>
                <div>
                       <PageNavigation/>
                </div>
            </Router>
        </Provider>
    );
};

export default ServerSideRender; //This is actually used by React.java class



