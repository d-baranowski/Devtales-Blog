// @flow
import {LoadingTypeEnum} from '../../ArticleType';
import type {ArticleReducerType, Articles} from '../ArticleReducer';
import type {ApplicationActionCreator} from '../../../Configuration/ApplicationReducer';
import type {Action} from '../../../Configuration';

type ArticleGetAllSuccessType = 'ARTICLE_GET_ALL_SUCCESS';

export type ArticleGetAllSuccessAction = {
    type: ArticleGetAllSuccessType,
    data: Articles
}

type Creator = ApplicationActionCreator<ArticleReducerType, ArticleGetAllSuccessAction, ArticleGetAllSuccessType>;

export const ArticleGetAllSuccess: Creator = {
    type: 'ARTICLE_GET_ALL_SUCCESS',
    reduce: (state: ArticleReducerType, action: ArticleGetAllSuccessAction): ArticleReducerType => {
        if (action.data) {
            return {
                ...state,
                articles: action.data,
                loadingAll: LoadingTypeEnum.LOADED
            };
        }
        return {
            ...state,
            error: 'Failed to get articles.',
            loadingAll: LoadingTypeEnum.LOADED
        };
    },
    match: (action: Action) => ArticleGetAllSuccess.type === action.type,
    create: (articles: Articles) => ({
        type: ArticleGetAllSuccess.type,
        data: articles
    })
};