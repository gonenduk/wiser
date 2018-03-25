const Product = require('./product');

class Stats {
  static GetStoresStats () {
    return Product.aggregate([
      {
        $group: {
          _id: '$store_id',
          productCount: { $sum: 1 },
          averagePrice: { $avg: '$price' },
          minimumPrice: { $min: '$price' },
          maximumPrice: { $max: '$price' },
        }
      },
      // Delete the rest if no need for name of store
      {
        $lookup: {
          from: 'stores',
          localField: '_id',
          foreignField: '_id',
          as: 'store'
        }
      },
      {
        $unwind: '$store'
      },
      {
        $addFields: { name: '$store.name' }
      },
      {
        $project: { store: 0 }
      }
    ]).exec();
  }
}

module.exports = Stats;
