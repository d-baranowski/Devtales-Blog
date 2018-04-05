// @flow
import type {Action, ApplicationActionCreator} from '../../../Configuration';
import type {ArticleReducerType} from '../ArticleReducer';

type ArticleCreateErrorType = 'CREATE_ARTICLE_ERROR';

export type ArticleCreateErrorAction = {
    type: ArticleCreateErrorType,
    err: string,
    message: string,
    slug: string
};

type Creator = ApplicationActionCreator<ArticleReducerType, ArticleCreateErrorAction, ArticleCreateErrorType>

export const ArticleCreateError: Creator = {
    type: 'CREATE_ARTICLE_ERROR',
    reduce: (state: ArticleReducerType): ArticleReducerType => {
        return {...state};
    },
    match: (action: Action) => ArticleCreateError.type === action.type,
    create: (error: any) => ({
        type: ArticleCreateError.type,
        err: error,
        message: 'Failed to create an article.'
    })
};