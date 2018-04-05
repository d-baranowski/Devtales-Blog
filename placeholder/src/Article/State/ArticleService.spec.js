import {ArticleServiceFactory} from './ArticleService';

import {applyMiddleware, createStore} from 'redux';
import {ApplicationReducer, ApplicationReducerInitialState} from '../../Configuration/index';
import {LoadingTypeEnum} from '../ArticleType';
import {
    ArticleCreateError, ArticleGetSpecificError, ArticleGetSpecificSuccess, ArticlePublishError,
    ArticleUpdateError, ArticleHideError, ArticleUpdateSuccess, ArticleCreateSuccess, ArticlePublishSuccess,
    ArticleHideSuccess
} from './Actions';


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
        title: 'Hello World',
        slug: 'hello-world',
        html: '<div></div>',
        summary: 'This is some summary',
        createdOn: 123412,
        updatedOn: 124123,
        publishedDate: 12500,
        jsonRepresentation: '{}',
        tags: [
            {
                id: 1,
                value: 'java'
            },
            {
                id: 2,
                value: 'programming'
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
            type: 'CREATE_ARTICLE', data: {
                html: 'html representation of article',
                json: 'json representation of draft-js state'
            }
        });

        expect(actionList).toContain(ArticleCreateSuccess.create(returendArticle));
        expect(actionList.length).toEqual(2);
    });

    afterEach(() => {
        actionList = [];
        mock = {};
    });
});

describe('The api will respond to post with error', () => {
    let middleware;
    let mock;
    let store;
    let returnedError = 'This is an error';
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
            type: 'CREATE_ARTICLE', data: {
                html: 'html representation of article',
                json: 'json representation of draft-js state'
            }
        });

        expect(actionList).toContain(ArticleCreateError.create('This is an error'));
        expect(actionList.length).toEqual(2);
    });

    afterEach(() => {
        actionList = [];
        mock = {};
    });
});

describe('The api will respond to put with success', () => {
    let middleware;
    let mock;
    let store;
    let returendArticle = {
        id: 1,
        title: 'Hello World',
        slug: 'hello-world',
        html: '<div></div>',
        summary: 'This is some summary',
        createdOn: 123412,
        updatedOn: 124123,
        publishedDate: 12500,
        jsonRepresentation: '{}',
        tags: [
            {
                id: 1,
                value: 'java'
            },
            {
                id: 2,
                value: 'programming'
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
            type: 'UPDATE_ARTICLE', id: 1, data: {
                html: 'html representation of article',
                json: 'json representation of draft-js state'
            }
        });

        expect(actionList).toContain(ArticleUpdateSuccess.create(returendArticle));
        expect(actionList.length).toEqual(2);
    });

    it('will dispatch UPDATE_ARTICLE_ERROR action after I dispatch UPDATE_ARTICLE without id', () => {

        store.dispatch({
            type: 'UPDATE_ARTICLE', data: {
                html: 'html representation of article',
                json: 'json representation of draft-js state'
            }
        });

        expect(actionList).toContain(ArticleUpdateError.create('UPDATE_ARTICLE action did not contain a valid id'));
        expect(actionList.length).toEqual(2);
    });

    it('will dispatch UPDATE_ARTICLE_ERROR action after I dispatch UPDATE_ARTICLE without data', () => {

        store.dispatch({
            type: 'UPDATE_ARTICLE', id: 1
        });

        expect(actionList).toContain(ArticleUpdateError.create('UPDATE_ARTICLE action did not contain a valid data'));
        expect(actionList.length).toEqual(2);
    });


    afterEach(() => {
        actionList = [];
        mock = {};
    });
});

describe('The api will respond to put with error', () => {
    let middleware;
    let mock;
    let store;
    let returnedError = 'This is an error';
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
            type: 'UPDATE_ARTICLE', id: 1, data: {
                html: 'html representation of article',
                json: 'json representation of draft-js state'
            }
        });

        expect(actionList).toContain(ArticleUpdateError.create(returnedError));
        expect(actionList.length).toEqual(2);
    });

    afterEach(() => {
        actionList = [];
        mock = {};
    });
});

