// @flow
import {ArticleGetSpecificError, ArticleGetSpecificLoading, ArticleGetSpecificSuccess} from '../';

import type {ApplicationAsyncActionCreator} from '../../../../Configuration';
import type {HttpRequesterInterface} from '../../../../HttpRequest';
import type {LoadingType} from "../../../ArticleType";

type ArticleGetSpecificType = 'ARTICLE_GET_SPECIFIC';

export type ArticleGetSpecificAction = {
    type: ArticleGetSpecificType,
    slug: string
}

type Creator = ApplicationAsyncActionCreator<ArticleGetSpecificType>

export const ArticleGetSpecific: Creator = {
    type: 'ARTICLE_GET_SPECIFIC',
    reduce: (store, next, action: ArticleGetSpecificAction, httpRequester: HttpRequesterInterface) => {
        if (!httpRequester) {
            throw new Error('Configuration issue in ArticleGetSpecific async action. Please provide a valid httpRequester!');
        }

        if (!action.slug) {
            next(ArticleGetSpecificError.create('ARTICLE_GET_SPECIFIC action did not contain a valid slug'));
        } else {
            next(ArticleGetSpecificLoading.create(action.slug));

            httpRequester
                .get(`/article/${action.slug}.md`, (err, res) => {
                    if (err) {
                        next(ArticleGetSpecificError.create(err, action.slug));
                    } else {
                        let txt = res.text;
                        const tagLength = '<metadata-json>'.length;
                        const matches  = txt.match(/<metadata-json>([\s\S]*?)<metadata-json>/gm);
                        let metadata = matches[0];

                        txt = txt.substring(metadata.length, txt.length);

                        metadata = metadata.substring(tagLength, metadata.length);
                        metadata = metadata.substring(0, metadata.length - tagLength);
                        const parsed = JSON.parse(metadata);
                        console.log(parsed);

                        next(ArticleGetSpecificSuccess.create({
                            id: parsed.id,
                            title: parsed.title,
                            slug: action.slug,
                            summary: "",
                            date: parsed.date,
                            tags: parsed.tags,
                            text: txt,
                        }));
                    }
                });
        }
    },
    match: (action) => (ArticleGetSpecific.type === action.type),
    create: (slug: string) => ({
        type: ArticleGetSpecific.type,
        slug
    })
};
