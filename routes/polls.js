'use strict';

var express = require('express');
var router = express.Router();
var Poll = require('../models/poll');
var bodyParserJSON = require('body-parser').json();
var notFound = require('./helpers').notFound.bind(null, 'Poll');
var noContent = require('./helpers').noContent;

router.route('/')
  .get(function(req, res) {
    res.send('ok');
  })
  .post(bodyParserJSON, function(req, res) {
    var p = new Poll(req.body)
    p.save()
    .then(function(poll) {
      res.status(201).send(poll);
    }, function(err) {
      res.status(400).send(err);
    });
  });

router.route('/:id')
  .get(function(req, res) {
    var id = req.params.id;
    Poll.findOne({_id: id})
    .then(res.send.bind(res), notFound.bind(null, id, res));
  })
  .delete(function(req, res) {
    var id = req.params.id;
    Poll.findOne({_id: id})
    .then(function(poll) {
      return poll.remove();
    })
    .catch(notFound.bind(null, id, res))
    .then(noContent.bind(null, res))
    .catch(function() {
      res.status(500)
        .send({error: "Could not delete poll '" + id + "'"});
    });
  });

module.exports = router;
