// @flow
import type {ImagesReducerType} from '../ImagesReducer';
import type {Action, ApplicationActionCreator} from '../../../../../Configuration';

type ImagesUploadErrorType = 'UPLOAD_IMAGE_ERROR';

export type ImagesUploadErrorAction = {
    type: ImagesUploadErrorType,
    err: string,
    data: {message: string}
};

type Creator = ApplicationActionCreator<ImagesReducerType, ImagesUploadErrorAction, ImagesUploadErrorType>

export const ImagesUploadError: Creator = {
    type: 'UPLOAD_IMAGE_ERROR',
    reduce: (state: ImagesReducerType): ImagesReducerType => ({
        ...state
    }),
    match: (action: Action) => ImagesUploadError.type === action.type,
    create: (error: string) => ({
        type: ImagesUploadError.type,
        err: error,
        data: {message: error}
    })
};