'use strict';

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.json();
var Question = require('../models/question');

router.route('/')
  .post(parseUrlencoded, function(req, res) {
    var question = new Question;
    question.question = req.body.question;
    question.answerDescription.answerDataType = req.body.answerDataType;
    question.answerDescription.answerComment = req.body.answerComment;
    question.answerDescription.answerOptions = req.body.answerOptions;
    if (req.body.relatedQuestion) {
      Question.findOne({'question': req.body.relatedQuestion}, function(err, relatedQuestion) {
        if (err) return res.status(500).send(err);
        if (relatedQuestion === null) {
          res.status(404);
          res.send({'error': 'Related question ' + req.body.relatedQuestion + ' not found'});
        } else {
          question.answerDescription.relatedQuestion = relatedQuestion;
          question.save(function (err, question) {
            if (err) return res.status(500).send(err);
            res.status(201).send(question);
          });
        }
      });
    } else {
      question.save(function (err, question) {
        if (err) return res.status(400).send(err);
        res.status(201).send(question);
      });
    }
  })
  .get(function (req, res) {
    Question.find({}, function(err,questions) {
      res.send(questions);
    })
  });

router.route('/question_maker')
  .get(function(req, res) {
    res.render('question_maker')
  });

router.route('/:question_id')
  .get(function (req, res) {
    Question.findById(req.params.question_id, function (err, question) {
      if (err) {
        res.status(500).send({'error': 'Error fetching Question'});
      } else if (!question) {
        res.status(404).send({'error': 'Question not found'});
      } else {
        res.send(question);
      }
    })
  });

module.exports = router;
