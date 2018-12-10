const url = require('url');
const proxy = require('express-http-proxy');

const apiProxy = proxy('0.0.0.0:8080', {
    proxyReqPathResolver: req => url.parse(req.baseUrl).path
});

module.exports = apiProxy;
