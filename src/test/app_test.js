const assert = require('assert');
const request = require('supertest');
const app = require('../app');

describe('The express app', () => {

  it('returns a static HTML page for GET requests to /', function(done) {
    request(app)
      .get('/')
      .end((err, response) => {
        assert(response.statusCode === 200);
        assert(response.text.includes('Example creation usage:'));
        done();
      });
  });

  it('returns a static HTML page for GET requests to /index.html', function(done) {
    request(app)
      .get('/index.html')
      .end((err, response) => {
        assert(response.statusCode === 200);
        assert(response.text.includes('Example creation usage:'));
        done();
      });
  });

  it('returns a static CSS file for GET requests to /style.css', function(done) {
    request(app)
      .get('/style.css')
      .end((err, response) => {
        assert(response.statusCode === 200);
        assert(response.text.includes('body {'));
        done();
      });
  });

});
