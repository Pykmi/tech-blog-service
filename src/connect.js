import mongoose from 'mongoose';
import config from './config';

config();

const DATASTORE_ACCOUNT = process.env.DATASTORE_ACCOUNT;
const DATASTORE_NAME = process.env.DATASTORE_NAME;
const DATASTORE_KEY = process.env.DATASTORE_KEY;
const DATASTORE_PORT = process.env.DATASTORE_PORT;

const connectionUri = `mongodb://${DATASTORE_ACCOUNT}:${DATASTORE_KEY}@${DATASTORE_ACCOUNT}.documents.azure.com:${DATASTORE_PORT}/${DATASTORE_NAME}?ssl=true`;

// connect to the datastore
const connect = () => (
  mongoose.connect(connectionUri, { useNewUrlParser: true })
    .catch((err) => console.log(err)
  )
);

module.exports = connect;
