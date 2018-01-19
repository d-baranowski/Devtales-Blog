// @flow
import {EMPTY_ARTICLE} from '../ArticleReducer';
import {LoadingTypeEnum} from '../../ArticleType';
import type {ApplicationActionCreator} from '../../../Configuration/ApplicationReducer';
import type {Action} from '../../../Configuration';
import type {ArticleReducerType} from '../ArticleReducer';


type ArticleGetSpecificErrorType = 'ARTICLE_GET_SPECIFIC_ERROR'

export type ArticleGetSpecificErrorAction = {
    type: ArticleGetSpecificErrorType,
    err: string,
    data: {message: string, err: string},
    slug: string
};

type Creator = ApplicationActionCreator<ArticleReducerType, ArticleGetSpecificErrorAction, ArticleGetSpecificErrorType>

export const ArticleGetSpecificError: Creator = {
    type: 'ARTICLE_GET_SPECIFIC_ERROR',
    reduce: (state: ArticleReducerType, action: ArticleGetSpecificErrorAction): ArticleReducerType => {
        if (!action.slug) {
            return state;
        }
        let newState = {...state};

        if (!newState.articles[action.slug]) {
            newState.articles[action.slug] = {
                ...EMPTY_ARTICLE,
                slug: action.slug,
                isLoading: LoadingTypeEnum.LOADED
            };
        } else {
            newState.articles[action.slug] = {
                ...newState.articles[action.slug],
                isLoading: LoadingTypeEnum.LOADED
            };
        }

        return newState;
    },
    match: (action: Action) => ArticleGetSpecificError.type === action.type,
    create: (error: string, slug: string) => ({
        type: ArticleGetSpecificError.type, err: error,
        data: {message: error, err: error},
        slug: slug
    })
};