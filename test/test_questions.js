'use strict';

var request = require('supertest');
var app = require('../app');

describe('/question', function() {
  it('should return bad request trying to safe question without answer data type', function(done) {
    var question = {
      'question': 'test'
    };
    request(app)
      .post('/question')
      .set('Content-Type', 'application/x-www-form-urlencoded')
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
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send(question)
      .expect(400, done)
  });

  it('should create question', function(done) {
    var question = {
      'question':'test',
      'answerDataType': 'String' 
    };
    var response = {
      'question': 'test',
      'answerDescription': {
        'answerDataType': 'String' 
      }
    };
    request(app)
      .post('/question')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send(question)
      .expect(201)
      .expect(response, done);
  });

  it('should create question with comments', function(done) {
    var question = {
      'question':'test',
      'answerDataType': 'String',
      'answerComment': 'this is a test'
    };
    var response = {
      'question': 'test',
      'answerDescription': {
        'answerDataType': 'String', 
        'answerComment': 'this is a test'
      }
    };
    request(app)
      .post('/question')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send(question)
      .expect(201)
      .expect(response, done);
  });

  it('should create question with answer options', function(done) {
    var question = {
      'question':'test',
      'answerDataType': 'String',
      'answerOptions': {'0': 'm', '1': 'f'}
    };
    var response = {
      'question': 'test',
      'answerDescription': {
        'answerDataType': 'String', 
        'answerOptions': {
          '0': 'm',
          '1': 'f'
        }
      }
    };
    request(app)
      .post('/question')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send(question)
      .expect(201)
      .expect(response, done);
  });

  it('should create question with related question', function(done) {
    var relatedQuestion = {
      'question':'related question',
      'answerDescription': {
        'answerType': 'String' 
      }
    };
    var question = {
      'question': 'test',
      'answerDataType': 'String',
      'relatedQuestion': relatedQuestion
    };
    var response = {
      'question': 'test',
      'answerDescription': {
        'answerDataType': 'String',
        'relatedQuestion': {
          'question': 'related question',
          'answerDescription': {
            'answerType': 'String' 
          }
        }
      }
    };
    request(app)
      .post('/question')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send(question)
      .expect(201)
      .expect(response, done);
  });

});
