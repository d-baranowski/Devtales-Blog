// @flow
import type {Reducer} from 'redux';
import {NotificationHide} from './Actions/NotificationHide';

export const MessageReducerInitialState: MessageReducerType = {messages: {}, latestId: 0};
export const MessageReducer : Reducer<MessageReducerType, any> = (state = {...MessageReducerInitialState}, action) => {
    const newState = {...state};
    if (typeof action.type !== 'string') {
        return {...newState};
    }
    if (NotificationHide.match(action)) {
        return NotificationHide.reduce(newState, action);
    }
    if (action.type.includes('_ERROR')) {
        return pushMessageToState(newState, action, 'ERROR');
    } else if (action.type.includes('_MESSAGE')) {
        return pushMessageToState(newState, action, 'MESSAGE');
    } else if (action.type.includes('_SUCCESS')) {
        return pushMessageToState(newState, action, 'SUCCESS');
    }
    return {...newState};
};

const pushMessageToState = (state: MessageReducerType, action: any, messageType: string) => {
    if (!action.message) {
        return {...state};
    }
    const latestId = state.latestId + 1;
    return {
        ...state,
        messages: {...state.messages, [latestId]: {id: latestId, msg: action.message, status: messageType}},
        latestId
    };
};

export type MessageType = {
    id: number,
    msg: string,
    status: string
}

export type MessagesType = { [id: string]: MessageType };

export type MessageReducerType = {
    messages: MessagesType,
    latestId: number
}