import "../../Test/setup"
import React from "react";
import ReactTestUtils from 'react-dom/test-utils';
import {ConfiguredEditor} from "./ConfiguredEditor"
import { shallow, mount, render } from 'enzyme';
import {GenerateConfiguredEditorState} from "./GenerateConfiguredEditorState";

describe("The ConfiguredEditor gets expected parameters ", () => {
    const wrapper = shallow(<ConfiguredEditor />);

    it("It should render", () => {
        expect(wrapper.exists()).toEqual(true);
    });

    it("It should contain blockRenderMap", () => {
        expect(wrapper.get(0).props.blockRenderMap.size).toEqual(12);
    });

    it("It should contain blockRenderFn", () => {
        expect(wrapper.get(0).props.blockStyleFn).toBeTruthy();
    });

    it("It should contain editorKey to avoid problems when server side rendering", () => {
        expect(wrapper.get(0).props.blockStyleFn).toBeTruthy();
    });
});

describe("The ConfiguredEditor gets expected parameters ", () => {
    const wrapper = mount(<ConfiguredEditor editorState= {GenerateConfiguredEditorState()} />);

    it("It should render", () => {
        expect(wrapper.exists()).toEqual(true);
    });

    afterAll(()=>{
        wrapper.unmount();
    });
});

