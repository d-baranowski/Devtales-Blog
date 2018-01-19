// @flow
import type {HttpRequesterInterface} from '../../../../HttpRequest/index';
import {AsyncActions} from './Actions';
import type {ActionTypes} from './Actions';

export const ImagesServiceFactory =
    (httpRequester: HttpRequesterInterface, formDataService: (formId: string) => FormData) =>
        (store: Store) =>
            (next: (action: ActionTypes) => void) =>
                (action: ActionTypes) => {
                    next(action);
                    for (let possibleAction of AsyncActions) {
                        if (possibleAction.match(action)) {
                            possibleAction.reduce(store, next, action, {httpRequester, formDataService});
                        }
                    }
                };