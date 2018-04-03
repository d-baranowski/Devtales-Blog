import '../Test/setup';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import {If} from './If';
import { shallow, mount, render } from 'enzyme';

describe('If the if gets a false', () => {
    const wrapper = mount(<If
        _={false}
    ><div id="some-child">Hello World</div></If>);

    it('It should\'nt render', () => {
        expect(wrapper.find('#some-child').length).toEqual(0);
    });

    afterAll(()=>{
        wrapper.unmount();
    });
});

describe('If the if gets a true', () => {
    const wrapper = mount(<If
        _={true}
    ><div id="some-child">Hello World</div></If>);

    it('It should render', () => {
        expect(wrapper.find('#some-child').length).toEqual(1);
    });

    afterAll(()=>{
        wrapper.unmount();
    });
});