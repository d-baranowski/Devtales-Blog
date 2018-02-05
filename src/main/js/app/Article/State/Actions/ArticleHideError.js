// @flow
import type {Action, ApplicationActionCreator} from '../../../Configuration';
import type {ArticleReducerType} from '../ArticleReducer';

type ArticleHideErrorType = 'HIDE_ARTICLE_ERROR'

export type ArticleHideErrorAction = {
    type: ArticleHideErrorType,
    err: string,
    data: {message: string, err: string},
    slug: string
};


type Creator = ApplicationActionCreator<ArticleReducerType, ArticleHideErrorAction, ArticleHideErrorType>

export const ArticleHideError: Creator = {
    type: 'HIDE_ARTICLE_ERROR',
    reduce: (state: ArticleReducerType): ArticleReducerType => {
        return {...state};
    },
    match: (action: Action) => ArticleHideError.type === action.type,
    create: (error: string, slug: string) => ({
        type: ArticleHideError.type, err: error,
        message: 'Failed to hide article.',
        slug: slug
    })
};