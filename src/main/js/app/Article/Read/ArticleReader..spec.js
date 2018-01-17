import "../../Test/setup"
import React from "react";
import {fakeArticleTestData, beforeEachByString} from "../../Test";
import { mount } from 'enzyme';
import {ArticleReader} from "./ArticleReader";
import {LoadingTypeEnum} from "../ArticleType";

const setupSteps = {
    "the article is loading": (context) => {
        return {...context, article: {...context.article, isLoading: LoadingTypeEnum.LOADING}};
    },
    "the article is not loading": (context) => {
        return {...context, article: {...context.article, isLoading: LoadingTypeEnum.LOADED}};
    },
    "the slug is the same as test data article": (context) => {
        return {...context, slug: 'this-is-test-data'}
    },
    "the article has json representation": (context) => {
        return {...context, article: fakeArticleTestData};
    },
    "the article doesn't have json representation": (context) => {
        return {...context, article: {...context.article, jsonRepresentation: undefined}};
    },
    "fetch article is a spy function": (context) => {
        return {...context, fetchArticleSpy: jasmine.createSpy("fetchArticleSpy", () => {})}
    },
    "ArticleReader is mounted with parameters found in context": (context) => {
        return {
            ...context,
            component: mount(
                <ArticleReader
                    slug={context.slug}
                    article={context.article}
                />
            )
        };
    }
};

const expectTheLoadingSpinnerToBeVisible = function (visible, context) {
    let component = context.component;
    it(`Then the spinner is ${visible ? 'visible' : 'invisible'}`, () => {
        expect(component.find(".spinner").length).toEqual(visible ? 1 : 0);
    });
};

const expectTheConfiguredEditorToBeVisible = function(visible, context) {
    let component = context.component;
    it(`Then the ConfiguredEditor is ${visible ? 'visible' : 'invisible'}`, () => {
        expect(component.find("ConfiguredEditor").length).toEqual(visible ? 1 : 0);
    });
};

const expectTheWarningToBeVisible = function(visible, context) {
    let component = context.component;
    it(`Then the warning is ${visible ? 'visible' : 'invisible'}`, () => {
        expect(component.find("p").length).toEqual(visible ? 1 : 0);
    });
};

const expectTheSpyFunctionToBeCalledNTimes = function(n, context) {
    let spy = context.fetchArticleSpy;
    it(`Then the spy has been called ${n} times`, () => {
        expect(spy).toHaveBeenCalledTimes(n);
    });
}; //Use in container test instead

const loadingTestCase =
    "Given the article is loading " +
    "and the article doesn't have json representation " +
    "and the slug is the same as test data article " +
    "and ArticleReader is mounted with parameters found in context";

describe(loadingTestCase, function () {
    let testCaseContext = {};

    testCaseContext = beforeEachByString({
        description: loadingTestCase,
        context: testCaseContext,
        setupSteps: setupSteps
    });

    expectTheLoadingSpinnerToBeVisible(true, testCaseContext);
    expectTheConfiguredEditorToBeVisible(false, testCaseContext);
    expectTheWarningToBeVisible(false, testCaseContext);
});

const notLoadingErrorTestCase =
    "Given the article is not loading " +
    "and the article doesn't have json representation " +
    "and the slug is the same as test data article " +
    "and ArticleReader is mounted with parameters found in context";
describe(notLoadingErrorTestCase, function () {
    let testCaseContext = {};

    testCaseContext = beforeEachByString({
        description: notLoadingErrorTestCase,
        context: testCaseContext,
        setupSteps: setupSteps
    });

    expectTheLoadingSpinnerToBeVisible(false, testCaseContext);
    expectTheConfiguredEditorToBeVisible(false, testCaseContext);
    expectTheWarningToBeVisible(true, testCaseContext);
});

const notLoadingSuccessTestCase =
    "Given the article has json representation " +
    "and the article is not loading " +
    "and the slug is the same as test data article " +
    "and ArticleReader is mounted with parameters found in context";
describe(notLoadingSuccessTestCase, function () {
    let testCaseContext = {};

    testCaseContext = beforeEachByString({
        description: notLoadingSuccessTestCase,
        context: testCaseContext,
        setupSteps: setupSteps
    });

    expectTheLoadingSpinnerToBeVisible(false, testCaseContext);
    expectTheConfiguredEditorToBeVisible(true, testCaseContext);
    expectTheWarningToBeVisible(false, testCaseContext);
});

