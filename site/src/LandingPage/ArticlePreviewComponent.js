import React from 'react';
import {NavLink} from 'react-router-dom';

const ArticlePreviewComponent = (props) => {
    return (
        <div style={props.style} className={"article-short card hover-move " + props.className}>
            <NavLink exact to={'/article/' + props.article.slug}>
                <h2>{props.article.title}</h2>
                <div dangerouslySetInnerHTML={{__html: props.article.summary}}/>
            </NavLink>
        </div>
    );
};

export default ArticlePreviewComponent;