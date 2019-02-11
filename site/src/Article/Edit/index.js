// @flow
import {HttpRequester} from '../../HttpRequest';
import {ArticleServiceFactory} from '../State/ArticleService';
import {ImagesServiceFactory} from './Images/State/ImagesService';

export {ImagesReducer, ImagesReducerInitialState} from './Images/State/ImagesReducer';
export {ArticleEditorContainer} from './RichEditor/ArticleEditorContainer';

export const ImagesService = ImagesServiceFactory(HttpRequester);
export const ArticleService = ArticleServiceFactory(HttpRequester);

export type {ImagesReducerType, Images} from './Images/State/ImagesReducer';