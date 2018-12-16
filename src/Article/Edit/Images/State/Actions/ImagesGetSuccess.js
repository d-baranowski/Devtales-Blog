// @flow
import {prependWithAddress} from '../ImagesReducer';
import type {Action, ApplicationActionCreator} from '../../../../../Configuration';
import type {ImagesReducerType} from '../ImagesReducer';

type ImagesGetSuccessType = 'GET_IMAGES_SUCCESS';

export type ImagesGetSuccessAction = {
    type: ImagesGetSuccessType,
    data: {
        body: string[]
    }
}

type Creator = ApplicationActionCreator<ImagesReducerType, ImagesGetSuccessAction, ImagesGetSuccessType>

export const ImagesGetSuccess: Creator = {
    type: 'GET_IMAGES_SUCCESS',
    reduce: (state: ImagesReducerType, action: ImagesGetSuccessAction): ImagesReducerType => {
        if (action.data.body !== undefined && action.data.body.constructor === Array) {
            return {
                ...state,
                images: action.data.body.map((x) => ({
                    image: prependWithAddress(x),
                    thumb: prependWithAddress('thumb-' + x)
                }))
            };
        }
        return {
            ...state,
            error: 'Failed to get images.'
        };
    },
    match: (action: Action) => ImagesGetSuccess.type === action.type,
    create: (images: string[]) => ({
        type: ImagesGetSuccess.type,
        data: {
            body: images
        }
    })
};