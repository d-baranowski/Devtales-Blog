const HASHTAG_REGEX = /#[\w\u0590-\u05ff]+/g;
const HashtagStrategy = (contentBlock, callback/*, contentState*/) => {
    if (contentBlock.getType() === 'code-block') {
        return;
    }

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

export default HashtagStrategy;