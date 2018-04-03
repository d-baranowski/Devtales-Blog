// @flow
import {ArticleGetSpecificError, ArticleGetSpecificLoading, ArticleGetSpecificSuccess} from '../';

import type {ApplicationAsyncActionCreator} from '../../../../Configuration';
import type {HttpRequesterInterface} from '../../../../HttpRequest';

type ArticleGetSpecificType = 'ARTICLE_GET_SPECIFIC';

export type ArticleGetSpecificAction = {
    type: ArticleGetSpecificType,
    slug: string
}

type Creator = ApplicationAsyncActionCreator<ArticleGetSpecificType>

export const ArticleGetSpecific: Creator = {
    type: 'ARTICLE_GET_SPECIFIC',
    reduce: (store, next, action: ArticleGetSpecificAction, httpRequester: HttpRequesterInterface) => {
        if (!httpRequester) {
            throw 'Configuration issue in ArticleGetSpecific async action. Please provide a valid httpRequester!';
        }

        if (!action.slug) {
            next(ArticleGetSpecificError.create('ARTICLE_GET_SPECIFIC action did not contain a valid slug'));
        } else {
            next(ArticleGetSpecificLoading.create(action.slug));

            let isAdmin = store.getState().AdminReducer.isAdmin;

            httpRequester
                .get((isAdmin ? '/api/article/all/' : '/api/article/') + action.slug, (err, res) => {
                    if (err) {
                        next(ArticleGetSpecificError.create(err, action.slug));
                    } else {
                        const data = JSON.parse(res.text);

                        next(ArticleGetSpecificSuccess.create(data));
                    }
                });
        }
    },
    match: (action) => (ArticleGetSpecific.type === action.type),
    create: (slug: string) => ({
        type: ArticleGetSpecific.type,
        slug
    })
};