var express = require('express'),
    models = require('../models'),
    controller = require('../controllers/articles'),
    utils = require('../utils'),
    route = require('./constants');

// create an express router
var router = express.Router();

// route controllers
router.route(route.BASE).post(controller().save);
router.route(route.BY_TITLE).delete(controller().remove);

module.exports = router;
