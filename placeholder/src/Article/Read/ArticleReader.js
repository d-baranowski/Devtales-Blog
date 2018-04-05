//@flow
import React, {Component} from 'react';
import {If} from '../../Utility';
import {ConfiguredEditor, GenerateConfiguredEditorState} from '../Display/index';
import {LoadingTypeEnum} from '../ArticleType';
import type {Article as ArticleType} from '../ArticleType';

type Props = {
    article: ArticleType | null,
    slug: string
};

export class ArticleReader extends Component<Props> {
    render() {
        let article = this.props.article || {};

        return (
            <div className="article-container">
                <If _={article.isLoading === LoadingTypeEnum.LOADING}>
                    <div className="spinner" />
                </If>
                <If _={article.jsonRepresentation}>
                    <ConfiguredEditor
                        readOnly="true"
                        editorState={GenerateConfiguredEditorState(article.jsonRepresentation)}
                        spellCheck={false}/>
                </If>
                <If _={!article.jsonRepresentation && article.isLoading === LoadingTypeEnum.LOADED}>
                    <p>There was a problem loading this article.</p>
                </If>
            </div>
        );
    }
}