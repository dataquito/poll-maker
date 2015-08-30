'use strict';

var express = require('express');
var router = express.Router();
var Poll = require('../models/poll');
var bodyParserJSON = require('body-parser').json();

router.route('/')
  .get(function(req, res) {
    res.send('ok');
  })
  .post(bodyParserJSON, function(req, res) {
    var p = new Poll(req.body);
    p.save(function(err, poll) {
      if (err) {
        res.estatus(400);
        res.send(err);
      } else {
        res.status(201);
        res.send(poll);
      }
    });
  });

router.route('/:id')
  .get(function(req, res) {
    var id = req.params.id;
    Poll.findOne({_id: id})
      .then(function(poll) {
        res.send(poll);
      },
      function(err) {
        res.status(404);
        res.send({error: "Poll '" + id + "' not found"});
      });
  })
  .delete(function(req, res) {
    var id = req.params.id;
    Poll.findOne({_id: id})
      .then(function(poll) {
        poll.remove(function(err) {
          if (err) {
            res.status(500);
            res.status({error: "Could not delete poll '" + id + "'"});
          } else {
            res.send(poll);
          }
        });
      }, function() {
        res.status(404);
        res.send({error: "Poll '" + id + "' not found"});
      });
  });

module.exports = router;
