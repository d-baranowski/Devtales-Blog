// @flow
import type {Reducer} from "redux"

export const AdminReducerInitialState = {isAdmin: false};

export const AdminReducer : Reducer<AdminReducerType, any> = (state = AdminReducerInitialState, action) => {
    switch (action.type) {
        case 'ADMIN_BECOME':
            return {
                ...state,
                isAdmin: true
            };
        case 'ADMIN_STOP':
            return {
                ...state,
                isAdmin: false
            };
        default:
            return state;
    }
};

export type AdminReducerType = {
    isAdmin: boolean
};