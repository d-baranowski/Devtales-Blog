import '../../Test/setup';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import Media from './Media';
import { mount } from 'enzyme';

describe('The Media gets entity of type audio', () => {
    const block = {
        getEntityAt: () => ({})
    };
    const contentState = {
        getEntity: () => {
            return {
                getData: () => ({
                    src: 'Some src'
                }),
                getType: () => 'audio'
            };
        }
    };

    const wrapper = mount(<Media block={block} contentState={contentState} />);

    it('It should render', () => {
        expect(wrapper.exists()).toEqual(true);
    });

    it('It should be an audio element', () => {
        expect(wrapper.find('audio').exists()).toEqual(true);
    });

    afterAll(()=>{
        wrapper.unmount();
    });
});

describe('The Media gets entity of type image', () => {
    const block = {
        getEntityAt: () => ({})
    };
    const contentState = {
        getEntity: () => {
            return {
                getData: () => ({
                    src: 'Some src'
                }),
                getType: () => 'image'
            };
        }
    };

    const wrapper = mount(<Media block={block} contentState={contentState} />);

    it('It should render', () => {
        expect(wrapper.exists()).toEqual(true);
    });

    it('It should be an image element', () => {
        expect(wrapper.find('img').exists()).toEqual(true);
    });

    afterAll(()=>{
        wrapper.unmount();
    });
});

describe('The Media gets entity of type video', () => {
    const block = {
        getEntityAt: () => ({})
    };
    const contentState = {
        getEntity: () => {
            return {
                getData: () => ({
                    src: 'Some src'
                }),
                getType: () => 'video'
            };
        }
    };

    const wrapper = mount(<Media block={block} contentState={contentState} />);

    it('It should render', () => {
        expect(wrapper.exists()).toEqual(true);
    });

    it('It should be an video element', () => {
        expect(wrapper.find('video').exists()).toEqual(true);
    });

    afterAll(()=>{
        wrapper.unmount();
    });
});

