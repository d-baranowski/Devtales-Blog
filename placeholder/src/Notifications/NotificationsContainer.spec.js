import '../Test/setup';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import {MessageReducer, NotificationsContainer} from './index';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {beforeEachByString, SpyMiddlewareFactory} from '../Test';
import {Provider} from 'react-redux';
import {MessageReducerInitialState} from './State/messageReducer';
import {ArticleCreateError, ArticleCreateSuccess} from '../Article/State/Actions';
import {NotificationHide} from './State';

const actionsDispatched = [];
const statesInOrder = [];
const spyMiddleware = SpyMiddlewareFactory(actionsDispatched, statesInOrder);

const getStore = (state) => {
    return createStore(
        combineReducers({
            MessageReducer,
        }),
        {
            MessageReducer: state
        },
        applyMiddleware(spyMiddleware)
    );
};

const setupSteps = {
    "the store has initial state": (context) => {
        context.store = getStore(MessageReducerInitialState);
        return context;
    },
    "I mount NotificationsContainer with store provided": (context) => {
        context.wrapper = mount(
            <Provider store={context.store}>
                <NotificationsContainer />
            </Provider>
        );
        return context;
    },
    "I dispatch a success action": (context) => {
        context.store.dispatch(ArticleCreateSuccess.create({id: 1}));
        return context;
    },
    "I dispatch an error action": (context) => {
        context.store.dispatch(ArticleCreateError.create("There has been a problem", "this-is-a-slug"));
        return context;
    },
    "I dispatch an array of error actions with size equal to": (context, chunk) => {
        const size = chunk.match(/\d+/)[0];
        for (let i = 0; i < size; i++) {
            context.store.dispatch(ArticleCreateError.create("There has been a problem", "this-is-a-slug"));
        }
        return context;
    },
    "I dispatch an array of success actions with size equal to": (context, chunk) => {
        const size = chunk.match(/\d+/)[0];
        for (let i = 0; i < size; i++) {
            context.store.dispatch(ArticleCreateSuccess.create({id: 1}))
        }
        return context;
    },
    "I dispatch a hide action with id": (context, chunk) => {
        const id = chunk.match(/\d+/)[0];
        context.store.dispatch(NotificationHide.create(id));
        return context;
    }
};

describe("NotificationsContainer", () => {
    (() => {
        let context = {};
        const description =
            "Given the store has initial state " +
            "and I mount NotificationsContainer with store provided " +
            "when I dispatch an error action";
        describe(description, () => {
            beforeEach(() => {
                context = beforeEachByString({context, setupSteps, description});
                context.wrapper.update();
            });

            it("then the notification list will contain an element with an error class", () => {
                expect(context.wrapper.find('.notification-error').length).toEqual(1);
            });
        })
    })();
    (() => {
        let context = {};
        const description =
            "Given the store has initial state " +
            "and I mount NotificationsContainer with store provided " +
            "when I dispatch a success action";
        describe(description, () => {
            beforeEach(() => {
                context = beforeEachByString({context, setupSteps, description});
                context.wrapper.update();
            });

            it("then the notification list will contain an element with a success class", () => {
                expect(context.wrapper.find('.notification-success').length).toEqual(1);
            });
        })
    })();
    (() => {
        let context = {};
        const description =
            "Given the store has initial state " +
            "and I mount NotificationsContainer with store provided " +
            "when I dispatch an array of error actions with size equal to 15";
        describe(description, () => {
            beforeEach(() => {
                context = beforeEachByString({context, setupSteps, description});
                context.wrapper.update();
            });

            it("then the notification list will contain 15 elements with a error class", () => {
                expect(context.wrapper.find('.notification-error').length).toEqual(15);
            });
        })
    })();
    (() => {
        let context = {};
        const description =
            "Given the store has initial state " +
            "and I mount NotificationsContainer with store provided " +
            "when I dispatch an array of success actions with size equal to 30";
        describe(description, () => {
            beforeEach(() => {
                context = beforeEachByString({context, setupSteps, description});
                context.wrapper.update();
            });

            it("then the notification list will contain 15 elements with a success class", () => {
                expect(context.wrapper.find('.notification-success').length).toEqual(30);
            });
        })
    })();
    (() => {
        let context = {};
        const description =
            "Given the store has initial state " +
            "and I mount NotificationsContainer with store provided " +
            "when I dispatch an array of success actions with size equal to 5 " +
            "and I dispatch a hide action with id 1";
        describe(description, () => {
            beforeEach(() => {
                context = beforeEachByString({context, setupSteps, description});
                context.wrapper.update();
            });

            it('then the notification list will contain 4 elements with a success class after transitions complete',
                (done) => {
                setTimeout(() => {
                    context.wrapper.update();
                    expect(context.wrapper.find('.notification-success').length).toEqual(4);
                    done();
                }, 800);

            });
        })
    })();
});