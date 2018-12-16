import {ImagesServiceFactory} from './ImagesService';

import {applyMiddleware, createStore} from 'redux';
import {ImagesGetError} from './Actions';

const SpyMiddlewareFactory = (actionList) => (store) => (next) => (action) => {
    next(action);
    actionList.push(action);
};

describe('The api will respond to get with success', () => {
    let middleware;
    let mock;
    let store;
    let actionList = [];
    let retunedImages =  ['some-image-url', 'some-image-url2'];

    beforeEach(() => {
        actionList = [];
        mock = {
            get: (url, callback) => {
                callback(undefined, {body: retunedImages});
            }
        };

        middleware = ImagesServiceFactory(mock);

        store = createStore(
            (s, a) => s,
            {},
            applyMiddleware(middleware, SpyMiddlewareFactory(actionList))
        );
    });

    it('will dispatch GET_IMAGES_SUCCESS action after I dispatch GET_IMAGES', () => {

        store.dispatch({
            type: 'GET_IMAGES'
        });

        expect(actionList[1]).toEqual({type: 'GET_IMAGES_SUCCESS', data: {body: retunedImages}});
        expect(actionList.length).toEqual(2);
    });

    afterEach(() => {
        actionList = [];
        mock = {};
    });
});

describe('The api will respond to get with error', () => {
    let middleware;
    let mock;
    let store;
    let actionList = [];
    let retunedError =  'Some error message';

    beforeEach(() => {
        actionList = [];
        mock = {
            get: (url, callback) => {
                callback(retunedError, undefined);
            }
        };

        middleware = ImagesServiceFactory(mock);

        store = createStore(
            (s, a) => s,
            {},
            applyMiddleware(middleware, SpyMiddlewareFactory(actionList))
        );
    });

    it('will dispatch GET_IMAGES_ERROR action after I dispatch GET_IMAGES', () => {

        store.dispatch({
            type: 'GET_IMAGES'
        });

        expect(actionList).toEqual(expect.arrayContaining([ImagesGetError.create(retunedError)]));
        expect(actionList.length).toEqual(2);
    });

    afterEach(() => {
        actionList = [];
        mock = {};
    });
});
