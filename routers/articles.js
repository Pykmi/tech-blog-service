var express = require('express'),
    models = require('../models'),
    controller = require('../controllers/articles');

// create an express router
var router = express.Router();

// article/:id findById middleware
router.use('/article/:id', (req, res, next) => {
  models.articles.findById(req.params.id, (err, article) => {
    if(err) {
      res.status(404).send({ error: 'no record found' });
      return;
    }

    if(article) {
      req.article = article;
      next();
      return;
    }

    res.status(404).send({ error: 'no record found'});
  });
});

// /articles route
router.route('/')
  .get(controller().get)
  .post(controller().post);

// /articles/:id route
router.route('/article/:id')
  .delete((req, res) => {
    req.article.remove((err) => {
      err ? res.status(500).send() : res.status(200).send();
    });
  })
  .get((req, res) => {
    res.json(req.article);
  })
  .patch((req, res) => {
    req.body._id ? delete req.body._id : ''
    req.body._v ? delete req.body._v : ''

    for(let p in req.body) {
      req.article[p] = req.body[p];
    }

    req.article.save((err) => {
      err ? res.status(500).send() : res.status(200).send();
    });
  })
  .put((req, res) => {
    req.article.title = req.body.title;
    req.article.author = req.body.author;
    req.article.category = req.body.category;
    req.article.tags = req.body.tags;
    req.article.likes = req.body.likes;
    req.article.url = req.body.url;
    req.article.image = req.body.image;
    req.article.smalltext = req.body.smalltext;
    req.article.bodytext = req.body.bodytext;
    req.article.public = req.body.public;
    req.article.created_at = req.body.created_at;
    req.article.modified_at = req.body.modified_at;

    req.article.save((err) => {
      err ? res.status(500).send() : res.status(200).send();
    });
  });

module.exports = router;

