const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const UrlController = require('./controllers/url_controller');
const app = express();

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/url', { useMongoClient: true });
}

// Middleware
app.use(function(req, res, next) {
  console.log('Request URL:', decodeURIComponent(req.url));
  next();
});
app.use(express.static(path.join(__dirname, 'public')));

app.get('/new/*', UrlController.create);
app.get('/:id', UrlController.redirect);

module.exports = app;
