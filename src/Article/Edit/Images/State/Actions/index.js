// @flow
import {ImagesGetSuccess as GetSuccess} from './ImagesGetSuccess';
import {ImagesGetError as GetError} from './ImagesGetError';
import {ImagesToggleMenu as ToggleMenu} from './ImagesToggleMenu';
import {ImagesGet as Get} from './Async/ImagesGet';

import type {ImagesGetSuccessAction} from './ImagesGetSuccess';
import type {ImagesGetErrorAction} from './ImagesGetError';
import type {ImagesToggleMenuAction} from './ImagesToggleMenu';

export const Actions = [
    GetSuccess,
    ToggleMenu,
    GetError
];

export const AsyncActions = [
    Get
];

export type ActionTypes = 
    ImagesGetSuccessAction |
    ImagesToggleMenuAction |
    ImagesGetErrorAction;

export const ImagesGetSuccess = GetSuccess;
export const ImagesGetError = GetError;
export const ImagesToggleMenu = ToggleMenu;
export const ImagesGet = Get;
