import React from "react";
import {Route} from "react-router-dom";
import ArticleListContainer from "../LandingPage/articleListContainer";
import ArticleReaderContaier from "../Read/ArticleReaderContainer";
import AboutMe from "../AboutMe/AboutMe";
import Projects from "../Projects/Projects";

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
    </div>
    )
};

export default Routes;