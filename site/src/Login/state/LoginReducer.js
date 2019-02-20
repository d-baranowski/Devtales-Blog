import {Actions} from './Actions';

export const LoginReducerInitialState = {
    showLoginCard: false
};

export const LoginReducer = (state = LoginReducerInitialState, action) => {
    for (let possibleAction of Actions) {
        if (possibleAction.match(action)) {
            return possibleAction.reduce(state, action);
        }
    }
    return state;
};

