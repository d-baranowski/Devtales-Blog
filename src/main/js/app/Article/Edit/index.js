// @flow
import {HttpRequester} from "../../HttpRequest"
import {ArticleServiceFactory} from '../ArticleService';
import {ImagesServiceFactory} from './Images/ImagesService';
import {FormDataService} from "./Images/FormDataService";

export {ImagesReducer, ImagesReducerInitialState} from "./Images/ImagesReducer"
export {ArticleEditorContainer} from "./RichEditor/ArticleEditorContainer"

export const ImagesService = ImagesServiceFactory(HttpRequester, FormDataService);
export const ArticleService = ArticleServiceFactory(HttpRequester);

export type {ImagesReducerType, Images} from "./Images/ImagesReducer"