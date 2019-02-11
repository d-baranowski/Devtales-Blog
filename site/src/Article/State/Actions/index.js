// @flow
import {ArticleGetSpecificSuccess as GetSpecificSuccess}  from './ArticleGetSpecificSuccess';
import {ArticleGetAllSuccess as GetAllSuccess}  from './ArticleGetAllSuccess';
import {ArticleGetAllLoading as GetAllLoading} from './ArticleGetAllLoading';
import {ArticleGetAllError as GetAllError} from './ArticleGetAllError';
import {ArticleGetSpecificLoading as GetSpecificLoading} from './ArticleGetSpecificLoading';
import {ArticleGetSpecificError as GetSpecificError} from './ArticleGetSpecificError';
import {ArticleGetSpecific as GetSpecific} from './Async/ArticleGetSpecific';

import {ArticleGetAll as GetAll} from './Async/ArticleGetAll';

import type {ArticleGetSpecificSuccessAction} from './ArticleGetSpecificSuccess';
import type {ArticleGetAllSuccessAction} from './ArticleGetAllSuccess';
import type {ArticleGetAllLoadingAction} from './ArticleGetAllLoading';
import type {ArticleGetAllErrorAction} from './ArticleGetAllError';
import type {ArticleGetSpecificLoadingAction} from './ArticleGetSpecificLoading';
import type {ArticleGetSpecificErrorAction} from './ArticleGetSpecificError';
import type {ArticleGetSpecificAction} from './Async/ArticleGetSpecific';
import type {ArticleGetAllAction} from './Async/ArticleGetAll';

export const Actions = [
    GetSpecificSuccess,
    GetAllSuccess,
    GetAllLoading,
    GetAllError,
    GetSpecificLoading,
    GetSpecificError
];

export const AsyncActions = [
    GetSpecific,
    GetAll
];

export const ArticleGetSpecificSuccess = GetSpecificSuccess;
export const ArticleGetAllSuccess = GetAllSuccess;
export const ArticleGetAllLoading = GetAllLoading;
export const ArticleGetAllError = GetAllError;
export const ArticleGetSpecificLoading = GetSpecificLoading;
export const ArticleGetSpecificError = GetSpecificError;
export const ArticleGetSpecific = GetSpecific;
export const ArticleGetAll = GetAll;

export type ActionTypes =
    ArticleGetSpecificSuccessAction |
    ArticleGetAllSuccessAction |
    ArticleGetAllLoadingAction |
    ArticleGetAllErrorAction |
    ArticleGetSpecificLoadingAction |
    ArticleGetSpecificErrorAction |
    ArticleGetSpecificAction |
    ArticleGetAllAction