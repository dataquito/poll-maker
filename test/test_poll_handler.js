'use strict';

var request = require('supertest');
var app = require('../app');

describe('poll route handler', function() {
  it('responds successfuly to the listing route', function(done) {
    request(app)
      .get('/poll')
      .expect(200, done);
  });

  it('can create a poll', function(done) {
    var params = {};
    request(app)
      .post('/poll')
      .send(params)
      .expect(201, done);
  });

  it('can return an existing poll', function(done) {
    //TODO
    done();
  });
});
