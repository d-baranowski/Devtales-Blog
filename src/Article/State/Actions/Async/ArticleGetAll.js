// @flow
import {ArticleGetAllError, ArticleGetAllLoading, ArticleGetAllSuccess} from '../index';
import type {Action, ApplicationAsyncActionCreator} from '../../../../Configuration';
import type {HttpRequesterInterface} from '../../../../HttpRequest';

type ArticleGetAllType = 'ARTICLE_GET_ALL';

export type ArticleGetAllAction = {
    type: ArticleGetAllType
}

type Creator = ApplicationAsyncActionCreator<ArticleGetAllType>

export const ArticleGetAll: Creator = {
    type: 'ARTICLE_GET_ALL',
    reduce: (store, next, action, httpRequester: HttpRequesterInterface) => {
        if (!httpRequester) {
            throw 'Configuration issue in ArticleGetAll async action. Please provide a valid httpRequester!';
        }

        next(ArticleGetAllLoading.create());
        httpRequester
            .get('/api/article', (err, res) => {
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
    match: (action: Action) => (ArticleGetAll.type === action.type),
    create: () => ({
        type: ArticleGetAll.type
    })
};
