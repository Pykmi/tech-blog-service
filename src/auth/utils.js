import jwt from 'jsonwebtoken';
import config from '../config';

config();

const AUTH_ALGO = process.env.AUTH_ALGO;
const AUTH_EXPIRES = process.env.AUTH_EXPIRES;
const AUTH_SECRET = process.env.AUTH_SECRET;

export const getToken = (req) => req.headers.authorization.split('Bearer ')[1].trim();

export const getUser = (token) => new Promise((resolve, reject) => {
  jwt.verify(token, AUTH_SECRET, (err, payload) => {
    if(err) {
      return reject(err);
    }

    resolve(payload);
  });
});

export const noHeaders = (req) => !req.headers.authorization;

export const signToken = (userId) => jwt.sign({ id: userId }, AUTH_SECRET, { algorithm: AUTH_ALGO, expiresIn: AUTH_EXPIRES });
