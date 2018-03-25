const db = require('../lib/mongodb');
const Schema = db.base.Schema;

const storeSchema = new Schema({
  name: String,
  url: String
});

module.exports = db.model('Store', storeSchema);