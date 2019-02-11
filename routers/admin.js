var express = require('express'),
    models = require('../models'),
    auth = require('../controllers/auth'),
    controller = require('../controllers/articles');

// create an express router
var router = express.Router();

// route controllers
router.route('/article').post(controller().save);
router.route('/article/:url').delete(controller().remove);
router.route('/article/:url').put(controller().update);

router.route('/login').post(auth().signIn);
router.route('/verify').get(auth().verify);

module.exports = router;
