// @flow
import type {Action, ApplicationActionCreator} from '../../../Configuration';
import type {ArticleReducerType} from '../ArticleReducer';

type ArticlePublishErrorType = 'PUBLISH_ARTICLE_ERROR'

export type ArticlePublishErrorAction = {
    type: ArticlePublishErrorType,
    err: string,
    message: string,
    slug: string
};


type Creator = ApplicationActionCreator<ArticleReducerType, ArticlePublishErrorAction, ArticlePublishErrorType>

export const ArticlePublishError: Creator = {
    type: 'PUBLISH_ARTICLE_ERROR',
    reduce: (state: ArticleReducerType): ArticleReducerType => {
        return {...state};
    },
    match: (action: Action) => ArticlePublishError.type === action.type,
    create: (error: any) => ({
        type: ArticlePublishError.type,
        err: error,
        message: 'Failed to publish an article.'
    })
};