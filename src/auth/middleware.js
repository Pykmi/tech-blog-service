import model from '../models/users';
import auth from '../auth/utils';

// Auth middleware
const secure = (req, res, next) => {
  if(auth.noHeaders(req)) {
    res.status(401).send();
    return;
  }

  const token = auth.getToken(req);
  
  if(!token) {
    res.status(401).send();
  }

  auth.getUser(token)
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