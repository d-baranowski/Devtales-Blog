// @flow
import React, {Component}  from 'react';
import {connect} from 'react-redux';
import RichEditor from './RichEditor';

import type {ApplicationReducerType} from '../../../Configuration';
import type {Article} from '../../ArticleType';
import {get} from "../../../Utility";
import {withRouter} from "react-router";

type Props = {
    article: Article,
    saveArticle: Function,
    updateArticle: Function
}

const mapStateToProps = (state: ApplicationReducerType) => {
    return {
        articles: state.ArticleReducer.articles
    };
};

const mapDispatchToProps = (dispatch) => {
    return({
        fetchArticle: (slug) =>{ dispatch({type: 'ARTICLE_GET_SPECIFIC', slug}); }
    });
};

const slugify = string => string
        .toString()
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "");

export const ArticleEditorContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(class ArticleEditorContainer extends Component<Props> {
    componentDidMount() {
        const slug = this.props.match.params.articleSlug;
        let article = localStorage.getItem(slug) || this.props.articles[slug];
        if (!article) {
            this.props.fetchArticle(this.props.match.params.articleSlug);
        }
    }

    saveArticle = (article) => {
        const articleState = JSON.parse(article.json);
        const blocks = get(articleState, ['blocks'], []);
        const summaryBlock = blocks.find(block => block.type === "summary");
        const titleBlock = blocks.find(block => block.type === "header-two");

        let summary = summaryBlock ? summaryBlock.text : "";
        const title = titleBlock ? titleBlock.text : "";

        const value = {
            title,
            slug: slugify(title),
            jsonRepresentation: article.json,
            summary
        };

        localStorage.setItem(value.slug || "new-article", JSON.stringify(value));

        if (value.slug && this.props.match.params.articleSlug !== value.slug) {
            this.props.history.push(`/edit/article/${value.slug}`);
        }

        return value;
    };

    downloadArticle = (article) => {
        const value = this.saveArticle(article);
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(value));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href",     dataStr);
        downloadAnchorNode.setAttribute("download", value.slug + ".json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    render() {
        const slug = this.props.match.params.articleSlug;
        const article = JSON.parse(localStorage.getItem(slug)) || this.props.articles[slug];
        return <RichEditor
            article={article}
            downloadArticle={this.downloadArticle}
            saveArticle={this.saveArticle}
            uploadMenuContainer={this.uploadMenuContainer}
        />;
    }
}));