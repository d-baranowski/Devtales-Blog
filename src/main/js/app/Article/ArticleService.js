// @flow
import type {Store} from "../Configuration";
import type {HttpRequesterInterface} from "../HttpRequest";
import type {Article} from "./ArticleType"


const ArticleGetSpecific = (httpRequester, store, next, action) => {
    if (!action.slug) {
        next({
            type: 'ARTICLE_GET_SPECIFIC_ERROR',
            data: {message: "ARTICLE_GET_SPECIFIC action did not contain a valid slug"}
        });
    } else {
        next({
            type: 'ARTICLE_GET_SPECIFIC_LOADING',
            slug: action.slug
        });

        let isAdmin = store.getState().AdminReducer.isAdmin;

        httpRequester
            .get((isAdmin ? '/api/article/all/' : '/api/article/') + action.slug, (err, res) => {
                if (err) {
                    next({
                        type: 'ARTICLE_GET_SPECIFIC_ERROR',
                        data: {message: err, err},
                        slug: action.slug
                    });
                } else {
                    const data = JSON.parse(res.text);

                    next({
                        type: 'ARTICLE_GET_SPECIFIC_SUCCESS',
                        data
                    });
                }
            });
    }
};

export const ArticleServiceFactory =
    (httpRequester : HttpRequesterInterface) =>
    (store : Store) =>
    (next : (action: {type: string}) => void) =>
    (action : any) => {
        next(action);
        switch (action.type) {
            case 'CREATE_ARTICLE':
                httpRequester
                    .post('/api/article', action.data, (err, res) => {
                        if (err) {
                            next({
                                type: 'CREATE_ARTICLE_ERROR', //Naming convention for data service action types is “<ACTION>_<NAME>_<STATUS>”
                                err,
                                data: {message: err}
                            });
                        } else {
                            next({
                                type: 'CREATE_ARTICLE_SUCCESS',
                                data: res
                            });
                        }
                    });
                break;
            case 'UPDATE_ARTICLE':
                if (!action.id) {
                    next({
                        type: 'UPDATE_ARTICLE_ERROR', //Naming convention for data service action types is “<ACTION>_<NAME>_<STATUS>”
                        data: {message: "UPDATE_ARTICLE action did not contain a valid id"}
                    });
                    break;
                }

                if (!action.data) {
                    next({
                        type: 'UPDATE_ARTICLE_ERROR', //Naming convention for data service action types is “<ACTION>_<NAME>_<STATUS>”
                        data: {message: "UPDATE_ARTICLE action did not contain a valid data"}
                    });
                    break;
                }

                httpRequester
                    .put('/api/article/' + action.id, action.data, (err, res) => {
                        if (err) {
                            next({
                                type: 'UPDATE_ARTICLE_ERROR', //Naming convention for data service action types is “<ACTION>_<NAME>_<STATUS>”
                                err,
                                data: {message: err}
                            });
                        } else {
                            next({
                                type: 'UPDATE_ARTICLE_SUCCESS',
                                data: res
                            });
                        }
                    });
                break;
            case 'PUBLISH_ARTICLE':
                if (!action.id) {
                    next({
                        type: 'PUBLISH_ARTICLE_ERROR', //Naming convention for data service action types is “<ACTION>_<NAME>_<STATUS>”
                        data: {message: "PUBLISH_ARTICLE action did not contain a valid id"}
                    });
                    break;
                }

                httpRequester
                    .patch('/api/article/' + action.id, (err, res) => {
                        if (err) {
                            next({
                                type: 'PUBLISH_ARTICLE_ERROR', //Naming convention for data service action types is “<ACTION>_<NAME>_<STATUS>”
                                err,
                                data: {message: err}
                            });
                        } else {
                            next({
                                type: 'PUBLISH_ARTICLE_SUCCESS',
                                data: res.body
                            });
                        }
                    });
                break;
            case 'HIDE_ARTICLE':
                if (!action.id) {
                    next({
                        type: 'HIDE_ARTICLE_ERROR', //Naming convention for data service action types is “<ACTION>_<NAME>_<STATUS>”
                        data: {message: "HIDE_ARTICLE action did not contain a valid id"}
                    });
                    break;
                }

                httpRequester
                    .delete('/api/article/' + action.id, (err, res) => {
                        if (err) {
                            next({
                                type: 'HIDE_ARTICLE_ERROR', //Naming convention for data service action types is “<ACTION>_<NAME>_<STATUS>”
                                err,
                                data: {message: err}
                            });
                        } else {
                            next({
                                type: 'HIDE_ARTICLE_SUCCESS',
                                data: res.body
                            });
                        }
                    });
                break;
            case 'ARTICLE_GET_ALL':
                next({
                    type: 'ARTICLE_GET_ALL_LOADING'
                });
                const isAdmin = store.getState().AdminReducer.isAdmin;
                httpRequester
                    .get(isAdmin ? '/api/article/all' : '/api/article', (err, res) => {
                        if (err) {
                            return next({
                                type: 'ARTICLE_GET_ALL_ERROR', //Naming convention for data service action types is “<ACTION>_<NAME>_<STATUS>”
                                data: {message: err}
                            });
                        } else {
                            const data = JSON.parse(res.text);

                            next({
                                type: 'ARTICLE_GET_ALL_SUCCESS',
                                data
                            });
                        }
                    });
                break;

            case 'ARTICLE_GET_SPECIFIC':
                ArticleGetSpecific(httpRequester, store, next, action);
                break;

            default:
                break
        }

};