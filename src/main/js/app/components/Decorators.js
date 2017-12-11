import React  from "react";
import {CompositeDecorator} from "draft-js";


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

const Decorators = new CompositeDecorator([
    {
        strategy: hashtagStrategy,
        component: HashtagSpan,
    },
]);

export default Decorators;