import {EMPTY_ARTICLE} from '../ArticleReducer';
import {LoadingTypeEnum} from '../../ArticleType';

export const ArticleGetSpecificError = {
    type: 'ARTICLE_GET_SPECIFIC_ERROR',
    reduce: (state, action) => {
        if (!action.slug) {
            return state;
        }
        let newState = {...state};

        if (!newState.articles[action.slug]) {
            newState.articles[action.slug] = {
                ...EMPTY_ARTICLE,
                slug: action.slug,
                isLoading: LoadingTypeEnum.LOADED
            };
        } else {
            newState.articles[action.slug] = {
                ...newState.articles[action.slug],
                isLoading: LoadingTypeEnum.LOADED
            };
        }

        return newState;
    },
    match: (action) => ArticleGetSpecificError.type === action.type,
    create: (error: string, slug: string) => ({
        type: ArticleGetSpecificError.type, err: error,
        message: error,
        slug: slug
    })
};