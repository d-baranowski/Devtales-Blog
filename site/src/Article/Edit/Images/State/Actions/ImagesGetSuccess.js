// @flow
import {prependWithAddress} from '../ImagesReducer';
import type {Action, ApplicationActionCreator} from '../../../../../Configuration';
import type {ImagesReducerType} from '../ImagesReducer';

type ImagesGetSuccessType = 'GET_IMAGES_SUCCESS';

export type ImagesGetSuccessAction = {
    type: ImagesGetSuccessType,
    response: string
}

type Creator = ApplicationActionCreator<ImagesReducerType, ImagesGetSuccessAction, ImagesGetSuccessType>

export const ImagesGetSuccess: Creator = {
    type: 'GET_IMAGES_SUCCESS',
    reduce: (state: ImagesReducerType, action: ImagesGetSuccessAction): ImagesReducerType => {
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(action.response, "application/xml");
            return {
                ...state,
                images: Array.from(doc.getElementsByTagName("Key"))
                    .map(elem => `https://devtales.net/${elem.innerHTML}`)
                    .slice(1)
            };
        } catch (err) {
            return {
                ...state,
                error: err
            }
        }
    },
    match: (action: Action) => ImagesGetSuccess.type === action.type,
    create: (response: string) => ({
        type: ImagesGetSuccess.type,
        response
    })
};