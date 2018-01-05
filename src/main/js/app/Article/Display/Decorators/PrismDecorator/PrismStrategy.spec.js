import PrismStrategy from "./PrismStrategy"

const callbackArgumentSpy = addTo => (start, end) => {
    addTo.push({start, end})
};


describe("PrimeStrategy gets a content block of type that is code-block and contains a word which should ", () => {
    const block = {
        getType: () => {
            return "code-block";
        },
        getText: () => {
            return "// javascript //\n function helloWorld(userName) { return 'Hello' + userName }";
        }
    };
    const resultArgs = [];
    const callback = callbackArgumentSpy(resultArgs);


    PrismStrategy(block, callback);

    it("Callback should be called 18 times.", () => {
        expect(resultArgs.length).toBe(18);
    });

    it("Block should contain a map of tokens which were identified by prism to be highlighted as javascript", () => {
        expect(Object.keys(block.tokenMap).length).toBe(10);
    });

    it("Block should contain a map of tokens which were identified by prism to be highlighted as javascript", () => {
        expect(block.tokenMap['helloWorld'].type).toEqual('function');
    });
});