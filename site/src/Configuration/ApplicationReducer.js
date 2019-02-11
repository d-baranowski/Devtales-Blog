// @flow
import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {ArticleReducer, ImagesReducer, ImagesReducerInitialState} from '../Article';
import {ArticleReducerInitialState} from '../Article';
import {PageNavigationReducerInitialState, PageNavigationReducer} from '../Navigation';

import type {Reducer} from 'redux';
import type {ArticleReducerType, ImagesReducerType} from '../Article';
import type {PageNavigationReducerType} from '../Navigation';
import type {Action} from '../Configuration';

export type ApplicationReducerType = {
    ArticleReducer: ArticleReducerType,
    ImagesReducer: ImagesReducerType,
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
    ImagesReducer,
    PageNavigationReducer,
    router: routerReducer
});

export const ApplicationReducerInitialState : ApplicationReducerType = {
    ArticleReducer: ArticleReducerInitialState,
    ImagesReducer: ImagesReducerInitialState,
    PageNavigationReducer: PageNavigationReducerInitialState,
    router: {locationBeforeTransitions: null}
};