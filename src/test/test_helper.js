const mongoose = require('mongoose');

before(done => {
  mongoose.connect('mongodb://localhost/url_test', { useMongoClient: true });
  mongoose.connection
    .once('open', () => done())
    .on('error', error => {
      console.warn('Warning', error);
    });
});

beforeEach(done => {
  const { urls } = mongoose.connection.collections;
  urls.drop()
    .then(() => urls.createIndex({ url: 1 }, { unique: true }))
    .then(() => done())
    .catch(() => done());
});

after(done => {
  mongoose.disconnect();
  done();
});
