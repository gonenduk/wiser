const Stats = require('../models/stats');

module.exports = {
  get: async (req, res, next) => {
    try {
      res.json(await Stats.GetStoresStats());
    } catch (err) {
      next(err);
    }
  }
};
