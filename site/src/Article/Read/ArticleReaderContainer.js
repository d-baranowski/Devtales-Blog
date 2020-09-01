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
    getArticle() {
        const slug = this.props.match.params.articleSlug;
        const localStorageArticle = localStorage.getItem(slug);
        let article;

        if (localStorageArticle) {
            article = JSON.parse(localStorageArticle)
        } else {
            article =this.props.articles[slug]
        }

        console.log(article);
        return article;
    }

    componentDidMount() {
        if (!this.getArticle()) {
            this.props.fetchArticle(this.props.match.params.articleSlug);
        }
    }

    render() {
        const slug: string = this.props.match.params.articleSlug;
        const article: ArticleType = this.getArticle();

        return <ArticleReader
            slug={slug}
            article={article}/>;
    }
});
