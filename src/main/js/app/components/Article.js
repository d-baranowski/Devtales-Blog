import React from 'react';
import ConfiguredEditor, {generateState} from './ConfiguredEditor';

const Article = (props) => {
    const {article} = props;

    return (
        <div className="article-container">
            <ConfiguredEditor
                readOnly="true"
                editorState= {generateState(article.jsonRepresentation)}
                spellCheck={false}
            />
        </div>
    );
};

export default Article;