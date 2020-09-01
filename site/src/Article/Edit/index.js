// @flow
import {HttpRequester} from '../../HttpRequest';
import {ArticleServiceFactory} from '../State/ArticleService';

export const ArticleService = ArticleServiceFactory(HttpRequester);
