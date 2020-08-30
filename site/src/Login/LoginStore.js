// javascript //

import createStore from '../StateManager/createStore';

const store = createStore({
    showLoginCard: false,
    userToken: () => {},
    toggleLoginCard: () => {
        store.showLoginCard = !store.showLoginCard;
    }
});

export default store;
