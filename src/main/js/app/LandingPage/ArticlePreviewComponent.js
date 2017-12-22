import React from "react";
import PublishingContainer from "./PublishingContainer";
import {NavLink} from "react-router-dom";

const ArticlePreviewComponent = (props) => {
  return (
        <div className="article-short">
          <NavLink exact to={'/article/' + props.article.slug}>
              <h2>{props.article.title}</h2>
              <div dangerouslySetInnerHTML={{__html: props.article.summary}}/>
          </NavLink>
          {(() => {
              if (props.isAdmin) {
                  return (
                      <div>
                          <a href={'/admin/' + props.article.id}>Edit</a>
                          <PublishingContainer slug={props.article.slug} />
                      </div>);
              }
          })()}
        </div>
  )
};

export default ArticlePreviewComponent;
