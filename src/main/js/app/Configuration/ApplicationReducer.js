// @flow

import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import {ArticleReducer, ImagesReducer, ImagesReducerInitialState} from "../Article";
import {MessageReducer, MessageReducerInitialState} from "../Notifications";
import {AdminReducer, AdminReducerInitialState} from "../Admin";
import {ArticleReducerInitialState} from "../Article";

import type {Reducer} from "redux"
import type {ArticleReducerType, ImagesReducerType} from "../Article";
import type {MessageReducerType} from "../Notifications";
import type {AdminReducerType} from "../Admin";


export const ApplicationReducer: Reducer<ApplicationReducerType, any> = combineReducers({
    ArticleReducer,
    MessageReducer,
    AdminReducer,
    ImagesReducer,
    router: routerReducer
});

export const ApplicationReducerInitialState : ApplicationReducerType = {
    ArticleReducer: ArticleReducerInitialState,
    MessageReducer: MessageReducerInitialState,
    AdminReducer: AdminReducerInitialState,
    ImagesReducer: ImagesReducerInitialState,
    router: {locationBeforeTransitions: null}
};

export type ApplicationReducerType = {
    ArticleReducer: ArticleReducerType,
    AdminReducer: AdminReducerType,
    ImagesReducer: ImagesReducerType,
    MessageReducer: MessageReducerType
};