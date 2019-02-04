var express = require('express'),
    models = require('../models'),
    controller = require('../controllers/articles');

// create an express router
var router = express.Router();

// route controllers
router.route('/article').post(controller().save);
router.route('/article/:url').delete(controller().remove);

module.exports = router;
