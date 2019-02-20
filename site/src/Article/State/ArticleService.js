import {AsyncActions} from './Actions';

export const ArticleServiceFactory =
    (httpRequester) =>
        (store) =>
            (next: (action) => void) =>
                (action: any) => {
                    next(action);
                    for (let possibleAction of AsyncActions) {
                        if (possibleAction.match(action)) {
                            possibleAction.reduce(store, next, action, httpRequester);
                        }
                    }
                };