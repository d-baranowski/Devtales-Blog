import "../Test/setup"
import React from "react";
import ReactTestUtils from 'react-dom/test-utils';
import {AboutMeComponent} from "./AboutMeComponent"
import { shallow, mount, render } from 'enzyme';

describe("About me component with jsdom is rendered", () => {
    const wrapper = mount(<AboutMeComponent />);

    it("Should have an About Me heading", () => {
        expect(wrapper.find("h1").contains(<h1>About Me</h1>)).toEqual(true);
    });

    afterAll(()=>{
        wrapper.unmount();
    });
});