import React from "react";
import {Editor , DefaultDraftBlockRenderMap, EditorState, convertFromRaw} from 'draft-js';
import Decorators from "./Decorators"
import Media from "./Media";

//Custom Block Types
const blockRenderMap = {
    'atomic': {
        component: Media,
        editable: false,
    }
};

const getBlockStyle = (block) => {
    switch (block.getType()) {
        case 'blockquote':
            return 'RichEditor-blockquote';
        case 'summary':
            return 'summary';
        default:
            return null;
    }
};

// Include 'summary' as a valid block and updated the unstyled element but
// keep support for other draft default block types
const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

export const generateState = (article) => {
    return article ?
        EditorState.createWithContent(convertFromRaw(JSON.parse(article)), Decorators) :
        EditorState.createEmpty(Decorators)
};

function customBlockRenderFunction(block) {
    if (block.getType() === 'atomic') {
        return {
            component: Media,
            editable: false,
        };
    }
    return null;
}

const ConfiguredEditor = (props) => {
    return (
        <Editor
            {...props}
            blockRenderMap={extendedBlockRenderMap}
            blockRendererFn={customBlockRenderFunction}
            blockStyleFn={getBlockStyle}
            editorKey="serverSide"
        />
    );
};

export default ConfiguredEditor;