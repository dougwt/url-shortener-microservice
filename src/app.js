const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const UrlController = require('./controllers/url_controller');
const app = express();

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'test') {
  const MONGO_CONNECTION = process.env.MONGO_CONNECTION || 'mongodb://localhost/url';
  mongoose.connect(MONGO_CONNECTION, { useMongoClient: true }, (error) => {
    if (error) throw error;
  });
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
