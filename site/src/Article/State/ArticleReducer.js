import {LoadingTypeEnum} from '../ArticleType';
import {Actions} from './Actions';

export const EMPTY_ARTICLE = {
    title: '',
    slug: '',
    html: '',
    summary: '',
    createdOn: 0,
    updatedOn: 0,
    publishedDate: 0,
    jsonRepresentation: null,
    tags: [],
    isLoading: LoadingTypeEnum.WILL_LOAD
};

export const ArticleReducerInitialState = {
    articles: {},
    updating: undefined,
    loadingAll: LoadingTypeEnum.WILL_LOAD
};

export const ArticleReducer = (state = ArticleReducerInitialState, action) => {
    for (let possibleAction of Actions) {
        if (possibleAction.match(action)) {
            return possibleAction.reduce(state, action);
        }
    }
    return state;
};
