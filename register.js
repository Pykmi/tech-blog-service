const bcrypt = require('bcrypt'),
      cli = require('command-line-args'),
      connect = require('./connect'),
      model = require('./models/users');

const cliOpt = [
  { name: 'name', alias: 'n', type: String },
  { name: 'email', alias: 'e', type: String },
  { name: 'password', alias: 'p', type: String }
];

const BCRYPT_SALT_ROUNDS = 12;

// get cli arguments
const user = cli(cliOpt);

// connect to database
connect();

// encrypt password & save user to database
bcrypt.hash(user.password, BCRYPT_SALT_ROUNDS)
  .then((hashed) => {
    model({
      name: user.name,
      email: user.email,
      password: hashed
    }).save((err) => {
      if(err) {
        console.log(err);
      }
    
      console.log('Success! User created.');
      process.exit();
    })
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });
