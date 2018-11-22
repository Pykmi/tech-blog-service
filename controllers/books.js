var models = require('../models');

const controller = () => {
  const get = (req, res) => {
    models.books.find((err, books) => {
      if(err) {
        res.status(500).send(err);
        return;
      }

      res.json(books);
    });
  };

  const post = (req, res) => {
    let book = new models.books(req.body);
    
    if(!req.body.title) {
      res.status(400);
      res.send('Bad request');
      return;
    }

    book.save();
    res.status(201);
    res.send();
  };

  return { get, post }
};

module.exports = controller;
