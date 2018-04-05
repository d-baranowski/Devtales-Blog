import {MessageReducer, MessageReducerInitialState} from "./messageReducer";
import {NotificationHide} from "./Actions/NotificationHide";
import {
    ArticleCreateError, ArticleGetAllSuccess, ArticleGetSpecificSuccess, ArticleHideError,
    ArticleUpdateError
} from '../../Article/State/Actions'
import {ArticleCreateSuccess, ArticleHideSuccess, ArticleUpdateSuccess} from "../../Article/State/Actions"

const dispatchAction = (context, action) => {
    const newContext = {...context};
    newContext.action = action;
    newContext.state = newContext.underTest(newContext.state, newContext.action);
    return {...newContext}
};

const initialState = {...MessageReducerInitialState};

const setupSteps = {
    "the reducer has its initial state": (context) => {
        return {...context, state: {...initialState}}
    },
    "I dispatch an ArticleCreateError action": (context) => {
        context.errorMessage = 'Failed to create an article.';
        return dispatchAction(context, ArticleCreateError.create("This is the error", "This-is-a-slug"));
    },
    "I dispatch an ArticleHideError action": (context) => {
        context.errorMessage = 'Failed to hide article.';
        return dispatchAction(context, ArticleHideError.create("This is the error", "This-is-a-slug"));
    },
    "I dispatch an ArticleUpdateError action": (context) => {
        context.errorMessage = 'Failed to update the article.';
        return dispatchAction(context, ArticleUpdateError.create("This is the error", "This-is-a-slug"));
    },
    "I dispatch an ArticleCreateSuccess action": (context) => {
        context.sucessMessage = "Successfully created article with id 1!";
        return dispatchAction(context, ArticleCreateSuccess.create({id: 1}));
    },
    "I dispatch an ArticleHideSuccess action": (context) => {
        context.sucessMessage = "Successfully hidden article with id 1!";
        return dispatchAction(context, ArticleHideSuccess.create({id: 1}));
    },
    "I dispatch an ArticleUpdateSuccess action": (context) => {
        context.sucessMessage = "Successfully updated article with id 1!";
        return dispatchAction(context, ArticleUpdateSuccess.create({id: 1}));
    },
    "I dispatch an ArticleGetAllSuccess action": (context) => {
        return dispatchAction(context, ArticleGetAllSuccess.create([]))
    },
    "I dispatch an ArticleGetSpecificSuccess action": (context) => {
        return dispatchAction(context, ArticleGetSpecificSuccess.create({}))
    },
    "I dispatch a NotificationHide action with id: ": (context, message) => {
        const id = message.match(/\d+/)[0];
        return dispatchAction(context, NotificationHide.create(id))
    }
};

const beforeEachByString = (context, description) => {
    const matchSeparatingWords = /and|when|Given/;
    const chunks = description.split(matchSeparatingWords);
    const setupStepDefinitions = Object.keys(setupSteps);
    for (let chunk of chunks) {
        for (let definition of setupStepDefinitions) {
            if (chunk.includes(definition)) {
                context = setupSteps[definition](context, chunk);
            }
        }
    }
    return context;
};

