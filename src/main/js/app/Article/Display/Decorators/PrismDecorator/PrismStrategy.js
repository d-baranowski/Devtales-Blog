import Prism from 'prismjs/components/prism-core';
//noinspection ES6UnusedImports
import clike from 'prismjs/components/prism-clike';
//noinspection ES6UnusedImports
import js from 'prismjs/components/prism-javascript';
//noinspection ES6UnusedImports
import java from 'prismjs/components/prism-java';
//noinspection ES6UnusedImports
import css from 'prismjs/components/prism-css';
//noinspection ES6UnusedImports
import sass from 'prismjs/components/prism-sass';
//noinspection ES6UnusedImports
import bash from 'prismjs/components/prism-bash';
//noinspection ES6UnusedImports
import json from 'prismjs/components/prism-json';
//noinspection ES6UnusedImports
import sql from 'prismjs/components/prism-sql';

const supportedLanguages = [
    "clike", "javascript", "java", "sass", "css", "bash", "json", "sql"
];

const detectLanguage = (text) => {
    supportedLanguages.forEach((lang) => {
        if (text.includes("// " + lang + " //")) {
            return Prism.languages[lang];
        }
    });

    return Prism.languages.clike
};

const PrismStrategy = (contentBlock, callback, contentState) => {
    if (contentBlock.getType() !== "code-block") {
        return
    }

    const text = contentBlock.getText();
    const tokens = Prism.tokenize(text, detectLanguage(text));
    if (tokens) {
        contentBlock.tokenMap = {};
        let stringIndex = 0;
        for (let i = 0; i < tokens.length; i++) {
            let token = tokens[i];
            if (token.content) {
                contentBlock.tokenMap[token.content] = token;
            }

            callback(stringIndex, stringIndex + token.length);
            stringIndex+=token.length;
        }
    }
};

export default PrismStrategy;