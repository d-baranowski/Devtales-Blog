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

const mapDispatchToProps = (dispatch) => {
    return({})
};

const ArticleListContainer = connect(mapStateToProps, mapDispatchToProps)(class extends Component {
    render() {
        const articles = this.props.articles;

        let result = [];
        articles.forEach((element, index, array) => {
            result.push(
                <div className="article-short">
                    <NavLink exact to={'/article/' + element.slug}>
                        <h2>{element.title}</h2>
                        <div>{element.body}</div>
                    </NavLink>
                </div>
            );
        });

        return result ? <div id="article-list">{result}</div> : <div>Loading</div>
    }
});

export default ArticleListContainer;