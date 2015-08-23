'use strict';

var express = require('express');
var router = express.Router();
var Poll = require('../models/poll');

router.route('/')
  .get(function (req, res) {
    res.send('ok');
  })
  .post(function (req, res) {
    res.status(201);
    res.send('ok');
  });

router.route('/:id')
  .get(function (req, res) {
    res.send('ok');
  })
  .delete(function (req, res) {
    res.send('ok');
  });

module.exports = router;
