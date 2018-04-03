// @flow
import type {Action, ApplicationAsyncActionCreator} from '../../../../Configuration';
import {ArticleHideError, ArticleHideSuccess} from '../index';
import type {HttpRequesterInterface} from '../../../../HttpRequest';

type ArticleHideType = 'HIDE_ARTICLE';

export type ArticleHideAction = {
    type: ArticleHideType,
    id: number,
}

type Creator = ApplicationAsyncActionCreator<ArticleHideType>

export const ArticleHide: Creator = {
    type: 'HIDE_ARTICLE',
    reduce: (store, next, action: ArticleHideAction, httpRequester: HttpRequesterInterface) => {
        if (!httpRequester) {
            throw 'Configuration issue in ArticleHide async action. Please provide a valid httpRequester!';
        }

        if (!action.id) {
            next(ArticleHideError.create('HIDE_ARTICLE action did not contain a valid id'));
            return;
        }

        httpRequester
            .delete('/api/article/' + action.id, (err, res) => {
                if (err) {
                    next(ArticleHideError.create(err));
                } else {
                    next(ArticleHideSuccess.create(res.body));
                }
            });
    },
    match: (action: Action) => (ArticleHide.type === action.type),
    create: (id: number) => ({
        type: ArticleHide.type,
        id
    })
};
