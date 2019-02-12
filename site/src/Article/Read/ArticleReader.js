//@flow
import React, {Component} from 'react';

import {LoadingTypeEnum} from '../ArticleType';
import type {Article as ArticleType} from '../ArticleType';
import MegadraftEditor from "../../Megadraft/src/components/MegadraftEditor";
import {editorStateFromRaw} from "../../Megadraft/src/utils";

type Props = {
    article: ArticleType | null,
    slug: string
};

export class ArticleReader extends Component<Props> {
    render() {
        let article = this.props.article || {isLoading: LoadingTypeEnum.LOADING};

        return (
            <div className="article-container">
                {!article.isLoading === LoadingTypeEnum.LOADING && <div className="spinner" />}
                {article.jsonRepresentation &&
                    <MegadraftEditor
                        readOnly="true"
                        editorState={editorStateFromRaw(JSON.parse(article.jsonRepresentation))}
                        spellCheck={false}/>}
            </div>
        );
    }
}