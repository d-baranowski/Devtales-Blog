const jsonServer = require('json-server');
const express = require('express');
const proxy = require('express-http-proxy');

const arg = process.argv[2];

// Proxy live data
if (arg === "live") {
    const app = express();

    app.use('/', proxy('https://www.devtales.net/api'));

    app.listen(8080);
} else { // Expose api.json as an api
    const server = jsonServer.create();
    const router = jsonServer.router('api.json');
    const middlewares = jsonServer.defaults();

    server.use(jsonServer.rewriter({
        '/api/admin': '/admin',
        '/api/article/*': '/example',
        '/api/*': '/$1',
    }));
    server.use(middlewares);
    server.use(router);
    server.listen(8080);
}
