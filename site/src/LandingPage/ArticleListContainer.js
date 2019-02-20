import React, {Component} from 'react';
import {connect} from 'react-redux';
import ArticlePreviewComponent from './ArticlePreviewComponent';

const mapStateToProps = (state) => {
    return {
        articles: state.ArticleReducer.articles || []
    };
};

const getAllArticlesAction = () => {
    return {
        type: 'ARTICLE_GET_ALL'
    };
};

const mapDispatchToProps = (dispatch) => {
    return ({
        getAllArticles: () => {
            dispatch(getAllArticlesAction());
        }
    });
};

let seen = false;

export const ArticleListContainer = connect(mapStateToProps, mapDispatchToProps)(class ArticleListContainer extends Component {
    componentDidMount() {
        this.props.getAllArticles();
    }

    render() {
        const articles = this.props.articles;

        let result = [];
        Object.keys(articles).forEach((element, i) => {
            const article = articles[element];
            result.push(
                <ArticlePreviewComponent
                    className={!seen ? "fly-in" : ""}
                    style={{animationDelay: `${i * 25}ms`}}
                    key={'article-' + article.slug}
                    article={article}
                />
            );
        });

        if (Object.keys(this.props.articles).length > 0) {
            seen = true;
        }

        return result.length > 0 ? <div className="articles-container">{result}</div> : <div />;
    }
});