const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = module.exports = express();

const web = require('./routes/web');
const api = require('./routes/api');

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// General app setup
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes setup
app.use(api);
app.use(web);
