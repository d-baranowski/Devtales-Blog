import {PageNavigationReducer, PageNavigationReducerInitialState} from './PageNavigationReducer';


describe('The images reducer has initial state', () => {
    let reducer;
    let state;

    beforeEach(() => {
        state = PageNavigationReducerInitialState;
        reducer = PageNavigationReducer;
    });

    it('when I dispatch action TOGGLE_MENU and then state will have property showMenu equal to true', () => {
        expect(reducer(state, {type: 'TOGGLE_NAVIGATION_MENU'})).toEqual({...PageNavigationReducerInitialState, navigationMenuIsOpen: true});
    });
});

describe('The images reducer has state indicating that the menu is showing', () => {
    let reducer;
    let state;

    beforeEach(() => {
        state = {...PageNavigationReducerInitialState, navigationMenuIsOpen: true};
        reducer = PageNavigationReducer;
    });

    it('when I dispatch action TOGGLE_MENU and then state will have property showMenu equal to false', () => {
        expect(reducer(state, {type: 'TOGGLE_NAVIGATION_MENU'})).toEqual({...PageNavigationReducerInitialState, navigationMenuIsOpen: false});
    });
});