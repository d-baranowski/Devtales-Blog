// @flow
import type {Reducer} from 'redux';
import {Actions} from './Actions';

export const prependWithAddress = (x: string) => {
    return '/blog-content/' + x;
};

export const ImagesReducerInitialState : ImagesReducerType = {showMenu: false, images: []};
export const ImagesReducer: Reducer<ImagesReducerType, any> = (state = ImagesReducerInitialState, action) => {
    for (let possibleAction of Actions) {
        if (possibleAction.match(action)) {
            return possibleAction.reduce(state, action);
        }
    }

    return state;
};

export type ImageStateType = {
    image: string,
    thumb: string
}

export type Images = ImageStateType[]

export type ImagesReducerType = {
    showMenu: boolean,
    images: ImageStateType[]
}