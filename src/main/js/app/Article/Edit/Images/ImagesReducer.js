// @flow
import type {Reducer} from "redux";

const prependWithAddress = (x) => {
  return "/blog-content/" + x;
};

type GetImagesSuccessActionType = {
    type: string,
    data: {
        body: string[]
    }
}

const GetImagesSuccess = (state: ImagesReducerType, action : GetImagesSuccessActionType) : ImagesReducerType => {
    if (action.data.body !== undefined && action.data.body.constructor === Array) {
        return {
            ...state,
            images: action.data.body.map((x) => ({
                ['image']: prependWithAddress(x),
                ['thumb']: prependWithAddress('thumb-' + x)
            }))
        }
    }
    return {
        ...state,
        error: "Failed to get images."
    }
};

type UploadImageSuccessActionType = {
    type: string,
    data: {
        text: string
    }
};

const UploadImageSuccess = (state: ImagesReducerType, action: UploadImageSuccessActionType) : ImagesReducerType => {
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
};

export const ImagesReducerInitialState : ImagesReducerType = {showMenu: false, images: []};
export const ImagesReducer : Reducer<ImagesReducerType, any> = (state = ImagesReducerInitialState, action) => {
    switch (action.type) {
        case 'GET_IMAGES_SUCCESS':
            return GetImagesSuccess(state, action);
        case 'UPLOAD_IMAGE_SUCCESS':
            return UploadImageSuccess(state, action) || state;
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

export type Images = ImageStateType[]

export type ImagesReducerType = {
    showMenu: boolean,
    images: ImageStateType[]
}