describe('The api will respond to patch with success', () => {
    let middleware;
    let mock;
    let store;
    let returendArticle = {
        id: 1,
        title: 'Hello World',
        slug: 'hello-world',
        html: '<div></div>',
        summary: 'This is some summary',
        createdOn: 123412,
        updatedOn: 124123,
        publishedDate: 12500,
        jsonRepresentation: '{}',
        tags: [
            {
                id: 1,
                value: 'java'
            },
            {
                id: 2,
                value: 'programming'
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
            type: 'PUBLISH_ARTICLE'
        });

        expect(actionList).toContain(ArticlePublishError.create('PUBLISH_ARTICLE action did not contain a valid id'));
        expect(actionList.length).toEqual(2);
    });

    it('will dispatch PUBLISH_ARTICLE_SUCCESS action after I dispatch PUBLISH_ARTICLE with id', () => {

        store.dispatch({
            type: 'PUBLISH_ARTICLE',
            id: 1
        });

        expect(actionList).toContain(ArticlePublishSuccess.create(returendArticle));
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
    let returnedError = 'This is an error';
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
            type: 'PUBLISH_ARTICLE', id: 1
        });

        expect(actionList).toContain(ArticlePublishError.create(returnedError));
        expect(actionList.length).toEqual(2);
    });

    afterEach(() => {
        actionList = [];
        mock = {};
    });
});


describe('The api will respond to delete with success', () => {
    let middleware;
    let mock;
    let store;
    let actionList;
    let returendArticle = {
        id: 1,
        title: 'Hello World',
        slug: 'hello-world',
        html: '<div></div>',
        summary: 'This is some summary',
        createdOn: 123412,
        updatedOn: 124123,
        publishedDate: 12500,
        jsonRepresentation: '{}',
        tags: [
            {
                id: 1,
                value: 'java'
            },
            {
                id: 2,
                value: 'programming'
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
            type: 'HIDE_ARTICLE'
        });

        expect(actionList).toContain(ArticleHideError.create('HIDE_ARTICLE action did not contain a valid id'));
        expect(actionList.length).toEqual(2);
    });

    it('will dispatch HIDE_ARTICLE_SUCCESS action after I dispatch HIDE_ARTICLE with id', () => {

        store.dispatch({
            type: 'HIDE_ARTICLE',
            id: 1
        });

        expect(actionList).toContain(ArticleHideSuccess.create(returendArticle));
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
        'hello-world': {
            id: 1,
            title: 'Hello World',
            slug: 'hello-world',
            html: '<div></div>',
            summary: 'This is some summary',
            createdOn: 123412,
            updatedOn: 124123,
            publishedDate: 12500,
            jsonRepresentation: '{}',
            tags: [
                {
                    id: 1,
                    value: 'java'
                },
                {
                    id: 2,
                    value: 'programming'
                }
            ]
        },
        'hello-world-2': {
            id: 2,
            title: 'Hello World',
            slug: 'hello-world-2',
            html: '<div></div>',
            summary: 'This is some summary',
            createdOn: 123412,
            updatedOn: 124123,
            publishedDate: 12500,
            jsonRepresentation: '{}',
            tags: [
                {
                    id: 1,
                    value: 'java'
                },
                {
                    id: 2,
                    value: 'programming'
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
                    throw 'Called unexpected endpoint';
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
            type: 'ARTICLE_GET_ALL'
        });

        expect(actionList).toContain({
            type: 'ARTICLE_GET_ALL_LOADING'
        });

        expect(actionList).toContain({
            type: 'ARTICLE_GET_ALL_SUCCESS',
            data: returendArticles
        });
        expect(actionList.length).toEqual(3);
    });
});

describe('The api will respond to get with success and store will contain all reducers and state will contain is admin false', () => {
    let middleware;
    let mock;
    let store;
    let actionList;
    let returendArticles = {
        'hello-world': {
            id: 1,
            title: 'Hello World',
            slug: 'hello-world',
            html: '<div></div>',
            summary: 'This is some summary',
            createdOn: 123412,
            updatedOn: 124123,
            publishedDate: 12500,
            jsonRepresentation: '{}',
            tags: [
                {
                    id: 1,
                    value: 'java'
                },
                {
                    id: 2,
                    value: 'programming'
                }
            ]
        },
        'hello-world-2': {
            id: 2,
            title: 'Hello World',
            slug: 'hello-world-2',
            html: '<div></div>',
            summary: 'This is some summary',
            createdOn: 123412,
            updatedOn: 124123,
            publishedDate: 12500,
            jsonRepresentation: '{}',
            tags: [
                {
                    id: 1,
                    value: 'java'
                },
                {
                    id: 2,
                    value: 'programming'
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
                    throw 'Called unexpected endpoint';
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
            type: 'ARTICLE_GET_ALL'
        });

        expect(actionList).toContain({
            type: 'ARTICLE_GET_ALL_LOADING'
        });

        expect(actionList).toContain({
            type: 'ARTICLE_GET_ALL_SUCCESS',
            data: returendArticles
        });
        expect(actionList.length).toEqual(3);
    });
});


