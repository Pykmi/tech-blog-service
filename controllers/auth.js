var bcrypt = require('bcrypt'),
    config = require('../config/auth'),
    jwt = require('jsonwebtoken'),
    model = require('../models/users');

const getToken = (req) => req.headers.authorization.split('Bearer ')[1];

const getUserId = (token) => jwt.verify(token, config.secret);

const sign = (userId) => jwt.sign({ id: userId }, config.secret, config.options);

const controller = () => {
  const signIn = (req, res) => {
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
          res.status(403).send();
        })
    });
  };

  const verify = (req, res) => {
    const token = getToken(req);
    if(!token) {
      res.status(401).send();
    }

    const payload = getUserId(token);
    model.findById(payload.id, (err, doc) => {
      if(err) {
        res.status(401).send();
        return;
      }

      if(!doc) {
        res.status(401).send();
        return;
      }

      res.status(200).send();
    });
  }

  return { signIn, verify };
};

module.exports = controller;