import React from "react";
import {Route} from "react-router-dom";
import {ArticleListContainer} from "../LandingPage";
import {ArticleReaderContainer} from "../Read";
import {AboutMeComponent} from "../AboutMe";
import {Projects} from "../Projects";

const Routes = (props) => {
    return (
    <div id="main-section">
        <Route exact path="/" component={ArticleListContainer}/>
        <Route
            path="/blog"
            component={ArticleListContainer}/>
        <Route path="/article/:articleSlug" component={ArticleReaderContainer}/>
        <Route path="/about" component={AboutMeComponent}/>
        <Route path="/projects" component={Projects}/>
    </div>
    )
};

export default Routes;