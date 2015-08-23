'use strict';

var express = require('express');
var router = express.Router();
var Question = require('../models/question');

router.route('/')
  .post(function (req, res) {
    res.status(201);
    res.send('ok');
  });

module.exports = router;
