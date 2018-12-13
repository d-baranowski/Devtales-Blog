'use strict';

exports.handler = (event, context, callback) => {
    const { request } = event.Records[0].cf;

    if (request.uri === "/about" || request.uri === "/projects" || request.uri === "/") {
        request.uri = "/index.html";
    }

    else if (request.uri.match(/^\/article\/.+$/)) {
        request.uri = "/index.html";
    }

    else if (request.uri === "/api/article") {
        request.uri = "/api/articles.json"
    }

    else if (request.uri.match(/^\/api\/article\/(.+)$/)) {
        const matches = request.uri.match(/^\/api\/article\/(.+)$/);
        request.uri = `/api/${matches[1]}.json`;
    }

    // Return to CloudFront
    return callback(null, request);
};