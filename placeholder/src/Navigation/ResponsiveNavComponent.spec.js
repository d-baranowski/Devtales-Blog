import '../Test/setup';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import ResponsiveNavComponent from './ResponsiveNavComponent';
import { mount } from 'enzyme';

describe('The ResponsiveNavComponent gets isOpen false', () => {
    const wrapper = mount(<ResponsiveNavComponent isOpen={false} />);

    it('It should render', () => {
        expect(wrapper.exists()).toEqual(true);
    });

    it('It should not have open class', () => {
        expect(wrapper.find('.open').length).toEqual(0);
    });

    afterAll(()=>{
        wrapper.unmount();
    });
});

describe('The ResponsiveNavComponent gets isOpen true', () => {
    const wrapper = mount(<ResponsiveNavComponent isOpen={true} />);

    it('It should render', () => {
        expect(wrapper.exists()).toEqual(true);
    });

    it('It should not have open class', () => {
        expect(wrapper.find('.open').length).toEqual(1);
    });

    afterAll(()=>{
        wrapper.unmount();
    });
});