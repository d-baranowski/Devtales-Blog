import Prism from 'prismjs/components/prism-core';
//noinspection ES6UnusedImports
import clike from 'prismjs/components/prism-clike';
//noinspection ES6UnusedImports
import js from 'prismjs/components/prism-javascript';

let activeLanguage = Prism.languages.clike;

const detectLanguage = (text) => {
    if (text.includes('// javascript //')) {
        activeLanguage = Prism.languages.javascript;
    }
};

const PrismStrategy = (contentBlock, callback, contentState) => {
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

export default PrismStrategy;