#!/usr/bin/env node

const config = require('config');

// Load app
const app = require('./app');
app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`);
});
