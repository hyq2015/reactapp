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
