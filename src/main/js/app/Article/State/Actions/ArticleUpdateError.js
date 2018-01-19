// @flow
import type {Action, ApplicationActionCreator} from '../../../Configuration';
import type {ArticleReducerType} from '../ArticleReducer';

type ArticleUpdateErrorType = 'UPDATE_ARTICLE_ERROR'

export type ArticleUpdateErrorAction = {
    type: ArticleUpdateErrorType,
    err: string,
    data: {message: string, err: string},
    slug: string
};


type Creator = ApplicationActionCreator<ArticleReducerType, ArticleUpdateErrorAction, ArticleUpdateErrorType>

export const ArticleUpdateError: Creator = {
    type: 'UPDATE_ARTICLE_ERROR',
    reduce: (state: ArticleReducerType): ArticleReducerType => {
        return {...state};
    },
    match: (action: Action) => ArticleUpdateError.type === action.type,
    create: (error: string, slug: string) => ({
        type: ArticleUpdateError.type, err: error,
        data: {message: error, err: error},
        slug: slug
    })
};