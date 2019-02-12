// @flow
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {ArticleReducer} from '../Article';
import {ArticleReducerInitialState} from '../Article';
import {PageNavigationReducerInitialState, PageNavigationReducer} from '../Navigation';

import type {Reducer} from 'redux';
import type {ArticleReducerType} from '../Article';
import type {PageNavigationReducerType} from '../Navigation';
import type {Action} from '../Configuration';

export type ApplicationReducerType = {
    ArticleReducer: ArticleReducerType,
    PageNavigationReducer: PageNavigationReducerType
};

export type ApplicationActionCreator<S, A, T> = {
    type: T,
    reduce: (state: S, action: A) => S,
    match: (action: Action) => boolean,
    create: Function
}

export type ApplicationAsyncActionCreator<T> = {
    type: T,
    reduce: Function,
    match: (action: any) => boolean,
    create: Function
}

export type Dispatch = (action: Action) => void;

export const ApplicationReducer: Reducer<ApplicationReducerType, any> = combineReducers({
    ArticleReducer,
    PageNavigationReducer,
    router: routerReducer
});

export const ApplicationReducerInitialState : ApplicationReducerType = {
    ArticleReducer: ArticleReducerInitialState,
    PageNavigationReducer: PageNavigationReducerInitialState,
    router: {locationBeforeTransitions: null}
};