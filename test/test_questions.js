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

  it('should return bad request trying to save question without answer data type property', function(done) {
    var question = {
      'question': 'test'
    };
    request(app)
      .post('/question')
      .send(question)
      .expect(400, done)
  });

  it('should return bad request trying to save question with empty answer data type', function(done) {
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

  it('should find question', function(done) {
    var question = {
      'question': 'test',
      'answerDataType': 'String'
    };
    request(app)
      .post('/question')
      .send(question)
      .expect(201)
      .end(function(err, res) {
        var question_id = res.body._id;
        request(app)
          .get('/question/' + question_id)
          .expect(200, done);
      });
  });

  it('should have error when fetching question', function(done) {
    request(app)
      .get('/question/asdf')
      .expect(500)
      .end(function(err, res) {
        expect(res.body.error).to.deep.equal('Error fetching Question');
        done();
      })
  });

  it('should not find question', function(done) {
    request(app)
      .get('/question/55f2505f40fe7b0d00832000')
      .expect(404)
      .end(function(err, res) {
        expect(res.body.error).to.deep.equal('Question not found');
        done();
      })
  });

  it('should give list of questions', function(done) {
    request(app)
      .get('/question')
      .expect(200, done)
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
  });

  it('should check if question maker exists', function(done) {
    request(app)
      .get('/question/question_maker')
      .expect(200, done);
  });

  it('can destroy a question', function(done) {
    var q = new Question({
      'question':'test',
      'answerDescription': {
        'answerDataType': 'String'
      }
    });

    function shouldNotExist(id) {
      Question.findOne({_id: id})
      .then(function(question) {
        if (question) {
          done(new Error("Object still exists"));
        } else {
          done();
        }
      });
    }

    q.save(function(err, question) {
      var id = question._id.toString();
      request(app)
      .del('/question/' + id)
      .expect(204)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.empty();
        shouldNotExist(id);
      });
    });
  });

  it('cannot delete a non existing question', function(done) {
    request(app)
    .del('/poll/nonexistingobviously')
    .expect(404, done);
  });

});
