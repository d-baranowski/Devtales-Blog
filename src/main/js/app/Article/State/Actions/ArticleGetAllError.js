// @flow
import {LoadingTypeEnum} from '../../ArticleType';
import type {ApplicationActionCreator} from '../../../Configuration/ApplicationReducer';
import type {Action} from '../../../Configuration';
import type {ArticleReducerType} from '../ArticleReducer';

type ArticleGetAllErrorType = 'ARTICLE_GET_ALL_ERROR';

export type ArticleGetAllErrorAction = {
    type: ArticleGetAllErrorType,
    err: string,
    data: {message: string, err: string}
}

type Creator = ApplicationActionCreator<ArticleReducerType, ArticleGetAllErrorAction, ArticleGetAllErrorType>;

export const ArticleGetAllError: Creator = {
    type: 'ARTICLE_GET_ALL_ERROR',
    reduce: (state: ArticleReducerType): ArticleReducerType => {
        return {
            ...state,
            loadingAll: LoadingTypeEnum.LOADED
        };
    },
    match: (action: Action) => ArticleGetAllError.type === action.type,
    create: (error: string) => ({
        type: ArticleGetAllError.type,
        err: error,
        data: {message: error, err: error}
    })
};