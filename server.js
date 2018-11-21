var express = require('express'),
    setupMiddleware = require('./middleware',)
    connect = require('./connect'),
    router = require('./routers');

// create the express server
var app = express();

// load middleware
setupMiddleware(app);

// connect to the database
connect();

// enable router
app.use('/api/books', router.books);

module.exports = app;