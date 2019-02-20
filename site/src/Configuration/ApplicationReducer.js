// @flow
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {ArticleReducer} from '../Article';
import {ArticleReducerInitialState} from '../Article';
import {PageNavigationReducerInitialState, PageNavigationReducer} from '../Navigation';

import {LoginReducer, LoginReducerInitialState} from "../Login/state/LoginReducer";

export const ApplicationReducer = combineReducers({
    ArticleReducer,
    PageNavigationReducer,
    LoginReducer,
    router: routerReducer
});

export const ApplicationReducerInitialState = {
    ArticleReducer: ArticleReducerInitialState,
    LoginReducer: LoginReducerInitialState,
    PageNavigationReducer: PageNavigationReducerInitialState,
    router: {locationBeforeTransitions: null}
};