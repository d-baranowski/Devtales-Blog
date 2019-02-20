export const LoginCardToggle = {
    type: 'LOGIN_CARD_TOGGLE',
    reduce: (state, action) => {
        return {...state, showLoginCard: action.visible};
    },
    match: (action) => LoginCardToggle.type === action.type,
    create: (visible) => ({
        type: LoginCardToggle.type,
        visible
    })
};