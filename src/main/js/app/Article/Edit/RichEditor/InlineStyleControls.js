// @flow

import React from "react";
import StyleButton from "./StyleButton";
import type {EditorState} from "draft-js";


type InlineStyleType = {
    label: string,
    style: string
}

type Props = {
    editorState: EditorState,
    onToggle: (inlineStyle: string) => void
}

const INLINE_STYLES: InlineStyleType[] = [
    {label: 'Bold', style: 'BOLD'},
    {label: 'Italic', style: 'ITALIC'},
    {label: 'Underline', style: 'UNDERLINE'},
    {label: 'Monospace', style: 'CODE'}
];

const InlineStyleControls = (props : Props) => {
    const currentStyle = props.editorState.getCurrentInlineStyle();

    return (
        <div>
            {INLINE_STYLES.map(type =>
                <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};

export default InlineStyleControls;