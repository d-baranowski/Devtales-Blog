// @flow
import type {Action, ApplicationActionCreator} from '../../../../../Configuration';
import type {ImagesReducerType} from '../ImagesReducer';

type ImagesGetErrorType = 'GET_IMAGES_ERROR';

export type ImagesGetErrorAction = {
    type: ImagesGetErrorType,
    err: string,
    data: {message: string}
};

type Creator = ApplicationActionCreator<ImagesReducerType, ImagesGetErrorAction, ImagesGetErrorType>

export const ImagesGetError: Creator = {
    type: 'GET_IMAGES_ERROR',
    reduce: (state: ImagesReducerType): ImagesReducerType => ({
        ...state
    }),
    match: (action: Action) => ImagesGetError.type === action.type,
    create: (error: string) => ({
        type: ImagesGetError.type,
        err: error,
        data: {message: error}
    })
};