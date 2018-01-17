// @flow
import {LoadingTypeEnum} from "./ArticleType";
import type {Reducer} from "redux";
import type {Article, LoadingType} from "./ArticleType";

type ArticleGetAllSuccessType = {
    type: "ARTICLE_GET_ALL_SUCCESS",
    data: Articles
}

const EMPTY_ARTICLE = {
    id: -1,
    title: "",
    slug: "",
    html: "",
    summary: "",
    createdOn: 0,
    updatedOn: 0,
    publishedDate: 0,
    jsonRepresentation: null,
    tags: [],
    isLoading: LoadingTypeEnum.WILL_LOAD
};

const ArticleGetAllSuccess = (state: ArticleReducerType, action: ArticleGetAllSuccessType) : ArticleReducerType => {
    if (action.data) {
        return {
            ...state,
            articles: action.data,
            loadingAll: LoadingTypeEnum.LOADED
        }
    }
    return {
        ...state,
        error: "Failed to get articles.",
        loadingAll: LoadingTypeEnum.LOADED
    }
};

type ArticleGetAllErrorType = {
    type: 'ARTICLE_GET_ALL_ERROR',
    err: string,
    data: {message: string, err: string}
}

const ArticleGetAllError = (state: ArticleReducerType, action: ArticleGetAllErrorType) : ArticleReducerType => {
    return {
        ...state,
        loadingAll: LoadingTypeEnum.LOADED
    }
};

type CreateArticleSuccessType = {
    type: 'CREATE_ARTICLE_SUCCESS',
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

type ArticleGetSpecificLoadingType = {
    type: 'ARTICLE_GET_SPECIFIC_LOADING',
    slug: string
};

const ArticleGetSpecificLoading = (state: ArticleReducerType, action: ArticleGetSpecificLoadingType) : ArticleReducerType => {
    if (!action.slug) {
        return {...state, error: "Failed to determine which article is loading."}
    }
    const slug = action.slug;
    const newState = {...state};

    if (!newState.articles[slug]) {
        newState.articles[slug] = {...EMPTY_ARTICLE, slug: slug}
    }
    newState.articles[slug].isLoading = LoadingTypeEnum.LOADING;
    return newState;
};

type ArticleGetSpecificSuccessType = {
    type: string,
    data: Article
};

const ArticleGetSpecificSuccess = (state: ArticleReducerType, action: ArticleGetSpecificSuccessType) : ArticleReducerType => {
    if (!action.data || !action.data.slug) {
        return {...state, error: "Failed to get specific article."}
    }

    const updatedArticles = {...state.articles};
    updatedArticles[action.data.slug] = action.data;
    updatedArticles[action.data.slug].isLoading = LoadingTypeEnum.LOADED;

    return {
        ...state,
        articles: updatedArticles
    };
};

type ArticleGetSpecificErrorType = {
    type: string,
    err: string,
    data: {message: string, err: string},
    slug: string
};

const ArticleGetSpecificError = (state: ArticleReducerType, action: ArticleGetSpecificErrorType) : ArticleReducerType => {
    if (!action.slug) {
        return state;
    }
    let newState = {...state};

    if (!newState.articles[action.slug]) {
        newState.articles[action.slug] = {
            ...EMPTY_ARTICLE,
            slug: action.slug,
            isLoading: LoadingTypeEnum.LOADED
        }
    }

    return newState;
};

export const ArticleReducerInitialState : ArticleReducerType = {articles: {}, updating: undefined, loadingAll: LoadingTypeEnum.WILL_LOAD};

export const ArticleReducer: Reducer<ArticleReducerType, any> = (state = ArticleReducerInitialState, action) => {
    switch (action.type) {
        case 'ARTICLE_GET_ALL_LOADING':
            return {
                ...state,
                loadingAll: LoadingTypeEnum.LOADING
            };
        case 'ARTICLE_GET_ALL_SUCCESS':
            return ArticleGetAllSuccess(state, action);
        case 'ARTICLE_GET_ALL_ERROR':
            return ArticleGetAllError(state, action);
        case 'ARTICLE_GET_SPECIFIC_LOADING':
            return ArticleGetSpecificLoading(state, action);
        case 'ARTICLE_GET_SPECIFIC_SUCCESS':
            return ArticleGetSpecificSuccess(state, action);
        case 'ARTICLE_GET_SPECIFIC_ERROR':
            return ArticleGetSpecificError(state, action);
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
    loadingAll: LoadingType,
    articles: Articles,
    updating: Article | void
};