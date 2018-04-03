// @flow
import type {ArticleReducerType} from '../ArticleReducer';
import type {Article} from '../../ArticleType';
import type {ApplicationActionCreator} from '../../../Configuration/ApplicationReducer';
import type {Action} from '../../../Configuration';

type ArticlePublishOrHideSuccessType = 'PUBLISH_ARTICLE_SUCCESS' | 'HIDE_ARTICLE_SUCCESS';

export type ArticlePublishOrHideSuccessAction = {
    type: ArticlePublishOrHideSuccessType,
    data: Article
}

type Creator = ApplicationActionCreator<ArticleReducerType, ArticlePublishOrHideSuccessAction, ArticlePublishOrHideSuccessType>

const commonReduce = (state: ArticleReducerType, action: ArticlePublishOrHideSuccessAction): ArticleReducerType => {
    if (!action.data || !action.data.slug) {
        return {...state, error: 'Failed to publish article.'};
    }

    const updatedArticles = state.articles;
    updatedArticles[action.data.slug] = action.data;

    return {
        ...state,
        articles: updatedArticles
    };
};


export const ArticlePublishSuccess: Creator = {
    type: 'PUBLISH_ARTICLE_SUCCESS',
    reduce: commonReduce,
    match: (action: Action) => ArticlePublishSuccess.type === action.type,
    create: (article: Article) => ({
        type: ArticlePublishSuccess.type, data: article,
        message: `Successfully published article with id ${article.id}!`
    })
};

export const ArticleHideSuccess: Creator = {
    type: 'HIDE_ARTICLE_SUCCESS',
    reduce: commonReduce,
    match: (action: Action) => ArticleHideSuccess.type === action.type,
    create: (article: Article) => ({
        type: ArticleHideSuccess.type,
        data: article,
        message: `Successfully hidden article with id ${article.id}!`
    })
};

