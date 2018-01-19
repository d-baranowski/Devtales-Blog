// @flow
import {HttpRequester} from '../../HttpRequest';
import {ArticleServiceFactory} from '../State/ArticleService';
import {ImagesServiceFactory} from './Images/State/ImagesService';
import {FormDataService} from './Images/FormDataService';

export {ImagesReducer, ImagesReducerInitialState} from './Images/State/ImagesReducer';
export {ArticleEditorContainer} from './RichEditor/ArticleEditorContainer';

export const ImagesService = ImagesServiceFactory(HttpRequester, FormDataService);
export const ArticleService = ArticleServiceFactory(HttpRequester);

export type {ImagesReducerType, Images} from './Images/State/ImagesReducer';