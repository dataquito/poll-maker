'use strict';

var request = require('supertest');
var app = require('../app');
var expect = require('chai').expect;
var Question = require('../models/question');

describe('/question', function() {

  afterEach(function (done) {
    Question.remove({}, function(err) {
      done(); 
    }); 
  });

  it('should return bad request trying to safe question without answer data type', function(done) {
    var question = {
      'question': 'test'
    };
    request(app)
      .post('/question')
      .send(question)
      .expect(400, done)
  });

  it('should return bad request trying to safe question with empty answer data type', function(done) {
    var question = {
      'question': 'test',
      'answerDataType': ''
    };
    request(app)
      .post('/question')
      .send(question)
      .expect(400, done)
  });

  it('should create question', function(done) {
    var question = {
      'question':'test',
      'answerDataType': 'String' 
    };
    request(app)
      .post('/question')
      .send(question)
      .expect(201)
      .end(function(err, res) {
        expect(res.body.question).to.equal('test');
        expect(res.body.answerDescription.answerDataType).to.equal('String');
        done();
      });
  });

  it('should return bad request if question already exists', function(done) {
    var question = {
      'question':'test',
      'answerDataType': 'String' 
    };
    request(app)
      .post('/question')
      .send(question)
      .expect(201)
      .end(function(err, res) {
        request(app)
          .post('/question')
          .send(question)
          .expect(400, done);
      });
  });

  it('should create question with comments', function(done) {
    var question = {
      'question':'test',
      'answerDataType': 'String',
      'answerComment': 'this is a test'
    };
    request(app)
      .post('/question')
      .send(question)
      .expect(201)
      .end(function(err, res) {
        expect(res.body.question).to.equal('test');
        expect(res.body.answerDescription.answerDataType).to.equal('String');
        expect(res.body.answerDescription.answerComment).to.equal('this is a test');
        done();
      });
  });

  it('should create question with answer options', function(done) {
    var question = {
      'question':'test',
      'answerDataType': 'String',
      'answerOptions': {
        '0': 'm',
        '1': 'f'
      }
    };
    request(app)
      .post('/question')
      .send(question)
      .expect(201)
      .end(function(err, res) {
        expect(res.body.question).to.equal('test');
        expect(res.body.answerDescription.answerDataType).to.equal('String');
        expect(res.body.answerDescription.answerOptions).to.deep.equal({ 0: 'm', 1:'f' });
        done();
      });
  });

  it('should create question with related question', function(done) {
    var relatedQuestion = {
      'question': 'test2',
      'answerDataType': 'String',
    };

    var question = {
      'question': 'test',
      'answerDataType': 'String',
      'relatedQuestion': 'test2'
    };

    request(app)
      .post('/question')
      .send(relatedQuestion)
      .expect(201)
      .end(function(err, res) {
        request(app)
          .post('/question')
          .send(question)
          .expect(201)
          .end(function(err, res) {
            expect(res.body.question).to.equal('test');
            expect(res.body.answerDescription.answerDataType).to.equal('String');
            expect(res.body.answerDescription.relatedQuestion.question).to.equal('test2');
            expect(res.body.answerDescription.relatedQuestion.answerDescription.answerDataType).to.equal('String');
            done();
          })
      });
  });

  it('should fail if related question does not exist', function(done) {
    var question = {
      'question': 'test',
      'answerDataType': 'String',
      'relatedQuestion': 'test2'
    } 
    request(app)
      .post('/question')
      .send(question)
      .expect(404)
      .end(function(err, res) {
        expect(res.body.error).to.equal('Related question test2 not found');
        done();
      });
  })

});
