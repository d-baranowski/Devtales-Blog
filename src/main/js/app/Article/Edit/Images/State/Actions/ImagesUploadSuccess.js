// @flow
import {prependWithAddress} from '../ImagesReducer';
import type {Action, ApplicationActionCreator} from '../../../../../Configuration';
import type {ImagesReducerType} from '../ImagesReducer';

type ImagesUploadSuccessType = 'UPLOAD_IMAGE_SUCCESS';

export type ImagesUploadSuccessAction = {
    type: ImagesUploadSuccessType,
    data: {
        text: string
    }
};

type Creator = ApplicationActionCreator<ImagesReducerType, ImagesUploadSuccessAction, ImagesUploadSuccessType>

export const ImagesUploadSuccess: Creator = {
    type: 'UPLOAD_IMAGE_SUCCESS',
    reduce: (state: ImagesReducerType, action: ImagesUploadSuccessAction): ImagesReducerType => {
        if (action.data.text) {
            return {
                ...state,
                images: [...state.images, {
                    image: prependWithAddress(action.data.text),
                    thumb: prependWithAddress('thumb-' + action.data.text)
                }]
            };
        } else {
            return {
                ...state,
                error: 'Failed to get uploaded image.'
            };
        }
    },
    match: (action: Action) => ImagesUploadSuccess.type === action.type,
    create: (image: string) => ({
        type: ImagesUploadSuccess.type,
        data: {
            text: image
        }
    })
};