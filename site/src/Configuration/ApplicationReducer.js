// @flow
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {ArticleReducer} from '../Article';
import {ArticleReducerInitialState} from '../Article';
import {PageNavigationReducerInitialState, PageNavigationReducer} from '../Navigation';

export const ApplicationReducer = combineReducers({
    ArticleReducer,
    PageNavigationReducer,
    router: routerReducer
});

export const ApplicationReducerInitialState = {
    ArticleReducer: ArticleReducerInitialState,
    PageNavigationReducer: PageNavigationReducerInitialState,
    router: {locationBeforeTransitions: null}
};