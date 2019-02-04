var express = require('express'),
    controller = require('../controllers/articles'),
    model = require('../models/articles');

// create an express router
const router = express.Router();

const filters = { public: true, type: 'article' };

// route controllers
router.route('/').get(controller(model).fetch);
router.route('/article/:url').get(controller(model).fetch);
router.route('/category/:category').get(controller(model).fetch);
router.route('/categories').get(controller(model).fetch);
router.route('/tags').get(controller(model).fetch);

module.exports = router;
