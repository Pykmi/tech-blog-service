var express = require('express'),
    models = require('../models'),
    controller = require('../controllers/articles'),
    utils = require('../utils');

// create an express router
var router = express.Router();

router.use('/article/:url', (req, res, next) => {
  req.filters = utils.filters(req.params);
  next();
});

router.use('/category/:category', (req, res, next) => {
  req.filters = utils.filters(req.params);
  next();
});

router.route('/').get(controller().fetch);
router.route('/article/:url').get(controller().fetch);
router.route('/category/:category').get(controller().fetch);

module.exports = router;
