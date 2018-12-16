import {ImagesReducer, ImagesReducerInitialState} from './ImagesReducer';

export const SAMPLE_VALID_GET_IMAGES_RESPONSE = `<?xml version="1.0" encoding="UTF-8"?> <ListBucketResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Name>devtales.bucket.net</Name><Prefix>blog-content</Prefix><KeyCount>5</KeyCount><MaxKeys>1000</MaxKeys><IsTruncated>false</IsTruncated><Contents><Key>blog-content/</Key><LastModified>2018-12-13T23:34:03.000Z</LastModified><ETag>&quot;d41d8cd98f00b204e9800998ecf8427e&quot;</ETag><Size>0</Size><StorageClass>STANDARD</StorageClass></Contents><Contents><Key>blog-content/building-blocks.png</Key><LastModified>2018-12-14T00:03:09.000Z</LastModified><ETag>&quot;ea1e7a71f9ddd09eb4d65c5f59832600&quot;</ETag><Size>183285</Size><StorageClass>STANDARD</StorageClass></Contents><Contents><Key>blog-content/help-me-to-help-you.gif</Key><LastModified>2018-12-13T23:35:49.000Z</LastModified><ETag>&quot;b8d801cbaef304c468243f1d2f2e9b9f&quot;</ETag><Size>2737103</Size><StorageClass>STANDARD</StorageClass></Contents><Contents><Key>blog-content/unfuck-it.gif</Key><LastModified>2018-12-13T23:38:55.000Z</LastModified><ETag>&quot;8bee06167048f1b3a9ec4d9745879097-2&quot;</ETag><Size>9989842</Size><StorageClass>STANDARD</StorageClass></Contents><Contents><Key>blog-content/with-great-power.gif</Key><LastModified>2018-12-13T23:41:08.000Z</LastModified><ETag>&quot;4c3b395bb7e3b40b780ac97f287b6ab3&quot;</ETag><Size>795499</Size><StorageClass>STANDARD</StorageClass></Contents></ListBucketResult>`;

describe('The images reducer has initial state', () => {
    let reducer;
    let state;

    beforeEach(() => {
        state = ImagesReducerInitialState;
        reducer = ImagesReducer;
    });

    it('when I dispatch action TOGGLE_MENU and then state will have property showMenu equal to true', () => {
        expect(reducer(state, {type: 'TOGGLE_MENU'})).toEqual({...ImagesReducerInitialState, showMenu: true});
    });

    it('when I dispatch action GET_IMAGES_SUCCESS with some images then they will be added to state', () => {
        const newState = reducer(state, {
            type: 'GET_IMAGES_SUCCESS',
            response: SAMPLE_VALID_GET_IMAGES_RESPONSE
        });

        expect(newState).toEqual({
            ...ImagesReducerInitialState, images: [
                "https://devtales.net/blog-content/building-blocks.png",
                "https://devtales.net/blog-content/help-me-to-help-you.gif",
                "https://devtales.net/blog-content/unfuck-it.gif",
                "https://devtales.net/blog-content/with-great-power.gif"
            ]
        });
    });

    it('when I dispatch action GET_IMAGES_SUCCESS with no images then images array will be empty', () => {
        const newState = reducer(state, {
            type: 'GET_IMAGES_SUCCESS',
            response: ""
        });

        expect(newState).toEqual({...ImagesReducerInitialState, images: []});
    });
});

describe('The images reducer has state indicating that the menu is showing', () => {
    let reducer;
    let state;

    beforeEach(() => {
        state = {...ImagesReducerInitialState, showMenu: true};
        reducer = ImagesReducer;
    });

    it('when I dispatch action TOGGLE_MENU and then state will have property showMenu equal to false', () => {
        expect(reducer(state, {type: 'TOGGLE_MENU'})).toEqual({...ImagesReducerInitialState, showMenu: false});
    });
});

describe('The images reducer has state indicating that there are already images loaded', () => {
    let reducer;
    let state;

    beforeEach(() => {
        state = {
            ...ImagesReducerInitialState, images: [
                {image: '/blog-content/someImage.jpg', thumb: '/blog-content/thumb-someImage.jpg'},
                {image: '/blog-content/someImage2.jpg', thumb: '/blog-content/thumb-someImage2.jpg'},
                {image: '/blog-content/someImage3.jpg', thumb: '/blog-content/thumb-someImage3.jpg'}
            ]
        };
        reducer = ImagesReducer;
    });

    it('when I dispatch action GET_IMAGES_SUCCESS and then state will the correct images set', () => {
        expect(reducer(state, {type: 'GET_IMAGES_SUCCESS', response: SAMPLE_VALID_GET_IMAGES_RESPONSE}))
            .toEqual({
                ...ImagesReducerInitialState, images: [
                    "https://devtales.net/blog-content/building-blocks.png",
                    "https://devtales.net/blog-content/help-me-to-help-you.gif",
                    "https://devtales.net/blog-content/unfuck-it.gif",
                    "https://devtales.net/blog-content/with-great-power.gif"
                ]
            });
    });
});
