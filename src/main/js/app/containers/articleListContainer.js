import React, { Component }  from 'react';
import { connect } from 'react-redux';
import {NavLink} from "react-router-dom";

const mapStateToProps = (state) => {
    if (state.articleReducer) {
        return {
            articles: state.articleReducer.articles || []
        }
    } else {
        return {
            articles: []
        }
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

        let result = [];
        articles.forEach((element, index, array) => {
            result.push(
                <div key={'article-' + index + 1} className="article-short">
                    <NavLink exact to={'/article/' + element.slug}>
                        <h2>{element.title}</h2>
                        <div dangerouslySetInnerHTML={{__html: element.summary}}/>
                    </NavLink>
                </div>
            );
        });

        return result.length > 0 ? <div id="article-list">{result}</div> : <div>Loading</div>
    }
});

export default ArticleListContainer;