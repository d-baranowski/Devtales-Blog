import '../../../Test/setup';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import StyleButton from './StyleButton';
import { shallow, mount, render } from 'enzyme';

const spyFunction = (calls) => function() {
    calls.push(arguments);
};

describe('The Image Upload Menu gets toggle menu callback and the menu is false', () => {
    const onToggleCalls = [];
    const clickSpy = spyFunction(onToggleCalls);


    const wrapper = mount(<StyleButton
        onToggle ={clickSpy}
        style = "Some style or block type"
        label = "The visible label"
        active ={false}
    />);

    it('It should render', () => {
        expect(wrapper.exists()).toEqual(true);
    });

    it('It should have class styleButton', () => {
        expect(wrapper.find('.styleButton').length).toEqual(1);
    });

    it('It should not have class active', () => {
        expect(wrapper.find('.active').length).toEqual(0);
    });

    it('It should populate the spy with the style once clicked', () => {
        wrapper.find('.styleButton').simulate('click');
        expect(onToggleCalls.length).toEqual(1);
        expect(onToggleCalls[0][0]).toEqual('Some style or block type');
    });

    afterAll(()=>{
        wrapper.unmount();
    });
});