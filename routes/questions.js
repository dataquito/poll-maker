'use strict';

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.json();
var Question = require('../models/question');

router.route('/')
  .post(parseUrlencoded, function(req, res) {
    var q = new Question;
    var question = req.body.question;
    var answerDataType = req.body.answerDataType;
    var answerComment = req.body.answerComment;
    var answerOptions = req.body.answerOptions;
    var relatedQuestion = req.body.relatedQuestion;
    if (question && answerDataType) {
      q.question = question;
      q.answerDescription.answerDataType = answerDataType;
      if (answerComment) {
        q.answerDescription.answerComment = answerComment;
      }
      if (answerOptions) {
        q.answerDescription.answerOptions = answerOptions;
      }
      if (relatedQuestion) {
        Question.findOne({'question': relatedQuestion}, function(err, rq) {
          if (rq === null) {
            res.status(404);
            res.send({'error': 'Related question ' + relatedQuestion + ' not found'});
          } else {
            q.answerDescription.relatedQuestion = rq; 
            q.save(function (err, question) {
              if (err) return console.error(err);
              res.status(201);
              res.send(question);
            });
          }
        });
      }
      if (!relatedQuestion) {
        q.save(function (err, question) {
          if (err) return console.error(err);
          res.status(201);
          res.send(question);
        });
      }
    } else {
      res.status(400);
      res.send('error');
    }
  });

module.exports = router;
