import React from 'react';
import {ConfiguredEditor, GenerateConfiguredEditorState} from '../Display/index';

export const Article = (props) => {
    const {article} = props;

    return (
        <div className="article-container">
            <ConfiguredEditor
                readOnly="true"
                editorState={GenerateConfiguredEditorState(article.jsonRepresentation)}
                spellCheck={false}
            />
        </div>
    );
};