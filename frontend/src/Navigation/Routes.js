import React from 'react';
import {Route} from 'react-router-dom';
import {ArticleListContainer} from '../LandingPage';
import {ArticleReaderContainer} from '../Article/Read';
import {AboutMeComponent} from '../AboutMe';
import {Projects} from '../Projects';
import {LoginComponent, LoginCallbackComponent} from '../Authentication';

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
            <Route exact path="/login" component={LoginComponent} />
            <Route exact path="/login/callback" component={LoginCallbackComponent} />
        </div>
    );
};

export default Routes;
