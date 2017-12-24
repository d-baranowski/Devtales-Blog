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
        state = ArticleReducerInitialState;
        reducer = ArticleReducer;
    });

    it('If I dispatch articles get all success action with data the state will contain a map of articles.', () => {
        expect(reducer(state, {type: 'ARTICLE_GET_ALL_SUCCESS', data: returendArticles})).toEqual({
            ...state,
            articles: returendArticles
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
        expect(reducer(state, {type: 'PUBLISH_ARTICLE_SUCCESS', data: returnedArticle})).toEqual({
            ...state,
            articles: {"hello-world-2": returnedArticle}
        });
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
});