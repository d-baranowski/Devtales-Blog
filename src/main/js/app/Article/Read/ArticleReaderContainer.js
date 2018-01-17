// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ArticleReader} from "./ArticleReader";

import type {ApplicationReducerType} from "../../Configuration"
import type {Articles, Article} from "../."


type Props = {
    articles: Articles,
    match: { // Injected by router
        params: {
            articleSlug: string
        }
    },
    fetchArticle: (slug: string) => void
}

const mapStateToProps = (state : ApplicationReducerType) => {
    return {
        articles: state.ArticleReducer.articles || []
    }
};

const mapDispatchToProps = (dispatch) => {
    return({
        fetchArticle: (slug) =>{ dispatch({type: "ARTICLE_GET_SPECIFIC", slug}) }
    })
};

export const ArticleReaderContainer = connect(mapStateToProps, mapDispatchToProps)(class extends Component<Props> {
    componentDidMount() {
        let article = this.props.article || {};
        if (!article.jsonRepresentation) {
            this.props.fetchArticle(this.props.match.params.articleSlug);
        }
    }

    render() {
        const slug: string = this.props.match.params.articleSlug;
        const article: Article = this.props.articles[slug];

        return <ArticleReader
            slug={slug}
            article={article}/>;
    }
});
