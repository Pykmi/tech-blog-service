var bcrypt = require('bcrypt'),
    config = require('../config/auth'),
    jwt = require('jsonwebtoken'),
    model = require('../models/users');

const sign = (userId) => jwt.sign({ id: userId }, config.secret, config.options);

const controller = () => {
  const verify = (req, res) => {
    model.findOne({ email: req.body.email }, (err, doc) => {
      if(err) {
        res.status(500).send();
        return;
      }
      
      if(!doc) {
        res.status(403).send();
        return;
      }

      bcrypt.compare(req.body.password, doc.password)
        .then((verified) => {
          if(!verified) {
            res.status(403).send();
          }
          
          res.status(200).send({ token: sign(doc._id)});
        })
        .catch((err) => {
          console.log(err);
          res.status(403).send();
        })
    });
  };

  return { verify };
};

module.exports = controller;