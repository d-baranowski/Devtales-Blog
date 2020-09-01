import React, {Component} from 'react';

import {LoadingTypeEnum} from '../ArticleType';
import LikesContainer from "../../Likes/LikesContainer";
import ReactMarkdown from "react-markdown";
import CodeBlock from "./CodeBlock";

export class ArticleReader extends Component {
    render() {

        let article = this.props.article || {isLoading: LoadingTypeEnum.LOADING};

        return (
            <div>
                <div className="article-container">
                    {!article.isLoading === LoadingTypeEnum.LOADING && <div className="spinner"/>}
                    {article.text &&
                    <div>
                        <h1>{this.props.article.title}</h1>
                        <ReactMarkdown
                            source={article.text}
                            renderers={{code: CodeBlock}}
                        />
                    </div>}
                </div>

                <LikesContainer liked={true}/>
            </div>
        );
    }
}
