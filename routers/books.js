var express = require('express'),
    models = require('../models');

// create an express router
var router = express.Router();

// books/:id findById middleware
router.use('/:id', (req, res, next) => {
  models.books.findById(req.params.id, (err, book) => {
    if(err) {
      res.status(404).send({ error: 'no record found' });
      return;
    }

    if(book) {
      req.book = book;
      next();
      return;
    }

    res.status(404).send({ error: 'no record found'});
  });
});

// /books route
router.route('/')
  .get((req, res) => {
    models.books.find((err, books) => {
      if(err) {
        res.status(500).send(err);
        return;
      }

      res.json(books);
    });
  })
  .post((req, res) => {
    let book = new models.books(req.body);
    book.save();
    res.status(201).send();
  });

// /books/:id route
router.route('/:id')
  .delete((req, res) => {
    req.book.remove((err) => {
      err ? res.status(500).send() : res.status(200).send();
    });
  })
  .get((req, res) => {
    res.json(req.book);
  })
  .patch((req, res) => {
    req.body._id ? delete req.body._id : ''
    req.body._v ? delete req.body._v : ''

    for(let p in req.body) {
      req.book[p] = req.body[p];
    }

    req.book.save((err) => {
      err ? res.status(500).send() : res.status(200).send();
    });
  })
  .put((req, res) => {
    req.book.title = req.body.title;
    req.book.author = req.body.author;
    req.book.genre = req.body.genre;
    req.book.read = req.body.read;

    req.book.save((err) => {
      err ? res.status(500).send() : res.status(200).send();
    });
  });

module.exports = router;

