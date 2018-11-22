var mongoose = require('mongoose');

const options = {
  dbName: (process.env.ENV === 'Test' ? 'pykmi-e2e-db' : 'pykmi-dev-db'),
  useNewUrlParser: true
}

// connect to the mongo database container
const connect = () => (
  mongoose.connect('mongodb://pykmi:okilzw@0.0.0.0:8081', options)
    .catch((err) => {
      console.log(err);
    }
  )
);

module.exports = connect;