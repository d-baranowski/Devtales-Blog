import React, {Component} from 'react';

import {LoadingTypeEnum} from '../ArticleType';
import MegadraftEditor from "../../Megadraft/src/components/MegadraftEditor";
import {editorStateFromRaw} from "../../Megadraft/src/utils";
import icons from "../../Megadraft/src/icons";


const LikeIcon = icons.LikeIcon;
const DislikeIcon = icons.DislikeIcon;

export class ArticleReader extends Component {
    render() {

        let article = this.props.article || {isLoading: LoadingTypeEnum.LOADING};

        return (
            <div>
                <div className="article-container">
                    {!article.isLoading === LoadingTypeEnum.LOADING && <div className="spinner" />}
                    {article.jsonRepresentation &&
                        <MegadraftEditor
                            readOnly="true"
                            editorState={editorStateFromRaw(JSON.parse(article.jsonRepresentation))}
                            spellCheck={false}/>}
                </div>

                <div className="like-container">
                    <div className="interactive-icon"><LikeIcon /></div>
                    <div className="interactive-icon"><DislikeIcon /></div>
                </div>
            </div>
        );
    }
}