const app = require('./server');
    
// acquire or set default web server port
const port = process.env.PORT || 6002;

// default root route
app.get('/', (req, res) => {
  res.send('welcome to my API!');
});

// start express server
app.listen(port, () => {
  console.log(`Running on PORT: ${port}`);
});

// export app for testing purpose
module.exports = app;