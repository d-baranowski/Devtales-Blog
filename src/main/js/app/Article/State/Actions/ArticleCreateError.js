// @flow
import type {Action, ApplicationActionCreator} from '../../../Configuration';
import type {ArticleReducerType} from '../ArticleReducer';

type ArticleCreateErrorType = 'CREATE_ARTICLE_ERROR';

export type ArticleCreateErrorAction = {
    type: ArticleCreateErrorType,
    err: string,
    data: {message: string, err: string},
    slug: string
};

type Creator = ApplicationActionCreator<ArticleReducerType, ArticleCreateErrorAction, ArticleCreateErrorType>

export const ArticleCreateError: Creator = {
    type: 'CREATE_ARTICLE_ERROR',
    reduce: (state: ArticleReducerType): ArticleReducerType => {
        return {...state};
    },
    match: (action: Action) => ArticleCreateError.type === action.type,
    create: (error: string, slug: string) => ({
        type: ArticleCreateError.type, err: error,
        data: {message: error, err: error},
        slug: slug
    })
};