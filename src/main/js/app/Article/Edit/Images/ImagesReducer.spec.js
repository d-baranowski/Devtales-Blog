import {ImagesReducer, ImagesReducerInitialState} from "./ImagesReducer";


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
            data: {body: [
                'someImage.jpg',
                'someImage2.jpg',
                'someImage3.jpg'
            ]}});

        expect(newState).toEqual({...ImagesReducerInitialState, images: [
            {image: '/blog-content/someImage.jpg', thumb: '/blog-content/thumb-someImage.jpg'},
            {image: '/blog-content/someImage2.jpg', thumb: '/blog-content/thumb-someImage2.jpg'},
            {image: '/blog-content/someImage3.jpg', thumb: '/blog-content/thumb-someImage3.jpg'}
        ]});
    });

    it('when I dispatch action GET_IMAGES_SUCCESS with no images then an error will be added to state', () => {
        const newState = reducer(state, {
            type: 'GET_IMAGES_SUCCESS',
            data: {}});

        expect(newState).toEqual({...ImagesReducerInitialState, error: "Failed to get images."});
    })
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
    })
});

describe('The images reducer has state indicating that there are already images loaded', () => {
    let reducer;
    let state;

    beforeEach(() => {
        state = {...ImagesReducerInitialState, images: [
            {image: '/blog-content/someImage.jpg', thumb: '/blog-content/thumb-someImage.jpg'},
            {image: '/blog-content/someImage2.jpg', thumb: '/blog-content/thumb-someImage2.jpg'},
            {image: '/blog-content/someImage3.jpg', thumb: '/blog-content/thumb-someImage3.jpg'}
        ]};
        reducer = ImagesReducer;
    });

    it('when I dispatch action GET_IMAGES_SUCCESS and then state will the correct images set', () => {
        expect(reducer(state, {type: 'GET_IMAGES_SUCCESS', data: {body: [
            'someImage4.jpg',
            'someImage5.jpg',
            'someImage6.jpg'
        ]}}))
            .toEqual({...ImagesReducerInitialState, images: [
                {image: '/blog-content/someImage4.jpg', thumb: '/blog-content/thumb-someImage4.jpg'},
                {image: '/blog-content/someImage5.jpg', thumb: '/blog-content/thumb-someImage5.jpg'},
                {image: '/blog-content/someImage6.jpg', thumb: '/blog-content/thumb-someImage6.jpg'}
            ]});
    });

    it('when I dispatch action UPLOAD_IMAGE_SUCCESS and then state will have the new image', () => {
        expect(reducer(state, {type: 'UPLOAD_IMAGE_SUCCESS', data: {text: 'someImage4.jpg'}}))
            .toEqual({...ImagesReducerInitialState, images: [
                {image: '/blog-content/someImage.jpg', thumb: '/blog-content/thumb-someImage.jpg'},
                {image: '/blog-content/someImage2.jpg', thumb: '/blog-content/thumb-someImage2.jpg'},
                {image: '/blog-content/someImage3.jpg', thumb: '/blog-content/thumb-someImage3.jpg'},
                {image: '/blog-content/someImage4.jpg', thumb: '/blog-content/thumb-someImage4.jpg'}
            ]});
    })
});
