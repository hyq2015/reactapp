var express = require('express');
var session = require('express-session');
var app = express();

app.use(session({
    secret: '123',
    key: 'JSESSIONID',
    resave: false,
    saveUninitialized: true
}));

app.use('/', express.static('./dist/'));
var host = '127.0.0.1';
var port = 7070;
var server = app.listen(port, function() {
    console.log('Example app listening at http://%s:%s', host, port);
});

// var proxyRules = new HttpProxyRules({
//   rules: {
//     // '/alpha/api/': 'http://42.159.244.26/alpha/api/', // Api Server
//     '/alpha/api/': 'http://dev.genwoshua.com/alpha/api/', // Api Server
//
//     '/alpha/web/': 'http://dev.genwoshua.com/alpha/web/',
//     '/alpha/static/': 'http://localhost/alpha/static/', // Static on Server
//     '/tempAuth':'http://router.genwoshua.com/tempAuth',
//     '/alpha/portal/': 'http://localhost:9001/alpha/portal/',
//     '/alpha/webapp/': 'http://localhost:9002/alpha/webapp/',
//     '/': 'http://localhost:7070/',
//     '/alpha/router/': 'http://localhost:9003/alpha/router/',
//     '/alpha/qiniu/': 'http://app.genwoshua.com/alpha/qiniu/',
//
//
//   },
//   default: 'http://dev.genwoshua.com/404.html' // default target
// });
