import {AdminReducer, AdminReducerInitialState} from "./adminReducer";


describe('The admin reducer has initial state', () => {
    let reducer;
    let state;

    beforeEach(() => {
        state = AdminReducerInitialState;
        reducer = AdminReducer;
    });

    it('it has a property isAdmin with value false', () => {
        expect(reducer(state, {type: 'NOT IMPORTANT'})).toEqual({isAdmin: false});
    });

    it('when I dispatch action ADMIN_BECOME and admin is false it becomes true', () => {
        expect(reducer(state, {type: 'ADMIN_BECOME'})).toEqual({isAdmin: true});
    })
});

describe('The admin reducer has state indicating that the user is admin', () => {
    let reducer;
    let state;

    beforeEach(() => {
        state = {isAdmin: true};
        reducer = AdminReducer;
    });

    it('it has a property isAdmin with value false', () => {
        expect(reducer(state, {type: 'ADMIN_STOP'})).toEqual({isAdmin: false});
    });
});
