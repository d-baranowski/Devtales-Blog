// @flow
import type {Reducer} from 'redux';
import type {Action} from '../Configuration';

export type PageNavigationReducerType = {
    navigationMenuIsOpen: boolean,
}

export const PageNavigationReducerInitialState : PageNavigationReducerType = {
    navigationMenuIsOpen: false,
};

export const PageNavigationReducer : Reducer<PageNavigationReducerType, Action> = (state = PageNavigationReducerInitialState, action) => {
    switch (action.type) {
    case 'TOGGLE_NAVIGATION_MENU':
        return {
            ...state,
            navigationMenuIsOpen: !state.navigationMenuIsOpen
        };
    default:
        return state;
    }
};