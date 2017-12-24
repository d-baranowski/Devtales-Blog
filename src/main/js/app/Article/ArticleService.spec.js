import {ArticleServiceFactory} from "./ArticleService";

import {applyMiddleware, createStore} from "redux";
import {ApplicationReducer, ApplicationReducerInitialState} from "../Configuration";


const SpyMiddlewareFactory = (actionList) => (store) => (next) => (action) => {
    next(action);
    actionList.push(action);
};

describe('The api will respond to post with success', () => {
    let middleware;
    let mock;
    let store;
    let returendArticle = {
        id: 1,
        title: "Hello World",
        slug: "hello-world",
        html: "<div></div>",
        summary: "This is some summary",
        createdOn: 123412,
        updatedOn: 124123,
        publishedDate: 12500,
        jsonRepresentation: "{}",
        tags: [
            {
                id: 1,
                value: "java"
            },
            {
                id: 2,
                value: "programming"
            }
        ]
    };
    let actionList = [];

    beforeEach(() => {
        actionList = [];
        mock = {
            post: (url, data, callback) => {
                callback(undefined, {body: returendArticle});
            }
        };

        middleware = ArticleServiceFactory(mock);

        store = createStore(
            (s, a) => s,
            {},
            applyMiddleware(middleware, SpyMiddlewareFactory(actionList))
        );
    });

    it('will dispatch CREATE_ARTICLE_SUCCESS action after I dispatch CREATE_ARTICLE', () => {

        store.dispatch({
            type: "CREATE_ARTICLE", data: {
                html: "html representation of article",
                json: "json representation of draft-js state"
            }
        });

        expect(actionList).toContain({type: 'CREATE_ARTICLE_SUCCESS', data: {body: returendArticle}});
        expect(actionList.length).toEqual(2);
    });

    afterEach(() => {
        actionList = [];
        mock = {};
    })
});

describe('The api will respond to post with error', () => {
    let middleware;
    let mock;
    let store;
    let returnedError = "This is an error";
    let actionList;

    beforeEach(() => {
        actionList = [];
        mock = {
            post: (url, data, callback) => {
                callback(returnedError, undefined);
            }
        };

        middleware = ArticleServiceFactory(mock);

        store = createStore(
            (s, a) => s,
            {},
            applyMiddleware(middleware, SpyMiddlewareFactory(actionList))
        );
    });

    it('will dispatch CREATE_ARTICLE_ERROR action after I dispatch CREATE_ARTICLE', () => {

        store.dispatch({
            type: "CREATE_ARTICLE", data: {
                html: "html representation of article",
                json: "json representation of draft-js state"
            }
        });

        expect(actionList).toContain({
            type: 'CREATE_ARTICLE_ERROR',
            err: 'This is an error',
            data: {message: 'This is an error'}
        });
        expect(actionList.length).toEqual(2);
    });

    afterEach(() => {
        actionList = [];
        mock = {};
    })
});

describe('The api will respond to put with success', () => {
    let middleware;
    let mock;
    let store;
    let returendArticle = {
        id: 1,
        title: "Hello World",
        slug: "hello-world",
        html: "<div></div>",
        summary: "This is some summary",
        createdOn: 123412,
        updatedOn: 124123,
        publishedDate: 12500,
        jsonRepresentation: "{}",
        tags: [
            {
                id: 1,
                value: "java"
            },
            {
                id: 2,
                value: "programming"
            }
        ]
    };
    let actionList;

    beforeEach(() => {
        actionList = [];
        mock = {
            put: (url, data, callback) => {
                callback(undefined, {body: returendArticle});
            }
        };

        middleware = ArticleServiceFactory(mock);

        store = createStore(
            (s, a) => s,
            {},
            applyMiddleware(middleware, SpyMiddlewareFactory(actionList))
        );
    });

    it('will dispatch UPDATE_ARTICLE_SUCCESS action after I dispatch UPDATE_ARTICLE with correct action', () => {

        store.dispatch({
            type: "UPDATE_ARTICLE", id: 1, data: {
                html: "html representation of article",
                json: "json representation of draft-js state"
            }
        });

        expect(actionList).toContain({type: 'UPDATE_ARTICLE_SUCCESS', data: {body: returendArticle}});
        expect(actionList.length).toEqual(2);
    });

    it('will dispatch UPDATE_ARTICLE_ERROR action after I dispatch UPDATE_ARTICLE without id', () => {

        store.dispatch({
            type: "UPDATE_ARTICLE", data: {
                html: "html representation of article",
                json: "json representation of draft-js state"
            }
        });

        expect(actionList).toContain({
            type: 'UPDATE_ARTICLE_ERROR',
            data: {message: "UPDATE_ARTICLE action did not contain a valid id"}
        });
        expect(actionList.length).toEqual(2);
    });

    it('will dispatch UPDATE_ARTICLE_ERROR action after I dispatch UPDATE_ARTICLE without data', () => {

        store.dispatch({
            type: "UPDATE_ARTICLE", id: 1
        });

        expect(actionList).toContain({
            type: 'UPDATE_ARTICLE_ERROR',
            data: {message: "UPDATE_ARTICLE action did not contain a valid data"}
        });
        expect(actionList.length).toEqual(2);
    });


    afterEach(() => {
        actionList = [];
        mock = {};
    })
});

