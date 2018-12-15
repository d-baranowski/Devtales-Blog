const jsonServer = require('json-server');
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