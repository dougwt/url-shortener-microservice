const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const Url = mongoose.model('url');

describe('URL controller', () => {

  it('GET to /new/:url with an unrecognized URL creates a new URL', (done) => {
    Url.count().then((count) => {
      request(app)
        .get(`/new/${encodeURIComponent('https://www.google.com')}`)
        .end(() => {
          Url.count().then((newCount) => {
            assert(newCount === count + 1);
            done();
          });
        });
      });
  });

  it('GET to /new/:url with a recognized URL does not create a new URL', (done) => {
    const record = new Url({ url: 'https://www.google.com' });
    record.save().then((record) => {
      Url.count().then((count) => {
        request(app)
          .get(`/new/${encodeURIComponent('https://www.google.com')}`)
          .end((err, response) => {
            Url.count().then((newCount) => {
              assert(newCount === count);
              done();
            });
          });
        });
    });
  });

  it('returns a short URL for GET requests to /new/:url with a valid http URL', function(done) {
    request(app)
      .get(`/new/${encodeURIComponent('http://www.google.com')}`)
      .end((err, response) => {
        assert(response.body.url.startsWith('http://'));
        done();
      });
  });

  it('returns a short URL for GET requests to /new/:url with a valid https URL', function(done) {
    request(app)
      .get(`/new/${encodeURIComponent('https://www.google.com')}`)
      .end((err, response) => {
        assert(response.body.url.startsWith('https://'));
        done();
      });
  });

  it('returns a short URL for GET requests to /new/:url with a valid URL containing a port', function(done) {
    request(app)
      .get(`/new/${encodeURIComponent('https://www.google.com:1337/example-path/')}`)
      .end((err, response) => {
        assert(response.body.url.includes(':1337'));
        done();
      });
  });

  it('returns an error for GET requests to /new/:url with an invalid URL', function(done) {
    request(app)
      .get(`/new/${encodeURIComponent('www.google.com')}`)
      .end((err, response) => {
        assert(response.status === 400);
        assert(response.body.error === 400);
        assert(response.body.message === 'Invalid URL parameter');
        done();
      });
  });

  xit('redirects to a short URL\'s original http URL', function(done) {

  });

  xit('redirects to a short URL\'s original https URL', function(done) {

  });

  xit('redirects to a short URL\'s original URL containing a port', function(done) {

  });

  xit('returns an error for GET requests an unrecognized short URL', function(done) {

  });

});
