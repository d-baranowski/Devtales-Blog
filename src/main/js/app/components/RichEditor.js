import React from "react";
import {CompositeDecorator, DefaultDraftBlockRenderMap, Editor ,EditorState, RichUtils, convertToRaw} from 'draft-js';
import BlockStyleControls from "./BlockStyleControls";
import InlineStyleControls from "./InlineStyleControls";
import SummaryBlock from "./EditorComponents/SummaryBlock";


//Custom Block Types
const blockRenderMap = {
    'summary': {
        element: 'section',
        wrapper: SummaryBlock
    }
};

function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote':
            return 'RichEditor-blockquote';
        case 'summary':
            return 'summary';
        default:
            return null;
    }
}

// Include 'summary' as a valid block and updated the unstyled element but
// keep support for other draft default block types
const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

// Custom overrides for "code" style.
const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    }
};

const HASHTAG_REGEX = /\#[\w\u0590-\u05ff]+/g;
function hashtagStrategy(contentBlock, callback, contentState) {
    findWithRegex(HASHTAG_REGEX, contentBlock, callback);
}

function findWithRegex(regex, contentBlock, callback) {
    const text = contentBlock.getText();
    let matchArr, start;
    while ((matchArr = regex.exec(text)) !== null) {
        start = matchArr.index;
        callback(start, start + matchArr[0].length);
    }
}

const HashtagSpan = (props) => {
    return (
        <span
            style = {{
                color: 'rgba(95, 184, 138, 1.0)'
            }}
            className="tag"
            data-offset-key={props.offsetKey}
        >
            {props.children}
          </span>
    );
};

const compositeDecorator = new CompositeDecorator([
    {
        strategy: hashtagStrategy,
        component: HashtagSpan,
    },
]);


class RichEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {editorState: EditorState.createEmpty(compositeDecorator)};
        this.focus = () => this.refs.editor.focus();
        this.onChange = (editorState) => this.setState({editorState});
        this.handleKeyCommand = (command) => this._handleKeyCommand(command);
        this.onTab = (e) => this._onTab(e);
        this.toggleBlockType = (type) => this._toggleBlockType(type);
        this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    }

    _saveAction() {
        const state = this.state.editorState.getCurrentContent();
        const data = {
            html: document.getElementsByClassName('public-DraftEditor-content')[0].outerHTML,
            json: JSON.stringify(convertToRaw(state))
        };
        this.props.saveArticle(data)
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
        this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
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
        const {editorState} = this.state;

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
                <button onClick={this._saveAction.bind(this)}>Save</button>
                <div className="middle-section">
                    <div className={className} onClick={this.focus}>
                        <Editor
                            blockRenderMap={extendedBlockRenderMap}
                            blockStyleFn={getBlockStyle}
                            customStyleMap={styleMap}
                            editorState={editorState}
                            handleKeyCommand={this.handleKeyCommand}
                            onChange={this.onChange}
                            onTab={this.onTab}
                            placeholder="Write here..."
                            ref="editor"
                            spellCheck={true}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default RichEditor;