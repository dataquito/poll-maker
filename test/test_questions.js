'use strict';

var request = require('supertest');
var app = require('../app');

describe('question route handler', function() {
  it('can create question', function(done) {
  var question = {};

  request(app)
    .post('/question')
    .send(question)
    .expect(201, done);
  });
})
