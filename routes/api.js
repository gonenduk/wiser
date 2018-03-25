const express = require('express');
const swagger = require('swagger-express-middleware');
const handlers = require('../handlers');
const Boom = require('boom');
const router = express.Router();

// Swagger middleware
swagger('routes/api.json', router, (err, middleware) => {
  // Halt on errors
  if (err) {
    console.error(err.message);
    process.exit(1);
  }

  // Parse and validate
  router.use(
    middleware.metadata(),
    middleware.CORS(),
    middleware.files({ useBasePath: true, apiPath: '/docs' }),
    middleware.parseRequest(),
    middleware.validateRequest()
  );

  // Handlers
  router.use('/api', (req, res, next) => {
    // Find handler according to swagger definition
    const handlerName = req.swagger.pathName.slice(1).replace(/\//g, '-');
    const method = req.method.toLowerCase();
    const handler = handlers[handlerName];

    // If handler not found continue to error handling
    if (!handler || !handler[method]) {
      return next();
    }

    // Call handler
    handler[method](req, res, next);
  });

  // Default handler (not implemented error)
  router.use('/api', (req, res, next) => {
    next(Boom.notImplemented(`${req.method} /api${req.path} is not implemented`));
  });

  // Error handler for API
  router.use((err, req, res, next) => {
    const errPayload = handlers.error.payload(err);
    res.status(errPayload.statusCode).json(errPayload);
  });

  // API is ready
  console.log('API is ready');
});

module.exports = router;
