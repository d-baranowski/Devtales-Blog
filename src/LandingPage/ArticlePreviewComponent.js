// @flow
import React from 'react';
import PublishingContainer from './PublishingContainer';
import {NavLink} from 'react-router-dom';
import type {Article} from '../Article/ArticleType';

type Props = {
    article: Article,
    isAdmin: boolean
}

const ArticlePreviewComponent = (props: Props) => {
    return (
        <div className="article-short">
            <NavLink exact to={'/article/' + props.article.slug}>
                <h2>{props.article.title}</h2>
                <div dangerouslySetInnerHTML={{__html: props.article.summary}}/>
            </NavLink>
        </div>
    );
};

export default ArticlePreviewComponent;
