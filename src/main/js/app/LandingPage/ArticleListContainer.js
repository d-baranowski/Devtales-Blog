// @flow

import React, {Component} from "react";
import {connect} from "react-redux";
import ArticlePreviewComponent from "./ArticlePreviewComponent";
import type {ApplicationReducerType} from "../Configuration";
import type {Articles} from "../Article";

type Props = {
    articles: Articles,
    isAdmin: boolean,
    getAllArticles: Function
};

const mapStateToProps = (state: ApplicationReducerType) => {
    return {
        articles: state.ArticleReducer.articles || [],
        isAdmin: state.AdminReducer.isAdmin
    }
};

const getAllArticlesAction = () => {
    return {
        type: 'ARTICLE_GET_ALL'
    }
};

const mapDispatchToProps = (dispatch) => {
    return ({
        getAllArticles: () => {
            dispatch(getAllArticlesAction())
        }
    })
};

export const ArticleListContainer = connect(mapStateToProps, mapDispatchToProps)(class extends Component<Props> {
    componentDidMount() {
        this.props.getAllArticles();
    }

    render() {
        const articles = this.props.articles;
        const isAdmin = this.props.isAdmin;

        let result = [];
        Object.keys(articles).forEach((element, index, array) => {
            const article = articles[element];
            result.push(
                <ArticlePreviewComponent key={'article-' + index + 1} isAdmin={isAdmin} article={article}/>
            );
        });

        return result.length > 0 ? <div>{result}</div> : <div />
    }
});