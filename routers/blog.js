var express = require('express'),
    models = require('../models'),
    controller = require('../controllers/articles'),
    utils = require('../utils'),
    route = require('./constants');

// create an express router
var router = express.Router();

// route middlewares
router.use(route.BASE, (req, res, next) => {
  req.filters = utils.filters(req.params);
  next();
});

router.use(route.BY_TITLE, (req, res, next) => {
  req.filters = utils.filters(req.params);
  next();
});

router.use(route.BY_CATEGORY, (req, res, next) => {
  req.filters = utils.filters(req.params);
  next();
});

// route controllers
router.route(route.BASE).get(controller().fetch);
router.route(route.BY_TITLE).get(controller().fetch);
router.route(route.BY_CATEGORY).get(controller().fetch);

module.exports = router;
