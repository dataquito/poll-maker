'use strict';

var request = require('supertest');

var app = require('../app');

describe('base route', function() {

  it('responds successfully', function(done) {
    request(app)
      .get('/')
      .expect(200, done);
  });
});

