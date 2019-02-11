var bodyParser = require('body-parser'),
    morgan = require('morgan');

// CORS middleware
const cors = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  if(req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, DELETE, PATCH, POST, PUT');
    return res.status(200).json({});
  }

  next();
};

const setupMiddleware = (app) => {
  app.use(cors);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(morgan('dev'));
};

module.exports = setupMiddleware;