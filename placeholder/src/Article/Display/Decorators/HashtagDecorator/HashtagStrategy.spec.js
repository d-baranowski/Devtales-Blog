import HashtagStrategy from './HashtagStrategy';

const callbackArgumentSpy = addTo => (start, end) => {
    addTo.push({start, end});
};

describe('HashtabStrategy gets a content block of type that is code-block and contains a word which begins with hashtag', () => {
    const block = {
        getType: () => {
            return 'code-block';
        },
        getText: () => {
            return 'This is a sample post and it will talk about #java';
        }
    };
    const resultArgs = [];
    const callback = callbackArgumentSpy(resultArgs);


    HashtagStrategy(block, callback);

    it('Callback should be called 0 times.', () => {
        expect(resultArgs.length).toBe(0);
    });
});

describe('HashtabStrategy gets a content block of type that isn\'t code-block and contains a word which begins with hashtag', () => {
    const block = {
        getType: () => {
            return 'some-block';
        },
        getText: () => {
            return 'This is a sample post and it will talk about #java';
        }
    };
    const resultArgs = [];
    const callback = callbackArgumentSpy(resultArgs);


    HashtagStrategy(block, callback);

    it('Callback should be called once.', () => {
        expect(resultArgs.length).toBe(1);
    });

    it('Callback should contain start equal to position of hashtag in the block text', () => {
        expect(resultArgs[0].start).toBe(45);
    });

    it('Callback should contain end equal to position of last letter of work prepended with hashtag in the block text', () => {
        expect(resultArgs[0].end).toBe(50);
    });
});


describe('HashtabStrategy gets a content block of type that isn\'t code-block and contains multiple words which begins with hashtag', () => {
    const block = {
        getType: () => {
            return 'some-block';
        },
        getText: () => {
            return 'This is a sample post and it will talk about #java and #javascript not to mention #testing';
        }
    };
    const resultArgs = [];
    const callback = callbackArgumentSpy(resultArgs);


    HashtagStrategy(block, callback);

    it('Callback should be called three times.', () => {
        expect(resultArgs.length).toBe(3);
    });
});