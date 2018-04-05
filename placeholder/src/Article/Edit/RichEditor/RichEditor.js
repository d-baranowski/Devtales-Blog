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
    updateArticle: (id: number) => (data: ArticleDataType) => void,
    saveArticle: (data: ArticleDataType) => void,
    uploadMenuContainer: Function
}

type State = {
    editorState: EditorStateType,
    showURLInput: ?boolean,
    urlValue: ?string
}

class RichEditor extends Component<Props, State> {
    onChange: (editorState: EditorStateType) => void;
    _handleKeyCommand: (command: string) => DraftHandleValue;
    _toggleInlineStyle: (inlineStyle: string) => void;
    _toggleBlockType: (blockType: string) => void;
    _onTab: (e: SyntheticKeyboardEvent<*>) => void;
    _confirmMedia: (url: string) => void;
    _saveAction: () => void;

    constructor(props: Props) {
        super(props);
        const loadState = this.props.article ? this.props.article.jsonRepresentation : false;
        this.state = {editorState: GenerateConfiguredEditorState(loadState),
            showURLInput: false,
            urlValue: ''};

        this.onChange = this.onChange.bind(this);
        this._handleKeyCommand = this._handleKeyCommand.bind(this);
        this._toggleInlineStyle = this._toggleInlineStyle.bind(this);
        this._toggleBlockType = this._toggleBlockType.bind(this);
        this._onTab = this._onTab.bind(this);
        this._confirmMedia = this._confirmMedia.bind(this);
        this._saveAction = this._saveAction.bind(this);
    }

    onChange(editorState: EditorStateType): void {
        this.setState({editorState});
    }

    _saveAction() {
        const saveArticle = this.props.article ? this.props.updateArticle(this.props.article.id) : this.props.saveArticle;
        const state = this.state.editorState.getCurrentContent();
        const data = {
            html: document.getElementsByClassName('public-DraftEditor-content')[0].outerHTML,
            json: JSON.stringify(convertToRaw(state))
        };
        saveArticle(data);
    }

    _confirmMedia(url: string) {
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

    _handleKeyCommand(command: string): DraftHandleValue {
        const {editorState} = this.state;
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }

    _onTab(e: SyntheticKeyboardEvent<*>): void {
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

    _toggleBlockType(blockType: string): void {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    }

    _toggleInlineStyle(inlineStyle: string): void {
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