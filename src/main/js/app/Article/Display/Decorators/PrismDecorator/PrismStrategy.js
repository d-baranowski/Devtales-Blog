import Prism from 'prismjs/components/prism-core';

import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-sass';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-sql';

const supportedLanguages = [
    'clike', 'javascript', 'java', 'sass', 'css', 'bash', 'json', 'sql'
];

const detectLanguage = (text) => {
    supportedLanguages.forEach((lang) => {
        if (text.includes('// ' + lang + ' //')) {
            return Prism.languages[lang];
        }
    });

    return Prism.languages.clike;
};

const PrismStrategy = (contentBlock, callback/*, contentState*/) => {
    if (contentBlock.getType() !== 'code-block') {
        return;
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