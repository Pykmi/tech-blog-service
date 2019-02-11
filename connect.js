var datastore = require('./config/datastore'),
    mongoose = require('mongoose');

const mongoUri = `mongodb://${datastore.account}:${datastore.key}@${datastore.account}.documents.azure.com:${datastore.port}/${datastore.name}?ssl=true`;

// connect to the mongo database container
const connect = () => (
  /* mongoose.connect('mongodb://pykmi:okilzw@0.0.0.0:8081', options) */
  mongoose.connect(mongoUri, { useNewUrlParser: true })
    .catch((err) => {
      console.log(err);
    }
  )
);

module.exports = connect;
