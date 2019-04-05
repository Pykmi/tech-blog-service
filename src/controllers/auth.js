import bcrypt from 'bcrypt';
import auth from '../auth/utils';
import model from '../models/users';

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
          
          res.status(200).send({ token: auth.signToken(doc._id)});
        })
        .catch((err) => {
          res.status(403).send();
        })
    });
  };

  const whoami = (req, res) => {
    if(!req.user) {
      res.status(401).send();
      return;
    }
    res.status(200).send(req.user);
  }

  return { signIn, whoami };
};

export default controller;