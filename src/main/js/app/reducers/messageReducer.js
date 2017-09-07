const messageReducer = (state = {messages: []}, action) => {
    if (typeof action.type !== "string") {
        return state
    }
    if (action.type.includes('_ERROR')) {
        return {
            ...state,
            messages: state.messages.push({msg: action.data.message, status: 'ERROR'})
        };
    } else if (action.type.includes('_MESSAGE')) {
        return {
            ...state,
            messages: state.messages.push({msg: action.data.message, status: 'MESSAGE'})
        };
    } else if (action.type.includes('_SUCCESS')) {
        return {
            ...state,
            messages: state.messages.push({msg: action.data.message, status: 'SUCCESS'})
        };
    } else {
        return state;
    }
};

export default messageReducer
