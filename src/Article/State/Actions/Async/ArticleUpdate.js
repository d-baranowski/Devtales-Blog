// @flow
import {ArticleUpdateError, ArticleUpdateSuccess} from '../index';
import type {Action, ApplicationAsyncActionCreator} from '../../../../Configuration';
import type {HttpRequesterInterface} from '../../../../HttpRequest';
import type {Article} from '../../../ArticleType';

type ArticleUpdateType = 'UPDATE_ARTICLE';

export type ArticleUpdateAction = {
    type: ArticleUpdateType,
    id: number,
    data: Article
}

type Creator = ApplicationAsyncActionCreator<ArticleUpdateType>

export const ArticleUpdate: Creator = {
    type: 'UPDATE_ARTICLE',
    reduce: (store, next, action: ArticleUpdateAction, httpRequester: HttpRequesterInterface) => {
        if (!httpRequester) {
            throw 'Configuration issue in ArticlePublish async action. Please provide a valid httpRequester!';
        }

        if (!action.id) {
            next(ArticleUpdateError.create('UPDATE_ARTICLE action did not contain a valid id'));
            return;
        }

        if (!action.data) {
            next(ArticleUpdateError.create('UPDATE_ARTICLE action did not contain a valid data'));
            return;
        }

        httpRequester
            .put('/api/article/' + action.id, action.data, (err, res) => {
                if (err) {
                    next(ArticleUpdateError.create(err));
                } else {
                    next(ArticleUpdateSuccess.create(res.body));
                }
            });
    },
    match: (action: Action) => (ArticleUpdate.type === action.type),
    create: (id: number, article: Article) => ({
        type: ArticleUpdate.type,
        id,
        data: article
    })
};
