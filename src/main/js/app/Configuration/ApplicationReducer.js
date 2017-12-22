// @flow

import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import {ArticleReducer, ImagesReducer} from "../Edit";
import {MessageReducer} from "../Notifications";
import {AdminReducer} from "../Admin";

import type {Reducer} from "redux"
import type {ArticleReducerType, ImagesReducerType} from "../Edit";
import type {MessageReducerType} from "../Notifications";
import type {AdminReducerType} from "../Admin";


export const ApplicationReducer: Reducer<ApplicationReducerType, any> = combineReducers({
    ArticleReducer,
    MessageReducer,
    AdminReducer,
    ImagesReducer,
    router: routerReducer
});

export type ApplicationReducerType = {
    ArticleReducer: ArticleReducerType,
    AdminReducer: AdminReducerType,
    ImagesReducer: ImagesReducerType,
    MessageReducer: MessageReducerType
};