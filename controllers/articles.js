var models = require('../models');

const controller = () => {
  const get = (req, res) => {
    models.articles.find({ public: true }, (err, articles) => {
      if(err) {
        res.status(500).send(err);
        return;
      }

      res.json(articles);
    });
  };

  const post = (req, res) => {
    let article = new models.articles(req.body);
    
    if(!req.body.title) {
      res.status(400);
      res.send('Bad request');
      return;
    }

    article.save();
    res.status(201);
    res.send();
  };

  return { get, post }
};

module.exports = controller;
