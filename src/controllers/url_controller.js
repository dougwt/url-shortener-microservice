const validUrl = require('valid-url');
const Url = require('../models/url');

module.exports = {
  create(req, res, next) {
    const url = decodeURIComponent(req.params.url);
    console.log(`Processing ${url}`);

    if (!validUrl.isUri(url)) {
      res.status(400).json({
        error: 400,
        message: 'Invalid URL parameter'
      });
      return;
    }

    Url.create({ url })
      .then(record => res.send(record))
      .catch((error) => {

        if(error.code === 11000) {
          Url.findOne({ url })
            .exec((err, record) => {
              if(err) {
                throw err;
              } else {
                res.send(record);
              }
            });
        } else {
          console.log('ERROR:', error);
          next();
        }
      });
  },
};
