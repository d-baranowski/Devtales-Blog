// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ArticleReader} from './ArticleReader';

import type {ApplicationReducerType} from '../../Configuration';
import type {Articles, ArticleType} from '../.';


type Props = {
    articles: Articles,
    match: { // Injected by router
        params: {
            articleSlug: string
        }
    },
    fetchArticle: (slug: string) => void
}

const mapStateToProps = (state: ApplicationReducerType) => {
    return {
        articles: state.ArticleReducer.articles || []
    };
};

const mapDispatchToProps = (dispatch) => {
    return({
        fetchArticle: (slug) =>{ dispatch({type: 'ARTICLE_GET_SPECIFIC', slug}); }
    });
};

export const ArticleReaderContainer = connect(mapStateToProps, mapDispatchToProps)(class ArticleReaderContainer extends Component<Props> {
    componentDidMount() {
        let article =  this.props.articles[this.props.match.params.articleSlug];
        if (!article) {
            this.props.fetchArticle(this.props.match.params.articleSlug);
        }
    }

    render() {
        const slug: string = this.props.match.params.articleSlug;
        const article: ArticleType = this.props.articles[slug];

        return <ArticleReader
            slug={slug}
            article={article}/>;
    }
});
