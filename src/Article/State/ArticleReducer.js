// @flow
import {LoadingTypeEnum} from '../ArticleType';
import {Actions} from './Actions';

import type {Reducer} from 'redux';
import type {Article, LoadingType} from '../ArticleType';

export const EMPTY_ARTICLE = {
    title: '',
    slug: '',
    html: '',
    summary: '',
    createdOn: 0,
    updatedOn: 0,
    publishedDate: 0,
    jsonRepresentation: null,
    tags: [],
    isLoading: LoadingTypeEnum.WILL_LOAD
};

export const ArticleReducerInitialState : ArticleReducerType = {articles: {}, updating: undefined, loadingAll: LoadingTypeEnum.WILL_LOAD};

export const ArticleReducer: Reducer<ArticleReducerType, any> = (state = ArticleReducerInitialState, action) => {
    for (let possibleAction of Actions) {
        if (possibleAction.match(action)) {
            return possibleAction.reduce(state, action);
        }
    }
    return state;
};


export type Articles = { [slug: string]: Article }

export type ArticleReducerType = {
    loadingAll: LoadingType,
    articles: Articles,
    updating: Article | void
};