// javascript //
import uuid from './uuid';

const createStore = (storeProps) => {
    const subscribers = {};
    const notifySubscribers = (newValue) => {
        Object.values(subscribers).forEach(callback => callback(newValue))
    };

    const handler = {
        set(target, prop, value) {
            if ((prop === 'subscribe')) {
                return true
            }


            target[prop] = value;
            notifySubscribers(target);
            return true;
        }
    };


    return new Proxy({
        subscribe: (callback) => {
            const id = uuid();
            subscribers[id] = callback;
            return () => delete subscribers[id];
        },
        ...storeProps
    }, handler);
};

export default createStore;