// @flow
import React, {Component}  from 'react';
import {connect} from 'react-redux';
import PublishingComponent from './PublishingComponent';

import type {ApplicationReducerType, Dispatch} from '../Configuration';
import type {ArticleType} from '../Article';

export type Props = {
    isAdmin: boolean,
    article: ArticleType,
    publish: (id: number) => void,
    hide: (id: number) => void,
    slug: string
}

type OwnProps = {
    slug: string
}

const mapStateToProps = (state: ApplicationReducerType, ownProps: OwnProps) => {
    if (!ownProps.slug) {
        throw 'Publishing container did not receive a valid slug.';
    }

    return {
        isAdmin: state.AdminReducer.isAdmin,
        article: state.ArticleReducer.articles[ownProps.slug],
    };
};

const publishArticleAction = (id) => {
    return {
        type: 'PUBLISH_ARTICLE',
        id
    };
};
const hideArticleAction = (id) => {
    return {
        type: 'HIDE_ARTICLE',
        id
    };
};

const mapDispatchToProps = ((dispatch: Dispatch) => {
    return ({
        publish: (id: number) => dispatch(publishArticleAction(id)),
        hide: (id: number) => dispatch(hideArticleAction(id))
    });
});
const PublishingContainer = connect(mapStateToProps, mapDispatchToProps)(class PublishingContainer extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }


    render() {
        return (
            <PublishingComponent
                article={this.props.article}
                isAdmin={this.props.isAdmin}
                slug={this.props.slug}
                publish={this.props.publish}
                hide={this.props.hide}
            />);
    }
});

export default PublishingContainer;