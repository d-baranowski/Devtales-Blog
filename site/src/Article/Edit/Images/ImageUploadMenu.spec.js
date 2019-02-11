import '../../../Test/setup';
import React from 'react';
import ImageUploadMenu from './ImageUploadMenu';
import { shallow, mount, render } from 'enzyme';

const spyFunction = (calls) => function() {
    calls.push(arguments);
};

describe('The Image Upload Menu gets toggle menu callback and the menu is false', () => {
    const toggleMenuCalls = [];
    const toggleMenuSpy = spyFunction(toggleMenuCalls);

    const wrapper = mount(<ImageUploadMenu
        getImages={() => {}}
        showMenu={false}
        toggleMenu={toggleMenuSpy}
    />);

    it('It should render', () => {
        expect(wrapper.exists()).toEqual(true);
    });

    it('It should do the right callback when I click the Display Menu button', () => {
        wrapper.find('button').simulate('click');
        expect(toggleMenuCalls.length).toEqual(1);
    });

    it('The overlay-menu should be hidden', () => {
        expect(wrapper.find('.overlay-menu').exists()).toEqual(false);
    });

    afterAll(()=>{
        wrapper.unmount();
    });
});

describe('The Image Upload Menu gets toggle menu callback and the menu is shown', () => {
    const uploadImageCalls = [];
    const uploadImageSpy = spyFunction(uploadImageCalls);

    const wrapper = mount(<ImageUploadMenu
        getImages={() => {}}
        showMenu={true}
        uploadImage={uploadImageSpy}
    />);

    it('It should render', () => {
        expect(wrapper.exists()).toEqual(true);
    });

    it('The overlay-menu should be shown', () => {
        expect(wrapper.find('.overlay-menu').exists()).toEqual(true);
    });

    afterAll(()=>{
        wrapper.unmount();
    });
});

describe('The Image Upload Menu gets addImage menu callback and the menu is shown and it contains some images', () => {
    const addImageCalls = [];
    const addImageSpy = spyFunction(addImageCalls);
    const toggleMenuCalls = [];
    const toggleMenuSpy = spyFunction(toggleMenuCalls);
    const images = [
        'image 1 url',
        'image 2 url',
        'image 3 url',
        'image 4 url'
    ];

    const wrapper = mount(<ImageUploadMenu
        getImages={() => {}}
        showMenu={true}
        addImage={addImageSpy}
        toggleMenu={toggleMenuSpy}
        images={images}
    />);

    it('It should render', () => {
        expect(wrapper.exists()).toEqual(true);
    });

    it('There should be 4 visible image elements', () => {
        expect(wrapper.find('img').length).toEqual(4);
    });

    it('If I click the image the correct callback should be called', () => {
        wrapper.find('img').at(2).simulate('click');
        expect(addImageCalls.length).toEqual(1);
        expect(addImageCalls[0][0]).toEqual('image 3 url');
        expect(toggleMenuCalls.length).toEqual(1);
    });

    afterAll(()=>{
        wrapper.unmount();
    });
});