describe("MessageReducer", () => {
    let context = {};

    for (let errorType of ['ArticleCreateError', 'ArticleHideError', 'ArticleUpdateError']) {
        let errorDispatchTestDescription =
            "Given the reducer has its initial state\n" +
            `when I dispatch an ${errorType} action`;
        describe(errorDispatchTestDescription, () => {
            beforeEach(() => {
                context = {};
                context.underTest = MessageReducer;
                context = beforeEachByString(context, errorDispatchTestDescription)
            });

            it("then the state will contain an error", () => {
                expect(context.state.messages[1]).toEqual({ id: 1, msg: context.errorMessage, status: 'ERROR' })
            });
            it('then the state latest id will be equal to 1', () => {
                expect(context.state.latestId).toEqual(1)
            });
        });
    }
    for (let successType of ['ArticleCreateSuccess', 'ArticleHideSuccess', 'ArticleUpdateSuccess']) {
        let successDispatchTestDescription =
            "Given the reducer has its initial state\n" +
            `when I dispatch an ${successType} action`;
        describe(successDispatchTestDescription, () => {
            beforeEach(() => {
                context = {};
                context.underTest = MessageReducer;
                context = beforeEachByString(context, successDispatchTestDescription)
            });

            it("then the state will contain an success", () => {
                expect(context.state.messages[1]).toEqual({ id: 1, msg: context.sucessMessage, status: 'SUCCESS' })
            });
            it('then the state latest id will be equal to 1', () => {
                expect(context.state.latestId).toEqual(1)
            });
        });
    }

    for (let successWithoutMessageType of ['ArticleGetAllSuccess', 'ArticleGetSpecificSuccess']) {
        let successWithoutMessageDispatchTestDescription =
            "Given the reducer has its initial state\n" +
            `when I dispatch an ${successWithoutMessageType} action`;
        describe(successWithoutMessageDispatchTestDescription, () => {
            beforeEach(() => {
                context = {};
                context.underTest = MessageReducer;
                context = beforeEachByString(context, successWithoutMessageDispatchTestDescription)
            });

            it("then the state will not contain any messages", () => {
                expect(context.state.messages).toEqual({})
            });
            it('then the state latest id will be equal to 0', () => {
                expect(context.state.latestId).toEqual(0)
            });
        });
    }

    const stateAlreadyHasMessagesWhenIDispatchAnActionToHideOne =
        "Given the reducer has its initial state\n" +
        "when I dispatch an ArticleCreateError action\n" +
        "and I dispatch an ArticleHideError action\n" +
        "and I dispatch an ArticleUpdateError action\n" +
        "and I dispatch an ArticleCreateSuccess action\n" +
        "and I dispatch an ArticleHideSuccess action\n" +
        "and I dispatch an ArticleUpdateSuccess action\n" +
        "and I dispatch an ArticleGetAllSuccess action\n" +
        "and I dispatch an ArticleGetSpecificSuccess action\n" +
        "I dispatch a NotificationHide action with id: 5\n";
    describe(stateAlreadyHasMessagesWhenIDispatchAnActionToHideOne, () => {
        beforeEach(() => {
            context = {};
            context.underTest = MessageReducer;
            context = beforeEachByString(context, stateAlreadyHasMessagesWhenIDispatchAnActionToHideOne)
        });

        it('then the state will not contain the message with id 5', () => {
            expect(Object.keys(context.state.messages)).not.toContain(5)
        });

        it('then the state will contain 5 messages', () => {
            expect(Object.values(context.state.messages).length).toEqual(5)
        });

        it('then the state latest id will be equal to 6', () => {
            expect(context.state.latestId).toEqual(6)
        });
    });

    const stateAlreadyHasMessagesWhenIDispatchMultipleActionsToHide =
        "Given the reducer has its initial state\n" +
        "when I dispatch an ArticleCreateError action\n" +
        "and I dispatch an ArticleHideError action\n" +
        "and I dispatch an ArticleUpdateError action\n" +
        "and I dispatch an ArticleCreateSuccess action\n" +
        "and I dispatch an ArticleHideSuccess action\n" +
        "and I dispatch an ArticleUpdateSuccess action\n" +
        "and I dispatch an ArticleGetAllSuccess action\n" +
        "and I dispatch an ArticleGetSpecificSuccess action\n" +
        "and I dispatch a NotificationHide action with id: 5\n" +
        "and I dispatch a NotificationHide action with id: 4\n" +
        "and I dispatch a NotificationHide action with id: 3\n";
    describe(stateAlreadyHasMessagesWhenIDispatchMultipleActionsToHide, () => {
        beforeEach(() => {
            context = {};
            context.underTest = MessageReducer;
            context = beforeEachByString(context, stateAlreadyHasMessagesWhenIDispatchMultipleActionsToHide)
        });

        it('then the state will not contain the message with id 5', () => {
            expect(Object.keys(context.state.messages)).not.toContain(5)
        });

        it('then the state will not contain the message with id 4', () => {
            expect(Object.keys(context.state.messages)).not.toContain(4)
        });

        it('then the state will not contain the message with id 3', () => {
            expect(Object.keys(context.state.messages)).not.toContain(3)
        });

        it('then the state will contain 5 messages', () => {
            expect(Object.values(context.state.messages).length).toEqual(3)
        });

        it('then the state latest id will be equal to 6', () => {
            expect(context.state.latestId).toEqual(6)
        });
    });

    const stateAlreadyHasMessagesWhenIDispatchAnActionToHideOneMultipleTimes =
        "Given the reducer has its initial state\n" +
        "when I dispatch an ArticleCreateError action\n" +
        "and I dispatch an ArticleHideError action\n" +
        "and I dispatch an ArticleUpdateError action\n" +
        "and I dispatch an ArticleCreateSuccess action\n" +
        "and I dispatch an ArticleHideSuccess action\n" +
        "and I dispatch an ArticleUpdateSuccess action\n" +
        "and I dispatch an ArticleGetAllSuccess action\n" +
        "and I dispatch an ArticleGetSpecificSuccess action\n" +
        "and I dispatch a NotificationHide action with id: 5\n" +
        "and I dispatch a NotificationHide action with id: 5\n" +
        "and I dispatch a NotificationHide action with id: 5\n";
    describe(stateAlreadyHasMessagesWhenIDispatchAnActionToHideOneMultipleTimes, () => {
        beforeEach(() => {
            context = {};
            context.underTest = MessageReducer;
            context = beforeEachByString(context, stateAlreadyHasMessagesWhenIDispatchAnActionToHideOneMultipleTimes)
        });

        it('then the state will not contain the message with id 5', () => {
            expect(Object.keys(context.state.messages)).not.toContain(5)
        });

        it('then the state will contain 5 messages', () => {
            expect(Object.values(context.state.messages).length).toEqual(5)
        });

        it('then the state latest id will be equal to 6', () => {
            expect(context.state.latestId).toEqual(6)
        });
    });
});