describe('The api will respond to put with error', () => {
    let middleware;
    let mock;
    let store;
    let returnedError = "This is an error";
    let actionList;

    beforeEach(() => {
        actionList = [];
        mock = {
            put: (url, data, callback) => {
                callback(returnedError, undefined);
            }
        };

        middleware = ArticleServiceFactory(mock);

        store = createStore(
            (s, a) => s,
            {},
            applyMiddleware(middleware, SpyMiddlewareFactory(actionList))
        );
    });

    it('will dispatch UPDATE_ARTICLE_ERROR action after I dispatch UPDATE_ARTICLE with correct action', () => {

        store.dispatch({
            type: "UPDATE_ARTICLE", id: 1, data: {
                html: "html representation of article",
                json: "json representation of draft-js state"
            }
        });

        expect(actionList).toContain({
            type: 'UPDATE_ARTICLE_ERROR',
            err: returnedError,
            data: {message: returnedError}
        });
        expect(actionList.length).toEqual(2);
    });

    afterEach(() => {
        actionList = [];
        mock = {};
    })
});

describe('The api will respond to patch with success', () => {
    let middleware;
    let mock;
    let store;
    let returendArticle = {
        id: 1,
        title: "Hello World",
        slug: "hello-world",
        html: "<div></div>",
        summary: "This is some summary",
        createdOn: 123412,
        updatedOn: 124123,
        publishedDate: 12500,
        jsonRepresentation: "{}",
        tags: [
            {
                id: 1,
                value: "java"
            },
            {
                id: 2,
                value: "programming"
            }
        ]
    };
    let actionList;

    beforeEach(() => {
        actionList = [];
        mock = {
            patch: (url, callback) => {
                callback(undefined, {body: returendArticle});
            }
        };

        middleware = ArticleServiceFactory(mock);

        store = createStore(
            (s, a) => s,
            {},
            applyMiddleware(middleware, SpyMiddlewareFactory(actionList))
        );
    });

    it('will dispatch PUBLISH_ARTICLE_ERROR action after I dispatch PUBLISH_ARTICLE without id', () => {

        store.dispatch({
            type: "PUBLISH_ARTICLE"
        });

        expect(actionList).toContain({
            type: 'PUBLISH_ARTICLE_ERROR',
            data: {message: "PUBLISH_ARTICLE action did not contain a valid id"}
        });
        expect(actionList.length).toEqual(2);
    });

    it('will dispatch PUBLISH_ARTICLE_SUCCESS action after I dispatch PUBLISH_ARTICLE with id', () => {

        store.dispatch({
            type: "PUBLISH_ARTICLE",
            id: 1
        });

        expect(actionList).toContain({
            type: 'PUBLISH_ARTICLE_SUCCESS',
            data: returendArticle
        });
        expect(actionList.length).toEqual(2);
    });

    afterEach(() => {
        actionList = [];
        mock = {};
    });
});

describe('The api will respond to patch with error', () => {
    let middleware;
    let mock;
    let store;
    let returnedError = "This is an error";
    let actionList;

    beforeEach(() => {
        actionList = [];
        mock = {
            patch: (url, callback) => {
                callback(returnedError, undefined);
            }
        };

        middleware = ArticleServiceFactory(mock);

        store = createStore(
            (s, a) => s,
            {},
            applyMiddleware(middleware, SpyMiddlewareFactory(actionList))
        );
    });

    it('will dispatch PUBLISH_ARTICLE_ERROR action after I dispatch PUBLISH_ARTICLE with correct action', () => {

        store.dispatch({
            type: "PUBLISH_ARTICLE", id: 1
        });

        expect(actionList).toContain({
            type: 'PUBLISH_ARTICLE_ERROR',
            err: returnedError,
            data: {message: returnedError}
        });
        expect(actionList.length).toEqual(2);
    });

    afterEach(() => {
        actionList = [];
        mock = {};
    })
});


