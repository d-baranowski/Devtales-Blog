import React, { Component }  from 'react';
import { connect } from 'react-redux';
import {NavLink} from "react-router-dom";


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
                <div key={'article-' + index + 1} className="article-short">
                    <NavLink exact to={'/article/' + article.slug}>
                        <h2>{article.title}</h2>
                        <div dangerouslySetInnerHTML={{__html: article.summary}}/>
                    </NavLink>
                        {(() => {
                            if (isAdmin) {
                                return (<a href={'/admin/' + article.id}>Edit</a>);
                            }
                        })()}
                </div>
            );
        });

        return result.length > 0 ? <div id="article-list">{result}</div> : <div>Loading</div>
    }
});

export default ArticleListContainer;