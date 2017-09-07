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
        default:
            return state;
    }
};

export default articleReducer