var models = require('../models')
    utils = require('../utils');

const noContent = (res) => res.length < 1;

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
        console.log(articles);
        res.json(utils.toObject(articles));
      }
    );
  };

  return { fetch }
};

module.exports = controller;
