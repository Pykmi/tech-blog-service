import model from '../models/articles';

const toObject = (content, output = {}) => {
  content.map((item) => { output[item.url] = item });
  
  return output;
};

const controller = (filters = { public: true, searchable: true }) => {
  const fetch = (req, res) => {
    Object.keys(req.params).forEach((item) => filters[item] = req.params[item]);

    model.find(filters, (err, docs) => {
      if(err) {
        res.status(500).send();
        return;
      }
      
      if(docs.length < 1) {
        res.status(404).send();
        return;
      }
      
      res.json(toObject(docs));
    });
  };

  const remove = (req, res) => {
    model.findOneAndRemove({ url: req.params.url }, (err, doc) => {
      if(err) {
        res.status(500).send();
        return;
      }

      if(!doc) {
        res.status(404).send();
      }

      res.status(200).send();
    });
  };

  const save = (req, res) => {
    const doc = new model(req.body);
    doc.save((err, doc) => {
      if(err) {
        if(err.code === 11000) {
          res.status(400).send();
          return;
        }

        res.status(500).send();
        return;
      }

      res.status(201).send();
    });
  };

  const update = (req, res) => {
    model.findOneAndUpdate({ url: req.params.url }, req.body, (err, doc) => {
      if(err) {
        res.status(500).send();
        return;
      }

      if(!doc) {
        res.status(404).send();
      }

      res.status(200).send();
    });
  };

  return { fetch, remove, save, update };
};

export default controller;
