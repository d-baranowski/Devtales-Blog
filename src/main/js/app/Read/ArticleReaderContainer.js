// @flow

import React, { Component }  from 'react';
import { connect } from 'react-redux';
import {Article} from "./Article";
import type {ApplicationReducerType} from "../Configuration"


const mapStateToProps = (state : ApplicationReducerType) => {
    return {
        articles: state.ArticleReducer.articles || []
    }
};

const mapDispatchToProps = (dispatch) => {
    return({

    })
};

export const ArticleReaderContaier = connect(mapStateToProps, mapDispatchToProps)(class extends Component {
    componentDidMount() {
        //If article doesn't exist fetch it
    }

    render() {
        const slug = this.props.match.params.articleSlug;
        const article = this.props.articles[slug];

        return <Article article={article}/>
    }
});
