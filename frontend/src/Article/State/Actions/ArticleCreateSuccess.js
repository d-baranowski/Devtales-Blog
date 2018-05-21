// @flow
import type {ApplicationActionCreator} from '../../../Configuration/ApplicationReducer';
import type {ArticleReducerType} from '../ArticleReducer';
import type {Article} from '../../ArticleType';
import type {Action} from '../../../Configuration';

type ArticleCreateSuccessType = 'CREATE_ARTICLE_SUCCESS';

export type ArticleCreateSuccessAction = {
    type: ArticleCreateSuccessType,
    data: {
        body: Article
    },
    message: string
}

type Creator = ApplicationActionCreator<ArticleReducerType, ArticleCreateSuccessAction, ArticleCreateSuccessType>

export const ArticleCreateSuccess: Creator = {
    type: 'CREATE_ARTICLE_SUCCESS',
    reduce: (state: ArticleReducerType, action: ArticleCreateSuccessAction): ArticleReducerType => {
        if (!action.data || !action.data.body) {
            return {
                ...state,
                error: 'Failed to create article.'
            };
        }

        return {
            ...state,
            updating: action.data.body
        };
    },
    match: (action: Action) => ArticleCreateSuccess.type === action.type,
    create: (article: Article) => ({
        type: ArticleCreateSuccess.type,
        data: {
            body: article
        },
        message: `Successfully created article with id ${article.id}!`
    })
};