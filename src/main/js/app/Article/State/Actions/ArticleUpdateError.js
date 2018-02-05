// @flow
import type {Action, ApplicationActionCreator} from '../../../Configuration';
import type {ArticleReducerType} from '../ArticleReducer';

type ArticleUpdateErrorType = 'UPDATE_ARTICLE_ERROR'

export type ArticleUpdateErrorAction = {
    type: ArticleUpdateErrorType,
    err: string,
    message: string,
    slug: string
};


type Creator = ApplicationActionCreator<ArticleReducerType, ArticleUpdateErrorAction, ArticleUpdateErrorType>

export const ArticleUpdateError: Creator = {
    type: 'UPDATE_ARTICLE_ERROR',
    reduce: (state: ArticleReducerType): ArticleReducerType => {
        return {...state};
    },
    match: (action: Action) => ArticleUpdateError.type === action.type,
    create: (error: any) => ({
        type: ArticleUpdateError.type, err: error,
        message: 'Failed to update the article.'
    })
};