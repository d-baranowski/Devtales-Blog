import React from "react";
import draft, {Editor ,DefaultDraftBlockRenderMap, EditorState, convertFromRaw} from 'draft-js';
import Immutable from "immutable";
import Decorators from "./Decorators"
import Media from "./Media";

class StyledCodeBlock extends React.Component {
    render() {
        return (
            <div>
                <pre className="language-">
                    {this.props.children}
                </pre>
            </div>
        )
    }
}

const blockRenderMap = DefaultDraftBlockRenderMap.merge(
    Immutable.Map({
        'atomic': { component: Media, editable: false },
        'code-block': { element: 'pre', wrapper: <StyledCodeBlock /> }
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
            blockRenderMap={blockRenderMap}
            blockRendererFn={customBlockRenderFunction}
            blockStyleFn={getBlockStyle}
            editorKey="serverSide"
        />
    );
};

export default ConfiguredEditor;