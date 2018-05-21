import '../../../Test/setup';
import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import RichEditor from './RichEditor';
import { shallow, mount, render } from 'enzyme';


describe('RichEditor will receive a fake article', () => {
    const PlaceholderComponent = () => (<div id="imageUploadMenuContainer">IMAGE UPLOAD MENU PLACEHOLDER</div>);
    const uploadMenuContainer = (props) => (<PlaceholderComponent {...props} />);

    const fakeArticle = {
        id: 1,
        title: '2 + 2 - 1 thats 3 quick mafs',
        slug: '2-2-1-thats-3-quick-mafs',
        html: '',
        summary: '',
        createdOn: 1515081939000,
        updatedOn: null,
        publishedDate: 1515081983000,
        jsonRepresentation: '{"entityMap":{},"blocks":[{"key":"81l0i","text":"2 + 2 - 1 thats 3 quick mafs","type":"header-one","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"dc5cc","text":"adsadsadsadsasdasdasdasdasd","type":"summary","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}',
        tags: []
    };
    const wrapper = mount(<RichEditor uploadMenuContainer={uploadMenuContainer} article={fakeArticle} />);

    it('It should render', () => {
        expect(wrapper.exists()).toEqual(true);
    });

    it('The resulting html should contain article text', () => {
        expect(wrapper.html()).toContain('2 + 2 - 1 thats 3 quick mafs');
        expect(wrapper.html()).toContain('adsadsadsadsasdasdasdasdasd');
    });

    afterAll(()=>{
        wrapper.unmount();
    });
});
