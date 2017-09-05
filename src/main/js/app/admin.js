import React from 'react';
import ReactDOM from 'react-dom';
import ArticleEditorContainer from "./containers/ArticleEditorContainer";
import App from "./App";

function ClientSideRender() {
    ReactDOM.render(
        <App>
            <ArticleEditorContainer />
        </App>,
        document.getElementById('content')
    );
}

ClientSideRender();