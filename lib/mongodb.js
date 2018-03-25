const config = require('config');
const mongoose = require('mongoose');
const db = mongoose.connection;
const options = config.mongodb;

if (options && options.uri) {
  // Take db uri out of options
  const uri = options.uri;
  delete options.uri;

  // Log connection errors
  db.on('reconnected', () => console.log('DB reconnected'));
  db.on('disconnected', () => console.warn('DB disconnected'));
  db.on('error', err => console.error(`DB error: ${err.message}`));

  // Connect to db and log success or failure
  mongoose.connect(uri, options)
    .then(() => console.log('DB connected'))
    .catch(() => {
      console.log('exiting...');
      process.exit(1);
    });
}

module.exports = db;
