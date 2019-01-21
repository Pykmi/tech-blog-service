var express = require('express'),
    models = require('../models'),
    controller = require('../controllers/articles');

// create an express router
var router = express.Router();

// article/:name findOne middleware
router.use('/article/:name', (req, res, next) => {
  models.articles.findOne({ url: req.params.name }, (err, article) => {
    if(err) {
      res.status(404).send({ error: 'no record found' });
      return;
    }

    if(article) {
      req.article = article;
      next();
      return;
    }

    res.status(404).send({ error: 'no record found' });
  });
});

// base route for content
router.route('/')
  .get(controller().get)
  .post(controller().post);

// fetch individual article by name
router.route('/article/:name')
  .get((req, res) => {
    res.json(req.article);
  });

module.exports = router;

