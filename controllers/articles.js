var moment = require('moment'),
    models = require('../models'),
    utils = require('../utils');

const noContent = (res) => res.length < 1;

const badRequest = () => !words.every((word) => accepted.includes(word)) || words.length !== accepted.length;

const controller = () => {
  const fetch = (req, res) => {
    models.articles.find(req.filters)
      .select(['_id', 'title', 'author', 'category', 'tags', 'image', 'likes',
               'url', 'smalltext', 'bodytext', 'created_at', 'modified_at'])
      .exec((err, articles) => {
        if(err) {
          res.status(500).send();
          return;
        }

        if(noContent(articles)) {
          res.status(404).send();
        }
        
        res.json(utils.toObject(articles));
      }
    );
  };

  const remove = (req, res) => {
    req.article.remove((err) => {
      err ? res.status(500).send() : res.status(200).send();
    });
  };

  const save = (req, res) => {
    let article = new models.articles(req.body);
    /* const valid = words.every((word) => accepted.includes(word));

    if(badRequest()) {
      res.status(400).send();
      return;
    }; */

    article.save((err) => {
      res.status(500).send();
      return;
    });

    res.status(201).send();
  };

  const update = (req, res) => {
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

    /* req.article.save((err) => {
      err ? res.status(500).send() : res.status(200).send();
    }); */
  };

  return { fetch, remove, save, update };
};

module.exports = controller;
