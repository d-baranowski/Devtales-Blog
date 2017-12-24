// @flow
import type {Reducer} from "redux";
import type {Article} from "./ArticleType";

type ArticleGetAllSuccessType = {
    type: string,
    data: Articles
}

const ArticleGetAllSuccess = (state: ArticleReducerType, action: ArticleGetAllSuccessType) : ArticleReducerType => {
    if (action.data) {
        return {
            ...state,
            articles: action.data
        }
    }
    return {
        ...state,
        error: "Failed to get articles."
    }
};

type CreateArticleSuccessType = {
    type: string,
    data: {
        body: Article
    }
}

const CreateArticleSuccess = (state: ArticleReducerType, action: CreateArticleSuccessType) : ArticleReducerType => {
    if (!action.data || !action.data.body) {
        return {
            ...state,
            error: "Failed to create article."
        }
    }

    return {
        ...state,
        updating: action.data.body
    };
};

type PublishOrHideArticleSuccessType = {
    type: string,
    data: Article
}

const PublishOrHideArticleSuccess = (state: ArticleReducerType, action: PublishOrHideArticleSuccessType) : ArticleReducerType => {
    if (!action.data || !action.data.slug) {
        return {...state, error: "Failed to publish article."}
    }

    const updatedArticles = state.articles;
    updatedArticles[action.data.slug] = action.data;

    return {
        ...state,
        articles: updatedArticles
    };
};

export const ArticleReducerInitialState : ArticleReducerType = {articles: {}, updating: undefined};

export const ArticleReducer: Reducer<ArticleReducerType, any> = (state = ArticleReducerInitialState, action) => {
    switch (action.type) {
        case 'ARTICLE_GET_ALL_SUCCESS':
            return ArticleGetAllSuccess(state, action);
        case 'CREATE_ARTICLE_SUCCESS':
            return CreateArticleSuccess(state, action);
        case 'PUBLISH_ARTICLE_SUCCESS':
            return PublishOrHideArticleSuccess(state, action);
        case 'HIDE_ARTICLE_SUCCESS':
            return PublishOrHideArticleSuccess(state, action);
        default:
            return state;
    }
};

export type Articles = { [slug: string]: Article }

export type ArticleReducerType = {
    articles: Articles,
    updating: Article | void
};