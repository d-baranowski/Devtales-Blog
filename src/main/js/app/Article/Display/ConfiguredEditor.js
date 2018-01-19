import React from 'react';
import {Editor, DefaultDraftBlockRenderMap} from 'draft-js';
import Immutable from 'immutable';
import Media from './Media';
import StyledCodeBlock from './StyledCodeBlock';

const blockRenderMap = DefaultDraftBlockRenderMap.merge(
    Immutable.Map({
        'atomic': {component: Media, editable: false},
        'code-block': {element: 'pre', wrapper: <StyledCodeBlock />}
    })
);

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

const customBlockRenderFunction = (block) => {
    if (block.getType() === 'atomic') {
        return {
            component: Media,
            editable: false,
        };
    }
    return null;
};

export const ConfiguredEditor = (props) => {
    return (
        <Editor
            {...props}
            blockRenderMap={blockRenderMap}
            blockRendererFn={customBlockRenderFunction}
            blockStyleFn={getBlockStyle}
            editorKey="serverSide"
        />
    );
};