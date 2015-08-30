'use strict';

var request = require('supertest');
var should = require('should');
var mongoose = require('mongoose');
var app = require('../app');
var Poll = require('../models/poll');

describe('poll route handler', function() {
  before(function (done) {
    mongoose.connection.db.dropDatabase(done);
  });

  it('responds successfuly to the listing route', function(done) {
    request(app)
      .get('/poll')
      .expect(200, done);
  });

  it('can create a poll', function(done) {
    var params = {
      questions: [1,2,3]
    };
    request(app)
      .post('/poll')
      .send(params)
      .expect(201)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.have.property('_id');
        res.body.should.have.property('questions', params.questions);

        Poll.findOne({_id: res.body._id}, function(err, p) {
          if (err) return done(err);
          p.should.be.an.Object();
          p.questions.should.be.an.Array();
          done();
        });
      });
  });

  it('can return an existing poll', function(done) {
    var p = new Poll({questions: [1, 2, 3]});
    p.save(function(err, poll) {
      var id = poll._id.toString();
      request(app)
        .get('/poll/' + id)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.should.have.property('_id', id);
          res.body.should.have.property('questions', [1, 2, 3]);
          done();
        });
    });
  });

  it('indicates a non existing poll', function(done) {
    request(app)
      .get('/poll/nonexistingobviously')
      .expect(404, done);
  });

  it('can destroy a poll', function(done) {
    var p = new Poll({questions: [1, 2, 3]});

    function shouldNotExist(id) {
      Poll.findOne({_id: id})
        .then(function(poll) {
          if (poll) {
            done(new Error("Object still exists"));
          } else {
            done();
          }
        });
    }

    p.save(function(err, poll) {
      var id = poll._id.toString();
      request(app)
        .del('/poll/' + id)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.should.have.property('_id', id);
          res.body.should.have.property('questions', [1, 2, 3]);
          shouldNotExist(id);
        });
    });
  });

  it('cannot delete a non existing poll', function(done) {
    request(app)
      .del('/poll/nonexistingobviously')
      .expect(404, done);
  });
});
