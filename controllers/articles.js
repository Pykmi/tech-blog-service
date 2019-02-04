var moment = require('moment');

const toObject = (content, output = {}) => {
  content.map((item) => { output[item.url] = item });
  
  return output;
};

const controller = (model, filters = { public: true, type: 'article' }) => {
  const fetch = (req, res) => {
    Object.keys(req.params).forEach((item) => filters[item] = req.params[item]);

    model.find(filters, (err, docs) => {
      if(err) {
        res.status(500).send();
        return;
      }

      if(docs.length < 1) {
        res.status(404).send();
      }
      
      res.json(toObject(docs));
    });
  };

  const remove = (req, res) => {
    req.article.remove((err) => {
      err ? res.status(500).send() : res.status(200).send();
    });
  };

  const save = (req, res) => {
    let doc = new model(req.body);

    doc.save((err) => {
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
