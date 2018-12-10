// @flow
import type {Action, ApplicationAsyncActionCreator} from '../../../../Configuration';
import {ArticleCreateError, ArticleCreateSuccess} from '../index';
import type {HttpRequesterInterface} from '../../../../HttpRequest';
import type {Article} from '../../../ArticleType';

type ArticleCreateType = 'CREATE_ARTICLE';

export type ArticleCreateAction = {
    type: ArticleCreateType,
    id: number,
    data: Article
}

type Creator = ApplicationAsyncActionCreator<ArticleCreateType>

export const ArticleCreate: Creator = {
    type: 'CREATE_ARTICLE',
    reduce: (store, next, action: ArticleCreateAction, httpRequester) => {
        if (!httpRequester) {
            throw 'Configuration issue in ArticleCreate async action. Please provide a valid httpRequester!';
        }

        const requester: HttpRequesterInterface = httpRequester;

        if (!action.data) {
            next(ArticleCreateError.create('CREATE_ARTICLE action did not contain a valid data'));
            return;
        }



        requester
            .post('/api/article', action.data, (err, res) => {
                if (err) {
                    next(ArticleCreateError.create(err));
                } else {
                    next(ArticleCreateSuccess.create(res.body));
                }
            });
    },
    match: (action: Action) => (ArticleCreate.type === action.type),
    create: (id: number, article: Article) => ({
        type: ArticleCreate.type,
        data: article
    })
};
