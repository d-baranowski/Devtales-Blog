// @flow
import {LoadingTypeEnum} from '../../ArticleType';
import type {ApplicationActionCreator} from '../../../Configuration/ApplicationReducer';
import type {ArticleReducerType} from '../ArticleReducer';
import type {Action} from '../../../Configuration';


type ArticleGetAllLoadingType = 'ARTICLE_GET_ALL_LOADING';

export type ArticleGetAllLoadingAction = {
    type: ArticleGetAllLoadingType
}

type Creator = ApplicationActionCreator<ArticleReducerType, ArticleGetAllLoadingAction, ArticleGetAllLoadingType>;

export const ArticleGetAllLoading: Creator = {
    type: 'ARTICLE_GET_ALL_LOADING',
    reduce: (state: ArticleReducerType): ArticleReducerType => {
        return {
            ...state,
            loadingAll: LoadingTypeEnum.LOADING
        };
    },
    match: (action: Action) => ArticleGetAllLoading.type === action.type,
    create: () => ({
        type: ArticleGetAllLoading.type
    })
};