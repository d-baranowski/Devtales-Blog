import React from "react";
import {Route} from "react-router-dom";
import ArticleListContainer from "../containers/articleListContainer";
import ArticleReaderContaier from "../containers/ArticleReaderContainer";
import AboutMe from "./AboutMe";
import Projects from "./Projects";
import NotFound from "./NotFound";

const Routes = (props) => {
    return (
    <div id="main-section">
        <Route exact path="/" component={ArticleListContainer}/>
        <Route
            path="/blog"
            component={ArticleListContainer}/>
        <Route path="/article/:articleSlug" component={ArticleReaderContaier}/>
        <Route path="/about" component={AboutMe}/>
        <Route path="/projects" component={Projects}/>
        <Route path="/not-found" component={NotFound}/>
    </div>
    )
};

export default Routes;