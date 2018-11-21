var express = require('express'),
    app = require('./server');

// acquire or set default web server port
var port = process.env.PORT || 3000;

// default root route
app.get('/', (req, res) => {
  res.send('welcome to my API!');
});

// start express server
app.listen(port, () => {
  console.log(`Running on PORT: ${port}`);
});
