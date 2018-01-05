import "../../Test/setup"
import React from "react";
import ReactTestUtils from 'react-dom/test-utils';
import StyledCodeBlock from "./StyledCodeBlock"
import { shallow, mount, render } from 'enzyme';

describe("The StyledCodeBlock gets no params", () => {
    const wrapper = mount(<StyledCodeBlock />);

    it("It should render", () => {
        expect(wrapper.exists()).toEqual(true);
    });

    afterAll(()=>{
        wrapper.unmount();
    });
});