describe('The api will respond to delete with success', () => {
    let middleware;
    let mock;
    let store;
    let actionList;
    let returendArticle = {
        id: 1,
        title: "Hello World",
        slug: "hello-world",
        html: "<div></div>",
        summary: "This is some summary",
        createdOn: 123412,
        updatedOn: 124123,
        publishedDate: 12500,
        jsonRepresentation: "{}",
        tags: [
            {
                id: 1,
                value: "java"
            },
            {
                id: 2,
                value: "programming"
            }
        ]
    };


    beforeEach(() => {
        actionList = [];
        mock = {
            delete: (url, callback) => {
                callback(undefined, {body: returendArticle});
            }
        };

        middleware = ArticleServiceFactory(mock);

        store = createStore(
            (s, a) => s,
            {},
            applyMiddleware(middleware, SpyMiddlewareFactory(actionList))
        );
    });

    it('will dispatch HIDE_ARTICLE_ERROR action after I dispatch HIDE_ARTICLE without id', () => {

        store.dispatch({
            type: "HIDE_ARTICLE"
        });

        expect(actionList).toContain({
            type: 'HIDE_ARTICLE_ERROR',
            data: {message: "HIDE_ARTICLE action did not contain a valid id"}
        });
        expect(actionList.length).toEqual(2);
    });

    it('will dispatch HIDE_ARTICLE_SUCCESS action after I dispatch HIDE_ARTICLE with id', () => {

        store.dispatch({
            type: "HIDE_ARTICLE",
            id: 1
        });

        expect(actionList).toContain({
            type: 'HIDE_ARTICLE_SUCCESS',
            data: returendArticle
        });
        expect(actionList.length).toEqual(2);
    });

    afterEach(() => {
        mock = {};
        actionList = [];
    });
});

describe('The api will respond to get with success and store will contain all reducers and state will contain is admin', () => {
    let middleware;
    let mock;
    let store;
    let actionList;
    let returendArticles = {
        "hello-world": {
            id: 1,
            title: "Hello World",
            slug: "hello-world",
            html: "<div></div>",
            summary: "This is some summary",
            createdOn: 123412,
            updatedOn: 124123,
            publishedDate: 12500,
            jsonRepresentation: "{}",
            tags: [
                {
                    id: 1,
                    value: "java"
                },
                {
                    id: 2,
                    value: "programming"
                }
            ]
        },
        "hello-world-2": {
            id: 2,
            title: "Hello World",
            slug: "hello-world-2",
            html: "<div></div>",
            summary: "This is some summary",
            createdOn: 123412,
            updatedOn: 124123,
            publishedDate: 12500,
            jsonRepresentation: "{}",
            tags: [
                {
                    id: 1,
                    value: "java"
                },
                {
                    id: 2,
                    value: "programming"
                }
            ]
        }
    };


    beforeEach(() => {
        actionList = [];
        mock = {
            get: (url, callback) => {
                if (url === '/api/article/all') {
                    callback(undefined, {text: JSON.stringify(returendArticles)});
                } else {
                    throw "Called unexpected endpoint";
                }

            }
        };

        middleware = ArticleServiceFactory(mock);

        store = createStore(
            ApplicationReducer,
            {
                ...ApplicationReducerInitialState,
                AdminReducer: {...ApplicationReducerInitialState.AdminReducer, isAdmin: true},
            },
            applyMiddleware(middleware, SpyMiddlewareFactory(actionList))
        );
    });

    it('Will dispatch ARTICLE_GET_ALL_SUCCESS action after I dispatch ARTICLE_GET_ALL', () => {
        store.dispatch({
            type: "ARTICLE_GET_ALL"
        });

        expect(actionList).toContain({
            type: 'ARTICLE_GET_ALL_SUCCESS',
            data: returendArticles
        });
        expect(actionList.length).toEqual(2);
    });
});

