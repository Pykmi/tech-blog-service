var express = require('express'),
    auth = require('../controllers/auth'),
    articles = require('../controllers/articles')
    lists = require('../controllers/lists');

// create an express router
const router = express.Router();

const filters = { public: true, type: 'article' };

// route controllers
router.route('/').get(articles().fetch);
router.route('/article/:url').get(articles().fetch);
router.route('/category/:category').get(articles().fetch);

router.route('/categories').get(lists({ name: 'categories' }).fetch);
router.route('/tags').get(lists({ name: 'tags' }).fetch);

router.route('/login').post(auth().signIn);

module.exports = router;
