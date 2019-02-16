const lambdaLocal = require('lambda-local');
const assert = require('assert');
const path = require('path');

const makeRequest = function (uri) {
    return {
        "Records": [
            {
                "cf": {
                    "config": {
                        "distributionId": "EXAMPLE"
                    },
                    "request": {
                        "uri": uri,
                        "method": "GET",
                        "headers": {}
                    }
                }
            }
        ]
    }
};

const LAMBDA_PATH = path.join(__dirname,'lambda/index.js');

console.log("Begin");

Promise.all([
    lambdaLocal.execute({
        event: makeRequest("/projects"),
        lambdaPath:  LAMBDA_PATH,
        timeoutMs: 3000
    }).then(function (result) {
        assert.deepStrictEqual(result.uri, "/index.html", "requests to /projects are redirected to index.html")
    }).catch(function (err) {
        assert.fail(err)
    }),

    lambdaLocal.execute({
        event: makeRequest("/about"),
        lambdaPath: LAMBDA_PATH,
        timeoutMs: 3000
    }).then(function (result) {
        assert.deepStrictEqual(result.uri, "/index.html", "requests to /about are redirected to index.html")
    }).catch(function (err) {
        assert.fail(err)
    }),

    lambdaLocal.execute({
        event: makeRequest("/article/private-variables-in-javascript-aka-what-are-closures"),
        lambdaPath: LAMBDA_PATH,
        timeoutMs: 3000
    }).then(function (result) {
        assert.deepStrictEqual(result.uri, "/index.html", "requests to articles returns index page")
    }).catch(function (err) {
        assert.fail(err)
    }),

    lambdaLocal.execute({
        event: makeRequest("/edit/article/private-variables-in-javascript-aka-what-are-closures"),
        lambdaPath: LAMBDA_PATH,
        timeoutMs: 3000
    }).then(function (result) {
        assert.deepStrictEqual(result.uri, "/index.html", "requests to articles returns index page")
    }).catch(function (err) {
        assert.fail(err)
    }),

    lambdaLocal.execute({
        event: makeRequest("/img/title.svg"),
        lambdaPath: LAMBDA_PATH,
        timeoutMs: 3000
    }).then(function (result) {
        assert.deepStrictEqual(result.uri, "/img/title.svg", "requests to other addresses remain the same")
    }).catch(function (err) {
        assert.fail(err)
    }),

    lambdaLocal.execute({
        event: makeRequest("/api/article"),
        lambdaPath: LAMBDA_PATH,
        timeoutMs: 3000
    }).then(function (result) {
        assert.deepStrictEqual(result.uri, "/api/articles.json", "requests to api articles drop the extension")
    }).catch(function (err) {
        assert.fail(err)
    }),

    lambdaLocal.execute({
        event: makeRequest("/api/article/private-variables-in-javascript-aka-what-are-closures"),
        lambdaPath: LAMBDA_PATH,
        timeoutMs: 3000
    }).then(function (result) {
        assert.deepStrictEqual(result.uri, "/api/private-variables-in-javascript-aka-what-are-closures.json", "requests to api articles drop the extension")
    }).catch(function (err) {
        assert.fail(err)
    }),

]).catch((err) => {
    console.log("Fail", err);
    process.exit(1);
}).then(() => {
    console.log("Success");
});

