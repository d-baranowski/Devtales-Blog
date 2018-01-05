import "../../../Test/setup"
import React from "react";
import ReactTestUtils from 'react-dom/test-utils';
import BlockStyleControls from "./BlockStyleControls"
import { shallow, mount, render } from 'enzyme';

const getFakeState = (type) => ({
    getSelection: () => ({getStartKey: () => true}),
    getCurrentContent: () => ({getBlockForKey: () => ({getType: () => type})})
});

describe("Selected state has type header-one", () => {
    const fakeEditorState = getFakeState("header-one");
    const wrapper = mount(<BlockStyleControls editorState={fakeEditorState} />);

    it("It should render", () => {
        expect(wrapper.exists()).toEqual(true);
    });

    it("It should have one active style button", () => {
        expect(wrapper.find(".styleButton.active").length).toEqual(1);
    });

    it("The active style button should have text equal to H1", () => {
        expect(wrapper.find(".styleButton.active").text()).toEqual("H1");
    });

    afterAll(()=>{
        wrapper.unmount();
    });
});

describe("Selected state has type header-six", () => {
    const fakeEditorState = getFakeState("header-six");
    const wrapper = mount(<BlockStyleControls editorState={fakeEditorState} />);

    it("It should render", () => {
        expect(wrapper.exists()).toEqual(true);
    });

    it("It should have one active style button", () => {
        expect(wrapper.find(".styleButton.active").length).toEqual(1);
    });

    it("The active style button should have text equal to H1", () => {
        expect(wrapper.find(".styleButton.active").text()).toEqual("H6");
    });

    afterAll(()=>{
        wrapper.unmount();
    });
});

describe("Selected state has type unknown", () => {
    const fakeEditorState = getFakeState("unknown");
    const wrapper = mount(<BlockStyleControls editorState={fakeEditorState} />);

    it("It should render", () => {
        expect(wrapper.exists()).toEqual(true);
    });

    it("It should have one active style button", () => {
        expect(wrapper.find(".styleButton.active").length).toEqual(0);
    });
    
    afterAll(()=>{
        wrapper.unmount();
    });
});