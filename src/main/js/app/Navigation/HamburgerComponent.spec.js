import "../Test/setup"
import React from "react";
import ReactTestUtils from 'react-dom/test-utils';
import HamburgerComponent from "./HamburgerComponent"
import { mount } from 'enzyme';

const spyFunction = (calls) => function() {
    calls.push(arguments)
};

describe("The HamburgerComponent gets isOpen false", () => {
    const toggleMenuCalls = [];
    const toggleMenuSpy = spyFunction(toggleMenuCalls);

    const wrapper = mount(<HamburgerComponent toggleMenu={toggleMenuSpy} isOpen={false} />);

    it("It should render", () => {
        expect(wrapper.exists()).toEqual(true);
    });

    it("It should not have open class", () => {
        expect(wrapper.find(".open").length).toEqual(0);
    });

    it("It should call toggle menu when clicked", () => {
        expect(toggleMenuCalls.length).toEqual(0);
        wrapper.find("#nav-icon").simulate("click");
        expect(toggleMenuCalls.length).toEqual(1);
    });

    afterAll(()=>{
        wrapper.unmount();
    });
});

describe("The HamburgerComponent gets isOpen true", () => {
    const wrapper = mount(<HamburgerComponent isOpen={true} />);

    it("It should render", () => {
        expect(wrapper.exists()).toEqual(true);
    });

    it("It should not have open class", () => {
        expect(wrapper.find(".open").length).toEqual(1);
    });

    afterAll(()=>{
        wrapper.unmount();
    });
});