describe('The api will respond to get with success and store will contain all reducers and state will contain is admin false', () => {
    let middleware;
    let mock;
    let store;
    let actionList;
    let returendArticles = {
        "hello-world": {
            id: 1,
            title: "Hello World",
            slug: "hello-world",
            html: "<div></div>",
            summary: "This is some summary",
            createdOn: 123412,
            updatedOn: 124123,
            publishedDate: 12500,
            jsonRepresentation: "{}",
            tags: [
                {
                    id: 1,
                    value: "java"
                },
                {
                    id: 2,
                    value: "programming"
                }
            ]
        },
        "hello-world-2": {
            id: 2,
            title: "Hello World",
            slug: "hello-world-2",
            html: "<div></div>",
            summary: "This is some summary",
            createdOn: 123412,
            updatedOn: 124123,
            publishedDate: 12500,
            jsonRepresentation: "{}",
            tags: [
                {
                    id: 1,
                    value: "java"
                },
                {
                    id: 2,
                    value: "programming"
                }
            ]
        }
    };


    beforeEach(() => {
        actionList = [];
        mock = {
            get: (url, callback) => {
                if (url === '/api/article') {
                    callback(undefined, {text: JSON.stringify(returendArticles)});
                } else {
                    throw "Called unexpected endpoint";
                }

            }
        };

        middleware = ArticleServiceFactory(mock);

        store = createStore(
            ApplicationReducer,
            {
                ...ApplicationReducerInitialState,
                AdminReducer: {...ApplicationReducerInitialState.AdminReducer, isAdmin: false},
            },
            applyMiddleware(middleware, SpyMiddlewareFactory(actionList))
        );
    });

    it('Will dispatch ARTICLE_GET_ALL_SUCCESS action after I dispatch ARTICLE_GET_ALL', () => {
        store.dispatch({
            type: "ARTICLE_GET_ALL"
        });

        expect(actionList).toContain({
            type: 'ARTICLE_GET_ALL_SUCCESS',
            data: returendArticles
        });
        expect(actionList.length).toEqual(2);
    });
});


describe('The api will respond to get with error and store will contain all reducers and state will contain is admin', () => {
    let middleware;
    let mock;
    let store;
    let actionList;
    let returendError = "This is an error";


    beforeEach(() => {
        actionList = [];
        mock = {
            get: (url, callback) => {
                if (url === '/api/article/all') {
                    callback(returendError, undefined);
                } else {
                    throw "Called unexpected endpoint";
                }

            }
        };

        middleware = ArticleServiceFactory(mock);

        store = createStore(
            ApplicationReducer,
            {
                ...ApplicationReducerInitialState,
                AdminReducer: {...ApplicationReducerInitialState.AdminReducer, isAdmin: true},
            },
            applyMiddleware(middleware, SpyMiddlewareFactory(actionList))
        );
    });

    it('Will dispatch ARTICLE_GET_ALL_ERROR action after I dispatch ARTICLE_GET_ALL', () => {
        store.dispatch({
            type: "ARTICLE_GET_ALL"
        });

        expect(actionList).toContain({
            type: 'ARTICLE_GET_ALL_ERROR',
            data: {message: returendError}
        });
        expect(actionList.length).toEqual(2);
    });
});

describe('The api will respond to get with error and store will contain all reducers and state will contain is admin false', () => {
    let middleware;
    let mock;
    let store;
    let actionList;
    let returendError = "This is an error";


    beforeEach(() => {
        actionList = [];
        mock = {
            get: (url, callback) => {
                if (url === '/api/article') {
                    callback(returendError, undefined);
                } else {
                    throw "Called unexpected endpoint";
                }
            }
        };

        middleware = ArticleServiceFactory(mock);

        store = createStore(
            ApplicationReducer,
            {
                ...ApplicationReducerInitialState,
                AdminReducer: {...ApplicationReducerInitialState.AdminReducer, isAdmin: false},
            },
            applyMiddleware(middleware, SpyMiddlewareFactory(actionList))
        );
    });

    it('Will dispatch ARTICLE_GET_ALL_ERROR action after I dispatch ARTICLE_GET_ALL', () => {
        store.dispatch({
            type: "ARTICLE_GET_ALL"
        });

        expect(actionList).toContain({
            type: 'ARTICLE_GET_ALL_ERROR',
            data: {message: returendError}
        });
        expect(actionList.length).toEqual(2);
    });
});