// @flow
import {ArticleGetSpecificSuccess as GetSpecificSuccess}  from './ArticleGetSpecificSuccess';
import {ArticleGetAllSuccess as GetAllSuccess}  from './ArticleGetAllSuccess';
import {ArticleGetAllLoading as GetAllLoading} from './ArticleGetAllLoading';
import {ArticleGetAllError as GetAllError} from './ArticleGetAllError';
import {ArticleGetSpecificLoading as GetSpecificLoading} from './ArticleGetSpecificLoading';
import {ArticleCreateSuccess as CreateSuccess} from './ArticleCreateSuccess';
import {ArticlePublishSuccess as PublishSuccess} from './ArticlePublishOrHideSuccess';
import {ArticleHideSuccess as HideSuccess} from './ArticlePublishOrHideSuccess';
import {ArticleGetSpecificError as GetSpecificError} from './ArticleGetSpecificError';
import {ArticlePublishError as PublishError} from './ArticlePublishError';
import {ArticleCreateError as CreateError} from './ArticleCreateError';
import {ArticleHideError as HideError} from './ArticleHideError';
import {ArticleUpdateError as UpdateError} from './ArticleUpdateError';
import {ArticleUpdateSuccess as UpdateSuccess} from './ArticleUpdateSuccess';
import {ArticleGetSpecific as GetSpecific} from './Async/ArticleGetSpecific';
import {ArticleUpdate as Update} from './Async/ArticleUpdate';
import {ArticleCreate as Create} from './Async/ArticleCreate';
import {ArticlePublish as Publish} from './Async/ArticlePublish';
import {ArticleHide as Hide} from './Async/ArticleHide';
import {ArticleGetAll as GetAll} from './Async/ArticleGetAll';

import type {ArticleGetSpecificSuccessAction} from './ArticleGetSpecificSuccess';
import type {ArticleGetAllSuccessAction} from './ArticleGetAllSuccess';
import type {ArticleGetAllLoadingAction} from './ArticleGetAllLoading';
import type {ArticleGetAllErrorAction} from './ArticleGetAllError';
import type {ArticleGetSpecificLoadingAction} from './ArticleGetSpecificLoading';
import type {ArticleCreateSuccessAction} from './ArticleCreateSuccess';
import type {ArticlePublishOrHideSuccessAction} from './ArticlePublishOrHideSuccess';
import type {ArticleGetSpecificErrorAction} from './ArticleGetSpecificError';
import type {ArticlePublishErrorAction} from './ArticlePublishError';
import type {ArticleCreateErrorAction} from './ArticleCreateError';
import type {ArticleHideErrorAction} from './ArticleHideError';
import type {ArticleGetSpecificAction} from './Async/ArticleGetSpecific';
import type {ArticleUpdateAction} from './Async/ArticleUpdate';
import type {ArticleCreateAction} from './Async/ArticleCreate';
import type {ArticlePublishAction} from './Async/ArticlePublish';
import type {ArticleHideAction} from './Async/ArticleHide';
import type {ArticleGetAllAction} from './Async/ArticleGetAll';
import type {ArticleUpdateErrorAction} from './ArticleUpdateError';
import type {ArticleUpdateSuccessAction} from './ArticleUpdateSuccess';

export const Actions = [
    GetSpecificSuccess,
    GetAllSuccess,
    GetAllLoading,
    GetAllError,
    GetSpecificLoading,
    CreateSuccess,
    PublishSuccess,
    HideSuccess,
    GetSpecificError,
    PublishError,
    CreateError,
    UpdateError
];

export const AsyncActions = [
    GetSpecific,
    Update,
    Create,
    Publish,
    Hide,
    GetAll
];

export const ArticleGetSpecificSuccess = GetSpecificSuccess;
export const ArticleGetAllSuccess = GetAllSuccess;
export const ArticleGetAllLoading = GetAllLoading;
export const ArticleGetAllError = GetAllError;
export const ArticleGetSpecificLoading = GetSpecificLoading;
export const ArticleCreateSuccess = CreateSuccess;
export const ArticlePublishSuccess = PublishSuccess;
export const ArticleHideSuccess = HideSuccess;
export const ArticleGetSpecificError = GetSpecificError;
export const ArticlePublishError = PublishError;
export const ArticleCreateError = CreateError;
export const ArticleHideError = HideError;
export const ArticleUpdateError = UpdateError;
export const ArticleUpdateSuccess = UpdateSuccess;
export const ArticleGetSpecific = GetSpecific;
export const ArticleUpdate = Update;
export const ArticleCreate = Create;
export const ArticlePublish = Publish;
export const ArticleHide = Hide;
export const ArticleGetAll = GetAll;

export type ActionTypes =
    ArticleGetSpecificSuccessAction |
    ArticleGetAllSuccessAction |
    ArticleGetAllLoadingAction |
    ArticleGetAllErrorAction |
    ArticleGetSpecificLoadingAction |
    ArticleCreateSuccessAction |
    ArticlePublishOrHideSuccessAction |
    ArticleGetSpecificErrorAction |
    ArticlePublishErrorAction |
    ArticleHideErrorAction |
    ArticleCreateErrorAction |
    ArticleUpdateErrorAction |
    ArticleGetSpecificAction |
    ArticleUpdateAction |
    ArticleCreateAction |
    ArticlePublishAction |
    ArticleHideAction |
    ArticleGetAllAction |
    ArticleUpdateSuccessAction;