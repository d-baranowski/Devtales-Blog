import {ImagesServiceFactory} from './ImagesService';

import {applyMiddleware, createStore} from 'redux';
import {ImagesGetError, ImagesUploadError, ImagesUploadSuccess} from './Actions';

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

        expect(actionList).toContain({type: 'GET_IMAGES_SUCCESS', data: {body: retunedImages}});
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

        expect(actionList).toContain(ImagesGetError.create(retunedError));
        expect(actionList.length).toEqual(2);
    });

    afterEach(() => {
        actionList = [];
        mock = {};
    });
});

describe('The api will respond to post with success and form will return form data', () => {
    let middleware;
    let mockHttpRequester;
    let mockFormDataService;
    let store;
    let actionList = [];
    let retunedImage =  'some-image-url';

    beforeEach(() => {
        actionList = [];
        mockHttpRequester = {
            post: (url, data ,callback) => {
                callback(undefined, {text: retunedImage});
            }
        };

        mockFormDataService = () => {
            return {type: 'This will be a FormData object'};
        };

        middleware = ImagesServiceFactory(mockHttpRequester, mockFormDataService);

        store = createStore(
            (s, a) => s,
            {},
            applyMiddleware(middleware, SpyMiddlewareFactory(actionList))
        );
    });

    it('will dispatch UPLOAD_IMAGE_SUCCESS action after I dispatch UPLOAD_IMAGE with data', () => {

        store.dispatch({
            type: 'UPLOAD_IMAGE',
            data: 'some-form-id'
        });

        expect(actionList).toContain(ImagesUploadSuccess.create(retunedImage));
        expect(actionList.length).toEqual(2);
    });

    it('will dispatch UPLOAD_IMAGE_ERROR action after I dispatch UPLOAD_IMAGE without data', () => {

        store.dispatch({
            type: 'UPLOAD_IMAGE',
        });

        expect(actionList).toContain(ImagesUploadError.create('Failed to upload image. Action was missing data.'));
        expect(actionList.length).toEqual(2);
    });

    afterEach(() => {
        actionList = [];
        mockHttpRequester = {};
    });
});

describe('The api will respond to post with success but form service will throw an error', () => {
    let middleware;
    let mockHttpRequester;
    let mockFormDataService;
    let store;
    let actionList = [];
    let retunedImage =  'some-image-url';
    let thrownError = 'There is an error';

    beforeEach(() => {
        actionList = [];
        mockHttpRequester = {
            post: (url, data ,callback) => {
                callback(undefined, {body: retunedImage});
            }
        };

        mockFormDataService = () => {
            throw thrownError;
        };

        middleware = ImagesServiceFactory(mockHttpRequester, mockFormDataService);

        store = createStore(
            (s, a) => s,
            {},
            applyMiddleware(middleware, SpyMiddlewareFactory(actionList))
        );
    });

    it('will dispatch UPLOAD_IMAGE_ERROR action after I dispatch UPLOAD_IMAGE with data', () => {

        store.dispatch({
            type: 'UPLOAD_IMAGE',
            data: 'some-form-id'
        });

        expect(actionList).toContain(ImagesUploadError.create(thrownError));
        expect(actionList.length).toEqual(2);
    });

    afterEach(() => {
        actionList = [];
        mockHttpRequester = {};
    });
});

describe('The api will respond to post error and form will return form data', () => {
    let middleware;
    let mockHttpRequester;
    let mockFormDataService;
    let store;
    let actionList = [];
    let retunedError =  'There was an error';

    beforeEach(() => {
        actionList = [];
        mockHttpRequester = {
            post: (url, data ,callback) => {
                callback(retunedError, undefined);
            }
        };

        mockFormDataService = () => {
            return {type: 'This will be a FormData object'};
        };

        middleware = ImagesServiceFactory(mockHttpRequester, mockFormDataService);

        store = createStore(
            (s, a) => s,
            {},
            applyMiddleware(middleware, SpyMiddlewareFactory(actionList))
        );
    });

    it('will dispatch UPLOAD_IMAGE_ERROR action after I dispatch UPLOAD_IMAGE with data', () => {

        store.dispatch({
            type: 'UPLOAD_IMAGE',
            data: 'some-form-id'
        });

        expect(actionList).toContain(ImagesUploadError.create(retunedError));
        expect(actionList.length).toEqual(2);
    });

    it('will dispatch UPLOAD_IMAGE_ERROR action after I dispatch UPLOAD_IMAGE without data', () => {

        store.dispatch({
            type: 'UPLOAD_IMAGE',
        });

        expect(actionList).toContain(ImagesUploadError.create('Failed to upload image. Action was missing data.'));
        expect(actionList.length).toEqual(2);
    });

    afterEach(() => {
        actionList = [];
        mockHttpRequester = {};
    });
});
