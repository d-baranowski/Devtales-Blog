import React from 'react';
import MyEditor, {generateState} from './MyEditor';

const Article = (props) => {
    const {article} = props;

    return (
        <div>
            <MyEditor
                readOnly="true"
                editorState= {generateState(article.jsonRepresentation)}
                spellCheck={false}
            />
        </div>
    );
};

export default Article;