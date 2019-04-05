import model from '../models/users';
import { getToken, getUser, noHeaders } from '../auth/utils';

// Auth middleware
const secure = (req, res, next) => {
  if(noHeaders(req)) {
    res.status(401).send();
    return;
  }

  const token = getToken(req);
  
  if(!token) {
    res.status(401).send();
  }

  getUser(token)
    .then((payload) => {
      model.findById(payload.id, (err, doc) => {
        if(err) {
          res.status(401).send();
          return;
        }
    
        if(!doc) {
          res.status(401).send();
          return;
        }
    
        req.user = { name: doc.name, email: doc.email };
        next();
      });
    })
    .catch((err) => {
      if(err) {
        res.status(401).send();
      }
    });
};

export default secure;