describe('The api will respond to get with error and store will contain all reducers and state will contain is admin', () => {
    let middleware;
    let mock;
    let store;
    let actionList;
    let returendError = 'This is an error';


    beforeEach(() => {
        actionList = [];
        mock = {
            get: (url, callback) => {
                if (url === '/api/article/all') {
                    callback(returendError, undefined);
                } else {
                    throw 'Called unexpected endpoint';
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
            type: 'ARTICLE_GET_ALL'
        });

        expect(actionList).toContain({
            type: 'ARTICLE_GET_ALL_LOADING',
        });

        expect(actionList).toContain({
            type: 'ARTICLE_GET_ALL_ERROR',
            err: returendError,
            data: {message: returendError, err: returendError}
        });
        expect(actionList.length).toEqual(3);
    });
});

describe('The api will respond to get with error and store will contain all reducers and state will contain is admin false', () => {
    let middleware;
    let mock;
    let store;
    let actionList;
    let returendError = 'This is an error';


    beforeEach(() => {
        actionList = [];
        mock = {
            get: (url, callback) => {
                if (url === '/api/article') {
                    callback(returendError, undefined);
                } else {
                    throw 'Called unexpected endpoint';
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
            type: 'ARTICLE_GET_ALL'
        });

        expect(actionList).toContain({
            type: 'ARTICLE_GET_ALL_LOADING',
        });

        expect(actionList).toContain({
            type: 'ARTICLE_GET_ALL_ERROR',
            err: returendError,
            data: {message: returendError, err: returendError}
        });
        expect(actionList.length).toEqual(3);
    });
});

function theApiGetWillReturn(context, expectedUrl, result, error) {
    context.apiMock = {
        get: (url, callback) => {
            if (url === expectedUrl) {
                callback(error, result);
            } else {
                throw 'Called unexpected endpoint';
            }
        }
    };
}

const returnedError = 'Some error';
const returnedArticle = {
    id: 1,
    title: 'Hello World',
    slug: 'hello-world',
    html: '<div></div>',
    summary: 'This is some summary',
    createdOn: 123412,
    updatedOn: 124123,
    publishedDate: 12500,
    jsonRepresentation: '{}',
    tags: [
        {
            id: 1,
            value: 'java'
        },
        {
            id: 2,
            value: 'programming'
        }
    ],
    isLoading: LoadingTypeEnum.WILL_LOAD
};
const setupSteps = {
    'the api will respond to get specific with success': function(context) {
        theApiGetWillReturn(context, '/api/article/hello-world', {text: JSON.stringify(returnedArticle)}, undefined);
        return context;
    },
    'the api will respond to get specific with error': function(context) {
        theApiGetWillReturn(context, '/api/article/hello-world', undefined, returnedError);
        return context;
    },
    'the api will respond to get specific all with success': function(context) {
        theApiGetWillReturn(context, '/api/article/all/hello-world', {text: JSON.stringify(returnedArticle)}, undefined);
        return context;
    },
    'the api will respond to get specific all with error': function(context) {
        theApiGetWillReturn(context, '/api/article/all/hello-world', undefined, returnedError);
        return context;
    },
    'ArticleServiceMiddleware middleware is initialised with the api mock': function(context) {
        context.middleware = ArticleServiceFactory(context.apiMock);
        return context;
    },
    'the Store will indicate that user is admin': function(context) {
        context.actionList = [];
        context.store = createStore(
            ApplicationReducer,
            {
                ...ApplicationReducerInitialState,
                AdminReducer: {...ApplicationReducerInitialState.AdminReducer, isAdmin: true},
            },
            applyMiddleware(context.middleware, SpyMiddlewareFactory(context.actionList))
        );
        return context;
    },
    'the Store will indicate that user is not admin': function(context) {
        context.actionList = [];
        context.store = createStore(
            ApplicationReducer,
            {
                ...ApplicationReducerInitialState,
                AdminReducer: {...ApplicationReducerInitialState.AdminReducer, isAdmin: false},
            },
            applyMiddleware(context.middleware, SpyMiddlewareFactory(context.actionList))
        );
        return context;
    }
};

const beforeEachByString = (context, description) => {
    const chunks = description.split('and');
    const setupStepDefinitions = Object.keys(setupSteps);
    for (let chunk of chunks) {
        for (let definition of setupStepDefinitions) {
            if (chunk.includes(definition)) {
                context = setupSteps[definition](context);
            }
        }
    }
    return context;
};

const testDescriptions = [
    {
        description:
        'Given the api will respond to get specific with success ' +
        'and ArticleServiceMiddleware middleware is initialised with the api mock ' +
        'and the Store will indicate that user is not admin.',
        context: {}
    },
    {
        description:
        'Given the api will respond to get specific with error' +
        'and ArticleServiceMiddleware middleware is initialised with the api mock ' +
        'and the Store will indicate that user is not admin.',
        context: {}
    },
    {
        description:
        'Given the api will respond to get specific all with success ' +
        'and ArticleServiceMiddleware middleware is initialised with the api mock ' +
        'and the Store will indicate that user is admin.',
        context: {}
    },
    {
        description:
        'Given the api will respond to get specific all with error ' +
        'and ArticleServiceMiddleware middleware is initialised with the api mock ' +
        'and the Store will indicate that user is admin.',
        context: {}
    }
];


describe(testDescriptions[0].description, function () {
    let context = testDescriptions[0].context;
    beforeEach(function() {
        context = beforeEachByString(context, testDescriptions[0].description);
    });

    it('When we dispatch ARTICLE_GET_SPECIFIC with correct payload',
        function () {
            context.store.dispatch({type: 'ARTICLE_GET_SPECIFIC', slug: 'hello-world'});
            expect(context.actionList).toContain(ArticleGetSpecificSuccess.create({...returnedArticle, isLoading: LoadingTypeEnum.LOADED}));
        });
    it('When we dispatch ARTICLE_GET_SPECIFIC with correct payload',
        function () {
            context.store.dispatch({type: 'ARTICLE_GET_SPECIFIC', slug: 'hello-world'});
            expect(context.actionList).toContain(ArticleGetSpecificSuccess.create({...returnedArticle, isLoading: LoadingTypeEnum.LOADED}));

        });
    it('When we dispatch ARTICLE_GET_SPECIFIC with incorrect payload missing slug',
        function () {
            context.store.dispatch({type: 'ARTICLE_GET_SPECIFIC'});
            expect(context.actionList).toContain(
                ArticleGetSpecificError.create('ARTICLE_GET_SPECIFIC action did not contain a valid slug')
            );
        })
});


describe(testDescriptions[1].description, function () {
    let context = testDescriptions[1].context;
    beforeEach(function () {
        context = beforeEachByString(context, testDescriptions[1].description);
    });

    it('when we dispatch ARTICLE_GET_SPECIFIC with incorrect payload missing slug then we should receive failed action',
        function () {
            context.store.dispatch({type: 'ARTICLE_GET_SPECIFIC'});
            expect(context.actionList).toContain(
                ArticleGetSpecificError.create('ARTICLE_GET_SPECIFIC action did not contain a valid slug')
            );
        }
    );
});

describe(testDescriptions[2].description, function () {
    let context = testDescriptions[2].context;
    beforeEach(function() {
        context = beforeEachByString(context, testDescriptions[2].description);
    });

    it('When we dispatch ARTICLE_GET_SPECIFIC with correct payload',
        function () {
            context.store.dispatch({type: 'ARTICLE_GET_SPECIFIC', slug: 'hello-world'});
            expect(context.actionList).toContain(ArticleGetSpecificSuccess.create({...returnedArticle, isLoading: LoadingTypeEnum.LOADED}));
        }
    );
    it('When we dispatch ARTICLE_GET_SPECIFIC with incorrect payload missing slug',
        function () {
            context.store.dispatch({type: 'ARTICLE_GET_SPECIFIC'});
            expect(context.actionList).toContain(
                ArticleGetSpecificError.create('ARTICLE_GET_SPECIFIC action did not contain a valid slug')
            );
        }
    );
});

describe(testDescriptions[3].description, function() {
    let context = testDescriptions[3].context;
    beforeEach(function() {
        context = beforeEachByString(context, testDescriptions[3].description);
    });

    it('when we dispatch ARTICLE_GET_SPECIFIC with incorrect payload missing slug then we should receive failed action',
        function () {
            context.store.dispatch({type: 'ARTICLE_GET_SPECIFIC'});
            expect(context.actionList).toContain(
                ArticleGetSpecificError.create('ARTICLE_GET_SPECIFIC action did not contain a valid slug')
            );
        }
    );
    it('when we dispatch ARTICLE_GET_SPECIFIC with payload then we should receive failed action',
        function () {
            context.store.dispatch({type: 'ARTICLE_GET_SPECIFIC', slug: 'hello-world'});
            expect(context.actionList).toContain(
                ArticleGetSpecificError.create(returnedError, 'hello-world')
            );
        }
    );

    afterEach(() => {
        context.actionList = [];
    })
});

