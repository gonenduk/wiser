const Boom = require('boom');

module.exports = {
  payload(err) {
    // Convert error to Boom error and set status to 500 is none set
    const errPayload = Boom.boomify(err, {statusCode: err.status || 500, override: false}).output.payload;

    // Log stack on server errors
    if (errPayload.statusCode === 500) console.error(err.stack);

    return errPayload;
  }
};
