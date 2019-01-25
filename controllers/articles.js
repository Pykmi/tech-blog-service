var models = require('../models')
    utils = require('../utils');

const noContent = (res) => res.length < 1;

const controller = () => {
  const fetch = (req, res) => {
    models.articles.find(req.filters, (err, articles) => {
      if(err) {
        res.status(500).send();
        return;
      }

      if(noContent(articles)) {
        res.status(404).send();
      }

      res.json(utils.toObject(articles));
    });
  };

  return { fetch }
};

module.exports = controller;
