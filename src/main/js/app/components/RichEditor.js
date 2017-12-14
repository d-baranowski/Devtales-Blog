import React from "react";
import {RichUtils, convertToRaw, AtomicBlockUtils, EditorState, Modifier} from 'draft-js';
import BlockStyleControls from "./BlockStyleControls";
import InlineStyleControls from "./InlineStyleControls";
import ConfiguredEditor, {generateState} from "./ConfiguredEditor"
import ImageUploadMenuContainer from "../containers/ImageUploadMenuContainer";

class RichEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {editorState: generateState(props.loadState)};
        this.onChange = (editorState) => this.setState({editorState});
        this.handleKeyCommand = (command) => this._handleKeyCommand(command);
        this.onTab = (e) => this._onTab(e);
        this.toggleBlockType = (type) => this._toggleBlockType(type);
        this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);

        this._confirmMedia = this._confirmMedia.bind(this);
        this._saveAction = this._saveAction.bind(this);
    }

    _saveAction() {
        const state = this.state.editorState.getCurrentContent();
        const data = {
            html: document.getElementsByClassName('public-DraftEditor-content')[0].outerHTML,
            json: JSON.stringify(convertToRaw(state))
        };
        this.props.saveArticle(data)
    }

    _confirmMedia(url) {
        const {editorState} = this.state;
        const contentState = editorState.getCurrentContent();

        const extension = url.split('.').pop();
        const contentStateWithEntity = contentState.createEntity(
            extension == 'mp4' ? 'video' : 'image', //audio,
            'IMMUTABLE',
            {src: url}
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(
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

    _handleKeyCommand(command) {
        const {editorState} = this.state;
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }

    _onTab(e) {
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
                "   "
            );

            e.preventDefault();

            this.onChange(EditorState.push(currentState, newContentState, 'insert-characters'));
        }
    }

    _toggleBlockType(blockType) {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    }

    _toggleInlineStyle(inlineStyle) {
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
        return (
            <div>
                <BlockStyleControls
                    editorState={editorState}
                    onToggle={this.toggleBlockType}
                />
                <InlineStyleControls
                    editorState={editorState}
                    onToggle={this.toggleInlineStyle}
                />
                <ImageUploadMenuContainer addImage={this._confirmMedia} />
                <button onClick={this._saveAction}>Save</button>
                <div className="middle-section">
                    <div className={className}>
                        <ConfiguredEditor
                            editorState={editorState}
                            handleKeyCommand={this.handleKeyCommand}
                            onChange={this.onChange}
                            onTab={this.onTab}
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