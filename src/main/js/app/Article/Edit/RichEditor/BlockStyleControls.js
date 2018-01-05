//@flow
import React from "react";
import StyleButton from "./StyleButton";

import type {EditorState} from "draft-js";

type BlockType = {
    label: string,
    style: string
}

const BLOCK_TYPES: BlockType[] = [
    {label: 'H1', style: 'header-one'},
    {label: 'H2', style: 'header-two'},
    {label: 'H3', style: 'header-three'},
    {label: 'H4', style: 'header-four'},
    {label: 'H5', style: 'header-five'},
    {label: 'H6', style: 'header-six'},
    {label: 'Blockquote', style: 'blockquote'},
    {label: 'UL', style: 'unordered-list-item'},
    {label: 'OL', style: 'ordered-list-item'},
    {label: 'Summary', style: 'summary'},
    {label: 'Code Block', style: 'code-block'},

];

type Props = {
    editorState: EditorState,
    onToggle: (blockType: string) => void
}

const BlockStyleControls = (props: Props) => {
    const {editorState} = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();
    return (
        <div>
            {BLOCK_TYPES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};

export default BlockStyleControls;