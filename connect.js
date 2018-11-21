var mongoose = require('mongoose');

// connect to the mongo database container
const connect = () => (
  mongoose.connect('mongodb://pykmi:okilzw@0.0.0.0:8081',
    {
      dbName: 'pykmi-dev-db',
      useNewUrlParser: true
    })
    .catch((err) => {
      console.log(err);
    }
  )
);

module.exports = connect;