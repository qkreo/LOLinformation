const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        createProxyMiddleware('/riotgamesapi', {
            target: 'https://kr.api.riotgames.comm',
            pathRewrite: {
                '^/riotgamesapi': ''
            },
            changeOrigin: true
        })
    )




};
