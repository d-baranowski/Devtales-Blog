import {ArticleGetSpecificSuccess as GetSpecificSuccess}  from './ArticleGetSpecificSuccess';
import {ArticleGetAllSuccess as GetAllSuccess}  from './ArticleGetAllSuccess';
import {ArticleGetAllLoading as GetAllLoading} from './ArticleGetAllLoading';
import {ArticleGetAllError as GetAllError} from './ArticleGetAllError';
import {ArticleGetSpecificLoading as GetSpecificLoading} from './ArticleGetSpecificLoading';
import {ArticleGetSpecificError as GetSpecificError} from './ArticleGetSpecificError';
import {ArticleGetSpecific as GetSpecific} from './Async/ArticleGetSpecific';

import {ArticleGetAll as GetAll} from './Async/ArticleGetAll';

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