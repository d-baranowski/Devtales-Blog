import {ArticleGetAllError, ArticleGetAllLoading, ArticleGetAllSuccess} from '../index';

export const ArticleGetAll = {
    type: 'ARTICLE_GET_ALL',
    reduce: (store, next, action, httpRequester) => {
        if (!httpRequester) {
            throw new Error('Configuration issue in ArticleGetAll async action. Please provide a valid httpRequester!');
        }

        next(ArticleGetAllLoading.create());
        httpRequester
            .get('/articles.json', (err, res) => {
                if (err) {
                    next(ArticleGetAllError.create(err));
                } else {
                    try {
                        const data = JSON.parse(res.text);
                        next(ArticleGetAllSuccess.create(data));
                    } catch (err) {
                        next(ArticleGetAllError.create(err));
                    }

                }
            });
    },
    match: (action) => (ArticleGetAll.type === action.type),
    create: () => ({
        type: ArticleGetAll.type
    })
};
