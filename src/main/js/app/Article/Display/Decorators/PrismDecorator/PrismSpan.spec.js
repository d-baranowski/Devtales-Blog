import "../../../../Test/setup"
import React from "react";
import ReactTestUtils from 'react-dom/test-utils';
import PrismSpan from "./PrismSpan"
import { shallow, mount, render } from 'enzyme';

describe("The prism span gets children with populated block", () => {
    const block = {tokenMap: {
        helloWorld: {type: "function"}
    }};

    const wrapper = shallow(<PrismSpan offsetKey="1" decoratedText="helloWorld" children={[<span block={block}>Hello World</span>]} />);

    it("Should have class token function", () => {
        expect(wrapper.find(".token.function").length).toEqual(1);
    });

    it("Should have property spellcheck equal to false", () => {
        expect(wrapper.find(".token.function").get(0).props.spellCheck).toEqual(false);
    });
});

