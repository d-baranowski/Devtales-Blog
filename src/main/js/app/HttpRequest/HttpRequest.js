// @flow

import type superagentType from "superagent"

export const HttpRequesterFactory = (superagent : superagentType) => {
    return new HttpRequester(superagent)
};

export interface HttpRequesterInterface {
    superagent: superagentType,
    post(url: string, data: any, callback: (err: any, res: any) => void): void;
    put(url: string, data: any, callback: (err: any, res: any) => void): void;
    patch(url: string, callback: (err: any, res: any) => void): void;
    delete(url: string, callback: (err: any, res: any) => void): void;
    get(url: string, callback: (err: any, res: any) => void): void;
}

class HttpRequester implements HttpRequesterInterface {
    superagent : superagentType;

    constructor(superagent : superagentType) {
        this.superagent = superagent;
    }

    post(url: string, data: any, callback: (err: any, res: any) => void) {
        this.superagent
            .post(url)
            .send(data)
            .end(callback)
    }

    put(url: string, data: any, callback: (err: any, res: any) => void) {
        this.superagent
            .put(url)
            .send(data)
            .end(callback)
    }

    patch(url: string, callback: (err: any, res: any) => void) {
        this.superagent
            .patch(url)
            .send()
            .end(callback)
    }

    delete(url: string, callback: (err: any, res: any) => void) {
        this.superagent
            .delete(url)
            .send()
            .end(callback)
    }

    get(url: string, callback: (err: any, res: any) => void) {
        this.superagent
            .get(url)
            .send()
            .end(callback)
    }
}