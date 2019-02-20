import React from 'react';
import {Route} from 'react-router-dom';
import {ArticleListContainer} from '../LandingPage';
import {ArticleReaderContainer} from '../Article/Read';
import {AboutMeComponent} from '../AboutMe';
import {Projects} from '../Projects';
import {ArticleEditorContainer} from "../Article/Edit";
import GithubLoginHandler from "../Login/GithubLoginHandler";
import LoginCard from "../Login/LoginCard";

const Routes = () => {
    return (
        <div id="main-section">
            <Route exact path="/" component={ArticleListContainer}/>
            <Route path="/blog" component={ArticleListContainer}/>
            <Route path="/article/:articleSlug" component={ArticleReaderContainer}/>
            <Route path="/edit/article/:articleSlug" component={ArticleEditorContainer}/>
            <Route path="/about" component={AboutMeComponent}/>
            <Route path="/projects" component={Projects}/>
            <Route path="/auth/github" component={GithubLoginHandler} />
        </div>
    );
};

export default Routes;
