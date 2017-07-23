import React, { Component }  from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        articles: state.articleReducer.articles || []
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
            result.push(<div>
                <h2>{element.title}</h2>
                <div>{element.body}</div>
            </div>);
        });

        return result ? <div>{result}</div> : <div>Loading</div>
    }
});

export default ArticleListContainer;