// @flow
import type {Store} from '../../Configuration/index';
import type {HttpRequesterInterface} from '../../HttpRequest/index';
import type {ActionTypes} from './Actions';
import { AsyncActions } from './Actions';

export const ArticleServiceFactory =
    (httpRequester: HttpRequesterInterface) =>
        (store: Store) =>
            (next: (action: ActionTypes) => void) =>
                (action: any) => {
                    next(action);
                    for (let possibleAction of AsyncActions) {
                        if (possibleAction.match(action)) {
                            possibleAction.reduce(store, next, action, httpRequester);
                        }
                    }
                };