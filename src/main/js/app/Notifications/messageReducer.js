// @flow
import type {Reducer} from "redux";

export const MessageReducer : Reducer<MessageReducerType, any> = (state = {messages: []}, action) => {
    if (typeof action.type !== "string") {
        return state
    }
    if (action.type.includes('_ERROR')) {
        state.messages.push({msg: action.data.message, status: 'ERROR'});
        return {
            ...state,
        };
    } else if (action.type.includes('_MESSAGE')) {
        state.messages.push({msg: action.data.message, status: 'MESSAGE'});
        return {
            ...state,
        };
    } else if (action.type.includes('_SUCCESS')) {
        state.messages.push({msg: action.data.message, status: 'SUCCESS'});
        return {
            ...state,
        };
    } else {
        return state;
    }
};

type MessageType = {
    msg: string,
    status: string
}

export type MessageReducerType = {
    messages: MessageType[]
}