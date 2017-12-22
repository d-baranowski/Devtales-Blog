const messageReducer = (state = {messages: new Array()}, action) => {
    if (typeof action.type !== "string") {
        return state
    }
    if (action.type.includes('_ERROR')) {
        state.messages.push({msg: action.data.message, status: 'ERROR'})
        return {
            ...state,
        };
    } else if (action.type.includes('_MESSAGE')) {
        state.messages.push({msg: action.data.message, status: 'MESSAGE'})
        return {
            ...state,
        };
    } else if (action.type.includes('_SUCCESS')) {
        state.messages.push({msg: action.data.message, status: 'SUCCESS'})
        return {
            ...state,
        };
    } else {
        return state;
    }
};

export default messageReducer
