import React, {Component} from "react";
import {connect} from "react-redux";
import ArticlePreviewComponent from "./ArticlePreviewComponent";


const mapStateToProps = (state) => {
    return {
        articles: state.articleReducer.articles || [],
        isAdmin: state.adminReducer.isAdmin
    }
};

const getAllArticlesAction = () => {
    return {
        type: 'ARTICLE_GET_ALL'
    }
};

const mapDispatchToProps = (dispatch) => {
    return({
        getAllArticles: () => {dispatch(getAllArticlesAction())}
    })
};

const ArticleListContainer = connect(mapStateToProps, mapDispatchToProps)(class extends Component {
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

export default ArticleListContainer;