import React from "react";
import ReactDOM from "react-dom";
import {ArticleEditorContainer} from "./Article";
import {Provider} from "react-redux";
import {ApplicationStoreFactory} from "./Configuration";

const store = ApplicationStoreFactory();

function ClientSideRender() {
    ReactDOM.render(
        <Provider store={store}>
            <ArticleEditorContainer />
        </Provider>,
        document.getElementById('content')
    );
}

ClientSideRender();