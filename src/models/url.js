const mongoose = require('mongoose');
const { Schema } = mongoose;

const UrlSchema = new Schema({
  url: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  }
});

const Url = mongoose.model('url', UrlSchema);
module.exports = Url;
