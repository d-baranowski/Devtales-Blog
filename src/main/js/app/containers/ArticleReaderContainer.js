import React, { Component }  from 'react';
import { connect } from 'react-redux';
import Article from "../components/Article";

const mapStateToProps = (state) => {
    return {
        articles: state.articleReducer.articles || []
    }
};

const mapDispatchToProps = (dispatch) => {
    return({

    })
};

const ArticleReaderContaier = connect(mapStateToProps, mapDispatchToProps)(class extends Component {
    componentDidMount() {
        //If article doesn't exist fetch it
    }

    render() {
        const slug = this.props.match.params.articleSlug;
        const article = this.props.articles[slug];

        return <Article article={article}/>
    }
});

export default ArticleReaderContaier;