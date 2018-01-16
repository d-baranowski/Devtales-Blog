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
            articles: action.data,
            loadingAll: false
        }
    }
    return {
        ...state,
        error: "Failed to get articles.",
        loadingAll: false
    }
};

type ArticleGetAllErrorType = {
    type: string,
    err: string,
    data: {message: string, err: string}
}

const ArticleGetAllError = (state: ArticleReducerType, action: ArticleGetAllErrorType) : ArticleReducerType => {
    return {
        ...state,
        loadingAll: false
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

type ArticleGetSpecificLoadingType = {
    type: string,
    slug: string
};

const ArticleGetSpecificLoading = (state: ArticleReducerType, action: ArticleGetSpecificLoadingType) : ArticleReducerType => {
  if (action.slug) {
      let newState = state;
      let article = newState[action.slug];
      if (article) {
          newState[action.slug].isLoading = true;
          return newState;
      }
  }
  return state;
};

type ArticleGetSpecificSuccessType = {
    type: string,
    data: Article
};

const ArticleGetSpecificSuccess = (state: ArticleReducerType, action: ArticleGetSpecificSuccessType) : ArticleReducerType => {
    if (!action.data || !action.data.slug) {
        return {...state, error: "Failed to get specific article."}
    }

    const updatedArticles = state.articles;
    updatedArticles[action.data.slug] = action.data;
    updatedArticles[action.data.slug].isLoading = false;

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
    let newState = state;
    newState.articles[action.slug].isLoading = false;
    return newState;
};

export const ArticleReducerInitialState : ArticleReducerType = {articles: {}, updating: undefined, loadingAll: false};

export const ArticleReducer: Reducer<ArticleReducerType, any> = (state = ArticleReducerInitialState, action) => {
    switch (action.type) {
        case 'ARTICLE_GET_ALL_LOADING':
            return {
                ...state,
                loadingAll: true
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
    loadingAll: boolean,
    articles: Articles,
    updating: Article | void
};