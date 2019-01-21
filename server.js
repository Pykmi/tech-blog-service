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

// cors control
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  
    if(req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET, DELETE, PATCH, POST, PUT');
      return res.status(200).json({});
    }
  
    next();
  });

// enable router
app.use('/api/blog', router.articles);

module.exports = app;