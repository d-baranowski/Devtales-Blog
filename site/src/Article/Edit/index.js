// @flow
import {HttpRequester} from '../../HttpRequest';
import {ArticleServiceFactory} from '../State/ArticleService';

export {ArticleEditorContainer} from './RichEditor/ArticleEditorContainer';

export const ArticleService = ArticleServiceFactory(HttpRequester);