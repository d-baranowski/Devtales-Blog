// @flow
import {ImagesGetSuccess as GetSuccess} from './ImagesGetSuccess';
import {ImagesGetError as GetError} from './ImagesGetError';
import {ImagesUploadSuccess as UploadSuccess} from './ImagesUploadSuccess';
import {ImagesUploadError as UploadError} from './ImagesUploadError';
import {ImagesToggleMenu as ToggleMenu} from './ImagesToggleMenu';
import {ImagesGet as Get} from './Async/ImagesGet';
import {ImagesUpload as Upload} from './Async/ImagesUpload';

import type {ImagesGetSuccessAction} from './ImagesGetSuccess';
import type {ImagesGetErrorAction} from './ImagesGetError';
import type {ImagesUploadSuccessAction} from './ImagesUploadSuccess';
import type {ImagesUploadErrorAction} from './ImagesUploadError';
import type {ImagesToggleMenuAction} from './ImagesToggleMenu';
import type {ImagesUploadAction} from './Async/ImagesUpload';

export const Actions = [
    GetSuccess,
    UploadSuccess,
    ToggleMenu,
    UploadError,
    GetError
];

export const AsyncActions = [
    Get,
    Upload
];

export type ActionTypes = 
    ImagesGetSuccessAction |
    ImagesUploadSuccessAction |
    ImagesToggleMenuAction |
    ImagesUploadAction |
    ImagesUploadErrorAction |
    ImagesGetErrorAction;

export const ImagesGetSuccess = GetSuccess;
export const ImagesGetError = GetError;
export const ImagesUploadSuccess = UploadSuccess;
export const ImagesUploadError = UploadError;
export const ImagesToggleMenu = ToggleMenu;
export const ImagesGet = Get;
