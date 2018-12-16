// @flow
import {ImagesGetSuccess} from '../index';
import {ImagesGetError} from '../index';

import type {HttpRequesterInterface} from '../../../../../../HttpRequest';
import type {Action, ApplicationAsyncActionCreator} from '../../../../../../Configuration';

export type ImagesGetType = 'GET_IMAGES';

type ImagesGetAction = {
    type: ImagesGetType
}

type Creator = ApplicationAsyncActionCreator<ImagesGetType>

type GetImagesResponseType = {
    text: string
}

export const ImagesGet: Creator = {
    type: 'GET_IMAGES',
    reduce: (store, next, action: ImagesGetAction, services) => {
        if (!services || !services.httpRequester) {
            throw new Error('Configuration issue in ImagesGet async action.');
        }
        const httpRequester: HttpRequesterInterface = services.httpRequester;

        httpRequester
            .get('https://s3-eu-west-1.amazonaws.com/devtales.bucket.net/?list-type=2&prefix=blog-content', (err, res: GetImagesResponseType) => {
                if (err) {
                    next(ImagesGetError.create(err));
                } else {
                    next(ImagesGetSuccess.create(res.text));
                }
            });
    },
    match: (action: Action) => (ImagesGet.type === action.type),
    create: () => ({
        type: ImagesGet.type
    })
};