import React from 'react';
import {Route} from 'react-router-dom';
import {ArticleListContainer} from '../LandingPage';
import {ArticleReaderContainer} from '../Article/Read';
import {AboutMeComponent} from '../AboutMe';
import {Projects} from '../Projects';

const Routes = () => {
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
    );
};

export default Routes;