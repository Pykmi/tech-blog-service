var jwt = require('jsonwebtoken')
    config = require('../config/auth');

const getToken = (req) => req.headers.authorization.split('Bearer ')[1].trim();

const getUser = (token) => new Promise((resolve, reject) => {
  jwt.verify(token, config.secret, (err, payload) => {
    if(err) {
      return reject(err);
    }

    resolve(payload);
  });
});

const noHeaders = (req) => !req.headers.authorization;

const signToken = (userId) => jwt.sign({ id: userId }, config.secret, config.options);

module.exports = { getToken, getUser, noHeaders, signToken };