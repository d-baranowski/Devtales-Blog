// @flow
import {LoadingTypeEnum} from '../../ArticleType';
import type {ArticleReducerType} from '../ArticleReducer';
import type {Article} from '../../ArticleType';
import type {ApplicationActionCreator} from '../../../Configuration/ApplicationReducer';
import type {Action} from '../../../Configuration';

type ArticleGetSpecificSuccessType = 'ARTICLE_GET_SPECIFIC_SUCCESS';

export type ArticleGetSpecificSuccessAction = {
    type: ArticleGetSpecificSuccessType,
    data: Article
};

type Creator = ApplicationActionCreator<ArticleReducerType, ArticleGetSpecificSuccessAction, ArticleGetSpecificSuccessType>;

export const ArticleGetSpecificSuccess: Creator = {
    type: 'ARTICLE_GET_SPECIFIC_SUCCESS',
    reduce: (state: ArticleReducerType, action: ArticleGetSpecificSuccessAction): ArticleReducerType => {
        if (!action.data || !action.data.slug) {
            return {...state, error: 'Failed to get specific article.'};
        }

        const updatedArticles = {...state.articles};
        updatedArticles[action.data.slug] = action.data;
        updatedArticles[action.data.slug].isLoading = LoadingTypeEnum.LOADED;

        return {
            ...state,
            articles: updatedArticles
        };
    },
    match: (action: Action) => ArticleGetSpecificSuccess.type === action.type,
    create: (article: Article) => ({
        type: ArticleGetSpecificSuccess.type,
        data: article
    })
};