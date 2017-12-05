import React from "react";
import {Editor , DefaultDraftBlockRenderMap, CompositeDecorator, EditorState, convertFromRaw} from 'draft-js';
import SummaryBlock from "./EditorComponents/SummaryBlock";

//Custom Block Types
const blockRenderMap = {
    'summary': {
        element: 'section',
        wrapper: SummaryBlock
    },
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
// Custom overrides for "code" style.
const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    }
};


// Include 'summary' as a valid block and updated the unstyled element but
// keep support for other draft default block types
const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

const HASHTAG_REGEX = /\#[\w\u0590-\u05ff]+/g;
const hashtagStrategy = (contentBlock, callback, contentState) => {
    findWithRegex(HASHTAG_REGEX, contentBlock, callback);
};

const findWithRegex = (regex, contentBlock, callback) => {
    const text = contentBlock.getText();
    let matchArr, start;
    while ((matchArr = regex.exec(text)) !== null) {
        start = matchArr.index;
        callback(start, start + matchArr[0].length);
    }
};

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

export const generateState = (article) => {
    return article ?
        EditorState.createWithContent(convertFromRaw(JSON.parse(article)), compositeDecorator) :
        EditorState.createEmpty(compositeDecorator)
};

const Audio = (props) => {
    return <audio controls src={props.src} />;
};
const Image = (props) => {
    return <img src={props.src} />;
};
const Video = (props) => {
    return <video controls src={props.src} />;
};
const Media = (props) => {
    const entity = props.contentState.getEntity(
        props.block.getEntityAt(0)
    );
    const {src} = entity.getData();
    const type = entity.getType();
    let media;
    if (type === 'audio') {
        media = <Audio src={src}/>;
    } else if (type === 'image') {
        media = <Image src={src}/>;
    } else if (type === 'video') {
        media = <Video src={src}/>;
    }
    return media;
};
function mediaBlockRenderer(block) {
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
            blockRendererFn={mediaBlockRenderer}
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorKey="serverSide"
        />
    );
};

export default ConfiguredEditor;