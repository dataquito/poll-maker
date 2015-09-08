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
  });

router.route('/question_maker')
  .get(function(req, res) {
    res.render('question_maker') 
  })

module.exports = router;
