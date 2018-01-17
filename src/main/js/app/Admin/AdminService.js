import type {Store} from "../Configuration";
import type {HttpRequesterInterface} from "../HttpRequest";

export const AdminServiceFactory =
    (httpRequester : HttpRequesterInterface) =>
        (store : Store) =>
            (next : (action: {type: string}) => void) =>
                (action : any) => {
                    next(action);
                    if (action.type === "IS_ADMIN") {
                        httpRequester
                            .get('/api/admin', (err, res) => {
                                if (err) {
                                } else {
                                    if (res.body) {
                                        next({
                                            type: 'ADMIN_BECOME'
                                        });
                                    }
                                    else if (!res.body) {
                                        next({
                                            type: 'ADMIN_STOP'
                                        });
                                    }
                                }
                            });
                    }

                };