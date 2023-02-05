const { createProxyMiddleware } = require('http-proxy-middleware');

const options = {
    target: 'http://localhost:7777',
    changeOrigin: true,
}

module.exports = function (app) {
    app.use('/files', createProxyMiddleware(options));
    app.use('/components', createProxyMiddleware(options));
    app.use('/upload', createProxyMiddleware(options));
    app.use('/item/*', createProxyMiddleware(options));
    app.use('/add', createProxyMiddleware(options));
    app.use('/take', createProxyMiddleware(options));
    app.use('/files/attached/*/*', createProxyMiddleware(options));
};
