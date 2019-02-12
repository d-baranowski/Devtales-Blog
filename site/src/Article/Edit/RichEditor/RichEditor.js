// @flow
import React, {Component} from 'react';


import type {Article} from '../../ArticleType';
import {editorStateFromRaw, editorStateToJSON} from "../../../Megadraft/src/utils";
import MegadraftEditor from "../../../Megadraft/src/components/MegadraftEditor";

type ArticleDataType = {
    html: string,
    json: string
};

type Props = {
    article: Article,
    saveArticle: (data: ArticleDataType) => void,
    downloadArticle: (data: ArticleDataType) => void,
    uploadMenuContainer: Function
}

type State = {
    editorState: any,
    showURLInput: ?boolean,
    urlValue: ?string
}

class RichEditor extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        const loadState = this.props.article ? this.props.article.jsonRepresentation : false;
        this.state = {editorState: editorStateFromRaw(JSON.parse(loadState)),
            showURLInput: false,
            urlValue: ''};
    }

    onChange = (editorState): void => {
        this.setState({editorState});
    };

    getData = () => {
        const state = this.state.editorState.getCurrentContent();
        return {
            json: editorStateToJSON(state)
        };
    };

    _saveAction = () => {
        const saveArticle = this.props.saveArticle;
        saveArticle(this.getData());
    };

    _downloadAction = () => {
        this.props.downloadArticle(this.getData());
    };

    render() {
        const editorState = this.state.editorState;

        // If the user changes block type before entering any text, we can
        // either style the placeholder or hide it. Let's just hide it now.
        let className = 'RichEditor-editor';
        const contentState = editorState.getCurrentContent();

        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' RichEditor-hidePlaceholder';
            }
        }

        return (
            <div>
                <button id="download-button" onClick={this._downloadAction}>Download</button>
                <button id="save-button" onClick={this._saveAction}>Save</button>
                <div className="middle-section">
                    <div className={className}>
                        <MegadraftEditor
                            editorState={editorState}
                            onChange={this.onChange}
                            placeholder="Write here..."
                            spellCheck={true}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default RichEditor;