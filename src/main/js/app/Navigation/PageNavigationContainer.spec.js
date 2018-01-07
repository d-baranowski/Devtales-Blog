import "../Test/setup"
import React from "react";
import {PageNavigationContainer} from "./PageNavigationContainer";
import {mount} from 'enzyme';
import {applyMiddleware, combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import {PageNavigationReducer, PageNavigationReducerInitialState} from "./PageNavigationReducer";
import {routerReducer} from "react-router-redux";
import createHistory from "history/createBrowserHistory";
import {MemoryRouter} from "react-router-dom";
import {routerMiddleware} from "react-router-redux";

const SpyMiddlewareFactory = (actionList, stateList) => (store) => (next) => (action) => {
    next(action);
    actionList.push(action);
    stateList.push(store.getState())
};

describe("PageNavigationContainer will be mounted with initial state", () => {
    const actionsDispatched = [];
    const statesInOrder = [];
    const spyMiddleware = SpyMiddlewareFactory(actionsDispatched, statesInOrder);
    const history = createHistory();

    const store = createStore(
        combineReducers({
            PageNavigationReducer,
            router: routerReducer
        }),
        {
            PageNavigationReducer: {...PageNavigationReducerInitialState},
            router: {locationBeforeTransitions: null}
        },
        applyMiddleware(spyMiddleware, routerMiddleware(history))
    );

    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <PageNavigationContainer />
            </MemoryRouter>
        </Provider>
    );

    describe("When I click on the hamburger it should open the navigation menu", () => {
        wrapper.find("#nav-icon").simulate("click");

        it("hamburger should be open", () => {
            expect(wrapper.find("#nav-icon").hasClass("open")).toEqual(true);
        });

        it("navbar should be open", () => {
            expect(wrapper.find("responsivenav").hasClass("open")).toEqual(true);
        })
    });

    afterAll(()=>{
        wrapper.unmount();
    });
});

describe("PageNavigationContainer will be mounted with navbar open", () => {
    const actionsDispatched = [];
    const statesInOrder = [];
    const spyMiddleware = SpyMiddlewareFactory(actionsDispatched, statesInOrder);
    const history = createHistory();

    const store = createStore(
        combineReducers({
            PageNavigationReducer,
            router: routerReducer
        }),
        {
            PageNavigationReducer: {...PageNavigationReducerInitialState, navigationMenuIsOpen: true},
            router: {locationBeforeTransitions: null}
        },
        applyMiddleware(spyMiddleware, routerMiddleware(history))
    );

    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <PageNavigationContainer />
            </MemoryRouter>
        </Provider>
    );

    describe("When I click on the hamburger it should open the navigation menu", () => {
        wrapper.find("#nav-icon").simulate("click");

        it("hamburger should be open", () => {
            expect(wrapper.find("#nav-icon").hasClass("open")).toEqual(false);
        });

        it("navbar should be open", () => {
            expect(wrapper.find("responsivenav").hasClass("open")).toEqual(false);
        })
    });

    afterAll(()=>{
        wrapper.unmount();
    });
});