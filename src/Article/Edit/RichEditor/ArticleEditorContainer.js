// @flow
import React, {Component}  from 'react';
import {connect} from 'react-redux';
import RichEditor from './RichEditor';
import {ImageUploadMenuContainer} from '../Images';

import type {ApplicationReducerType} from '../../../Configuration';
import type {Article} from '../../ArticleType';
import {If} from "../../../Utility";
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
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-")
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

    uploadMenuContainer = (props) => (<ImageUploadMenuContainer {...props} />);

    saveArticle = (article) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(article.html, "text/html");

        const elements = doc.getElementsByTagName("*");

        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            for (let datasetKey in element.dataset) {
                if (element.dataset.hasOwnProperty(datasetKey)) {
                    delete element.dataset[datasetKey];
                }
            }
        }

        let summary = "";

        const summaryElements = doc.getElementsByClassName("summary");
        for (let i = 0; i < summaryElements.length; i++) {
            summary += summaryElements[i].outerHTML + '<br>'
        }

        const headers = doc.getElementsByTagName("h1");
        const title = headers.length > 0 ? headers[0].innerText : "";

        const value = {
            title,
            slug: slugify(title),
            jsonRepresentation: article.json,
            summary
        };

        localStorage.setItem(value.slug, JSON.stringify(value));

        if (this.props.match.params.articleSlug !== value.slug) {
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
        return <If _={article}><RichEditor
            article={article}
            downloadArticle={this.downloadArticle}
            saveArticle={this.saveArticle}
            uploadMenuContainer={this.uploadMenuContainer}
        /></If>;
    }
}));