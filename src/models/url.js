const mongoose = require('mongoose');
const shortid = require('shortid');
const { Schema } = mongoose;

const UrlSchema = new Schema({
  _id: {
    type: String,
    'default': shortid.generate
  },
  url: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  }
});

const Url = mongoose.model('url', UrlSchema);
module.exports = Url;
