// @flow
import type {Action, ApplicationAsyncActionCreator} from '../../../../Configuration';
import type {HttpRequesterInterface} from '../../../../HttpRequest';
import {ArticlePublishError, ArticlePublishSuccess} from '../index';


type ArticlePublishType = 'PUBLISH_ARTICLE';

export type ArticlePublishAction = {
    type: ArticlePublishType,
    id: number
}

type Creator = ApplicationAsyncActionCreator<ArticlePublishType>

export const ArticlePublish: Creator = {
    type: 'PUBLISH_ARTICLE',
    reduce: (store, next, action: ArticlePublishAction, httpRequester: HttpRequesterInterface) => {
        if (!httpRequester) {
            throw 'Configuration issue in ArticlePublish async action. Please provide a valid httpRequester!';
        }

        if (!action.id) {
            next(ArticlePublishError.create('PUBLISH_ARTICLE action did not contain a valid id'));
            return;
        }

        httpRequester
            .patch('/api/article/' + action.id, (err, res) => {
                if (err) {
                    next(ArticlePublishError.create(err));
                } else {
                    next(ArticlePublishSuccess.create(res.body));
                }
            });
    },
    match: (action: Action) => (ArticlePublish.type === action.type),
    create: (id: number) => ({
        type: ArticlePublish.type,
        id
    })
};
