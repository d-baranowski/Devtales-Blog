// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Article} from "./Article";

import type {ApplicationReducerType} from "../../Configuration"
import type {Articles} from "../."


type Props = {
    articles: Articles,
    match: { // Injected by router
        params: {
            articleSlug: string
        }
    },
    fetchArticles: () => void
}

const mapStateToProps = (state : ApplicationReducerType) => {
    return {
        articles: state.ArticleReducer.articles || []
    }
};

const mapDispatchToProps = (dispatch) => {
    return({
        fetchArticles: dispatch({type: "ARTICLE_GET_ALL"})
    })
};

export const ArticleReaderContainer = connect(mapStateToProps, mapDispatchToProps)(class extends Component<Props> {
    componentDidMount() {
        if (!this.props.articles[this.props.match.params.articleSlug]) {
            this.props.fetchArticles();
        }
    }

    render() {
        const slug = this.props.match.params.articleSlug;
        const article = this.props.articles[slug];

        return <Article article={article}/>;
    }
});
