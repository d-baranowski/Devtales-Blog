// @flow
import type {Action, ApplicationActionCreator} from '../../../Configuration';
import type {ArticleReducerType} from '../ArticleReducer';
import type {Article} from '../../ArticleType';

type ArticleUpdateSuccessType = 'UPDATE_ARTICLE_SUCCESS'

export type ArticleUpdateSuccessAction = {
    type: ArticleUpdateSuccessType,
    data: Article,
};


type Creator = ApplicationActionCreator<ArticleReducerType, ArticleUpdateSuccessAction, ArticleUpdateSuccessType>

export const ArticleUpdateSuccess: Creator = {
    type: 'UPDATE_ARTICLE_SUCCESS',
    reduce: (state: ArticleReducerType): ArticleReducerType => {
        return {...state};
    },
    match: (action: Action) => ArticleUpdateSuccess.type === action.type,
    create: (article) => ({
        type: ArticleUpdateSuccess.type,
        data: article,
    })
};