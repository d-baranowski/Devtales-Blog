// @flow
import type {Reducer} from "redux";

const prependWithAddress = (x) => {
  return "/blog-content/" + x;
};

const defaultState : ImagesReducerType = {showMenu: false, images: []};
export const ImagesReducer : Reducer<ImagesReducerType, any> = (state = defaultState, action) => {
    switch (action.type) {
        case 'GET_IMAGES_SUCCESS':
            if (action.data.text) {
                return {
                    ...state,
                    images: JSON.parse(action.data.text).map((x) => ({
                        ['image']: prependWithAddress(x),
                        ['thumb']: prependWithAddress('thumb-' + x)
                    }))
                }
            } else {
                return {
                    ...state,
                    error: "Failed to get articles."
                }
            }
        case 'UPLOAD_IMAGE_SUCCESS':
            if (action.data.text) {
                return {
                    ...state,
                    images: [...state.images, {
                        image: prependWithAddress(action.data.text),
                        thumb: prependWithAddress('thumb-' + action.data.text) }]
                }
            } else {
                return {
                    ...state,
                    error: "Failed to get uploaded image."
                }
            }
        case 'TOGGLE_MENU':
            return {
                ...state,
                showMenu: !state.showMenu
            };
        default:
            return state;
    }
};

type ImageStateType = {
    image: string,
    thumb: string
}

export type ImagesReducerType = {
    showMenu: boolean,
    images: ImageStateType[]
}