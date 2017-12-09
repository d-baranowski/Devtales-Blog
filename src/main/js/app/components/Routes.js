import React from "react";
import {Route} from "react-router-dom";
import ArticleListContainer from "../containers/articleListContainer";
import ArticleReaderContaier from "../containers/ArticleReaderContainer";

const Routes = (props) => {
    return (
    <div id="main-section">
        <Route exact path="/" component={ArticleListContainer}/>
        <Route
            path="/blog"
            component={ArticleListContainer}/>
        <Route path="/article/:articleSlug" component={ArticleReaderContaier}/>
    </div>
    )
};

export default Routes;