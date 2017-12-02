const articleReducer = (state = [], action) => {
    switch (action.type) {
        case 'ARTICLE_GET_ALL_RECEIVED':
            if (action.data) {
                return {
                    ...state,
                    articles: action.data
                }
            } else {
                return {
                    ...state,
                    error: "Failed to get articles."
                }
            }
        case 'CREATE_ARTICLE_SUCCESS':
            return {
                ...state,
                updating: action.data.body
            };
        case 'PUBLISH_ARTICLE_SUCCESS':
            const updatedArticles = state.articles;
              updatedArticles[action.data.slug] = action.data;

            return {
                ...state,
                articles: updatedArticles
            };
        case 'HIDE_ARTICLE_SUCCESS':
            const updatedArticles2 = state.articles;
            updatedArticles2[action.data.slug] = action.data;

            return {
                ...state,
                articles: updatedArticles2
            };
        default:
            return state;
    }
};

export default articleReducer