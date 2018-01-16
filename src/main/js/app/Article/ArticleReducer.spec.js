import {ArticleReducer, ArticleReducerInitialState} from "./ArticleReducer";


describe('The article reducer has initial state', () => {
    let reducer;
    let state;
    let returnedArticle = {
        id: 2,
        title: "Hello World",
        slug: "hello-world-2",
        html: "<div></div>",
        summary: "This is some summary",
        createdOn: 123412,
        updatedOn: 124123,
        publishedDate: 12500,
        jsonRepresentation: "{}",
        tags: [
            {
                id: 1,
                value: "java"
            },
            {
                id: 2,
                value: "programming"
            }
        ],
        isLoading: false
    };
    let returendArticles = {
        "hello-world": {
            id: 1,
            title: "Hello World",
            slug: "hello-world",
            html: "<div></div>",
            summary: "This is some summary",
            createdOn: 123412,
            updatedOn: 124123,
            publishedDate: 0,
            jsonRepresentation: "{}",
            tags: [
                {
                    id: 1,
                    value: "java"
                },
                {
                    id: 2,
                    value: "programming"
                }
            ],
            isLoading: false
        },
        "hello-world-2": {
            id: 2,
            title: "Hello World",
            slug: "hello-world-2",
            html: "<div></div>",
            summary: "This is some summary",
            createdOn: 123412,
            updatedOn: 124123,
            publishedDate: 12500,
            jsonRepresentation: "{}",
            tags: [
                {
                    id: 1,
                    value: "java"
                },
                {
                    id: 2,
                    value: "programming"
                }
            ],
            isLoading: false
        }
    };

    beforeEach(() => {
        state = ArticleReducerInitialState;
        reducer = ArticleReducer;
    });

    it('If I dispatch articles get all loading action, then loadingAll will be true', () => {
        expect(reducer(state, {type: 'ARTICLE_GET_ALL_LOADING'})).toEqual({
            ...state,
            loadingAll: true
        });
    });

    it('If I dispatch articles get all success action with data the state will contain a map of articles.', () => {
        expect(reducer(state, {type: 'ARTICLE_GET_ALL_SUCCESS', data: returendArticles})).toEqual({
            ...state,
            articles: returendArticles
        });
    });

    it('If I dispatch article get specific success action with data the state will update correct article.', () => {
        const updatedArticle = returendArticles["hello-world"];
        updatedArticle.html = "<p></p>";
        expect(reducer(state, {type: 'ARTICLE_GET_SPECIFIC_SUCCESS', data: updatedArticle})).toEqual({
            ...state,
            articles: {["hello-world"]: updatedArticle}
        });
    });

    it('If I dispatch articles get all success action without data the state will contain an error.', () => {
        expect(reducer(state, {type: 'ARTICLE_GET_ALL_SUCCESS'})).toEqual({
            ...state,
            error: "Failed to get articles."
        });
    });

    it('If I dispatch create article success action with data and body the state will contain the article Im updating.', () => {
        expect(reducer(state, {type: 'CREATE_ARTICLE_SUCCESS', data: {
            body: returnedArticle
        }})).toEqual({
            ...state,
            updating: returnedArticle
        });
    });

    it('If I dispatch create article success action with data and no body the state will contain an error.', () => {
        expect(reducer(state, {type: 'CREATE_ARTICLE_SUCCESS', data: {}})).toEqual({
            ...state,
            error: "Failed to create article."
        });
    });

    it('If I dispatch create article success action without data the state will contain an error.', () => {
        expect(reducer(state, {type: 'CREATE_ARTICLE_SUCCESS'})).toEqual({
            ...state,
            error: "Failed to create article."
        });
    });

    it('If I dispatch publish article success action with data the state will update the corresponding article.', () => {
        const newState = reducer(state, {type: 'PUBLISH_ARTICLE_SUCCESS', data: returnedArticle});
        const expectedState = {
            ...state,
            articles: {...state.articles , "hello-world-2": returnedArticle}
        };
        expect(newState).toEqual(expectedState);
    });

    it('If I dispatch publish article success action with data that isnt article the state will contain error', () => {
        expect(reducer(state, {type: 'PUBLISH_ARTICLE_SUCCESS', data: {}})).toEqual({
            ...state,
            error: "Failed to publish article."
        });
    });

    it('If I dispatch publish article success action without data the state will contain error', () => {
        expect(reducer(state, {type: 'PUBLISH_ARTICLE_SUCCESS'})).toEqual({
            ...state,
            error: "Failed to publish article."
        });
    });
});

describe('The article reducer state indicates loadingAll', () => {
    let reducer;
    let state;

    beforeEach(() => {
        state = {...ArticleReducerInitialState, loadingAll: true};
        reducer = ArticleReducer;
    });

    it('If I dispatch publish article success action with data the state will update loading to be false', () => {
        expect(reducer(state, {type: 'ARTICLE_GET_ALL_SUCCESS', data: {}}).loadingAll).toEqual(
            false
        );
    });

    it('If I dispatch publish article error action with data the state will update loading to be false', () => {
        expect(reducer(state, {type: 'ARTICLE_GET_ALL_ERROR', data: {}}).loadingAll).toEqual(
            false
        );
    });
});

describe('The article reducer state already contains articles', () => {
    let reducer;
    let state;
    let returnedArticle = {
        id: 2,
        title: "Hello World",
        slug: "hello-world-2",
        html: "<div></div>",
        summary: "This is some summary",
        createdOn: 123412,
        updatedOn: 124123,
        publishedDate: 12500,
        jsonRepresentation: "{}",
        tags: [
            {
                id: 1,
                value: "java"
            },
            {
                id: 2,
                value: "programming"
            }
        ]
    };
    let returendArticles = {
        "hello-world": {
            id: 1,
            title: "Hello World",
            slug: "hello-world",
            html: "<div></div>",
            summary: "This is some summary",
            createdOn: 123412,
            updatedOn: 124123,
            publishedDate: 0,
            jsonRepresentation: "{}",
            tags: [
                {
                    id: 1,
                    value: "java"
                },
                {
                    id: 2,
                    value: "programming"
                }
            ]
        },
        "hello-world-2": {
            id: 2,
            title: "Hello World",
            slug: "hello-world-2",
            html: "<div></div>",
            summary: "This is some summary",
            createdOn: 123412,
            updatedOn: 124123,
            publishedDate: 12500,
            jsonRepresentation: "{}",
            tags: [
                {
                    id: 1,
                    value: "java"
                },
                {
                    id: 2,
                    value: "programming"
                }
            ]
        }
    };

    beforeEach(() => {
        state = {...ArticleReducerInitialState, articles: returendArticles};
        reducer = ArticleReducer;
    });

    it('If I dispatch publish article success action with data the state will update the corresponding article.', () => {
        expect(reducer(state, {type: 'PUBLISH_ARTICLE_SUCCESS', data: returnedArticle})).toEqual({
            ...state,
            articles: {"hello-world-2": returnedArticle, "hello-world": returendArticles["hello-world"]}
        });
    });

    it('If I dispatch article get specific success action with data the state will update correct article.', () => {
        const updatedArticle = returendArticles["hello-world"];
        updatedArticle.html = "<p></p>";
        updatedArticle.summary = "I decided to update my summary";
        expect(reducer(state, {type: 'ARTICLE_GET_SPECIFIC_SUCCESS', data: updatedArticle}).articles["hello-world"]).toEqual(
            {...updatedArticle, isLoading: false}
        );
    });
});