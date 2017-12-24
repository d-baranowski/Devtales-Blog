// @flow
import type {ApplicationReducerType} from "../../Configuration/index"
import type {Articles} from "../."

import React, { Component }  from 'react';
import { connect } from 'react-redux';
import {Article} from "./Article";


type Props = {
    articles: Articles,
    match: { // Injected by router
        params: {
            articleSlug: string
        }
    }
}

const mapStateToProps = (state : ApplicationReducerType) => {
    return {
        articles: state.ArticleReducer.articles || []
    }
};

const mapDispatchToProps = (dispatch) => {
    return({

    })
};

export const ArticleReaderContainer = connect(mapStateToProps, mapDispatchToProps)(class extends Component<Props> {
    componentDidMount() {
        //If article doesn't exist fetch it
    }

    render() {
        const slug = this.props.match.params.articleSlug;
        const article = this.props.articles[slug];

        return <Article article={article}/>
    }
});
