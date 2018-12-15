// @flow
import React, {Component} from 'react';
import {RichUtils, convertToRaw, AtomicBlockUtils, Modifier, EditorState} from 'draft-js';
import BlockStyleControls from './BlockStyleControls';
import InlineStyleControls from './InlineStyleControls';
import {ConfiguredEditor, GenerateConfiguredEditorState} from '../../Display/index';

import type {EditorState as EditorStateType, DraftHandleValue} from 'draft-js';
import type {Article} from '../../ArticleType';

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
    editorState: EditorStateType,
    showURLInput: ?boolean,
    urlValue: ?string
}

class RichEditor extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        const loadState = this.props.article ? this.props.article.jsonRepresentation : false;
        this.state = {editorState: GenerateConfiguredEditorState(loadState),
            showURLInput: false,
            urlValue: ''};
    }

    onChange = (editorState: EditorStateType): void => {
        this.setState({editorState});
    };

    getData = () => {
        const state = this.state.editorState.getCurrentContent();
        return {
            html: document.getElementsByClassName('public-DraftEditor-content')[0].outerHTML,
            json: JSON.stringify(convertToRaw(state))
        };
    };

    _saveAction = () => {
        const saveArticle = this.props.saveArticle;
        saveArticle(this.getData());
    };

    _downloadAction = () => {
        this.props.downloadArticle(this.getData());
    };

    _confirmMedia = (url: string) => {
        const {editorState} = this.state;
        const contentState = editorState.getCurrentContent();

        const extension = url.split('.').pop();
        const contentStateWithEntity = contentState.createEntity(
            extension == 'mp4' ? 'video' : 'image', //audio,
            'IMMUTABLE',
            {src: url}
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState : EditorStateType = EditorState.set(
            editorState,
            {currentContent: contentStateWithEntity}
        );

        this.setState({
            editorState: AtomicBlockUtils.insertAtomicBlock(
                newEditorState,
                entityKey,
                ' '
            ),
            showURLInput: false,
            urlValue: '',
        });
    }

    _handleKeyCommand = (command: string): DraftHandleValue => {
        const {editorState} = this.state;
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }

    _onTab = (e: SyntheticKeyboardEvent<*>): void => {
        const maxDepth = 4;
        const editorState = this.state.editorState;
        const listHandle = RichUtils.onTab(e, editorState, maxDepth);
        if (listHandle !== editorState) {
            this.onChange(listHandle);
        } else {
            const selection = editorState.getSelection();
            const key = selection.getAnchorKey();
            if (key !== selection.getFocusKey()) {
                return editorState;
            }

            const content = editorState.getCurrentContent();
            const block = content.getBlockForKey(key);
            const type = block.getType();
            if (type !== 'code-block') {
                return editorState;
            }

            let currentState = this.state.editorState;
            let newContentState = Modifier.replaceText(
                editorState.getCurrentContent(),
                editorState.getSelection(),
                '   '
            );

            e.preventDefault();

            this.onChange(EditorState.push(currentState, newContentState, 'insert-characters'));
        }
    }

    _toggleBlockType = (blockType: string): void => {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    }

    _toggleInlineStyle = (inlineStyle: string): void => {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    }

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

        const ImageUploadMenu = () => this.props.uploadMenuContainer({addImage: this._confirmMedia});

        return (
            <div>
                <BlockStyleControls
                    editorState={editorState}
                    onToggle={this._toggleBlockType}
                />
                <InlineStyleControls
                    editorState={editorState}
                    onToggle={this._toggleInlineStyle}
                />
                <ImageUploadMenu />
                <button id="download-button" onClick={this._downloadAction}>Download</button>
                <button id="save-button" onClick={this._saveAction}>Save</button>
                <div className="middle-section">
                    <div className={className}>
                        <ConfiguredEditor
                            editorState={editorState}
                            handleKeyCommand={this._handleKeyCommand}
                            onChange={this.onChange}
                            onTab={this._onTab}
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