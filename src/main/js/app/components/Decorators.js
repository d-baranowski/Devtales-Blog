import React  from "react";
import {CompositeDecorator} from "draft-js";
import Prism from 'prismjs/components/prism-core';
import clike from 'prismjs/components/prism-clike';
import js from 'prismjs/components/prism-javascript';

const HASHTAG_REGEX = /\#[\w\u0590-\u05ff]+/g;
const hashtagStrategy = (contentBlock, callback, contentState) => {
    findWithRegex(HASHTAG_REGEX, contentBlock, callback);
};

let activeLanguage = Prism.languages.clike;

const detectLanguage = (text) => {
    if (text.includes('## javascript ##')) {
        activeLanguage = Prism.languages.javascript;
    }
};

const prismStrategy = (contentBlock, callback, contentState) => {
    if (contentBlock.getType() !== "code-block") {
        return
    }

    const text = contentBlock.getText();
    detectLanguage(text);
    const tokens = Prism.tokenize(text, activeLanguage);
    if (tokens) {
        contentBlock.tokenMap = {};
        let stringIndex = 0;
        for (let i = 0; i < tokens.length; i++) {
            let token = tokens[i];
            if (token.content) {
                contentBlock.tokenMap[token.content] = token;
            }
            callback(stringIndex, stringIndex + tokens[i].length);
            stringIndex+=tokens[i].length;
        }
    }
};

const PrismSpan = (props) => {
    const block = props.children[0].props.block;
    const token =  block.tokenMap[props.decoratedText] || {};
    const prismClass = token.type ? token.type : '';
    return (<span
        className={"token " + prismClass}
        data-offset-key={props.offsetKey}
    >
            {props.children}
          </span>);
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
    {
        strategy: prismStrategy,
        component: PrismSpan,
    }
]);

export default Decorators;