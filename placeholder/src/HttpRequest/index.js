// @flow

import superagent from 'superagent';
import {HttpRequesterFactory} from './HttpRequest';

export const HttpRequester = HttpRequesterFactory(superagent);
export type {HttpRequesterInterface} from './HttpRequest';