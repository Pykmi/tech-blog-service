var model = require('../models/lists');

const controller = (filters) => {
  const fetch = (req, res) => {
    model.findOne(filters, (err, docs) => {
      if(err) {
        res.status(500).send();
        return;
      }

      if(docs.hasOwnProperty('items')) {
        res.status(404).send();
        return;
      }

      if(docs.items.length < 1) {
        res.status(404).send();
        return;
      }
      
      res.json(docs.items);
    });
  };

  return { fetch };
};

module.exports = controller;
