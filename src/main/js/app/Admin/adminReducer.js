const adminReducer = (state = [], action) => {
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

export default adminReducer