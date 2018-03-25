const express = require('express');
const router = express.Router();
const Boom = require('boom');
const handlers = require('../handlers');
const sui = require('swagger-ui-dist').getAbsoluteFSPath();

// Swagger UI
router.use('/swagger', express.static(sui));

// Home Page
router.get('/', (req, res, next) => {
  res.render('index');
});

// Default handler (page not found)
router.use((req, res, next) => {
  next(Boom.notFound('Page not found'));
});

// Error handler for web pages
router.use((err, req, res, next) => {
  const errPayload = handlers.error.payload(err);
  res.status(errPayload.statusCode).render('error', { error: errPayload });
});

module.exports = router;
