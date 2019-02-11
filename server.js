var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    secure = require('./auth/middleware'),
    cors = require('./cors'),
    connect = require('./connect'),
    router = require('./routers');

// create server
var app = express();

// middleware
app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// database connection
connect();

// routers
app.use('/api/blog', router.blog);
app.use('/api/blog/admin', secure, router.admin);

module.exports = app;