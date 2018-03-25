const db = require('../lib/mongodb');
const Schema = db.base.Schema;

const productSchema = new Schema({
  price: Number,
  shipping: Number,
  sku: String,
  title: String,
  brand: String,
  store_id: Schema.Types.ObjectId
});

productSchema.statics.getAll = function(filter = {}, sort = {}, limit = 0) {
  return this.find(filter).sort(sort).limit(limit).exec();
};

module.exports = db.model('Product', productSchema);
