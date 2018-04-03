// @flow
import {LoadingTypeEnum} from '../../ArticleType';
import {EMPTY_ARTICLE} from '../ArticleReducer';

import type {ArticleReducerType} from '../ArticleReducer';
import type {Action} from '../../../Configuration';
import type {ApplicationActionCreator} from '../../../Configuration/ApplicationReducer';

type ArticleGetSpecificLoadingType = 'ARTICLE_GET_SPECIFIC_LOADING';

export type ArticleGetSpecificLoadingAction = {
    type: ArticleGetSpecificLoadingType,
    slug: string
};

type Creator = ApplicationActionCreator<ArticleReducerType, ArticleGetSpecificLoadingAction, ArticleGetSpecificLoadingType>

export const ArticleGetSpecificLoading: Creator = {
    type: 'ARTICLE_GET_SPECIFIC_LOADING',
    reduce: (state: ArticleReducerType, action: ArticleGetSpecificLoadingAction): ArticleReducerType => {
        if (!action.slug) {
            return {...state, error: 'Failed to determine which article is loading.'};
        }
        const slug = action.slug;
        const newState = {...state};

        if (!newState.articles[slug]) {
            newState.articles[slug] = {...EMPTY_ARTICLE, slug: slug};
        }
        newState.articles[slug].isLoading = LoadingTypeEnum.LOADING;
        return newState;
    },
    match: (action: Action) => ArticleGetSpecificLoading.type === action.type,
    create: (slug: string) => ({
        type: ArticleGetSpecificLoading.type,
        slug
    })
};