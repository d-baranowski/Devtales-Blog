import "../../../Test/setup"
import React from "react";
import ReactTestUtils from 'react-dom/test-utils';
import InlineStyleControls from "./InlineStyleControls";
import {OrderedSet} from "immutable";
import { shallow, mount, render } from 'enzyme';

const getFakeState = (type) => ({
    getCurrentInlineStyle: () => type
});

describe("Current inline style is BOLD ITALIC and UNDERLINE", () => {
    const fakeEditorState = getFakeState(OrderedSet.of("BOLD", "ITALIC", "UNDERLINE"));
    const wrapper = mount(<InlineStyleControls editorState={fakeEditorState} />);

    it("It should render", () => {
        expect(wrapper.exists()).toEqual(true);
    });

    it("It should have three active style button", () => {
        expect(wrapper.find(".styleButton.active").length).toEqual(3);
    });

    it("It should have three active style button for Bold", () => {
        expect(wrapper.find(".styleButton.active").at(0).text()).toEqual("Bold");
    });

    it("It should have three active style button for Italic", () => {
        expect(wrapper.find(".styleButton.active").at(1).text()).toEqual("Italic");
    });

    it("It should have three active style button for Underline", () => {
        expect(wrapper.find(".styleButton.active").at(2).text()).toEqual("Underline");
    });

    afterAll(()=>{
        wrapper.unmount();
    });
});