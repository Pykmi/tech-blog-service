var express = require('express'),
    models = require('../models'),
    controller = require('../controllers/articles');

// create an express router
var router = express.Router();

// article/:name findOne middleware
router.use('/article/:name', (req, res, next) => {
  const url = req.params.name.toLowerCase();
  
  models.articles.findOne({ url }, (err, article) => {
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

router.use('/category/:name', (req, res, next) => {
  const category = req.params.name.toLowerCase();

  models.articles.find({ category }, (err, articles) => {
    let output = {};
    
    if(err) {
      res.status(500).send(err);
      return;
    }

    if(articles) {
      articles.map((article) => {
        output[article.url] = article;
      });

      req.articles = output;
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

router.route('/category/:name')
  .get((req, res) => {
    res.json(req.articles);
  })

module.exports = router;
